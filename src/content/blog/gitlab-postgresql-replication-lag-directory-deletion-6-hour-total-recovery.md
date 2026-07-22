---
title: "GitLab PostgreSQL replication lag directory deletion 6-hour total recovery"
meta_title: "GitLab 2017 Outage: Database Directory Deletion"
description: "An accidental rm -rf execution on GitLab's primary PostgreSQL database during a replication resync on Jan 31, 2017, caused an 18-hour outage."
pubDate: "2026-07-16"
tags: ["gitlab", "postgresql", "database", "service-outage", "incident-analysis"]
slug: "gitlab-postgresql-replication-lag-directory-deletion-6-hour-total-recovery"
---

# GitLab PostgreSQL replication lag directory deletion 6-hour total recovery [Status: RESOLVED]

### The Incident
| Field | Value |
| :--- | :--- |
| **Company** | GitLab |
| **Date** | January 31, 2017 |
| **Status** | RESOLVED |
| **Category** | Primary Database Directory Deletion |
| **Root Cause** | Accidental rm -rf execution on the primary node during replication lag resynchronization |
| **Operational Impact** | Service downtime of roughly 18 hours and permanent loss of 6 hours of user metadata |
| **Official RCA** | [GitLab Post-Mortem Blog](https://about.gitlab.com/blog/postmortem-of-database-outage-of-january-31/) |

On January 31, 2017, a series of cascading system failures on GitLab.com resulted in a catastrophic GitLab PostgreSQL replication lag directory deletion 6-hour total recovery event. The incident began when high traffic spikes caused the secondary node to stop synchronizing with the primary database. In an attempt to clear the lag, an engineer accidentally executed a directory deletion command on the primary server instead of the replica node, wiping over [300 GB](https://about.gitlab.com/blog/postmortem-of-database-outage-of-january-31/) of live customer data. The recovery process was severely delayed because multiple backup procedures had failed silently prior to the event, leading to [6-hour](https://about.gitlab.com/blog/postmortem-of-database-outage-of-january-31/) periods of permanent user data loss during the [18-hour](https://about.gitlab.com/blog/postmortem-of-database-outage-of-january-31/) service outage.

*   **2017-01-31 17:20 UTC**: High traffic load triggers replication lag on the secondary PostgreSQL database instance, halting synchronization.
*   **2017-01-31 23:00 UTC**: An engineer initiates a manual resync, executing `rm -rf` on the primary database server by mistake.
*   **2017-02-01 18:14 UTC**: Production databases are restored to the 17:20 UTC snapshot, and the site resumes operations.

### Systems Affected & Operational Impact
The incident directly targeted the PostgreSQL production database cluster hosting GitLab.com's relational metadata. Git repositories and wiki folders (which reside on separate storage hosts) remained completely intact, but all platform metadata—including user accounts, issues, merge requests, comments, and snippets created during the lag window—was destroyed. The outage completely disabled user access to the website, webhook triggers, CI/CD runner loops, and project collaboration services for roughly 18 hours.

### The Technical Failure
The incident originated from a high database load caused by spam accounts and background cleanup operations, which overloaded the primary database and created massive replication lag on the secondary replica. In an effort to reset the desynchronized replication state, an engineer logged in to clean the secondary database's data directory (`/var/opt/gitlab/postgresql/data`) to force a fresh synchronization. However, the engineer was connected to the primary production terminal instead of the secondary replica, executing the deletion command (`rm -rf`) on the primary server. The command wiped the directories instantly. Although the engineer terminated the process within seconds, the core tables had already been destroyed.

Subsequent disaster recovery failed because five independent backup strategies had failed:
1. The `pg_dump` backup cron was failing silently due to a PostgreSQL version mismatch (running 9.2 binary tools against a 9.6 database engine).
2. Azure Disk Snapshots were disabled for the database instances.
3. LVM snapshots were only configured to run every 24 hours.
4. S3 backups were empty.
5. Backup replication logs were disconnected.

### Vendor Response & Evolution
To restore operations, GitLab engineers located an LVM snapshot taken on the primary database at 17:20 UTC (just before the replication freeze), restored it to a staging host, and migrated it back to production. In response to the failure, GitLab modernized its backup reporting to send immediate alerts for exit code errors, disabled SSH permissions that allow root deletions on production clusters, and automated replication resynchronization routines to eliminate human terminal scripts.

### Engineering Analysis & Historical Comparisons
The GitLab database crash highlights the critical importance of validating backup integrity and restricting privileged terminal access. A common operational anti-pattern is assuming that because a backup cron script runs, it successfully generates valid archives. This outage shares technical characteristics with the 2012 Knight Capital Group software failure, where manual deployment errors on production servers led to immediate business liquidation. To avoid manual execution bugs, infrastructure teams must execute database maintenance operations using automated configuration management playbooks rather than raw terminal shells.

### References
*   [GitLab Post-Mortem Incident Report](https://about.gitlab.com/blog/postmortem-of-database-outage-of-january-31/)
*   [GitLab Public Incident Issue Tracker](https://gitlab.com/gitlab-com/www-gitlab-com/-/issues/1108)