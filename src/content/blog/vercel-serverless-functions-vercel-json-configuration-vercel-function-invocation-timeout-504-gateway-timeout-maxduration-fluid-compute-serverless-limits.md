---
pipeline_contract_version: "21.0"
meta_title: "How to Fix Vercel FUNCTION_INVOCATION_TIMEOUT 504 Gateway Timeout"
meta_description: "Learn how to resolve the FUNCTION_INVOCATION_TIMEOUT (504 Gateway Timeout) on Vercel by configuring maxDuration in Next.js or vercel.json."
slug: "vercel-serverless-functions-vercel-json-configuration-vercel-function-invocation-timeout-504-gateway-timeout-maxduration-fluid-compute-serverless-limits"
validated_environments:
  - "Express API Server contexts"
  - "Next.js dynamic Route Handlers"
  - "Standalone Node.js scripts"
  - "Serverless Vercel Functions runtime"
---

# How to Fix Vercel FUNCTION_INVOCATION_TIMEOUT 504 Gateway Timeout

## Quick Diagnosis

*   ✓ Are your API routes failing with an HTTP `504 Gateway Timeout` after executing a database call or AI task?
*   ✓ Do your deployment logs display the error code `FUNCTION_INVOCATION_TIMEOUT`?
*   ✓ Is your application running under default Vercel configurations that terminate execution after 10 seconds?

---

## Environment

The Vercel gateway routing layer evaluates execution timeouts dynamically, managing requests dispatched to Express API Server contexts, Next.js dynamic Route Handlers, Standalone Node.js scripts, and Serverless Vercel Functions runtimes.

| Vercel Account Plan | maxDuration Config Spec | Active Execution time | HTTP Response Outcome |
| :--- | :--- | :--- | :--- |
| Hobby (Free Tier) | Omitted (Default 10s) | 15 seconds | Failed (504 Gateway Timeout - FUNCTION_INVOCATION_TIMEOUT) |
| Pro (Paid Tier) | `export const maxDuration = 60` | 45 seconds | Success (Resolves query successfully within limit) |
| Pro (Paid Tier) | `maxDuration: 1800` (Fluid Compute) | 1200 seconds | Success (Resolves long-running task with active CPU pausing) |

---

## Minimal Repro

Under Vercel's serverless platform architecture, functions run inside ephemeral execution threads that enforce strict execution limits. The gateway router tracks execution time starting from request dispatch. In default configurations, Hobby plans restrict functions to 10 seconds, while Pro plans allow up to 15 seconds. If your function handles database synchronization, external API integrations, or AI generation tasks that exceed these limits before returning a response, the gateway router terminates the execution thread. It returns an HTTP `504 Gateway Timeout` status accompanied by a `FUNCTION_INVOCATION_TIMEOUT` error. By declaring a custom `maxDuration` inside your API route configuration or the global `vercel.json` settings, you instruct the gateway to extend the execution timeout.

```typescript
// Next.js Route Handler (app/api/data/route.ts)
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
// CRASH: maxDuration config is omitted, defaulting to plan limits (10s on Hobby)

export async function GET() {
  // CRASH: Long-running database operations exceed the 10-second threshold
  const data = await performHeavyDatabaseSynchronization();
  return NextResponse.json({ success: true, data });
}

async function performHeavyDatabaseSynchronization() {
  return new Promise((resolve) => setTimeout(() => resolve({ synced: true }), 15000));
}
```

```text
504 Gateway Timeout
FUNCTION_INVOCATION_TIMEOUT: The serverless function execution timed out.
```

---

## Resolution

When resolving Vercel serverless timeout exceptions, developers can choose between two main structural options depending on their framework architecture.

### Option A: Configure maxDuration inside Next.js Route Handlers (Recommended)
If you deploy utilizing the Next.js App Router, exporting a custom `maxDuration` parameter directly from the route file is applicable. This instructs Vercel to override default limits for this specific route.

1. Open your target API route file (e.g. `app/api/sync/route.ts`).
2. Add `export const maxDuration = 60;` (specify duration in seconds up to plan limits).
3. Ensure you configure `export const dynamic = 'force-dynamic';` to prevent build-time static generation optimization conflicts.

```typescript
// Correct: Configure custom route duration limits
import { NextResponse } from 'next/server';

// Set function timeout limit to 60 seconds (must be within plan constraints)
export const maxDuration = 60; 
export const dynamic = 'force-dynamic';

export async function GET() {
  // Query resolves successfully within extended boundary limits
  const data = await performHeavyDatabaseSynchronization();
  return NextResponse.json({ success: true, data });
}

async function performHeavyDatabaseSynchronization() {
  return new Promise((resolve) => setTimeout(() => resolve({ status: 'completed' }), 25000));
}
```

### Option B: Declare maxDuration inside vercel.json
If you manage standalone Node.js functions or deploy standard APIs without Next.js exports, defining timeout properties inside your `vercel.json` project settings is applicable.

1. Create or open the `vercel.json` file in your repository root.
2. Add a `functions` configuration object block.
3. Define the `maxDuration` value for specific path patterns.

```json
{
  "version": 2,
  "functions": {
    "api/endpoints/*.js": {
      "maxDuration": 120,
      "memory": 1024
    }
  }
}
```

### When This Fix Won't Work
If you are on a Vercel Hobby plan, setting `maxDuration` values beyond 10 seconds will fail to override the hard execution limit. Hobby accounts are strictly capped at 10 seconds, and Vercel will silently ignore any code-level or json configuration parameters that request a longer duration.

## Operational Runbook

### Case 1: Next.js Setup
1. Export the `maxDuration` variable from target route handlers.
2. Verify the duration value does not exceed Vercel account plan caps.

### Case 2: Standard Node APIs
1. Configure timeouts inside the `vercel.json` configuration file.
2. Confirm files match the defined path patterns in your configuration properties.

### Rollback Strategy
To roll back this change, restore the previous timeout configuration by deleting the `export const maxDuration` variables from your Next.js route handlers, remove the custom `functions` options block from your `vercel.json` configuration file, and optimize database queries to execute under the default 10-second serverless execution limits.

---

## Verification

- [ ] API endpoints return successful HTTP 200 responses for operations exceeding 10 seconds.
- [ ] Vercel deployment logs confirm custom function timeouts are active and applied.
- [ ] High-latency database queries resolve completely without triggering gateway terminations.

### Error Trigger Point Lifecycle

Inbound HTTP request ➔ Route request to serverless function ➔ Initialize serverless environment ➔ Execute function thread ➔ Evaluate execution timeout checks [ERROR OCCURS HERE] ➔ Return HTTP response payload

## References

*   **Vercel Serverless Functions Duration Limits Guide**: https://vercel.com/docs/functions/serverless-functions/runtimes#maxduration
    *   *Evidence Tier:* Official
    *   *Contribution:* Verified Vercel Serverless Function execution limit structures, maxDuration configurations, Fluid Compute options, and gateway response statuses.
*   **Vercel Config JSON Reference**: https://vercel.com/docs/projects/project-configuration#functions
    *   *Evidence Tier:* Official
    *   *Contribution:* Verified vercel.json schemas, functions configurations, and routing options.
*   **Vercel Community Discussions #4988**: https://github.com/orgs/vercel/discussions/4988
    *   *Evidence Tier:* Community
    *   *Contribution:* Captured the real-world execution symptoms and reproduction parameters of the serverless function timeout.
