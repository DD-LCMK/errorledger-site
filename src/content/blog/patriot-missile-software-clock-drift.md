---
title: "Patriot Missile Software Failure: How 24-Bit Fixed-Point Truncation Caused the Dhahran Disaster"
description: "How a 24-bit fixed-point timing error accumulated over 100+ hours and caused the Patriot system to lose track of an Iraqi Scud at Dhahran in 1991."
author: "The Archivist"
pubDate: "2026-08-25"
slug: "patriot-missile-software-clock-drift"
heroImage: "/hero_patriot_missile.jpg"
incidentDate: "1991-02-25"
incidentPeriod: "February 1991"
incidentEndDate: "1991-02-25"
systemTypes: ["Military Radar", "Fixed Point Arithmetic", "Embedded Systems", "Safety-Critical Software"]
victimCount: 128
fatalities: "28 fatalities; 100+ injured"
regulatoryAction: "Software correction, runtime warning, and operational changes"
systemImpact: "Software correction to the time calculation and changes to operational guidance"
category: "military"
summary_points:
  context: "During the 1991 Gulf War, the US Army deployed Patriot Missile batteries to defend against incoming Iraqi Scud missiles."
  systemic_failure: "The system's operational assumptions did not adequately account for prolonged continuous runtime in the Gulf War deployment. The organization observed evidence of runtime-dependent degradation, developed a partial software correction, but failed to establish and communicate a concrete operational limit before the Dhahran battery reached a dangerous uptime."
  technical_mechanisms: "A truncation error in a 24-bit fixed-point register caused the system's internal clock to drift by 0.34 seconds over 100 hours, shifting the radar's calculated range gate."
  fallout: "The battery lost track of an incoming Scud missile, which struck a US barracks in Dhahran, killing 28 soldiers and injuring over 100."
primary_sources:
  - title: "GAO Report: Patriot Missile Defense - Software Problem Led to System Failure at Dhahran, Saudi Arabia"
    url: "https://www.gao.gov/assets/imtec-92-26.pdf"
    institution: "US Government Accountability Office"
---

> **The Archivist’s Note:** AI can summarize what happened. ErrorLedger reconstructs *why* it happened, who made which decisions, what happened next, and what the evidence actually shows.

## 1. Executive Summary

On February 25, 1991, during the Gulf War, an Iraqi Scud missile approached a United States Army barracks in Dhahran, Saudi Arabia. The airspace was defended by an American Patriot Missile battery (Alpha Battery, 2nd Battalion, 7th Air Defense Artillery). The battery had been operating continuously for over 100 hours. 

When the Scud entered the airspace, the Patriot's radar detected it. However, because of a precision truncation error in the software's 24-bit fixed-point arithmetic, the system's internal clock had drifted by approximately 0.34 seconds. ([GAO](https://www.gao.gov/pdf/product/215614)) Because a Scud missile travels at approximately 1,676 meters per second, this timing error shifted the Patriot's calculated range gate far enough that the incoming missile was no longer adequately centered within the tracking window.

The tracking algorithm failed to maintain the Scud within the expected range gate, causing the system to reject the track rather than engage the target. The Scud struck the barracks, killing 28 soldiers and injuring over 100 more. This incident remains one of the most deadly and heavily documented software engineering failures in military history.

## 2. What Was the Patriot System?

The Patriot (Phased Array Tracking Radar to Intercept on Target) was originally designed in the 1970s as a mobile anti-aircraft system to shoot down aircraft. Aircraft are relatively slow and maneuverable.

To intercept an object, the Patriot system performs a continuous prediction loop:
1. **Detect:** Radar detects an anomaly.
2. **Track:** The software calculates the velocity and trajectory.
3. **Predict:** It creates a "range gate"—a small box in the sky where the object *should* be in the next radar sweep.
4. **Verify:** If the object appears in the range gate on the next sweep, it is confirmed as a hostile target. If it does not appear, it is discarded as a false return (clutter or noise).

During the Gulf War, the Patriot was modified to intercept incoming ballistic missiles (Scuds). Scuds fly at Mach 5 (roughly 1,676 m/s), vastly faster than aircraft. At these speeds, the "range gate" calculations required absolute chronological precision.

## 3. The February 25, 1991 Failure

The exact timeline of the software degradation is documented by the General Accounting Office ([GAO, 1992](https://www.gao.gov/pdf/product/215614)).

| Parameter | Digital Representation | Physical Reality | Evidence Status |
| :--- | :--- | :--- | :--- |
| **System Uptime** | 100 hours | 100 hours | [DOCUMENTED] Battery Alpha had not been rebooted for 4 days. |
| **Clock Drift** | Internal time lagging by 0.34 seconds | Real-world time accurate | [DOCUMENTED] Due to continuous fixed-point truncation of 1/10. |
| **Tracking Gate** | Range gate shifted behind target | Scud was physically ahead | [RECONSTRUCTED] Target fell outside the acceptable window. |
| **System Classification** | Track rejected | Incoming Hostile Ballistic Missile | [DOCUMENTED] Software dropped the track. |
| **Casualties** | 0 registered on console | 28 fatalities, 100+ injured | [DOCUMENTED] Missile impacted the barracks. |

## 4. How the 24-Bit Fixed-Point Error Worked

`[ANALYTICAL — ERRORLEDGER]` The failure was caused by how time was represented and converted within the system's architecture.

### 4.1 The clock
System time was maintained in tenths of a second by an internal hardware clock ticking every 100 milliseconds.

### 4.2 The conversion
To perform the tracking calculation (which required time in seconds), the software converted the integer tick count by multiplying it by 1/10.

### 4.3 The representation error
In binary base-2 mathematics, the fraction 1/10 cannot be represented exactly. It is a non-terminating repeating fraction: `0.0001100110011001100110011...` The representation was truncated in a 24-bit fixed-point calculation. This truncation meant that the conversion factor used was slightly less than the true value of 1/10. The resulting conversion error associated with the truncated representation of 1/10 was approximately 0.000000095 decimal seconds.

### 4.4 The accumulation
This tiny truncation error was multiplied by the elapsed tick count. The longer the system ran, the larger the elapsed tick count became, and therefore the larger the accumulated timing error grew.

### 4.5 The tracking consequence
The accumulated timing error shifted the Patriot's calculated range gate. When the system looked for the Scud missile on the next radar sweep, the timestamp distortion caused it to look in the wrong place.

## 5. Why the Error Accumulated

A key architectural detail compounded the failure: earlier software patches had attempted to fix the timing precision by upgrading *some* modules to use more precise 48-bit arithmetic, while other legacy modules still used the 24-bit truncation. ([CiteSeerX](https://citeseerx.ist.psu.edu/document?doi=a5f2c646283402e6e43b85d7bd9b0d4399e92709))

The danger was not merely that the old calculation existed; different parts of the system could therefore operate with different representations of elapsed time. The radar tracking software was ultimately comparing an accurate timestamp against a corrupted 24-bit timestamp.

## 6. Why 100 Hours Mattered

The error per tick was tiny, but the error was cumulative, making uptime the multiplier. 

* 100 hours × 60 minutes × 60 seconds × 10 = **3,600,000 tenths-of-a-second ticks**.
* 3,600,000 ticks × 0.000000095 seconds/tick ≈ **0.342 seconds**.

| Runtime | Approx. accumulated error |
| :--- | :--- |
| 1 hour | ~3.4 ms |
| 10 hours | ~34 ms |
| 100 hours | ~0.34 s |

Because rebooting reset the elapsed time, the system had a runtime-dependent failure mode. 8 hours of uptime had already produced measurable degradation; 100 hours pushed the error into a catastrophic regime.

## 7. How the Range Gate Failed

`[RECONSTRUCTED — NUMERICAL]` The accumulated timing error was approximately 0.34 seconds. At the Scud's reported velocity, that corresponds to several hundred meters of positional error. More importantly, the timing error shifted the Patriot's calculated range gate far enough that the incoming missile was no longer adequately centered within the tracking window. The GAO concluded that the resulting range-gate shift prevented the battery from maintaining the track. ([GAO](https://www.gao.gov/pdf/product/215614))

## 8. The Warning That Came Before the Disaster

The system's operational assumptions did not adequately account for prolonged continuous runtime in the Gulf War deployment. The tragedy wasn't merely that there was a software bug. The system exhibited a measurable failure mode before the fatal incident, but the organization did not translate that evidence into an operational limit specific enough to prevent the failure.

The Patriot Project Office received Israeli data on February 11 showing a significant 20% range-gate shift after eight hours of operation. ([GAO](https://www.gao.gov/pdf/product/215614)) Officials investigated and made a software change, which was released on February 16. On February 21, the office sent users a warning that very long runtimes could shift the range gate, but critically, the warning *did not specify what constituted a very long runtime*. Officials assumed users wouldn't operate the system long enough for it to become ineffective.

## 9. The 14-Day Warning-to-Failure Chain

`[DOCUMENTED — GAO]` The chain of organizational and technical events leading to the disaster:

* **Feb 11:** Israeli anomaly data identifies a 20% range-gate shift after ~8 hours.
* **Feb 12-15:** Patriot Project Office investigates.
* **Feb 16:** Software correction is released.
* **Feb 21:** Warning issued to users. "Very long run times" is mentioned, but not quantified.
* **Feb 21-25:** Dhahran battery continues operating, passing >100 hours of uptime.
* **Feb 25:** Accumulated timing error becomes ~0.34 s.
* **Feb 25:** Range gate shifts beyond usable tracking margin.
* **Feb 25:** Scud track is lost. No Patriot engagement occurs.
* **Feb 25:** Scud strikes barracks; 28 soldiers killed.
* **Feb 26:** Corrected software arrives in Dhahran, one day after the attack.

## 10. What the GAO Established

| Claim | Source | Confidence |
| :--- | :--- | :--- |
| 100+ hour uptime | GAO | `[DOCUMENTED]` |
| 0.34 s accumulated timing error | GAO / technical reconstruction | `[DOCUMENTED]` / `[RECONSTRUCTED]` |
| Range-gate displacement | GAO | `[DOCUMENTED]` |
| 28 deaths | GAO | `[DOCUMENTED]` |
| Feb 11 Israeli warning | GAO | `[DOCUMENTED]` |
| Feb 16 modified software | GAO | `[DOCUMENTED]` |
| Feb 21 warning | GAO | `[DOCUMENTED]` |
| Warning lacked concrete runtime threshold | GAO | `[DOCUMENTED]` |
| Exact original testing scenario | No primary evidence | `[UNKNOWN]` |
| "Engineers expected daily reboot" | No sufficient evidence | `[UNKNOWN]` |

## 11. What the Evidence Does Not Establish

<BoundaryBox>
**Boundary Conditions:**
* **Exact Test Suite Coverages:** The available GAO investigation establishes that the timing problem existed and that the system's degradation became significant with prolonged operation. It does not provide a complete reconstruction of the original test suite. A plausible engineering explanation is that testing did not adequately exercise the combination of long continuous runtime and ballistic-missile tracking. `[UNKNOWN — INSUFFICIENT RECORD]`
* **Engineer Intent:** The evidence does not establish the exact design rationale for the original 24-bit representation or the complete set of runtime assumptions made when the software was developed. `[UNKNOWN — INSUFFICIENT RECORD]`
</BoundaryBox>

## 12. Root-Cause Analysis

### The Actual Root Cause: Not Precision, but Unbounded Accumulation
The numerical approximation itself was tiny and predictable. The dangerous property was that its error grew with elapsed runtime, while the operational environment eventually allowed runtime to become much larger than the assumptions underlying the original calculation.

### The Second Failure: The Organization Knew
The sequence from February 11 to February 25 demonstrates the organizational failure. The organization observed evidence of runtime-dependent degradation, developed a partial software correction, but failed to establish and communicate a concrete operational limit (an explicit runtime limitation and restart procedure) before the Dhahran battery reached a dangerous uptime.

## 13. Modern Engineering Lessons

This incident sits at the intersection of embedded systems, safety-critical software, and operational assumptions. A locally reasonable numerical trade-off (24-bit fixed-point truncation) became unsafe when the software was operated for longer than the assumptions surrounding the calculation could tolerate.

## 14. Then vs. Now

| System Parameter | Before Corrective Action (1991) | After Corrective Action |
| :--- | :--- | :--- |
| **Arithmetic Precision** | Mixed (some 24-bit, some 48-bit modules) | Unified high-precision routines for time |
| **Operational Doctrine** | Undefined maximum uptime | Explicit runtime limitations and restart procedures |
| **Warning Communication** | Vague memo ("very long run times") | Explicit operational limitations |

## 15. FAQ

**What caused the Patriot Missile software failure?**
The immediate technical cause was a cumulative timing error in the Patriot's weapons-control software. A 24-bit fixed-point representation truncated the binary representation of 1/10, causing a small error in converting the system's internal time. After more than 100 hours of continuous operation, the accumulated timing error shifted the radar's tracking range gate enough to prevent the battery from maintaining the incoming Scud track.

**Why was a 0.34-second error fatal?**
Scud missiles travel at approximately 1,676 meters per second (Mach 5). A 0.34-second timing error shifted the Patriot's calculated range gate significantly. The tracking algorithm failed to maintain the Scud within the expected tracking window, causing the system to reject the track rather than engage the target.

**Did they know about the bug before the attack?**
Yes. The Patriot Project Office received Israeli data on February 11 showing a significant range-gate shift. A modified software version was released on February 16, and a February 21 message warned users about very long runtimes, but it critically did not define the threshold. The corrected software arrived at Dhahran on February 26, one day after the attack.

**Was this a hardware or software failure?**
It was an architectural mismatch. The 24-bit hardware was behaving exactly as mathematically required for fixed-point truncation. The failure was in the software integration (mixing patched and unpatched modules) and in the operational assumptions that did not adequately account for prolonged continuous runtime.

## 16. Primary Sources

- **[GAO Report: Patriot Missile Defense - Software Problem Led to System Failure at Dhahran, Saudi Arabia](https://www.gao.gov/pdf/product/215614)**
  - *Establishes:* The precise technical mechanism of the 24-bit fixed-point truncation, the exact 0.34-second drift after 100 hours, the radar tracking range gate displacement, and the timeline of Israeli warnings and the delayed software correction.
- **[College of Science and Engineering - The Patriot Missile Failure](https://www-users.cse.umn.edu/~arnold/disasters/patriot.html)**
  - *Establishes:* Technical mathematical analysis of the Patriot timing error and the base-2 non-terminating representation of 1/10.

## The Archivist's Verdict

> **The Archivist's Assessment:** The Dhahran Patriot Missile failure is a brutal lesson in operational drift. The engineers who wrote the software in the 1970s made a numerical trade-off (truncation) for a system they believed would operate within specific parameters. A locally reasonable numerical trade-off became unsafe when the software was operated for longer than the assumptions surrounding the calculation could tolerate. The true failure was contextual and organizational. The system exhibited a measurable failure mode before the fatal incident, but the organization did not translate that evidence into an operational limit specific enough to prevent the failure. The failure to explicitly quantify "very long run times" when the bug was first discovered demonstrates a profound disconnect between technical reality and frontline operations.
