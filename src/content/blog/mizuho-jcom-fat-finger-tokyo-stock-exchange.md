---
title: "The 1-Yen Stock Order That Broke Tokyo: How Mizuho Securities Sold 610,000 Shares of a Company That Only Had 14,500"
subtitle: "Inside the 16-minute order-entry disaster, the exchange software defect that rejected four cancel commands, and the day-trading gold rush that cost $340 million."
description: "On December 8, 2005, a broker typed 'sell 610,000 shares for 1 yen' instead of 'sell 1 share for 610,000 yen'. When Mizuho tried to cancel, the Tokyo Stock Exchange's servers refused to listen."
slug: "mizuho-jcom-fat-finger-tokyo-stock-exchange"
pubDate: "2026-08-18"
incidentDate: "2005-12-08"
category: "money"
archetype: "the-incident"
provenance_tier: 1
provenance_label: "Documented Incident (Tier 1)"
provenance_source: "Tokyo District Court (Ruling Heisei 18 (Wa) No. 24867), Tokyo High Court Appeals Docket, and Financial Services Agency (FSA) Sanction Orders"
read_time_minutes: 7
heroImage: "/images/stories/hero-mizuho-jcom.png"
summary_points:
  context: "Mizuho Securities was executing an initial public offering (IPO) order for a client on the Tokyo Stock Exchange (TSE) Mothers market for staffing company J-Com Co."
  trigger: "A broker entered 'sell 610,000 shares at 1 yen' instead of 'sell 1 share at 610,000 yen'—submitting an order 42 times larger than the total equity of the company."
  fallout: "The TSE host software rejected four emergency cancellation requests due to an unpatched system defect, costing Mizuho $340 million in 16 minutes and forcing the resignation of the TSE's president."
verdict_question: "Who bears the greatest systemic responsibility for the $340M J-Com disaster?"
verdict_options:
  - id: "tse_software"
    label: "Tokyo Stock Exchange (Software defect that rejected four valid cancel orders)"
  - id: "mizuho_trader"
    label: "Mizuho Securities (Typographical entry error and bypassed warning dialogs)"
  - id: "day_traders"
    label: "Opportunistic Buyers (Exploited an obvious operational misprice)"
  - id: "systemic_clearing"
    label: "Market Microstructure (Absence of mandatory pre-trade risk validation)"
tags: ["FinancialDisaster", "FatFinger", "TokyoStockExchange", "TradingGlitch", "WallStreet", "Mizuho"]
---

At 9:27 AM on Thursday, December 8, 2005, a trading desk at Mizuho Securities in Tokyo received a routine instruction from an institutional client: sell **1 share** of a newly listed staffing agency named J-Com Co., Ltd. at the limit price of **610,000 yen** (roughly $5,040 USD).

The broker sat down at his terminal, looked at the order entry fields, and transposed the numbers.

Instead of ordering the sale of **1 share at 610,000 yen**, he typed:

**Sell 610,000 shares at 1 yen each.**

The terminal displayed a standard pop-up warning dialog: *The order price differs significantly from the reference price.* 

In the high-speed trading environments of the mid-2000s, brokers were routinely inundated with dozens of poorly calibrated false-alarm popups each morning. Conditioned by chronic UI alert fatigue, the broker's muscle memory took over: he clicked through the confirmation dialog and hit transmit.

There was only one problem: J-Com was a modest recruitment agency that had debuted on the Tokyo Stock Exchange's Mothers market that very morning. The entire company had only **14,500 shares in total existence**.

With a single keyboard slip, Mizuho Securities had just offered to sell **42 times the entire equity of the company** for less than the price of a single piece of chewing gum per share.

The Tokyo Stock Exchange's matching engine had no automated pre-trade validation to check whether the order volume exceeded the total shares in existence. It accepted the order without hesitation.

And when Mizuho desperately tried to retract the trade ninety seconds later, the exchange mainframe refused to let them.

---

## The Gold Rush on Screen

Within four seconds of hitting the exchange order book, the impossible ask price of **¥1** flashed across thousands of professional dealing desks and retail trading monitors across Japan.

In automated financial markets, liquidity does not pause to inquire why an asset is mispriced.

Institutional trading algorithms and retail day traders instantly recognized that J-Com shares—which had opened with an estimated fair market value above ¥600,000—were being offered in limitless supply for pennies.

Buy orders flooded the Tokyo Stock Exchange from every corner of the market:

- Individual day traders sitting in home bedrooms began slamming the maximum purchase limits on their personal brokerage software.
- A 27-year-old day trader named Takashi Kotegawa (operating under the online handle **"BNF"**) bought **7,100 shares**—nearly half the entire real company—in under ten minutes, walking away with a personal profit exceeding **2 billion yen ($17 million USD)**.
- Major institutional desks, including Lehman Brothers, Morgan Stanley, and Nomura, scooped up tens of thousands of phantom shares before the opening rotation had stabilized.

On the floor of Mizuho Securities, the dealing desk realized the catastrophic error at **9:29 AM**—barely 1 minute and 25 seconds after submission.

The trader hammered the cancellation key.

---

## The Mainframe That Refused to Cancel

What followed was not human hesitation. It was a fatal software defect in the Tokyo Stock Exchange’s core trading architecture.

When Mizuho transmitted its first emergency cancellation message at 9:29 AM, the TSE host computer did not cancel the remaining 500,000+ unexecuted shares. Instead, the exchange server generated an internal rejection response:

`ERROR CODE 001: ORDER CANNOT BE CANCELLED`

Under the TSE’s proprietary software logic, if an incoming sell order was already in the process of matching against incoming buy orders, the system rejected cancellation commands entirely. Instead of queuing the cancellation instruction behind the active execution block, the mainframe simply threw away the cancel packet.

Mizuho traders attempted to cancel the order **three more times in rapid succession**:

1. **9:30 AM:** Second cancellation transmitted $\rightarrow$ **Rejected by TSE matching engine.**
2. **9:33 AM:** Third cancellation transmitted $\rightarrow$ **Rejected by TSE matching engine.**
3. **9:35 AM:** Fourth cancellation transmitted $\rightarrow$ **Rejected by TSE matching engine.**

Panicked Mizuho managers picked up the direct red phone to the Tokyo Stock Exchange trading operations center, begging exchange officials to manually pull the order from the central matching engine or declare an emergency trading halt in J-Com.

TSE officials refused, stating that exchange policy did not permit manual intervention in automated market order books.

For **sixteen agonizing minutes**, Mizuho’s 610,000 phantom shares were systematically fed into the market, executed against a frenzy of buyers who knew the stock was unbacked by real equity.

---

## The $340 Million Buyback

By 9:43 AM, the disaster was irreversible. Over **96,000 shares** of J-Com had been matched and executed—nearly seven times the number of shares the company had ever issued.

Because Japanese clearing rules enforced strict T+3 physical settlement, Mizuho faced an immediate systemic crisis: the brokerage was legally required to deliver tens of thousands of physical shares it did not own and could not borrow.

To prevent a clearing default that would freeze the Tokyo market, Mizuho was forced into an emergency cash-settlement protocol with the Japan Securities Clearing Corporation (JSCC). 

The brokerage had to buy back the phantom positions from the market at the day's maximum allowable ceiling price (**¥772,000 per share**), paying billions of yen directly to the traders who had bought them for ¥1.

When the dust settled at the end of the trading day:

- Mizuho Securities suffered a net realized loss of **40.7 billion yen (approximately $340 million USD)**.
- The company's parent, Mizuho Financial Group, wrote off the entire quarterly earnings of its securities division.
- The incident wiped out more than 1.5% of the Nikkei 225 index that afternoon as international investors questioned the structural reliability of Japanese market infrastructure.

---

## The Courtroom Reckoning

The fallout destroyed careers and reshaped Asian financial regulations:

1. **Executive Resignations:** On December 20, 2005, Tokyo Stock Exchange President **Takuo Tsurushima** and two senior executive directors resigned in disgrace after an official investigation revealed that the TSE had known about the cancellation software defect for months prior to the incident and failed to patch it.
2. **Regulatory Sanctions:** Japan’s Financial Services Agency (FSA) issued sweeping business improvement orders against both Mizuho Securities for operational control failures and the TSE for negligent system maintenance.
3. **The 7-Year Legal Precedent:** Mizuho sued the Tokyo Stock Exchange in Tokyo District Court for 41.5 billion yen in damages. 

In December 2009, the Tokyo District Court ruled that while Mizuho was negligent in entering the order, the Tokyo Stock Exchange bore **70% of the structural liability** for operating a defective matching engine that ignored valid cancellation commands, ordering the TSE to pay Mizuho **10.7 billion yen ($115 million USD)**.

In July 2012, the Tokyo High Court upheld the decision and increased the TSE’s damages liability to **16.5 billion yen (approx. $200 million USD)**.

---

## The Archivist's Verdict

> **The Archivist's Assessment:**  
> 
> 1. **What looked like the mistake:** A broker transposing order fields during an early-morning IPO opening, entering "sell 610,000 shares at 1 yen" instead of "sell 1 share at 610,000 yen."
> 2. **What actually failed:** An exchange matching engine that lacked basic pre-trade risk checks—accepting a sell order 42 times larger than a company's total issued equity—combined with a known software defect that systematically dropped four valid cancellation commands during active execution.
> 3. **Why reasonable people allowed it to happen:** Brokerage terminals normalized alert fatigue with constant uncalibrated popups, while exchange software architects prioritized raw execution throughput over cancel-queue integrity, assuming catastrophic order errors were too rare to warrant automated trade-rejection limits.
> 4. **The point of no return:** 9:29 AM on December 8, 2005, when the TSE server returned `ERROR CODE 001` and discarded Mizuho's first cancellation request instead of placing the order on hold.
> 5. **Who ultimately carried responsibility:** Japanese courts placed 70% of the financial liability directly on the Tokyo Stock Exchange, establishing the legal precedent that an exchange's central matching engine must guarantee reliable trade-cancellation processing under load.
> 6. **The uncomfortable lesson:** In high-speed financial markets, human errors are inevitable. The true danger is an infrastructure that strips away safety interlocks in the pursuit of execution speed. When an exchange disables its own emergency brakes, a single keystroke becomes an unstoppable financial catastrophe.
