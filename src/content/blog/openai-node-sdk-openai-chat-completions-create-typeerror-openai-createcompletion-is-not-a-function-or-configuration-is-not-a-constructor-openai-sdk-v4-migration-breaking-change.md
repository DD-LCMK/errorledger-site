---
pipeline_contract_version: "21.0"
meta_title: "How to Fix OpenAI Node SDK TypeError: Configuration is not a constructor"
meta_description: "Learn how to resolve OpenAI Node SDK v4 migration TypeError exceptions by updating configuration classes and nested method signatures."
slug: "openai-node-sdk-openai-chat-completions-create-typeerror-openai-createcompletion-is-not-a-function-or-configuration-is-not-a-constructor-openai-sdk-v4-migration-breaking-change"
validated_environments:
  - "Express Server Environment"
  - "Next.js App Router route handlers"
  - "Serverless Vercel Functions"
  - "Custom Node API Endpoints"
---

# How to Fix OpenAI Node SDK TypeError: Configuration is not a constructor

## Quick Diagnosis

*   ✓ Did you recently upgrade the `openai` npm package to version 4 or newer?
*   ✓ Does your Node process crash immediately with `TypeError: Configuration is not a constructor`?
*   ✓ Are you calling `openai.createChatCompletion` or `openai.createCompletion` directly on your client instance?

---

## Environment

The OpenAI client wrapper operates server-side across configurations including Express Server Environments, Next.js App Router Route Handlers, Serverless Vercel Functions, and Custom Node API Endpoints.

| SDK Version | Constructor Class Pattern | Completion Method Signature | API Invocation Result |
| :--- | :--- | :--- | :--- |
| SDK v3.x | `new Configuration({ apiKey })` | `openai.createChatCompletion({ ... })` | Success (Legacy SDK format) |
| SDK v4.x | `new Configuration({ apiKey })` | `openai.createChatCompletion({ ... })` | TypeError: Configuration is not a constructor |
| SDK v4.x | `new OpenAI({ apiKey })` | `openai.chat.completions.create({ ... })` | Success (v4 Nested resources format) |

---

## Minimal Repro

Under the architecture of OpenAI Node SDK v4, the library was completely rewritten to optimize network execution times, introduce native edge compatibility, and simplify the developer API surface. In v3, client initialization required importing and nesting the `Configuration` and `OpenAIApi` classes, and resource requests were made using top-level methods like `createChatCompletion`. Version 4 deprecated and removed these separate helper classes, merging client setup into a single unified `OpenAI` constructor class. Furthermore, method signatures were refactored into nested resource directories. Attempting to invoke obsolete constructor classes or calling top-level completion methods directly on a v4 client instance causes the JavaScript compiler to throw `TypeError: Configuration is not a constructor` or `TypeError: openai.createChatCompletion is not a function` during initialization. Re-aligning imports to instantiate `OpenAI` and nesting requests under `chat.completions.create` resolves the mismatch.

```javascript
// CRASH: Using obsolete v3 configuration classes under SDK v4
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
```

```text
TypeError: Configuration is not a constructor
    at Object.<anonymous> (server.js:4:23)
```

---

## Resolution

When resolving OpenAI v4 migration errors, developers can choose between two main structural options depending on their codebase size.

### Option A: Refactor to v4 Client Initialization (Recommended)
If you are updating your code manual or starting a new integration, instantiating the unified `OpenAI` client directly is applicable. This configuration prevents class constructor errors and targets v4 nested completion resources.

1. Import the default `OpenAI` class directly from `openai`.
2. Instantiate using `new OpenAI()` and supply your `apiKey`.
3. Re-route completion methods to `openai.chat.completions.create`.
4. Remove the `.data` property wrap from response choices parsers.

```javascript
import OpenAI from 'openai';

// Correct client initialization
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function GET() {
  // Correct method path and payload parsing
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Hello API' }]
  });

  return Response.json({ text: response.choices[0].message.content });
}
```

### Option B: Run the Automated Migration Codemod
When you manage large enterprise repositories where manual refactoring is cost-prohibitive, running OpenAI's automated migration utility is applicable.

```bash
# Execute automated codebase migration codemod
npx openai migrate
```

### When This Fix Won't Work
If you transition to the `OpenAI` client class but still attempt to query legacy endpoints (like `createCompletion`) with chat-based models (such as `gpt-4`), the API will return HTTP client exceptions.

## Operational Runbook

### Case 1: Client Setup
1. Update import statements to pull `OpenAI` from `openai`.
2. Construct the client directly with configuration keys.

### Case 2: Completion Methods
1. Replace `openai.createChatCompletion` with `openai.chat.completions.create`.
2. Remove `.data` payload wraps.

### Rollback Strategy
To roll back this migration, replace the `OpenAI` client instance with the legacy `Configuration` and `OpenAIApi` classes, update method calls back to `openai.createChatCompletion()`, restore response payload references to read `.data` wrappers, and downgrade your package dependencies to OpenAI Node SDK v3.x.

---

## Verification

- [ ] Application process boots and executes route handlers without throwing client configuration TypeErrors.
- [ ] OpenAI API responses resolve successfully without returning payload schema compilation warnings.
- [ ] Integration tests verify that model response strings match expected chat completions outcomes.

### Error Trigger Point Lifecycle

Load API keys ➔ Import OpenAI client class ➔ Call client constructor [ERROR OCCURS HERE] ➔ Execute chat.completions.create ➔ Resolve message content payload ➔ Handle connection exceptions

## References

*   **OpenAI v4 Migration Manual**: https://github.com/openai/openai-node/blob/hp/v4/v4-migration.md
    *   *Evidence Tier:* Official
    *   *Contribution:* Verified the OpenAI client constructor specifications, API migration paths, and structural signature modifications.
*   **OpenAI Client Reference**: https://github.com/openai/openai-node
    *   *Evidence Tier:* Official
    *   *Contribution:* Verified the client instantiation parameters, env overrides, and dynamic connection variables.
*   **OpenAI Node SDK GitHub Issue #682**: https://github.com/openai/openai-node/issues/682
    *   *Evidence Tier:* Community
    *   *Contribution:* Captured the real-world execution symptoms and reproduction parameters of the OpenAI v4 TypeError.
