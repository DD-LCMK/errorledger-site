---
title: "Therac-25 Radiation Overdose: How a Race Condition, Counter Overflow, and Missing Hardware Interlocks Caused a Safety-Critical Failure"
description: "A forensic reconstruction of the 1985–1987 Therac-25 radiation overdoses. How undocumented code reuse, a concurrent state-consistency race condition, a 1-byte counter rollover, and the removal of physical hardware interlocks combined in a catastrophic systems engineering failure."
author: "The Archivist"
pubDate: "2026-08-24"
slug: "therac-25-radiation-overdose-race-condition"
heroImage: "/hero_therac_25.jpg"
incidentDate: "1985-06-03"
incidentPeriod: "1985–1987"
incidentEndDate: "1987-01-17"
systemTypes: ["Safety-Critical Software", "Medical Devices", "Race Conditions", "Embedded Systems"]
victimCount: 6
fatalities: "3 (Causality mixed: radiation injury contributed to or accelerated death in patients with terminal conditions)"
regulatoryAction: "FDA defect determination and mandatory corrective-action program"
systemImpact: "Therac-25 corrective action involving hardware interlocks, software modifications, independent shutdown, and safety-control changes"
summary_points:
  context: "Between 1982 and 1985, Atomic Energy of Canada Limited (AECL) manufactured the Therac-25, a dual-mode medical linear accelerator."
  systemic_failure: "AECL removed or did not duplicate several independent hardware safety mechanisms used in predecessor systems, increasing the software's responsibility for enforcing safety without equivalent independent hardware protection."
  technical_mechanisms: "Post-incident investigations discovered two distinct software defects: a shared-state concurrency defect (Tyler) and an 8-bit counter rollover (Yakima)."
  fallout: "Six known overdose accidents resulted in severe radiation injuries. The FDA declared the device defective and mandated a comprehensive Corrective Action Plan (CAP) encompassing both software and physical hardware interlocks."
primary_sources:
  - title: "IEEE Computer: An Investigation of the Therac-25 Accidents (Leveson & Turner, 1993)"
    url: "https://cseweb.ucsd.edu/classes/wi14/cse291-c/reports/leveson93investigation.pdf"
  - title: "FDA Center for Devices and Radiological Health (CDRH) Medical Device Safety Records"
    url: "https://www.fda.gov/medical-devices/medical-device-safety"
  - title: "GAO Report: Medical Devices - The Public Health at Risk"
    url: "https://www.gao.gov/assets/pemd-90-6.pdf"
---

> **The Archivist’s Note:** AI can summarize what happened. ErrorLedger reconstructs *why* it happened, who made which decisions, what happened next, and what the evidence actually shows.

<BoundaryBox>
**What the evidence does NOT establish:**
* That the software bugs were caused by intentional sabotage, malicious intent, or deliberate disregard for patient safety; official FDA and IEEE forensic investigations establish that the defects stemmed from poor software engineering practices, absent independent verification, and uncoordinated code reuse.
* That a "single programmer" was solely responsible for the entire system, as this simplifies the systemic engineering and regulatory failures documented in the case.
</BoundaryBox>

## 1. Executive Summary

Between 1985 and 1987, the Therac-25 medical linear accelerator was involved in six known radiation overdose accidents in the United States and Canada. Three of the patients later died; while some died of underlying terminal cancer, the radiation injuries were severe and contributed to their suffering or accelerated their deaths. 

Unlike its predecessors, the Therac-25 was designed to rely heavily on software for safety enforcement. Critical safety functions that had previously been independently enforced by physical hardware were delegated to a PDP-11 computer running custom software. When software defects—including a concurrency race condition and an integer overflow—were triggered, the absence of independent physical interlocks allowed the machine to deliver high-current electron beams directly to patients without the necessary beam-scattering targets.

The resulting regulatory investigation by the FDA and the canonical analysis by Leveson and Turner (1993) revealed a cascading failure of software engineering, hazard analysis, human-factors design, and corporate response, culminating in a mandatory Corrective Action Plan (CAP) that fundamentally redesigned the machine's safety architecture.

## 2. What Was the Therac-25?

The Therac-25 was a computer-controlled dual-mode medical linear accelerator developed by Atomic Energy of Canada Limited (AECL). It was designed to destroy tumors by irradiating them. 

The machine operated in two distinct modes:
1. **Electron Mode:** A low-current electron beam (e.g., 200 rads) was delivered directly to the patient using scanning magnets to spread the beam across the treatment area.
2. **X-Ray Mode:** A high-current electron beam (e.g., 25,000,000 electron volts) was fired at a physical target (a tungsten target and flattening filter). The target absorbed the electrons and generated a controlled beam of X-rays for deep-tissue treatment.

To safely use the high-current X-ray mode, the physical target *must* be positioned in the beam's path. If the high-current beam was activated while the machine was physically configured for electron mode (which had no target in place), the patient would be struck directly by an unattenuated, highly concentrated high-current electron beam, causing severe radiation burns.

## 3. Six Known Accidents — Evidence Matrix

The canonical investigation identifies six known accidents between June 1985 and January 1987 ([Leveson & Turner, p. 21-26](https://cseweb.ucsd.edu/classes/wi14/cse291-c/reports/leveson93investigation.pdf)).

| Date | Location | Mechanism | Estimated Dose | Injury & Causality |
| :--- | :--- | :--- | :--- | :--- |
| **Jun 1985** | Kennestone (Marietta, GA) | Unknown | ~15,000–20,000 rad | [DOCUMENTED] Severe radiation burn to breast. Patient survived. |
| **Jul 1985** | Hamilton (Ontario, Canada) | Unknown | Unknown | [DOCUMENTED] Severe radiation injury to hip. Patient subsequently died; death attributed to underlying virulent cancer, though radiation injury was severe. |
| **Dec 1985** | Yakima (WA) - Incident 1 | Unknown | Unknown | [DOCUMENTED] Skin reddening and burn. Mechanism remained unresolved. |
| **Mar 1986** | Tyler (TX) - Incident 1 | Reconstructed (Tyler Race Condition) | ~16,500–25,000 rad | [DOCUMENTED] Severe neurological and physical damage. Patient died 5 months later from complications of the overdose. |
| **Apr 1986** | Tyler (TX) - Incident 2 | Reconstructed (Tyler Race Condition) | ~16,500–25,000 rad | [DOCUMENTED] Severe brain damage and coma. Patient died 3 weeks later. |
| **Jan 1987** | Yakima (WA) - Incident 2 | Reconstructed (Yakima Class3 Rollover) | ~8,000–10,000 rad | [DOCUMENTED] Severe radiation burn. Patient had terminal cancer and died in April; overdose contributed to suffering. |

## 4. The Safety Invariant That Failed

The core physical constraint of a dual-mode linear accelerator is an absolute safety invariant:

`[ANALYTICAL]` **The Safety Invariant:** `IF (Beam_Current == HIGH) THEN (Physical_Target == IN_PATH)`

In previous machines, this invariant was enforced by independent electro-mechanical interlocks. If the high-current mode was selected, physical circuits prevented the beam from turning on unless the target was locked in place. 

AECL removed or did not duplicate several independent hardware safety mechanisms used in predecessor systems, increasing the software's responsibility for enforcing safety. The software became the primary arbiter of this invariant. If the internal state of the software became inconsistent with the physical state of the machine, there was no independent physical barrier to stop the beam.

## 5. Tyler: The Shared-State/Concurrency Failure

The mechanism behind the two Tyler, Texas accidents was reconstructed through analysis of the data-entry and treatment-monitor tasks ([Leveson & Turner, p. 26](https://cseweb.ucsd.edu/classes/wi14/cse291-c/reports/leveson93investigation.pdf)).

The operator interface required typing prescriptions on a terminal. If an operator realized they had mistakenly typed 'X' (X-Ray mode) instead of 'E' (Electron mode), they could use the 'Up' arrow to move the cursor, change the 'X' to an 'E', and hit Enter.

`[RECONSTRUCTED]` **The Concurrency Defect:**
1. Setting the bending magnets for treatment took approximately 8 seconds. 
2. During this 8-second window, the data-entry task and the magnet-setting task ran concurrently.
3. The software relied on shared variables (like `MEOS` for mode/energy) and a data-entry completion flag (`Datent`). 
4. The system read the high-order byte of `MEOS` to configure some operating parameters, but used the low-order byte of `MEOS` to position the physical turntable (the target).
5. If the operator edited the mode from 'X' to 'E' *during* the 8-second magnet-setting phase, the concurrent processing allowed the prescription screen to appear updated, but internal state had already been processed inconsistently. 
6. The machine's physical configuration (turntable) and software parameters (beam current) became misaligned. The high-current beam was enabled while the physical turntable was in the field-light (no target) position.

The problem was not simply that the operator had an eight-second window; it was that shared mutable state and asynchronous task handling allowed a rapidly executed operator edit to corrupt the safety invariant.

## 6. Yakima: Class3 Rollover + Interlock Failure

The second Yakima accident (January 1987) involved an entirely different software defect: an integer overflow interacting with a software interlock.

`[RECONSTRUCTED]` **The Class3 Defect:**
1. A routine called `Set-Up Test` executed repeatedly to verify machine alignment.
2. Inside this routine, an 8-bit variable named `Class3` was incremented every time the test ran.
3. Because `Class3` was 1 byte, every 256th pass it suffered an integer overflow and rolled over to exactly `0`.
4. A separate safety check called `Lmtchk` looked at `Class3`. If `Class3` was non-zero, it checked the collimator positions (`Chkcol`). If `Class3` was `0`, the logic explicitly *skipped* the collimator check.
5. Due to operator timing, the operator hit the "Set" button at the exact fraction of a second when `Class3 == 0`.
6. The software bypassed the critical safety check. The fault variable `F$mal` was not set, and the software falsely concluded the machine was safe.
7. The beam was enabled with the turntable in the incorrect physical position.

This was not merely an integer overflow; it was an 8-bit counter rollover interacting with concurrent interlock checking, resulting in the bypassing of a critical safety boundary.

## 7. Why the Two Bugs Do Not Explain Every Accident

The historical record does not establish that the Tyler race condition or the Yakima `Class3` overflow explain the first three accidents (Kennestone, Hamilton, Yakima 1). 

`[DOCUMENTED]` As Leveson and Turner noted, the exact mechanisms of the earliest accidents remain unknown because detailed telemetry, video records, and reproducible fault sequences were unavailable at the time. Assuming all six accidents were caused by the same race condition is a common historical oversimplification.

## 8. Malfunction 54: The Observability/Human-Factors Failure

When the Tyler race condition triggered, the Therac-25 did not display a warning saying "DANGER: LETHAL RADIATION." 

Instead, the terminal displayed a cryptic error: **"Malfunction 54"**. The machine paused the treatment.

`[ANALYTICAL]` **The Observability Failure Chain:**
1. **Physical Reality:** A high-current electron beam struck the patient.
2. **Machine Monitor:** The beam-intensity ion chambers became saturated by the massive dose. The software misread this saturation as a low-dose condition (underdose).
3. **Operator Interface:** The system threw a low-priority "treatment pause" (Malfunction 54) indicating a minor dose-rate fault.
4. **Operator Response:** Because Therac-25 operators routinely encountered dozens of minor nuisance pauses a day, they had learned that pressing 'P' (Proceed) was the normal recovery behavior. 
5. **Patient Experience:** The patient in the shielded room experienced a severe electrical shock and burning sensation, but the operator (without a working intercom in the Tyler case) could not hear them. The operator pressed 'P', delivering a second massive overdose.

The system failed to map the physical hazard to an actionable, high-severity fault classification.

## 9. Why Testing and Safety Analysis Missed the Risk

How did AECL testing fail to catch the race condition?

`[DOCUMENTED]` The software was primarily tested as an integrated system, not via isolated module testing or adversarial timing analysis. Experienced hospital operators could execute data-entry sequences much faster than the engineers who tested the machine.

Furthermore, the formal safety analysis explicitly assumed that software errors would not occur. The Fault Tree Analysis (FTA) assigned probabilities to hardware failures (e.g., switches, relays) but treated the software as perfectly reliable. The analysis assumed away residual software errors, meaning the safety model never accounted for a scenario where the software itself commanded an unsafe state.

## 10. Why Earlier Therac Systems Masked Related Software Defects

The Therac-25 software was not entirely new. Software lineage and reuse across Therac generations carried code from the Therac-20. 

`[RECONSTRUCTED]` The canonical investigation notes that related software problems existed in the Therac-20. However, the Therac-20 possessed independent physical hardware interlocks. If the Therac-20 software generated an unsafe configuration, the physical hardware breaker would trip, blowing a fuse and preventing the beam from firing. The software defect manifested merely as a blown fuse—a nuisance, not a hazard.

When this software lineage was carried over to the Therac-25, the independent hardware safeguards were not duplicated. A latent software defect that had been safely masked by physical hardware in a previous generation was suddenly exposed as a lethal hazard.

## 11. Regulatory Timeline

The regulatory response by the FDA Center for Devices and Radiological Health (CDRH) escalated as the accident patterns became undeniable.

| Date | Event | Regulatory Significance |
| :--- | :--- | :--- |
| **May 2, 1986** | FDA Defect Determination | FDA declared Therac-25 defective and demanded a Corrective Action Plan (CAP). |
| **Jun 1986** | Initial CAP Submitted | AECL proposed minor software patches. |
| **Jan 1987** | Second Yakima Accident | Revealed that the initial patches were insufficient (Class3 bug discovered). |
| **Feb 10, 1987** | Notice of Adverse Findings | FDA ordered discontinuation of routine therapy until comprehensive corrective action was taken. |
| **May 26, 1987** | CAP Approval Conditions | FDA approved the CAP subject to strict implementation conditions. |
| **Jul 1987** | Final CAP Revision | Final redesign encompassing hardware and software approved. |

## 12. Engineering Evolution: Before vs After

The final Corrective Action Plan fundamentally altered the machine's architecture, effectively restoring the principles of independent safety verification.

| System Feature | Before Corrective Action (Therac-25) | After Corrective Action (Final CAP) |
| :--- | :--- | :--- |
| **Target Interlock** | Software-controlled based on variable state. | Independent hardware interlock preventing beam if turntable is out of position. |
| **Overdose Protection** | Software monitored ion chamber levels. | Independent hardware single-pulse shutdown circuit. |
| **Fault Messages** | Cryptic codes ("Malfunction 54"). | Meaningful, actionable malfunction messages. |
| **Operator Recovery** | 'P' (Proceed) allowed immediate retry. | Treatment suspended for dosimetry faults; required full reset. |
| **Editing Behavior** | Prescriptions could be edited mid-setup. | Editing-key restrictions enforced during critical setup phases. |

## 13. ErrorLedger Forensic Failure Model

`[ANALYTICAL]` The Therac-25 disaster is best understood through a 5-layer systemic failure model:

1. **Layer 1 — Architecture:** Independent hardware safeguards were reduced, transferring total safety responsibility to software.
2. **Layer 2 — Software:** Concurrent shared-state defects and counter overflows allowed physically unsafe configurations to become representable in memory.
3. **Layer 3 — Detection:** Fault monitors (ion chambers) saturated, misclassifying a catastrophic high-dose event as a minor underdose.
4. **Layer 4 — Human Factors:** Operators, habituated by frequent nuisance alarms, received misleading recovery signals and bypassed safety holds.
5. **Layer 5 — Organization:** Early accident reports were initially dismissed or attributed to patient condition rather than escalating into a system-wide engineering investigation.

## 14. Modern Engineering Lessons

Modern safety-critical engineering directly addresses the specific failures of the Therac-25.

1. **Explicit Safety Invariants:** A numeric counter (`Class3`) should never influence a safety decision. Modern design separates "iteration counts" from "safety-validity state."
2. **Independent Safety Channels:** A latent software defect can remain invisible when an independent physical safety barrier prevents it from becoming a hazard. The removal of that barrier exposes the defect. Safety requires defense-in-depth (e.g., physical watchdogs).
3. **Hazard Observability:** Cryptic error codes ("Malfunction 54") in high-risk environments are dangerous. Human-factors validation must ensure that catastrophic faults are visually and procedurally distinct from routine operational pauses.
4. **Concurrency Validation:** Shared mutable state across asynchronous tasks (data-entry vs magnet-setting) requires strict transactional boundaries, locking, or immutable configuration payloads to prevent race conditions.

## 15. Evidence Limitations

While the Tyler and Yakima software defects were definitively reconstructed, several historical aspects remain unknown.

`[UNKNOWN]` We do not know the exact mechanisms that caused the first three accidents (Kennestone, Hamilton, Yakima 1). We do not know the exact patient dose received in individual cases, as simulations varied based on precise timing. Furthermore, the complete internal software development history and the exact decision rationale behind the removal of every hardware interlock remain unrecorded in the public judicial and regulatory filings.

## 16. FAQ

**Was the Therac-25 a software failure or a hardware failure?**
It was a systemic architectural failure. While specific software bugs (race conditions, integer overflows) triggered the accidents, the root cause was the architectural decision to remove independent hardware interlocks and rely solely on unverified software to enforce physical safety.

**What caused the Therac-25 race condition?**
The Tyler race condition occurred because the data-entry task and the 8-second magnet-setting task ran concurrently and mutated shared variables without adequate isolation. This allowed the operator to change the prescription on screen while the machine was already configuring itself based on the previous input, resulting in an unsafe physical state.

**What was the Class3 bug?**
In the second Yakima accident, an 8-bit counter (`Class3`) used in a setup-test loop rolled over to zero. A safety interlock check was programmed to skip collimator validation when `Class3` equaled zero. Because of precise operator timing, the beam was enabled while the machine was unsafe.

**Why didn't testing catch the Therac-25 bugs?**
Testing was primarily conducted on integrated systems rather than through rigorous module or adversarial timing analysis. Testers did not type as fast as experienced hospital operators, meaning the concurrent timing windows were rarely triggered in the lab. Furthermore, the formal safety analysis assumed the software would not fail.

**What did Malfunction 54 mean?**
"Malfunction 54" was a cryptic software error code that occurred during the Tyler accidents. It indicated a "dose input 2" error, which the machine interpreted as an underdose. In reality, the ion chambers had saturated from a massive radiation overdose. The misleading error caused operators to simply press 'Proceed' to try again.

**How many Therac-25 accidents occurred?**
There were six known radiation overdose accidents between June 1985 and January 1987. Three of the patients subsequently died. While the radiation injuries were severe, causation in the fatalities was complex, as some patients were already suffering from terminal cancer.

**What changes did the FDA require?**
The FDA mandated a comprehensive Corrective Action Plan (CAP). This required AECL to redesign the software, improve the clarity of error messages, restrict mid-setup editing, and crucially, install independent physical hardware interlocks to monitor the turntable and prevent the beam from firing if misaligned.

## Primary Sources

- **[IEEE Computer: An Investigation of the Therac-25 Accidents (Leveson & Turner, 1993)](https://cseweb.ucsd.edu/classes/wi14/cse291-c/reports/leveson93investigation.pdf)**
  - *Establishes:* The six accidents, system architecture, software lineage, reconstruction of the Tyler mechanism, reconstruction of the Yakima `Class3` mechanism, and regulatory chronology. This is the canonical forensic investigation.
- **[FDA Center for Devices and Radiological Health (CDRH) Medical Device Safety Records](https://www.fda.gov/medical-devices/medical-device-safety)**
  - *Establishes:* The formal defect determination, corrective-action requirements, and regulatory communications.
- **[GAO Report: Medical Devices - The Public Health at Risk](https://www.gao.gov/assets/pemd-90-6.pdf)**
  - *Establishes:* Broader historical medical-device reporting weaknesses and the FDA post-market surveillance regulatory environment of the era.

## The Archivist's Verdict

> **The Archivist's Assessment:** The Therac-25 disaster is the foundational text of modern safety-critical engineering, not simply because it contained software bugs, but because it demonstrated what happens when physical safety barriers are replaced by unverified code. AECL’s engineering failure was trusting that a system that worked safely with hardware interlocks (Therac-20) would remain safe when those interlocks were removed and their responsibilities transferred to software. The race conditions and counter overflows were ordinary programming mistakes; the architecture that allowed those mistakes to deliver lethal doses of radiation was the true catastrophe.
