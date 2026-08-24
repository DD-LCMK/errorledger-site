---
title: "The Patriot Missile Clock Drift: How a 24-Bit Floating Point Truncation Killed 28 Soldiers"
description: "A forensic reconstruction of the 1991 Patriot Missile battery failure in Dhahran. How a known 24-bit floating-point truncation error accumulated over 100 hours, causing a 0.34-second clock drift that let a Scud missile through the defense perimeter."
author: "The Archivist"
pubDate: "2026-08-25"
slug: "patriot-missile-software-clock-drift"
heroImage: "/hero_patriot_missile.jpg"
incidentDate: "1991-02-25"
incidentPeriod: "February 1991"
incidentEndDate: "1991-02-25"
systemTypes: ["Military Radar", "Floating Point Arithmetic", "Embedded Systems", "Safety-Critical Software"]
victimCount: 128
fatalities: "28"
regulatoryAction: "Software update and operational doctrine change (mandatory reboot scheduling)"
systemImpact: "Immediate software patching of the Patriot system and redesign of floating-point tracking modules"
category: "corporate"
summary_points:
  context: "During the 1991 Gulf War, the US Army deployed Patriot Missile batteries to defend against incoming Iraqi Scud missiles."
  systemic_failure: "The system was designed for short-term mobile deployments, but was operated continuously for over 100 hours, pushing the software outside its designed operational envelope without physical safeguards."
  technical_mechanisms: "A truncation error in a 24-bit floating point register caused the system's internal clock to drift by 0.34 seconds over 100 hours, misaligning the radar's tracking gate."
  fallout: "The battery failed to track an incoming Scud missile, which struck a US barracks in Dhahran, killing 28 soldiers and injuring over 100."
primary_sources:
  - title: "GAO Report: Patriot Missile Defense - Software Problem Led to System Failure at Dhahran, Saudi Arabia"
    url: "https://www.gao.gov/assets/imtec-92-26.pdf"
    institution: "US Government Accountability Office"
---

> **The Archivist’s Note:** AI can summarize what happened. ErrorLedger reconstructs *why* it happened, who made which decisions, what happened next, and what the evidence actually shows.

<BoundaryBox>
**What the evidence does NOT establish:**
* That the Patriot missile system was inherently "broken" or malicious; it was operating continuously for 100 hours, an operational state the original 1970s software architecture had never intended to support.
* That the engineers were incompetent; the truncation of 1/10 in binary is a fundamental mathematical property of floating-point arithmetic. The failure was an integration and operational doctrine mismatch.
</BoundaryBox>

## 1. Executive Summary

On February 25, 1991, during the Gulf War, an Iraqi Scud missile approached a United States Army barracks in Dhahran, Saudi Arabia. The airspace was defended by an American Patriot Missile battery (Alpha Battery, 2nd Battalion, 7th Air Defense Artillery). The battery had been operating continuously for over 100 hours. 

When the Scud entered the airspace, the Patriot's radar detected it. However, because of a precision truncation error in the software's 24-bit floating-point arithmetic, the system's internal clock had drifted by 0.34 seconds. Because a Scud missile travels at approximately 1,676 meters per second, this 0.34-second drift caused the radar's tracking software to look for the missile over half a kilometer away from its actual position. 

The software classified the incoming missile as a false radar anomaly and stopped tracking it. The Scud struck the barracks, killing 28 soldiers and injuring 100 more. This incident remains one of the most deadly and heavily documented software engineering failures in military history.

## 2. What Was the Patriot Missile System?

The Patriot (Phased Array Tracking Radar to Intercept on Target) was originally designed in the 1970s as a mobile anti-aircraft system to shoot down Soviet planes. Planes are relatively slow and maneuverable.

To intercept an object, the Patriot system performs a continuous prediction loop:
1. **Detect:** Radar detects an anomaly.
2. **Track:** The software calculates the velocity and trajectory.
3. **Predict:** It creates a "range gate"—a small box in the sky where the object *should* be in the next radar sweep.
4. **Verify:** If the object appears in the range gate on the next sweep, it is confirmed as a hostile target. If it does not appear, it is discarded as a false return (clutter or noise).

During the Gulf War, the Patriot was modified to intercept incoming ballistic missiles (Scuds). Scuds fly at Mach 5 (roughly 1,676 m/s), vastly faster than aircraft. At these speeds, the "range gate" calculations required absolute chronological precision.

## 3. The 100-Hour Incident — Evidence Matrix

The exact timeline of the software degradation is documented by the General Accounting Office ([GAO, 1992](https://www.gao.gov/assets/imtec-92-26.pdf)).

| Parameter | Digital Representation | Physical Reality | Evidence Status |
| :--- | :--- | :--- | :--- |
| **System Uptime** | 100 hours | 100 hours | [DOCUMENTED] Battery Alpha had not been rebooted for 4 days. |
| **Clock Drift** | Internal time lagging by 0.34 seconds | Real-world time accurate | [DOCUMENTED] Due to continuous truncation of 1/10th second intervals. |
| **Tracking Gate** | Looked 687 meters behind target | Scud was 687 meters ahead | [RECONSTRUCTED] Velocity (1676 m/s) * Drift (0.34s) = 570-687m displacement. |
| **System Classification** | "Spurious track / False Alarm" | Incoming Hostile Ballistic Missile | [DOCUMENTED] Software dropped the track. |
| **Casualties** | 0 registered on console | 28 fatalities, 100+ injured | [DOCUMENTED] Missile impacted the barracks. |

## 4. The Engineering Flaw: 24-Bit Floating Point Truncation

The system’s internal clock measured time in tenths of a second. However, the computer's registers were 24-bit.

`[ANALYTICAL]` **The Technical Mechanism:**
To calculate time in seconds, the software multiplied the internal tick count by 1/10. 
In binary base-2 mathematics, the fraction 1/10 is a non-terminating repeating fraction: `0.0001100110011001100110011...`

Because the Patriot's computer only had 24-bit registers, it had to chop off the end of this repeating fraction. The truncation resulted in an error of roughly `0.000000095` decimal seconds for every single clock tick.

1. In the first hour of operation, the error was only `0.0034` seconds. (Harmless).
2. After 10 hours, the error was `0.034` seconds.
3. After 100 hours, the error multiplied by the millions of ticks accumulated to **0.34 seconds**.

`[RECONSTRUCTED]` When the Scud was detected, the radar needed to look ahead. The software calculated `Predicted_Position = Current_Position + (Velocity * Time_Delta)`. Because `Time_Delta` was mathematically distorted by the 0.34-second drift, the Patriot looked into an empty patch of sky. Failing to find the missile in the tracking gate, the computer assumed the initial blip was a radar artifact and deleted it from the threat queue.

## 5. Why Did the Error Survive?

Why wasn't this mathematical flaw fixed before deployment?

`[DOCUMENTED]` The Patriot system was originally designed in the 1970s as a mobile anti-aircraft weapon. Operational doctrine dictated that the system would be frequently moved to avoid destruction. Turning the system off, moving it, and turning it back on effectively reset the clock, flushing out the accumulated truncation error before it became dangerous.

During the Gulf War, the Patriot was repurposed for static defense of cities and airbases. The batteries were left on continuously for days or weeks at a time—an operational envelope the original engineers had never considered.

## 6. Why Testing Missed It

The truncation flaw was actually a known artifact of the 24-bit hardware, but testing protocols failed to capture the context of the Gulf War.

`[DOCUMENTED]` The system underwent extensive testing for its anti-aircraft role. However, simulations rarely ran for 100 continuous hours without a restart. Furthermore, earlier software patches had attempted to fix the timing precision by upgrading *some* modules to use more precise 48-bit arithmetic, but other legacy modules still used the 24-bit truncation. This created an inconsistency where the radar tracking software compared an accurate 48-bit timestamp against a corrupted 24-bit timestamp.

Testing missed it because the integration test suite did not simulate mixed-precision arithmetic operating at 100-hour uptimes against Mach 5 ballistic targets.

## 7. The Failure Chain

`[ANALYTICAL]` The disaster unfolded through a series of missed interventions:
1. **Feb 11, 1991:** Israeli forces, operating Patriot batteries, noticed the clock drift after 8 hours of continuous operation. They notified the US Army Project Office.
2. **Feb 16, 1991:** The US Army confirmed the bug and began writing a software patch. In the interim, they issued an advisory warning of the drift, but failed to specify exactly how often the batteries needed to be rebooted.
3. **Feb 25, 1991:** The Alpha Battery in Dhahran had been running for 100 hours. The Scud was detected, misclassified, and struck the barracks.
4. **Feb 26, 1991:** The software patch fixing the 24-bit truncation arrived in Dhahran by helicopter, one day too late.

## 8. Corrective Action: Engineering Evolution

Following the disaster, the military fundamentally updated how timing and precision were handled in legacy embedded systems.

| System Parameter | Before Corrective Action (1991) | After Corrective Action (Software Patch) |
| :--- | :--- | :--- |
| **Arithmetic Precision** | Mixed (some 24-bit, some 48-bit modules) | Unified high-precision routines for time |
| **Operational Doctrine** | Undefined maximum uptime | Hard reboot mandated after a strict threshold of continuous hours |
| **Warning Communcation** | Vague memo ("loss of accuracy") | Explicit operational limitations ("REBOOT EVERY 24 HOURS") |

## 9. FAQ

**What caused the Patriot Missile failure?**
The failure was caused by a software truncation error. The system's 24-bit registers could not perfectly represent the fraction 1/10 in binary, causing a microscopic error every tick. Over 100 hours of continuous operation, this accumulated to a 0.34-second clock drift, throwing off the radar tracking of a fast-moving Scud missile.

**Why was a 0.34-second error fatal?**
Scud missiles travel at approximately 1,676 meters per second (Mach 5). A 0.34-second error meant the Patriot's radar was looking for the missile roughly 570 to 687 meters away from its actual physical location. The software classified the empty sky as a false alarm.

**Did they know about the bug before the attack?**
Yes. Israeli defense forces discovered the tracking degradation two weeks earlier and alerted the US Army. The US Army was working on a patch, but the temporary operational workaround (rebooting the system) was poorly communicated and not strictly enforced at the Dhahran battery.

**Was this a hardware or software failure?**
It was an architectural mismatch. The 24-bit hardware was behaving exactly as mathematically required for floating-point truncation. The failure was in the software integration (mixing patched and unpatched modules) and in the operational doctrine (running a mobile system continuously for 100 hours).

## Primary Sources

- **[GAO Report: Patriot Missile Defense - Software Problem Led to System Failure at Dhahran, Saudi Arabia](https://www.gao.gov/assets/imtec-92-26.pdf)**
  - *Establishes:* The precise technical mechanism of the 24-bit truncation, the exact 0.34-second drift after 100 hours, the radar tracking range gate displacement, and the timeline of Israeli warnings and the delayed software patch.

## The Archivist's Verdict

> **The Archivist's Assessment:** The Dhahran Patriot Missile failure is a brutal lesson in operational drift. The engineers who wrote the software in the 1970s did not make a mathematical error; they made a correct engineering compromise (truncation) for a system they believed would be rebooted daily. The true failure was contextual. When a piece of software is wrenched from its original design envelope (mobile anti-aircraft) and deployed in a radically different context (static anti-ballistic missile defense), its deeply buried mathematical compromises become lethal. The failure to explicitly mandate a daily reboot when the bug was first discovered demonstrates a profound disconnect between software engineering teams and frontline operators.
