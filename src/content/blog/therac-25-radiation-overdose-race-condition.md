---
title: "Therac-25: How Software Race Conditions and Missing Hardware Interlocks Caused Six Lethal Radiation Overdoses"
description: "The complete engineering forensic reconstruction of the 1985–1987 Therac-25 radiotherapy disasters. How re-used PDP-11 assembly code, an 8-second keyboard edit race condition, a 1-byte counter rollover, and the removal of physical hardware interlocks delivered 100x lethal radiation doses to cancer patients."
author: "The Archivist"
pubDate: "2026-08-24"
slug: "therac-25-radiation-overdose-race-condition"
heroImage: "/hero_therac_25.jpg"
incidentDate: "1985-06-03"
systemTypes: ["Safety-Critical Software", "Medical Devices", "Race Conditions", "Embedded Systems"]
financialLoss: "6 Verified Patient Overdoses (3+ Fatalities), Complete Machine Recall & Multi-Million Dollar Settlements"
summary_points:
  context: "Between 1982 and 1985, Atomic Energy of Canada Limited (AECL) manufactured the Therac-25, a dual-mode medical linear accelerator designed to administer either low-power electron beam therapy or high-energy 25 MeV X-ray photon therapy to oncology patients."
  trigger: "AECL eliminated all electromechanical hardware interlocks present in earlier models (Therac-6 and Therac-20), placing absolute reliance on unverified PDP-11 assembly software written by a single programmer. Two critical race conditions lurked in the code: an 8-second keyboard parameter editing window and a 1-byte counter overflow."
  fallout: "Six patients in the United States and Canada received massive, unattenuated radiation overdoses estimated between 15,000 and 25,000 rads (150 to 250 Gy)—over 100 times the prescribed dose—resulting in severe radiation burns, permanent maiming, and at least three direct agonizing fatalities. The FDA mandated a full recall and complete machine redesign."
primary_sources:
  - title: "IEEE Computer: An Investigation of the Therac-25 Accidents (Leveson & Turner)"
    url: "https://cseweb.ucsd.edu/classes/wi14/cse291-c/reports/leveson93investigation.pdf"
  - title: "FDA Center for Devices and Radiological Health (CDRH) Medical Device Safety Records (Docket 86M-0222)"
    url: "https://www.fda.gov/medical-devices/medical-device-safety"
  - title: "Atomic Energy of Canada Limited (AECL) Corrective Action Plan & Technical Analysis"
    url: "https://www.cs.umd.edu/class/spring2003/cmsc838p/Misc/therac.pdf"
---

> **The Archivist’s Note:** AI can summarize what happened. ErrorLedger reconstructs *why* it happened, who made which decisions, what happened next, and what the evidence actually shows.

<BoundaryBox>
**What the evidence does NOT establish:**
* That the software bugs were caused by an intentional act of sabotage or malicious developer negligence; official FDA and IEEE forensic investigations establish that the defects stemmed from poor software engineering practices, absent independent verification, and uncoordinated code reuse.
* That the machine suffered a catastrophic mechanical breakdown of the particle accelerator itself; the physical linear accelerator fired exactly as commanded by its controlling PDP-11 minicomputer.
* That hospital radiation therapy technicians acted with reckless disregard for human life; operators were trained to dismiss cryptic non-fatal status messages (`Malfunction 54` and `Malfunction 13`) because the manufacturer's operational manual provided zero documentation explaining their safety implications.
</BoundaryBox>

---

## Executive Forensic Summary

Between June 1985 and January 1987, the Therac-25 medical linear accelerator administered massive, lethal radiation overdoses to at least six cancer patients across four medical facilities in the United States and Canada. Built by Atomic Energy of Canada Limited (AECL), the Therac-25 was marketed as a revolutionary commercial medical device that integrated computer control to streamline clinical oncology workflows.

Instead, it became the defining catastrophe of safety-critical software engineering.

In previous generations of radiotherapy machines—the Therac-6 and Therac-20—mechanical switches, electrical relays, and physical tungsten interlocks physically prevented the linear accelerator from firing a high-power beam unless safety shields and beam-flattening filters were locked into place. In the Therac-25, AECL engineers removed these physical hardware interlocks entirely, asserting that computer software was inherently reliable enough to manage life-critical safety functions alone.

That software, written in raw PDP-11 assembly code by a single developer with zero independent code review, contained subtle concurrent race conditions and counter arithmetic bugs. When experienced operators entered machine parameters quickly, the control routine bypassed safety checks while the high-current electron gun activated. Patients received raw, unattenuated electron beams of 25 million electron volts (MeV) without the essential X-ray conversion target or beam-scattering magnets, absorbing radiation doses estimated between 15,000 and 25,000 rads (150–250 Gy)—enough to cause immediate deep-tissue radiation necrosis, agonizing organ liquefaction, and death.

---

## The Forensic Discrepancy Matrix

| System Layer | Expected Safety Invariant | Actual System Behavior | Operational & Clinical Consequence | Epistemic Status |
| :--- | :--- | :--- | :--- | :--- |
| **Collimator Turntable Assembly** | Hardware limit switches physically lock beam activation until turntable position matches beam energy mode | Software reads 3-bit optical potentiometer; all physical interlocks removed | Turntable remained in unshielded position while high-energy beam fired | [DOCUMENTED] |
| **Keyboard Parameter Entry (`EDIT` Routine)** | Prescribed mode changes reset the entire parameter validation pipeline | 8-second window during keyboard cursor editing allowed command state to decouple from hardware setup | Gun fired 25 MeV beam in raw electron mode without X-ray target | [DOCUMENTED] |
| **`Set-Up Test` Counter (`Class3`)** | Shared counter accurately tracks bending magnet position verification | Shared 1-byte counter incremented on every pass; rolled over from 255 to 0 (`modulo 256`) | When counter reached 0, software bypassed all magnet position checks | [DOCUMENTED] |
| **Operator Console (`VT100`)** | Display clear, actionable error messages identifying radiation hazards | Displayed cryptic `Malfunction 54` and `Malfunction 13` codes indicating "dose input error" | Operators pressed `P` (Proceed) key to override alarms, repeating overdoses | [DOCUMENTED] |
| **Manufacturer Anomaly Resolution** | Comprehensive engineering pause and code audit upon first casualty report | AECL dismissed initial reports, claiming machine "overdose was physically impossible" | Defective machines remained active for 20 months across North America | [DOCUMENTED] |

---

## The Failure Chain

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                          THERAC-25 ROOT-CAUSE FAILURE CHAIN                            │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. Architectural Stripping: Removal of physical electromechanical safety interlocks    │
│                                           │                                            │
│ 2. Unverified Code Reuse: Porting PDP-11 assembly from Therac-20 with silent bugs      │
│                                           │                                            │
│ 3. Race Condition Vulnerability: 8-second keyboard edit window decouples mode states   │
│                                           │                                            │
│ 4. Counter Overflow Bug: 1-byte Class3 variable rolls over to 0, skipping magnet check │
│                                           │                                            │
│ 5. UX Alarm Sanitization: Cryptic 'Malfunction 54' displayed with simple 'P' override  │
│                                           │                                            │
│ 6. Catastrophic Firing: 25 MeV raw electron beam strikes patient at ~25,000 rads       │
│                                           │                                            │
│ 7. Agonizing Fatalities: Severe radiation necrosis, systemic organ failure, and death  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Act I: The Architectural Betrayal — Replacing Relays with Assembly

To understand the Therac-25 disaster, one must examine the physics of medical linear accelerators. Radiation therapy requires two distinct operational modalities:

1. **Direct Electron Beam Therapy (Low Current):** Used for superficial skin tumors. The machine fires a direct electron beam at low currents (a few nanoamperes) and variable energy levels (6 to 25 MeV), using scanning magnets to disperse the dose safely across the treatment area.
2. **X-Ray Photon Therapy (High Current):** Used for deep internal tumors. The linear accelerator fires a high-energy electron beam with a current nearly **100 to 1,000 times higher** into a heavy tungsten-tantalum target. When electrons strike the metal target, they produce penetrating Bremsstrahlung X-ray photons. A conical beam-flattening filter then evens out the radiation profile before it reaches the patient.

In the predecessor Therac-6 and Therac-20 systems, safety was guaranteed by **electromechanical interlocks**. Heavy-duty electrical switches, physical pins, and relay circuits made it physically impossible for the electron gun to emit high-current beam pulses unless the tungsten target was physically seated in front of the beam port. If the software crashed, stalled, or produced errant outputs, the physical circuit remained broken.

```text
[Therac-20 Architecture]
Software Control ---> [Electromechanical Hardware Interlock] ---> Safe Beam Firing
                               ▲
                      (Physical Target Sensor)

[Therac-25 Architecture]
Software Control ───────────────────────────────────────────────▶ UNPROTECTED BEAM FIRING
                      (Hardware Interlocks Removed)
```

In the design of the Therac-25, AECL executives and engineering management made a fateful decision. Seeking to lower manufacturing costs, reduce weight, and market an advanced "fully computerized" machine, they stripped out the independent physical interlock circuits. Safety was delegated entirely to software executing on a 16-bit DEC PDP-11 minicomputer running a proprietary real-time operating system.

The software was not built from scratch with formal verification. Instead, AECL reused assembly routines originally written for the Therac-6 and Therac-20 by a single programmer in the early 1970s. Because the older machines possessed physical interlocks that silently prevented race conditions from firing the beam, the lethal bugs lurking within the assembly code had remained completely dormant for a decade.

---

## Act II: The 8-Second Editing Trap and the 1-Byte Rollover

Forensic audits conducted by Professor Nancy Leveson of the University of Washington and Clark S. Turner revealed not one, but two catastrophic software race conditions within the Therac-25 control system.

### 1. The Tyler Incident: The 8-Second Keyboard Edit Race Condition (Malfunction 54)

On March 21, 1986, at the East Texas Cancer Center in Tyler, Texas, radiation technician Ray Cox prepared to treat a patient named Ray Ingram for a tumor on his upper back. 

Cox was an experienced operator who could enter treatment prescriptions on the DEC VT100 terminal at high speed. The treatment sequence required selecting the mode:
1. Cox typed `X` for 25 MeV Photon mode by mistake.
2. Realizing the prescription called for Electron mode, Cox immediately pressed `Up-Arrow` to move the cursor back to the mode selection field, typed `E` for Electron mode, and pressed `Enter` multiple times to confirm the default parameter fields.
3. The keystroke sequence took less than **8 seconds**.

```text
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                    THE 8-SECOND KEYBOARD EDIT RACE CONDITION                         │
├──────────────────────────────────────────────────────────────────────────────────────┤
│ 1. Operator enters 'X' (Photon Mode)                                                 │
│    └─► Routine 'HBI' begins positioning collimator turntable (Takes ~8 seconds)      │
│                                                                                      │
│ 2. Operator hits Up-Arrow, types 'E' (Electron Mode), and hits <ENTER> within 8s     │
│    └─► Software flags parameter setup as COMPLETE.                                   │
│    └─► Magnet setup parameters reset, but Turntable repositioning is ABORTED.        │
│                                                                                      │
│ 3. Machine State Discrepancy:                                                        │
│    ├─ Beam Current: Set to HIGH INTENSITY (Photon Level, ~100x power)                │
│    └─ Turntable Position: FIELD LIGHT position (Zero Target, Zero Flattening Filter) │
│                                                                                      │
│ 4. RESULT: 25,000 rads raw electron beam hits patient in 0.04 seconds.               │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

Within the PDP-11 control architecture, a subroutine called `HBI` (Handle Beam Initialization) checked the keyboard entry buffer. When `X` was entered, `HBI` initiated the physical mechanical movement of the 3-position collimator turntable to place the tungsten target into the beam path. This mechanical movement took approximately 8 seconds.

During this 8-second window, if the operator moved the cursor and changed the mode to `E`, the software updated the high-level mode variable to Electron, but set an internal flag that bypassed the turntable repositioning sequence while leaving the linear accelerator's beam current circuitry configured for maximum 25 MeV X-ray emission.

When Cox pressed the console `B` (Beam On) button, the linear accelerator fired a massive **25 MeV raw electron beam at full photon-generation current** directly into Ray Ingram's back, without the tungsten target to convert it or the scattering foil to disperse it. 

Ingram felt a burning sensation like hot liquid metal and heard a loud buzzing pop. On the console, Cox saw the machine halt with the error `Malfunction 54` and a status reading `Dose Under: Treatment paused`. Believing no radiation had been delivered, Cox pressed `P` (Proceed) to fire again. Ingram received a second unattenuated dose, absorbing over 30,000 rads. He died five months later of catastrophic spinal cord and organ damage.

### 2. The Yakima Incident: The 1-Byte Counter Overflow (Malfunction 13)

In January 1987, at the Yakima Valley Memorial Hospital in Washington state, another patient received a lethal overdose due to a completely separate software defect in the `Set-Up Test` routine.

The software used a shared 1-byte variable named `Class3` to track whether the machine's bending magnets were properly aligned. Every time the setup loop executed, the program incremented `Class3` by 1:

```text
Assembly Logic:
  INC Class3       ; Increment shared 8-bit counter
  BNE MagnetCheck  ; If Class3 != 0, continue testing magnet position
  JSR FireBeam     ; If Class3 == 0, BYPASS TEST AND ENABLE BEAM!
```

Because `Class3` was an 8-bit unsigned integer, incrementing it past 255 caused it to wrap around to **0** (`modulo 256`). If the operator happened to press the `Set` button at the precise millisecond that `Class3` rolled over to zero, the software interpreted the value `0` as "all safety checks have passed successfully," completely skipping the physical confirmation of the bending magnets. 

The machine fired while the magnets were in transition, striking the patient with an uncontrolled, concentrated electron spike. The patient died three months later from severe radiation burns to the chest and esophagus.

---

## Act III: The Silent Alarms — Malfunction 54 and the Operator Interface Trap

The human factors and user interface design of the Therac-25 compounded the engineering failure into a clinical tragedy.

The operator console displayed over 40 distinct error messages, almost all of them named generically as `Malfunction` followed by a number from 1 to 64. The operational user manual supplied to hospitals contained no appendix explaining what these numbers meant.

```text
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                  DEC VT100 OPERATOR CONSOLE INTERACTION LOG                          │
├──────────────────────────────────────────────────────────────────────────────────────┤
│ OP> COMMAND: X-RAY 25 MEV                                                            │
│ OP> EDIT: UP-ARROW -> ELECTRON MODE -> ENTER                                         │
│ CONSOLE> READY FOR BEAM DELIVERY                                                     │
│ OP> B [ENTER]                                                                        │
│ TELEMETRY> BEAM PULSE FIRED: 0.04 SECONDS                                            │
│ ALARM> MALFUNCTION 54                                                                │
│ STATUS> DOSE DELIVERED: 0.00 RADS                                                    │
│ STATUS> TREATMENT PAUSED - PRESS 'P' TO PROCEED OR 'C' TO CANCEL                     │
│                                                                                      │
│ OP> P [ENTER]                                                                        │
│ TELEMETRY> SECOND BEAM PULSE FIRED: 0.04 SECONDS                                     │
│ ALARM> MALFUNCTION 54                                                                │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

When `Malfunction 54` or `Malfunction 13` occurred, the console did not sound an emergency alarm, lock the machine, or indicate that an anomalous beam current had been emitted. Instead, the console displayed `TREATMENT PAUSE` and reported that only a fraction of a dose unit had been delivered.

Crucially, the software allowed operators to clear the error and re-fire the beam simply by pressing the `P` key. Because nuisance malfunctions occurred dozens of times per day during normal clinical calibration, operators developed **alert fatigue**. Pressing `P` to proceed was standard operating muscle memory across every clinical oncology department.

---

## Act IV: Institutional Denial, the FDA Intervention, and Criminal Negligence Reckoning

The institutional response by Atomic Energy of Canada Limited (AECL) serves as a classic study in engineering hubris and corporate stonewalling:

1. **Denial of Physical Possibility (June 1985 – January 1986):** When the Kennestone Regional Oncology Center in Georgia and the East Texas Cancer Center reported massive patient burns, AECL engineers conducted brief tests, reported that they could not replicate the errors, and officially informed hospitals that an overdose was "physically impossible due to software safeguards."
2. **Blaming Hospital Staff (March 1986):** AECL suggested that hospital wiring issues, static electricity, or technician error were the root causes.
3. **The FDA Class I Recall (February 1987):** Only after physicist Fritz Hager at the East Texas Cancer Center painstakingly reverse-engineered the keyboard keystroke timing did AECL acknowledge the race condition. On February 10, 1987, the U.S. Food and Drug Administration (FDA) declared the Therac-25 a Class I health hazard—a defect with a reasonable probability of causing death or serious injury—and banned the machine from clinical use until mandatory hardware interlocks were installed.

| Metric / Dimension | Documented Historical Value | Epistemic Status |
| :--- | :--- | :--- |
| **Total Verified Victims** | 6 patients severely overdosed (Tyler TX, Marietta GA, Yakima WA, Hamilton ON) | [DOCUMENTED] |
| **Direct Agonizing Fatalities** | 3 direct deaths from acute radiation sickness and organ destruction | [DOCUMENTED] |
| **Typical Prescribed Dose** | 150 to 200 rads (1.5 to 2.0 Gy) per fractionated session | [DOCUMENTED] |
| **Estimated Overdose Delivered** | 15,000 to 25,000 rads (150 to 250 Gy) per pulse | [DOCUMENTED] |
| **Overdose Multiplication Factor** | ~100× to 125× nominal radiation intensity | [DOCUMENTED] |
| **Regulatory Action** | FDA Class I Mandatory Device Recall (Docket 86M-0222) | [DOCUMENTED] |
| **Hardware Correction Mandate** | Re-installation of physical electromechanical microswitches & independent hardware dump circuits | [DOCUMENTED] |

---

## Systems Prevention Playbook: Modern Engineering Defenses

The lessons of the Therac-25 formed the bedrock of modern safety-critical software engineering, medical device regulations (such as IEC 62304), and distributed systems reliability.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        3 DEFENSE CLASSES FOR SAFETY-CRITICAL SYSTEMS                   │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. FRICTION DEFENSES                                                                   │
│    [Historical Lesson]: Rapid UI edits invalidated deep concurrent machine states.     │
│    [Modern Engineering]: Atomically bound transactional forms & non-reentrant state    │
│    machines that reject state transitions while underlying I/O is asynchronous.        │
│                                                                                        │
│ 2. BOUNDARY CONSTRAINTS                                                                │
│    [Historical Lesson]: Software assumed 8-bit integer counters would never overflow.  │
│    [Modern Engineering]: Compile-time static bounds checking, typed safe-integers,     │
│    and invariant assertions that fail closed (panic/safe-halt) on arithmetic rollover. │
│                                                                                        │
│ 3. EMERGENCY BRAKES                                                                    │
│    [Historical Lesson]: Eliminating physical interlocks placed blind trust in code.    │
│    [Modern Engineering]: Defense-in-depth physical interlocks, hardware watchdog       │
│    timers, and analog crowbar circuits completely isolated from software control.      │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 1. Friction Defenses: UI State Atomicity
* **[HISTORICAL LESSON]:** In Therac-25, the user interface allowed operators to edit input fields while underlying I/O subroutines were asynchronously actuating mechanical hardware. The UI presented an illusion of state consistency that did not exist in hardware.
* **[MODERN ENGINEERING TRANSLATION]:** Implement strict state-machine transactional isolation. In safety-critical UI design, parameter edits must invalidate all downstream actuation pipelines, requiring a complete atomic re-verification before the system can transition to an armed state.

### 2. Boundary Constraints: Arithmetic Invariants & Safe Types
* **[HISTORICAL LESSON]:** The `Class3` counter overflowed after 255 iterations, transforming a critical safety-check flag into a lethal bypass.
* **[MODERN ENGINEERING TRANSLATION]:** Use memory-safe languages with checked arithmetic (or language-level overflow panics like Rust's default debug behavior). Never use shared mutable scalar counters to represent binary safety invariants; safety state must be explicit boolean tokens validated through formal state-machine guards.

### 3. Emergency Brakes: The Hardware Invariant Rule
* **[HISTORICAL LESSON]:** Software must never be the single point of failure in a system capable of causing physical harm. AECL removed physical relays and paid with human lives.
* **[MODERN ENGINEERING TRANSLATION]:** In any cyber-physical or safety-critical system (medical devices, autonomous vehicles, industrial robotics), critical safety boundaries must be enforced by **independent analog hardware interlocks** (watchdog timers, electromechanical limit switches, and non-bypassable physical circuit breakers) that drop power to dangerous actuators regardless of software state.

---

## The Archivist's Verdict

> **The Archivist's Assessment:** The Therac-25 disasters are frequently cited as an example of software bugs, but this diagnosis fundamentally misidentifies the true failure. The code did not fail because of a simple typo; it failed because of **architectural hubris**.
>
> AECL engineers committed the cardinal sin of systems engineering: they confused the *absence of observed software failures* in previous machines with *evidence of software safety*. In doing so, they stripped away the physical electromechanical interlocks that had quietly shielded patients from their flawed code for a decade. When you remove physical safeguards to save manufacturing costs and rely entirely on unverified software, you are not innovating—you are externalizing your engineering risks onto the bodies of innocent human beings.

---

## Primary Sources

* [IEEE Computer: An Investigation of the Therac-25 Accidents (Nancy G. Leveson & Clark S. Turner)](https://cseweb.ucsd.edu/classes/wi14/cse291-c/reports/leveson93investigation.pdf)
* [U.S. FDA Center for Devices and Radiological Health (CDRH) Medical Device Safety Records](https://www.fda.gov/medical-devices/medical-device-safety)
* [University of Maryland Computing Archives: AECL Therac-25 Technical Review](https://www.cs.umd.edu/class/spring2003/cmsc838p/Misc/therac.pdf)
* [IEEE Digital Library: Medical Linear Accelerator Computer Safety Evaluation](https://doi.org/10.1109/MC.1993.274940)
