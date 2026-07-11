---
pipeline_contract_version: "21.0"
meta_title: "How to Fix Clerk Node SDK v5 TypeError clerkClient.users is undefined"
meta_description: "Learn how to resolve the clerkClient.users is undefined TypeError in Clerk Node SDK v5 by initializing your client asynchronously with the factory helper."
slug: "clerk-auth-sdk-clerk-node-sdk-v5-typeerror-clerkclient-users-is-undefined-clerkclient-asynchronous-factory-initialization-await"
validated_environments:
  - "Next.js App Router API Routes"
  - "Express Server Context"
  - "Serverless Vercel Functions"
  - "Custom Node API Endpoints"
---

# How to Fix Clerk Node SDK v5 TypeError clerkClient.users is undefined

## Quick Diagnosis

*   ✓ Did you recently upgrade `@clerk/nextjs` or `@clerk/backend` to v5?
*   ✓ Does your backend route crash with a `TypeError: Cannot read properties of undefined (reading 'getUserList')`?
*   ✓ Are you importing `clerkClient` as a direct global export and attempting to execute resources directly?

---

## Environment

The Clerk Backend SDK manages authentication routing across server environments including Next.js App Router API Routes, Express Server Contexts, Serverless Vercel Functions, and Custom Node API Endpoints.

| SDK Version | Import Method | Client Instantiation | API Execution Outcome |
| :--- | :--- | :--- | :--- |
| Backend SDK v4.x | `import { clerkClient } from '@clerk/nextjs'` | Direct Export Reference | Success (Legacy SDK export pattern) |
| Backend SDK v5.x | `import { clerkClient } from '@clerk/nextjs'` | Direct Export Reference | TypeError: clerkClient.users is undefined |
| Backend SDK v5.x | `import { createClerkClient } from '@clerk/backend'` | `await createClerkClient({ secretKey })` | Success (Asynchronous factory initialization) |

---

## Minimal Repro

Under the architecture of Clerk Backend SDK v5, the SDK client is refactored from a static global singleton instance into a decoupled, factory-instantiated instance context. This prevents state contamination and allows serverless applications to manage multiple workspaces or tenants concurrently. When upgrading to v5, importing `clerkClient` as a direct global export from `@clerk/nextjs` or `@clerk/clerk-sdk-node` references an unconfigured base skeleton. Attempting to execute resource queries (such as `clerkClient.users.getUserList()`) directly on this skeleton triggers a `TypeError` because the `users` collection has not been bound to a verified API context. In v5, you must explicitly construct the configured client instance using `createClerkClient` and supply a valid `secretKey` authentication parameter.

```javascript
import { clerkClient } from '@clerk/nextjs';

export async function GET() {
  // CRASH: Attempting to call resources on the unconfigured global export in v5
  const users = await clerkClient.users.getUserList();
  return Response.json(users);
}
```

```text
TypeError: Cannot read properties of undefined (reading 'getUserList')
    at GET (route.js:5:34)
```

---

## Resolution

When resolving Clerk client errors, developers can choose between two main structural options depending on their deployment scope.

### Option A: Initialize Client via createClerkClient (Recommended)
If you deploy in modern Node or serverless environments, initializing your backend client context via the `createClerkClient` factory is applicable. This configuration binds your secret keys dynamically to a dedicated client resource container.

1. Import `createClerkClient` instead of the static `clerkClient` singleton.
2. Configure the client by supplying your environment `secretKey`.
3. Execute your resource queries directly from the newly constructed client instance.

```javascript
import { createClerkClient } from '@clerk/backend';

// Instantiating the configured client helper
const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export async function GET() {
  // Success: Accessing bound resource collections safely
  const response = await clerkClient.users.getUserList();
  return Response.json(response);
}
```

### Option B: Await Context-Scoped Client Resolvers
When you manage users within request-scoped Next.js contexts (such as Next.js middleware or dynamic route handlers), resolving the clerk client from helper context wrappers is applicable.

```javascript
import { clerkClient } from '@clerk/nextjs/server';

export async function GET(request) {
  // Retrieve the request-scoped client reference
  const clientInstance = await clerkClient();
  const users = await clientInstance.users.getUserList();
  return Response.json(users);
}
```

### When This Fix Won't Work
If you construct your client using `createClerkClient` but fail to supply a valid `secretKey` parameter or pass an empty string, client resource requests will throw authentication exceptions. Ensure environment parameters are validated during server bootstrap.

## Operational Runbook

### Case 1: Serverless Routes & Standalone Clients
1. Import `createClerkClient` from `@clerk/backend`.
2. Construct the client by supplying `CLERK_SECRET_KEY`.

### Case 2: Next.js Server Actions & Middleware
1. Import `clerkClient` from `@clerk/nextjs/server`.
2. Execute the resolver function to retrieve the current request client context.

### Rollback Strategy
To roll back this change, replace the `createClerkClient` factory initialization hooks in your server files with direct, pre-initialized global client singleton imports from `@clerk/nextjs` or `@clerk/clerk-sdk-node`, delete custom factory options parameter declarations, and downgrade your package dependencies to Clerk Backend SDK v4.x.

---

## Verification

- [ ] Client application server boots and initializes API routes without throwing client instantiation TypeErrors.
- [ ] Backend route handlers receive valid user resource payloads containing data query counts.
- [ ] Integration test suites return verified assertions on clerkClient.users resource lists.

### Error Trigger Point Lifecycle

Load environment variables ➔ Import createClerkClient ➔ Initialize clerkClient instance [ERROR OCCURS HERE] ➔ Resolve client instance promise ➔ Execute getUserList query

## References

*   **Clerk Backend SDK Migration Guide**: https://clerk.com/docs/references/backend/migration-v5
    *   *Evidence Tier:* Official
    *   *Contribution:* Verified the Clerk Backend SDK client initialization parameters, API migration paths, and structural signature modifications.
*   **Clerk API Reference**: https://clerk.com/docs/reference/backend-api
    *   *Evidence Tier:* Official
    *   *Contribution:* Verified the API client authentication properties, environment variable overrides, and dynamic connection variables.
*   **Clerk Node Github Issue #1282**: https://github.com/clerk/javascript/issues/1282
    *   *Evidence Tier:* Community
    *   *Contribution:* Captured the real-world execution symptoms and reproduction parameters of the clerkClient TypeError under Backend SDK v5.
