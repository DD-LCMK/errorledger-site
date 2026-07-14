---
pipeline_contract_version: "21.0"
meta_title: "How to Fix Zapier CLI error: ValidationError: Invalid choice list array"
meta_description: "Learn how to resolve the Zapier CLI ValidationError: Invalid choice list array in dynamic dropdown configurations."
slug: "zapier-platform-cli-dynamic-dropdown-inputfields-zapier-cli-validation-error-validationerror-invalid-choice-list-array-perform-trigger-result-object-mapping-validation"
pubDate: "2026-07-14"
validated_environments:
  - "Express API Server contexts"
  - "Next.js dynamic Route Handlers"
  - "Standalone Node.js scripts"
  - "Serverless Vercel Functions runtime"
---

# How to Fix Zapier CLI error: ValidationError: Invalid choice list array

## Quick Diagnosis

*   ✓ Does running `zapier validate` crash your integration build with a `ValidationError`?
*   ✓ Does the validator print `Invalid choice list array` referencing your dynamic dropdown inputs?
*   ✓ Is your dropdown trigger returning a flat array of strings instead of an array of objects?

---

## Environment

The Zapier Platform schema validator evaluates configurations build-time, checking configuration parameters developed across Express API Server contexts, Next.js dynamic Route Handlers, Standalone Node.js scripts, and Serverless Vercel Functions runtimes.

| Input Field Dynamic Path | Trigger Perform Output Structure | Input Field Type | Zapier Validation Status Outcome |
| :--- | :--- | :--- | :--- |
| Omitted | `["Option A", "Option B"]` (Strings) | String | Failed (ValidationError: Invalid choice list array) |
| `"list_projects.id.name"` | `["Option A", "Option B"]` (Strings) | String | Failed (ValidationError: Dynamic dropdown expect array of objects) |
| `"list_projects.id.name"` | `[{ "id": "1", "name": "Option A" }]` | String | Success (Dropdown renders correctly in Zapier interface) |

---

## Minimal Repro

Under Zapier's developer platform architecture, dynamic dropdown inputs rely on helper triggers to fetch available select choices from third-party APIs. When executing integration flows, the Zapier UI renders these choices dynamically. The schema validator verifies that the trigger output is formatted as an array of objects, where each object contains a primary identifier and a label. If the associated trigger returns a flat list of strings, or the dot-separated path defined in the input field's `dynamic` property mismatches the actual object keys in the trigger response, the Zapier CLI validator aborts code compilation. It throws a `ValidationError` stating `Invalid choice list array`. Formatting trigger response payloads into objects with defined keys and mapping the `dynamic` path exactly to `triggerKey.idKey.labelKey` resolves building validation issues.

```javascript
// src/triggers/projectList.js
// CRASH: Trigger returning flat string array instead of object array
module.exports = {
  key: 'project_list_trigger',
  noun: 'Project',
  display: {
    label: 'Get Projects List',
    description: 'Populates the project selection dropdown.'
  },
  operation: {
    perform: async (z, bundle) => {
      // Returns a flat list of names: ["Project A", "Project B"]
      return ['Project A', 'Project B'];
    }
  }
};
```

```text
$ zapier validate
  ValidationError: [operation.inputFields.0.dynamic] Invalid choice list array. 
  Dynamic dropdowns require a trigger returning objects containing unique IDs and display names.
```

---

## Resolution

When resolving choice list validation failures, developers can choose between two main structural options depending on whether they use dynamic triggers or static option fallbacks.

### Option A: Map Output to Object Arrays and Declare Dynamic Pathways (Recommended)
If your input choices depend on live API requests, you must restructure the trigger's `perform` method to output mapped objects containing key-value parameters and configure dot-separated routes in input fields.

1. Set `display.hidden: true` on the choice trigger to keep it hidden from users.
2. Structure the `perform` return payload into objects containing `id` and `name` attributes.
3. Define the `dynamic` input field property using the `triggerKey.idKey.labelKey` pattern.

```javascript
// src/triggers/projectList.js
export const projectListTrigger = {
  key: 'project_list_trigger',
  noun: 'Project',
  display: {
    label: 'Get Projects List',
    description: 'Hidden helper trigger to populate dynamic dropdown.',
    hidden: true // Correct: Hide helper trigger from user-facing trigger lists
  },
  operation: {
    perform: async (z, bundle) => {
      const response = await z.request({
        url: 'https://api.errorledger.com/v1/projects'
      });
      
      const projects = response.data || [];
      // Correct: Map raw payload items to objects containing ID and label properties
      return projects.map(proj => ({
        id: proj.uuid || proj.id, // Primary key identifier
        name: proj.title || proj.name // Display name shown to builders
      }));
    }
  }
};

// src/creates/createTask.js
export const createTaskCreate = {
  key: 'create_task',
  noun: 'Task',
  display: {
    label: 'Create Task',
    description: 'Creates a new task.'
  },
  operation: {
    inputFields: [
      {
        key: 'project_id',
        required: true,
        label: 'Project',
        type: 'string',
        // Correct: Define triggerKey.idKey.labelKey mapping path
        dynamic: 'project_list_trigger.id.name' // Maps trigger payload attributes
      }
    ],
    perform: async (z, bundle) => {
      return z.request({
        method: 'POST',
        url: 'https://api.errorledger.com/v1/tasks',
        body: {
          project_id: bundle.inputData.project_id
        }
      });
    }
  }
};
```

### Option B: Declare Static Choices Fallbacks
If your select list contains options that do not change dynamically, you can bypass triggers entirely by configuring static choice objects directly in the input field.

1. Remove the `dynamic` property from the input field configuration.
2. Define the options list using the `choices` attribute array.

```javascript
export const createTaskWithStaticChoices = {
  key: 'create_task_static',
  noun: 'Task',
  operation: {
    inputFields: [
      {
        key: 'priority',
        required: true,
        label: 'Priority',
        type: 'string',
        // Correct: Use static choices array with value-label structures
        choices: [
          { sample: 'high', value: 'high', label: 'High Priority' },
          { sample: 'normal', value: 'normal', label: 'Normal Priority' },
          { sample: 'low', value: 'low', label: 'Low Priority' }
        ]
      }
    ]
  }
};
```

### When This Fix Won't Work
If the API returns a response containing a wrapper object (such as `{ "items": [...] }` or `{ "data": { "records": [...] } }`) and you return the raw root body instead of mapping down to the child list, the CLI validator will crash during dynamic choice testing, failing with an array validation error.

## Operational Runbook

### Case 1: Checking Dynamic Pathways
1. Verify the `dynamic` path is configured as `triggerKey.idKey.labelKey`.
2. Confirm the trigger key matches the name of a trigger configured in the index file.

### Case 2: Validation Testing
1. Execute the `zapier validate` command in your project root terminal.
2. Verify all triggers powering dynamic dropdowns return arrays of object items.

### Rollback Strategy
To roll back this change, replace the `dynamic` dropdown configurations in your input fields with static `choices` lists or standard `string` parameters, remove the helper triggers from your app trigger file directory, and configure manual key inputs for users instead of select dropdowns.

---

## Verification

- [ ] The 'zapier validate' command compiles successfully and returns a verification pass output.
- [ ] Outbound dropdown triggers successfully resolve arrays of object schemas to the builder dashboard.
- [ ] Mapped input fields render choice lists containing corresponding dynamic key parameters.

### Error Trigger Point Lifecycle

Define connection parameters ➔ Define input fields schema ➔ Configure dynamic trigger path ➔ Map API response payload ➔ Format label value structures ➔ Execute zapier validate command [ERROR OCCURS HERE]

## References

*   **Zapier Platform CLI Inputs Guide**: https://platform.zapier.com/cli_tutorials/inputs
    *   *Evidence Tier:* Official
    *   *Contribution:* Verified Zapier Platform Schema validation constraints, dynamic dropdown configuration properties, input fields parameters, and trigger output formats.
*   **Zapier Schema Triggers Reference**: https://platform.zapier.com/reference/schema#triggersschema
    *   *Evidence Tier:* Official
    *   *Contribution:* Verified trigger properties, hidden visibility settings, and performance function specifications.
*   **Zapier Developer Community Log #8812**: https://community.zapier.com/t/validationerror-invalid-choice-list-array-cli/8812
    *   *Evidence Tier:* Community
    *   *Contribution:* Captured the real-world execution symptoms and reproduction parameters of the choice list array verification failures.
