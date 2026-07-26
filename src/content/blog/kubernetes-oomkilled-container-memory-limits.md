---
pipeline_contract_version: "42.1.0"
title: "Kubernetes OOMKilled Container Memory Limits: Architectural Teardown of cgroup v1 vs v2 Memory Subsystem Pressure"
meta_title: "Kubernetes OOMKilled Memory Limits & cgroup v2 Fix"
description: "Architectural teardown of Kubernetes OOMKilled container terminations, analyzing cgroup v1 vs v2 memory accounting, page cache reclaim, and PSI telemetry."
pubDate: "2026-07-26"
tags: ["kubernetes", "linux-kernel", "cgroups", "infrastructure-failure"]
shortenedSlug: "kubernetes-oomkilled-container-memory-limits"
slug: "kubernetes-oomkilled-container-memory-limits"
target_systems: "Kubernetes, Linux Kernel cgroups v1/v2, Container Runtime Interface (containerd)"
read_time_minutes: 8
difficulty_level: "Advanced"
---

# Kubernetes OOMKilled Container Memory Limits: Architectural Teardown of cgroup v1 vs v2 Memory Subsystem Pressure

When a Kubernetes Pod terminates abruptly with an `OOMKilled` status and an exit code of `137`, infrastructure teams typically respond by increasing the container's `resources.limits.memory` value in the Pod manifest. However, in production microservices—particularly those performing intensive file I/O, heavy logging, or memory-mapped database access—containers frequently continue to suffer sudden `OOMKilled` terminations even when application metrics show that heap memory remains well below the configured threshold. This failure occurs because Kubernetes memory enforcement does not evaluate application heap size alone. Instead, it relies on the underlying Linux kernel control group (cgroup) subsystem, where file-backed page cache, anonymous memory allocations, and asynchronous kernel page reclaim mechanics interact in fundamentally different ways between cgroup v1 and cgroup v2.

---

### How Kubernetes Calculates Working Set Memory Across Cgroup Versions

A persistent source of operational confusion stems from the divergence between standard Linux memory tools (such as `free` or `top`) and the metrics used by the Kubelet to enforce container limits. When an engineer inspects a container's memory using `kubectl top pod`, Kubernetes reports the container's **Working Set Size (WSS)** rather than its total Resident Set Size (RSS).

The Linux kernel divides cgroup memory allocations into two primary classifications:
1. **Anonymous Memory (`rss`):** Dynamic memory allocated directly by application processes for heaps, stacks, and heap allocations. This memory cannot be discarded without writing to swap space.
2. **Page Cache (`cache`):** Memory used by the kernel to buffer file reads and writes from disk. Page cache is further divided into *active* file pages (recently accessed) and *inactive* file pages (eligible for immediate reclamation by the kernel).

Kubernetes calculates container Working Set Size using a specific equation designed to prevent premature eviction while accounting for un-reclaimable file buffers:

$$\text{Working Set Size} = \text{Total Memory Usage} - \text{Inactive File Page Cache}$$`
+-----------------------------------------------------------------------------------+
|                     CONTAINER MEMORY ALLOCATION BREAKDOWN                         |
+-----------------------------------------------------------------------------------+
|  [ Anonymous RSS (Heap/Stack) ]  +  [ Active File Cache ]  |  [ Inactive Cache ]  |
|  <------------------- WORKING SET SIZE (WSS) ------------->  |  (Reclaimable)    |
|  <-------------------------- TOTAL MEMORY USAGE --------------------------------> |
+-----------------------------------------------------------------------------------+`

If an application performs continuous disk reads (such as log parsing or streaming database exports), the kernel allocates physical RAM pages to store file data. Under normal conditions, when overall host memory becomes tight, the kernel asynchronously reclaims inactive file pages without impacting running processes. 

However, inside a constrained cgroup, if the rate of page cache allocation outpaces the kernel's asynchronous page reclaim engine (`kswapd`), the container's Working Set Size expands until it collides directly with the configured hard memory limit.

---

### The Structural Shift: Cgroup v1 vs. Cgroup v2 Subsystem Architecture

The migration of Kubernetes nodes from legacy cgroup v1 (standard in Kubernetes versions prior to 1.25) to cgroup v2 (default in Kubernetes 1.25+) fundamentally altered how kernel memory limits are structured and enforced.

Under **cgroup v1**, resource controllers operated in isolated, independent directory hierarchies under `/sys/fs/cgroup/` (e.g., `/sys/fs/cgroup/memory/` and `/sys/fs/cgroup/cpu/`). Because the memory controller had no visibility into block I/O or writeback throttles governed by the `blkio` controller, the kernel struggled to synchronize buffered disk writes with page cache reclamation. When a cgroup v1 container hit `memory.limit_in_bytes`, the kernel attempted a synchronous, aggressive page reclaim sweep. If inactive page cache could not be freed fast enough to satisfy incoming write allocations, the kernel immediately invoked the OOM Killer.

Under **cgroup v2**, Linux unifies all resource controllers under a single hierarchy tree. Memory limits are redefined to provide granular backpressure controls before an un-recoverable OOM event occurs:

| Control Primitive | Cgroup v1 Implementation | Cgroup v2 Implementation | Kernel Behavior on Threshold Breach |
| :--- | :--- | :--- | :--- |
| **Hard Limit** | `memory.limit_in_bytes` | `memory.max` | Immediate process termination via Linux kernel OOM Killer (returns exit code 137). |
| **Soft Limit / Backpressure** | `memory.soft_limit_in_bytes` | `memory.high` | Throttles allocating processes and forces synchronous page reclaim without killing the process. |
| **Low Reserve Guard** | N/A (unsupported) | `memory.low` | Protects a minimum memory footprint from page reclamation by adjacent competing cgroups. |
| **Out-of-Memory Tracking** | `memory.oom_control` | `memory.events` (`oom_kill` counter) | Exposes explicit event counters differentiating container-level hard limit hits from host-level OOM events. |

In cgroup v2, Kubernetes maps `resources.limits.memory` directly to `memory.max`. When a process inside the cgroup attempts an allocation that exceeds `memory.max`, and synchronous page reclamation fails to free sufficient RAM, the kernel increments the `oom_kill` counter in `memory.events` and selects a target process within the cgroup based on its OOM score (`oom_score_adj`). Deep kernel observability tools built on the [Linux eBPF Architecture](https://errorledger.com/blog/linux-ebpf-kernel-observability-architecture-jit/) trace these cgroup allocation failures directly at the kernel tracepoint level.

---

### Silent Performance Degradation: Soft Throttling vs. Hard OOM Termination

While `memory.max` triggers an abrupt `OOMKilled` crash, cgroup v2 introduces a intermediate failure state controlled by `memory.high`.

When a container's memory consumption breaches `memory.high`, the kernel does not invoke the OOM Killer. Instead, it forces every process inside that cgroup attempting memory allocations into a synchronous page reclaim loop (`direct reclaim`). The kernel slows down the process by allocating synthetic sleep delays proportional to the degree by which `memory.high` is exceeded.`
+-----------------------------------------------------------------------------------+
|               CGROUP V2 MEMORY THRESHOLD & BACKPRESSURE STAGES                   |
+-----------------------------------------------------------------------------------+
| Usage Level:      [ Normal ] -------> [ memory.high ] -------> [ memory.max ]     |
| Kernel Action:   Async Reclaim      Process Throttled            OOM Killer       |
| System State:     Full Speed         High CPU / I/O Stalls        Pod Exit 137      |
+-----------------------------------------------------------------------------------+`

This behavior introduces a severe operational trade-off:
* **The Benefit:** It gives memory-hungry processes time to perform internal garbage collection (such as JVM or Node.js GC sweeps) or flush dirty file buffers before reaching `memory.max`.
* **The Hidden Risk:** If an application continuously operates between `memory.high` and `memory.max`, it suffers extreme latency spikes and CPU throttling without ever emitting an `OOMKilled` event. Standard Pod status checks show `Running`, while API request latencies degrade dramatically due to kernel-enforced allocation stalls.

---

### Profiling Cgroup Memory Pressure via Linux Kernel PSI Telemetry

To detect memory distress before it results in a container crash or silent latency degradation, modern Linux kernels expose **Pressure Stall Information (PSI)** via `/proc/pressure/memory`.

PSI measures the exact percentage of wall-clock time that tasks spend waiting for available memory pages. It exposes two distinct metric vectors:
1. **`some` Pressure:** The percentage of time in which *at least one* task in the cgroup was stalled on memory allocation (e.g., waiting for page reclaim or swap I/O).
2. **`full` Pressure:** The percentage of time in which *all* tasks in the cgroup were simultaneously blocked on memory allocation, indicating complete execution paralysis.`text
# Reading /proc/pressure/memory inside a cgroup v2 container
some avg10=12.45 avg60=5.12 avg300=1.02 total=4512089
full avg10=4.10 avg60=1.20 avg300=0.15 total=1204890`

An elevated `some` value indicates that file page cache churn is forcing individual threads into direct reclaim. An elevated `full` value confirms that the container is actively thrashing, serving as a direct predictive indicator of an imminent `memory.max` OOMKilled termination. Similar thread exhaustion patterns caused by underlying OS kernel limits are detailed in the [AWS Kinesis OS Thread Limit Failure](https://errorledger.com/blog/aws-kinesis-operating-system-thread-limit/).

---

### Hardening Kubernetes Container Memory Limits with Cgroup v2 Memory QoS

To eliminate unexpected `OOMKilled` events while guarding against silent cgroup v2 memory throttling, infrastructure engineers must combine precise container resource configuration with kernel-level pressure telemetry:

#### 1. Decoupling Heap Size from Container Memory Limits
Never set an application's max heap size (such as Java `-Xmx` or Node.js `--max-old-space-size`) equal to `resources.limits.memory`. Always reserve a 25% to 35% memory buffer for off-heap allocations, native thread stacks, C-library overhead, and active file page cache:

$$\text{Container Limit} = \text{Max Application Heap} \times 1.30$$

#### 2. Utilizing Memory QoS Soft Limits
In Kubernetes clusters running on cgroup v2, configure Memory QoS features to populate `memory.high` automatically below `memory.max`. Setting `memory.high` at 85% of `memory.max` forces early background page reclamation without causing severe process stalls, allowing language runtime garbage collectors to run before hard limits are hit.

#### 3. Analyzing Container Memory Events via `memory.events`
When inspecting a Pod experiencing transient instability, execute a shell session into the container's cgroup v2 path to read actual kernel event counters:`text
cat /sys/fs/cgroup/memory.events
# Output:
# low 0
# high 14502         <-- High value indicates soft throttling / latency stalls
# max 3              <-- Non-zero value indicates hard limit breach
# oom 3              <-- Confirms OOM Killer invocation
# oom_kill 3         <-- Exact count of killed processes inside cgroup`

#### 4. Setting Prometheus Alerts on Memory PSI Telemetry
Configure Prometheus alert rules on cgroup v2 PSI metrics using `container_memory_pressure_user_stalled_seconds_total` (exposed by cAdvisor):`yaml
groups:
- name: cgroup_memory_alerts
  rules:
  - alert: ContainerMemoryPressureHigh
    expr: rate(container_memory_pressure_user_stalled_seconds_total[5m]) > 0.2
    for: 2m
    labels:
      severity: warning
    annotations:
      summary: "Container experiencing heavy cgroup memory stall duration (>20% of CPU time blocked on memory reclaim)"`

---

### References
*   [Linux Kernel Documentation — Control Group v2 Subsystem Specification](https://www.kernel.org/doc/Documentation/cgroup-v2.txt)
*   [Linux Kernel Documentation — Getting Started with Pressure Stall Information (PSI)](https://www.kernel.org/doc/Documentation/accounting/psi.txt)
*   [Kubernetes Core Documentation — Memory QoS and cgroup v2 Integration](https://kubernetes.io/docs/concepts/architecture/cgroups/)
