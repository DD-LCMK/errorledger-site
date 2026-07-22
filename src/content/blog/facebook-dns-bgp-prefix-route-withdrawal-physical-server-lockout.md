---
title: "Facebook DNS BGP prefix route withdrawal physical server lockout"
meta_title: "Facebook 2021 BGP DNS Routing Outage"
description: "A faulty maintenance command triggered a global Facebook DNS BGP prefix route withdrawal physical server lockout, disabling services for six hours."
pubDate: "2026-07-16"
tags: ["facebook", "bgp", "dns", "network-routing", "incident-analysis", "service-outage"]
slug: "facebook-dns-bgp-prefix-route-withdrawal-physical-server-lockout"
---

# Facebook DNS BGP prefix route withdrawal physical server lockout [Status: RESOLVED]

### The Incident
| Field | Value |
| :--- | :--- |
| **Company** | Facebook (Meta) |
| **Date** | October 4, 2021 |
| **Status** | RESOLVED |
| **Category** | Border Gateway Protocol (BGP) Routing Collapse |
| **Root Cause** | Auditing bug passing a faulty capacity assessment command that severed backbone routing |
| **Operational Impact** | Worldwide outage of Facebook, Instagram, WhatsApp, and physical security lockout |
| **Official RCA** | [Meta Engineering Post-Mortem](https://engineering.fb.com/2021/10/05/networking-traffic/outage-details/) |

On October 4, 2021, an accidental backbone network configuration change caused a massive global Facebook DNS BGP prefix route withdrawal physical server lockout. The incident began during a routine capacity assessment when a command bypassed safety checks due to a bug in the audit tool, severing data center connections. As a safety response, Facebook's DNS servers withdrew their route advertisements, locking engineers out of both logical networks and physical servers. Global internet traffic could no longer route to Facebook domains, causing a total blackout of Facebook, Instagram, WhatsApp, Messenger, and Oculus services for roughly six hours.

*   **2021-10-04 15:39 UTC**: Engineers run a capacity measurement command, disabling the internal backbone network connectivity.
*   **2021-10-04 15:45 UTC**: DNS servers withdraw BGP route advertisements, leaving domains unresolvable on the web.
*   **2021-10-04 18:00 UTC**: Rescue teams arrive at data centers but are physically delayed by badge-reader outages.
*   **2021-10-04 22:50 UTC**: Engineers manually connect to console ports and revert the router configuration.

### Systems Affected & Operational Impact
The outage directly targeted Facebook's global backbone fiber network. Platforms such as Instagram, WhatsApp, Messenger, and Oculus VR were instantly disconnected from the internet. The operational impact extended internally; because corporate networks were tied to the same production DNS servers, employees lost access to emails, Workplace systems, and diagnostic portals. The physical security systems, including data center badge readers, were disabled, locking engineers out of server rooms and delaying the remediation process.

### The Technical Failure
The failure started during routine maintenance when engineers executed a command to evaluate the capacity of Facebook's global backbone network. The configuration command accidentally instructed backbone routers to drop all active peer connections. Although Facebook used a pre-deployment auditing tool designed to catch such catastrophic commands, a software bug in the auditor allowed the command to execute without warnings.

Once the backbone routers dropped connections, the self-hosted DNS servers lost contact with Facebook's active data centers. Consequently, the DNS servers automatically withdrew their BGP route advertisements to prevent sending traffic to unhealthy nodes. The rest of the internet routing engines could no longer navigate to Facebook's DNS servers, causing DNS queries to time out globally.

### Vendor Response & Evolution
To resolve the outage, dispatch teams had to physically enter data centers, bypass electronic door locks, and interface directly with router console ports via physical serial cables. Since the outage, Facebook has implemented strict validation protocols in its auditing systems, separated corporate network lines from production networks, configured data center badge systems to run on local decentralized fallback databases, and segmented the backbone network to restrict single-command blast zones.

### Engineering Analysis & Historical Comparisons
The October 2021 Facebook incident demonstrates the risk of circular dependencies where a logical network failure disables the physical tools needed to repair it. It is historically compared to the [2022 Rogers Communications Outage](https://errorledger.com/blog/rogers-routing-table-overload-outage-2022), where a faulty configuration change deleted a routing filter, exceeding core network capacity and disabling service nationwide. SRE teams must isolate administrative networks from production routing paths and maintain out-of-band serial consoles that do not rely on local DNS or active IP backbones.

### References
*   [Meta Engineering Backbone Outage Post-Mortem Report](https://engineering.fb.com/2021/10/05/networking-traffic/outage-details/)
*   [Cloudflare BGP and DNS Outage Analysis Blog](https://blog.cloudflare.com/october-2021-facebook-outage/)