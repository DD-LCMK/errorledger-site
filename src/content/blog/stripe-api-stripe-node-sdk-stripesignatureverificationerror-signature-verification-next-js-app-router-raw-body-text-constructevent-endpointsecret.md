---
pipeline_contract_version: "21.0"
meta_title: "How to Fix Stripe Node SDK StripeSignatureVerificationError Next.js App Router"
meta_description: "Learn how to resolve the StripeSignatureVerificationError in Next.js App Router by parsing the raw request body text before constructing the event."
slug: "stripe-api-stripe-node-sdk-stripesignatureverificationerror-signature-verification-next-js-app-router-raw-body-text-constructevent-endpointsecret"
validated_environments:
  - "Next.js App Router Route Handlers"
  - "Next.js Pages Router API Routes"
  - "Express Middleware Parser Context"
  - "AWS Lambda Gateway Events"
---

# How to Fix Stripe Node SDK StripeSignatureVerificationError Next.js App Router

## Quick Diagnosis

*   ✓ Did you configure a webhook endpoint in Stripe and receive a `400 Bad Request` or `StripeSignatureVerificationError`?
*   ✓ Are you trying to verify the webhook inside Next.js App Router using standard `await request.json()`?
*   ✓ Is the local signature hash failing to match the hash transmitted within the `stripe-signature` header?

---

## Environment

The Stripe signature verification middleware runs server-side across environments including Next.js App Router Route Handlers, Next.js Pages Router API Routes, Express Middleware Parser Contexts, and AWS Lambda Gateway Events.

| Next.js Router Architecture | Payload Parsing Method | Signature Verification Function | API Verification Status |
| :--- | :--- | :--- | :--- |
| Pages Router API Route | `bodyParser = true` (default) | `stripe.webhooks.constructEvent(req.body, ...)` | Failed (Parsed object instead of raw text) |
| Pages Router API Route | `bodyParser = false` (explicit) | `stripe.webhooks.constructEvent(rawBody, ...)` | Success (Raw request buffer matches signature) |
| App Router Route Handler | `await request.json()` | `stripe.webhooks.constructEvent(bodyText, ...)` | Failed (JSON parser mutates raw string stream) |
| App Router Route Handler | `await request.text()` | `stripe.webhooks.constructEvent(bodyText, ...)` | Success (Raw text stream matches signature) |

---

## Minimal Repro

Under HMAC-SHA256 signature verification architecture, Stripe computes a cryptographic hash of the raw HTTP request payload using your unique webhook signing secret (`whsec_...`). This hash is transmitted in the `stripe-signature` header. The receiver must compute the identical hash using the exact, unmodified raw byte stream of the request body and verify that it matches. In Next.js App Router, calling `request.json()` or utilizing parsed body objects parses the payload into a JavaScript object, altering character spacing, key orders, and structural representations. When the parsed or modified payload is passed to `constructEvent`, the locally computed HMAC hash fails to match the header value, triggering a `StripeSignatureVerificationError` and failing verification. Resolving the body retrieval to read raw text streams guarantees payload parity.

```javascript
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  // CRASH: Ingesting request as parsed JSON instead of raw byte stream
  const body = await request.json(); 
  const sig = request.headers.get('stripe-signature');

  // Local HMAC verification fails due to string serialization modifications
  const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  return NextResponse.json({ received: true });
}
```

```text
StripeSignatureVerificationError: No valid signature found for payload.
    at Object.constructEvent (index.js:52:12)
    at POST (route.js:10:34)
```

---

## Resolution

When resolving Stripe verification exceptions, developers can choose between two main structural options depending on their Next.js router framework.

### Option A: Read request.text() in Next.js App Router (Recommended)
If you deploy using the Next.js App Router, retrieving the raw request body stream directly as plain text prevents object parsing mutations and satisfies HMAC verification requirements.

1. Read the raw request body as string text using `await request.text()`.
2. Retrieve the `stripe-signature` header from headers.
3. Pass the raw body text and signature into `stripe.webhooks.constructEvent()`.

```javascript
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  // Correctly capture raw unparsed text body
  const bodyText = await request.text();
  const sig = request.headers.get('stripe-signature');
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    // Construct event using pristine text body
    const event = stripe.webhooks.constructEvent(bodyText, sig, endpointSecret);
    return NextResponse.json({ received: true, id: event.id });
  } catch (err) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }
}
```

### Option B: Disable bodyParser in Next.js Pages Router
If you route webhooks using the legacy Pages Router, explicit configuration is necessary to prevent default body parsing middleware from corrupting the raw request buffer.

1. Export a `config` object in your API route file to set `bodyParser: false`.
2. Parse the incoming request stream into a raw buffer, then pass it to `constructEvent`.

```javascript
import Stripe from 'stripe';

// Disable default JSON parsing middleware
export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // Retrieve raw buffer stream...
  const rawBody = await getRawBody(req);
  const sig = req.headers['stripe-signature'];

  const event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  res.status(200).json({ received: true });
}
```

### When This Fix Won't Work
If the webhook signing secret environment variable (`STRIPE_WEBHOOK_SECRET`) is configured incorrectly or does not match the active Stripe endpoint secret, verification requests fail. Ensure endpoint secrets match the configured dashboard values.

## Operational Runbook

### Case 1: App Router Webhooks
1. Capture raw request body text using `await request.text()`.
2. Retrieve `stripe-signature` using `request.headers.get('stripe-signature')`.

### Case 2: Pages Router Webhooks
1. Export config with `bodyParser` deactivated.
2. Read the request body as a buffer.

### Rollback Strategy
To roll back this change, restore the previous webhook body parsing code footprint by replacing the `await request.text()` raw stream read with standard JSON parsing (`await request.json()`), remove the `stripe.webhooks.constructEvent` verification wrapper from the handler block, and disable webhook signing secret requirements in your environment variables.

---

## Verification

- [ ] Webhook handler endpoint returns HTTP 200 responses containing verified event ID objects.
- [ ] Application execution logs contain zero StripeSignatureVerificationError console exceptions.
- [ ] Inbound POST request streams resolve successfully without body parser mutation blocks.

### Error Trigger Point Lifecycle

Receive webhook request ➔ Extract signature header ➔ Extract raw request body ➔ Resolve webhook secret ➔ Call constructEvent API [ERROR OCCURS HERE] ➔ Process event type

## References

*   **Stripe Webhook Signing Guide**: https://stripe.com/docs/webhooks/signatures
    *   *Evidence Tier:* Official
    *   *Contribution:* Verified the Stripe webhook payload verification schema, API migration paths, and structural signature modifications.
*   **Next.js Route Handlers Body Access Reference**: https://nextjs.org/docs/app/building-your-application/routing/route-handlers#request-body-stream
    *   *Evidence Tier:* Official
    *   *Contribution:* Verified the server request body stream loading behavior and request-scoped buffer configurations.
*   **Stripe JavaScript GitHub Issue #1532**: https://github.com/stripe/stripe-node/issues/1532
    *   *Evidence Tier:* Community
    *   *Contribution:* Captured the real-world execution symptoms and reproduction parameters of the StripeSignatureVerificationError under Next.js App Router.
