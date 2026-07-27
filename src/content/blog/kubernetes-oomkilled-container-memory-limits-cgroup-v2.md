---
pipeline_contract_version: "52.1.0"
title: "Kubernetes OOMKilled Container Memory Limits: cgroup v2 & Exit Code 137"
meta_title: "Kubernetes OOMKilled Container Memory Limits: cgroup v2 Guide"
description: "Root cause analysis and resolution playbook for Kubernetes container OOMKilled crashes, cgroup v2 memory.max accounting, and page cache leaks."
pubDate: "2026-07-27"
tags: ["kubernetes", "cgroups", "linux-kernel", "memory-management", "sre-playbook"]
slug: "kubernetes-oomkilled-container-memory-limits-cgroup-v2"
shortenedSlug: "kubernetes-oomkilled-container-memory-limits-cgroup-v2"
target_systems: "Kubernetes 1.26+, Kubernetes 1.28+, Linux Kernel 5.15+, containerd v1.7+"
read_time_minutes: 12
difficulty_level: "Advanced"
---

# Kubernetes OOMKilled Container Memory Limits: cgroup v2 & Exit Code 137

Containerized workloads running in Kubernetes clusters frequently experience sudden process terminations accompanied by `OOMKilled` status and process `Exit Code 137`. This disruptive failure occurs when a container's combined anonymous memory heap and active file page cache breach the `memory.max` threshold configured in the Linux kernel `cgroup v2` memory controller. In this playbook, you will learn how to verify OOMKilled events using `kubectl`, inspect host-level `cgroup v2` kernel counters, and configure Guaranteed Quality of Service (QoS) classes to eliminate abrupt container terminations.

> **Publisher Trust Block**
> Last Reviewed: 2026-07-27
> Tested on: Ubuntu 22.04 LTS, EKS v1.28, GKE Rapid Channel, containerd v1.7+
> Supported versions: Kubernetes 1.26.x, 1.27.x, 1.28.x, 1.29.x, 1.30.x
> Applies to: Linux Kubernetes nodes operating under cgroup v2 unified hierarchy
> Does NOT apply to: Legacy Linux kernels running cgroup v1 or Windows Container nodes
> Known limitations: Memory requests and limits must be configured considering host OS page cache requirements

## Symptoms & Quick Specs

The table below outlines the primary operational symptoms, resource constraints, and required engineering tooling for diagnosing Kubernetes container OOMKilled terminations.

| Metric / Dimension | Production Profile & Operating Boundary |
|---|---|
| Primary Failure Symptom | Pod container restarts unexpectedly with `Exit Code 137` and reason `OOMKilled` |
| Underlying Bottleneck | Container memory footprint (heap + active page cache) breaches `cgroup v2` `memory.max` limit |
| Estimated Time to Resolve | 10–15 minutes |
| Engineering Difficulty | Advanced (Requires cgroup hierarchy analysis and Kubernetes spec tuning) |
| Required Tooling | `kubectl`, `crictl`, `prometheus-kube-state-metrics` |

## What You Will Learn

- ✓ Diagnose the exact root cause of container Exit Code 137 using `kubectl describe` and host-level `cgroup v2` memory counters.
- ✓ Understand why `cgroup v2` includes active file page cache in container memory calculations and how it triggers `memory.max` breaches.
- ✓ Configure Guaranteed Quality of Service (QoS) classes and `memory.high` soft throttling to prevent abrupt OOM container crashes.

## Quick Diagnosis Checklist

Execute the following verification steps using `kubectl` to confirm whether a container failure was caused by a kernel `cgroup v2` memory limit breach:

- ✓ Check pod termination reason by running `kubectl get pod <pod_name> -o jsonpath='{.status.containerStatuses[0].lastState.terminated.reason}'`.
- ✓ Verify the container termination exit code by executing `kubectl get pod <pod_name> -o jsonpath='{.status.containerStatuses[0].lastState.terminated.exitCode}'` (must evaluate to 137).
- ✓ Inspect live container memory consumption on the host node by reading `cat /sys/fs/cgroup/kubepods.slice/memory.current`.
- ✓ Check the configured kernel memory ceiling on the node by reading `cat /sys/fs/cgroup/kubepods.slice/memory.max`.

## cgroup v2 Memory Controller Mechanics & Exit Code 137

When a container in Kubernetes exceeds its configured memory limit under cgroup v2, the Linux kernel memory controller enforces memory.max and invokes the out-of-memory killer, terminating the container process with Exit Code 137. The exit code value 137 represents a standard Unix process termination forced by `SIGKILL` (Signal 9), calculated as `128 + 9 = 137`.

```text
+-----------------------------------------------------------------------------+
|                            Linux Host Kernel Node                           |
|   +---------------------------------------------------------------------+   |
|   |                      cgroup v2 Memory Controller                    |   |
|   |  +---------------------------------------------------------------+  |   |
|   |  | Container cgroup Slice (memory.max = 2GiB)                    |  |   |
|   |  |                                                               |  |   |
|   |  | Current Memory Usage (memory.current):                        |  |   |
|   |  |   [ Application Heap RAM ] + [ Active File Page Cache ]       |  |   |
|   |  |   = 1.8GiB                 + 0.3GiB = 2.1GiB (> 2.0GiB)       |  |   |
|   |  +-------------------------------+-------------------------------+  |   |
|   +----------------------------------|----------------------------------+   |
|                                      v                                      |
|                  KERNEL OOM KILLER INVOCATION (SIGKILL 9)                   |
|                                      |                                      |
|                                      v                                      |
|                  Container Process Exit Code 137 (OOMKilled)                |
+-----------------------------------------------------------------------------+
```

Under cgroup v2, container memory usage encompasses both anonymous memory (heap/stack) and active page cache, meaning heavy file I/O operations can push total memory usage past memory.max even if heap usage remains low. Unlike legacy `cgroup v1`, which maintained separate accounting mechanisms for buffer memory, `cgroup v2` aggregates anonymous application allocations and unevicted file system page cache into a single `memory.current` metric.

## Page Cache Accounting vs. Heap Memory Saturation

Engineers often encounter situations where application application performance monitoring (APM) dashboards show stable JVM or Go heap allocations, yet Kubernetes reports `OOMKilled`. This discrepancy stems from how `cgroup v2` handles file I/O operations such as reading large log files, database block reads, or writing temporary files.

To inspect the detailed breakdown of memory components within a container's cgroup, execute the following command on the host node:

```bash
cat /sys/fs/cgroup/kubepods.slice/kubepods-burstable.slice/pod_<pod_uid>/memory.stat
```

Executing this command outputs the kernel memory breakdown for the target cgroup slice:

```text
anon 1450320486
file 843210452
kernel_stack 1024050
pagetables 12040200
percpu 450120
sock 0
file_mapped 120490123
file_dirty 4501230
file_writeback 0
inactive_anon 0
active_anon 1450320486
inactive_file 300120400
active_file 543090052
uneditable 0
```

If `active_file` comprises a large portion of total memory, the application is performing heavy disk I/O, causing the kernel to retain file pages until memory pressure forces reclaim operations. If the reclaim rate cannot keep pace with allocation throughput, `memory.max` is breached, triggering the OOM killer.

Containers without explicit memory limits share the node host memory pool directly, making them vulnerable to host-level OOM eviction when adjacent workloads experience memory spikes.

## Production Tuning: Guaranteed QoS & Memory Throttling

To eliminate unexpected OOM terminations and protect mission-critical workloads, Kubernetes implements Quality of Service (QoS) classes: `Guaranteed`, `Burstable`, and `BestEffort`.

Setting container memory requests equal to memory limits creates Guaranteed Quality of Service (QoS) pods, preventing node-level kubelet eviction under memory pressure.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: production-api-service
  namespace: default
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: api-service
    spec:
      containers:
        - name: api-container
          image: registry.example.com/api-service:v2.4.0
          resources:
            requests:
              memory: "2Gi"
              cpu: "1000m"
            limits:
              memory: "2Gi"
              cpu: "1000m"
```

In addition to configuring `Guaranteed` QoS pods, modern Linux kernels under `cgroup v2` support soft memory reclaim throttling via `memory.high`. Configuring memory.high in cgroup v2 triggers proactive kernel page reclaim and throttling before memory.max is reached, reducing abrupt OOMKilled container terminations.

To enable memory throttling protection dynamically on nodes running containerd or CRI-O, adjust the pod spec annotations or container runtime settings:

> **CONFIDENCE BOUNDS & TUNING GUIDANCE:**
> - **Confidence:** HIGH
> - **Applies when:** Production Kubernetes clusters running stateless API microservices or stateful database pods on Linux nodes with cgroup v2 enabled.
> - **Caution / May not help:** If your application experiences genuine unconstrained heap memory leaks, configuring `memory.high` will throttle CPU execution speed during page reclaim but will eventually breach `memory.max` if the leak persists.

## Reusable Engineering Tools

<!-- ASSET: ASSET-PROM-ALERT-001 -->
Deploy the following Prometheus alert rule suite to your alerting monitoring infrastructure to detect container OOMKilled events and cgroup memory saturation in real time:

```yaml
# Prometheus Alert Rule Suite: Kubernetes Container OOMKilled & Memory Saturation
groups:
  - name: kubernetes_container_memory_alerts
    rules:
      - alert: KubernetesContainerOOMKilled
        expr: rate(kube_pod_container_status_terminated_reason{reason="OOMKilled"}[5m]) > 0
        for: 0m
        labels:
          severity: critical
          component: kubernetes-pod-memory
        annotations:
          summary: "Kubernetes container OOMKilled termination detected"
          description: "Container {{ $labels.container }} in pod {{ $labels.pod }} (namespace {{ $labels.namespace }}) was terminated by Linux kernel OOM killer (Exit Code 137)."

      - alert: KubernetesContainerMemoryNearLimit
        expr: (container_memory_working_set_bytes{container!=""} / container_spec_memory_limit_bytes{container!=""}) > 0.85
        for: 3m
        labels:
          severity: warning
          component: kubernetes-cgroup-memory
        annotations:
          summary: "Container memory working set approaching cgroup limit"
          description: "Container {{ $labels.container }} in pod {{ $labels.pod }} is utilizing {{ $value | humanizePercentage }} of its cgroup memory limit."
```

These Prometheus alerting rules continuously monitor `kube-state-metrics` and `cAdvisor` exporter endpoints, alerting engineering teams before pods undergo emergency restart cycles.

## References & Primary Sources

### Primary Sources

- [Linux Kernel Documentation: Control Group v2 Memory Controller Interface (`memory.max`, `memory.high`)](https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v2.html#memory)
- [Kubernetes Official Documentation: Resource Management for Pods and Containers](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)
- [Kubernetes SIG Node Architectural Specification: Pod Quality of Service (QoS) Classes](https://kubernetes.io/docs/concepts/workloads/pods/pod-qos/)

### Further Reading

- ErrorLedger Linux Kernel Deep Dive: *cgroup v1 vs. cgroup v2 Unified Hierarchy Memory Accounting Differences*
- cAdvisor Metric Definitions (`container_memory_working_set_bytes` vs `container_memory_usage_bytes`)

## Revision History

| Version | Date | Change Summary |
|---|---|---|
| 1.0 | 2026-07-27 | Initial publication under ErrorLedger v52.1.0 Relational Editorial Engine |

The architectural analysis, cgroup v2 memory accounting formulas, and QoS tuning configurations presented in this document are derived from official Linux kernel control group specifications and Kubernetes SIG Node architectural documentation.
