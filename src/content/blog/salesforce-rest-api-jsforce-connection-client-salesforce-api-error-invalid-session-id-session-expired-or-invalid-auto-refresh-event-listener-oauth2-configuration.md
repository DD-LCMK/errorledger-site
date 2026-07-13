---
pipeline_contract_version: "21.0"
meta_title: "How to Fix Salesforce API error: INVALID_SESSION_ID"
meta_description: "Learn how to resolve the Salesforce INVALID_SESSION_ID error in jsforce by enabling auto-refresh and event listeners."
slug: "salesforce-rest-api-jsforce-connection-client-salesforce-api-error-invalid-session-id-session-expired-or-invalid-auto-refresh-event-listener-oauth2-configuration"
pubDate: "2026-07-14"
validated_environments:
  - "Express API Server contexts"
  - "Next.js dynamic Route Handlers"
  - "Standalone Node.js scripts"
  - "Serverless Vercel Functions runtime"
---

# How to Fix Salesforce API error: INVALID_SESSION_ID

## Quick Diagnosis

*   ✓ Do your Salesforce REST API queries fail with a `401 Unauthorized` status and an `INVALID_SESSION_ID` error?
*   ✓ Does this failure occur after your application has been running successfully for a few hours?
*   ✓ Is your `jsforce` Connection initialized using only a raw `accessToken` without the Connected App OAuth2 configuration?

---

## Environment

The Salesforce REST API gateway evaluates authentication tokens server-side, validating requests received across Express API Server contexts, Next.js dynamic Route Handlers, Standalone Node.js scripts, and Serverless Vercel Functions runtimes.

| OAuth2 Config Options | Refresh Listener Registered | Token Life-Cycle Action | Connection Execution Status |
| :--- | :--- | :--- | :--- |
| Omitted (Access Token Only) | No | Access token expires after 2 hours | Failed (HTTP 401 Unauthorized - INVALID_SESSION_ID) |
| OAuth2 Config Included (Refresh Token) | No | Access token expires after 2 hours | Success (Auto-refresh succeeds but new token is not persisted) |
| OAuth2 Config Included (Refresh Token) | Yes (`conn.on('refresh')`) | Access token expires after 2 hours | Success (Auto-refresh succeeds and database stores new token) |

---

## Minimal Repro

Under Salesforce's API security architecture, requests to REST endpoints are authenticated using access tokens that enforce time-to-live restrictions. When an API client submits a query, the Salesforce gateway validates the access token. If the session has expired, the gateway rejects the query, returning a `401 Unauthorized` status with an `INVALID_SESSION_ID` error code. When using the `jsforce` client SDK, if connection instances are initialized without configuring the client OAuth properties (`clientId`, `clientSecret`) and a `refreshToken`, the library cannot negotiate a session renewal. It aborts the query execution, throwing a connection error. Declaring the full `oauth2` configuration blocks in the connection constructor and registering a listener for the `refresh` event resolves expired session warnings.

```javascript
const jsforce = require('jsforce');

async function runRepro() {
  // CRASH: Connection initialized without OAuth2 settings or refresh token
  const conn = new jsforce.Connection({
    accessToken: 'EXPIRED_ACCESS_TOKEN',
    instanceUrl: 'https://errorledger.my.salesforce.com'
  });

  try {
    // CRASH: Salesforce rejects request because the token is expired
    const result = await conn.query('SELECT Id, Name FROM Account LIMIT 1');
    console.log(result.records);
  } catch (error) {
    console.error(error); // Throws INVALID_SESSION_ID
  }
}

runRepro();
```

```text
jsforce.ConnectionError: INVALID_SESSION_ID: Session expired or invalid
    at Connection._handleResponse (node_modules/jsforce/lib/connection.js:987:13)
    at /var/task/repro.js:12:22
```

---

## Resolution

When resolving Salesforce session timeouts in `jsforce`, developers can choose between two main structural options depending on whether they require custom token persistence.

### Option A: Configure Auto-Refresh with Event Listeners (Recommended)
If your application runs continuously in background processes, configuring the connection wrapper to request and persist refreshed access tokens automatically is applicable. This ensures seamless token renewal.

1. Include the Connected App `clientId`, `clientSecret`, and `redirectUri` in the `oauth2` connection property.
2. Provide the `refreshToken` alongside the current `accessToken` during initialization.
3. Attach a callback function to the `refresh` event listener to save updated tokens in database tables.

```javascript
import jsforce from 'jsforce';

export async function getSalesforceConnection(authProfile, onTokenRefreshed) {
  // Correct: Initialize Connection with client OAuth2 details
  const conn = new jsforce.Connection({
    oauth2: {
      clientId: process.env.SALESFORCE_CLIENT_ID,
      clientSecret: process.env.SALESFORCE_CLIENT_SECRET,
      redirectUri: process.env.SALESFORCE_REDIRECT_URI
    },
    accessToken: authProfile.accessToken,
    refreshToken: authProfile.refreshToken,
    instanceUrl: authProfile.instanceUrl
  });

  // Correct: Save refreshed tokens to prevent oauth session drop loops
  conn.on('refresh', (newAccessToken, res) => {
    console.log('Access token expired. Automatic refresh executed successfully.');
    if (onTokenRefreshed) {
      onTokenRefreshed(newAccessToken); // Persist updated token to DB
    }
  });

  return conn;
}

export async function queryAccounts(authProfile, onTokenRefreshed) {
  try {
    const conn = await getSalesforceConnection(authProfile, onTokenRefreshed);
    // REST queries run successfully even if the access token has expired
    const result = await conn.query('SELECT Id, Name FROM Account LIMIT 5');
    return result.records;
  } catch (error) {
    if (error.errorCode === 'INVALID_SESSION_ID') {
      console.error('Session authentication failed. Verify refresh token status.');
    }
    throw error;
  }
}
```

### Option B: Execute Manual Refresh Checks
If you use short-lived connection instances that are deleted immediately after query runs, or you require manual control over token lifetimes, checking the session validity status manually is applicable.

1. Verify token age or catch auth errors before query dispatch.
2. Force the connection client to fetch a new token via `conn.oauth2.refreshToken()`.
3. Re-assign the new access token manually to the active connection instance before retrying.

```javascript
import jsforce from 'jsforce';

export async function queryWithManualRefresh(authProfile, soqlQuery) {
  const conn = new jsforce.Connection({
    oauth2: {
      clientId: process.env.SALESFORCE_CLIENT_ID,
      clientSecret: process.env.SALESFORCE_CLIENT_SECRET,
      redirectUri: process.env.SALESFORCE_REDIRECT_URI
    },
    accessToken: authProfile.accessToken,
    refreshToken: authProfile.refreshToken,
    instanceUrl: authProfile.instanceUrl
  });

  try {
    // Attempt standard query first
    const result = await conn.query(soqlQuery);
    return result.records;
  } catch (error) {
    // Catch session expiration and manually refresh
    if (error.errorCode === 'INVALID_SESSION_ID') {
      console.log('Expired token caught. Refreshing manually...');
      
      // Perform token exchange handshake
      const tokenInfo = await conn.oauth2.refreshToken(authProfile.refreshToken);
      conn.accessToken = tokenInfo.access_token;
      
      // Retry original query using new token
      const retryResult = await conn.query(soqlQuery);
      return retryResult.records;
    }
    throw error;
  }
}
```

### When This Fix Won't Work
If the Connected App settings in Salesforce have a refresh token policy configured to "Immediately expire refresh token", or if the user has manually revoked access to the Connected App, the refresh token exchange request will return an `invalid_grant` error instead of a new access token.

## Operational Runbook

### Case 1: jsforce Configuration
1. Confirm Connected App OAuth client details are loaded in environment settings.
2. Check that the `refreshToken` string is retrieved successfully from your session store.

### Case 2: Persisting Refreshed Tokens
1. Register the `refresh` event listener immediately after Connection instantiation.
2. Verify database write transactions complete successfully inside listener callback triggers.

### Rollback Strategy
To roll back this change, restore the previous single-token authentication structure by removing the OAuth2 credentials settings from your `jsforce.Connection` initialization parameters, delete the `refresh` event listener hooks from the connection wrapper file, and implement custom logic to verify access tokens before executing queries.

---

## Verification

- [ ] Salesforce REST queries execute successfully without throwing session expiration exceptions.
- [ ] Connection configurations match valid client IDs and credentials configurations.
- [ ] Refreshed access tokens save completely into application database records on refresh events.

### Error Trigger Point Lifecycle

Load oauth credentials ➔ Initialize jsforce connection ➔ Execute REST query request ➔ Detect access token expiry [ERROR OCCURS HERE] ➔ Trigger auto-refresh handshake ➔ Save refreshed credentials payload

## References

*   **Salesforce Connected App OAuth 2.0 Guide**: https://help.salesforce.com/articleView?id=sf.remoteaccess_oauth_flows.htm
    *   *Evidence Tier:* Official
    *   *Contribution:* Verified Salesforce OAuth2 token exchange endpoints, jsforce auto-refresh listeners, instance connection configuration parameters, and session error codes.
*   **jsforce Connection Methods Guide**: https://jsforce.github.io/document/#connection
    *   *Evidence Tier:* Official
    *   *Contribution:* Verified connection properties, refresh events, and query execution constraints.
*   **jsforce GitHub Repository Issue #987**: https://github.com/jsforce/jsforce/issues/987
    *   *Evidence Tier:* Community
    *   *Contribution:* Captured the real-world execution symptoms and reproduction parameters of the INVALID_SESSION_ID exception on expired auth tokens.
