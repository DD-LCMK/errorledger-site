---
title: "Patriot Missile Software Failure: How a 24-Bit Timing Error Caused the Dhahran Disaster"
description: "How a 24-bit limited-precision time conversion accumulated over 100+ hours and caused the Patriot system to lose track of an Iraqi Scud at Dhahran in 1991."
author: "The Archivist"
pubDate: "2026-08-25"
updatedDate: "2026-08-25"
wordCount: 2280
keywords:
  - "Patriot missile software failure 1991"
  - "Patriot missile Dhahran clock drift"
  - "24-bit time conversion limited precision"
  - "GAO IMTEC-92-26 report findings"
  - "Scud missile barracks failure cause"
  - "radar range gate displacement calculation"
slug: "patriot-missile-software-clock-drift"
heroImage: "/hero_patriot_missile.jpg"
incidentDate: "1991-02-25"
incidentPeriod: "February 1991"
incidentEndDate: "1991-02-25"
systemTypes: ["Military Radar", "Limited-Precision Conversion", "Embedded Systems", "Safety-Critical Software"]
victimCount: 128
victimCountQualifier: "approximate"
fatalities: "28"
injuries: "approximately 100"
correctiveAction: "Software correction, runtime warning, and operational changes"
systemImpact: "Software correction to the time calculation and changes to operational guidance"
category: "military"
summary_points:
  context: "During the 1991 Gulf War, the US Army deployed Patriot Missile batteries to defend against incoming Iraqi Scud missiles."
  systemic_failure: "The system's operational assumptions did not adequately account for prolonged continuous runtime in the Gulf War deployment. The organization observed evidence of runtime-dependent degradation and developed a software correction, but failed to establish and communicate a concrete operational limit before the corrected software reached the Dhahran battery."
  technical_mechanisms: "A 24-bit limited-precision time conversion of the Patriot's internal tenths-of-a-second clock introduced a small truncation error that accumulated with system uptime."
  fallout: "The battery lost track of an incoming Scud missile, which struck a US barracks in Dhahran, killing 28 soldiers and injuring over 100."
faqItems:
  - q: "What caused the Patriot Missile software failure?"
    a: "A 24-bit register limitation in the weapons-control software caused precision loss when converting internal integer time ticks to real numbers. Over 100+ continuous operating hours, the timing error accumulated to 0.3433 seconds, shifting the radar tracking range gate by 687 meters."
  - q: "Why was a 0.3433-second timing error fatal?"
    a: "Incoming Iraqi Scud missiles traveled at 1,676 meters per second. A 0.3433-second timing error shifted the radar's calculated range gate by 687 meters, causing the radar to search the wrong area of the sky and fail to track or engage the missile."
  - q: "Did the military know about the Patriot bug before the attack?"
    a: "Yes. The Patriot Project Office received Israeli test data on February 11 showing range-gate degradation. Modified software was released February 16, and an operational warning was sent February 21, but it did not define a specific runtime limit. The patch arrived February 26, one day after the strike."
  - q: "Was this a hardware or software failure?"
    a: "It was an architectural and operational mismatch. The 24-bit register imposed a finite mathematical precision constraint, while military operations deployed the system for prolonged continuous runtimes that exceeded original design assumptions."
primary_sources:
  - title: "GAO Report: Patriot Missile Defense - Software Problem Led to System Failure at Dhahran, Saudi Arabia"
    url: "https://www.gao.gov/assets/imtec-92-26.pdf"
    institution: "US Government Accountability Office"
---


## 1. Executive Summary

On February 25, 1991, during the Gulf War, an Iraqi Scud missile approached a United States Army barracks in Dhahran, Saudi Arabia. The airspace was defended by an American Patriot Missile battery (Alpha Battery, 2nd Battalion, 7th Air Defense Artillery). The battery had been operating continuously for over 100 hours. 

When the Scud entered the airspace, the Patriot's radar detected it. However, because of the finite precision of the software's 24-bit limited-precision time conversion, the system's internal clock had drifted by approximately 0.3433 seconds. ([GAO](https://www.gao.gov/pdf/product/215614)) Because a Scud missile travels at approximately 1,676 meters per second, this timing error shifted the Patriot's calculated range gate far enough that the incoming missile was no longer adequately centered within the tracking window.

The trajectory projection degraded so severely that the azimuth-elevation tracking radar swept an empty sector of airspace, dropping the ballistic track entirely. Alpha Battery therefore did not engage the missile. The Scud struck the barracks, killing 28 soldiers and injuring over 100 more. This incident remains one of the most deadly and heavily documented software engineering failures in military history.

## 2. What Was the Patriot System?

The Patriot (Phased Array Tracking Radar to Intercept on Target) was developed as a mobile air-defense system intended primarily for aircraft and cruise-missile threats. Its later use against short-range ballistic missiles imposed substantially different tracking requirements.

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
| **Tracking Gate** | Range gate shifted behind target | Scud was physically ahead | `[DOCUMENTED — GAO]` Target fell outside the acceptable window. |
| **System Classification** | Track rejected | Incoming Hostile Ballistic Missile | [DOCUMENTED] Software dropped the track. |
| **Casualties** | Track dropped before impact | 28 American soldiers killed | [DOCUMENTED] Scud struck the Army barracks. |

## 4. How the 24-Bit Time-Conversion Error Worked

`[ANALYTICAL — ERRORLEDGER]` The failure was caused by how time was represented and converted within the system's architecture.

### 4.1 The clock
The Patriot's internal computer maintained elapsed time in tenths of a second.

### 4.2 The conversion
The tracking software needed elapsed time in a form suitable for its calculations, requiring conversion of the internal time value into a real-number representation.

### 4.3 The precision limitation
The computer used a 24-bit representation for this conversion. Because the available precision was finite, the conversion could not represent the increasingly large elapsed-time value with arbitrary accuracy. The important property was that the precision loss increased as the elapsed-time value grew.

### 4.4 The accumulation
Consequently, the tracking calculation became progressively less accurate as the Patriot remained continuously powered. The GAO calculated approximately 0.0034 seconds of timing inaccuracy after one hour, 0.0275 seconds after eight hours, and 0.3433 seconds after approximately 100 hours. ([GAO](https://www.gao.gov/assets/imtec-92-26.pdf))

### 4.5 The tracking consequence
That timing inaccuracy translated into a displacement of the predicted radar range gate. At approximately 100 hours, the GAO calculated a range-gate displacement of approximately 687 meters. ([GAO](https://www.gao.gov/assets/imtec-92-26.pdf))

## 5. Why the Error Accumulated

The underlying problem was runtime-dependent. The larger the internal clock value became, the greater the loss of precision in its conversion to a real number. The resulting timing inaccuracy therefore increased with continuous operation. The GAO independently verified this mechanism by analyzing the Patriot's computer architecture, assembly-language tracking programs, and the machine instructions responsible for the tracking inaccuracy. ([GAO](https://www.gao.gov/assets/imtec-92-26.pdf))

## 6. Why 100 Hours Mattered

The timing error was runtime-dependent rather than a simple fixed error applied independently to every clock tick. As the internal time value increased, the 24-bit conversion could represent that value with progressively less precision. The resulting time inaccuracy therefore increased with continuous runtime.

The GAO calculated approximately 0.0034 seconds of inaccuracy after 1 hour, 0.0275 seconds after 8 hours, and 0.3433 seconds after approximately 100 hours. ([GAO](https://www.gao.gov/assets/imtec-92-26.pdf))

Because rebooting reset the elapsed time, the system had a runtime-dependent failure mode. Rebooting reinitialized the computer's clock, resetting the accumulated timing error. The GAO notes that significant range-gate shifts could therefore be eliminated by rebooting every few hours. 8 hours of uptime had already produced measurable degradation; 100 hours pushed the error into a catastrophic regime.

## 7. How the Range Gate Failed

`[DOCUMENTED — GAO]` The timing error caused the Patriot's predicted range gate to be displaced relative to the actual target. The GAO calculated that approximately 100 hours of continuous operation produced a 0.3433-second timing inaccuracy and an approximately 687-meter shift in the range gate. ([GAO](https://www.gao.gov/assets/imtec-92-26.pdf))

| Runtime | Time inaccuracy | Approx. range-gate shift |
| :--- | :--- | :--- |
| 1 h | 0.0034 s | 7 m |
| 8 h | 0.0275 s | 55 m |
| 20 h | 0.0687 s | 137 m |
| 48 h | 0.1648 s | 330 m |
| 72 h | 0.2472 s | 494 m |
| 100 h | 0.3433 s | 687 m |

The timing error shifted the calculated range gate far enough that the system could no longer maintain the incoming Scud's track. Alpha Battery therefore did not engage the missile. ([GAO](https://www.gao.gov/pdf/product/215614))

## 8. The Warning That Came Before the Disaster

The system's operational assumptions did not adequately account for prolonged continuous runtime in the Gulf War deployment. The tragedy wasn't merely that there was a software bug. The system exhibited a measurable failure mode before the fatal incident, but the organization did not translate that evidence into an operational limit specific enough to prevent the failure.

The Patriot Project Office received Israeli data on February 11 showing significant range-gate degradation after approximately eight hours of continuous operation. ([GAO](https://www.gao.gov/pdf/product/215614)) Officials investigated and made a software change, which was released on February 16. On February 21, the office sent users a warning that very long runtimes could shift the range gate, but critically, the warning *did not specify what constituted a very long runtime*. The operational assumptions surrounding the system did not anticipate the prolonged continuous runtimes encountered during the Gulf War.

## 9. The February 11–25 Warning-to-Failure Chain

`[DOCUMENTED — GAO]` The chain of organizational and technical events leading to the disaster:

* **Feb 11:** Israeli data identifies significant range-gate degradation.
* **Feb 11-16:** Patriot Project Office investigates and develops a software change.
* **Feb 16:** Modified software version released.
* **Feb 21:** Warning sent to Patriot users.
* **Feb 25:** Dhahran battery has operated for >100 consecutive hours.
* **Feb 25:** Scud is not tracked/intercepted.
* **Feb 25:** Scud strikes barracks; 28 soldiers killed.
* **Feb 26:** Modified software arrives in Dhahran.

## 10. What the GAO Established

| Claim | Source | Confidence |
| :--- | :--- | :--- |
| ~100-hour uptime | GAO | `[DOCUMENTED — GAO]` |
| 0.3433 s time inaccuracy at ~100 h | GAO | `[DOCUMENTED — GAO]` |
| 687 m range-gate shift at ~100 h | GAO | `[DOCUMENTED — GAO]` |
| 28 deaths | GAO | `[DOCUMENTED — GAO]` |
| Feb 11 Israeli warning data | GAO | `[DOCUMENTED — GAO]` |
| Feb 16 modified software | GAO | `[DOCUMENTED — GAO]` |
| Feb 21 warning | GAO | `[DOCUMENTED — GAO]` |
| Warning lacked a quantified runtime threshold | GAO | `[DOCUMENTED — GAO]` |
| Exact original test-suite coverage | Not established by GAO | `[UNKNOWN — INSUFFICIENT RECORD]` |
| Engineers expected a daily reboot | Not established | `[UNKNOWN — INSUFFICIENT RECORD]` |

## 11. What the Evidence Does Not Establish

> **What the evidence establishes:**
> - A limited-precision time conversion error in converting tenths-of-a-second clock ticks into seconds accumulated monotonically with uptime.
> - After ~100 hours of continuous operation, the 0.3433-second timing drift shifted the radar tracking range gate by 687 meters, causing the system to drop the Scud track.
> 
> **What the evidence does NOT establish:**
> - Operator negligence; Army doctrine and user warnings sent before the incident did not specify a quantified continuous runtime limit.
> - The exact design rationale for the original 24-bit conversion choice in the legacy aircraft-tracking codebase.


## 12. Root-Cause Analysis

### The Deeper Root Cause: Cumulative Error Without an Adequate Operational Bound
The numerical approximation itself was tiny and predictable. The dangerous property was that its error grew with elapsed runtime, while the operational environment eventually allowed runtime to become much larger than the assumptions underlying the original calculation.

### The Second Failure: The Organization Knew
The sequence from February 11 to February 25 demonstrates the organizational failure. The organization observed evidence of runtime-dependent degradation and developed a software correction, but failed to establish and communicate a concrete operational limit before the corrected software reached the Dhahran battery.

## 13. Modern Engineering Lessons

This incident sits at the intersection of embedded systems, safety-critical software, and operational assumptions. A locally reasonable numerical trade-off (24-bit limited-precision time conversion) became unsafe when the software was operated for longer than the assumptions surrounding the calculation could tolerate.

Similar architectural assumptions—where software reuse and untracked runtime boundaries bypassed system safety interlocks—surfaced in [The Therac-25 Radiation Disaster](/blog/therac-25-radiation-overdose-race-condition) and the numerical conversion overflow of [Ariane 5 Flight 501](/blog/ariane-5-flight-501-integer-overflow). Bound every operational assumption with automated assertions rather than relying on unquantified operator warnings.

## 14. Then vs. Now

| System Parameter | Before | Corrective Direction |
| :--- | :--- | :--- |
| **Time calculation** | 24-bit limited-precision time conversion | Corrected time calculation |
| **Operational doctrine** | No concrete runtime threshold | Explicit runtime limitations/restart procedures |
| **Warning communication** | "Very long run times" | Quantified operational guidance |

## 15. FAQ

### What caused the Patriot Missile software failure?

The immediate technical cause was a cumulative timing error in the Patriot's weapons-control software. A 24-bit register limitation caused a loss of precision when converting the system's internal integer time to a real number. After more than 100 hours of continuous operation, the accumulated timing error shifted the radar's tracking range gate enough to prevent the battery from maintaining the incoming Scud track.

### Why was a 0.3433-second error fatal?

Scud missiles travel at approximately 1,676 meters per second (Mach 5). A 0.3433-second timing error shifted the Patriot's calculated range gate significantly. The tracking calculation became inaccurate enough that the system looked in the wrong place for the incoming Scud and failed to maintain the track, causing the system to reject the track rather than engage the target.

### Did they know about the bug before the attack?

Yes. The Patriot Project Office received Israeli data on February 11 showing a significant range-gate shift. A modified software version was released on February 16, and a February 21 message warned users about very long runtimes, but it critically did not define the threshold. The corrected software arrived at Dhahran on February 26, one day after the attack.

### Was this a hardware or software failure?

It was an architectural mismatch. The underlying 24-bit representation imposed a finite precision constraint; the software's time conversion lost precision to fit that register limitation. The resulting approximation was mathematically predictable, but its accumulated effect was not adequately bounded in the deployed operating context. The failure also involved the deployment context and operational handling of a known runtime-dependent software limitation.

## 16. Primary Sources

- **[GAO Report: Patriot Missile Defense - Software Problem Led to System Failure at Dhahran, Saudi Arabia](https://www.gao.gov/pdf/product/215614)**
  - *Establishes:* The precise technical mechanism of the 24-bit limited-precision time conversion, the exact 0.3433-second drift after 100 hours, the 687-meter radar tracking range gate displacement, and the timeline of Israeli warnings and the delayed software correction.
- **[College of Science and Engineering - The Patriot Missile Failure](https://www-users.cse.umn.edu/~arnold/disasters/patriot.html)**
  - *Establishes:* Technical mathematical analysis of the Patriot timing error and the base-2 non-terminating representation of 1/10.

## The Archivist's Verdict

> **The Archivist's Assessment:** The Dhahran Patriot failure is a brutal lesson in operational drift. A small numerical approximation in the system's time calculation accumulated with uptime until it became operationally significant. The decisive systems failure was not simply that the approximation existed, but that the deployment environment demanded prolonged continuous operation, the resulting degradation had already been observed, and the organization did not establish and communicate a concrete runtime limit before the corrected software reached the affected battery. The incident demonstrates how a mathematically tiny error can become a safety-critical failure when its accumulation is not bounded by either software design or operational doctrine.
