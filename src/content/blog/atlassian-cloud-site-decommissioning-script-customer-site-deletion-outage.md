---
pipeline_contract_version: "42.1.0"
title: "Why Decommissioning Scripts Delete Production: Atlassian 2022 Outage Post-Mortem"
meta_title: "Atlassian April 2022 Outage: 14-Day Site Deletion RCA"
description: "Technical post-mortem of the April 2022 Atlassian Cloud outage where an un-bounded maintenance script deleted 775 customer sites."
pubDate: "2026-07-17"
tags: ["cloud-infrastructure", "atlassian", "jira-service-management", "hard-deletion-api", "site-decommissioning", "sre-postmortem", "data-recovery"]
shortenedSlug: "atlassian-cloud-site-decommissioning-script-customer-site-deletion-outage"
slug: "atlassian-cloud-site-decommissioning-script-customer-site-deletion-outage"
target_systems: "Atlassian Cloud Platform, Jira Service Management, Insight Asset Manager & Decommissioning API"
read_time_minutes: 9
difficulty_level: "Advanced"
---

# Why Decommissioning Scripts Delete Production: Atlassian 2022 Outage Post-Mortem

On April 5, 2022, at 07:24 UTC, an automated administrative maintenance script launched by Atlassian engineering triggered an unprecedented multi-tenant cloud disaster. Over a 23-minute execution window, the script permanently deleted 775 enterprise customer cloud sites across Jira Work Management, Jira Service Management, Confluence, and Opsgenie. The incident was not caused by a zero-day exploit, database corruption, or ransomware. Instead, it was driven by an administrative API design flaw that accepted whole customer cloud site identifiers (`SiteID`) instead of specific application plugin identifiers (`AppID`), combined with a hard-deletion execution pipeline that bypassed soft-delete trash retention buffers. For the worst-affected enterprise customers, recovery required 14 days of manual point-in-time database reconstruction.

---

### Multi-Tenant Architecture and Application Plugin Lifecycles

To understand how a routine app decommissioning task deleted hundreds of production customer environments, one must examine Atlassian’s cloud micro-tenant architecture and administrative API infrastructure.

Atlassian Cloud operates a multi-tenant platform where enterprise customers inhabit isolated logical sites. Each customer site (e.g., `company.atlassian.net`) consists of multiple integrated application microservices backed by shared PostgreSQL database shards, document stores, and microservice state stores.

``

```text
+-----------------------------------------------------------------------------------+
|                     ATLASSIAN CLOUD TENANT & APP ARCHITECTURE                     |
+-----------------------------------------------------------------------------------+
|  [ Customer Site: company.atlassian.net ] (SiteID: 10045)                        |
|   ├── Jira Core Service                                                           |
|   ├── Confluence Service                                                          |
|   └── Installed Apps: [ Insight Asset Manager ] (AppID: app_50012)                 |
+-----------------------------------------------------------------------------------+
```

``

When Atlassian acquired **Insight Asset Management**, the application initially operated as a standalone add-on app installed on customer sites. Later, Atlassian integrated Insight's asset management capabilities natively into Jira Service Management, making the legacy standalone Insight app redundant.

To clean up legacy infrastructure, Atlassian initiated a routine maintenance campaign to uninstall the standalone Insight app from customer sites that had already migrated to the native Jira Service Management feature set.

---

### The ID Payload Mismatch and API Parameter Untyping

The maintenance procedure required compiling a list of target identifiers and passing them to an automated maintenance script. The script's role was to call an internal administrative API to purge the legacy standalone app installation.

However, two critical failure vectors aligned:

#### 1. The Inter-Team Communication & ID Payload Error
During the preparation phase, the engineering team requesting the decommissioning generated an export list of target sites. Due to a communication misunderstanding between the product team and the maintenance team, the input list contained **Customer Cloud Site Identifiers (`SiteID`)** instead of **Standalone App Instance Identifiers (`AppID`)**.

#### 2. Weak Parameter Typing in the Decommissioning API
The internal administrative API endpoint used by the maintenance script was originally designed to support both app un-installations and complete site teardowns.

``

```text
+-----------------------------------------------------------------------------------+
|                   UN-TYPED API EXECUTION & HARD DELETION CASCADE                  |
+-----------------------------------------------------------------------------------+
| 1. Script Supplies SiteID (10045)  -->  2. API Lacks Input Type Validation        |
| 3. API Treats ID as Site Teardown  -->  4. Executes Immediate Hard Database Purge |
| 5. Bypasses 30-Day Soft Delete     -->  6. 775 Customer Sites Wiped in 23 Minutes   |
+-----------------------------------------------------------------------------------+
```

``

Instead of enforcing strict type boundaries (e.g., requiring an explicit `type: "APP_INSTALLATION"` parameter), the API accepted any string ID. When passed a `SiteID`, the API implicitly interpreted the request as an instruction to **permanently delete the entire customer cloud site**.

Because the API operated with un-bounded internal administrative privileges, it executed the request immediately across all backend microservice databases, unlinking tenant schemas, dropping relational tables, and purging access tokens.

---

### Bypassing Soft-Delete Retention: The Hard Deletion Vector

Standard user-initiated site deletion workflows in Atlassian Cloud enforce a mandatory **30-day Soft-Delete Retention Window**. If a customer cancels their subscription or requests site deletion, the site state is marked as `DELETED_PENDING_PURGE`, hiding it from public access while preserving underlying database schemas for 30 days to protect against accidental loss.

However, the internal administrative decommissioning API used by the maintenance team contained an override flag designed to bypass the soft-delete staging area for internal testing and rapid site recycling.

When the maintenance script ran:
- The override flag was enabled by default in the script template.
- The 30-day soft-delete buffer was completely bypassed.
- Database tables, attachments, user permissions, and issue histories across 775 customer sites were subjected to immediate, un-recoverable hard deletion across production storage clusters.

The script executed at high speed, processing hundreds of site deletions per minute. By the time automated alert monitoring flagged a sudden spike in site unreachability and engineers manually killed the script, **775 customer sites** had been hard-deleted over a 23-minute window.

---

### The 14-Day Reconstruction Crisis: Manual Point-in-Time Database Assembly

Because the internal API performed immediate hard deletions, restoring the 775 deleted sites was extraordinarily complex. Atlassian SREs could not simply issue an `UPDATE sites SET deleted = false` query.

The data for each affected customer site was distributed across multiple microservice databases, document stores, and attachment blobs. To restore a single site, engineers had to:
1. Locate the precise point-in-time cold backup taken immediately prior to 07:24 UTC on April 5 for that specific database shard.
2. Spin up an isolated staging database instance and restore the cold backup snapshot.
3. Extract the specific relational tables and rows belonging to the deleted `SiteID`.
4. Re-inject the extracted tenant data into production database shards without corrupting adjacent active tenants.
5. Re-establish user identity mappings, API tokens, and cross-application permissions.

``

```text
+-----------------------------------------------------------------------------------+
|               MANUAL POINT-IN-TIME RECONSTRUCTION PIPELINE                        |
+-----------------------------------------------------------------------------------+
| 1. Cold Backup Snapshot  -->  2. Restore to Staging DB  -->  3. Extract Tenant ID  |
| 4. Validate Data Integrity ->  5. Re-inject to Production DB ->  6. Rebind Identity|
+-----------------------------------------------------------------------------------+
```

``

Because each customer site had unique app configurations, custom workflow schemas, and third-party integration tokens, each restoration required extensive manual verification. Atlassian mobilized hundreds of engineers 24/7, progressively restoring customer sites over a 14-day window before the final batch was returned to service.

---

### Safeguarding Micro-Tenant Decommissioning APIs against Hard Deletions

Following the official Post-Incident Review (PIR), Atlassian executed sweeping architectural overhauls across its administrative APIs and operational automation playbooks:

#### 1. Enforcing Soft-Delete Retention by Default
*System Risk:* Administrative APIs offering flags that execute immediate hard deletions of customer data.  
*Operational Guardrail:* Permanently remove hard-deletion capabilities from standard administrative APIs. All deletion operations MUST pass through a non-bypassable 30-day soft-delete buffer. Hard purges must require separate, asynchronous background cleanup jobs executed only after soft-delete retention expires.

#### 2. Strongly Typed API Request Schemas
*System Risk:* Internal APIs accepting untyped string identifiers that can be misconstrued as different resource types.  
*Operational Guardrail:* Enforce strong type validation on all internal endpoints. API definitions must require explicit, typed parameters (e.g., `AppInstallationID` vs `TenantSiteID`) and reject any payload where parameter structures do not match the target resource type explicitly:
```json
// Enforced typed request payload schema
{
  "resource_type": "APPLICATION_INSTALLATION",
  "target_app_id": "app_50012",
  "scope_site_id": "site_10045"
}
```

#### 3. Automated Deletion Rate Circuit Breakers
*System Risk:* Un-bounded administrative scripts executing mass deletions at high speed.  
*Operational Guardrail:* Deploy automated rate-limiting circuit breakers on administrative deletion endpoints. If deletion velocity exceeds a strict threshold (e.g., >5 resource deletions per minute), the API gateway MUST automatically trip a circuit breaker, freeze execution, and alert SRE teams immediately.

---

### Auditing Soft-Delete Enforcement and Decommissioning Telemetry

When auditing administrative automation safety and verifying soft-delete enforcement, execute these operational checks:

1. **Verify Soft-Delete Buffer Enforcement on Decommissioning Endpoints:**
   Audit administrative API endpoints to confirm hard-deletion flags are disabled and soft-delete retention is active:
   ```text
   curl -X DELETE -H "Authorization: Bearer $ADMIN_TOKEN" \
     https://admin-api.internal/v1/apps/app_50012
   # Confirm response confirms state: "PENDING_PURGE_SOFT_DELETED" with 30-day retention window
   ```

2. **Validate Dry-Run Execution Pipelines:**
   Run administrative maintenance automation in `--dry-run` mode to inspect generated execution targets prior to production invocation:
   ```text
   python3 decommission_app.py --app-id app_50012 --dry-run
   # Inspect generated CSV manifest and verify zero SiteIDs are present in target payload
   ```

3. **Monitor Real-Time Deletion Telemetry Metrics:**
   Set up Prometheus / Grafana alerts tracking administrative resource deletion velocity:
   ```yaml
   groups:
   - name: admin_deletion_alerts
     rules:
     - alert: HighResourceDeletionRate
       expr: rate(admin_resource_deletions_total[1m]) > 0.05
       for: 30s
       labels:
         severity: critical
       annotations:
         summary: "Administrative resource deletion rate exceeded safety threshold (>3 deletions/min)"
   ```

---

### References
*   [Atlassian Official Engineering Post-Incident Review — April 2022 Cloud Outage](https://www.atlassian.com/blog)
*   [Postmortems.app Archive — Atlassian 2022 775 Cloud Site Decommissioning Analysis](https://postmortems.app)
*   [SRE Book — Incident Management & Automation Safety Principles](https://sre.google/sre-book/table-of-contents/)
