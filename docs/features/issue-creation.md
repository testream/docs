---
sidebar_position: 3
title: Issue Creation
description: Create Jira issues directly from failed tests with pre-filled failure, environment, and run context from Testream.
keywords:
  - create jira issue from failed test
  - failed test issue creation jira
  - automated bug creation jira tests
  - testream issue creation
---

# Issue Creation

Create Jira issues directly from failed tests with pre-filled failure context and custom fields.

![Create Issue from Failed Test](/img/jira/Create-Issue-From-Failed-Test-Screenshot.png)

## Steps to Create an Issue

1. Click the **"Create Issue"** button next to any failed test
2. Review the pre-filled issue form:
   - **Summary** - Auto-populated with test name
   - **Description** - Includes error message and test context
   - **Project** - Select destination Jira project
   - **Issue Type** - Choose Bug, Task, etc.
3. The following custom fields are automatically populated:
   - **Test Run ID** - Links back to the specific test execution
   - **Test Name** - Full test identifier
   - **Environment** - Where the test failed (staging, production, etc.)
4. Click **"Create"** to generate the issue

The created issue will contain all context needed for developers to investigate and fix the failure.

## Next Steps

- [Failure Inspection](./failure-inspection) to review the failed evidence before opening work.
- [Test Run Summaries in Jira Issues](./test-run-summaries-in-jira-issues) to keep linked run context visible on the issue.
- [Jira test reporting](https://testream.app/jira-test-reporting) for the higher-level product overview.
