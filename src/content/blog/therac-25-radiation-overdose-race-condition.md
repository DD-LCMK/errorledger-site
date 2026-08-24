---
title: "Therac-25 Radiation Overdoses: How a Race Condition and Missing Hardware Interlocks Failed"
description: "A forensic reconstruction of the 1985–1987 Therac-25 radiation overdoses. How undocumented code reuse, a concurrent state-consistency race condition, a 1-byte counter rollover, and the removal of physical hardware interlocks combined in a catastrophic systems engineering failure."
author: "The Archivist"
pubDate: "2026-08-24"
slug: "therac-25-radiation-overdose-race-condition"
heroImage: "/hero_therac_25.jpg"
incidentDate: "1985-06-03"
systemTypes: ["Safety-Critical Software", "Medical Devices", "Race Conditions", "Embedded Systems"]
victimCount: 6
fatalities: 3
regulatoryAction: "FDA corrective action"
systemImpact: "Therac-25 corrective action and safety redesign"
summary_points:
  context: "Between 1982 and 1985, Atomic Energy of Canada Limited (AECL) manufactured the Therac-25, a dual-mode medical linear accelerator. Critical safety functions were delegated to software, replacing independent hardware interlocks present in prior models."
  trigger: "Two distinct software defects were conclusively reconstructed from the best-documented accidents: a concurrent data-entry race condition (Tyler) and a 1-byte counter overflow (Yakima). The available evidence does not establish that these two defects explain every Therac-25 overdose."
  fallout: "Six known overdose accidents involving patients at facilities in the United States and Canada resulted in severe radiation injuries and several fatalities. The FDA declared the device defective, requiring a major corrective-action program involving hardware, software, documentation, and safety-control changes."
primary_sources:
  - title: "IEEE Computer: An Investigation of the Therac-25 Accidents (Leveson & Turner)"
    url: "https://cseweb.ucsd.edu/classes/wi14/cse291-c/reports/leveson93investigation.pdf"
  - title: "FDA Center for Devices and Radiological Health (CDRH) Medical Device Safety Records"
    url: "https://www.fda.gov/medical-devices/medical-device-safety"
  - title: "GAO Report: Medical Devices - The Public Health at Risk"
    url: "https://www.gao.gov/assets/pemd-90-6.pdf"
---

> **The Archivist’s Note:** AI can summarize what happened. ErrorLedger reconstructs *why* it happened, who made which decisions, what happened next, and what the evidence actually shows.

<BoundaryBox>
**What the evidence does NOT establish:**
* That the software bugs were caused by an intentional act of sabotage or malicious developer negligence; official FDA and IEEE forensic investigations establish that the defects stemmed from poor software engineering practices, absent independent verification, and uncoordinated code reuse.
* That all six overdoses shared a single causal mechanism. The historical investigation explicitly notes that the causes of several incidents cannot be conclusively determined.
* That hospital radiation therapy technicians acted with reckless disregard for human life; operators had become accustomed to treatment pauses that previously had resulted only in inconvenience.
</BoundaryBox>

---

## 1. Executive Summary

Between June 1985 and January 1987, the Therac-25 medical linear accelerator administered massive radiation overdoses to cancer patients across medical facilities in the United States and Canada. Built by Atomic Energy of Canada Limited (AECL), the Therac-25 was an advanced dual-mode machine heavily reliant on computer control.

The historical evidence establishes two distinct software defects as the causal mechanism for at least three of these incidents, but not every accident can be assigned to one of them. The documented failures were not reducible to a single coding mistake. They emerged from unsafe concurrency, inadequate state validation, weak software engineering practices, flawed human-interface design, the removal of independent hardware protections, and organizational response failures.

---

## 2. What Was the Therac-25?

The Therac-25 was a state-of-the-art dual-mode medical linear accelerator designed and manufactured by Atomic Energy of Canada Limited (AECL). Unlike its predecessors (the Therac-6 and Therac-20), which relied heavily on physical hardware interlocks to enforce safety limits, the Therac-25 utilized a heavily software-controlled architecture running on a DEC PDP-11 minicomputer. 

It was designed to administer two types of therapeutic radiation: low-current electron beams for superficial tumors, and high-current X-ray (photon) beams for deep internal tumors. Between 1985 and 1987, at least six patients suffered massive radiation overdoses when the machine unexpectedly fired an unattenuated high-current beam while configured for a low-current treatment ([Leveson & Turner, p. 19](https://cseweb.ucsd.edu/classes/wi14/cse291-c/reports/leveson93investigation.pdf)).

---

## 3. At a Glance: Six Known Accidents

The canonical historical investigation by Leveson and Turner describes six known overdose accidents.

| Incident | Location | Date | Epistemic Confidence | Outcome |
| :--- | :--- | :--- | :--- | :--- |
| **1** | Kennestone (GA) | June 1985 | Unknown: available evidence insufficient to determine mechanism | Severe radiation injury |
| **2** | Hamilton (ON) | July 1985 | Unknown: available evidence insufficient to determine mechanism | Fatality |
| **3** | Yakima (WA) | Dec 1985 | Unknown: available evidence insufficient to determine mechanism | Severe radiation injury |
| **4** | Tyler (TX) | Mar 1986 | Known mechanism: reconstructed from software analysis | Fatality |
| **5** | Tyler (TX) | Apr 1986 | Known mechanism: reconstructed from software analysis | Fatality |
| **6** | Yakima (WA) | Jan 1987 | Known mechanism: reconstructed from software analysis | He died approximately three months later from complications associated with the radiation injury; he also had terminal cancer. |

---

## 4. What the Evidence Establishes

To maintain epistemic discipline, this case file classifies claims using the following framework:

*   **[DOCUMENTED]** — Explicitly supported by primary records (e.g., court dockets, regulatory filings).
*   **[RECONSTRUCTED]** — Derived from source-code analysis, telemetry, timing, or investigation.
*   **[ANALYTICAL]** — ErrorLedger interpretation based on documented evidence.
*   **[UNKNOWN]** — Available evidence does not establish the mechanism.

---

## Act I: Therac-25 Architecture: Why Software Became the Safety Barrier

Radiation therapy requires two distinct operational modalities:

1. **Direct Electron Beam Therapy (Low Current):** Used for superficial skin tumors. The machine fires a direct electron beam at low currents and variable energy levels (6 to 25 MeV), using scanning magnets to disperse the dose safely.
2. **X-Ray Photon Therapy (High Current):** Used for deep internal tumors. The machine fires a high-energy electron beam with a current nearly 100 to 1,000 times higher into a heavy tungsten-tantalum target to produce penetrating X-ray photons. 

In the predecessor Therac-6 and Therac-20 systems, safety was guaranteed by **independent electromechanical hardware interlocks**. Heavy-duty electrical switches physically prevented the high-current beam from firing unless the tungsten target was properly seated. 

`[DOCUMENTED]` For the Therac-25, critical safety functions were delegated to software, replacing independent hardware interlocks present in prior models ([Ethics Unwrapped](https://ethicsunwrapped.utexas.edu/case-study/therac-25)). The architecture relied on the sequence: physical configuration → sensors → software validation → beam authorization. Software became responsible for enforcing a safety condition that had previously possessed independent physical enforcement.

`[DOCUMENTED]` The software was inherited across system generations with inadequate documentation and software-quality practices. Because older machines possessed physical interlocks that prevented erroneous software commands from causing a physical hazard, latent software defects remained hidden.

---

## Act II: The Tyler Race Condition: How Rapid Editing Created an Unsafe State

`[DOCUMENTED]` On March 21, 1986, at the East Texas Cancer Center in Tyler, Texas, an experienced operator prepared to treat a patient. The treatment sequence required selecting the mode on the operator console. The operator typed `X` for 25 MeV Photon mode by mistake. Realizing the error, the operator quickly edited the mode to `E` for Electron mode and confirmed the rest of the parameters. 

`[RECONSTRUCTED]` The rapid editing sequence created a state-consistency race condition. 

> **What is a race condition?** 
> A race condition occurs when the result of a system operation depends on the timing or ordering of concurrent actions. In Therac-25, operator input could modify software state while other control routines were still processing the previous configuration.

The approximately eight-second magnet-setting interval created a vulnerability in which an operator could modify the prescription while concurrent control tasks were still processing the earlier mode/energy state.

```text
Analytical reconstruction based on Leveson-Turner software analysis

1. Operator enters 'X' (Photon Mode)
   └─► System begins positioning collimator turntable (Takes ~8 seconds)

2. Operator changes mode to 'E' (Electron) within 8s
   └─► Software state: prescription edited to electron mode.
   └─► Mechanical state: beam-path hardware remains inconsistent with the edited prescription.

3. Discrepant State:
   ├─ Software permits beam activation based on 'setup complete' flag.
   └─ Hardware configuration lacks the necessary attenuation/scattering assembly for high current.
```

`[DOCUMENTED]` When the operator activated the beam, the patient received a massive unattenuated exposure. Based on post-incident physics reconstructions, the estimated dose was approximately 16,500–25,000 rads in less than one second—tens to hundreds of times the intended treatment dose ([Leveson & Turner, p. 25](https://cseweb.ucsd.edu/classes/wi14/cse291-c/reports/leveson93investigation.pdf)). The patient died five months later from severe radiation-induced injuries and complications.

---

## 7. The Yakima Counter Overflow: A Second Independent Software Failure

`[DOCUMENTED]` In January 1987, at the Yakima Valley Memorial Hospital in Washington state, another patient received a severe overdose due to a completely different software defect.

`[RECONSTRUCTED]` The investigation reconstructed a second failure involving an 8-bit variable (`Class3`) associated with the setup-test logic. Every time the setup loop executed, the program incremented this variable. 

> **What is a counter overflow?** 
> A value representing execution state is allowed to mathematically wrap around (e.g., passing the maximum value of 255 for an 8-bit integer and returning to 0). 

When the counter wrapped through zero, a conditional test could be skipped, allowing an unsafe machine state to pass through the software checks. This permitted the internal malfunction state to remain clear even though the physical collimator was still in an unsafe configuration.

`[DOCUMENTED]` The Yakima 1987 reconstruction estimated an initial exposure of approximately 4,000–5,000 rad, potentially totaling 8,000–10,000 rad after two attempts. He died approximately three months later from complications associated with the radiation injury; he also had terminal cancer before the incident.

---

## 8. Why the Two Bugs Don't Explain Everything

`[UNKNOWN]` The six accidents should not be represented as six repetitions of the same race condition. The available investigation reconstructs specific mechanisms for particular incidents (Tyler and the second Yakima accident) while leaving others unresolved.

* The exact causal mechanism of the Kennestone, Hamilton, and first Yakima accidents remains undetermined.
* It is unknown whether the same software defect contributed to those early incidents, or if independent faults were responsible.
* The exact internal reasoning behind the removal of each hardware interlock remains undocumented.

---

## 9. What Was Therac-25 Malfunction 54?

`[DOCUMENTED]` When the race condition occurred at Tyler, the operator console displayed a cryptic error message: `Malfunction 54`. The available operator documentation did not explain the significance of Malfunction 54, identifying it merely as a "dose input 2" error ([Online Ethics](https://onlineethics.virginia.edu/cases/therac-25/therac-25-case-narrative)).

It did not communicate that a dangerous radiation fault had occurred. Instead, the console displayed `TREATMENT PAUSE` and reported that a massive underdose had been delivered. Crucially, the software allowed operators to clear the error and re-fire the beam simply by pressing the `P` (Proceed) key.

`[ANALYTICAL]` At Tyler, the operator was separated from the treatment room, and visual/audio monitoring was impaired, meaning the operator could not directly observe the patient. Furthermore, operators had become accustomed to treatment pauses that previously had resulted only in inconvenience. The interface design, combined with misleading information and lack of direct patient feedback, normalized anomalous conditions and obscured the severity of the hazard.

---

## Act III: Regulatory Escalation and Corrective Action

`[DOCUMENTED]` The institutional response by AECL and regulatory authorities unfolded in stages:

1. **Initial Investigation (1985):** Following the Kennestone and Hamilton accidents, AECL investigated but could not reproduce the malfunctions, initially concluding that a massive overdose was physically impossible.
2. **Escalation (1986):** After the Tyler accidents, the FDA became heavily involved and AECL submitted initial corrective action material.
3. **Formal Action (February 1987):** The FDA notified AECL that the Therac-25 was defective and requested that customers not use it for routine therapy until corrective measures were completed ([Online Ethics Timeline](https://onlineethics.virginia.edu/cases/therac-25-timeline)).
4. **Corrective Program (1987):** The FDA required a major corrective-action program involving hardware, software, documentation, and safety-control changes.

---

## The Forensic Discrepancy Matrix

| System Layer | Expected Safety Invariant | Actual System Behavior | Epistemic Status |
| :--- | :--- | :--- | :--- |
| **Safety Architecture** | Hardware limit switches physically block beam activation if turntable position is unsafe | Software reads sensors; independent hardware interlocks were removed | `[DOCUMENTED]` |
| **Keyboard Parameter Entry** | Modifying parameters resets the entire concurrent validation pipeline | Editing mode created state inconsistency between software and hardware | `[RECONSTRUCTED]` |
| **`Set-Up Test` Logic** | State variable accurately tracks safety invariants | Shared 8-bit variable rolled over to 0, skipping the collimator safety check | `[RECONSTRUCTED]` |
| **Operator Console** | Display clear, actionable error messages identifying radiation hazards | Displayed cryptic `Malfunction 54` codes and permitted `P` override | `[DOCUMENTED]` |

---

## 12. Systems Prevention Playbook

Modern engineering lessons derived from these failure modes:

### 1. Friction Defenses: UI State Atomicity
* **[HISTORICAL LESSON]:** Rapid UI edits invalidated deep concurrent machine states. 
* **[MODERN ENGINEERING TRANSLATION]:** Implement strict state-machine transactional isolation. In safety-critical UI design, parameter edits must invalidate downstream actuation pipelines, requiring atomic re-verification before the system can transition to an armed state.

### 2. Boundary Constraints: Arithmetic Invariants & Safe Types
* **[HISTORICAL LESSON]:** The setup variable overflowed, transforming a critical safety-check into a dangerous bypass.
* **[MODERN ENGINEERING TRANSLATION]:** Use checked arithmetic and explicit invariant enforcement. Never use shared scalar counters to represent binary safety invariants; safety state must be validated through explicit boolean guards.

### 3. Emergency Brakes: Independent Hardware Mechanisms
* **[HISTORICAL LESSON]:** Critical safety functions were delegated to software, replacing independent hardware interlocks. 
* **[MODERN ENGINEERING TRANSLATION]:** No single software component should be the sole safety barrier protecting humans from a hazardous actuator. Safety-critical systems require independent hardware safety mechanisms, such as independent watchdogs, redundant sensing, and non-bypassable hardware interlocks.

---

## 13. Then vs Now: Engineering Evolution

| Therac-25 Failure | Modern Defensive Pattern |
| :--- | :--- |
| Shared mutable safety state | Explicit state machine |
| Concurrent editing during actuation | Transactional configuration |
| Counter rollover | Checked arithmetic |
| Software-only safety enforcement | Independent hardware safety layer |
| Cryptic malfunction numbers | Actionable hazard messages |
| Easy fault override | Fail-safe recovery |

---

## The Archivist's Verdict

> **The Archivist's Assessment:** The engineering lesson is therefore not "software is dangerous." The lesson is that a safety-critical software system must not be trusted merely because it has historically appeared reliable. Safety claims require independent enforcement, systematic verification, explicit state invariants, and evidence that the system fails safely when assumptions are violated.

---

## 15. FAQ

**Was Therac-25 caused by a race condition?**
The March and April 1986 accidents in Tyler, Texas, were caused by a concurrent data-entry race condition. However, a separate incident in Yakima was caused by a counter overflow, and the exact mechanisms of three other known accidents remain unverified.

**How many people died from Therac-25?**
The historical investigations document six known overdose accidents, resulting in severe radiation injuries and three fatalities.

**What was Malfunction 54?**
Malfunction 54 was a cryptic error message displayed on the Therac-25 console during the Tyler race condition. It indicated a "dose input 2" error but failed to communicate to the operator that an unsafe radiation hazard was present.

**What was the Class3 bug?**
The "Class3" bug refers to the January 1987 Yakima incident, where an 8-bit variable used in a setup-test loop rolled over (overflowed to zero), causing the software to bypass a critical collimator safety check.

**Why were hardware interlocks removed?**
The manufacturer designed the Therac-25 to rely on software to enforce safety limits that had previously been enforced by physical electromechanical switches in older models, believing the software to be highly reliable.

**How much radiation did Therac-25 deliver?**
Post-incident reconstructions of the Tyler accident estimate that the patient received approximately 16,500–25,000 rads in less than one second, which is tens to hundreds of times the intended treatment dose.

**What did the FDA do?**
Following the accidents, the FDA became involved in 1986, formally notified the manufacturer that the machine was defective in February 1987, and required a major corrective action program involving software, hardware, and documentation changes.

---

## Primary Sources

**Tier 1: Canonical Investigations and Regulatory Records**
* [IEEE Computer: An Investigation of the Therac-25 Accidents (Nancy G. Leveson & Clark S. Turner)](https://cseweb.ucsd.edu/classes/wi14/cse291-c/reports/leveson93investigation.pdf)
* [Online Ethics Center: Therac-25 Timeline](https://onlineethics.virginia.edu/cases/therac-25-timeline)
* [U.S. FDA Center for Devices and Radiological Health (CDRH) Medical Device Safety Records](https://www.fda.gov/medical-devices/medical-device-safety)
* [GAO Report: Medical Devices - The Public Health at Risk](https://www.gao.gov/assets/pemd-90-6.pdf)

**Tier 2: Historical Case Archives**
* [University of Maryland Computing Archives: AECL Therac-25 Technical Review](https://www.cs.umd.edu/class/spring2003/cmsc838p/Misc/therac.pdf)
* [IEEE Digital Library: Medical Linear Accelerator Computer Safety Evaluation](https://doi.org/10.1109/MC.1993.274940)
