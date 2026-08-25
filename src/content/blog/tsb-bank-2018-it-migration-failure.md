---
title: "The £330 Million Migration: How TSB's Core Banking Cutover Failed"
description: "When TSB attempted to migrate 5.2 million accounts to Sabadell’s Proteo platform, inadequate API performance testing and an active-active data center misconfiguration locked customers out for weeks, demonstrating the extreme risks of monolithic IT integration."
author: "The Archivist"
pubDate: "2026-08-25"
slug: "tsb-bank-2018-it-migration-failure"
heroImage: "/hero_tsb_bank.jpg"
incidentDate: "2018-04-22"
incidentPeriod: "2018-04-22"
incidentEndDate: "2018-12-15"
systemTypes: ["Core Banking Systems", "Microservices Migration", "Enterprise IT Architecture"]
financialLoss: "£330 Million"
keywords: ["Sabadell Proteo system", "Paul Pester TSB CEO", "Core banking platform migration", "IBM IT audit TSB failure", "Slaughter and May TSB report", "FCA fine TSB IT failure", "active-active data center configuration"]
summary_points:
  context: "TSB Bank, separated from Lloyds Banking Group, needed to migrate its 5.2 million customer accounts and operations from legacy Lloyds IT systems to the new Sabadell Proteo4UK core banking platform."
  systemic_failure: "The migration plan severely underestimated the complexity of integrating the new Proteo4UK microservices architecture. Crucially, the program failed to execute comprehensive volume and stress testing across the active-active data center configuration, leading to massive immediate bottlenecks under production load."
  technical_mechanisms: "Unoptimized API queries generated unprecedented database traffic. The active-active data center configuration suffered from asynchronous replication lag and severe thread contention, causing the customer-facing digital banking portals to freeze, time out, or expose incorrect account details."
  fallout: "The failure locked millions of customers out of their accounts for weeks, costing TSB £330 million in remediation and customer compensation, £48.65 million in regulatory fines from the FCA and PRA, and leading to the resignation of CEO Paul Pester."
primary_sources:
  - title: "FCA Final Notice 2022 - TSB Bank plc"
    url: "https://www.fca.org.uk/publication/final-notices/tsb-bank-plc-2022.pdf"
  - title: "Slaughter and May Independent Review of the TSB IT Migration"
    url: "https://www.tsb.co.uk/news-releases/slaughter-and-may-report/"
  - title: "Treasury Committee Oral Evidence: TSB IT Failure"
    url: "https://committees.parliament.uk/committee/158/treasury-committee/"
faqItems:
  - q: "What caused the TSB IT failure in 2018?"
    a: "The 2018 TSB IT failure was caused by a rushed migration to the Sabadell Proteo banking platform. Inadequate performance testing of the active-active data centers led to systemic bottlenecks, locking out millions of customers."
  - q: "How much was TSB fined for the IT failure?"
    a: "TSB was fined £48.65 million collectively by the Financial Conduct Authority (FCA) and the Prudential Regulation Authority (PRA) for operational resilience failings."
  - q: "Who resigned after the TSB IT crash?"
    a: "TSB's Chief Executive Officer, Paul Pester, resigned in September 2018 following sustained public and parliamentary criticism over the handling of the IT crisis."
  - q: "What was the Proteo system migration?"
    a: "The Proteo system migration was a massive £800 million IT project to transfer TSB's 5.2 million customer accounts from legacy Lloyds Banking Group servers to a customized version of Banco Sabadell's core banking platform, Proteo4UK."
---

The April 2018 core banking migration at TSB Bank stands as one of the most structurally devastating enterprise software failures in modern British financial history. When TSB attempted to transition 5.2 million customer records from legacy Lloyds IT systems to Banco Sabadell's newly customized Proteo4UK platform, the operation immediately collapsed under the weight of production traffic.

The failure was not merely an inconvenience. For weeks, millions of customers were locked out of digital banking, businesses failed to make payroll, and some customers reportedly saw the financial details of entirely different account holders. 

The immediate investigation focused on the software migration timeline and testing procedures. Regulatory filings and independent investigations revealed a profound failure in architectural verification. The system, designed to operate across dual active-active data centers, was never fully stress-tested against realistic production workloads prior to deployment. The result was a £330 million operational catastrophe, a £48.65 million regulatory penalty, and a masterclass in the dangers of monolithic core banking cutovers.

## What Was TSB Bank?

TSB Bank plc is a retail and commercial bank in the United Kingdom. It originally operated under the umbrella of Lloyds TSB but was spun off as a standalone entity in 2013 to comply with European Commission state aid rules following the 2008 financial crisis. In 2015, TSB was acquired by the Spanish banking group Banco Sabadell. 

Following the acquisition, Sabadell initiated a massive, £800 million integration project to migrate TSB's entire operational backend off the rented Lloyds Banking Group infrastructure and onto a new, customized version of Sabadell's in-house banking software platform, known as Proteo4UK. This migration was a strict requirement for Sabadell to achieve long-term cost synergies and operational independence.

## The Forensic Discrepancy Matrix

| Parameter | Legacy Lloyds IT Operation | Sabadell Proteo4UK Implementation | Evidence Status | Mechanism |
| :--- | :--- | :--- | :--- | :--- |
| **Data Center Architecture** | Proven, legacy mainframes with stable single-source-of-truth topologies. | Dual active-active data centers spread across the UK. | [DOCUMENTED] | Unprecedented synchronization latency and thread contention when executing read/write operations simultaneously across both physical centers. |
| **Performance Testing Scope** | Historical traffic baselines used for standard capacity planning. | Synthetic load testing on isolated microservices, but missing end-to-end global volume validation. | [DOCUMENTED] | Critical API gateways were only tested in isolated silos rather than under concurrent, multi-service production strain. |
| **Cutover Strategy** | Incremental data staging and parallel operations. | A rigid "Big Bang" weekend cutover spanning April 20-22, migrating 5.2 million accounts simultaneously. | [DOCUMENTED] | A total lack of rollback capability once the primary ledger cutover was initiated and verified on Sunday evening. |
| **Incident Response** | Established legacy command structures with mature diagnostic telemetry. | Fragmented communication between TSB's UK leadership, Sabadell's Spanish engineering teams, and external IT contractors. | [RECONSTRUCTED] | Diagnosis was delayed because engineers could not immediately identify which layer of the new microservices architecture was causing the bottleneck. |

## Act I: The Monolithic Ambition

By early 2018, TSB was facing significant commercial pressure. Renting the IT infrastructure from its former parent company, Lloyds, was costing the bank hundreds of millions of pounds annually. The mandate from Banco Sabadell was clear: move all 5.2 million customers, their transaction histories, direct debits, and mortgage ledgers onto the new Proteo4UK platform.

The architectural ambition of Proteo4UK was immense. It was intended to replace decades of monolithic legacy code with a modern, service-oriented architecture capable of real-time processing and rapid feature deployment. The new infrastructure relied heavily on an active-active data center configuration, meaning that two physically separate data centers would process transactions simultaneously and continuously synchronize their state to ensure zero-downtime high availability.

However, moving a core banking ledger is fundamentally different from updating a consumer web application. Financial ledgers require strict transactional integrity. As documented in the [FCA Final Notice](https://www.fca.org.uk/publication/final-notices/tsb-bank-plc-2022.pdf), the project team recognized the complexity but ultimately committed to a "Big Bang" migration—a single weekend where all legacy systems would be turned off, the data transferred, and the new systems booted up.

> **What the evidence establishes:**
> TSB leadership and the IT delivery contractor (Sabadell Information Systems - SABIS) failed to execute comprehensive, end-to-end performance and volume testing on the fully integrated Proteo4UK platform prior to the April cutover.
> 
> **What the evidence does NOT establish:**
> There is no documented evidence that any single developer maliciously sabotaged the code, nor is there evidence that TSB executives deliberately intended to deceive customers about the platform's readiness.

## Act II: The Active-Active Bottleneck

On the evening of Friday, April 20, 2018, TSB took its digital banking channels offline to begin the data migration. Throughout the weekend, billions of rows of database records were ported. By Sunday evening, internal testing scripts reported that the data had moved successfully. The bank declared the migration a success and opened the digital doors to customers.

The catastrophe was immediate.

At 4:00 PM on Sunday, as customers began logging into the new mobile app and web portals, the active-active data center architecture encountered its first true production load. The system immediately degraded. 

The underlying failure mechanism was architectural, not a simple syntax error. The independent review conducted by [Slaughter and May](https://www.tsb.co.uk/news-releases/slaughter-and-may-report/) identified severe deficiencies in how the microservices communicated. When a customer logged in, the digital frontend generated an enormous number of inefficient API queries to the backend ledger. 

Because the architecture was active-active, these queries were routed across both data centers. The massive volume of inefficient queries saturated the thread pools in the middleware application servers. Furthermore, the synchronization requirements between the two data centers introduced severe latency. The database connections became exhausted. The digital gateways simply froze.

Customers attempting to check their balances were met with perpetual loading screens, generic error codes, and forced timeouts. In a highly alarming subset of cases, the extreme thread contention and caching failures resulted in session bleed, where customers logged in and temporarily saw the account details and balances of other users.

## Act III: The Cascading Operational Collapse

The technical failure immediately triggered a human operational collapse. Unable to access their funds digitally, hundreds of thousands of TSB customers turned to the telephone contact centers and physical branches.

The contact centers, however, were relying on the exact same underlying Proteo4UK infrastructure to service calls. The internal teller portals suffered from the identical API timeouts and thread exhaustion that had crippled the mobile application. Call queues swelled to multiple hours. Branch staff were forced to turn away furious customers because their terminal screens would not load balance information.

The incident response was severely hampered by the distributed nature of the architecture. Engineers at SABIS and external auditors from IBM struggled to pinpoint the bottleneck because the microservices architecture lacked mature, end-to-end tracing telemetry in the production environment. While the databases appeared healthy at the hardware level, the middleware API gateways were entirely gridlocked.

TSB deployed rolling reboots and capacity expansions, but without refactoring the inefficient queries, the system remained unstable for weeks. The crisis dominated national headlines and drew the immediate scrutiny of the Treasury Committee. The bank's reputation suffered catastrophic damage.

## Systems Prevention Playbook

The TSB migration failure is a defining case study in integration risk. The following architectural defenses represent the minimum standard for core financial cutovers.

| Defense Class | Implementation Strategy | Evidentiary Requirement |
| :--- | :--- | :--- |
| **1. End-to-End Volume Testing** | Never rely solely on isolated microservice synthetic benchmarks. Mandate global, integrated volume testing at 200% of expected peak load using full production-scale data topologies. | Independent audit sign-off on integrated load test results prior to cutover authorization. |
| **2. Incremental Cutover Routing** | Reject "Big Bang" network flips. Implement canary deployments and gradual traffic routing (e.g., 5% of users to the new platform) to validate database thread performance in real-time. | Traffic shaping configuration enabled at the DNS or edge routing layer. |
| **3. Circuit Breaker Middleware** | Implement strict circuit breaker patterns at the API gateway layer to prevent backend database thread exhaustion when downstream services become latent. | Application server configurations demonstrating hard timeouts and fallback caching. |

As seen in similar architectural breakdowns, such as the [Knight Capital Trading Glitch](/blog/knight-capital-trading-glitch-45-minutes) and the [Target Canada Supply Chain Collapse](/blog/target-canada-supply-chain-collapse), deploying untested monolithic changes without a fast rollback mechanism virtually guarantees an unrecoverable incident.

## Engineering Evolution

| Historical Era | Architecture Approach | Failure Domain | Modern Defensive Pattern |
| :--- | :--- | :--- | :--- |
| **Then (2018)** | "Big Bang" monolithic cutovers over a single weekend. | Lack of rollback capability; entire user base impacted simultaneously. | [DOCUMENTED] Canary releases, feature flags, and incremental data synchronization. |
| **Now (Modern)** | Phased microservices migration with shadow traffic testing. | Bottlenecks are isolated; rollback is trivial if latency spikes. | [ANALYTICAL] Traffic shaping at the API gateway layer to control load. |

## FAQ

### What caused the TSB IT failure in 2018?
The failure was caused by the premature deployment of the Sabadell Proteo4UK banking platform. The system suffered from inefficient API queries and severe thread contention in its active-active data center configuration, causing digital channels to freeze under production load.

### How much was TSB fined for the IT failure?
TSB was fined a total of £48.65 million. The Financial Conduct Authority (FCA) levied a fine of £29.75 million, and the Prudential Regulation Authority (PRA) levied £18.9 million for severe operational resilience failings.

### How long did the TSB IT glitch last?
The severe outages began on April 22, 2018. While basic access was restored incrementally, widespread instability, missing payments, and severe customer service delays persisted for several weeks, with full stabilization taking months.

### What was the Proteo system migration?
It was an £800 million project to move 5.2 million TSB customer accounts from legacy Lloyds Banking Group mainframes to a customized modern core banking platform developed by Banco Sabadell, named Proteo4UK.

### Who resigned after the TSB IT crash?
CEO Paul Pester resigned in September 2018. The intense public, media, and parliamentary pressure—fueled by poor initial communication regarding the severity of the outage—made his position untenable.

### Why did the TSB IT migration fail?
The migration failed fundamentally due to a lack of comprehensive performance testing. The individual software components were not adequately tested together under realistic production volumes, hiding severe architectural bottlenecks that only manifested when 5.2 million users attempted to log in.

## The Archivist's Verdict

> **The Archivist's Assessment:**
> The 2018 TSB migration failure represents the ultimate manifestation of integration hubris. The evidence clearly demonstrates that the technical failure was the inevitable downstream result of a compromised governance process.
> 
> The decision to execute a Big Bang cutover for 5.2 million financial records without first proving that the integrated architecture could handle peak load was a fundamental abdication of engineering responsibility. The architecture of Proteo4UK, while theoretically sound as a modern distributed system, was deployed with critical blind spots regarding database thread management and cross-site synchronization latency.
> 
> The regulatory fines and the resignation of the CEO reflect a failure that transcends mere software bugs. TSB’s inability to roll back the migration, coupled with their initial inability to diagnose the middleware bottlenecks, underscores the necessity of profound architectural observability. When enterprise software replaces legacy mainframes, the complexity of the failure domain expands exponentially. Testing must expand accordingly.

## Primary Sources

- [FCA Final Notice 2022 - TSB Bank plc](https://www.fca.org.uk/publication/final-notices/tsb-bank-plc-2022.pdf)
- [Slaughter and May Independent Review of the TSB IT Migration](https://www.tsb.co.uk/news-releases/slaughter-and-may-report/)
- [Treasury Committee Oral Evidence: TSB IT Failure](https://committees.parliament.uk/committee/158/treasury-committee/)
