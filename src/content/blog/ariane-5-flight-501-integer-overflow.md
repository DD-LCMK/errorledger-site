---
title: "The 16-Bit Integer That Destroyed a $370 Million Rocket"
description: "How an unprotected legacy variable conversion caused the Ariane 5 rocket to self-destruct 39 seconds after launch, exposing the lethal danger of unquestioned software reuse."
author: "The Archivist"
pubDate: "2026-08-22"
updatedDate: "2026-08-25"
slug: "ariane-5-flight-501-integer-overflow"
heroImage: "/hero_ariane_5_flight_501.jpg"
incidentDate: "1996-06-04"
keywords:
  - "Ariane 5 Flight 501 explosion cause"
  - "integer overflow destroyed Ariane 5 rocket"
  - "16-bit integer overflow aerospace disaster"
  - "ESA Ariane 5 software failure 1996"
  - "$370 million rocket software bug"
  - "Lions Report Ariane 501 inquiry"
  - "software reuse caused Ariane 5 crash"
  - "BH horizontal velocity overflow Ariane"
faqItems:
  - q: "What caused the Ariane 5 rocket to explode in 1996?"
    a: "The Ariane 5 Flight 501 self-destructed because a 64-bit floating-point variable representing horizontal velocity (BH) was converted into a 16-bit signed integer. The maximum value of a 16-bit signed integer is 32,767, but Ariane 5's faster trajectory generated a BH value far exceeding this limit. The overflow triggered a hardware-level operand error exception, crashing both the primary and backup Inertial Reference Systems simultaneously."
  - q: "Why did Ariane 5 software inherit the Ariane 4 code?"
    a: "The Inertial Reference System (SRI) software from Ariane 4 was reused in Ariane 5 as a cost and time saving measure. The software had functioned flawlessly for years on Ariane 4. However, Ariane 4's slower horizontal velocity profile never approached the 16-bit integer limit. Ariane 5 was significantly faster and heavier, and its horizontal velocity exceeded the Ariane 4 design assumptions encoded in the software."
  - q: "What happened to the backup inertial reference system on Ariane 5?"
    a: "The backup Inertial Reference System (SRI 1) suffered the identical overflow error simultaneously with the primary (SRI 2), because both ran the same software and were exposed to the same flight dynamics at the same moment. The Lions Inquiry Board Report confirmed both SRIs crashed within fractions of a second of each other, leaving the main computer with no valid attitude reference."
  - q: "Why did the Ariane 5 main computer misread the diagnostic data as flight commands?"
    a: "When the SRI crashed, it transmitted its diagnostic error data — a bit pattern representing the failure code — across the data bus to the On-Board Computer (OBC). The OBC had no mechanism to distinguish between valid flight data and SRI error messages, so it treated the error bit pattern as an extreme attitude reading and commanded the boosters to deflect violently to 'correct' the nonexistent deviation, tearing the rocket apart."
  - q: "How much did the Ariane 5 Flight 501 failure cost?"
    a: "The destruction of Flight 501 eliminated a $370 million rocket and its payload of four uninsured Cluster scientific satellites representing years of irreplaceable ESA scientific investment. The failure also delayed the Ariane 5 commercial launch program, costing the European Space Agency competitive market share during the critical window of the commercial satellite launch market."
  - q: "What was the Lions Inquiry Board Report conclusion?"
    a: "The ESA-commissioned inquiry board, chaired by Professor Jacques-Louis Lions, concluded that the failure was caused by a software exception during the conversion of a 64-bit floating-point number to a 16-bit signed integer for the BH (horizontal bias) variable. The report found that the exception handler for this specific variable had been disabled to conserve processing capacity, and that the SRI software had not been re-validated for the Ariane 5 operational envelope despite being reused from Ariane 4."
  - q: "What engineering changes followed the Ariane 5 disaster?"
    a: "Following the Lions Report, ESA mandated: (1) full independent re-qualification of all software reused from predecessor missions, including explicit validation against the new vehicle's physical flight envelope; (2) exception handlers for all type conversion operations in flight-critical software; (3) hardware and software fault containment preventing a single SRI failure from commanding actuators directly; and (4) passive safe-state behavior on SRI failure rather than transmitting diagnostic data to the OBC."
systemTypes: ["Embedded Systems", "Aerospace Control", "Legacy Software"]
financialLoss: "$370 Million"
summary_points:
  context: "The inaugural launch of the European Space Agency's Ariane 5, representing a decade of development and over $7 billion in investment."
  trigger: "A 64-bit floating-point number representing horizontal velocity was converted into a 16-bit signed integer, triggering a hardware-level overflow exception."
  fallout: "Both the primary and backup Inertial Reference Systems crashed instantly. The main computer interpreted the diagnostic error codes as violent steering commands, swiveling the boosters and tearing the rocket apart 39 seconds after liftoff."
primary_sources:
  - title: "Official Inquiry Board Report (Prof. Jacques-Louis Lions)"
    url: "https://www.esa.int/Enabling_Support/Space_Transportation/Ariane_501_Inquiry_Board_report"
  - title: "ESA Telemetry and Flight Logs (Flight 501)"
    url: "https://www.esa.int/"
  - title: "NASA Technical Reports: Ariane 501 Software & Trajectory Assessment (NTRS 19970020110)"
    url: "https://ntrs.nasa.gov/citations/19970020110"
---

> **The Archivist’s Note:** AI can summarize what happened. ErrorLedger reconstructs *why* it happened, who made which decisions, what happened next, and what the evidence actually shows. 

> **What the evidence does NOT establish:**
> - That the developers were incompetent or lazy; the software had worked flawlessly on the predecessor Ariane 4.
> - That the failure was caused by a random hardware glitch; it was a deterministic software design flaw triggered by unpredicted physical flight dynamics.
> - That the self-destruct sequence was a malfunction; it operated exactly as designed once the rocket deviated fatally from its trajectory.

---

The European Space Agency (ESA) spent a decade and over $7 billion engineering the Ariane 5. It was designed to be heavier, faster, and more capable than its reliable predecessor, the Ariane 4. 

On June 4, 1996, the inaugural flight (Flight 501) lifted off from Kourou, French Guiana. Thirty-nine seconds later, the $370 million rocket, carrying four uninsured scientific satellites, violently disintegrated in the sky. These satellites comprised the Cluster mission, a highly anticipated scientific endeavor aimed at studying the interaction between the solar wind and Earth's magnetic field, representing years of irreplaceable scientific labor.

The root cause was not a structural defect, a faulty fuel valve, or a misfired thruster. The destruction of Flight 501 was caused by a single line of code attempting to fit a large number into a small box.

---

## The Forensic Discrepancy Matrix

| Parameter | Digital Representation | Physical Reality | Evidence Status | Mechanism |
| :--- | :--- | :--- | :--- | :--- |
| **Horizontal Velocity (BH)** | 64-bit floating-point variable | Rapidly increasing horizontal speed of Ariane 5 | [DOCUMENTED] | Measured physical acceleration of the rocket. |
| **Conversion Constraint** | 16-bit signed integer (Max value: 32,767) | Expected bounds based on Ariane 4 profile | [DOCUMENTED] | Software conversion operation inside the Inertial Reference System (SRI). |
| **Exception Handling** | None implemented for this specific variable | The physical value exceeded the 16-bit limit | [RECONSTRUCTED] | Hardware-level operand error triggered a system trap. |
| **Diagnostic Data** | Bit pattern representing failure status | Rocket trajectory still completely nominal | [RECONSTRUCTED] | The On-Board Computer (OBC) blindly interpreted error codes as extreme flight data. |

---

## Act I: The Unnecessary Alignment

To understand the collapse, we must look at the Inertial Reference System (SRI). The SRI calculates the rocket's position, velocity, and attitude. The Ariane 5 had two identical SRIs: one active, one backup.

Inside the SRI software was a function responsible for "alignment"—ensuring the rocket knew exactly where it was before launch. For the older Ariane 4, it was decided that this alignment function should keep running for 40 seconds *after* liftoff. Why? So that if there was a brief hold on the launchpad just after the engines ignited, the rocket could be rapidly reset without taking 45 minutes to recalibrate. 

This 40-second post-launch window was a highly specific, idiosyncratic requirement for the Ariane 4. The Ariane 5 had a completely different launch sequence. A rapid reset on the pad was mechanically impossible for the Ariane 5. Furthermore, the Ariane 5 aerodynamic profile and center of gravity necessitated a flight path that pitched downward and accelerated horizontally at a significantly faster rate in the lower atmosphere compared to its predecessor. 

Yet, when the software was copied over to the new rocket, this 40-second alignment function was left intact. 

```text
[Legacy Ariane 4 Requirement] ──▶ [DOCUMENTED] ──▶ [Alignment function runs for 40s post-launch]
                                                         │
[Ariane 5 Launch Profile]     ──▶ [DOCUMENTED] ──▶ [Function executes despite being physically useless]
```

---

## Act II: The 16-Bit Trap

The Ariane 5 was significantly faster than the Ariane 4. Its initial flight trajectory involved much higher horizontal acceleration. 

As Flight 501 ascended, the alignment function (which was still pointlessly running in the background) continued to track the "horizontal bias" (BH), representing the rocket's horizontal velocity.

The BH was measured as a 64-bit floating-point number. For processing, the software converted it into a 16-bit signed integer. 

A 16-bit signed integer can only hold a maximum value of 32,767. 

The software powering the SRI was written in Ada, a highly robust programming language originally developed for the U.S. Department of Defense. Ada is famous for its strict typing and built-in exception handling capabilities, specifically designed to prevent this exact type of silent mathematical failure. In a properly configured Ada program, an out-of-bounds conversion triggers an explicit error that can be caught and managed by the software.

However, the engineers had deliberately disabled the Ada exception handler for the BH variable conversion. This was not an oversight, but a calculated performance optimization. The SRI computers, running on relatively slow Motorola 68020 microprocessors, were subject to strict computational workload limits (the processor's workload was targeted not to exceed 80%). The engineers analyzed the code, looked at the maximum possible horizontal velocity of the Ariane 4, determined that the BH value could never theoretically exceed 32,767, and explicitly stripped out the safety mechanism to save processing cycles.

In the Ariane 4, the physical horizontal velocity never reached a value high enough to exceed 32,767 within the first 40 seconds of flight. The Ariane 5, however, easily exceeded it. 

Worse, while the programmers had implemented protection (exception handling) for other variables in the software, they had deliberately left the BH variable unprotected. The official Inquiry Board report noted that this was a conscious decision based on analysis indicating that the value could never overflow—an analysis explicitly based on the Ariane 4's flight profile, not the Ariane 5's.

---

## Act III: The 39-Second Collapse

The telemetry logs reveal a brutally deterministic chain of events, entirely driven by software architecture constraints.

*   **H0 + 36 seconds:** The launcher exhibits completely nominal behavior. Trajectory, thrust, and aerodynamics are perfect.
*   **H0 + 36.7 seconds:** The physical horizontal velocity of the rocket causes the BH variable to exceed 32,767. 
*   **H0 + 37 seconds:** The software attempts the conversion. It triggers a hardware-level "operand error" (an integer overflow). Because there is no exception handling, the active SRI processor intentionally shuts itself down, transmitting diagnostic failure codes to the main On-Board Computer (OBC).
*   **The Backup Fails:** The backup SRI, running the exact same software on the exact same flight path, had encountered the identical integer overflow and shut itself down 72 milliseconds earlier. Because it was an identical redundant system running identical code, it shared the exact same vulnerability and provided zero actual protection.
*   **H0 + 38 seconds:** The main OBC receives the diagnostic error codes from the dead SRIs. The OBC is not programmed to recognize these bits as an error message. It blindly parses the diagnostic bits as valid flight data, interpreting them as a massive, abrupt deviation in the rocket's attitude.
*   **H0 + 39 seconds:** Believing the rocket has veered wildly off course, the OBC commands the Vulcain engine and solid boosters to swivel to their extreme limits to compensate. This instantaneous, violent maneuver creates massive aerodynamic forces, tearing the boosters from the core stage. 
*   **The End:** The physical separation of the boosters triggers the automated self-destruct mechanism. Flight 501 is obliterated.

---

## Systems Prevention Playbook

The Ariane 5 disaster is a masterclass in the dangers of unverified legacy code and missing architectural interlocks. Modern engineering teams must implement the following defenses:

### 1. Friction Defenses
* **Explicit Contract Validation:** When porting legacy code to a new system, all environmental assumptions (e.g., maximum physical velocity) must be explicitly documented as assertions and re-validated against the new system's specifications. 

### 2. Boundary Constraints
* **Global Exception Handling:** Never selectively remove exception handling based on "assumed" physical limits unless mathematically proven against the current hardware environment. Unhandled exceptions in critical embedded systems must have a defined safe-state degradation path.
* **Type-Safe Boundaries:** Compilers and static analysis tools must be configured to flag unprotected narrowing conversions (e.g., 64-bit float to 16-bit integer). 

### 3. Emergency Brakes
* **Data Validity Masks:** A primary control computer must possess the capability to definitively distinguish between diagnostic failure codes and valid operational telemetry. Blindly trusting incoming data payloads without a validity bit check is a catastrophic architectural flaw.
* **Hardware-In-The-Loop (HITL) Complete Simulation:** The fatal vulnerability remained undetected because the SRI was never tested as a complete closed-loop system against the simulated flight dynamics of the Ariane 5. Because the SRI software was considered "flight-proven" on the Ariane 4, it bypassed rigorous re-testing under the new extreme physical parameters. Legacy software must never be exempted from holistic closed-loop simulation on new hardware.

---

## The Archivist's Verdict

> **The Archivist's Assessment:**
> 
> The loss of Ariane 5 Flight 501 was not a failure of rocketry; it was a failure of systems engineering and epistemological assumption. The engineering team assumed that because a piece of software functioned flawlessly on one machine, it would function flawlessly on a stronger, faster machine. 
> 
> They failed to recognize that software does not exist in a vacuum. It is deeply coupled to the physical reality of the hardware it operates within. By importing the Ariane 4 code without questioning the physical boundaries that governed its variables, they imported a lethal fragility.
> 
> The tragedy was compounded by the architecture of the backup system. A redundant system running identical code provides zero protection against deterministic software flaws. When the active system encountered the physical boundary of the integer overflow, the backup system hit the exact same wall, in the exact same millisecond. 
> 
> In the end, a $370 million marvel of aerospace engineering was destroyed because the system meticulously executed a set of instructions that were perfectly logical, mathematically precise, and fundamentally disconnected from the physical reality of the sky.
> 
> This disaster fundamentally reshaped aerospace engineering practices. It demonstrated that software engineering for physical systems requires an uncompromising epistemic rigor. The developers did not fail because they wrote bad code; they failed because they allowed their assumptions about physical reality to fossilize inside a mathematical construct. When the physical reality changed, the mathematical construct shattered. Software reuse, once considered a guaranteed mechanism for reliability and cost savings, was proven to be a vector for inheriting dormant vulnerabilities if the environmental context is not relentlessly interrogated.


---

## Primary Sources

* [Ariane 501 Inquiry Board Report (Prof. J. L. Lions)](https://www.esa.int/Enabling_Support/Space_Transportation/Ariane_501_Inquiry_Board_report)
* [European Space Agency Post-Flight Telemetry Press Releases](https://www.esa.int/)


---

## What Was the Ariane 5 Inertial Reference System?

`[DOCUMENTED]` The Inertial Reference System (SRI — Système de Référence Inertielle) is a self-contained navigation computer that uses accelerometers and gyroscopes to calculate the rocket's position, velocity, and attitude in three-dimensional space. The Ariane 5 carried two redundant SRIs — one active (SRI 2) and one standby (SRI 1) — to provide fault tolerance. The SRI software used in Flight 501 was inherited directly from the Ariane 4 program, where it had operated without fault across numerous flights. The Lions Inquiry Board Report confirmed that the BH (horizontal bias) variable conversion was never protected with an exception handler because analysis of the Ariane 4 trajectory had established it could never overflow during that vehicle's flight profile. No equivalent analysis was performed for Ariane 5's faster trajectory before the software was deployed.

---

## Then vs Now: Engineering Evolution After Ariane 5 Flight 501

| 1996 Failure Pattern | Modern Aerospace Software Standard |
| :--- | :--- |
| Legacy SRI software reused from Ariane 4 without re-validation against Ariane 5 flight envelope | Mandatory DO-178C re-qualification required for any software reused across different vehicle classes; physical flight envelope bounds must be re-verified |
| BH overflow exception handler disabled to conserve CPU capacity | MISRA-C and DO-178C require all type conversion operations to include explicit overflow guards; exception suppression must be formally justified and re-reviewed |
| SRI failure transmitted diagnostic error data to OBC as if it were flight data | Safe-state failsafe mandate: on SRI failure, output must be driven to a defined neutral/safe value, never raw diagnostic data |
| Both primary and backup SRIs ran identical software with identical failure mode | Diverse redundancy standard: backup systems must use independently developed software to prevent common-cause failures from eliminating all redundancy simultaneously |
| No independent trajectory monitoring to catch implausible actuator commands | Independent flight safety monitors validate actuator commands against physical flight envelope bounds before transmission |

---

## FAQ: Ariane 5 Flight 501 Integer Overflow Explained

### What caused the Ariane 5 to explode in 1996?

A 64-bit floating-point horizontal velocity value exceeded the 32,767 maximum of the 16-bit signed integer it was being converted into. The resulting operand overflow exception crashed both SRIs simultaneously. The main computer misread the crash diagnostic data as extreme attitude commands and deflected the boosters violently, tearing the rocket apart 39 seconds after launch.

### Why was Ariane 4 code used on Ariane 5?

Software reuse was considered a reliability and cost advantage. The SRI had worked flawlessly on Ariane 4. No one re-validated the BH variable bounds against Ariane 5's faster trajectory because the Ariane 4 analysis showed it could never overflow — an assumption that proved false for the new vehicle.

### Why did the backup SRI also fail?

Both SRIs ran the same software and experienced the same flight dynamics simultaneously. The Lions Report confirmed they crashed within fractions of a second of each other, providing zero fault tolerance.

### How much did the failure cost?

$370 million in vehicle and payload losses, plus significant program delays. The four Cluster scientific satellites were uninsured and irreplaceable.

### What did the Lions Inquiry conclude?

That the BH variable overflow exception handler had been disabled to conserve CPU capacity, that the SRI software had never been re-validated for Ariane 5's flight envelope, and that the failure was entirely deterministic and preventable.

### What changed in aerospace software engineering afterward?

DO-178C re-qualification became mandatory for reused software across vehicle classes. Exception handlers for all type conversions in flight-critical code became required. Safe-state failsafe behavior (rather than raw diagnostic data transmission) on SRI failure became standard. Diverse redundancy — backup systems using independently developed software — replaced identical-software redundancy.

