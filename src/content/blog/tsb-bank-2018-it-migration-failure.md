---
title: "The £330 Million Aftermath: How TSB's Core Banking Migration Failed"
description: "When TSB completed a multi-stage migration to Sabadell's Proteo4UK platform in April 2018, the customer data transferred successfully — to the penny. What followed was a failure of assurance: inconsistent data-centre configuration that extensive testing never exposed, thousands of unresolved defects at go-live, and a platform that collapsed when exposed to the scale and conditions of live customer traffic."
author: "The Archivist"
pubDate: "2026-08-25"
slug: "tsb-bank-2018-it-migration-failure"
heroImage: "/hero_tsb_bank.jpg"
incidentDate: "2018-04-22"
incidentPeriod: "2018-04-22"
incidentEndDate: "2018-12-15"
systemTypes: ["Core Banking Systems", "Enterprise Platform Migration", "Enterprise IT Architecture"]
financialImpact: "£330.2 million in post-migration costs and foregone income (£125.2m customer redress and rectification costs, £49.1m fraud/operational losses, £122.4m remediation costs, £33.5m foregone income)"
keywords: ["Sabadell Proteo system", "Paul Pester TSB CEO", "Core banking platform migration", "IBM IT audit TSB failure", "Slaughter and May TSB report", "FCA fine TSB IT failure", "TSB data centre configuration", "TSB 2018 outage cause"]
summary_points:
  context: "TSB Bank, separated from Lloyds Banking Group, needed to migrate its customer accounts and operations from legacy Lloyds IT systems to the new Sabadell Proteo4UK core banking platform — a programme spanning more than four years of planning."
  systemic_failure: "Despite extensive testing, multiple dress rehearsals, and governance processes that produced board-level confidence, the assurance regime failed to expose critical production failure modes. The two data centres supporting the new platform were configured inconsistently in certain areas despite having been designed to be identical — and this discrepancy was not identified before migration."
  technical_mechanisms: "The platform experienced severe service instability after go-live. The two supporting data centres had been inconsistently configured. Thousands of defects remained open at the time of migration. Once the platform destabilised, a surge in customer enquiries exhausted existing contingency resources."
  fallout: "The failure locked millions of customers out of their accounts for weeks, costing TSB £330.2 million in post-migration costs and foregone income, and a combined £48.65 million in regulatory fines from the FCA and PRA. CEO Paul Pester subsequently resigned following sustained scrutiny of the crisis."
primary_sources:
  - title: "FCA Final Notice 2022 - TSB Bank plc"
    url: "https://www.fca.org.uk/publication/final-notices/tsb-bank-plc-2022.pdf"
  - title: "Slaughter and May Independent Review of the TSB IT Migration"
    url: "https://www.tsb.co.uk/content/dam/tsb-public/documents/media-centre/Slaughter-and-May-final-report.pdf"
  - title: "TSB Bank — Response to FCA and PRA Findings (December 2022)"
    url: "https://www.tsb.co.uk/news-releases/tsb-responds-to-the-fca-and-pra-findings-in-relation-to-the-2018-migration-programme.html"
  - title: "Treasury Committee Oral Evidence: TSB IT Failure"
    url: "https://committees.parliament.uk/committee/158/treasury-committee/"
faqItems:
  - q: "What caused the TSB IT failure in 2018?"
    a: "The 2018 TSB failure resulted from multiple technical and governance weaknesses surrounding the migration to Proteo4UK. Independent reviews identified shortcomings in planning, testing, supplier oversight, and technical configuration — including inconsistent configuration between the two supporting data centres that was not detected before migration. These problems caused severe service instability, amplified by a surge in customer demand that exhausted existing contingency resources."
  - q: "How much was TSB fined for the IT failure?"
    a: "TSB received a combined £48.65 million penalty. The Financial Conduct Authority (FCA) levied £29.75 million and the Prudential Regulation Authority (PRA) levied £18.9 million for operational resilience failings, confirmed in December 2022."
  - q: "Who resigned after the TSB IT crash?"
    a: "TSB's Chief Executive Officer, Paul Pester, resigned in September 2018 following sustained public and parliamentary criticism over the handling of the IT crisis and the bank's initial communication about its severity."
  - q: "Why did the TSB IT migration fail?"
    a: "The failure was not caused by an inability to transfer customer data — the migration itself successfully transferred all customer records to the penny. The problem was severe platform instability after go-live. Reviews identified weaknesses in testing, supplier oversight, and technical configuration, including data-centre configuration inconsistencies that escaped extensive pre-migration testing. The resulting disruption was amplified when large numbers of customers shifted to telephone and branch channels, overwhelming contingency capacity."
---

The April 2018 core banking migration at TSB Bank stands as one of the most instructive enterprise software failures in modern British financial history — not because TSB failed to test, but because its testing and assurance regime generated confidence that the production system could not justify.

TSB entered the final main migration event on April 20, 2018 after more than four years of planning, extensive testing, nine successful dress rehearsals, and a pilot involving over 1,600 employees. The customer data migration itself was completed successfully — every account was transferred to the penny. ([TSB](https://www.tsb.co.uk/news-releases/slaughter-and-may.html)) What collapsed was not the data migration, but the new platform's operational stability when exposed to the scale and conditions of live customer traffic.

For weeks, millions of customers were locked out of digital banking, businesses failed to make payroll, and some customers reportedly saw the account details of entirely different holders.

The [Slaughter and May independent review](https://www.tsb.co.uk/content/dam/tsb-public/documents/media-centre/Slaughter-and-May-final-report.pdf) documented what the assurance process failed to reveal: the two data centres supporting the new platform had been configured inconsistently in certain areas despite having been specified to be identical, and thousands of defects remained open at the moment of go-live. The incident ultimately generated £330.2 million in post-migration costs and foregone income and resulted in £48.65 million of regulatory penalties. CEO Paul Pester subsequently resigned in September 2018 amid sustained scrutiny of the crisis.

The cost was larger than the outage. The £330.2 million figure captures the post-migration service disruption, not the entire cost of the migration programme. TSB reported £417.3 million of operating expenses associated with delivering the migration programme itself. The distinction matters: the £330.2 million represents the financial aftermath of the failure, while the £417.3 million represents the cost of executing the programme.

## What Was TSB Bank?

TSB Bank plc is a retail and commercial bank in the United Kingdom. It originally operated under the umbrella of Lloyds TSB but was spun off as a standalone entity in 2013 to comply with European Commission state aid rules following the 2008 financial crisis. In 2015, TSB was acquired by the Spanish banking group Banco Sabadell.

Following the acquisition, Sabadell initiated a large-scale integration project to migrate TSB's entire operational backend off the rented Lloyds Banking Group infrastructure and onto a new, customised version of Sabadell's in-house banking software platform, known as Proteo4UK. This migration was a strategic requirement for Sabadell to achieve long-term cost synergies and operational independence from its predecessor.

## The Forensic Discrepancy Matrix

| Parameter | Legacy Lloyds IT Operation | Sabadell Proteo4UK Implementation | Evidence Status | Mechanism |
| :--- | :--- | :--- | :--- | :--- |
| **Data Centre Architecture** | Proven, legacy mainframes with stable topologies. | Dual data centres designed to be configured identically for high availability. | [DOCUMENTED] | The two data centres were configured inconsistently in certain areas despite the identical-configuration specification — a discrepancy not identified before migration. ([Slaughter & May](https://www.tsb.co.uk/content/dam/tsb-public/documents/media-centre/Slaughter-and-May-final-report.pdf)) |
| **Performance Testing Scope** | Historical traffic baselines used for standard capacity planning. | Extensive testing including nine dress rehearsals and a 1,600-person pilot programme. | [DOCUMENTED] | Despite extensive testing, the testing and assurance regime failed to expose critical production failure modes, including the data-centre configuration inconsistency. |
| **Cutover Strategy** | Incremental data staging with parallel operations. | A multi-stage migration programme culminating in a high-risk main migration event over the weekend of April 20–22. | [DOCUMENTED] | The migration programme was carried out in stages — ATMs, payments, and mortgages moved before the main event. The final customer-data migration was completed successfully. The platform's operational instability was distinct from the data migration itself. |
| **Defect Status at Go-Live** | Established legacy systems with mature defect resolution. | 4,424 defects open on April 18; 395 new defects still open on April 22. | [DOCUMENTED] | TSB proceeded to the main migration event while thousands of known defects remained active in the programme. |
| **Incident Response** | Established legacy command structures with mature diagnostic tooling. | Fragmented communication between TSB's UK leadership, Sabadell's Spanish engineering teams, and external IT contractors. | [RECONSTRUCTED] | Diagnosis of the production failure modes was compounded by the difficulty of pinpointing issues in a new, distributed platform with limited production-scale observability. |

## Act I: The Assurance Programme That Could Not See Production

By early 2018, TSB was under significant commercial pressure. Renting the IT infrastructure from Lloyds was costing the bank hundreds of millions annually. The mandate from Banco Sabadell was unambiguous: move all customer accounts, transaction histories, direct debits, and mortgage ledgers onto Proteo4UK.

The programme that followed was, by documented measures, substantial. TSB and its IT delivery contractor SABIS (Sabadell Information Systems) ran an integration effort spanning more than four years. The programme included extensive testing, nine successful transition events and dress rehearsals, a pilot involving more than 1,600 employees, and significant third-party scrutiny. ([TSB](https://www.tsb.co.uk/news-releases/slaughter-and-may.html)) These are not the hallmarks of a programme that ignored testing.

The new Proteo4UK infrastructure was designed to operate across dual data centres, providing high availability through simultaneous processing and continuous state synchronisation. Moving a core banking ledger is fundamentally different from updating a consumer application. Financial ledgers require strict transactional integrity, and the new platform's behaviour under real customer load — across those data centres — was a condition the testing regime failed to fully model.

> **What the evidence establishes:**
> TSB's testing and assurance programme was extensive. Despite this, the programme failed to expose critical production failure modes — specifically, inconsistent configuration between the two data centres supporting the new platform. ([Slaughter & May](https://www.tsb.co.uk/content/dam/tsb-public/documents/media-centre/Slaughter-and-May-final-report.pdf)) Thousands of defects remained open at the point of go-live.
>
> **What the evidence does NOT establish:**
> There is no documented evidence that TSB or SABIS deliberately skipped testing. The failure was one of assurance — the testing programme generated confidence that production conditions did not validate. There is also no documented evidence of malicious interference by any individual.

## Act II: A Successful Migration, and a Platform That Could Not Stand

On the evening of Friday, April 20, 2018, TSB took its digital banking channels offline to begin the final main migration event. The bank carried out the migration of its customer data over the weekend of April 20–22.

By Sunday evening, internal systems confirmed what TSB later publicly acknowledged: the data migration had succeeded. Every customer account had been transferred to the penny. ([TSB](https://www.tsb.co.uk/news-releases/slaughter-and-may.html)) The bank opened its digital channels.

> **Critical Distinction — Data Migration vs. Platform Operation:**
> TSB's data migration was completed successfully. The catastrophe that followed was not a failure of the data migration. It was a failure of the new platform's operational stability under production conditions — a more sophisticated and instructive failure mode than a simple botched data transfer.

The catastrophe was immediate. When customer traffic began reaching the new platform on Sunday, severe service instability emerged. The [Slaughter and May independent review](https://www.tsb.co.uk/content/dam/tsb-public/documents/media-centre/Slaughter-and-May-final-report.pdf) identified that the two data centres, despite having been designed to be configured identically, had inconsistencies in their configuration that had not been detected before migration. This discrepancy became consequential under real production load.

Customers attempting to check their balances were met with perpetual loading screens, generic error codes, and forced timeouts. In a significant subset of cases, some customers reported seeing the account information of other customers — a particularly serious consequence of the platform's instability.

## Defect Accumulation Around Go-Live

The [Slaughter and May report](https://www.tsb.co.uk/content/dam/tsb-public/documents/media-centre/Slaughter-and-May-final-report.pdf) documents the defect universe around the migration event in extraordinary detail. TSB did not enter production with a clean defect register. Slaughter and May identified 4,424 defects still open on April 18, although TSB disputed the report's treatment of the wider JIRA population and argued that only 98 outstanding defects were directly relevant to the main migration event.

| Period | New Defects Raised | Notes |
| :--- | :--- | :--- |
| Open by April 18 | — | **4,424 defects open** four days before go-live |
| April 2–22 | 3,374 | New defects raised in the lead-up to migration |
| Migration weekend (Apr 20–22) | 446 | Raised during the migration event itself |
| Open on April 22 (go-live) | — | **395 new defects still unresolved at go-live** |
| April 23–May 3 | 4,596 | Defects accumulating in the immediate aftermath |
| May 4–June 18 | 7,632 | Continued defect accumulation over six weeks |

The critical distinction is not that TSB skipped testing. It is that the testing programme and assurance process produced confidence that the production system did not validate — and that thousands of open defects accompanied the platform into its first live customer encounter.

## Act III: The Cascading Operational Collapse

The technical platform instability immediately triggered a human operational collapse. Unable to access their funds digitally, hundreds of thousands of customers turned to telephone contact centres and physical branches.

The contact centres, however, were dependent on the same underlying Proteo4UK platform. Internal teller portals suffered from the identical instability that had crippled the mobile application. Call queues stretched to multiple hours. Branch staff were forced to turn away customers because their terminal screens would not load balance information.

As TSB confirmed in its own disclosures, the surge in customer contacts far exceeded existing contingency capacity. ([TSB](https://www.tsb.co.uk/news-releases/slaughter-and-may.html)) The distributed technical problems were compounded by the difficulty of diagnosing and resolving platform failures in a new environment with limited production-scale observability. While the bank deployed rolling capacity expansions, instability persisted for weeks.

The crisis dominated national headlines and drew immediate scrutiny from the Treasury Committee. The [FCA and PRA subsequently imposed a combined £48.65 million penalty](https://www.fca.org.uk/publication/final-notices/tsb-bank-plc-2022.pdf) for operational resilience failings, confirmed in December 2022.

## Systems Prevention Playbook

The TSB migration failure reframes the standard argument about enterprise platform cutovers. The lesson is not simply "test more." The lesson is that testing regimes must be designed to reveal production failure modes — not merely to generate confidence.

| Defense Class | Implementation Strategy | Evidentiary Requirement |
| :--- | :--- | :--- |
| **1. Configuration Parity Verification** | For any multi-site platform, mandate an independent automated configuration audit across all nodes before go-live. Configuration drift between data centres must be a hard blocking condition, not a soft advisory. | Automated configuration comparison report with sign-off from independent infrastructure team. |
| **2. Production-Fidelity Volume Testing** | Testing must include end-to-end integration under production-representative load. Dress rehearsals and pilots that do not replicate the full concurrent production load cannot guarantee platform stability. | Load test results at ≥120% of peak expected concurrent traffic, against the full integrated platform, with both data centres in their production configuration. |
| **3. Phased Customer Traffic Routing** | Reject simultaneous full-population cutover to an untested production configuration. Implement canary routing — direct a small percentage of live customer traffic to the new platform before full cutover, with hard circuit breakers if error rates exceed a threshold. | Traffic shaping configuration verified at the DNS/edge routing layer. |
| **4. Defect Closure Gate** | Establish a hard defect-count threshold as a go/no-go condition. If open P1/P2 defects at migration weekend exceed a defined limit, the cutover is automatically deferred. | Programme-level defect register reviewed by independent QA authority immediately before go-live authorisation. |

As seen in similar high-coupling enterprise platform failures — such as the [Knight Capital Trading Glitch](/blog/knight-capital-trading-glitch-45-minutes) — the most dangerous failure mode is one that passes all pre-production checks and only manifests at full production scale.

## Engineering Evolution

| Historical Era | Architecture Approach | Failure Domain | Modern Defensive Pattern |
| :--- | :--- | :--- | :--- |
| **Then (2018)** | Multi-stage migration programme culminating in a high-risk final cutover event. | Testing regime generated assurance without adequately modelling production conditions; configuration inconsistencies between data centres escaped detection. | [DOCUMENTED] Configuration parity automation, production-fidelity integrated load testing. |
| **Now (Modern)** | Continuous, phased traffic migration with shadow testing and automated configuration verification. | Bottlenecks and configuration drift are exposed incrementally before full population cutover. | [ANALYTICAL] Canary deployment, feature-flag-controlled traffic routing, automated configuration compliance checks at each stage. |

## FAQ

### What caused the TSB IT failure in 2018?
The 2018 TSB failure resulted from multiple technical and governance weaknesses surrounding the migration to Proteo4UK. The [Slaughter and May independent review](https://www.tsb.co.uk/content/dam/tsb-public/documents/media-centre/Slaughter-and-May-final-report.pdf) identified shortcomings in planning, testing, supplier oversight, and technical configuration — including inconsistent configuration between the two supporting data centres that was not detected before migration, despite extensive testing. These problems caused severe service instability after go-live, which was then amplified by a customer demand surge that exhausted existing contingency resources.

### How much was TSB fined for the IT failure?
TSB received a combined £48.65 million penalty. The Financial Conduct Authority (FCA) levied £29.75 million and the Prudential Regulation Authority (PRA) levied £18.9 million for operational resilience failings. The [FCA Final Notice](https://www.fca.org.uk/publication/final-notices/tsb-bank-plc-2022.pdf) was published in December 2022, more than four years after the incident.

### How long did the TSB IT disruption last?
Severe outages began on April 22, 2018. While basic access was restored incrementally over the following weeks, widespread instability, missing payments, and severe customer service delays persisted for an extended period, with full platform stabilisation taking months.

### What was the Proteo4UK migration programme?
Proteo4UK was a customised version of Banco Sabadell's in-house core banking platform, adapted for the UK market. The migration programme was an approximately £800 million, multi-year integration project to move TSB's customer accounts and operations off legacy Lloyds Banking Group infrastructure and onto the new platform. TSB's own account describes it as a programme spanning more than four years.

### Who resigned after the TSB IT crash?
CEO Paul Pester resigned in September 2018 following sustained public, media, and parliamentary scrutiny — fuelled in part by TSB's initial communication about the severity of the disruption, which was widely considered inadequate.

### Why did the TSB IT migration fail?
The failure was not caused by an inability to transfer customer data. TSB confirmed that the customer data migration was completed successfully — every account was transferred to the penny. ([TSB](https://www.tsb.co.uk/news-releases/slaughter-and-may.html)) The problem was severe platform instability after go-live. Reviews identified weaknesses in testing, supplier oversight, and technical configuration, including inconsistencies between the two supporting data centres that escaped detection during an extensive testing programme. The resulting disruption was then amplified when large numbers of customers shifted to telephone and branch channels, overwhelming capacity that had not been scaled for the volume.

## The Archivist's Verdict

> **The Archivist's Assessment:**
> TSB's 2018 failure is not a story about a company that failed to test. It is a story about what happens when an assurance process becomes structurally incapable of revealing the failure modes that matter.
>
> The documented record is striking precisely because it contradicts the simplest retelling. Four years of planning. Extensive testing. Nine dress rehearsals. Board-level confidence. A successful data migration that transferred every account to the penny. And then — platform collapse.
>
> The [Slaughter and May independent review](https://www.tsb.co.uk/content/dam/tsb-public/documents/media-centre/Slaughter-and-May-final-report.pdf) establishes what the testing regime failed to find: the two data centres were inconsistently configured despite having been specified to be identical. That discrepancy escaped every dress rehearsal and every assurance review. It only became consequential when real customers — in real numbers, conducting real transactions — put the platform under conditions that the testing environment had not reproduced.
>
> Sitting alongside that configuration finding is the defect accumulation record: 4,424 open defects four days before go-live, 395 new defects still unresolved on April 22, and thousands more generated in the weeks immediately after. TSB did not enter production with a clean system. It entered production with a system that had accumulated enough complexity and known fragility that the combined weight of those weaknesses, under production load, caused collapse.
>
> The regulatory fines and Paul Pester's resignation reflect a failure that exceeds any single software bug. The more important lesson for systems engineering is architectural: testing without production fidelity is not assurance. A testing programme that generates confidence without validating configuration parity, realistic concurrent load, and full-stack operational behaviour does not eliminate risk — it conceals it.

## Primary Sources

- [FCA Final Notice 2022 - TSB Bank plc](https://www.fca.org.uk/publication/final-notices/tsb-bank-plc-2022.pdf)
- [Slaughter and May Independent Review of the TSB IT Migration](https://www.tsb.co.uk/content/dam/tsb-public/documents/media-centre/Slaughter-and-May-final-report.pdf)
- [TSB — Response to FCA and PRA Findings (December 2022)](https://www.tsb.co.uk/news-releases/tsb-responds-to-the-fca-and-pra-findings-in-relation-to-the-2018-migration-programme.html)
- [Treasury Committee Oral Evidence: TSB IT Failure](https://committees.parliament.uk/committee/158/treasury-committee/)
