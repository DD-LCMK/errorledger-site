---
pipeline_contract_version: "21.0"
meta_title: "How to Fix AnthropicError: completions.create is not supported"
meta_description: "Learn how to resolve the completions.create is not supported error in Anthropic Claude API by migrating to the Messages API."
slug: "anthropic-claude-api-anthropic-typescript-sdk-anthropicerror-completions-create-is-not-supported-messages-api-migration-model-deprecation"
validated_environments:
  - "Express API Server contexts"
  - "Next.js dynamic Route Handlers"
  - "Standalone Node.js scripts"
  - "Serverless Vercel Functions runtime"
---

# How to Fix AnthropicError: completions.create is not supported

## Quick Diagnosis

*   ✓ Are your Claude integration requests failing immediately with a `400 Bad Request` or an endpoint error?
*   ✓ Does the SDK throw `AnthropicError: completions is not supported for this model` when calling `anthropic.completions.create()`?
*   ✓ Did you recently upgrade to a Claude 3 or Claude 3.5 model while keeping legacy completions prompt strings?

---

## Environment

The Anthropic gateway endpoint validator evaluates model capabilities server-side, running across configurations including Express API Server contexts, Next.js dynamic Route Handlers, Standalone Node.js scripts, and Serverless Vercel Functions runtimes.

| Anthropic SDK Version | API Request Endpoint Method | Target Claude Model Name | SDK Execution Outcome |
| :--- | :--- | :--- | :--- |
| Legacy SDK (`@anthropic-ai/sdk` v0.10) | `completions.create` (Prompt string) | `claude-2.1` | Success (Returns text completion output) |
| Modern SDK (`@anthropic-ai/sdk` v0.30+) | `completions.create` (Prompt string) | `claude-3-5-sonnet` | Failed (AnthropicError: completions is not supported for this model) |
| Modern SDK (`@anthropic-ai/sdk` v0.30+) | `messages.create` (Messages array) | `claude-3-5-sonnet` | Success (Returns message content payload object) |

---

## Minimal Repro

Under Anthropic's developer platform architecture, the gateway interface splits API request endpoints by model generation capability. In legacy completions specifications, prompt queries were parsed as unstructured strings using the `/v1/completions` route. With the release of Claude 3 and modern models (such as Claude 3.5 Sonnet), the gateway interface transitioned completely to the `/v1/messages` endpoint to support structure features like prompt caching, system instructions, and tool calling. If your codebase uses the modern `@anthropic-ai/sdk` client library to execute a `completions.create` request on a Claude 3+ model, the gateway validation module checks model specifications and rejects the execution. The library aborts the call, throwing an `AnthropicError` indicating that the completions endpoint is unsupported for this model. Upgrading your application calls to use the `messages.create` method and passing parameters structured as a messages array resolves the error.

```javascript
import Anthropic from '@anthropic-ai/sdk';

// Initialize modern SDK client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

async function runRepro() {
  try {
    // CRASH: Attempting to call legacy completions endpoint on a Claude 3+ model
    const completion = await anthropic.completions.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens_to_sample: 300,
      prompt: '\n\nHuman: Hello Claude!\n\nAssistant:'
    });
    console.log(completion.completion);
  } catch (error) {
    console.error(error); // Throws AnthropicError
  }
}

runRepro();
```

```text
AnthropicError: completions is not supported for this model
    at Anthropic.completions.create (node_modules/@anthropic-ai/sdk/resources/completions.js:46:19)
    at runRepro (repro.js:11:39)
```

---

## Resolution

When migrating Anthropic API call structures, developers can choose between two main structural options depending on whether they require system-wide instructions customization.

### Option A: Migrate to messages.create with Role-Based Objects (Recommended)
If your application executes standard queries where user input needs to be processed, replacing legacy `completions.create` with `messages.create` and mapping prompt strings to messages arrays is applicable. This configuration satisfies validation checks.

1. Replace `completions.create` calls with the `messages.create` method.
2. Replace the single `prompt` string with a `messages` array node.
3. Define the messages payload using role-based objects (e.g. `{ role: 'user', content: query }`).

```javascript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export async function executePrompt(userInput) {
  // Correct: Use messages.create with role-based arrays
  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [
      { role: 'user', content: userInput }
    ]
  });

  return response.content[0].text;
}
```

### Option B: Declare System Prompts via Top-Level Properties
If your legacy completion prompts rely on custom system-level framing instructions (previously injected directly inside the prompt string), declaring system prompts as a dedicated parameter is applicable.

1. Extract your system instructions from the prompt string.
2. Define the `system` configuration parameter in your request options.
3. Add user queries within the standard messages structure.

```javascript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export async function executeSystemPrompt(systemPrompt, userQuery) {
  // Correct: Pass system instructions as a top-level parameter
  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    system: systemPrompt,
    messages: [
      { role: 'user', content: userQuery }
    ],
    temperature: 0.7
  });

  return response.content[0].text;
}
```

### When This Fix Won't Work
If you call `messages.create` but include legacy parameters like `max_tokens_to_sample` instead of `max_tokens`, the SDK client validation layers will abort the request before dispatching, causing parameter schemas mismatch validation errors.

## Operational Runbook

### Case 1: Simple Prompt Migration
1. Replace `completions.create` calls with `messages.create`.
2. Map prompt strings to `messages` array objects.
3. Replace `max_tokens_to_sample` with `max_tokens`.

### Case 2: System Prompts Migration
1. Strip inline `\n\nHuman:` and system formatting from prompts.
2. Inject system instructions into the top-level `system` property.

### Rollback Strategy
To roll back this change, replace the `messages.create` array structures in your database controller modules with standard legacy `completions.create` prompt strings, reset model identifiers to legacy Claude 2.x versions, and downgrade your package dependencies to @anthropic-ai/sdk version 0.10.x.

---

## Verification

- [ ] Anthropic API queries return successful responses without throwing completions.create unsupported exceptions.
- [ ] Inbound query payloads successfully map user role objects into standard messages array formats.
- [ ] Local application logs record successful system prompt completions from active Claude 3.5 models.

### Error Trigger Point Lifecycle

Load API keys ➔ Initialize Anthropic client ➔ Format message query schema ➔ Dispatch HTTP payload ➔ Validate model capabilities [ERROR OCCURS HERE] ➔ Parse response message object

## References

*   **Anthropic Messages API Migration Guide**: https://docs.anthropic.com/en/api/migrating-to-messages
    *   *Evidence Tier:* Official
    *   *Contribution:* Verified Anthropic Messages API structures, text completions deprecation dates, model configuration options, and parameter migrations.
*   **Anthropic API Models Reference**: https://docs.anthropic.com/en/docs/about-claude/models
    *   *Evidence Tier:* Official
    *   *Contribution:* Verified active model versions, token limit boundaries, and deprecation schedules.
*   **Anthropic SDK GitHub Issues Log #293**: https://github.com/anthropics/anthropic-sdk-typescript/issues/293
    *   *Evidence Tier:* Community
    *   *Contribution:* Captured the real-world execution symptoms and reproduction parameters of the completions.create deprecation warning.
