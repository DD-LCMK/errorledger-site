---
title: "The Patch That Never Arrived: Inside the Equifax 2017 Apache Struts Data Breach"
description: "How a known, patchable open-source vulnerability went unaddressed for months, exposing the sensitive data of 147 million people and redefining corporate cybersecurity liability."
slug: "equifax-2017-apache-struts-data-breach"
pubDate: "2026-08-25"
updatedDate: "2026-08-25"
incidentDate: "2017-05-12"
incidentPeriod: "Mid-May to July 2017"
incidentEndDate: "2017-07-29"
financialLoss: "Multi-billion-dollar total financial impact including settlements, remediation, security investment, legal costs, and related losses"
keywords:
  - "Equifax data breach Apache Struts"
  - "CVE-2017-5638 failure"
  - "Equifax 2017 cyber attack"
  - "ACIS system breach Equifax"
faqItems:
  - q: "What caused the 2017 Equifax data breach?"
    a: "The breach was caused by a failure to patch a known vulnerability (CVE-2017-5638) in the Apache Struts web framework used by Equifax's Automated Consumer Interview System (ACIS). The patch had been available for over two months before the attackers exploited the flaw."
  - q: "How many people were affected by the Equifax breach?"
    a: "The breach exposed the sensitive personal information of approximately 147 million consumers in the United States, as well as some individuals in Canada and the UK."
  - q: "What data was stolen from Equifax?"
    a: "The attackers extracted names, Social Security numbers, birth dates, addresses, and in some cases, driver's license numbers and credit card information."
  - q: "Did Equifax know about the Apache Struts vulnerability?"
    a: "Yes. The Department of Homeland Security alerted Equifax on March 8, 2017, and internal emails instructed personnel to apply the patch. However, the ACIS system was not patched due to incomplete IT asset inventory and miscommunication."
  - q: "How much did the 2017 breach cost Equifax?"
    a: "Equifax entered multiple settlements arising from the breach. A 2019 regulatory settlement with the FTC, CFPB, and states required at least $575 million and potentially up to $700 million in payments, including up to $425 million for consumer relief. A separate class-action settlement established a consumer fund and required Equifax to spend at least $1 billion on data security over five years."
  - q: "How did the attackers remain undetected inside Equifax for months?"
    a: "Attackers maintained undetected access for roughly 76 days according to the House Oversight investigation. The intrusion remained difficult to detect because an expired certificate prevented Equifax's monitoring system from inspecting relevant ACIS traffic."
  - q: "What is Apache Struts?"
    a: "Apache Struts is a free, open-source framework for creating enterprise Java web applications. It is widely used by corporations to build web portals and interactive user interfaces."
  - q: "Who was held responsible for the Equifax breach?"
    a: "Following the breach, the CEO, CIO, and CSO of Equifax all departed the company in the aftermath of the breach. A Congressional report attributed the failure to a lack of accountability and management structure within Equifax's IT and security organizations."
category: "corporate"
archetype: "the-incident"
provenance_tier: 1
provenance_label: "Documented Incident (Tier 1)"
provenance_source: "U.S. House Committee on Oversight and Government Reform Report"
read_time_minutes: 15
author: "The Archivist"
date: "2026-08-25"
lang: "en"
heroImage: "/hero_equifax_apache_struts_1787227118326.jpg"
summary_points:
  context: "Equifax, a major credit reporting agency, maintained vast repositories of highly sensitive consumer data, operating an internet-facing consumer dispute environment known as ACIS that relied on the Apache Struts framework."
  systemic_failure: "A known vulnerability (CVE-2017-5638) was disclosed in March 2017. Despite internal alerts requiring rapid patching, the vulnerable ACIS environment remained unpatched because Equifax's asset inventory, notification process, and vulnerability-scanning controls failed to reliably identify and remediate the affected system. Intrusion monitoring was separately impaired by an expired certificate."
  technical_mechanisms: "Attackers exploited the unpatched Apache Struts vulnerability to gain access to the ACIS environment, deployed web shells, obtained unencrypted application credentials, and used them to reach unrelated internal databases. They executed approximately 9,000 database queries and extracted personally identifiable information. Network monitoring failed to inspect relevant ACIS traffic because of an expired certificate."
  fallout: "Approximately 147 million consumers were affected. Equifax's CEO, CIO, and CSO departed in the aftermath, while subsequent settlements imposed hundreds of millions of dollars in payments and required at least $1 billion in additional data-security spending."
tags: ["Cybersecurity", "Data Breach", "Systemic Failure", "Governance", "Equifax"]
primary_sources:
  - title: "U.S. House Committee on Oversight and Government Reform - The Equifax Data Breach"
    url: "https://oversight.house.gov/wp-content/uploads/2018/12/Equifax-Report.pdf"
    institution: "U.S. House of Representatives"
    type: "Congressional Report"
  - title: "Equifax Global Settlement Notice"
    url: "https://www.ftc.gov/enforcement/cases-proceedings/refunds/equifax-data-breach-settlement"
    institution: "Federal Trade Commission (FTC)"
    type: "Regulatory Settlement"
---

On September 7, 2017, Equifax made a public announcement that became one of the defining corporate cybersecurity failures of the decade. The consumer credit reporting agency disclosed that attackers had accessed the personal information of approximately 147 million consumers. The stolen data was not limited to usernames and passwords; it consisted of the foundational elements of modern identity: Social Security numbers, birth dates, physical addresses, and driver's license numbers. The scope of the breach was extraordinary, effectively compromising the financial identities of more than half of U.S. adults. 

The investigation that followed dismantled the assumption that the breach was the result of a highly sophisticated, unpreventable zero-day exploit orchestrated by an unstoppable state-sponsored adversary. Instead, congressional investigations and forensic analyses revealed a profound failure of basic IT hygiene. The attackers had exploited a known vulnerability in an open-source framework—a vulnerability for which a patch had been available for months. 

The incident demonstrated how the sheer scale and complexity of modern enterprise architecture can create dangerous blind spots. When organizational silos prevent comprehensive asset management, security teams cannot protect what they do not know they own. The Equifax breach is a defining case study in the catastrophic consequences of incomplete network visibility, fragmented accountability, and the operational friction between security alerts and actual deployment.

> **What the evidence establishes:**
> - The technical failure mechanisms and financial consequences as documented in primary regulatory and court records.
> 
> **What the evidence does NOT establish:**
> - Any individual operator's personal malice or deliberate sabotage.
> - Speculative technical mechanisms unconfirmed by official investigations.

## What Was Equifax's ACIS?

The Automated Consumer Interview System (ACIS) was a custom-built, public-facing web portal designed to allow consumers to dispute errors on their credit reports. ACIS was part of a custom-built legacy environment originating in the 1970s and subsequently modified and modernized over decades. By 2017, the system was a complex amalgamation of legacy code and modern web frameworks, serving as an internet-facing application environment with connectivity to backend Equifax databases. 

To handle the web interface and application logic, ACIS relied on Apache Struts, a popular open-source web application framework for developing Java EE web applications. Apache Struts provided the structural scaffolding for the portal, processing HTTP requests and managing the flow of data between the user's browser and the backend logic. Because ACIS was an internet-facing application, any vulnerability in its structural framework directly exposed the internal network to external exploitation. 

## Act I: The Warning and the Blind Spot

The sequence of events leading to the breach began on March 7, 2017, when the Apache Software Foundation publicly disclosed a critical vulnerability in the Jakarta Multipart parser of Apache Struts (CVE-2017-5638). The vulnerability allowed an attacker to execute arbitrary code on a remote server by sending a specially crafted `Content-Type` HTTP header. It was a severe flaw, scoring a maximum 10.0 on the Common Vulnerability Scoring System (CVSS), because it could be exploited remotely without authentication and public exploit code made exploitation comparatively accessible. The foundation simultaneously released a patch. 

On March 8, the United States Computer Emergency Readiness Team (US-CERT), operating under the Department of Homeland Security, issued an alert regarding the vulnerability. The following day, Equifax's Global Threat and Vulnerability Management (GTVM) team circulated an internal email instructing personnel to apply the Apache Struts patch within 48 hours. 

Despite the clear instructions, the ACIS system was not patched. 

The failure was not an act of deliberate defiance; it was a consequence of organizational blindness. The employee responsible for maintaining the ACIS Dispute Portal was not included in the distribution used for the patching directive, while Equifax's vulnerability-scanning process also failed to identify the vulnerable installation. When the security team ran network scans to identify vulnerable instances of Apache Struts, the tools failed to detect the outdated version running on the ACIS servers due to an incomplete IT asset inventory and incorrect scanner configurations. The system was functionally invisible to the organization's automated vulnerability management processes. 

## Act II: Exploitation and Lateral Movement

On May 13, 2017, attackers exploited the unpatched Apache Struts vulnerability in Equifax's ACIS environment and gained initial access to the network.

The initial compromise provided a foothold, but the attackers needed to navigate the internal network to access the high-value databases. They quickly discovered a file containing unencrypted credentials—usernames and passwords in plain text—that granted broad access to multiple backend databases. ACIS was not adequately segmented from unrelated internal databases. Although the application required access to only three databases for its business function, the compromised credentials enabled access to 48 unrelated databases.

The attackers ultimately used the credentials to access these 48 unrelated databases. They issued approximately 9,000 database queries, of which 265 returned datasets containing personally identifiable information. The House Oversight investigation characterized the attack as lasting 76 days, from May 13 until detection in late July. During this time, the attackers systematically extracted massive volumes of consumer data, compressing it into archive files and exfiltrating it to external servers. 

## The Forensic Discrepancy Matrix

| Parameter | Digital Representation | Physical Reality | Evidence Status | Mechanism |
| :--- | :--- | :--- | :--- | :--- |
| Initial Vector | Crafted HTTP Request | Arbitrary Code Execution | [DOCUMENTED] | Exploitation of CVE-2017-5638 in Apache Struts |
| Internal Access | Plaintext Credentials | Database Authentication | [DOCUMENTED] | Unencrypted passwords stored on compromised server |
| Network Visibility | Encrypted Traffic | Uninspected Exfiltration | [DOCUMENTED] | Expired SSL certificate on intrusion detection system |
| Intrusion Duration | ~76 Days | Continued Unauthorized Access | [DOCUMENTED] | Lack of operational monitoring on legacy systems |

## Act III: The Expired Certificate

A critical question emerged during the forensic investigation: how could attackers extract massive amounts of data over 76 days without triggering any network alarms? Equifax employed specialized Intrusion Detection Systems (IDS) designed to inspect network traffic for malicious activity and unauthorized data exfiltration. 

The failure of the IDS was traced to an expired digital certificate. The monitoring system depended on a valid certificate configuration to inspect the encrypted traffic. Once that certificate expired, the monitoring device could no longer perform the intended inspection of traffic to and from the ACIS environment. The certificate had expired in November 2016, and the network-monitoring device had therefore been unable to inspect ACIS traffic for approximately 19 months.

The expired certificate left the monitoring system unable to inspect the relevant encrypted traffic, eliminating a critical detection layer. The incident therefore exposed a second control failure: the organization did not detect and remediate the monitoring outage for an extended period. The attackers were able to transmit their commands and exfiltrate the archived data through an encrypted tunnel that the relevant network-monitoring layer was blind to.

On July 29, 2017, Equifax personnel finally updated the expired SSL certificate. After the certificate was renewed, Equifax's monitoring system began generating alerts associated with suspicious traffic from the ACIS environment. The security team rapidly disconnected the compromised ACIS servers, terminating the attackers' access. The discovery, however, came months too late. 

## Act IV: Financial & Legal Reckoning

The disclosure of the breach triggered a massive public outcry, intense regulatory scrutiny, and a cascade of executive departures. The financial and legal consequences were unprecedented, establishing new benchmarks for corporate liability regarding data protection.

### The Financial Reckoning
Equifax faced immediate financial consequences. The company's stock price plummeted, losing billions in market capitalization in the weeks following the disclosure. The direct costs associated with incident response, forensic investigations, legal fees, and technology remediation were immense. 

Equifax entered multiple settlements arising from the breach. A 2019 regulatory settlement with the FTC, CFPB, and states required at least $575 million and potentially up to $700 million in payments, including up to $425 million for consumer relief. The company also agreed to pay $175 million to the participating states and a $100 million civil penalty to the CFPB. A separate class-action settlement established a consumer fund and required Equifax to spend at least $1 billion over five years on data security and related technology. 

## 🛡️ Systems Prevention Playbook

The Equifax breach provides clear engineering lessons regarding the necessity of defense-in-depth and operational visibility. The failure highlights three mandatory defensive engineering principles for any enterprise architecture. 

**1. The Comprehensive Asset Inventory Rule**
Security teams cannot patch software they do not know exists. Organizations must maintain dynamic, automated inventories of all software dependencies, libraries, and frameworks deployed across their infrastructure. Vulnerability scanning tools must be configured to comprehensively map the network and identify all assets, without relying solely on manual tracking or static documentation. 

**2. The Fail-Closed Inspection Principle**
Security infrastructure must be configured to fail closed when critical operational dependencies, such as digital certificates, expire or malfunction. If an intrusion detection system cannot perform its primary function of inspecting traffic due to an expired certificate, it must generate high-priority alerts and, depending on the risk profile, halt the uninspected traffic. Allowing encrypted traffic to bypass security controls silently creates a false sense of security and provides attackers with an undetected exfiltration channel. 

**3. The Segmentation and Least-Privilege Rule**
Compromise of one internet-facing application should not provide a path to unrelated databases. ACIS required access to only three databases for its business function, yet attackers ultimately reached 48 unrelated databases. Network segmentation, application-specific service accounts, and database-level authorization should enforce those boundaries. The storage of plaintext credentials on accessible servers significantly accelerates an attacker's ability to move laterally within a network. Credentials must be securely managed using centralized secret management systems, never stored in plain text in configuration files or on application servers. 

> **The Archivist's Assessment:** 
> The Equifax data breach was not a failure of advanced cryptography or a defeat at the hands of an unpredictable new cyber weapon. It was a failure of foundational IT governance. The organization operated a complex, internet-facing system without maintaining a precise inventory of its software components. When a critical alert was issued, the bureaucratic machinery failed to connect the vulnerability to the specific server hosting the risk. This administrative gap was compounded by the operational failure of allowing a critical security certificate to remain expired, blinding the very systems designed to catch such intrusions. The incident demonstrates that in modern enterprise environments, administrative hygiene and comprehensive network visibility are not secondary operational tasks; they are the bedrock of structural security. When basic maintenance is ignored, the probability and potential impact of catastrophic failure increase dramatically.

## Engineering Evolution: From Failure Mode to Defensive Pattern

| 2017 Failure Pattern | Modern Cybersecurity Architecture |
| :--- | :--- |
| **Manual Vulnerability Tracking** | **Automated Software Bill of Materials (SBOM)** ensuring every dependency is known and mapped. |
| **Static Asset Inventories** | **Continuous Attack Surface Management (CASM)** that dynamically discovers exposed assets. |
| **Silent IDS Failure** | **Fail-Closed Inspection** (Engineering Recommendation) where expired certificates halt traffic or trigger alerts. |
| **Flat Internal Networks** | **Zero Trust Architecture** requiring continuous authentication, even for internal microservices. |
| **Plaintext Credentials** | **Centralized Secrets Management + Rotation** (e.g., HashiCorp Vault) providing temporary credentials. |

## Primary Sources

- [Apache Struts S2-045 Security Bulletin](https://struts.apache.org/announce-2017.html)
- [U.S. House Committee on Oversight and Government Reform - The Equifax Data Breach](https://oversight.house.gov/wp-content/uploads/2018/12/Equifax-Report.pdf)
- [U.S. Senate Permanent Subcommittee on Investigations - Equifax Data Breach Report](https://www.congress.gov/117/crpt/srpt1/CRPT-117srpt1.pdf)
- [Federal Trade Commission - Equifax Complaint](https://search.ftc.gov/system/files/documents/cases/172_3203_equifax_complaint_7-22-19.pdf)

## FAQ

### What caused the 2017 Equifax data breach?
The breach was caused by a failure to patch a known vulnerability (CVE-2017-5638) in the Apache Struts web framework used by Equifax's Automated Consumer Interview System (ACIS). The patch had been available for over two months before the attackers exploited the flaw.

### How many people were affected by the Equifax breach?
The breach exposed the sensitive personal information of approximately 147 million consumers in the United States, as well as some individuals in Canada and the UK.

### What data was stolen from Equifax?
The attackers extracted names, Social Security numbers, birth dates, addresses, and in some cases, driver's license numbers and credit card information.

### Did Equifax know about the Apache Struts vulnerability?
Yes. The Department of Homeland Security alerted Equifax on March 8, 2017, and internal emails instructed personnel to apply the patch. However, the ACIS system was not patched due to incomplete IT asset inventory and miscommunication.

### How much did the 2017 breach cost Equifax?
Equifax entered multiple settlements arising from the breach. A 2019 regulatory settlement with the FTC, CFPB, and states required at least $575 million and potentially up to $700 million in payments, including up to $425 million for consumer relief. A separate class-action settlement established a consumer fund and required Equifax to spend at least $1 billion on data security over five years. The [FTC Settlement](https://www.ftc.gov/enforcement/cases-proceedings/refunds/equifax-data-breach-settlement) outlines the regulatory restitution terms.

### How did the attackers remain undetected inside Equifax for months?
Attackers maintained undetected access for roughly 76 days according to the House Oversight investigation. The intrusion remained difficult to detect because an expired certificate prevented Equifax's monitoring system from inspecting relevant ACIS traffic.

### What is Apache Struts?
Apache Struts is a free, open-source framework for creating enterprise Java web applications. It is widely used by corporations to build web portals and interactive user interfaces.

### Who was held responsible for the Equifax breach?
Following the breach, the CEO, CIO, and CSO of Equifax all departed the company in the aftermath of the breach. A [Congressional Report](https://oversight.house.gov/wp-content/uploads/2018/12/Equifax-Report.pdf) attributed the failure to a lack of accountability and management structure within Equifax's IT and security organizations.

