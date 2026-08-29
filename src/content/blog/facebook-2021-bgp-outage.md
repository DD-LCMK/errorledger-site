---
slug: "facebook-2021-bgp-outage"
title: "The 2021 Facebook BGP Outage: How a Routine Maintenance Command Erased a Global Network"
pubDate: "2026-08-29"
heroImage: "/facebook_2021_bgp_outage_hero.jpg"
date: "2021-10-04"
incidentDate: "2021-10-04"
incidentPeriod: "October 4, 2021"
incidentEndDate: "October 4, 2021"
author: "The Archivist"
description: "A forensic analysis of the 2021 Facebook outage, where a routine backbone-maintenance command bypassed a faulty audit safeguard, severed global connectivity, and triggered a BGP and DNS cascade."
category: "internet"
archetype: "the-incident"
provenance_tier: 1
provenance_label: "Documented Incident (Tier 1)"
provenance_source: "Engineering at Meta (Official Postmortem)"
read_time_minutes: 12
updatedDate: "2026-08-30"
lang: "en"
tags: ["BGP", "DNS", "Facebook", "Meta", "Outage", "Network Backbone"]
keywords: ["Facebook outage 2021", "BGP withdrawal", "DNS failure", "backbone network", "infrastructure collapse", "audit tool bug", "border gateway protocol"]
summary_points:
  context: "On October 4, 2021, Facebook's engineering team executed a routine command to assess the availability of global backbone capacity."
  systemic_failure: "A bug in the internal audit tool failed to intercept a catastrophic command, allowing it to sever all connections between Facebook's data centers and the internet."
  technical_mechanisms: "The sudden loss of backbone connectivity caused DNS servers to automatically withdraw their BGP advertisements, erasing Facebook from the global internet routing tables."
  fallout: "A global multi-hour outage affecting Facebook, Instagram, WhatsApp, and Oculus. Internal recovery tools were disabled, forcing engineers into secure data centers to physically reset routers, while carefully managing the large power-load changes that occurred as services were restored."
primary_sources:
  - title: "More details about the October 4 outage (Engineering at Meta)"
    url: "https://engineering.fb.com/2021/10/05/networking-traffic/outage-details/"
faqItems:
  - q: "Was the Facebook 2021 outage a cyberattack?"
    a: "No. The official Meta engineering postmortem confirms that the outage was caused by an internal configuration error during routine maintenance, not malicious activity."
  - q: "Why couldn't Facebook engineers fix the problem remotely?"
    a: "The complete loss of DNS and network connectivity disabled the internal out-of-band management tools engineers normally use for remote diagnostics, necessitating physical data center access."
  - q: "What is BGP and how did it affect Facebook?"
    a: "The Border Gateway Protocol (BGP) advertises a network's presence to the internet. When Facebook's DNS servers lost backbone connection, they automatically withdrew their BGP routes, making Facebook invisible to the internet."
  - q: "How long did the Facebook outage last?"
    a: "The major global disruption lasted roughly six hours on October 4, 2021, with network and DNS recovery beginning before all individual services had fully returned."
  - q: "Why did physical security slow down the recovery?"
    a: "Data centers are designed with strict physical and system security protocols. When remote access failed, it took extra time to clear engineers for onsite access to physically modify the hardware and routers."
  - q: "Why did Facebook have to manage power fluctuations during recovery?"
    a: "During the outage, individual data centers reported dips in power usage in the range of tens of megawatts. Reversing this sudden dip posed a severe risk to electrical systems, requiring a carefully managed recovery."
---

## Executive Summary

On October 4, 2021, a routine maintenance command meant to assess the capacity of Facebook’s global backbone network triggered an unprecedented cascade of failures.

*   **Root Cause:** An authorized engineer issued an established playbook command that inadvertently disconnected all Facebook data centers globally. A bug in an internal audit tool failed to properly stop the command.
*   **Propagation Mechanism:** With the backbone severed, Facebook's authoritative DNS servers could no longer communicate with the core data centers. Operating as designed, the DNS servers assumed a state of unhealthiness and automatically withdrew their Border Gateway Protocol (BGP) advertisements.
*   **External Manifestation:** Once those BGP routes were withdrawn, Facebook's DNS prefixes disappeared from the global routing system, making Facebook completely unreachable from the internet.

The deeper failure was that the operational control plane allowed a routine maintenance command to cross a catastrophic system boundary, completely disabling the very internal tools required for remote recovery and forcing a slow, physical intervention.

## What Was Facebook's Global Backbone?

Facebook (now Meta) operates a massive, highly integrated global infrastructure that connects computing facilities containing millions of machines across a global network of data centers and smaller edge facilities. When a user requests data—such as loading an Instagram feed or sending a WhatsApp message—the request travels from the user's device to a local edge facility. This edge facility then communicates directly over the backbone network to a larger centralized data center where the heavy computational load is processed and the information is retrieved.

The data traffic between all these computing facilities is managed by highly complex routers, which figure out exactly where to send all the incoming and outgoing data. In the extensive day-to-day work of maintaining this infrastructure, engineers routinely need to take parts of the backbone offline for maintenance. This might involve repairing a physical fiber line, adding more capacity, or updating the software on the router itself. This infrastructure is the absolute foundation of Facebook's services. When the backbone network fails, the entire ecosystem collapses, because the edge facilities are cut off from the core data centers that store the actual data.

## The Forensic Discrepancy Matrix

| Parameter | Digital Representation | Physical Reality | Evidence Status | Mechanism |
| :--- | :--- | :--- | :--- | :--- |
| **Audit Tool Authorization** | Command passed the intended audit safeguard | Command severed global backbone connections | `[DOCUMENTED]` | Audit-tool bug failed to stop the command |
| **DNS Server Health** | BGP advertisements active and routing traffic | Backbone connection lost, triggering automatic withdrawal | `[DOCUMENTED]` | Built-in fail-safe reacted to loss of connectivity |
| **Internal Management Access** | Remote diagnostic tools assumed available | Tools entirely dependent on the severed DNS/network | `[DOCUMENTED]` | Circular dependency on production network |
| **Physical Access Speed** | Engineers dispatched for immediate physical reset | Secure physical-access procedures added recovery time | `[DOCUMENTED]` | Hardened security prevented rapid physical intervention |
| **Power Consumption** | Baseline megawatts consumed by active servers | Traffic disappeared and power usage fell by tens of megawatts at individual data centers | `[DOCUMENTED]` | Rapid reduction in power demand |

## Act I: Anomaly & Quantitative Throughput

The incident began not with a critical alarm or an external intrusion, but with routine operational maintenance. On the morning of October 4, 2021, engineers were actively working on the systems that manage global backbone network capacity. In order to assess the availability of this global backbone capacity, an engineer issued a command. 

According to the [official engineering postmortem published by Meta](https://engineering.fb.com/2021/10/05/networking-traffic/outage-details/), the intention was entirely benign. However, the command unintentionally instructed the routers to take down all the connections in the backbone network, effectively disconnecting Facebook data centers globally. The command had an unusually broad scope: instead of removing a limited portion of backbone capacity, it unintentionally took down all connections in the backbone network.

Crucially, Facebook’s systems were explicitly designed to audit commands like these to prevent such exact mistakes. The system was supposed to evaluate the command, recognize that it would sever global connectivity in a catastrophic manner, and block its execution. But a bug in that audit tool prevented it from properly stopping the command. From a systems-engineering perspective, the more important failure was not the incorrect input itself, but the failure of the operational safeguards intended to prevent a command of this scope from executing. The command proceeded past the gatekeeper, the routers executed the instructions without hesitation, and the entire backbone was removed from operation.

## Act II: Architecture & Reconstruction Diagram

The architecture of Facebook's DNS and BGP routing created a secondary, far more visible failure across the broader internet. One of the primary jobs performed by Facebook's smaller edge facilities is to respond to DNS queries. DNS is the address book of the internet, enabling the simple web names users type into browsers to be translated into specific server IP addresses. These translation queries are answered by authoritative name servers that occupy well-known IP addresses themselves, which in turn are advertised to the rest of the internet via another protocol called the Border Gateway Protocol (BGP). 

To ensure reliable operation, Facebook engineered these DNS servers to explicitly disable those BGP advertisements if they could not speak to the main data centers, since this lack of communication is an indication of an unhealthy network connection. When the entire backbone was severed by the faulty command, these edge locations declared themselves unhealthy and rapidly withdrew their BGP advertisements. 

```text
[DOCUMENTED SYSTEM CASCADE]
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│ Authorized Input │──▶ │ Audit Tool Bug   │──▶ │ Backbone Severed │
└──────────────────┘    └──────────────────┘    └──────────────────┘
                                                         │
                                                         ▼
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│ Global Outage    │◀── │ BGP Withdrawal   │◀── │ DNS Unhealthy    │
└──────────────────┘    └──────────────────┘    └──────────────────┘
```

The end result was that Facebook's DNS servers became completely unreachable from the outside world, even though they were still physically operational and powered on. This made it utterly impossible for the rest of the internet to find Facebook's servers. The technical mechanism worked exactly as designed—withdrawing routes when the backend is unreachable—but the scale of the backend failure turned a localized fail-safe into a global blackout. From the public internet's perspective, Facebook's authoritative DNS infrastructure had effectively disappeared.

## Act III: Fracture Sequence & Recovery Timeline

The network collapse propagated extremely quickly. As engineers scrambled to figure out what was happening, they immediately faced two massive architectural obstacles that severely hindered the recovery effort.

First, it was physically not possible to access the data centers through normal means because their networks were down. Meta's primary and out-of-band network access was unavailable, leaving engineers unable to use their normal remote-access paths.
Second, the total loss of DNS and backbone connectivity also broke many of the internal tools the engineering team would normally use to investigate and resolve outages. The incident exposed a dangerous operational dependency: some of the systems needed to diagnose and communicate the outage depended on the network that had failed.

| UTC | Event |
| :--- | :--- |
| ~15:40 | Large-scale Facebook BGP routing changes observed |
| ~15:50 | Facebook DNS becomes unavailable externally |
| ~15:58 | Cloudflare observes Facebook DNS prefixes no longer being advertised |
| ~21:00 | Renewed Facebook BGP activity observed |
| ~21:20 | facebook.com becomes resolvable again via Cloudflare |
| ~21:28 | Facebook appears reconnected to the global internet |

Because remote access was impossible, engineers had to be dispatched onsite to the physical data centers to debug the issue and restart the systems manually. However, this took significant time. These facilities are designed with extremely high levels of physical and system security in mind. They are hard to get into, and once inside, the hardware and routers are designed to be difficult to modify even with physical access. It took extra time to activate the secure access protocols needed to get people onsite and authorized to work on the servers. Meta itself framed this as a resilience tradeoff rather than a simple security failure: the same hardening that slowed physical recovery also provided significant protection against unauthorized access during normal operations. Only then could the team definitively confirm the issue and begin the slow process of bringing the backbone back online.

## Act IV: Operational Fallout & Recovery

The immediate operational impact of the roughly six-hour major global disruption was staggering.

| Entity/Category | Metric | Documented Consequence | Status |
| :--- | :--- | :--- | :--- |
| **Facebook (Meta)** | Service Availability | Global backbone connectivity disrupted; Facebook's services became unreachable worldwide | `[DOCUMENTED]` |
| **Global Users** | Accessibility | Users worldwide unable to access Facebook, Instagram, WhatsApp, Oculus | `[DOCUMENTED]` |
| **Internal Tools** | Operational Capability | Complete failure of remote diagnostic and management tools | `[DOCUMENTED]` |
| **Power Infrastructure** | Megawatt Fluctuation | Power usage fell by tens of megawatts at individual data centers | `[DOCUMENTED]` |

Once the backbone network connectivity was restored, the problem was not entirely over. Bringing services back online simultaneously risked a new round of crashes due to a massive surge in traffic. Individual data centers reported dips in power usage in the range of tens of megawatts during the outage, because servers were sitting idle without traffic. Suddenly reversing such a massive dip in power consumption could put everything from electrical systems to caches at immense risk. Thanks to extensive "storm" drills—simulations of major system failures where regions are taken offline to stress test infrastructure—the engineering teams had the necessary confidence to carefully manage the increasing loads, bringing services back up relatively quickly without further systemwide electrical or caching failures.

## 🛡️ Systems Prevention Playbook

The investigation into the October 2021 BGP outage highlights several critical areas for engineering defense. The following systems prevention playbook categorizes the necessary defenses.

### 1. Friction Defenses
Where should the software deliberately slow the operator down?
- **Global Command Segmentation:** Commands that affect global backbone connectivity must never be executable as a single, unbounded action. Maintenance commands must be staggered across regions, requiring manual verification of stability before proceeding to the next segment.

### 2. Boundary Constraints — Engineering Recommendation
What physical or business invariant must software refuse to violate?
The following controls are engineering recommendations derived from the failure; they are not claims about the exact controls Meta implemented after the incident.
- **Audit Tool Fallbacks:** Audit systems should fail safely and reject high-impact commands when validation is unavailable or ambiguous. If an audit tool contains a bug or fails to evaluate a command correctly, it should default to a restrictive state (`fail-safe`), explicitly denying any action that could result in a total loss of backbone connectivity.

### 3. Emergency Brakes
What condition must automatically trigger a hard stop?
- **Out-of-Band Management Isolation:** Internal diagnostic and recovery tools must never share a critical dependency with the production network they are meant to manage. A true out-of-band management network must remain operational even if the primary BGP and DNS infrastructure is entirely erased from the internet.

## The Archivist's Verdict

> **The Archivist's Assessment:**
> The 2021 Facebook BGP outage stands as a monumental case study in the dangers of tightly coupled systems and circular operational dependencies. A single routine command, slipping past a buggy audit tool, was all it took to sever the digital spine of one of the world's most robust networks. 
> 
> The architecture behaved exactly as it was programmed to: the DNS servers, unable to reach the backbone, correctly assessed themselves as unhealthy and withdrew their BGP routes. The catastrophic failure was not caused by the BGP withdrawal mechanism itself; the withdrawal was a designed response to the loss of connectivity. The deeper engineering failure was that the command reached execution despite the audit system intended to prevent such mistakes. 
> 
> Furthermore, the incident exposed the severe risk of relying on internal management tools that depend on the very network they are designed to fix. The fact that highly secure, hardened physical facilities slowed down the recovery is a fascinating example of how physical security protocols can directly conflict with operational resilience during a total logical failure.

> **What the evidence establishes:**
> - A routine maintenance command unintentionally severed global backbone connections.
> - A bug in an audit tool failed to prevent the command's execution.
> - The loss of backbone connectivity caused DNS servers to automatically withdraw BGP advertisements.
> - Many internal management and recovery tools became unavailable because they depended on network connectivity that had been disrupted by the outage.
> - Secure physical-access procedures added time before engineers could work onsite.

> **What the evidence does NOT establish:**
> - The evidence does not establish any malicious activity, cyberattack, or external sabotage.
> - The evidence does not establish that the individual engineer acted maliciously or deliberately bypassed required controls.
> - The evidence does not establish the exact internal logic of the audit tool bug, only its failure to intercept the command.

## Then vs Now: Engineering Evolution After the Facebook Outage

The 2021 Facebook BGP outage demonstrated the catastrophic potential of single-point management failures in highly coupled networks.

| Failure Pattern | Defensive Pattern |
| :--- | :--- |
| Global high-impact command | Regionalized execution and staged rollout |
| Insufficient command validation | Independent validation and hard safety boundaries |
| Management dependency on production network | Independently survivable out-of-band management |
| Recovery assumptions not exercised at global scale | Regular worst-case recovery testing |

## FAQ: Facebook 2021 Outage Explained

### Was the Facebook 2021 outage a cyberattack?
No. The official Meta engineering postmortem confirms that the outage was caused by an internal configuration error during routine maintenance, not malicious activity.

### Why couldn't Facebook engineers fix the problem remotely?
The backbone outage made Meta's normal primary and out-of-band network access unavailable, while the loss of DNS also disrupted many internal tools used for diagnosis and recovery. Engineers therefore had to access data centers physically.

### What is BGP and how did it affect Facebook?
The Border Gateway Protocol (BGP) advertises a network's presence to the internet. When Facebook's DNS servers lost backbone connection, they automatically withdrew their BGP routes, making Facebook invisible to the internet.

### How long did the Facebook outage last?
The major global disruption lasted roughly six hours on October 4, 2021, with network and DNS recovery beginning before all individual services had fully returned.

### Why did physical security slow down the recovery?
Data centers are designed with strict physical and system security protocols. When remote access failed, it took extra time to clear engineers for onsite access to physically modify the hardware and routers.

### Did the outage cause a power surge?
During the outage, individual data centers reported dips in power usage in the range of tens of megawatts. Reversing the sudden reduction in power consumption could put electrical systems and caches at risk, so services had to be restored carefully.

## Primary Sources
- [More details about the October 4 outage (Engineering at Meta, October 5, 2021)](https://engineering.fb.com/2021/10/05/networking-traffic/outage-details/)
- [Update about the October 4th outage (Engineering at Meta, October 4, 2021)](https://engineering.fb.com/2021/10/04/networking-traffic/outage/)
- [Understanding How Facebook Disappeared from the Internet (Cloudflare Blog)](https://blog.cloudflare.com/october-2021-facebook-outage/)

[See also: The Friday Update That Broke the World](/blog/the-friday-update-that-broke-the-world)
[See also: Knight Capital Trading Glitch](/blog/knight-capital-trading-glitch-45-minutes)
