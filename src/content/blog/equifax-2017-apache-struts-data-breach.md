---
title: "The Patch That Never Arrived: Inside the Equifax 2017 Apache Struts Data Breach"
description: "How a known, patchable open-source vulnerability went unaddressed for months, exposing the sensitive data of 147 million people and redefining corporate cybersecurity liability."
slug: "equifax-2017-apache-struts-data-breach"
pubDate: "2026-08-25"
updatedDate: "2026-08-25"
incidentDate: "2017-05-12"
incidentPeriod: "Mid-May to July 2017"
incidentEndDate: "2017-07-29"
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
    a: "Equifax agreed to a global settlement of at least $1.38 billion, including up to $425 million in consumer restitution, $175 million to states, and $1 billion committed to data security upgrades."
  - q: "How did the attackers remain undetected inside Equifax for months?"
    a: "The attackers operated undetected for 76 days because an expired digital certificate prevented Equifax's intrusion detection systems from inspecting the encrypted traffic exiting the ACIS system."
  - q: "What is Apache Struts?"
    a: "Apache Struts is a free, open-source framework for creating enterprise Java web applications. It is widely used by corporations to build web portals and interactive user interfaces."
  - q: "Who was held responsible for the Equifax breach?"
    a: "Following the breach, the CEO, CIO, and CSO of Equifax resigned. A Congressional report attributed the failure to a lack of accountability and management structure within Equifax's IT and security organizations."
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
  context: "Equifax, a major credit reporting agency, maintained vast repositories of highly sensitive consumer data, operating a web portal (ACIS) that relied on the Apache Struts framework."
  systemic_failure: "A known vulnerability (CVE-2017-5638) was announced in March 2017. Despite internal alerts, the ACIS system remained unpatched due to a lack of comprehensive IT asset visibility. Furthermore, intrusion detection systems failed to monitor encrypted traffic because a security certificate had expired."
  technical_mechanisms: "Attackers exploited the unpatched Apache Struts vulnerability to gain a foothold. They then escalated privileges and queried internal databases, extracting records over 76 days, communicating through encrypted channels that bypassed expired internal inspection systems."
  fallout: "Data for 147 million people was stolen. The CEO, CIO, and CSO resigned, and Equifax agreed to a settlement exceeding $1.38 billion, transforming global expectations for corporate patching governance."
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

On September 7, 2017, Equifax made a public announcement that fundamentally altered the global perception of digital privacy and corporate accountability. The consumer credit reporting agency disclosed that attackers had accessed the personal information of 147 million Americans. The stolen data was not limited to usernames and passwords; it consisted of the foundational elements of modern identity: Social Security numbers, birth dates, physical addresses, and driver's license numbers. The scope of the breach was unprecedented, effectively compromising the financial identities of nearly half the adult population of the United States. 

The investigation that followed dismantled the assumption that the breach was the result of a highly sophisticated, unpreventable zero-day exploit orchestrated by an unstoppable state-sponsored adversary. Instead, congressional investigations and forensic analyses revealed a profound failure of basic IT hygiene. The attackers had exploited a known vulnerability in an open-source framework—a vulnerability for which a patch had been available for months. 

The incident demonstrated how the sheer scale and complexity of modern enterprise architecture can create dangerous blind spots. When organizational silos prevent comprehensive asset management, security teams cannot protect what they do not know they own. The Equifax breach is a defining case study in the catastrophic consequences of incomplete network visibility, fragmented accountability, and the operational friction between security alerts and actual deployment.

> **What the evidence establishes:**
> - The technical failure mechanisms and financial consequences as documented in primary regulatory and court records.
> 
> **What the evidence does NOT establish:**
> - Any individual operator's personal malice or deliberate sabotage.
> - Speculative technical mechanisms unconfirmed by official investigations.

## What Was Equifax's ACIS?

The Automated Consumer Interview System (ACIS) was a custom-built, public-facing web portal designed to allow consumers to dispute errors on their credit reports. Developed in the 1970s and heavily modernized over the decades, ACIS was a critical component of Equifax's consumer operations. By 2017, the system was a complex amalgamation of legacy code and modern web frameworks, acting as a gateway between the public internet and Equifax's deeply sensitive backend databases. 

To handle the web interface and application logic, ACIS relied on Apache Struts, a popular open-source web application framework for developing Java EE web applications. Apache Struts provided the structural scaffolding for the portal, processing HTTP requests and managing the flow of data between the user's browser and the backend logic. Because ACIS was an internet-facing application, any vulnerability in its structural framework directly exposed the internal network to external exploitation. 

## Act I: The Warning and the Blind Spot

The sequence of events leading to the breach began on March 7, 2017, when the Apache Software Foundation publicly disclosed a critical vulnerability in the Jakarta Multipart parser of Apache Struts (CVE-2017-5638). The vulnerability allowed an attacker to execute arbitrary code on a remote server by simply sending a crafted `Content-Type` HTTP header. It was a severe flaw, scoring a maximum 10.0 on the Common Vulnerability Scoring System (CVSS), because it required no authentication and was trivial to exploit. The foundation simultaneously released a patch. 

On March 8, the United States Computer Emergency Readiness Team (US-CERT), operating under the Department of Homeland Security, issued an alert regarding the vulnerability. The following day, Equifax's Global Threat and Vulnerability Management (GTVM) team circulated an internal email instructing personnel to apply the Apache Struts patch within 48 hours. 

Despite the clear instructions, the ACIS system was not patched. 

The failure was not an act of deliberate defiance; it was a consequence of organizational blindness. The personnel responsible for managing the ACIS application did not receive the alert, and the security team responsible for scanning the network for vulnerabilities possessed an incomplete inventory of software assets. When the security team ran network scans to identify vulnerable instances of Apache Struts, the tools failed to detect the outdated version running on the ACIS servers. The system was functionally invisible to the organization's automated vulnerability management processes. 

## Act II: Exploitation and Lateral Movement

In mid-May 2017, attackers began scanning the internet for unpatched instances of Apache Struts. When they probed the Equifax ACIS portal, the system accepted the malicious HTTP request and granted the attackers initial access. 

The initial compromise provided a foothold, but the attackers needed to navigate the internal network to access the high-value databases. They quickly discovered a file containing unencrypted credentials—usernames and passwords in plain text—that granted broad access to multiple backend databases. 

Using these credentials, the attackers queried the internal systems. Over the course of 76 days, from mid-May to late July, the attackers executed thousands of database queries, systematically extracting massive volumes of consumer data. They compressed the stolen data into archive files and exfiltrated it to external servers. 

## The Forensic Discrepancy Matrix

| Parameter | Digital Representation | Physical Reality | Evidence Status | Mechanism |
| :--- | :--- | :--- | :--- | :--- |
| Initial Vector | Crafted HTTP Request | Arbitrary Code Execution | [DOCUMENTED] | Exploitation of CVE-2017-5638 in Apache Struts |
| Internal Access | Plaintext Credentials | Database Authentication | [DOCUMENTED] | Unencrypted passwords stored on compromised server |
| Network Visibility | Encrypted Traffic | Uninspected Exfiltration | [DOCUMENTED] | Expired SSL certificate on intrusion detection system |
| Detection Delay | 76 Days | Ongoing Data Theft | [DOCUMENTED] | Lack of operational monitoring on legacy systems |

## Act III: The Expired Certificate

A critical question emerged during the forensic investigation: how could attackers extract massive amounts of data over 76 days without triggering any network alarms? Equifax employed specialized Intrusion Detection Systems (IDS) designed to inspect network traffic for malicious activity and unauthorized data exfiltration. 

The failure of the IDS was traced to an expired digital certificate. To inspect encrypted HTTPS traffic, the IDS required an active SSL certificate to decrypt the packets, analyze the contents, and re-encrypt the traffic before sending it to its destination. The certificate installed on the device monitoring the ACIS network segment had expired approximately ten months prior to the breach. 

Because the certificate was expired, the IDS could not decrypt the traffic. Rather than failing closed or alerting administrators to the expiration, the system passively allowed the encrypted traffic to flow uninspected. The attackers were able to transmit their commands and exfiltrate the archived data through an encrypted tunnel that the security infrastructure was completely blind to. 

On July 29, 2017, Equifax personnel finally updated the expired SSL certificate. Once the new certificate was installed, the IDS immediately began inspecting the traffic and immediately flagged the malicious communications. The security team rapidly disconnected the compromised ACIS servers, terminating the attackers' access. The discovery, however, came months too late. 

## Act IV: Financial & Legal Reckoning

The disclosure of the breach triggered a massive public outcry, intense regulatory scrutiny, and a cascade of executive departures. The financial and legal consequences were unprecedented, establishing new benchmarks for corporate liability regarding data protection.

### The Financial Reckoning
Equifax faced immediate financial consequences. The company's stock price plummeted, losing billions in market capitalization in the weeks following the disclosure. The direct costs associated with incident response, forensic investigations, legal fees, and technology remediation were immense. 

In 2019, Equifax agreed to a global settlement with the Federal Trade Commission (FTC), the Consumer Financial Protection Bureau (CFPB), and 50 U.S. states and territories. The settlement mandated that Equifax spend up to $425 million to compensate affected consumers for time spent resolving fraud and for out-of-pocket losses. The company also agreed to pay $175 million to the participating states and a $100 million civil penalty to the CFPB. Furthermore, Equifax committed to spending a minimum of $1 billion over five years to overhaul its information security program. 

## 🛡️ Systems Prevention Playbook

The Equifax breach provides clear engineering lessons regarding the necessity of defense-in-depth and operational visibility. The failure highlights three mandatory defensive engineering principles for any enterprise architecture. 

**1. The Comprehensive Asset Inventory Rule**
Security teams cannot patch software they do not know exists. Organizations must maintain dynamic, automated inventories of all software dependencies, libraries, and frameworks deployed across their infrastructure. Vulnerability scanning tools must be configured to comprehensively map the network and identify all assets, without relying solely on manual tracking or static documentation. 

**2. The Fail-Closed Inspection Principle**
Security infrastructure must be configured to fail closed when critical operational dependencies, such as digital certificates, expire or malfunction. If an intrusion detection system cannot perform its primary function of inspecting traffic due to an expired certificate, it must generate high-priority alerts and, depending on the risk profile, halt the uninspected traffic. Allowing encrypted traffic to bypass security controls silently creates a false sense of security and provides attackers with an undetected exfiltration channel. 

**3. The Principle of Least Privilege and Credential Security**
The storage of plaintext credentials on accessible servers significantly accelerates an attacker's ability to move laterally within a network. Organizations must enforce the principle of least privilege, ensuring that applications and service accounts only have access to the specific databases and resources required for their function. Credentials must be securely managed using dedicated secret management systems, never stored in plain text in configuration files or on application servers. 

> **The Archivist's Assessment:** 
> The Equifax data breach was not a failure of advanced cryptography or a defeat at the hands of an unpredictable new cyber weapon. It was a failure of foundational IT governance. The organization operated a complex, internet-facing system without maintaining a precise inventory of its software components. When a critical alert was issued, the bureaucratic machinery failed to connect the vulnerability to the specific server hosting the risk. This administrative gap was compounded by the operational negligence of allowing a critical security certificate to expire, blinding the very systems designed to catch such intrusions. The incident demonstrates that in modern enterprise environments, administrative hygiene and comprehensive network visibility are not secondary operational tasks; they are the bedrock of structural security. When basic maintenance is ignored, the resulting collapse is inevitable.

## Then vs Now: Engineering Evolution After Equifax

| 2017 Failure Pattern | Modern Cybersecurity Architecture |
| :--- | :--- |
| **Manual Vulnerability Tracking** | **Automated Software Bill of Materials (SBOM)** ensuring every dependency is known and mapped. |
| **Static Asset Inventories** | **Continuous Attack Surface Management (CASM)** that dynamically discovers exposed assets. |
| **Silent IDS Failure** | **Fail-Closed Inspection** where expired certificates immediately halt traffic or trigger critical alerts. |
| **Flat Internal Networks** | **Zero Trust Architecture** requiring continuous authentication, even for internal microservices. |
| **Plaintext Credentials** | **Dedicated Secrets Management** (e.g., HashiCorp Vault) providing temporary, rotated credentials. |

## Primary Sources

- [U.S. House Committee on Oversight and Government Reform - The Equifax Data Breach](https://oversight.house.gov/wp-content/uploads/2018/12/Equifax-Report.pdf)
- [Equifax Global Settlement Notice](https://www.ftc.gov/enforcement/cases-proceedings/refunds/equifax-data-breach-settlement)

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
Equifax agreed to a global settlement of at least $1.38 billion, including up to $425 million in consumer restitution, $175 million to states, and $1 billion committed to data security upgrades. The [FTC Settlement](https://www.ftc.gov/enforcement/cases-proceedings/refunds/equifax-data-breach-settlement) outlines the restitution terms.

### How did the attackers remain undetected inside Equifax for months?
The attackers operated undetected for 76 days because an expired digital certificate prevented Equifax's intrusion detection systems from inspecting the encrypted traffic exiting the ACIS system.

### What is Apache Struts?
Apache Struts is a free, open-source framework for creating enterprise Java web applications. It is widely used by corporations to build web portals and interactive user interfaces.

### Who was held responsible for the Equifax breach?
Following the breach, the CEO, CIO, and CSO of Equifax resigned. A [Congressional Report](https://oversight.house.gov/wp-content/uploads/2018/12/Equifax-Report.pdf) attributed the failure to a lack of accountability and management structure within Equifax's IT and security organizations.

