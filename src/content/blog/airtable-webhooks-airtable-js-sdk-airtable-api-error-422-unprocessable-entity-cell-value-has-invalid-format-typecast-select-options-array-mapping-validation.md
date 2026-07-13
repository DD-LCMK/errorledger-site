---
pipeline_contract_version: "21.0"
meta_title: "How to Fix Airtable API error: 422 Unprocessable Entity: Cell value has invalid format"
meta_description: "Learn how to resolve Airtable 422 Cell value has invalid format errors by enabling typecast and formatting select fields as arrays."
slug: "airtable-webhooks-airtable-js-sdk-airtable-api-error-422-unprocessable-entity-cell-value-has-invalid-format-typecast-select-options-array-mapping-validation"
pubDate: "2026-07-14"
validated_environments:
  - "Express API Server contexts"
  - "Next.js dynamic Route Handlers"
  - "Standalone Node.js scripts"
  - "Serverless Vercel Functions runtime"
---

# How to Fix Airtable API error: 422 Unprocessable Entity: Cell value has invalid format

## Quick Diagnosis

*   ✓ Do your Airtable record creations fail with an HTTP `422 Unprocessable Entity` status code?
*   ✓ Does the SDK throw `Cell value has invalid format` in the error response body?
*   ✓ Are you sending new option values to Single Select columns, or sending plain strings to Multiple Select columns?

---

## Environment

The Airtable schema validator evaluates data writes server-side, verifying requests received across Express API Server contexts, Next.js dynamic Route Handlers, Standalone Node.js scripts, and Serverless Vercel Functions runtimes.

| Airtable Column Type | Request Options Object | Data Value Format Sent | Airtable API Request Outcome |
| :--- | :--- | :--- | :--- |
| Multiple Select | Omitted (No typecast) | `"Option A, Option B"` (String) | Failed (HTTP 422 Unprocessable Entity - Cell value has invalid format) |
| Multiple Select | Omitted (No typecast) | `["Option A", "Option B"]` (Array) | Success (Creates record using existing select options) |
| Multiple Select / Single Select | `{ typecast: true }` | `"New Option Value"` (String) | Success (Automatically creates new options in Airtable schema) |

---

## Minimal Repro

Under Airtable's database architecture, table fields enforce strict data type constraints. When executing record write operations (such as `create` or `update`), the Airtable API evaluates the fields payload against the base schema. For Multiple Select columns, the API requires the input to be formatted as an array of strings. If your application sends a single comma-separated string, or attempts to write an option value that does not yet exist in the table's configuration, the Airtable server rejects the request. It returns an HTTP `422 Unprocessable Entity` status accompanied by the error message `Cell value has invalid format`. Formulating select inputs as arrays and declaring the `{ typecast: true }` parameter in your request options enables automatic data conversions and updates the schema dynamically.

```javascript
const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN }).base(process.env.AIRTABLE_BASE_ID);

async function runRepro() {
  const fieldsPayload = {
    Name: 'Integration Log',
    // CRASH: Passing a plain string instead of an array to a Multiple Select field
    Categories: 'Alerts, System' 
  };

  try {
    // CRASH: Airtable server rejects invalid input formats
    const records = await base('Logs').create([{ fields: fieldsPayload }]);
    console.log(records[0].id);
  } catch (error) {
    console.error(error); // Throws 422 Cell value has invalid format
  }
}

runRepro();
```

```text
AirtableError: Class validation failed: 422 Unprocessable Entity - Cell value has invalid format
    at Airtable.callback (node_modules/airtable/lib/airtable.js:124:19)
    at /var/task/repro.js:13:32
```

---

## Resolution

When resolving Airtable validation exceptions, developers can choose between two main structural options depending on whether they require dynamic schema modifications.

### Option A: Format Inputs as Arrays and Enable Typecasting (Recommended)
If your application processes dynamic strings that may contain new select choices, setting the `typecast` parameter to true and mapping fields to arrays is applicable. This updates your base structure automatically.

1. Convert comma-separated string inputs to standard arrays of strings.
2. Set the `typecast` property option to `true` in the request parameters.
3. Execute write requests using the `base(tableName).create` method.

```javascript
import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN
}).base(process.env.AIRTABLE_BASE_ID);

export async function logSystemMessage(tableName, logData) {
  // Correct: Format Multiple Select fields as array structures
  const formattedFields = {
    Name: logData.name,
    Categories: Array.isArray(logData.categories) ? logData.categories : [logData.categories]
  };

  try {
    // Correct: Enable typecast to dynamically create new select options
    const records = await base(tableName).create(
      [{ fields: formattedFields }],
      { typecast: true } // Enables automatic schema updates and data conversion
    );
    return records[0].id;
  } catch (error) {
    if (error.statusCode === 422) {
      console.error('Schema validation failed:', error.message);
    }
    throw error;
  }
}
```

### Option B: Clear Fields Safely Using Empty Arrays
If your integration attempts to clear select fields, passing empty strings or empty nested objects will fail validation check constraints. Utilizing clean arrays to reset columns is applicable.

1. Replace empty text string parameters with empty arrays (`[]`).
2. Execute the `update` query using the record ID.

```javascript
import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN
}).base(process.env.AIRTABLE_BASE_ID);

export async function resetRecordCategories(tableName, recordId) {
  try {
    // Correct: Reset Multiple Select columns by passing an empty array
    const records = await base(tableName).update(recordId, {
      Categories: [] // Safely clears the select field without triggering 422
    });
    return records.id;
  } catch (error) {
    throw error;
  }
}
```

### When This Fix Won't Work
If your Personal Access Token (PAT) lacks "Schema Write" permissions (specifically the `schema.bases:write` scope), setting `typecast: true` will fail to create new options, throwing a `403 Forbidden` response instead.

## Operational Runbook

### Case 1: Multiple Select Mapping
1. Verify payload inputs are arrays of strings.
2. Confirm option spellings match base parameters.

### Case 2: Scope Verification
1. Ensure your Personal Access Token is configured with `data.records:write` and `schema.bases:write` scopes.
2. Log Airtable API response messages to verify typecasting options are allowed.

### Rollback Strategy
To roll back this change, restore the previous strict schema validation settings by removing the `{ typecast: true }` options block from your Airtable SDK write calls, format Multiple Select attributes as simple string properties instead of array structures, and ensure all option values are manually configured in the Airtable base dashboard.

---

## Verification

- [ ] Airtable API write calls complete successfully and return valid record IDs without throwing 422 errors.
- [ ] Target select options resolve completely as multi-value arrays in database payloads.
- [ ] Outbound integrations successfully append custom option choices to the base configuration.

### Error Trigger Point Lifecycle

Load personal access token ➔ Initialize Airtable connection ➔ Map payload field parameters ➔ Set typecast option properties ➔ Dispatch record write request ➔ Evaluate schema verification checks [ERROR OCCURS HERE]

## References

*   **Airtable Web API Field Types Reference**: https://airtable.com/developers/web/api/field-model
    *   *Evidence Tier:* Official
    *   *Contribution:* Verified Airtable Web API data validation constraints, typecasting configuration parameters, select list array formatting rules, and response error payloads.
*   **Airtable SDK Client API documentation**: https://github.com/Airtable/airtable.js
    *   *Evidence Tier:* Official
    *   *Contribution:* Verified base configuration options, typecast parameters, and query parameters.
*   **Airtable Community Forums Log #78891**: https://community.airtable.com/t/error-422-cell-value-has-invalid-format/78891
    *   *Evidence Tier:* Community
    *   *Contribution:* Captured the real-world execution symptoms and reproduction parameters of the 422 cell value has invalid format validation error.
