---
pipeline_contract_version: "2.0.0"
title: "The $900 Million Checkbox: How Three People Looked at the Same Screen and Wired an Entire Bank's Money"
subtitle: "Inside the counterintuitive Oracle Flexcube UI mistake that turned a $7.8M interest payment into Wall Street's most expensive misclick."
description: "A confusing enterprise interface, a missed checkbox, and three layers of approval caused Citibank to accidentally wire $894 million to hostile hedge funds. Here is what actually happened."
pubDate: "2026-08-17"
incidentDate: "2020-08-11"
category: "money"
archetype: "the-incident"
provenance_tier: 1
provenance_label: "Documented Incident"
provenance_source: "US District Court SDNY (20-CV-6539) & 2nd Circuit Appeals Records"
read_time_minutes: 6
heroImage: "/images/stories/hero-citibank-wire.png"
ogImage: "/images/stories/hero-citibank-wire.png"
executive_summary: "On August 11, 2020, Citibank attempted to wire a routine $7.8 million interest payment on behalf of Revlon. Instead, due to a counterintuitive checkbox combination in its legacy Oracle Flexcube loan processing software, Citibank accidentally wired $893,934,008.07 of its own balance sheet funds directly to syndicate lenders and hostile hedge funds."
summary_points:
  context: "Citibank was tasked with routing $7.8M in interest while parking $886M in principal inside an internal holding ledger known as a wash account."
  trigger: "Suppressing principal required manually selecting FRONT, FUND, and PRINCIPAL. Operators checked only PRINCIPAL, commanding the software to wire the full principal."
  fallout: "Ten hedge funds refused to return $501M, winning a shock federal court victory before a 2-year appellate battle forced Wall Street to create 'Revlon clauses'."
archivist_summary: "The failure was not leaving two boxes unchecked. The failure was designing a financial system where sending nearly a billion dollars of unbudgeted capital depended on cryptic abbreviations in a 1990s modal window with zero safety interlocks."
verdict_question: "Who bears the greatest responsibility for the $900M wire disaster?"
verdict_options:
  - id: "flexcube_ui"
    label: "Oracle Flexcube UI (Cryptic checkboxes with no clear warnings)"
  - id: "citi_process"
    label: "Citibank Operations (Rubber-stamp approval culture)"
  - id: "hedge_funds"
    label: "The Lenders (Refused to return obvious misdirected payment)"
  - id: "individual_reviewers"
    label: "The Three Operators (Failed to catch unchecked box)"
tags: ["financial-disasters", "citibank", "banking-glitch", "ui-failure", "wall-street"]
slug: "citibank-900-million-checkbox-wire-transfer"
---
On Wednesday morning, August 12, 2020, ten Wall Street hedge funds discovered that **$893,934,008.07** in cash had been wired directly into their accounts from Citibank's own corporate balance sheet.

The cosmetics giant Revlon owed them this debt.

Citibank did not.

The bank had intended to transmit a routine **$7.8 million in accrued interest** on Revlon's behalf. Instead, it had just transferred nearly a billion dollars of its own unbudgeted capital to creditors who were actively suing Revlon in federal court.

It was the largest accidental wire transfer in the history of global banking.

And the entire catastrophe came down to three cryptic checkboxes on an enterprise terminal screen.

---

## The Secret Architecture of the "Wash Account"

To understand how nearly a billion dollars left the building in a single afternoon, you have to look at the enterprise banking software Citibank relied on: **Oracle Flexcube**.

Under the terms of Revlon’s debt agreement, Citibank needed to execute a synthetic restructuring transaction:
1. Revlon was paying **$7.8 million in interest** to its lenders.
2. The remaining **$886 million in principal** was supposed to stay with Citibank, routed into an internal holding ledger known as a **wash account**.

Inside the Oracle Flexcube software, preventing the principal from leaving the building was not a simple toggle.

According to standard operating procedures documented in federal court exhibits, to ensure the principal balance was suppressed and routed to the internal wash account, an operator had to manually check **three specific, separate boxes**:
1. **`PRINCIPAL`**
2. **`FRONT`**
3. **`FUND`**

If an operator checked only `PRINCIPAL`, the software did not suppress the principal. Counterintuitively, the system interpreted checking `PRINCIPAL` on its own as an instruction to pay out the entire principal balance in cash immediately to every lender on the roster.

---

## The Six-Eyes Blindspot

Citibank was well aware that moving hundreds of millions of dollars carried extreme operational risk. To guard against human error, the bank enforced a mandatory **"six-eyes" approval protocol**. Three separate individuals had to inspect and authorize every wire:

1. **The Maker (Wipro Subcontractor in India):** Selected the loan accounts and checked the box labeled `PRINCIPAL`, believing that checking the box applied the wash account rule to the principal. He did not check `FRONT` or `FUND`.
2. **The Checker (Wipro Colleague in India):** Reviewed the transaction summary screen, confirmed the dollar numbers matched Revlon's balance sheet, and clicked approve.
3. **The Approver (Citibank Senior Manager in Delaware):** Looked at the identical Flexcube approval pane, saw two prior approvals already logged, and executed the final digital sign-off.

Six eyes looked at the exact same screen. None of them caught the missing checkboxes. 

The software did not display a warning dialog. It did not pop up a confirmation box asking: *"You are about to transfer $894,000,000 of Citibank's own balance sheet funds to outside creditors. Are you sure?"*

At 6:00 PM EST, the batch file was transmitted to Fedwire. The transfers cleared automatically.

---

## The Morning After

At 9:30 AM on Wednesday, an internal reconciliation accountant spotted an inexplicable hole in Citibank's liquidity ledger: **-$893,934,008.07**.

Emergency recall notices were fired out to all receiving institutions marked *"URGENT: ERRONEOUS PAYMENT"*. 

Some lenders returned the funds. But ten aggressive hedge funds—including Brigade Capital Management and HPS Investment Partners—looked at the wire transfers, looked at the ongoing lawsuits they had filed against Revlon over debt restructuring, and gave a simple one-word answer: **No.**

The hedge funds held onto **$501 million**. Their legal argument was audacious: Revlon owed them this exact amount of money. The fact that Citibank wired it from its own pocket was Citibank's problem.

---

## The Courtroom Shockwave

Citibank sued in the U.S. District Court for the Southern District of New York. The bank assumed that any judge would recognize an obvious mistake and order the funds returned under basic unjust enrichment principles.

In February 2021, federal judge Jesse Furman ruled in favor of the hedge funds under New York's 1991 *Banque Worms* "discharge-for-value" rule. The court held that the lenders were entitled to keep the $500 million, noting that the wire transfers matched the exact cent amount of the outstanding loan balance.

For twenty months, Citibank was forced to write down half a billion dollars while its legal team fought an emergency appeal. Finally, in September 2022, the U.S. Court of Appeals for the Second Circuit overturned the decision, ruling that the lenders had sufficient constructive notice of the error and had to return the capital.

The incident forced the global syndicated loan industry to rewrite standard contracts worldwide, introducing what are now known across Wall Street as **"Revlon Erroneous Payment Clauses."**

---

## The Archivist's Verdict

> **The Archivist's Assessment:**  
> 
> 1. **What looked like the mistake:** A loan operations contractor failing to check two extra boxes (`FRONT` and `FUND`) alongside `PRINCIPAL` in a legacy Oracle Flexcube interface.
> 2. **What actually failed:** A user interface that treated a billion-dollar external wire transfer as the default failure mode of an unsuppressed field, coupled with an approval chain that produced false security rather than independent verification.
> 3. **Why reasonable people allowed it to happen:** Each of the three reviewers in the "six-eyes" chain assumed the previous person had verified the cryptic configuration parameters, converting a triple-check protocol into a rubber-stamp exercise.
> 4. **The point of no return:** 6:00 PM EST on August 11, 2020, when the unverified batch file was transmitted to Fedwire with zero automated threshold warnings.
> 5. **Who ultimately carried responsibility:** While Citibank eventually recovered the principal after two years in appellate court, the bank suffered massive reputational damage and was slapped with a $400 million regulatory consent order for chronic internal risk management failures.
> 6. **The uncomfortable lesson:** Adding human approvers to a broken interface does not multiply security; it divides responsibility. When three people are responsible for catching an obscure checkbox error, nobody is.
