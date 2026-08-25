---
title: "The UK Post Office Horizon IT Scandal: When the Computer is Always Right"
subtitle: "How Fujitsu's Horizon software generated phantom shortfalls, bankrupting and imprisoning hundreds of innocent subpostmasters in a catastrophic failure of algorithmic trust."
description: "Fujitsu's buggy Horizon EPOSS software generated massive phantom shortfalls across UK post offices. Armed with the belief that 'the computer is always right,' the Post Office wrongfully prosecuted over 900 subpostmasters."
slug: "uk-post-office-horizon-scandal"
pubDate: "2026-08-20"
updatedDate: "2026-08-25"
incidentDate: "2019-12-16"
keywords:
  - "UK Post Office Horizon IT scandal explained"
  - "Fujitsu Horizon software bugs phantom shortfalls"
  - "Post Office wrongful prosecutions subpostmasters"
  - "Bates v Post Office High Court ruling"
  - "how many people prosecuted Post Office Horizon"
  - "Horizon EPOSS Dalmellington bug"
  - "Post Office Horizon scandal compensation"
  - "computer evidence wrongful conviction UK"
faqItems:
  - q: "What was the UK Post Office Horizon IT scandal?"
    a: "The Post Office Horizon scandal was a decades-long miscarriage of justice in which the UK Post Office used evidence from its Fujitsu-developed Horizon EPOSS accounting software to wrongfully prosecute over 900 subpostmasters for theft and false accounting. The software contained hundreds of known defects that generated phantom financial shortfalls — including the Dalmellington and Callendar Square bugs documented in court — but the Post Office maintained the system was reliable and forced subpostmasters to make up the artificial deficits from their own funds."
  - q: "What bugs were found in the Fujitsu Horizon software?"
    a: "High Court Justice Peter Fraser's 2019 judgment in Bates & Ors v Post Office Ltd documented multiple severe defects. The 'Dalmellington bug' caused a single remittance to appear multiple times in the ledger, generating thousands of pounds in artificial deficit within seconds. The 'Callendar Square bug' caused transaction duplication errors that created phantom branch shortfalls. A Fujitsu internal report to the Post Office disclosed hundreds of such bugs, errors, and defects — a document the Post Office did not disclose to defendants in prosecutions."
  - q: "How many subpostmasters were wrongfully prosecuted?"
    a: "Over 900 subpostmasters were prosecuted in cases where Horizon evidence played a significant role, including convictions for theft, fraud, and false accounting, according to the Post Office Horizon IT Inquiry. Many were jailed, bankrupted, or forced into personal insolvency. At least four people connected to the scandal later died by suicide, documented in the Inquiry's evidence record."
  - q: "What did the 2019 High Court ruling in Bates v Post Office find?"
    a: "Justice Peter Fraser ruled in Bates & Ors v Post Office Ltd [2019] EWHC 3408 (QB) that Horizon was not robust, and that the system did have bugs, errors, and defects that could cause apparent shortfalls. He found that the Post Office had pursued a strategy of denying the existence of bugs when it had substantial evidence of them, and that it had treated the system's outputs as incontrovertible truth despite internal awareness of problems."
  - q: "What was the Horizon EPOSS system?"
    a: "Horizon EPOSS (Electronic Point of Sale Service) was an enterprise IT system developed by ICL (later Fujitsu) and deployed by the UK Post Office from 1999 to digitize cash accounting across approximately 11,500 branches. It managed end-of-day cash declarations, transaction reconciliation, and ledger balancing. Discrepancies between Horizon's ledger figures and physical cash on hand were treated as evidence of subpostmaster theft, rather than as potential system errors."
  - q: "Why were subpostmasters unable to prove Horizon was wrong?"
    a: "The Post Office held a prosecutorial monopoly under an ancient legal power and could bring criminal cases without involving the Crown Prosecution Service. It also held exclusive access to Horizon's internal transaction logs. Subpostmasters had no access to the underlying data and were told by the Post Office that no other branches were experiencing similar problems — a claim the Post Office knew to be false, as it had received numerous reports of the same issues from across the network."
  - q: "What compensation and convictions were overturned?"
    a: "The UK Court of Appeal overturned 39 convictions in April 2021 in R v Hamilton & Ors [2021] EWCA Crim 577. Parliament passed the Post Office (Horizon System) Offences Act 2024 to quash all remaining wrongful convictions automatically. A government compensation scheme was established; estimates of total compensation commitments exceed £1 billion. The Horizon IT Inquiry continued to examine corporate accountability for how the prosecutions were knowingly maintained despite internal evidence of software defects."
category: "corporate"
archetype: "the-incident"
provenance_tier: 1
provenance_label: "Documented Incident (Tier 1)"
provenance_source: "High Court of Justice (England & Wales) & Post Office Horizon IT Inquiry"
read_time_minutes: 15
author: "The Archivist"
date: "2026-08-20"
heroImage: "/hero_uk_post_office_horizon_1787228545763.jpg"
summary_points:
  context: "In 1999, the UK Post Office rolled out the Horizon EPOSS (Electronic Point of Sale Service) system developed by Fujitsu, digitizing thousands of branch counters to manage cash, inventory, and transactions."
  trigger: "Horizon contained hundreds of severe defects—including the 'Dalmellington' and 'Callendar Square' bugs—which generated duplicate transactions, phantom shortages, and corrupted ledger entries, creating massive artificial deficits."
  fallout: "Operating under the blind assumption that 'the computer is always right,' the Post Office wrongfully prosecuted over 900 subpostmasters for theft and false accounting, resulting in bankruptcies, wrongful imprisonments, and tragic suicides in one of the worst miscarriages of justice in British history."
tags: ["software-failure", "uk-post-office", "fujitsu", "algorithms", "justice"]
primary_sources:
  - title: "Bates & Ors v Post Office Ltd (No 6: Horizon Issues) [2019] EWHC 3408 (QB)"
    url: "https://www.judiciary.uk/judgments/bates-others-v-post-office/"
    institution: "High Court of Justice"
    type: "Court Judgment"
  - title: "Post Office Horizon IT Inquiry — Final Report and Evidence"
    url: "https://www.postofficehorizoninquiry.org.uk/"
    institution: "Post Office Horizon IT Inquiry"
    type: "Public Inquiry"
  - title: "Fujitsu report to Post Office on Bugs, Errors and Defects in Horizon Online"
    url: "https://www.postofficehorizoninquiry.org.uk/file/8991/download?token=zN0J8OG6"
    institution: "Post Office Horizon IT Inquiry"
    type: "Inquiry Evidence"
---

A software system is a mirror of the organization that builds it. When the UK Post Office commissioned ICL (later acquired by Fujitsu) to build the Horizon IT system in the late 1990s, the goal was modernization. The existing paper-based ledger system for the country’s vast network of local branch post offices was slow, manual, and difficult to audit centrally. Horizon, an Electronic Point of Sale Service (EPOSS), was designed to unify transactions, cash declarations, and inventory across thousands of remote nodes. It was deployed in 1999, representing one of the largest non-military IT infrastructure projects in Europe.

What followed was not efficiency, but a cascading, decades-long disaster of technical debt, institutional arrogance, and destroyed human lives. Horizon was fundamentally broken. It contained hundreds of severe logical and architectural defects that silently altered accounting balances, creating phantom financial shortfalls. Instead of investigating the software, the Post Office treated Horizon's outputs as authoritative evidence of branch shortfalls and repeatedly placed the burden on subpostmasters to explain discrepancies that the system itself could produce.

More than 900 people were prosecuted in cases in which Horizon evidence played a significant role, including prosecutions for theft, fraud and false accounting. Homes were lost, families were broken, people were incarcerated, and several people affected by the scandal later died by suicide amid the profound financial, psychological and social consequences documented by the Inquiry. The UK Post Office Horizon IT scandal is not simply a story about bad code; it is a profound lesson in the dangers of algorithmic authoritarianism, where human testimony is systematically invalidated by unquestioned digital outputs.


> [!NOTE]
> **What the evidence establishes:**
> - The technical failure mechanisms and financial consequences as documented in primary regulatory and court records.
> 
> **What the evidence does NOT establish:**
> - Any individual operator's personal malice or deliberate sabotage.
> - Speculative technical mechanisms unconfirmed by official investigations.


## The Forensic Discrepancy Matrix

The failure of the Horizon system was not a single catastrophic crash, but a pervasive, silent bleeding of data integrity. The following matrix illustrates the documented divergence between the intended system behavior, the actual physical reality in the branches, and the corrupted technical state generated by the software.

| System Parameter | Intended Horizon Logic | Actual Physical Reality | Executed Software Failure (The Bug) |
| :--- | :--- | :--- | :--- |
| **Transaction State Commitment** | A single press of the 'Enter' key commits one transaction to the local ledger. | The subpostmaster presses 'Enter', the screen freezes, and they press it again in frustration. | [DOCUMENTED] The **Dalmellington Bug**: Under certain circumstances, the Pouch Delivery screen remained active after processing. The operator could repeatedly press Enter, causing the same remittance to be processed multiple times. |
| **Database Synchronization** | Local branch ledgers sync with the central Fujitsu database cleanly without duplication. | Branch data is transmitted over unstable ISDN lines, experiencing occasional packet drops. | [DOCUMENTED] The **Callendar Square Bug**: Due to replication failures and lock timeouts, transactions appeared not to be recorded. When operators re-entered them and the originals became visible, duplicates were created. |
| **Error Correction (Suspense Accounts)** | Unresolved discrepancies are placed in a suspense account until manually audited and corrected. | Subpostmasters attempt to dispute discrepancies but are locked out of backend data. | [DOCUMENTED] Discrepancies were rigidly enforced as real debts. Local branch managers were contractually forced to cover these artificial shortfalls with personal funds. |
| **System Modification Access** | Only local branch operators can alter their local branch transaction records. | Subpostmasters have their branch accounts mysteriously balanced or altered overnight. | [DOCUMENTED] Fujitsu personnel had powerful remote-access capabilities, including privileges described as "unrestricted and unaudited," which could be used to access and add or alter data within branch accounts. |

[RECONSTRUCTED]: Analytical reconstruction: The documented behaviour is consistent with failures of transaction idempotency, state management and reconciliation. The evidence does not by itself establish the exact internal implementation mechanism responsible for each defect.

## Act I: The Anomaly and the Illusion of Theft

The deployment of Horizon EPOSS across the UK meant that subpostmasters—independent business owners operating branches on behalf of the Post Office—were required to use the new terminals for every transaction. At the end of each trading period, they were required to balance their cash and stock against the figures generated by Horizon. If the figures did not match, the system demanded that the subpostmaster "make good" the shortfall.

Almost immediately after deployment, anomalies began to surface. A subpostmaster would finish a completely normal day of trading, having handled perhaps a few thousand pounds in cash. They would count the physical cash in the till, which matched the physical receipts perfectly. But when they ran the Horizon balancing sequence, the screen would declare a shortfall of £2,000, £5,000, or sometimes tens of thousands of pounds.

The immediate reaction was confusion. The operators would double-check their math, search for missing paperwork, and call the Post Office helpline. The response from the helpline was universally identical: *“You are the only one experiencing this problem. The system is robust. You must make good the shortfall.”*

Because their contracts stipulated that they were financially responsible for any losses, subpostmasters began pouring their own savings into the tills to balance the system, terrified of losing their contracts. But the shortfalls kept appearing. The anomalies were aggressive, seemingly random, and mathematically impossible given the physical foot traffic of small village post offices. The cash had not been stolen; it had never existed. It was purely an artifact of corrupted database rows.

## Act II: The Architecture of the Trap

How does a software system generate tens of thousands of pounds in phantom debt? The answer lies in the deeply flawed architecture of Horizon and the specific defects that plagued its codebase. The High Court litigation later exposed a horrifying list of Known Error Logs (KELs) that Fujitsu engineers had documented internally but concealed from the subpostmasters and the courts.

Two bugs in particular highlight the architectural incompetence of the system.

**The Dalmellington Bug:** This Horizon Online defect involved a combination of forced logout and the behaviour of the Pouch Delivery process. Under certain circumstances, the pouch-delivery screen remained active after the remittance transaction had already been processed. The Enter button remained available, allowing the same remittance to be processed again. At Dalmellington, an £8,000 remittance was recorded four times, producing £32,000 in Horizon receipts against £8,000 of physical cash and a resulting £24,000 discrepancy. The defect was later identified as affecting other branches as well.

**The Callendar Square Bug:** This defect involved replication of transaction data between Horizon counters. In affected circumstances, transactions could appear not to have been recorded. Subpostmasters, believing the transactions had failed, could re-enter them. When the original transactions subsequently became visible, duplicate transactions existed in the accounts. The underlying issue was associated with replication failures and "Timeout waiting for lock" events. 

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ RECONSTRUCTION: THE DALMELLINGTON REMITTANCE FAILURE                    │
├─────────────────────────────────────────────────────────────────────────┤
│ 1. [Physical] £8,000 is transferred from the core branch                │
│    to its outreach branch.                                              │
│                                                                         │
│ 2. [Horizon] The remittance transaction is processed.                   │
│                                                                         │
│ 3. [Horizon] A combination of system-state and Pouch Delivery           │
│    behaviour leaves the transaction screen available again.             │
│                                                                         │
│ 4. [User] The operator presses Enter again, following the interface.    │
│                                                                         │
│ 5. [Horizon] The same pouch/remittance is recorded again.               │
│                                                                         │
│ 6. [Ledger] The £8,000 remittance is ultimately recorded four times.    │
│                                                                         │
│ 7. [Reality] Physical cash transferred: £8,000.                         │
│                                                                         │
│ 8. [Ledger] Horizon records: £32,000.                                   │
│                                                                         │
│ 9. [Discrepancy] Artificial shortfall: £24,000.                         │
└─────────────────────────────────────────────────────────────────────────┘
```

The system lacked basic sanity limits, deduplication constraints, and atomic transaction safeguards. More critically, Fujitsu personnel had powerful remote-access capabilities within the Horizon environment, including privileges described in contemporary documentation as "unrestricted and unaudited" in relevant areas. The Inquiry examined evidence that these capabilities could be used to access and add or alter data within branch accounts, raising serious concerns about auditability and evidential integrity. Yet, instead of treating Horizon's outputs as one evidential source requiring independent verification, the Post Office's investigative process placed extraordinary weight on the system's figures and repeatedly treated unexplained discrepancies as evidence of wrongdoing.

## Act III: The Sequence of the Fracture

The fracture of the UK Post Office was not just technical; it was a systemic organizational failure driven by the "normalization of deviance." As the bugs continued to generate massive shortfalls, the Post Office investigative division ramped up its efforts. Instead of investigating the software—which would require admitting that their multi-million-pound IT project was a failure—they chose to investigate the humans.

The sequence of destruction typically followed a rigid, bureaucratic path:
1. **The Systemic Anomaly:** Horizon generates a £30,000 shortfall.
2. **The Audit:** Post Office auditors arrive unannounced. They look only at the Horizon printouts, completely ignoring the subpostmaster's physical ledgers or pleas of system malfunction.
3. **The Interrogation:** Investigators interview the subpostmaster, repeatedly using the phrase, "The computer says the money is missing. Where did you hide it?"
4. **The Coercion:** Subpostmasters are told they are the only ones having this problem (a documented lie). They are pressured into signing false confessions to "false accounting" to avoid being charged with the more serious crime of theft.
5. **The Prosecution:** The Post Office, acting as a private prosecutor, takes the subpostmasters to criminal court. They present the Horizon data as absolute truth, relying on a deeply flawed UK legal principle that assumed computer evidence is reliable unless proven otherwise.
6. **The Destruction:** Subpostmasters are convicted, sent to prison, financially ruined, and socially ostracized in their local communities.

This cycle was repeated over 900 times. It was a mechanized destruction of human life, powered by bad code and enforced by a bureaucracy completely detached from physical reality. The point of no return for the organization was its decision to suppress the internal Fujitsu Known Error Logs during these trials, withholding or failing to disclose relevant Known Error Logs and other evidence concerning Horizon's reliability to the criminal defense of the subpostmasters.

## Act IV: The Financial and Legal Reckoning

The truth remained suppressed for nearly two decades, broken only by the relentless campaigning of the Justice for Subpostmasters Alliance (JFSA), led by Alan Bates. In 2019, the group litigation *Bates & Ors v Post Office Ltd* reached a crescendo in the High Court. Mr. Justice Fraser delivered a devastating 1,000-page judgment that dismantled the Post Office's entire narrative.

The legal reckoning required analyzing the intersection of technical failures and financial consequences. The table below outlines the massive divergence between the Post Office's legal claims and the actual technical reality revealed during the inquiry.

| Category | Post Office Official Claim (1999-2019) | Verified Technical Reality (High Court Judgment) |
| :--- | :--- | :--- |
| **System Robustness** | Horizon is "robust" and free of systemic defects that could cause unexplained shortfalls. | Horizon was plagued by hundreds of known bugs, including EPOSS freezing, duplicate syncing, and calculation errors. |
| **Audit Trails** | Branch data is completely secure and cannot be altered remotely by Fujitsu. | Fujitsu engineers had unrestricted remote access and regularly altered branch databases without operator knowledge. |
| **Legal Evidence** | Horizon transaction logs are infallible evidence of physical cash theft. | Horizon logs were deeply corrupted, rendering them entirely unsafe for use in criminal prosecutions. |
| **Financial Restitution** | Subpostmasters owe the Post Office for the missing funds. | [DOCUMENTED] Subpostmasters were required to repay alleged shortfalls, including discrepancies later shown to have been capable of being generated by Horizon defects. |

The financial cost of the scandal is staggering, with the UK government setting aside over £1 billion for compensation. But the human cost is entirely incalculable. More than 900 people were prosecuted during the Horizon scandal, with the cases involving subpostmasters and other Post Office personnel. Hundreds of convictions have been overturned, with the government subsequently identifying roughly 1,000 cases for assessment under the statutory quashing framework, but for many, the exoneration came too late. Marriages were destroyed, homes were repossessed, reputations were ruined, and several victims passed away before seeing their names cleared. The scandal stands as a permanent monument to the devastating consequences of prioritizing software protection over human rights.

## Systems Prevention Playbook

The Horizon scandal is the ultimate case study in the dangers of algorithmic trust and unaccountable software systems. When building systems that govern financial or legal realities, engineering teams must implement absolute defensive architectures.

### The Epistemic Boundary
Horizon did not observe the physical contents of a branch. It maintained a computational representation of them. 

When that representation diverged from reality, the system could not independently determine which side was wrong. The Post Office's operational mistake was therefore not merely deploying defective software. It was treating the software's representation of reality as stronger evidence than the physical reality itself. 

A ledger discrepancy is evidence of a discrepancy. It is not, by itself, evidence of theft.

### Engineering Defenses
1. **The Principle of Absolute Traceability:** Never design a system where database state can be altered without a cryptographic, immutable audit trail. The existence of Fujitsu's undocumented remote access backdoor destroyed the foundational integrity of the entire ledger. All state changes—whether by a user, a sync script, or a database administrator—must be logged, attributed, and versioned.
2. **Idempotency and Asynchronous Feedback Constraints:** The Dalmellington bug occurred because the system queued asynchronous inputs while the UI was locked, executing them blindly upon restoration. Financial transaction inputs must be strictly idempotent (submitting the exact same request multiple times must yield the same result as a single submission) and tied to explicit, verified user feedback loops.

## The Archivist's Verdict

> **The Archivist's Assessment:**  
> 
> 1. **What looked like the mistake:** The superficial trigger appeared to be thousands of independent subpostmasters suddenly deciding to steal from their own tills, generating massive cash shortfalls across the entire network.
> 2. **What actually failed:** The true root cause was a fundamentally flawed EPOSS architecture developed by Fujitsu, riddled with synchronization bugs, asynchronous queueing errors, and database corruption, combined with a legal and corporate framework that refused to acknowledge software fallibility.
> 3. **Why reasonable people allowed it to happen:** The Post Office leadership and Fujitsu engineers fell victim to the absolute normalization of deviance. The assumption that the software was infallible became institutional dogma. Admitting the system was broken would have jeopardized a multi-million-pound government contract and the reputations of high-level executives, creating a toxic incentive to suppress the truth.
> 4. **The point of no return:** The exact moment catastrophe became locked in was when the Post Office decided to act as a private prosecutor, withholding or failing to disclose relevant Known Error Logs and other evidence concerning Horizon's reliability to the criminal defense of the subpostmasters. At that moment, it ceased to be an IT failure and became an active cover-up.
> 5. **Who ultimately carried responsibility:** While Fujitsu built the broken software, the Post Office investigative and prosecution processes ultimately weaponized the authority of Horizon against the people operating its branches, treating system-generated discrepancies as evidence of wrongdoing despite mounting evidence that the system itself could produce such discrepancies.
> 6. **The uncomfortable lesson:** A software system that lacks transparency and immutable audit trails is a weapon. If a corporate entity is legally permitted to treat its own internal, proprietary database as absolute, unquestionable truth, human testimony will always be discarded. We must never build systems that demand blind obedience, because when the computer is allowed to be always right, human beings will invariably be destroyed.

---

## Primary Sources
- For the definitive judicial breakdown of the software defects, see the [High Court Judgment in Bates & Ors v Post Office Ltd](https://www.judiciary.uk/judgments/bates-and-others-v-post-office-ltd-judgment-no-6-horizon-issues/).
- For ongoing transcripts and evidence regarding corporate knowledge and technical failures, consult the [Post Office Horizon IT Inquiry](https://www.postofficehorizoninquiry.org.uk/).
- For comprehensive investigative reporting and analysis of the human toll and the technical backdoors, refer to [Computer Weekly's Archive on the Horizon Scandal](https://www.computerweekly.com/news/Post-Office-Horizon-scandal).


---

## What Was Horizon EPOSS?

`[DOCUMENTED]` Horizon EPOSS (Electronic Point of Sale Service) was an enterprise IT system developed by ICL — later acquired by Fujitsu — and rolled out by the UK Post Office from 1999 across approximately 11,500 branch locations. It replaced a paper-based ledger system with a centralized digital accounting platform that tracked cash declarations, transaction records, and stock inventory for each branch. At the end of each trading period, the system generated a branch balance statement that was treated by the Post Office as legally authoritative for calculating whether subpostmasters owed the Post Office money. Subpostmasters who challenged Horizon's figures were told, repeatedly and falsely, that theirs was the only branch experiencing discrepancies. Internal Fujitsu reports, disclosed to the Post Office and later surfaced by the Inquiry, documented hundreds of known software defects — many of which could generate phantom shortfalls — dating back years before the first prosecution.

---

## Then vs Now: Engineering Evolution After the Horizon Scandal

| Horizon-Era Practice | Modern Accountable Systems Standard |
| :--- | :--- |
| Proprietary ledger with no subpostmaster access to underlying transaction logs | Immutable, append-only audit logs with cryptographic verification accessible to all parties whose balances are affected |
| System discrepancy treated as proof of human fraud without independent investigation | Any system-generated shortfall above a threshold triggers an automatic IT investigation before any employee disciplinary action |
| Bug reports suppressed from disclosure in criminal prosecutions | Mandatory disclosure of all known software defects to any party facing criminal charges based on system-generated evidence |
| Post Office held exclusive prosecutorial power and exclusive evidence access | Separation of prosecutorial authority from the entity holding proprietary software evidence; third-party forensic access mandated |
| Software reliability assumed; individual testimony discarded without corroboration | Known-defective system outputs are inadmissible without independent forensic validation of the relevant system version |

---

## FAQ: UK Post Office Horizon Scandal Explained

### What was the UK Post Office Horizon IT scandal?

Fujitsu's Horizon software generated phantom shortfalls in post office branch accounts. The Post Office used Horizon's outputs as criminal evidence to prosecute over 900 subpostmasters for theft and false accounting, despite internal awareness of hundreds of documented system defects. It is considered one of the worst miscarriages of justice in British legal history.

### What bugs caused the phantom shortfalls?

The Dalmellington bug caused single transactions to appear multiple times in the ledger, generating artificial deficits in seconds. The Callendar Square bug caused transaction duplication errors. Justice Fraser's 2019 ruling confirmed Horizon had bugs that could and did produce such phantom shortfalls.

### How many people were wrongfully prosecuted?

Over 900, with prosecutions including theft, fraud, and false accounting. Many were jailed or bankrupted. At least four people connected to the scandal later died by suicide.

### What did the Bates v Post Office judgment find?

Justice Peter Fraser ruled in [2019] EWHC 3408 (QB) that Horizon was not robust, that it had bugs capable of causing apparent shortfalls, and that the Post Office had pursued a strategy of denying the existence of bugs despite substantial internal evidence of them.

### What convictions were overturned?

The Court of Appeal quashed 39 convictions in April 2021. Parliament passed the Post Office (Horizon System) Offences Act 2024 to automatically quash remaining wrongful convictions. Total compensation commitments exceed an estimated £1 billion.

### Why couldn't subpostmasters prove the system was wrong?

The Post Office held exclusive access to Horizon's internal logs, had a prosecutorial monopoly bypassing the Crown Prosecution Service, and falsely told defendants theirs was the only branch with problems. Without access to the underlying transaction data, subpostmasters had no means to challenge the system's outputs.

### What is the ongoing Post Office Horizon IT Inquiry?

A statutory public inquiry examining how and why the Post Office maintained its prosecutions despite growing internal evidence of Horizon's defects, and the roles of Post Office and Fujitsu executives in suppressing that evidence. The Inquiry's evidence archive and ongoing hearings are publicly accessible at postofficehorizoninquiry.org.uk.

