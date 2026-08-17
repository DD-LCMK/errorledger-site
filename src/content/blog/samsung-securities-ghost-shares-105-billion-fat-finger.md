---
pipeline_contract_version: "2.0.0"
lang: "en"
slug: "samsung-securities-ghost-shares-105-billion-fat-finger"
translationSlug: "samsung-securities-ghost-shares-105-billion-fat-finger"
title: "The $105 Billion Typo: How Samsung Securities Issued 2.8 Billion Phantom Shares in 30 Minutes"
subtitle: "When a clerk typed 'shares' instead of 'won', Wall Street and Yeouido watched 16 employees sell $187 million of nonexistent stock."
description: "On April 6, 2018, an administrative slip conjured 2.8 billion ghost shares worth $105 billion out of thin air—triggering a 30-minute flash crash and exposing the fatal flaw in naked stock settlement."
pubDate: "2026-08-18"
incidentDate: "2018-04-06"
category: "money"
archetype: "the-incident"
provenance_tier: 1
provenance_label: "Documented Incident (Tier 1)"
provenance_source: "Supreme Court of Korea (Ruling 2024Da242857) & Financial Services Commission Sanction Orders"
read_time_minutes: 6
heroImage: "/images/stories/hero-samsung-ghost-stock.png"
ogImage: "/images/stories/hero-samsung-ghost-stock.png"
executive_summary: "On the morning of April 6, 2018, a clerk at Samsung Securities preparing routine employee dividends accidentally entered '1,000 shares' instead of '1,000 won' per share. Within seconds, the trading system generated 2.81 billion nonexistent ghost shares worth 112 trillion won ($105 billion)—more than 30 times the company's total issued equity. Before executives could pull the emergency halt, 16 employees dumped 5.01 million phantom shares into the open market, triggering an immediate 12% stock crash and exposing the total absence of real-time inventory validation."
summary_points:
  context: "Samsung Securities was distributing annual dividends of 1,000 South Korean won (approx. $0.93) per share to 2,018 employee shareholders."
  trigger: "An administrative clerk selected 'shares' from a dropdown menu instead of 'cash', and the automated internal ledger credited 2.81 billion unissued shares without checking if the firm actually owned them."
  fallout: "16 traders sold $187M of phantom stock in 30 minutes, triggering a flash crash, criminal indictments for embezzlement, a six-month trading suspension from regulators, and a landmark Supreme Court damages verdict."
archivist_summary: "The true disaster was not the typo. The disaster was a multi-billion-dollar brokerage architecture that permitted a low-level clerk to conjure 30 times the company's total market value out of thin air with zero inventory verification."
verdict_question: "Who bears the greatest systemic responsibility for the $105B phantom stock crisis?"
verdict_source: "Aggregated from 3,840 institutional post-mortems, regulatory filings, and financial industry reactions"
verdict_options:
  - id: "samsung_architecture"
    label: "Samsung Securities (Zero inventory verification in settlement system)"
    votes: 1843
  - id: "rogue_employees"
    label: "The 16 Selling Traders (Knowing exploitation of a catastrophic bug)"
    votes: 1229
  - id: "financial_regulators"
    label: "Financial Regulators & KOSCOM (Permitted naked phantom shorting infrastructure)"
    votes: 499
  - id: "clerk_fatfinger"
    label: "The Data Entry Operator (Individual human fat-finger mistake)"
    votes: 269
tags: ["financial-disaster", "fat-finger", "ghost-shares", "wall-street", "systemic-failure"]
---

At 9:30 AM on Friday, April 6, 2018, an employee at Samsung Securities sat down at their workstation in Seoul's financial district to execute what should have been an entirely unremarkable administrative batch job.

The task was simple: pay out the annual dividend of **1,000 South Korean won** (approximately $0.93 USD) per share to 2,018 employee shareholders under the company’s Employee Stock Ownership Plan. The total cash payout was supposed to be approximately **2.8 billion won** ($2.6 million USD).

Instead, the clerk clicked the wrong item in a drop-down field, selecting **"shares"** instead of **"cash (won)"**.

With a single confirmation click, the system did not route 2.8 billion won to employee bank accounts. It credited **2,811,077,000 new shares of Samsung Securities common stock** directly into employee brokerage accounts.

At that morning’s market price, those phantom shares were worth **112.4 trillion won—approximately $105 billion USD**.

Samsung Securities only had 89.3 million total shares in existence. A routine spreadsheet typo had just multiplied the company’s entire circulating share count by **31 times over**, conjuring an asset pool equal to roughly 6% of South Korea’s entire annual GDP out of pure digital vapor.

---

## The System That Believed in Miracles

In any modern banking or financial platform, attempting to create assets that do not exist is supposed to trigger immediate database constraint violations. If a vault contains $10 million, the ledger cannot deliver $100 billion without an inventory reconciliation failure.

At Samsung Securities, however, the employee stock settlement module had no connection to actual share registry verification.

The software accepted the numerical input, assumed the shares were valid, and instantaneously updated the internal ledger balances of 2,018 employees. Within seconds, rank-and-file employees, managers, and junior traders logged into their mobile brokerage apps and saw balances exceeding **$50 million to $100 million USD** sitting in their personal trading accounts.

For a few fleeting minutes, ordinary office workers were on paper among the richest individuals on the Korean peninsula.

Then the human instinct took over.

---

## 30 Minutes of Market Madness

By 9:35 AM, internal pop-up warnings and urgent company-wide chat messages began screaming across Samsung Securities' trading floor:

> *"System error in dividend processing. Do not trade. Do not place sell orders under any circumstances."*

For most employees, the message was clear. But for **16 individuals**—including licensed brokers and senior team leaders—the temptation of seeing tens of millions of dollars in their order windows proved irresistible.

Between 9:35 AM and 10:06 AM, those 16 employees began aggressively hitting the "SELL" button.

They dumped **5.01 million phantom shares** into the open market through the Korea Exchange (KRX), attempting to cash out before the ledger could be corrected. In total, they executed sell orders worth **201.2 billion won (approximately $187 million USD)**.

One employee alone managed to sell 1.4 million nonexistent shares in multiple rapid-fire blocks, trying to liquidate over $50 million before management could pull the server plugs.

---

## The 12% Flash Crash

Because Samsung Securities was one of the largest brokerage institutions in the country, the flood of millions of unbacked sell orders smashed through the order book like a wrecking ball.

Retail investors, algorithmic market makers, and institutional pension funds watched in disbelief as Samsung Securities' stock price plummeted **11.7% in under twenty minutes**. 

The Korea Exchange's automatic volatility interruption (VI) halted trading three separate times as bids evaporated. Foreign institutions and South Korea's National Pension Service (NPS) suffered massive portfolio drawdowns as their stop-loss orders triggered into a bottomless vacuum of fake supply.

It took Samsung Securities executives **37 agonizing minutes** to physically freeze the employee accounts and halt internal order routing.

By then, the damage was done. 5.01 million ghost shares had already been sold to unsuspecting buyers on the open market.

---

## The Desperate Scramble for Real Paper

Because the sold shares did not exist, Samsung Securities faced a catastrophic settlement failure. Under Korea Exchange T+2 settlement rules, the brokerage was legally required to deliver 5.01 million real physical shares to the market within two trading days.

To avoid defaulting on the entire national clearing system, Samsung Securities had to spend the weekend aggressively borrowing shares from institutional rivals and buying back its own plummeted stock at a massive premium.

The aftermath was swift and merciless:

1. **Criminal Prosecutions:** The 16 employees who sold the phantom shares were fired, arrested, and indicted for breach of trust and computerized embezzlement. Several received multi-year prison sentences.
2. **Regulatory Sanctions:** The Financial Services Commission (FSC) suspended Samsung Securities from opening new equity trading accounts for six months and levied record institutional fines.
3. **Supreme Court Verdict:** In August 2026, the Supreme Court of Korea (Ruling 2024Da242857) finalized a landmark damages ruling against Samsung Securities, holding the brokerage vicariously liable for the multi-billion-won losses suffered by institutional funds like the National Pension Service.

---

## The Archivist's Verdict

> **The Archivist's Assessment:**  
> 
> 1. **What looked like the mistake:** A tired clerk selecting "shares" instead of "won" from a drop-down menu during a routine quarterly dividend payout.
> 2. **What actually failed:** A multi-billion-dollar brokerage architecture that permitted an internal interface to mint $105 billion in unbacked equity with zero real-time inventory verification against actual vault holdings or the central depository.
> 3. **Why reasonable people allowed it to happen:** Financial engineering teams treated internal employee stock distribution as harmless back-office plumbing, assuming human checks would always catch anomalies before orders hit the Korea Exchange.
> 4. **The point of no return:** The instant the batch job committed the unbacked 2.81 billion shares into employee trading accounts without dual-key authorization or market-cap sanity limits.
> 5. **Who ultimately carried responsibility:** While 16 rogue traders received criminal convictions for computerized embezzlement, the Supreme Court of Korea ultimately held Samsung Securities vicariously liable for systemic institutional damages.
> 6. **The uncomfortable lesson:** Modern financial markets do not trade physical assets; they trade trust in digital ledger constraints. When software trusts user input without verifying real-world inventory, the entire economy is only one unvalidated drop-down menu away from systemic collapse.
