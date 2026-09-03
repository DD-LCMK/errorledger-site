---
pubDate: "2026-09-03"
title: "The 1990 AT&T Long Distance Network Collapse"
description: "How a software defect in AT&T's 4ESS recovery logic turned a routine switch fault into a nine-hour nationwide long-distance outage."
slug: "att-long-distance-network-collapse"
author: "ErrorLedger Newsroom"
category: "internet"
heroImage: "/images/stories/hero-att-1990.jpg"
lang: "en"
keywords: ["AT&T", "1990 outage", "4ESS switch", "C programming", "break statement", "cascading failure", "network collapse"]
summary_points:
  context: "In 1990, AT&T handled the vast majority of U.S. long-distance calls through a network of 114 highly advanced 4ESS electronic switching systems connected through a Common Channel Signaling System No. 7 (CCS7) signaling network."
  trigger: "A routine software upgrade designed to speed up call processing contained a subtle logical error: a misplaced 'break' statement within a nested 'if' block inside a 'switch' statement in C, which could prematurely exit the switch block and skip critical pointer initialization."
  technical_mechanisms: "A trunk-interface hardware fault at one New York 4ESS caused it to send a congestion signal and then resume sending call attempts. When a neighboring switch received a second call attempt while still updating its internal recovery state, the misplaced 'break' caused it to skip pointer initialization. Subsequent optional-parameter processing operated on invalid state, corrupting the switch's memory. Error-recovery logic detected the inconsistency and shut the switch down, broadcasting its own recovery traffic to peers and propagating the same failure through the network."
  fallout: "For nine hours, the AT&T network was trapped in a cascading reboot loop. AT&T later reported that 83 million of 148 million calls handled that day were completed, a 56% completion rate, with contemporary estimates placing lost revenue at roughly $60 million."
  systemic_failure: "The AT&T 1990 collapse is the canonical demonstration of how extreme homogeneity and rapid automated recovery mechanisms can transform a localized software bug into a systemic contagion. The system designed to isolate faults became the precise mechanism that propagated them."
incidentDate: "1990-01-15"
financialLoss: "~$60 million"
downtimeDuration: "9 hours"
provenance_tier: 1
provenance_label: "Documented Incident with Reconstructed Technical Mechanism"
provenance_source: "AT&T contemporary technical disclosure (RISKS Digest Vol. 9), post-mortem regulatory reporting, Los Angeles Times (Jan 17, 1990)"
read_time_minutes: 12
faqItems:
  - q: "What exactly caused the AT&T 1990 outage?"
    a: "A software bug introduced in a mid-December 1989 update. A misplaced break statement in a C program caused switches to skip pointer initialization when they received a call attempt from a neighboring switch during a narrow recovery-state window. Subsequent processing used the resulting uninitialized pointer state, corrupting memory and triggering an automatic shutdown."
  - q: "How did one bug take down the whole country?"
    a: "The vulnerable recovery software had been deployed broadly across the 4ESS network, creating a common-mode software failure condition. When one switch crashed during recovery, its resumed call traffic triggered the same defect in neighboring switches, causing them to crash and propagate the same failure outward."
  - q: "Did a hacker cause the AT&T collapse?"
    a: "No. Initially, there were widespread rumors of a cyberattack or a computer virus, but AT&T's subsequent investigation traced the outage to a software defect in the switching system's recovery logic."
  - q: "How long was the AT&T network down?"
    a: "The severe disruption lasted approximately 9 hours on January 15, 1990. AT&T later reported that 83 million of 148 million calls handled that day were completed, a 56% call-completion rate."
  - q: "How much did the 1990 outage cost AT&T?"
    a: "Contemporary estimates placed AT&T's lost revenue at roughly $60 million. TIME Magazine reported a range of $60 to $75 million."
  - q: "What programming language was the bug written in?"
    a: "The bug was in C. In C, break terminates the nearest enclosing loop or switch, not an if block. The misplaced break therefore exited the switch before required pointer setup occurred, leaving subsequent processing to use uninitialized pointer state."
  - q: "How did AT&T fix the network collapse?"
    a: "AT&T stabilized the network using a software override that reduced the CCS7 signaling load, allowing affected switches to recover without immediately retriggering the cascade. Full service was restored by 11:30 PM EST. The underlying software defect was then corrected."
  - q: "Why is the AT&T 1990 crash important for modern software?"
    a: "It became a widely cited case study in software reliability, cascading failure, common-mode defects, and recovery-path testing. It demonstrated that automated recovery mechanisms can act as propagation vectors when a common software defect exists across a homogeneous fleet."
primary_sources:
  - title: "AT&T, Technical Background on AT&T Network Slowdown, RISKS Digest Vol. 9, Issue 62, January 1990"
    url: "https://catless.ncl.ac.uk/risks/9.62.html"
  - title: "William Hugh Murray, Commentary on AT&T Outage, RISKS Digest Vol. 9, Issue 63, January 1990"
    url: "https://catless.ncl.ac.uk/risks/9.63.html"
  - title: "Los Angeles Times, AT&T Phone Service Disrupted Across U.S., January 17, 1990"
    url: "https://www.latimes.com/archives/la-xpm-1990-01-17-fi-212-story.html"
  - title: "Peter G. Neumann, Computer-Related Risks, Addison-Wesley/ACM Press, 1995"
    url: "https://www.csl.sri.com/~neumann/"
  - title: "Peter van der Linden, Expert C Programming: Deep C Secrets, SunSoft Press, 1994"
    url: "https://dl.acm.org/doi/book/10.5555/179886"
---

> **What the evidence establishes:**
> - A trunk-interface hardware fault at a New York 4ESS initiated the incident on January 15, 1990, at approximately 2:25 PM EST.
> - The software defect was a misplaced `break` statement that exited the `switch` block prematurely, skipping pointer initialization and corrupting switch memory during a recovery-state transition.
> - AT&T reported 148 million calls handled that day, of which 83 million were completed, a 56% call-completion rate.
> - AT&T applied a software override to reduce the CCS7 signaling load, stabilizing the network. Full service was restored by 11:30 PM EST.
>
> **What the evidence does NOT establish:**
> - Any external cyberattack or malicious interference.
> - The initial hardware fault was not sufficient by itself to explain the nationwide outage; the widespread cascade resulted from the interaction between that recovery event and the software defect in neighboring switches.
> - The exact internal variable names, exception classes, or OS-level calls involved in the failure remain undisclosed in primary sources.

> **The Archivist's Assessment:**
> The failure was not simply a bad `break` statement. The `break` created the local defect; common deployment created the common-mode condition; automated recovery created the propagation mechanism; and the CCS7 signaling network provided the path between them. The system designed to isolate faults became the precise mechanism that propagated them.

## What Was the AT&T 4ESS Network?

By 1990, AT&T operated the backbone of the United States telecommunications infrastructure. At the core of this network were 114 **4ESS (Number 4 Electronic Switching System)** toll switches. These massive, highly reliable computers routed long-distance calls across the country.

To communicate efficiently, these switches used the **Common Channel Signaling System No. 7 (CCS7)**---a standardized out-of-band signaling architecture where call-coordination traffic traveled over a separate dedicated data network rather than over the voice lines themselves. This design made the network fast and responsive. It also created a communication path through which one switch's state changes could directly influence the behavior of connected switches. In this incident, that coupling became the mechanism through which the software defect propagated.

---

## The Forensic Discrepancy Matrix

| Parameter | Digital Representation | Physical Reality | Evidence Status | Mechanism |
| :--- | :--- | :--- | :--- | :--- |
| **Code Structure** | `break` inside `if` intended to exit `if` condition | In C, `break` exits the enclosing `switch` block, not the `if` | [DOCUMENTED] | Language semantics misinterpreted by developer |
| **Memory State** | Pointer initialized for optional parameter processing | Pointer initialization skipped; subsequent processing used uninitialized pointer state | [RECONSTRUCTED] | Premature exit of `switch` block bypassed setup path |
| **Initiating Event** | Routine network status update from New York switch | Trunk-interface hardware fault triggered normal recovery; resumed call traffic exposed the defect in neighboring switches | [DOCUMENTED] | Hardware fault to recovery sequence to CCS7 call traffic to software defect trigger |
| **Network Health** | Automated recovery mechanisms isolating the fault | Automated recovery mechanisms acting as contagious propagation vector | [DOCUMENTED] | Common-mode software defect across homogeneous deployment |

---

## Act I: The Software Change That Would Wait Six Weeks

In mid-December 1989, AT&T deployed new recovery-related software across its 4ESS switching network. The software changed how switches processed incoming call attempts during their own internal recovery-state transitions.

The code was written in C, the industry standard for systems programming. For six weeks, the updated software operated without incident. The specific timing condition required to trigger the underlying defect had not yet occurred in the field.

---

## Act II: The Anatomy of a Misplaced Break

> **[RECONSTRUCTED] Reconstructed Failure Model:** The following pseudocode illustrates the logical structure of the defect as described in post-mortem technical accounts. Internal variable names and exact code remain undisclosed in public primary sources.

The vulnerability rested in a fundamental semantic property of C. The developers had written a `switch` statement to handle different message types. Inside one `case` block, they included an `if` statement to handle a specific edge condition during recovery. The critical error: a `break` statement placed inside that nested `if` block.

```c
// [RECONSTRUCTED] Simplified structural representation of the defect
while (processing_messages) {
    switch (message_type) {
        case INCOMING_CALL_ATTEMPT:
            if (sending_switch_is_recovering) {
                if (ring_write_buffer_is_empty) {
                    send_in_service_ack();
                } else {
                    break;  // THE DEFECT: exits the switch, not just the if
                }
            }
            // Pointer setup for optional parameter work (SKIPPED when break fires)
            setup_optional_parameter_pointers();
            break;
        // ... other cases ...
    }
    // Optional parameter work executes using pointer state from above
    process_optional_parameters();  // Uses uninitialized pointers when setup was skipped
}
```

> **[RECONSTRUCTED]** The developer intended the `break` inside the `else` branch to exit the `if` block and continue to the pointer setup. In C, `break` terminates the nearest enclosing loop or `switch`---it does not terminate an `if`. When the `break` fired, it exited the entire `switch`, jumping execution to `process_optional_parameters()` without the pointer setup having run. The skipped initialization left the optional-parameter processing operating on invalid state, corrupting data in the switch's memory. The switch's error-recovery logic detected the resulting processor/data inconsistency and shut the switch down.

---

## Act III: The Cascade Sequence

### Telemetry Timeline

| Time (EST) | Event | Evidence Status |
| :--- | :--- | :--- |
| **Dec 1989** | New recovery-related software deployed across 4ESS fleet | [DOCUMENTED] |
| **Jan 15, ~2:25 PM** | Trunk-interface equipment at a New York 4ESS develops an internal hardware problem | [DOCUMENTED] |
| **~2:25 PM** | New York switch enters normal recovery: stops accepting new calls, informs connected switches it cannot accept additional traffic | [DOCUMENTED] |
| **~2:25 PM** | New York switch completes recovery and resumes sending call attempts to the network | [DOCUMENTED] |
| **~2:25 PM** | A neighboring switch receives a second call attempt while its internal recovery-state logic is still being reset | [DOCUMENTED] |
| **~2:25 PM** | Software defect triggers: pointer initialization skipped, memory corrupted, switch shuts itself down | [RECONSTRUCTED] |
| **~2:25 PM onward** | Recovering switch broadcasts its own recovery traffic; neighboring switches hit the same defect; cascade propagates through the fleet | [DOCUMENTED] |
| **~10:00 PM** | AT&T applies software override to reduce CCS7 messaging load | [DOCUMENTED] |
| **~11:30 PM** | Full long-distance service restored | [DOCUMENTED] |

### The Failure Chain

```
LOCAL HARDWARE FAULT (Trunk Interface, New York 4ESS)
         |
         v
4ESS enters automatic recovery: stops accepting calls
         |
         v
Connected switches notified: cannot accept additional traffic
         |
         v
New York switch completes recovery, resumes sending call attempts (IAMs)
         |
         v
Neighbor receives second call attempt during its own recovery-state reset
         |
         v
C software defect triggers: break exits switch, skips pointer setup
         |
         v
Optional-parameter processing uses uninitialized pointer state
         |
         v
Memory corrupted; error-recovery logic shuts switch down
         |
         v
Shutdown switch begins recovery, broadcasts recovery traffic to peers
         |
         +-----> SAME FAILURE IN PEER SWITCHES
                             |
                             v
                  CASCADING FEEDBACK LOOP (9 hours)
```

---

## Act IV: Impact and Reckoning

The collapse struck on the Martin Luther King Jr. holiday, a day traditionally marked by high call volumes.

| Entity | Operational Impact | Financial/Reputational Consequence |
| :--- | :--- | :--- |
| **AT&T** | 9-hour disruption to long-distance, 800, and SDN services. 148M calls handled, 83M completed (56% completion rate). Private lines and special government networks were not affected. | Roughly $60 million in estimated lost toll revenue; significant reputational damage. |
| **American Airlines** | Incoming reservation and information calls to AT&T 800 numbers fell by roughly two-thirds. The Sabre reservation system, which used separate phone lines, remained operational and was unaffected. | Reservation and information operations significantly disrupted; Sabre system unaffected. |
| **Marriott** | Received approximately 10% of normal call volume at the height of the outage. | Significant disruption to reservation operations. |

AT&T stabilized the network through a software override that reduced the CCS7 messaging load, allowing the switches to recover without immediately retriggering the failure. Full service was restored by 11:30 PM EST. Engineers then isolated the software defect and applied corrective changes.

---

## Why Testing Missed It

The software had undergone extensive testing and was considered stable. Yet the specific recovery-state interaction that triggered the cascade escaped detection.

1. **The Recovery-Path Blind Spot:** As independent analyst William Hugh Murray observed in January 1990, engineers were testing what happened when a component *failed*, but not adequately what happened when it *successfully corrected itself and came back online*. ([RISKS Digest 9.63](https://catless.ncl.ac.uk/risks/9.63.html)) The failure exposed a testing gap: it was not enough to test network behavior during node failure; engineers also needed to test how recovery traffic behaved when a node returned to service.

2. **The Paradox of Redundancy:** AT&T's network was highly redundant, but it was *logically homogeneous*. The vulnerable recovery software was deployed broadly enough that the same defect existed across the switching population, creating a common-mode failure condition. Redundant hardware cannot protect against a deterministic software defect triggered across all nodes simultaneously.

3. **The Narrow Timing Window:** The defect required a second call attempt to arrive while the receiving switch was still updating its internal recovery state---a narrow timing window in the switch's recovery state machine, estimated at roughly one-hundredth of a second, that the test environment had not modeled at production scale.

---

## Systems Prevention Playbook

### 1. Friction Defenses (Deployment Brakes)
- **Progressive Deployment:** Never deploy a critical update to 100% of a homogeneous fleet simultaneously. Progressive rollout reduces the blast radius of common-mode software defects. Modern equivalent: canary deployments and blue/green rollouts bound the failure surface to a fraction of the fleet.
- **Controlled Implementation Diversity:** Maintain staged rollout where protocol compatibility permits, to prevent any single software version from achieving total fleet coverage simultaneously.

### 2. Boundary Constraints (Logical Invariants)
- **Static Code Analysis:** Modern static-analysis tooling can detect many classes of uninitialized-variable use, suspicious control flow, and unintended `break` placement that was harder to identify with contemporary tooling.
- **Recovery-Loop Suppression:** If a peer repeatedly transitions between unavailable and available states within a short interval, the system should suppress or quarantine further recovery-driven state changes rather than processing each transition independently. This directly addresses the 1990 failure mode.

### 3. Emergency Brakes (Terminal Stops)
- **Bounded Recovery Authority:** Recovery actions should have bounded authority: a control-plane message indicating a peer fault should not be able to trigger an unbounded sequence of local resets and further recovery messages. Rate limiting and hysteresis on recovery state transitions prevent feedback loops.

---

## Engineering Evolution: Then vs. Now

| Failure Dimension | 1990 Failure Mode | Modern Resilience Pattern |
| :--- | :--- | :--- |
| **Deployment** | Broad deployment of common recovery software across entire 4ESS fleet | Progressive rollout and blast-radius control; canary deployments |
| **Recovery Signaling** | Recovery traffic from a returning node could trigger the same defect in peers | Rate limiting, hysteresis, retry budgets, and recovery-loop suppression |
| **Failure Isolation** | One node's recovery behavior propagated to peers through shared signaling | Fault domains and bounded failure propagation |
| **Implementation Diversity** | Common software defect replicated across all nodes | Controlled diversity and staged rollout where protocol compatibility permits |
| **Verification** | Rare recovery-state interaction escaped testing | State-machine testing, fault injection, and explicit recovery-path testing |
| **Recovery Authority** | Recovery logic could repeatedly trigger resets without bound | Bounded automated remediation with escalation thresholds |

---

## Primary Sources

- [AT&T, Technical Background on AT&T Network Slowdown, RISKS Digest Vol. 9, Issue 62, January 1990](https://catless.ncl.ac.uk/risks/9.62.html)
- [William Hugh Murray, Commentary on AT&T Outage, RISKS Digest Vol. 9, Issue 63, January 1990](https://catless.ncl.ac.uk/risks/9.63.html)
- [Los Angeles Times, AT&T Phone Service Disrupted Across U.S., January 17, 1990](https://www.latimes.com/archives/la-xpm-1990-01-17-fi-212-story.html)
- [Peter G. Neumann, Computer-Related Risks, Addison-Wesley/ACM Press, 1995](https://www.csl.sri.com/~neumann/)
- [Peter van der Linden, Expert C Programming: Deep C Secrets, SunSoft Press, 1994](https://dl.acm.org/doi/book/10.5555/179886)
- Bruce Sterling, The Hacker Crackdown: Law and Disorder on the Electronic Frontier, 1992

---

## FAQ

### What exactly caused the AT&T 1990 outage?
A software bug introduced in a mid-December 1989 update. A misplaced `break` statement in a C program caused switches to skip pointer initialization when they received a call attempt during a narrow recovery-state window. The uninitialized pointer state corrupted the switch's memory, triggering an automatic shutdown.

### How did one bug take down the whole country?
The vulnerable recovery software had been deployed broadly across the 4ESS network, creating a common-mode failure condition. When one switch shut down during recovery, its resumed call traffic triggered the same defect in neighboring switches, causing them to crash and propagate the same failure outward.

### Did a hacker cause the AT&T collapse?
No. Initially, there were widespread rumors of a cyberattack or a computer virus, but AT&T's subsequent investigation traced the outage to a software defect in the switching system's recovery logic.

### How long was the AT&T network down?
The severe disruption lasted approximately 9 hours on January 15, 1990. AT&T later reported that 83 million of 148 million calls handled that day were completed, a 56% call-completion rate.

### How much did the 1990 outage cost AT&T?
Contemporary estimates placed AT&T's lost revenue at roughly $60 million. TIME Magazine reported a range of $60 to $75 million.

### What programming language was the bug written in?
The bug was in C. In C, `break` terminates the nearest enclosing loop or `switch`---not an `if` block. The misplaced `break` therefore exited the `switch` before required pointer setup occurred, leaving subsequent processing to use uninitialized pointer state.

### How did AT&T fix the network collapse?
AT&T stabilized the network using a software override that reduced the CCS7 signaling load, allowing affected switches to recover without immediately retriggering the cascade. Full service was restored by 11:30 PM EST. Engineers then isolated the software defect and applied corrective changes.

### Why is the AT&T 1990 crash important for modern software?
It became a widely cited case study in software reliability, cascading failure, common-mode defects, and recovery-path testing. It demonstrated that automated recovery mechanisms can act as propagation vectors when a common software defect exists across a homogeneous fleet, and it anticipates several principles now foundational to distributed-systems reliability engineering.
