---
title: "Cloudflare HTML Edge Parser Buffer Overflow Memory Leak Key Exposure: How a Single Character Bug Leaked Millions of Users' Secrets"
meta_title: "Cloudbleed: Cloudflare Parser Buffer Overflow Leak"
description: "A single-character bug in Cloudflare's HTML parser caused edge servers to leak passwords, cookies, and API keys from millions of websites for five months before discovery."
pubDate: 2026-07-17
tags: ["cloudflare", "buffer-overflow", "memory-leak", "data-exposure", "edge-computing"]
slug: "cloudflare-html-edge-parser-buffer-overflow-memory-leak-key-exposure"
---

# Cloudflare HTML Edge Parser Buffer Overflow Memory Leak Key Exposure: How a Single Character Bug Leaked Millions of Users' Secrets [Status: RESOLVED]

| Field | Value |
| :--- | :--- |
| **Company** | Cloudflare |
| **Date** | February 17, 2017 (discovered); September 22, 2016 (introduced) |
| **Status** | Resolved |
| **Category** | Edge Server Memory Leak / Data Exposure Vulnerability |
| **Root Cause** | Buffer overrun in HTML parser caused by equality operator (==) instead of greater-than-or-equal-to (>=) in boundary check, activated by a parser migration that changed the memory buffering model |
| **Operational Impact** | HTTP cookies, authentication tokens, passwords, API keys, and POST bodies from millions of proxied websites leaked through edge server responses for approximately five months; leaked data cached by search engines |
| **Official RCA** | [Cloudflare Incident Report](https://blog.cloudflare.com/incident-report-on-memory-leak-caused-by-cloudflare-parser-bug/) |

---

### The Incident

On February 17, 2017, a Cloudflare HTML edge parser buffer overflow memory leak key exposure was discovered by Tavis Ormandy of Google's Project Zero. Ormandy was performing routine fuzzing tests when he noticed that certain HTTP requests passing through Cloudflare's reverse proxy were returning corrupted web pages containing blocks of uninitialized memory. That memory contained sensitive data from other websites' HTTP sessions—passwords, authentication tokens, cookies, API keys, and private messages—all being served to unrelated users in plain text.

The vulnerability had been silently active since September 22, 2016, when Cloudflare deployed its Automatic HTTPS Rewrites feature. For approximately five months, every HTTP response processed by an affected Cloudflare edge server had a chance of leaking memory contents from adjacent sessions. The flaw was a single-character coding error in the HTML parser's buffer boundary check: an equality operator (`==`) where a greater-than-or-equal-to operator (`>=`) should have been used. This allowed the parser's read pointer to overshoot the allocated buffer and return whatever data resided in the adjacent memory—data that could belong to any other customer whose traffic was being processed by the same physical server.

The leaked data was not confined to the original HTTP responses. Search engines including Google, Bing, and Yahoo crawled and cached pages containing leaked memory fragments, creating a persistent, indexed record of sensitive data that required coordinated purge operations across multiple search engine operators.

Cloudflare [disabled the three affected features within 47 minutes](https://blog.cloudflare.com/incident-report-on-memory-leak-caused-by-cloudflare-parser-bug/) of receiving Ormandy's report and [deployed a full global patch in under seven hours](https://blog.cloudflare.com/incident-report-on-memory-leak-caused-by-cloudflare-parser-bug/). The company publicly disclosed the incident on February 23, 2017.

**Timeline of Events:**

- **September 22, 2016** — Cloudflare deploys the Automatic HTTPS Rewrites feature, introducing the vulnerable code path into production. The buffer overrun condition becomes exploitable.
- **February 17, 2017** — Tavis Ormandy (Google Project Zero) discovers corrupted pages containing sensitive data during fuzzing tests. He contacts Cloudflare immediately.
- **February 18, 2017, ~00:00 UTC** — Cloudflare begins internal investigation.
- **February 18, 2017, ~00:47 UTC** — Cloudflare disables Email Obfuscation, Server-side Excludes, and Automatic HTTPS Rewrites globally. Memory leak stops within 47 minutes of notification.
- **February 18, 2017, ~07:00 UTC** — Underlying parser bug fully patched and deployed across all edge servers globally.
- **February 18–23, 2017** — Cloudflare coordinates with Google, Bing, and Yahoo to locate and purge cached copies of leaked data from search engine indexes.
- **February 23, 2017** — Cloudflare publishes a [detailed public incident report and post-mortem](https://blog.cloudflare.com/incident-report-on-memory-leak-caused-by-cloudflare-parser-bug/).

---

### Systems Affected & Operational Impact

The vulnerability resided in **Cloudflare's edge server HTML parsing pipeline**, specifically in the interaction between a legacy Ragel-based parser and a newer parser called cf-html.

**Affected Features:**
Three Cloudflare features required HTML content to be parsed and modified at the edge before being served to end users:
- **Email Obfuscation:** Rewrites email addresses in page source to prevent scraping by bots.
- **Server-side Excludes:** Hides specific HTML content from visitors with suspicious IP addresses.
- **Automatic HTTPS Rewrites:** Converts HTTP links to HTTPS within page content to prevent mixed-content warnings.

All three features invoked the HTML parser at the edge. Any website proxied through Cloudflare with at least one of these features enabled was potentially affected.

**Data Exposed:**
When the parser overran its buffer, the edge server returned uninitialized memory from its own address space. Because Cloudflare edge servers process HTTP requests for thousands of different websites simultaneously, this memory could contain data from any customer's active session, including:
- HTTP cookies and session tokens
- Authentication credentials and passwords
- HTTP POST bodies (including form submissions)
- API keys and OAuth tokens
- Private messages and user-submitted content

**What Was Not Leaked:**
Cloudflare confirmed that [customer SSL/TLS private keys were not exposed](https://blog.cloudflare.com/incident-report-on-memory-leak-caused-by-cloudflare-parser-bug/). SSL termination was handled by an isolated NGINX instance whose memory space was separate from the HTML parser's process.

**Search Engine Amplification:**
The leaked memory appeared in HTTP responses that were subsequently crawled and indexed by search engines. This meant that sensitive data—passwords, tokens, private messages—could be discovered through targeted search queries. Cloudflare worked with search engine operators to [purge cached pages](https://blog.cloudflare.com/quantifying-the-impact-of-cloudbleed/) containing leaked data before the public disclosure.

**Scope:**
While millions of websites use Cloudflare's reverse proxy, the memory leak was only triggered when the HTML parser was invoked by one of the three affected features. Cloudflare stated that the greatest period of impact was between February 13 and February 18, 2017, when approximately [one in every 3.3 million HTTP requests](https://blog.cloudflare.com/quantifying-the-impact-of-cloudbleed/) through Cloudflare could have resulted in memory leakage.

---

### The Technical Failure

The vulnerability was a **buffer overrun** caused by the interaction between two generations of HTML parsers operating on Cloudflare's edge servers.

**The Parser Architecture:**
Cloudflare used a state machine generated by [Ragel](https://en.wikipedia.org/wiki/Ragel) to parse and transform HTML content at the edge. Ragel generates C code from a high-level state machine definition, producing efficient but complex parsers. In parallel, Cloudflare was developing a new internal parser called **cf-html** as a replacement.

**The Latent Bug:**
The Ragel-generated parser contained a boundary check that used an equality operator (`==`) instead of a greater-than-or-equal-to operator (`>=`) when testing whether the read pointer had reached the end of the input buffer. Under normal conditions—when the buffer pointer advanced by exactly one byte at a time—the `==` check worked correctly. But when the pointer advanced by more than one byte in a single step (as happens with certain multi-byte HTML constructs), the pointer could skip past the exact boundary value. The `==` check would evaluate to false, and the parser would continue reading memory beyond the allocated buffer.

**The Activation Trigger:**
This bug had existed in the Ragel parser for years without causing data leakage. The reason: under the old architecture, the HTML parser operated within NGINX-managed memory buffers. NGINX's buffer management allocated extra padding after the working buffer, meaning that even when the pointer overshot, it would read harmless padding bytes rather than sensitive data from other requests.

When Cloudflare introduced the **cf-html** parser, the memory buffering model changed. The new architecture allocated buffers without the same padding guarantees. Now, when the Ragel parser's pointer overshot the boundary:

1. **It read past the allocated buffer** into adjacent memory on the heap.
2. **That adjacent memory contained live data** from other HTTP requests being processed concurrently on the same edge server.
3. **The parser returned this data** as part of its output, which was then served to the requesting user as part of the HTTP response body.

**The Single-Character Fix:**
The remediation was straightforward: replacing `==` with `>=` in the boundary check. This ensured that the parser would stop reading regardless of whether the pointer landed exactly on the boundary or overshot it. The fix was a single-character change in the source code.

**Why It Persisted:**
The vulnerability was active for approximately five months (September 22, 2016, to February 18, 2017) because:
- The bug produced no crashes, errors, or log entries on the server side.
- The leaked data appeared as random binary noise appended to otherwise normal HTML responses.
- The volume of leaking requests was low relative to total traffic, making statistical detection unlikely.
- The bug only activated when specific sequences of malformed HTML triggered the multi-byte pointer advance in the Ragel parser.

---

### Vendor Response & Evolution

**Immediate Mitigation (47 Minutes):**
Upon receiving Tavis Ormandy's report, Cloudflare's security team began investigating. Within [47 minutes](https://blog.cloudflare.com/incident-report-on-memory-leak-caused-by-cloudflare-parser-bug/), they disabled all three features that invoked the vulnerable parser—Email Obfuscation, Server-side Excludes, and Automatic HTTPS Rewrites—globally across all edge servers. This stopped the memory leak immediately.

**Full Patch (Under 7 Hours):**
Cloudflare engineering deployed a [global fix to the underlying parser bug in under seven hours](https://blog.cloudflare.com/incident-report-on-memory-leak-caused-by-cloudflare-parser-bug/). The three disabled features were subsequently re-enabled with the patched parser.

**Search Engine Coordination:**
Between February 18 and February 23, Cloudflare worked with Google, Bing, Yahoo, and other search engine operators to identify and remove cached copies of HTTP responses that contained leaked memory data. Cloudflare reported that they identified and purged cached data from search engine indexes before the public disclosure.

**Public Disclosure (February 23, 2017):**
Cloudflare published a [detailed post-mortem](https://blog.cloudflare.com/incident-report-on-memory-leak-caused-by-cloudflare-parser-bug/) explaining the technical root cause, the scope of the vulnerability, and the remediation steps taken. The company stated that they found [no evidence of malicious exploitation](https://blog.cloudflare.com/incident-report-on-memory-leak-caused-by-cloudflare-parser-bug/) prior to the fix.

**Customer Guidance:**
Cloudflare recommended that affected customers reset passwords and enable two-factor authentication as precautionary measures, even though no exploitation evidence was found.

**Structural Improvements:**
In the aftermath, Cloudflare accelerated its migration away from the legacy Ragel parser. The incident highlighted the risks of operating two parser architectures in parallel with different memory management assumptions, and reinforced the need for memory-safe parsing in edge computing environments.

---

### Engineering Analysis & Historical Comparisons

**Why This Incident Matters:**

The Cloudflare Cloudbleed incident remains one of the most technically significant data exposure events in the history of internet infrastructure. For security engineers, cloud architects, and operations teams, it surfaces three fundamental lessons:

1. **Single-Character Bugs Can Have Global Impact:** The root cause was a one-character coding error—`==` instead of `>=`. This microscopic flaw, hidden in auto-generated C code from a Ragel state machine, was sufficient to leak sensitive data from millions of websites for five months. The incident demonstrates that critical vulnerabilities can exist below the threshold of code review visibility, especially in generated or transpiled code where the relationship between the source definition and the compiled output is non-obvious.

2. **Parser Migrations Create Invisible Failure Surfaces:** The bug existed in the Ragel parser for years without causing harm. It only became exploitable when the cf-html parser migration changed the underlying memory management model. This pattern—where a latent defect becomes active due to an unrelated architectural change—is one of the most dangerous failure modes in software engineering. Neither the old parser nor the new parser was individually defective; the vulnerability existed only in their interaction.

3. **Shared Infrastructure Amplifies Exposure:** Cloudflare's value proposition depends on serving millions of websites through shared edge servers. The same architectural decision that makes Cloudflare efficient—processing requests for thousands of websites on the same physical server—also meant that a memory leak in one customer's parsing path could expose another customer's authentication tokens. This is a fundamental tension in multi-tenant edge computing: the efficiency of sharing creates the blast radius of leaking.

**Historical Parallels:**

- **Heartbleed (CVE-2014-0160, April 2014):** The Cloudbleed incident is directly compared to [Heartbleed](https://en.wikipedia.org/wiki/Heartbleed), the OpenSSL buffer overread vulnerability that allowed attackers to read up to 64KB of server memory per request. Both vulnerabilities involved reading memory beyond an allocated buffer due to missing bounds checks. However, Heartbleed affected any server running vulnerable OpenSSL, while Cloudbleed was concentrated on Cloudflare's shared edge infrastructure—making the scope narrower but the data density per leak potentially higher.

- **Facebook Access Token Exposure (September 2018):** A vulnerability in Facebook's "View As" feature exposed access tokens for approximately 50 million user accounts. Like Cloudbleed, the exposure was caused by a logic error that leaked authentication state—but Facebook's incident was confined to a single platform, whereas Cloudbleed affected the authentication state of every website proxied through Cloudflare's affected edge servers.

- **Fastly CDN Global Outage (June 2021):** While not a data leak, Fastly's global outage demonstrated how a single configuration error in a CDN's edge infrastructure can cascade globally. Both the Fastly outage and Cloudbleed highlight the systemic risks of CDN monocultures: when infrastructure is sufficiently centralized, any flaw—whether availability or confidentiality—affects a disproportionate share of the internet.

The common thread across these incidents is the **asymmetry between defect severity and defect visibility**. The most dangerous infrastructure vulnerabilities are not the ones that cause crashes—they are the ones that silently corrupt data integrity or leak sensitive information without generating any operational signal. Cloudbleed ran for five months precisely because the bug produced no errors, no crashes, and no log entries. It was only discovered because a single researcher happened to notice binary noise in an HTTP response.

---

### References

*   [Cloudflare Official Incident Report — Post-Mortem and Root Cause](https://blog.cloudflare.com/incident-report-on-memory-leak-caused-by-cloudflare-parser-bug/)
*   [Google Project Zero — Issue 1139 Tracking Page](https://bugs.chromium.org/p/project-zero/issues/detail?id=1139)
*   [Cloudflare Official — Quantifying the Impact of Cloudbleed](https://blog.cloudflare.com/quantifying-the-impact-of-cloudbleed/)
*   [Ragel Parser State Machine Language Documentation](https://en.wikipedia.org/wiki/Ragel)
*   [Wikipedia — Cloudbleed Data Exposure Incident Overview](https://en.wikipedia.org/wiki/Cloudbleed)
*   [Wikipedia — Heartbleed Vulnerability Details (CVE-2014-0160)](https://en.wikipedia.org/wiki/Heartbleed)

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Cloudflare HTML Edge Parser Buffer Overflow Memory Leak Key Exposure: How a Single Character Bug Leaked Millions of Users' Secrets",
  "description": "A single-character bug in Cloudflare's HTML parser caused edge servers to leak passwords, cookies, and API keys from millions of websites for five months before discovery.",
  "datePublished": "2026-07-17",
  "author": {
    "@type": "Organization",
    "name": "ErrorLedger"
  },
  "about": {
    "@type": "Thing",
    "name": "cloudflare"
  }
}
</script>