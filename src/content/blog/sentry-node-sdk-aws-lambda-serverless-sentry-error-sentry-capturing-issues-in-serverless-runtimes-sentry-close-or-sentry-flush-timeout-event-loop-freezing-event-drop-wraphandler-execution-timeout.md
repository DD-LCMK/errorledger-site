---
pipeline_contract_version: "21.0"
meta_title: "How to Fix Sentry Events Dropped in Serverless Lambda Functions"
meta_description: "Learn how to resolve dropped Sentry events in AWS Lambda by implementing flush timeouts or utilizing wrapHandler serverless wrappers."
slug: "sentry-node-sdk-aws-lambda-serverless-sentry-error-sentry-capturing-issues-in-serverless-runtimes-sentry-close-or-sentry-flush-timeout-event-loop-freezing-event-drop-wraphandler-execution-timeout"
pubDate: "2026-07-15"
validated_environments:
  - "Express API Server contexts"
  - "Next.js dynamic Route Handlers"
  - "Standalone Node.js scripts"
  - "Serverless Vercel Functions runtime"
---

# How to Fix Sentry Events Dropped in Serverless Lambda Functions

## Quick Diagnosis

*   ✓ Are exception events captured in your Lambda handlers failing to appear in your Sentry dashboard?
*   ✓ Does Sentry work correctly in local testing but drop error telemetry when executed inside serverless containers?
*   ✓ Is your handler returning the response immediately after calling `Sentry.captureException`?

---

## Environment

The Sentry SDK evaluates event queues at runtime, checking transmission queues across Express API Server contexts, Next.js dynamic Route Handlers, Standalone Node.js scripts, and Serverless Vercel Functions runtimes.

| Sentry Integration Wrapper | Flush Operation Executed | Event Loop Status After Return | Sentry Event Delivery Status |
| :--- | :--- | :--- | :--- |
| Omitted (Standard @sentry/node) | No | Frozen Immediately | Failed (Event dropped due to early container execution freeze) |
| Omitted (Standard @sentry/node) | Yes (`await Sentry.flush(2000)`) | Exits after transmission completes | Success (All queued events delivered successfully to Sentry) |
| Included (`@sentry/aws-serverless` `wrapHandler`) | Yes (Automatic) | Exits after helper completes | Success (Automatic wrapper captures exceptions and flushes queue) |

---

## Minimal Repro

Under AWS Lambda's execution lifecycle, the serverless container freezes the execution environment immediately after the handler function returns its response payload. When an error is intercepted and captured using `Sentry.captureException`, the SDK registers the event in an internal memory queue, processing transmission asynchronously. Without awaiting transmission completion, the container freezes before the connection is established. This results in Sentry events being dropped and lost. Awaiting the `Sentry.flush(2000)` method inside a `finally` execution block halts execution flow, forcing the client to transmit queued events before container suspension. Alternatively, wrapping the handler function with Sentry's serverless `wrapHandler` decorator automates flush routines on handler exit.

```javascript
// src/handler.js
const Sentry = require('@sentry/node');

Sentry.init({ dsn: process.env.SENTRY_DSN });

exports.handler = async (event) => {
  try {
    if (!event.body) {
      throw new Error('Empty request payload received.');
    }
    return { statusCode: 200, body: 'Success' };
  } catch (error) {
    // CRASH: Event is queued asynchronously, but Lambda freezes immediately on return
    Sentry.captureException(error);
    return { statusCode: 400, body: error.message }; 
  }
};
```

```text
AWS Lambda Execution Log:
  START RequestId: e87f9872-ea0d-4078-a40f-7b7ba69c27cd
  2026-07-15T00:00:00.000Z - Error: Empty request payload received.
  END RequestId: e87f9872-ea0d-4078-a40f-7b7ba69c27cd
  REPORT RequestId: e87f9872-ea0d-4078-a40f-7b7ba69c27cd Duration: 15.22 ms
  [Sentry event never arrives at Sentry's servers because the container was frozen]
```

---

## Resolution

When resolving dropped telemetry in AWS Lambda, developers can choose between two main structural options depending on whether they use Sentry's native serverless integrations.

### Option A: Await Manual Flush in finally Blocks (Recommended)
If your backend uses the standard `@sentry/node` package, you can force the SDK to empty its memory buffer before container execution pauses by calling flush in a finally block.

1. Restructure the Lambda function to handle logic inside `try/catch` wrappers.
2. Place the `Sentry.flush(2000)` query inside a `finally` execution block.
3. Ensure the handler waits for the flush promise to resolve before returning the response.

```javascript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0
});

export const handler = async (event, context) => {
  try {
    const data = await processIncomingRequest(event);
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    // Capture the exception to the local memory buffer queue
    Sentry.captureException(error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
  } finally {
    // Correct: Force SDK to flush transmission buffers before container freezes
    await Sentry.flush(2000); // Awaits up to 2 seconds
  }
};

async function processIncomingRequest(event) {
  if (!event.id) {
    throw new Error('Invalid project identifier mapping.');
  }
  return { project: event.id };
}
```

### Option B: Use Sentry's Serverless wrapHandler Decorator
If you prefer to automate event capture and flush lifecycles without writing manual try/catch/finally boilerplate, using Sentry's dedicated serverless package is applicable.

1. Install the `@sentry/aws-serverless` package instead of the generic Node library.
2. Initialize Sentry with your project configuration properties.
3. Wrap your exported Lambda handler inside the `Sentry.wrapHandler` function.

```javascript
import * as Sentry from '@sentry/aws-serverless';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0
});

// Correct: Wrap handler to automate dynamic event capture and queue flushing
export const handler = Sentry.wrapHandler(async (event, context) => {
  if (!event.id) {
    throw new Error('Project ID parameter missing from inputs.');
  }
  return { statusCode: 200, body: JSON.stringify({ status: 'active', id: event.id }) };
});
```

### When This Fix Won't Work
If your Lambda function reaches its maximum execution duration limits (timeout), the AWS runtime terminates the container process immediately. The SDK will not have time to execute the `finally` block or call the flush handshake, causing events to be dropped.

## Operational Runbook

### Case 1: Timeout Buffers
1. Ensure the Lambda function timeout is set to a minimum of 5 seconds.
2. Verify that Sentry's flush threshold (e.g. 2000ms) does not exceed the remaining Lambda execution budget.

### Case 2: Verification of SDK Logs
1. Enable `debug: true` in your `Sentry.init` settings during staging tests.
2. Inspect CloudWatch logs to verify event transmission packets are dispatched before container pause.

### Rollback Strategy
To roll back this change, remove the `Sentry.flush()` await queries and `wrapHandler` decorators from your serverless function files, restore the previous asynchronous exception capture statements, and configure standard logging to print errors to stdout.

---

## Verification

- [ ] Captured exceptions reflect completely on Sentry dashboard logs on Lambda execution runs.
- [ ] Handler functions are successfully wrapped inside Sentry's serverless decorators.
- [ ] Verification sweeps confirm that flush timeouts allow event deliveries without blocking runtime executions.

### Error Trigger Point Lifecycle

Load sentry dsn ➔ Initialize sentry sdk ➔ Intercept exception event ➔ Queue payload transmission ➔ Trigger flush execution ➔ Freeze container run environment [ERROR OCCURS HERE]

## References

*   **Sentry AWS Lambda Serverless Integration Guide**: https://docs.sentry.io/platforms/javascript/guides/aws-lambda/
    *   *Evidence Tier:* Official
    *   *Contribution:* Verified Sentry serverless capture specifications, flushing helper parameters, event delivery mechanics, and AWS Lambda container lifetime rules.
*   **Sentry SDK Reference and Methods**: https://docs.sentry.io/platforms/javascript/guides/node/
    *   *Evidence Tier:* Official
    *   *Contribution:* Verified DSN properties, flush parameters, and wrapHandler instrumentation options.
*   **Sentry JavaScript SDK GitHub Repository Issue #8892**: https://github.com/getsentry/sentry-javascript/issues/8892
    *   *Evidence Tier:* Community
    *   *Contribution:* Captured the real-world symptoms and reproduction parameters of dropped error logs inside serverless containers.
