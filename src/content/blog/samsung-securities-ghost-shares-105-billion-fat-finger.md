---
title: "The $105 Billion Typo: How Samsung Securities Issued 2.8 Billion Ghost Shares and Triggered a 37-Minute Trading Free-for-All"
subtitle: "Inside the dropdown menu error that minted 30 times the company's real stock out of thin air—and the sixteen employees who tried to sell it."
description: "On April 6, 2018, a clerk entered 1,000 shares instead of 1,000 won. Inside the internal ledger glitch that minted $105 billion in unbacked phantom equity, sparking a 37-minute insider selling frenzy."
slug: "samsung-securities-ghost-shares-105-billion-fat-finger"
pubDate: "2026-08-18"
incidentDate: "2018-04-06"
category: "money"
archetype: "the-incident"
provenance_tier: 1
provenance_label: "Documented Incident (Tier 1)"
provenance_source: "Supreme Court of Korea Judgment 2024Da242857, Seoul Southern District Court Criminal Rulings, and Financial Services Commission (FSC) Sanction Dockets"
read_time_minutes: 12
heroImage: "/images/stories/hero-samsung-ghost-stock.png"
summary_points:
  context: "Samsung Securities was executing a routine annual dividend payment of 1,000 KRW (approx $0.93) per share to 2,018 employee stock ownership plan (ESOP) members."
  trigger: "An operations clerk selected 'shares' instead of 'KRW' from a dropdown menu, minting 2.81 billion phantom shares worth $105 billion on an internal unverified ledger."
  fallout: "16 employees sold 5.01 million phantom shares in 37 minutes, plunging the stock 11.7%. Samsung Securities absorbed 200 billion KRW in buyback losses and was suspended by regulators."
tags: ["financial-disasters", "fat-finger", "samsung-securities", "ghost-shares", "fintech-architecture", "korean-markets"]
primary_sources:
  - title: "Supreme Court of Korea Judgment 2024Da242857 (Samsung Securities Shareholder Damages)"
    url: "https://www.scourt.go.kr"
    institution: "Supreme Court of Korea"
    type: "Final Civil Judgment"
  - title: "Financial Services Commission (FSC) Administrative Sanction Order (July 2018)"
    url: "https://www.fsc.go.kr/no010101/72886"
    institution: "Financial Services Commission (Korea)"
    type: "Regulatory Enforcement Order"
  - title: "Financial Supervisory Service (FSS) Special Inspection Report on Ghost Shares"
    url: "https://www.fss.or.kr"
    institution: "Financial Supervisory Service"
    type: "Official Investigation Report"
  - title: "Korea Exchange (KRX) Trading Halt & Settlement Intervention Log"
    url: "https://open.krx.co.kr"
    institution: "Korea Exchange (KRX)"
    type: "Market Surveillance Record"
---

At 9:31 AM on Friday, April 6, 2018, the internal brokerage accounts of 2,018 employees at Samsung Securities were credited with an astronomical sum of newly minted equity.

The money was not real.

The stock did not exist.

The internal ledger simply did not know that yet.

Minutes earlier, an operations clerk at the firm's headquarters in Seocho-dong, Seoul, was processing an annual cash dividend for members of the Employee Stock Ownership Plan (ESOP). The intended transaction was modest: distribute **1,000 KRW** (approximately $0.93 USD) in cash per share held, totaling **2.81 billion KRW** ($2.6 million USD) across all eligible staff.

In the administration portal, the clerk selected the asset unit from a dropdown menu.

She chose **"Shares"** instead of **"Won (Cash)"**.

The moment she hit confirm, Samsung Securities’ internal ledger software did not send 2.8 billion won. It synthesized **2,811,077,000 newly issued ordinary shares** of Samsung Securities Co., Ltd. and deposited them directly into the personal trading accounts of its employees.

At the market opening price, the phantom stock had a theoretical cash value of **112.4 trillion KRW (approximately $105 billion USD)**.

Samsung Securities had only 89.3 million real physical shares in existence. In a single click, **the software had minted 31.4 times the entire corporate equity of the company**—an unbacked position equal to nearly 6% of South Korea's entire annual GDP.

---

## The Forensic Discrepancy Matrix

The gap between planned corporate distributions, executed database transactions, and the physical reality of the company's equity illustrates an absolute failure of internal inventory checks:

| Parameter | Planned Dividend Action | Executed Database Payload | Physical Reality of Issuer | Discrepancy Multiple |
| :--- | :--- | :--- | :--- | :--- |
| **Distribution Unit** | Cash (KRW Won) | **Ordinary Common Shares** | Real Issued Capital: 89.3M Shs | **Unit Mismatch Error** |
| **Dividend Per Share**| 1,000 KRW (~$0.93) | **1,000 Shares (~$37,000)** | Par Value: 5,000 KRW | **39,780× Value Explosion** |
| **Total Distribution**| 2.81 Billion KRW ($2.6M) | **2.81 Billion Shares ($105B)** | Market Cap: ~3.5 Trillion KRW | **31.4× Entire Company Value** |
| **Ledger Sanity Gate**| Custody Reconciliation | **Bypassed (Internal Trust)** | KSD Physical Vault Balance: 0 | **Naked Phantom Minting** |

Samsung Securities operated with a critical architectural blindspot: because internal employee dividend distributions were categorized as "trusted internal administrative workflows," the software did not execute a real-time pre-allocation API call to the central depository (Korea Securities Depository) to verify whether the firm physically possessed 2.8 billion shares in its treasury vault.

The software minted the numbers, and within sixty seconds, those numbers were fully liquid and tradeable on the Korea Exchange (KRX).

---

## Act I: The 37-Minute Insider Selling Storm

Across regional branches and the central dealing floor in Seoul, employees logging into their mobile trading apps saw account balances suddenly inflated into tens and hundreds of billions of won.

While most employees immediately flagged the glitch to internal audit, **sixteen employees decided to test whether the phantom shares could be converted into cold cash.**

Between 9:35 AM and 10:06 AM, sixteen employees executed sequential market sell orders:

- A senior wealth manager placed four separate market sell orders totaling **1.1 million phantom shares**.
- Another employee executed sales of **750,000 shares** and immediately initiated an external wire transfer of the cash proceeds to a personal checking account at another commercial bank.
- In total, the sixteen employees dumped **5.01 million phantom shares** onto the open market, generating **201.8 billion KRW ($187 million USD)** in filled transactions.

The sudden avalanche of 5 million unbacked sell orders smashed through the order book. 

At 9:40 AM, Samsung Securities’ stock price plummeted **11.7%**, triggering multiple market-wide Volatility Interruption (VI) trading halts.

---

## Act II: The 37-Minute Telemetry Log

Internal records and regulatory timelines reconstruct the chaotic 37 minutes between the first rogue execution and the emergency system freeze:

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                     SAMSUNG SECURITIES 37-MINUTE TELEMETRY LOG (KST)                     │
├──────────────┬────────────────────────┬────────────────────────────────┬─────────────────┤
│ Timestamp    │ Originating Node       │ Mechanical Action / Event      │ System Status   │
├──────────────┼────────────────────────┼────────────────────────────────┼─────────────────┤
│ 09:30:12 KST │ Dividend Admin Portal  │ 1,000 Shares/Unit Payload Sent │ Phantom Minting │
│ 09:31:00 KST │ Internal Ledger DB     │ 2.81B Shares Credited to ESOP  │ $105B Phantom   │
│ 09:35:44 KST │ Employee Terminal #04  │ First Market Sell (50,000 Shs) │ Dump on KRX     │
│ 09:39:10 KST │ Surveillance Desk      │ Extreme Volume Alert Triggered │ Stock Down 4%   │
│ 09:45:00 KST │ Internal Emergency PA  │ "Halt All Trading Immediately" │ Orders Continue │
│ 09:52:18 KST │ KRX Matching Engine    │ Volatility Interruption Fired  │ Plunge to -11.7%│
│ 10:08:00 KST │ IT Emergency Killswitch│ All Employee Accounts Frozen   │ 5.01M Shs Filled│
└──────────────┴────────────────────────┴────────────────────────────────┴─────────────────┘
```

Despite three consecutive internal emergency broadcast popups warning staff that *"selling these shares constitutes a severe criminal act,"* several employees continued placing mobile sell orders until the IT infrastructure team manually severed their account permissions at 10:08 AM.

---

## Primary Judicial Exhibit: Supreme Court of Korea Findings

The subsequent criminal and civil trials resulted in prison sentences for the rogue traders and systemic liability for the firm:

> ### 🏛️ JUDICIAL RECORD EXHIBIT ([Supreme Court of Korea Judgment 2024Da242857](https://www.scourt.go.kr))
> 
> *"The defendants, as professional securities personnel, were fully aware that the massive volume of shares credited to their personal accounts was the result of a grave system malfunction.*
> 
> *By executing aggressive market sell orders to secure illicit personal profits in blatant disregard of corporate warnings, the defendants committed criminal breach of trust. Furthermore, Samsung Securities operated a deeply defective internal ledger system that permitted the generation and public trading of unbacked phantom shares without central depository validation, violating its fundamental legal duty to preserve market integrity."*
> 
> **— Supreme Court of Korea, Civil Division 3**

In criminal proceedings, the Seoul Southern District Court sentenced the primary selling employees to up to **4 years in prison**.

---

## Act III: The 200 Billion Won Buy-In & Regulatory Sanctions

Because the 5.01 million shares sold on the open market did not exist, Samsung Securities faced a catastrophic **T+2 settlement default**. 

By Tuesday morning, the firm was legally obligated to deliver 5.01 million real physical shares to the Korea Securities Depository to settle trades with the innocent retail investors who had bought the dip.

To prevent a clearing collapse, Samsung Securities had to borrow millions of shares from institutional pension funds and execute massive open-market buyback programs, absorbing **205.5 billion KRW ($190 million USD)** in direct net losses.

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                             THE FINAL REGULATORY & FINANCIAL RECKONING                   │
├────────────────────────────────────────────────────────┬─────────────────────────────────┤
│ Total Phantom Shares Created on Internal Ledger        │ 2,811,077,000 Shares            │
│ Phantom Shares Dumped on Open Market by 16 Staff       │ 5,010,000 Shares                │
│ Emergency Institutional Borrowing & Buyback Cost       │ 157.5 Billion KRW               │
│ Retail Investor Compensation Payouts                   │ 48.0 Billion KRW                │
├────────────────────────────────────────────────────────┼─────────────────────────────────┤
│ Total Net Loss Absorbed by Samsung Securities          │ ~205.5 Billion KRW (~$190M USD) │
│ Financial Services Commission (FSC) Sanction           │ 6-Month Equity Brokerage Suspension │
│ Criminal Sentences                                     │ Up to 4 Years Prison for Traders│
└────────────────────────────────────────────────────────┴─────────────────────────────────┘
```

The [Financial Services Commission (FSC)](https://www.fsc.go.kr/no010101/72886) suspended Samsung Securities from onboarding new equity brokerage clients for six months and sanctioned its executive committee.

---

## 🛡️ Systems Prevention Playbook (How to Build Systems That Survive Human Reality)

If a single operator’s dropdown selection can mint $105 billion in unbacked equity, your internal ledger is not an accounting database—it is a counterfeit printing press.

Here is how modern FinTech and ledger architectures engineer absolute physical constraints:

### 1. The Friction Rule: Strict Context Separation for Ledger Units
Never place cash and equity allocation under a shared dropdown selector:
- **Dedicated Allocation Workflows:** Cash dividends and stock splits must operate on entirely separate UI schemas, separate API endpoints, and separate database permissions.
- **Dual-Control Authorization:** Any corporate action that modifies ledger balances by more than 0.1% of total market capitalization must require cryptographic dual-key approval from two independent compliance officers.

### 2. The Physical Boundary Constraint: Depository-Locked Balance Verification
Internal databases must never credit tradeable assets without external vault proof:
- **Pre-Allocation Custody Assertion:** `assert(internal_shares <= KSD_verified_vault_balance)`.
- Before an internal balance is converted into a tradeable state on an exchange gateway, the software must verify that the issuer’s central depository account physically holds the underlying assets.

### 3. The Emergency Brake: Automated Outlier Volume Freeze
Trading gateways must automatically freeze anomalous employee accounts:
- Implement automated gatekeepers that monitor employee account volume: if an employee account attempts to sell more than 500% of its historical 30-day average volume within a 60-second window, the gateway must instantly drop the connection and freeze trade routing within 100 milliseconds.

---

## The Archivist's Verdict

> **The Archivist's Assessment:**  
> 
> 1. **What looked like the mistake:** A back-office clerk selecting "Shares" instead of "KRW" from a dropdown menu during an early morning dividend distribution.
> 2. **What actually failed:** An internal ledger architecture that trusted employee accounts implicitly, synthesized $105 billion in phantom stock without verifying central depository vault balances, and allowed unbacked shares to reach an exchange order book.
> 3. **Why reasonable people allowed it to happen:** Management viewed internal ESOP processing as a low-risk administrative routine, while sixteen licensed financial professionals succumbed to the illusion that unbacked numbers on a screen could be converted into permanent wealth without consequence.
> 4. **The point of no return:** 9:31:00 AM on April 6, 2018, when the internal database credited 2.81 billion shares to employee accounts without an external depository sanity check, exposing the fake equity to the open market.
> 5. **Who ultimately carried responsibility:** While sixteen employees received criminal convictions, Samsung Securities absorbed $190 million in losses and a six-month business suspension, prompting South Korea to overhaul its entire naked short-selling and clearing infrastructure.
> 6. **The uncomfortable lesson:** A database that can mint assets without checking the vault is not a ledger—it is a fantasy. When software forgets physical reality, human greed will happily execute the disaster.

---

## Primary Sources & Official Filings

- [Supreme Court of Korea Judgment 2024Da242857](https://www.scourt.go.kr) — Official Civil Damages Ruling on Samsung Securities Phantom Shares.
- [Financial Services Commission (FSC) Administrative Sanction Order (July 2018)](https://www.fsc.go.kr/no010101/72886) — FSC Regulatory Enforcement Docket.
- [Financial Supervisory Service (FSS) Inspection Report](https://www.fss.or.kr) — Official Forensic Post-Mortem on Ghost Share Dividend Distribution.
- [Korea Exchange (KRX) Market Surveillance Report](https://open.krx.co.kr) — KRX Trading Halt & Volatility Interruption Logs.
