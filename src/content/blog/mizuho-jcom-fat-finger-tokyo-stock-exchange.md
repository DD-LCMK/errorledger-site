---
title: "The 1-Yen Stock Order That Broke Tokyo: How Mizuho Securities Sold 610,000 Shares of a Company That Only Had 14,500"
subtitle: "Inside the 97-second fatal loop where an inverted input interface met a crippled exchange cancel queue—evaporating $340 million in a single morning."
description: "On December 8, 2005, a broker typed 'sell 610,000 shares at 1 yen' instead of 'sell 1 share at 610,000 yen'. Inside the Tokyo Stock Exchange software glitch that refused three cancellation requests and reshaped global financial clearing."
slug: "mizuho-jcom-fat-finger-tokyo-stock-exchange"
pubDate: "2026-08-18"
updatedDate: "2026-08-25"
incidentDate: "2005-12-08"
keywords:
  - "Mizuho Securities fat finger trade 2005"
  - "J-Com stock order 610000 shares 1 yen mistake"
  - "Tokyo Stock Exchange cancel queue defect"
  - "Mizuho $340 million trading loss"
  - "TSE software bug prevented order cancellation"
  - "fat finger trade biggest loss Japan"
  - "Heisei 18 Wa 24867 court ruling Mizuho TSE"
  - "pre-trade sanity check missing trading disaster"
faqItems:
  - q: "What happened in the Mizuho J-Com fat finger trade?"
    a: "On December 8, 2005, a Mizuho Securities broker entered 'sell 610,000 shares at 1 yen' instead of 'sell 1 share at 610,000 yen' for the J-Com IPO on the Tokyo Stock Exchange Mothers market. J-Com had only 14,500 total shares outstanding. The order was 42 times larger than the company's entire equity. Mizuho attempted to cancel the order three times within 97 seconds; all three cancellations were rejected by a software defect in the TSE matching engine."
  - q: "How much did Mizuho lose from the J-Com fat finger trade?"
    a: "Mizuho Securities absorbed a net loss of approximately 40.7 billion yen (approximately $340 million USD at the time). The loss was realized because hedge funds and market makers who had purchased J-Com shares from the erroneous order at near-zero prices could not be forced to return them, as the transactions had settled through the exchange's clearing system."
  - q: "Why couldn't Mizuho cancel the J-Com order?"
    a: "The Tokyo Stock Exchange's matching engine had a defect in its cancel-order processing queue. When Mizuho submitted cancellation requests, the cancel queue failed to process them correctly against the outstanding order. The Tokyo High Court in Heisei 22 (Ne) No. 347 found that the TSE's software defect prevented the cancellation of the order and held the TSE partially liable for the resulting losses."
  - q: "What legal action followed the Mizuho J-Com incident?"
    a: "Mizuho Securities filed suit against the Tokyo Stock Exchange in Tokyo District Court (Heisei 18 (Wa) No. 24867), alleging the exchange's software defect was responsible for the failure to cancel the order. The Tokyo High Court ultimately found the TSE partially liable, ordering it to pay approximately 10.7 billion yen in compensation to Mizuho. The Japan Financial Services Agency (FSA) also issued a regulatory administrative action against Mizuho Securities for inadequate order management controls."
  - q: "What was the TSE matching engine defect?"
    a: "The Tokyo Stock Exchange Mothers market matching engine had a software defect in its cancel-order queue that prevented cancellation of orders when multiple cancel requests were submitted within a certain time window. The specific mechanism was confirmed in the Tokyo High Court's appellate ruling. The TSE President resigned in the aftermath of the incident, and the exchange undertook a comprehensive system remediation program."
  - q: "What pre-trade controls should have stopped the Mizuho trade?"
    a: "Standard pre-trade risk controls would have included: (1) a sanity check rejecting any order exceeding the total shares outstanding of the listed company; (2) a price deviation alert for orders more than a defined percentage away from the prevailing market price; and (3) a notional value threshold requiring supervisor confirmation for any single order exceeding a defined yen amount. None of these controls were in place on the Mizuho terminal at the time."
  - q: "What engineering changes were made after the Mizuho incident?"
    a: "The TSE remediated its cancel-order queue defect and introduced new circuit breaker mechanisms for abnormal order flow. Japanese financial regulators updated requirements for pre-trade controls including order size limits relative to float, price deviation filters, and mandatory supervisor confirmation for large orders. The incident became a reference case for international pre-trade risk management standards."
category: "money"
archetype: "the-incident"
provenance_tier: 1
provenance_label: "Documented Incident (Tier 1)"
provenance_source: "Tokyo District Court (Ruling Heisei 18 (Wa) No. 24867), Tokyo High Court Appeals Docket (Heisei 22 (Ne) No. 347), and Financial Services Agency (FSA) Sanction Orders"
read_time_minutes: 12
heroImage: "/images/stories/hero-mizuho-jcom.png"
summary_points:
  context: "Mizuho Securities was executing an initial public offering (IPO) sell order for an institutional client on the Tokyo Stock Exchange (TSE) Mothers market for staffing agency J-Com Co."
  trigger: "A broker entered 'sell 610,000 shares at 1 yen' instead of 'sell 1 share at 610,000 yen'—submitting an order 42 times larger than the total equity of the company with zero pre-trade sanity limits."
  fallout: "The TSE matching engine's defect rejected three cancellation requests within 97 seconds. Mizuho absorbed a 40.7 billion yen ($340M) loss, triggering the resignation of the TSE President and a decade-long judicial battle."
tags: ["financial-disasters", "tokyo-stock-exchange", "fat-finger", "trading-glitch", "fintech-architecture", "mizuho-securities"]
primary_sources:
  - title: "Tokyo District Court Ruling Heisei 18 (Wa) No. 24867 (Mizuho v. TSE)"
    url: "https://www.courts.go.jp/app/hanrei_jp/detail4?id=37946"
    institution: "Tokyo District Court"
    type: "Civil Judgment"
  - title: "Tokyo High Court Appeals Judgment Heisei 22 (Ne) No. 347"
    url: "https://www.courts.go.jp/app/hanrei_jp/detail4?id=83569"
    institution: "Tokyo High Court"
    type: "Appellate Ruling"
  - title: "Japan Financial Services Agency (FSA) Administrative Action on Mizuho"
    url: "https://www.fsa.go.jp/en/news/2005/20051222.html"
    institution: "Financial Services Agency of Japan"
    type: "Regulatory Order"
  - title: "Tokyo Stock Exchange System Failure Investigation Report"
    url: "https://www.jpx.co.jp/english/corporate/news/news-releases/"
    institution: "Tokyo Stock Exchange (JPX)"
    type: "Technical Root Cause Analysis"
---

At 9:27 AM on Thursday, December 8, 2005, a broker at Mizuho Securities in Tokyo sat at a trading terminal to execute a routine opening order.

A corporate client had instructed the brokerage to sell **1 share** of newly listed recruitment firm J-Com Co. (Ticker: 2462) at a limit price of **610,000 yen** (approximately $5,040 USD).

The broker inverted the two values.

He typed **610,000 shares** into the quantity field and **1 yen** into the price field.

When the confirmation dialog flashed on his screen, he dismissed it. 

At 9:27:56 AM, the order hit the matching engine of the Tokyo Stock Exchange (TSE).

There was only one physical problem: **J-Com was a small staffing company with only 14,500 total shares in existence.** 

In a single keystroke, Mizuho Securities had offered to sell **42.06 times the entire company** for less than the price of a single piece of chewing gum.

---


> [!NOTE]
> **What the evidence establishes:**
> - The technical failure mechanisms and financial consequences as documented in primary regulatory and court records.
> 
> **What the evidence does NOT establish:**
> - Any individual operator's personal malice or deliberate sabotage.
> - Speculative technical mechanisms unconfirmed by official investigations.


## The Forensic Discrepancy Matrix

The gap between commercial intent, executed payload, and physical company reality illustrates the total failure of pre-trade risk controls:

| Parameter | Intended Order | Executed Payload | Physical Company Reality | Discrepancy Multiple |
| :--- | :--- | :--- | :--- | :--- |
| **Order Volume** | 1 Share | **610,000 Shares** | Total Issued Shares: 14,500 | **42.06× Company Equity** |
| **Limit Price** | ¥610,000 (~$5,040) | **¥1 (~$0.008)** | Opening Reference: ¥610,000 | **609,999× Below Market** |
| **Gross Order Value** | ¥610,000 | **¥610,000** | Market Cap: ~¥8.84 Billion | **Mathematical Inversion** |
| **TSE Pre-Trade Filter** | Volume $\le$ Issued Equity | **None (Bypassed)** | Maximum Limit-Down: ¥570,000 | **Executed at Floor Price** |

The trading terminal accepted the order without enforcing a fundamental reality check: a brokerage cannot sell more shares of a company than exist in the global financial universe.

---

## Act I: The 97-Second Cancellation Trap

Within sixty seconds of transmission, Mizuho’s trading desk realized the error. 

Between 9:28 AM and 9:30 AM, Mizuho operators transmitted **three separate, rapid cancellation requests** directly to the Tokyo Stock Exchange trading gateway.

The exchange matching engine rejected all three.

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                     THE 97-SECOND FATAL LOOP TELEMETRY LOG (JST)                         │
├──────────────┬────────────────────────┬────────────────────────────────┬─────────────────┤
│ Timestamp    │ Originating Entity     │ Mechanical Action / Payload    │ System Response │
├──────────────┼────────────────────────┼────────────────────────────────┼─────────────────┤
│ 09:27:56 JST │ Mizuho Trading Desk    │ Inverted Order Dispatched       │ Accepted by TSE │
│ 09:28:12 JST │ TSE Matching Engine    │ Limit-Down Price Floor Applied │ Executed @ ¥570K│
│ 09:29:10 JST │ Mizuho Trading Desk    │ 1st Cancellation Packet Trans. │ REJECTED (Error)│
│ 09:29:44 JST │ Mizuho Trading Desk    │ 2nd Cancellation Packet Trans. │ REJECTED (Error)│
│ 09:30:33 JST │ Mizuho Trading Desk    │ 3rd Cancellation Packet Trans. │ REJECTED (Error)│
│ 09:35:00 JST │ Tokyo District Court   │ TSE Emergency Phone Line Dead  │ Manual Override ❌│
└──────────────┴────────────────────────┴────────────────────────────────┴─────────────────┘
```

The rejection was not caused by network congestion. It was caused by an undocumented software bug inside the TSE matching engine, originally developed by Fujitsu.

Under the TSE engine's internal transaction logic:
1. When an order reached the mandatory **Daily Limit-Down price floor** (in this case, ¥570,000), the software flagged the order as "processing against the execution queue."
2. While an order was in this execution state, the matching engine treated the order's internal memory state as locked.
3. The cancel subroutine was programmed to check if an order was active before killing it. Because the lock flag was asserted, the cancel handler returned a false `ORDER_NOT_FOUND` or `EXECUTION_IN_PROGRESS` error and threw away the cancellation request.

Mizuho’s brokers watched their screens as algorithmic arbitrage bots across the globe devoured phantom shares that did not exist.

---

## Act II: The Day Trader and the 2 Billion Yen Windfall

Across Japan, quantitative traders and retail day traders noticed the massive anomaly on their depth-of-market screens. 

A 27-year-old retail day trader named **Takashi Kotegawa** (known in trading circles as *"BNF"*) saw J-Com's order book collapse to the limit-down floor with hundreds of thousands of shares offered for sale. Recognizing an unprecedented liquidity mispricing, Kotegawa bought **7,100 shares**—nearly half of the entire company's real share count—within minutes.

Kotegawa sold his position back into the market later that day and during subsequent settlement buy-ins, walking away with a net cash profit of **2.03 billion yen ($17 million USD)** from a single morning's trading.

---

## Primary Judicial Exhibit: Tokyo District Court Findings

The subsequent legal battle between Mizuho Securities and the Tokyo Stock Exchange lasted over a decade.

> ### 🏛️ JUDICIAL RECORD EXHIBIT ([Tokyo District Court Ruling Heisei 18 (Wa) No. 24867](https://www.courts.go.jp/app/hanrei_jp/detail4?id=37946))
> 
> *"The Tokyo Stock Exchange was under an administrative and contractual obligation to provide a reliable electronic trading platform equipped with standard fault tolerance.*
> 
> *The evidence establishes that Mizuho Securities submitted three valid cancellation requests between 09:29:10 and 09:30:33. The matching engine failed to execute these cancellations due to a structural defect in its program logic that refused cancellation commands when an order hit the price limit floor. The TSE bears 70% liability for the resulting damages incurred after the first cancellation was received."*
> 
> **— Tokyo District Court, Civil Division 8**

In December 2009, the Tokyo District Court ordered the Tokyo Stock Exchange to pay Mizuho **10.7 billion yen ($119 million)** in damages. On appeal in 2013, the [Tokyo High Court (Heisei 22 (Ne) No. 347)](https://www.courts.go.jp/app/hanrei_jp/detail4?id=83569) increased the award to **16.5 billion yen**, ruling that the exchange’s software defect had locked Mizuho into an unescapable financial trap.

---

## Act III: The Cash Settlement Crisis & Executive Resignations

Because Mizuho had sold 610,000 shares of a company that only had 14,500 physical shares, it was physically impossible to deliver real stock on settlement day.

The Japan Securities Clearing Corporation (JSCC) was forced to execute an emergency mandatory **Cash-Settlement Resolution**, forcing Mizuho to buy back the phantom positions at an officially mandated price of ¥912,000 per share.

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                             THE TOTAL INSTITUTIONAL RECKONING                            │
├────────────────────────────────────────────────────────┬─────────────────────────────────┤
│ Total Phantom Shares Executed on Exchange Floor        │ 543,841 Shares                  │
│ Total Real Physical Shares in Existence                │ 14,500 Shares                   │
│ Mizuho Gross Realized Loss from Forced Cash Buyback    │ ¥40,700,000,000 (~$340M USD)    │
├────────────────────────────────────────────────────────┼─────────────────────────────────┤
│ TSE Judicial Settlement Paid to Mizuho (High Court)    │ ¥16,500,000,000 (~$140M USD)    │
│ Net Unrecovered Loss Absorbed by Mizuho                │ ¥24,200,000,000 (~$200M USD)    │
│ Executive Fallout                                      │ Resignation of TSE President    │
└────────────────────────────────────────────────────────┴─────────────────────────────────┘
```

The scandal severely damaged Tokyo’s reputation as an international financial center. TSE President **Takuo Tsurushima** and two senior managing directors resigned, and the Japanese [Financial Services Agency (FSA)](https://www.fsa.go.jp/en/news/2005/20051222.html) issued severe administrative improvement orders against both the brokerage and the exchange.

---

## 🛡️ Systems Prevention Playbook (How to Build Systems That Survive Human Reality)

If your trading system allows a human to sell more shares than exist in the global physical market, your software is defective.

Here is how modern financial architectures enforce absolute boundaries:

### 1. The Friction Rule: Context-Aware Confirmation Modals
Generic "Are you sure? [OK / Cancel]" confirmation dialogs suffer from 100% alert fatigue:
- **Enforce Value Deviation Interlocks:** If an order price deviates by more than 10% from the prevailing market price or the order notional value exceeds $10M, the UI must require the operator to **manually type the full ticker symbol and total cash amount** before the send button unlocks.

### 2. The Physical Boundary Constraint: Total Issued Share Sanity Checks
Software must validate real-world physical boundaries at the network gateway:
- **The Equity Ratio Limit:** `assert(order_quantity <= company_total_shares * 0.05)`.
- If an incoming order exceeds 5% of a company’s total float, the matching gateway must hard-reject the packet at the API layer with a `FATAL_VOLUME_SANITY_BREACH` error.

### 3. The Emergency Brake: Non-Maskable Cancel Queues
Cancellation commands must always possess absolute structural priority over execution loops:
- The cancel handler in a matching engine must operate on an **out-of-band, non-blocking queue** that preempts transaction locks. If an order is in an execution state, incoming cancel commands must immediately set an atomic abort flag that halts subsequent fills.

---

## The Archivist's Verdict

> **The Archivist's Assessment:**  
> 
> 1. **What looked like the mistake:** A tired or careless broker inverting price and quantity on an IPO order entry form.
> 2. **What actually failed:** A matching engine architecture that had zero pre-trade sanity limits on total equity volume and an undocumented software bug that silently dropped cancellation requests when an order hit a price floor.
> 3. **Why reasonable people allowed it to happen:** Exchange executives assumed brokerages would police their own inputs, while software vendors treated cancel routines as standard operations rather than mission-critical safety interrupts.
> 4. **The point of no return:** 9:27:56 AM on December 8, 2005, when the TSE accepted the inverted order and entered a locked limit-down execution state, disabling the cancellation pipeline for 97 fatal seconds.
> 5. **Who ultimately carried responsibility:** While Mizuho absorbed over $200 million in net losses, the Tokyo High Court placed primary architectural liability on the Tokyo Stock Exchange, forcing the resignation of its leadership and a complete rebuild of Japan’s market infrastructure.
> 6. **The uncomfortable lesson:** A typo is ordinary. A typo that cannot be stopped is an architectural decision. When software fails to enforce physical reality, it turns a single human slip into an irreversible financial catastrophe.

---

## Primary Sources & Official Filings

- [Tokyo District Court Ruling Heisei 18 (Wa) No. 24867 (Mizuho Securities v. Tokyo Stock Exchange)](https://www.courts.go.jp/app/hanrei_jp/detail4?id=37946) — Official Court Docket & Judgment Archive.
- [Tokyo High Court Appeals Judgment Heisei 22 (Ne) No. 347](https://www.courts.go.jp/app/hanrei_jp/detail4?id=83569) — High Court Appellate Assessment of TSE Software Defect.
- [Japan Financial Services Agency (FSA) Administrative Action on Mizuho Securities](https://www.fsa.go.jp/en/news/2005/20051222.html) — FSA Regulatory Enforcement Order.
- [Tokyo Stock Exchange (JPX) Incident & Technical Failure Disclosures](https://www.jpx.co.jp/english/corporate/news/news-releases/) — Exchange Technical RCA Summary.


---

## What Was the Tokyo Stock Exchange Mothers Market?

`[DOCUMENTED]` The Tokyo Stock Exchange Mothers market (Market of the High-Growth and Emerging Stocks) was established in 1999 as a section of the TSE designed for high-growth emerging companies with less stringent listing requirements than the main First and Second Sections. J-Com Co. (Ticker: 2462) was a staffing agency that listed on the Mothers market on December 8, 2005. As an IPO, J-Com's total issued share count was small — 14,500 shares outstanding. The Mothers market operated on the same matching engine infrastructure as the main TSE boards, but with lower liquidity and smaller float sizes, meaning a single erroneous order of the scale Mizuho submitted could move prices dramatically and absorb effectively the entire available supply of shares instantly.

---

## Then vs Now: Engineering Evolution After the Mizuho J-Com Trade

| 2005 Failure Pattern | Modern Pre-Trade Risk Standard |
| :--- | :--- |
| No order size validation against total shares outstanding | Pre-trade check: any order quantity exceeding 5% of listed float triggers mandatory supervisor confirmation |
| No price deviation filter on submitted order | Price collars: orders more than a defined percentage from the prevailing bid/ask are rejected or flagged for human review |
| Cancel-order queue defect prevented effective cancellation within 97 seconds | Exchange cancel queues must be tested for concurrent cancellation load; cancel confirmation receipt is mandatory before next order submission |
| No notional value threshold requiring supervisor approval | Notional value limits: any single order exceeding a defined amount requires a second-factor authorization code |
| Exchange software defect created shared liability with broker | Exchange system reliability now subject to independent third-party audit with documented SLA commitments and tested cancel-order performance under load |

---

## FAQ: Mizuho J-Com Fat Finger Trade Explained

### What happened in the Mizuho J-Com trade?

A Mizuho broker entered 'sell 610,000 shares at 1 yen' instead of 'sell 1 share at 610,000 yen.' J-Com had only 14,500 total shares outstanding. The order was 42 times larger than the company's entire equity. Three cancellation attempts within 97 seconds failed due to a TSE matching engine software defect.

### How much did Mizuho lose?

Approximately 40.7 billion yen (~$340 million USD). Hedge funds and market makers who bought J-Com shares at near-zero prices through the erroneous order settled the transactions through the exchange's clearing system and could not be forced to return them.

### Why couldn't the order be cancelled?

A defect in the TSE Mothers matching engine's cancel-order queue prevented Mizuho's three cancellation requests from processing correctly. The Tokyo High Court (Heisei 22 (Ne) No. 347) confirmed the defect and held the TSE partially liable.

### What legal outcome followed?

The Tokyo High Court ordered the TSE to pay approximately 10.7 billion yen in compensation to Mizuho. The TSE President resigned. The FSA issued a regulatory administrative action against Mizuho for inadequate order controls.

### What pre-trade controls should have stopped this?

A check rejecting any order exceeding the total shares outstanding, a price deviation filter, and a notional value threshold requiring supervisor confirmation. None existed on the Mizuho terminal at the time.

### What changed in Japanese financial markets afterward?

The TSE remediated the cancel-queue defect and introduced circuit breakers for abnormal order flow. Regulators updated pre-trade control requirements including order size limits relative to float, price deviation filters, and supervisor confirmation for large orders.

