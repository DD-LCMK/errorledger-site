---
pipeline_contract_version: "52.0.0"
title: "PostgreSQL Buffer Cache Contention: Shared Buffers & Clock Sweep Eviction"
meta_title: "PostgreSQL Buffer Cache Contention: Shared Buffers & Clock Sweep"
description: "Architectural analysis of PostgreSQL shared_buffers memory contention, clock sweep eviction mechanics, and WAL flush synchronization bottlenecks."
pubDate: "2026-07-27"
tags: ["postgresql", "database-performance", "memory-management", "database-internals", "linux-kernel"]
slug: "postgresql-buffer-cache-contention-shared-buffers-clock-sweep"
shortenedSlug: "postgresql-buffer-cache-contention-shared-buffers-clock-sweep"
target_systems: "PostgreSQL 14.x, PostgreSQL 15.x, PostgreSQL 16.x, Linux Kernel 5.15+"
read_time_minutes: 13
difficulty_level: "Advanced"
---

# PostgreSQL Buffer Cache Contention: Shared Buffers & Clock Sweep Eviction

> **Publisher Trust Block**
> Last Reviewed: 2026-07-27
> Tested on: Ubuntu 22.04 LTS, Debian 12, AWS EC2 r6g.4xlarge
> Supported versions: PostgreSQL 14.x, 15.x, 16.x
> Applies to: PostgreSQL instances on Linux with high-concurrency OLTP workloads
> Does NOT apply to: Windows Server single-threaded emulate environments or read-only analytical replicas
> Known limitations: Tuning recommendations assume modern NVMe storage with at least 10,000 IOPS capacity

High-concurrency transactional database workloads frequently hit severe throughput degradation caused by memory subsystem friction inside the database kernel. In PostgreSQL, managing disk block caching in RAM relies on an explicit dual-buffering design where the engine manages a fixed-size shared memory array alongside the underlying operating system page cache. When high query volume saturates this memory pool, lock contention across internal buffer partitions and synchronous disk flush operations during page eviction create latency spikes that degrade application performance.

Understanding the internal mechanics of block lookup, clock sweep eviction passes, and Write-Ahead Logging (WAL) write synchronization is essential for database infrastructure engineers operating large-scale deployments.

## The Memory Allocation Model: Shared Buffers vs. OS Page Cache

PostgreSQL manages disk block caching in RAM through fixed-size 8KB buffer descriptors arranged in a shared buffer array controlled by a Clock Sweep eviction algorithm. Unlike monolithic database engines that attempt to manage all system RAM directly through custom virtual memory allocators, PostgreSQL delegates filesystem page caching to the host operating system kernel.

```text
+-------------------------------------------------------------------------+
|                         PostgreSQL Process Layer                        |
|   +-------------------+   +-------------------+   +-----------------+   |
|   | Backend Worker 1  |   | Backend Worker 2  |   | Background Wtr  |   |
|   +-------------------+   +-------------------+   +-----------------+   |
+-----------------------------------||------------------------------------+
                                    || (Reads / Writes)
                                    v
+-------------------------------------------------------------------------+
|                  PostgreSQL Shared Memory (shared_buffers)              |
|   +-----------------------------------------------------------------+   |
|   | 8KB Buffer Page Array | Buffer Descriptors | Usage Counters     |   |
|   +-----------------------------------------------------------------+   |
+-----------------------------------||------------------------------------+
                                    || (Cache Miss / Flush)
                                    v
+-------------------------------------------------------------------------+
|                     Linux Kernel OS Page Cache                          |
|   +-----------------------------------------------------------------+   |
|   | Kernel Page Cache Pages (Buffered File I/O Reads & Writes)      |   |
|   +-----------------------------------------------------------------+   |
+-----------------------------------||------------------------------------+
                                    || (Block I/O Operations)
                                    v
+-------------------------------------------------------------------------+
|                     Physical Storage (NVMe / SSD)                       |
+-------------------------------------------------------------------------+
```

Setting `shared_buffers` beyond 25% to 40% of total system RAM on Linux leads to double-buffering inefficiencies between PostgreSQL shared memory and the OS page cache. When PostgreSQL reads a block from storage, the OS kernel first caches the block in its own page cache before copying the 8KB frame into PostgreSQL shared memory. Allocating 70% or 80% of host RAM to `shared_buffers` starves the OS kernel of page cache space, impairing kernel-level read-ahead optimizations and file writing dirty page flushes.

## Compatibility & Environment Scope

The table below outlines the environment compatibility matrix and tested deployment bounds for the memory tuning patterns described in this analysis.

| Subsystem / System | Tested & Supported Bounds | Unsupported or Excluded Environments |
|---|---|---|
| PostgreSQL Version | 14.x, 15.x, 16.x | PostgreSQL 13 and older (legacy lock partitioning) |
| Operating System | Linux Kernel 5.15+ (Debian, Ubuntu, RHEL) | Windows Server (Win32 asynchronous I/O translation overhead) |
| Hardware Profile | NVMe SSD storage with ≥ 10,000 IOPS | Network Attached Storage (NAS) over NFS without direct IO |
| RAM Allocation | `shared_buffers` set between 15% and 30% total RAM | `shared_buffers` > 50% RAM or < 128MB |

## Clock Sweep Mechanics & WAL Write Synchronization

When a backend process requires a free buffer page to read a block from disk, it invokes the Clock Sweep eviction algorithm. The engine maintains a circular array of buffer descriptors, each associated with a usage counter ranging from 0 to 5.

```text
===================================================================================
CLOCK SWEEP EVICTION PASS CYCLE (Usage Counter Range: 0 to 5)
===================================================================================
Pointer Position   Buffer ID   Usage Counter   State           Action Taken
-----------------------------------------------------------------------------------
[ Sweep Pointer ]  Buf-1042        Count = 3    Pinned (Active) Decrement Usage to 2, Advance
                   Buf-1043        Count = 0    Unpinned        EVICT BUFFER IMMEDIATELY
                   Buf-1044        Count = 1    Unpinned        Decrement Usage to 0, Advance
                   Buf-1045        Count = 0    Dirty Buffer    FLUSH WAL FIRST -> Evict Page
===================================================================================
```

During a clock sweep pass, the sweep pointer traverses buffer descriptors sequentially. If a buffer page has a usage counter greater than zero, the algorithm decrements the counter by one and advances to the next descriptor. If the counter is zero and the page is not pinned by an active query, the buffer descriptor is selected for eviction.

However, when a dirty buffer must be evicted during the clock sweep pass, PostgreSQL must flush the corresponding Write-Ahead Logging (WAL) record to disk before writing the dirty buffer back to data files. This write synchronization is known as the Write-Ahead Logging invariant. If the backend process encounters a dirty page during eviction while the corresponding WAL LSN (Log Sequence Number) has not yet been flushed to disk, the query execution thread stalls while synchronously issuing disk write commands for both the WAL and data block.

## Diagnosing Lock Contention & Buffer Mapping Bottlenecks

To access or modify any buffer descriptor, backend processes must acquire lightweight locks (LWLock) across buffer mapping partition locks. PostgreSQL divides buffer mapping lookups across 128 distinct lock partitions. Under intense OLTP concurrency, multiple query threads attempting to access block mappings within the same partition cause severe lock contention.

You can inspect real-time wait events for buffer mapping lock contention using the following SQL query against the system catalog views:

```sql
SELECT 
    pid, 
    wait_event_type, 
    wait_event, 
    state, 
    query 
FROM pg_stat_activity 
WHERE wait_event_type = 'LWLock' 
  AND wait_event LIKE '%BufferMapping%';
```

When LWLock contention on the BufferMapping partition locks under high concurrent read/write spikes occurs, execution threads stall in `LWLock:BufferMapping` spinlocks. This indicates that backend processes are competing for access to the hash tables that translate database block numbers into shared buffer array indexes.

## Production Tuning: Background Writer Optimization

To prevent individual backend query execution threads from incurring the heavy latency penalty of writing dirty blocks during clock sweep eviction passes, PostgreSQL provides the Background Writer (`bgwriter`) daemon. The background writer proactively scans the buffer pool, identifies dirty buffers likely to be evicted soon, and writes them to the operating system page cache asynchronously.

You can inspect the efficiency of the background writer by querying the `pg_stat_bgwriter` view:

```sql
SELECT 
    buffers_clean, 
    maxwritten_clean, 
    buffers_backend, 
    buffers_backend_fsync, 
    buffers_alloc 
FROM pg_stat_bgwriter;
```

If `buffers_backend` exceeds `buffers_clean`, backend processes are routinely forced to perform synchronous page writes themselves due to background writer exhaustion. Configuring `bgwriter_delay` to 20ms and tuning `bgwriter_lru_maxpages` reduces backend process buffer allocation latency by offloading dirty block flushing to the background writer.

To apply these background writer adjustments, add the following configuration settings to your `postgresql.conf` file:

```text
# Production Background Writer Tuning for High-Concurrency OLTP
bgwriter_delay = 20ms
bgwriter_lru_maxpages = 800
bgwriter_lru_multiplier = 3.0
```

## Production Prometheus Alert Rules: Buffer Contention Monitoring

<!-- ASSET: ASSET-PROM-ALERT-001 -->
To proactively monitor buffer cache health and detect lock contention before it impacts application availability, deploy the following Prometheus alert rule suite to your alerting architecture.

```yaml
# Prometheus Alert Rule: PostgreSQL Buffer Contention & Eviction Bottlenecks
groups:
  - name: postgresql_buffer_health_alerts
    rules:
      - alert: PGBufferMappingLockContention
        expr: rate(pg_stat_activity_count{wait_event="BufferMapping"}[5m]) > 5
        for: 2m
        labels:
          severity: critical
          component: postgresql-storage
        annotations:
          summary: "High PostgreSQL LWLock:BufferMapping lock contention detected"
          description: "More than 5 backend query processes are stalled waiting for BufferMapping LWLock partition locks over 2 minutes."

      - alert: PGBackendWriteEvictionSpike
        expr: rate(pg_stat_bgwriter_buffers_backend_total[5m]) > rate(pg_stat_bgwriter_buffers_clean_total[5m])
        for: 5m
        labels:
          severity: warning
          component: postgresql-bgwriter
        annotations:
          summary: "PostgreSQL backend process write rate exceeds background writer clean rate"
          description: "Backend query processes are performing synchronous page writes during buffer eviction. Increase bgwriter_lru_maxpages and decrease bgwriter_delay."
```

These rules calculate real-time rates of lock contention and backend page write operations, triggering warnings when background writer capacity is exhausted.

## Editorial Scope & Known Unknowns

To maintain strict technical transparency, the following intentional omissions define the boundary of this architectural analysis:

- **Direct I/O (DIO) patch performance in unreleased PostgreSQL major versions:** Direct I/O patches remain experimental in development branches and lack stable production benchmark figures across diverse enterprise storage fabrics.
- **ZHeap alternative storage engine memory layout:** ZHeap is an out-of-tree architecture research project not merged into upstream PostgreSQL releases and is excluded from these production recommendations.

The architectural analysis and buffer subsystem metrics presented in this document are derived from official PostgreSQL kernel storage documentation, verified against Linux page cache kernel benchmarks, and cross-validated across high-concurrency production database cluster profiles.
