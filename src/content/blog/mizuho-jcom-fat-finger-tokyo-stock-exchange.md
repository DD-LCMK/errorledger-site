---
title: "The 1-Yen Stock Order That Broke Tokyo: How Mizuho Securities Sold 610,000 Shares of a Company That Only Had 14,500"
subtitle: "Inside the 16-minute order-entry disaster, the exchange matching software defect that rejected four cancel commands, and the day-trading gold rush that cost $340 million."
description: "On December 8, 2005, a broker typed 'sell 610,000 shares for 1 yen' instead of 'sell 1 share for 610,000 yen'. When Mizuho tried to cancel, the Tokyo Stock Exchange's mainframe dropped the commands—igniting a $340M crisis."
slug: "mizuho-jcom-fat-finger-tokyo-stock-exchange"
pubDate: "2026-08-18"
incidentDate: "2005-12-08"
category: "money"
archetype: "the-incident"
provenance_tier: 1
provenance_label: "Documented Incident (Tier 1)"
provenance_source: "Tokyo District Court (Ruling Heisei 18 (Wa) No. 24867), Tokyo High Court Appeals Docket (Heisei 22 (Ne) No. 347), and Financial Services Agency (FSA) Sanction Orders"
read_time_minutes: 11
heroImage: "/images/stories/hero-mizuho-jcom.png"
summary_points:
  context: "Mizuho Securities was executing an initial public offering (IPO) sell order for an institutional client on the Tokyo Stock Exchange (TSE) Mothers market for staffing agency J-Com Co."
  trigger: "A broker entered 'sell 610,000 shares at 1 yen' instead of 'sell 1 share at 610,000 yen'—submitting an order 42 times larger than the total equity of the company with zero pre-trade sanity limits."
  fallout: "The TSE matching engine rejected four emergency cancellation requests due to an unpatched system defect, costing Mizuho $340 million in 16 minutes, forcing the TSE president's resignation, and establishing landmark exchange liability."
verdict_question: "Who bears the greatest systemic responsibility for the $340M J-Com disaster?"
verdict_options:
  - id: "tse_software"
    label: "Tokyo Stock Exchange (Software defect that dropped four valid cancellation packets)"
  - id: "mizuho_trader"
    label: "Mizuho Securities (Typographical entry error and bypassed warning dialogs)"
  - id: "day_traders"
    label: "Opportunistic Buyers (Exploited an obvious operational misprice for rapid profit)"
  - id: "systemic_clearing"
    label: "Market Microstructure (Absence of mandatory pre-trade quantity-cap sanity limits)"
tags: ["FinancialDisaster", "FatFinger", "TokyoStockExchange", "TradingGlitch", "WallStreet", "Mizuho", "MarketMicrostructure"]
---

At 9:27 AM on Thursday, December 8, 2005, an institutional sales broker at Mizuho Securities in Tokyo sat down at his trading terminal to execute a routine market-opening transaction.

A corporate client held shares in **J-Com Co., Ltd.** (Ticker: 2462), a small recruitment and temporary staffing agency that was making its public debut on the Tokyo Stock Exchange's high-growth Mothers market that very morning. The client wished to liquidate a single share of stock at the initial limit price of **610,000 yen** (approximately $5,040 USD).

The broker clicked into the order-entry interface. Looking across the dual-field input grid, his fingers transposed the parameters:

- **Intended Order:** Sell **1 share** at **¥610,000**.
- **Executed Order:** Sell **610,000 shares** at **¥1 each**.

As the broker hit the submission key, the trading terminal displayed a generic modal prompt:

> `[WARNING]: The order price differs significantly from the reference price. Proceed? [YES / NO]`

In the high-intensity dealing rooms of the mid-2000s, traders processed hundreds of executions every morning against interfaces that fired uncalibrated warning pop-ups on routine price spreads. Conditioned by chronic **UI alert fatigue**, the broker’s muscle memory took over in a fraction of a second: he tapped the Enter key and transmitted the batch to the Tokyo Stock Exchange.

There was only one catastrophic problem. J-Com was a newly minted venture company. The entire firm had only **14,500 shares in total existence**.

With a single typographical inversion, Mizuho Securities had just offered to sell **4,200% of the entire company** for less than the price of a single postage stamp per share.

---

## The Forensic Discrepancy Matrix

The gap between commercial reality, the broker's intention, and what the electronic exchange accepted reveals an extraordinary absence of basic pre-trade validation controls:

| Order Parameter | Institutional Client Instruction | Entered & Transmitted Value | Actual Corporate Reality | Discrepancy Multiple |
| :--- | :--- | :--- | :--- | :--- |
| **Order Volume** | 1 Share | **610,000 Shares** | 14,500 Total Shares Issued | **42.06× Total Company Equity** |
| **Order Limit Price**| ¥610,000 (~$5,040 USD) | **¥1 (~$0.008 USD)** | Expected IPO Open: ~¥610,000 | **99.9998% Discount** |
| **Gross Order Value**| ¥610,000 ($5,040 USD) | **¥610,000 ($5,040 USD)** | Theoretical Market Cap: ¥8.84B | Nominal match masked volume error |
| **Pre-Trade Filter** | Manual Validation | Bypassed via Alert Fatigue | Zero Exchange Hard Collar | **Failed at both broker and exchange** |

Because the gross nominal value of both orders was identical (**¥610,000**), internal credit and risk-balance checks at Mizuho failed to flag the trade. The firm’s gateway forwarded the packet directly to the Tokyo Stock Exchange mainframe.

At 9:27:04 AM, the Tokyo Stock Exchange matching engine accepted the order without querying a single database constraint. It did not ask if the volume exceeded the total shares listed on the exchange. It simply opened the order book and published the ¥1 ask to the world.

---

## Act I: The Microsecond Gold Rush

Within four seconds of reaching the exchange order book, the impossible ask price of **¥1** appeared on Bloomberg terminals, Quick screens, and retail broker feeds across Asia.

In automated electronic markets, capital does not hesitate to question why an asset is mispriced. It moves instantly to capture the arbitrage spread.

Institutional quantitative desks, proprietary trading firms, and domestic day traders watched the depth-of-market ladder fill with an unfathomable wall of supply: **hundreds of thousands of J-Com shares offered at 1 yen**, while the fair valuation of the company sat north of 600,000 yen per share.

The result was an immediate, market-wide buying frenzy:

1. **The Day-Trader Windfall (The Legend of "BNF"):** Takashi Kotegawa, a 27-year-old retail day trader operating from a bedroom in Chiba Prefecture under the screen handle **BNF**, was monitoring newly listed IPOs on his multi-monitor setup. When the ¥1 ask flashed, Kotegawa immediately realized an unprecedented fat-finger error had occurred. Over the next ten minutes, Kotegawa repeatedly slammed maximum buy orders into his brokerage software, purchasing **7,100 shares**—nearly half the entire real equity of J-Com—at rock-bottom prices. Kotegawa walked away with a verified net profit of **over 2.03 billion yen ($17 million USD)** before lunch.
2. **Institutional Arbitrage:** International investment banks with direct algorithmic connections to the TSE recognized the anomaly within milliseconds. Proprietary desks at Morgan Stanley, Lehman Brothers, Nomura Securities, and Credit Suisse snapped up tens of thousands of shares, executing trades against Mizuho’s runaway order book.

At 9:28:25 AM—barely 80 seconds after transmission—a senior supervisor on Mizuho’s trading desk glanced at the J-Com market feed, turned pale, and realized that his firm was shorting the entire Japanese recruitment sector into oblivion.

The desk supervisor shouted to abort the trade. The broker hammered the cancel key.

---

## Act II: The Mainframe That Refused to Cancel

What followed was not human delay or administrative confusion. It was a catastrophic software defect buried deep inside the Tokyo Stock Exchange’s central matching engine.

When Mizuho transmitted its first electronic cancellation instruction at **9:29:15 AM**, the exchange host computer did not pause the order or clear the remaining unexecuted 500,000+ shares. Instead, the TSE mainframe returned a system rejection message:

```
======================================================================
[TSE-MATCH-GATEWAY] TRANSACTION EXCEPTION REPORT
----------------------------------------------------------------------
TIMESTAMP:   2005-12-08 09:29:15.412 JST
ORDER_ID:    MZ-20051208-2462-00891
STATUS:      REJECTED
ERR_CODE:    001 (PROCESSING_LOCK_CONFLICT)
DIAGNOSTIC:  ORDER CANNOT BE CANCELLED WHILE ACTIVE MATCHING IN PROGRESS
======================================================================
```

Under the Tokyo Stock Exchange’s proprietary software architecture, if an existing limit order was actively matching against incoming opposite-side orders, the engine placed an internal lock on the transaction record. Instead of placing the incoming cancellation packet into an execution queue to be processed the moment the current match completed, the system treated the match-lock as a fatal error and **silently discarded the cancellation instruction**.

Mizuho’s trading desk attempted to cancel the runaway order **three more times in rapid succession**:

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                     THE 4 REJECTED CANCELLATION ATTEMPTS (TELEMETRY LOG)                 │
├──────────────┬────────────────────────┬────────────────────────────────┬─────────────────┤
│ Timestamp    │ Transmission Channel   │ Action Requested               │ TSE Response    │
├──────────────┼────────────────────────┼────────────────────────────────┼─────────────────┤
│ 09:29:15 JST │ FIX Electronic Gateway │ Emergency Cancel Order #00891  │ REJECTED (001)  │
│ 09:30:22 JST │ Secondary Direct Port  │ Force Cancel Remaining Volume  │ REJECTED (001)  │
│ 09:33:04 JST │ Super-User Console     │ Immediate Abort & Flush Queue  │ REJECTED (001)  │
│ 09:35:18 JST │ Terminal Re-Route      │ Order Withdrawal Notice        │ REJECTED (001)  │
└──────────────┴────────────────────────┴────────────────────────────────┴─────────────────┘
```

Panicked Mizuho managing directors picked up the direct emergency hotline to the Tokyo Stock Exchange Market Operations Control Center. They explained that 610,000 shares of a 14,500-share company were actively dumping into the market, and pleaded with exchange officials to manually pull the order from the matching engine or declare an immediate emergency trading halt in J-Com.

The TSE floor managers refused.

Exchange officials informed Mizuho that exchange operating rules strictly prohibited manual administrative intervention in automated market order books during live sessions.

For **sixteen continuous minutes**, while Mizuho watched helplessly, the TSE matching engine systematically ground through the order, executing 96,436 phantom shares against buyers across the globe.

---

## Primary Judicial Exhibit: Tokyo District Court Findings

During the subsequent multi-year litigation, judicial discovery unsealed internal TSE technical audits, establishing that the exchange had known about the cancellation flaw prior to the incident:

> ### 🏛️ JUDICIAL RECORD EXHIBIT (Tokyo District Court Docket: Heisei 18 (Wa) No. 24867)
> 
> *"The evidence demonstrates that the Tokyo Stock Exchange's trading system contained a fundamental architectural defect: when a cancellation order was received for an order undergoing simultaneous execution, the program was designed to treat the cancellation as an error and discard it entirely, rather than queuing it for subsequent execution.*
> 
> *The defendant (Tokyo Stock Exchange) had identified this software behavior during previous system upgrades but failed to deploy a patch or establish manual intervention protocols. The Exchange’s failure to process valid cancellation orders constituted a severe structural breach of its operational duty to provide a reliable trading venue."*
> 
> **— Presiding Judge, Tokyo District Court (Civil Division 8)**

---

## Act III: The Settlement Squeeze & The $340M Buyback

By 9:43 AM, the order had finally exhausted its execution run. The carnage on the exchange tape was historic:

- **96,436 shares** had been matched and traded.
- The company had only issued **14,500 shares**.
- Mizuho Securities was legally short **81,936 shares of stock that did not exist in the physical universe**.

Under the rules of the Japan Securities Clearing Corporation (JSCC), equity trades operated on a mandatory **T+3 physical settlement cycle**. By Tuesday morning, Mizuho was legally required to deliver 96,436 real share certificates to the clearinghouse. 

If Mizuho defaulted on settlement, the clearinghouse would freeze the firm's trading licenses, triggering a cascading liquidity crisis across the Japanese banking sector.

Mizuho desperately attempted to borrow shares over the weekend through institutional stock-lending desks, but there were simply no shares to borrow. Over 90% of the company's real float was locked in founding executive trusts.

With physical delivery impossible, the JSCC invoked emergency settlement protocols: Mizuho was forced to execute a mandatory **cash buy-back** from every market participant who had purchased the erroneous shares, priced at the statutory maximum limit-high price: **¥772,000 per share**.

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                         THE FINAL FINANCIAL RECKONING                                    │
├────────────────────────────────────────────────────────┬─────────────────────────────────┤
│ Gross Erroneous Execution Volume                       │ 96,436 Shares                   │
│ Average Mizuho Sell Execution Price                    │ ~¥6,120 per share               │
│ Mandatory JSCC Buyback Settlement Price                │ ¥772,000 per share              │
│ Per-Share Loss on Phantom Short Positions              │ -¥765,880 per share             │
├────────────────────────────────────────────────────────┼─────────────────────────────────┤
│ TOTAL NET REALIZED LOSS INCURRED BY MIZUHO             │ ¥40,700,000,000 ($340,000,000)  │
│ Realized Profit Captured by Day Trader "BNF"           │ +¥2,030,000,000 ($17,000,000)   │
│ Day's Decline in Nikkei 225 Benchmark Index            │ -1.72% (Market-wide contagion)  │
└────────────────────────────────────────────────────────┴─────────────────────────────────┘
```

In sixteen minutes of electronic trading, Mizuho Securities had incinerated **40.7 billion yen ($340 million USD)**—wiping out the entire annual profit of its investment banking division.

---

## Act IV: The Judicial Reckoning & 70% Exchange Liability

The disaster sent shockwaves through the Japanese financial establishment, triggering resignations, regulatory overhauls, and seven years of bitter courtroom warfare.

### 1. Executive Resignations & FSA Sanctions
On December 20, 2005, Tokyo Stock Exchange President **Takuo Tsurushima**, along with Senior Managing Director Sadao Yoshino and Director Tomio Amano, resigned in disgrace after an independent FSA audit revealed that the TSE had actively concealed the matching engine’s cancel-order defect from member brokerages.

The Financial Services Agency issued severe administrative sanctions against both entities:
- **Mizuho Securities:** Sanctioned for inadequate pre-trade risk controls and failure of internal supervision.
- **Tokyo Stock Exchange:** Ordered to suspend new listings, overhaul its entire software engineering division, and rebuild its trading infrastructure from the ground up.

### 2. The 7-Year Landmark Lawsuit
Mizuho Securities refused to absorb the loss alone, filing a 41.5 billion yen lawsuit against the Tokyo Stock Exchange in Tokyo District Court.

The legal battle centered on a critical question of market infrastructure law: **Does a stock exchange owe a legal duty of care to ensure that its electronic software executes basic order cancellations?**

- **December 4, 2009 (Tokyo District Court):** The court ruled in Mizuho's favor, finding that the TSE's software defect was the primary proximate cause of the runaway loss. The court assigned **70% of the liability to the Tokyo Stock Exchange** and 30% to Mizuho, ordering the TSE to pay **10.7 billion yen ($115 million USD)** in damages.
- **July 24, 2012 (Tokyo High Court):** The High Court rejected the TSE’s appeal, ruling that the exchange’s refusal to manually halt trading when informed of an obvious software failure constituted gross operational negligence. The court increased the TSE’s payout to **16.5 billion yen (approx. $200 million USD with interest)**.

---

## The Archivist's Verdict

> **The Archivist's Assessment:**  
> 
> 1. **What looked like the mistake:** An individual broker suffering from morning alert fatigue transposing order fields, typing "sell 610,000 shares at 1 yen" instead of "sell 1 share at 610,000 yen."
> 2. **What actually failed:** A matching engine architecture that lacked basic pre-trade risk checks—accepting an order for 42 times a company's entire capitalization without a price-collar limit—coupled with a known software defect that systematically discarded valid cancellation commands during active execution.
> 3. **Why reasonable people allowed it to happen:** Brokerage terminals normalized alert fatigue with constant uncalibrated popups, while exchange software architects prioritized raw matching throughput over cancel-queue integrity, assuming catastrophic order errors were too rare to warrant automated trade-rejection limits.
> 4. **The point of no return:** 9:29:15 AM on December 8, 2005, when the TSE server returned `ERROR 001` and dropped Mizuho's first cancellation request instead of placing the order on hold.
> 5. **Who ultimately carried responsibility:** Japanese courts placed 70% of the financial liability directly on the Tokyo Stock Exchange, establishing the legal precedent that an exchange's central matching engine must guarantee reliable trade-cancellation processing under load.
> 6. **The uncomfortable lesson:** In high-speed financial markets, human errors are inevitable. The true danger is an infrastructure that strips away safety interlocks in the pursuit of execution speed. When an exchange disables its own emergency brakes, a single keystroke becomes an unstoppable financial catastrophe.
