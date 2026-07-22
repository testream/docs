---
sidebar_position: 9
title: Artifact Storage
description: Keep automated test artifacts private in Testream with managed storage or your own bucket while still making them accessible from Jira.
keywords:
  - private test artifact storage jira
  - testream artifact storage
  - customer owned bucket test artifacts
  - screenshots traces private storage
---

# Artifact Storage

Keep test artifacts private while still making them easy to access from Testream and Jira.

Testream supports two private storage modes:

- **Testream-managed storage** - the simplest option, with private storage handled by Testream.
- **Customer-owned bucket storage** - connect your own bucket when your team needs to control where artifacts live.

![Artifact Storage page showing Testream-managed storage and customer-owned bucket options](/img/product/testream-artifact-storage-overview.png)

## Storage Options

| Option                        | Best for                                                         | What you manage                                              |
| ----------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------ |
| Testream-managed storage      | Teams that want the quickest setup                               | Nothing beyond using Testream normally                       |
| Customer-owned bucket storage | Teams that need to persist artifacts in their own infrastructure | Bucket connection, project attachment, and connection health |

## Testream-Managed Storage

Testream-managed storage is the default private storage option. It works well when you want private artifact storage without maintaining your own bucket setup.

Use this option when your team wants the simplest path from test runs to private artifact access.

![Project storage settings page showing Testream-managed private artifact storage for a project](/img/jira/Artifact-Storage-Testream-Managed.png)

## Open Storage From Projects

From the **Projects** page, use the **Manage** button in the **Storage** column to open a project’s storage settings.

This is the quickest way to review the active storage mode, attach a bucket connection, or switch a project back to managed storage.

![Projects page showing the Manage action in the Storage column for opening project storage settings](/img/jira/Artifact-Storage-Projects.png)

## Set Up a Customer-Owned Bucket

1. Open **Artifact Storage** in Testream.
2. Create a new bucket connection.
3. Enter the bucket details and credentials.
4. Test the connection.
5. Attach the connection to a project.
6. Optionally set a base prefix for that project.

![New artifact storage connection form for configuring a customer-owned bucket](/img/product/testream-artifact-storage-connection.png)

## Manage Project Storage

On a project’s storage page, you can:

- view the active storage mode
- test the current connection
- edit the base prefix
- disable customer-owned storage for the project

![Project storage attachment screen for linking a bucket connection to a Testream project](/img/product/testream-artifact-storage-attach.png)

## What Happens When a Connection Is Deleted

If a bucket connection is deleted, Testream stops using it for future access. Historical artifacts and reports stored in that connection may no longer be available.

If you only want to stop using the connection for a project, disable it from the project storage page instead of deleting it.

## Choosing Between the Two

Choose **Testream-managed storage** if you want the fastest, simplest setup.

Choose **Customer-owned bucket storage** if your team needs to connect its own bucket and manage that connection over time.

## Next Steps

- [Failure Inspection](./failure-inspection) to see how artifacts help with failed-test debugging.
- [Quick Start](../getting-started/quick-start) to publish the first artifact-producing run.
- [CI/CD test results in Jira](https://testream.app/ci-test-results-jira) for the higher-level product overview.
