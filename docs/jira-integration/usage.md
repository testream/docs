---
sidebar_position: 3
title: Use Testream in Jira
description: Review automated test runs, failures, issue summaries, release links, and PDF reports inside Jira after Testream receives a run from CI or local execution.
keywords:
  - use testream in jira
  - review test results in jira
  - jira test run workflow
  - failure evidence in jira
---

# Use Testream in Jira

After Testream receives an automated run, Jira becomes the place your team can review status, failures, evidence, and release signal.

## Open Testream

After installation, open Testream from Jira:

1. Click **Apps** in the top navigation bar.
2. Select **Testream for Jira** from the dropdown menu.
3. If your Jira workspace has many apps installed, check **More** or your project sidebar.

Need to install it first? Follow the [installation guide](../getting-started/installation) or open the [Atlassian Marketplace listing](https://marketplace.atlassian.com/apps/3048460704).

## Review Recent Runs

Use the [Dashboard](../features/dashboard) to see current quality signal across projects, then open [Test Run Details](../features/test-run-details) for a specific run.

In a run, check:

- Pass rate and failed tests.
- Branch, commit, build, and environment metadata.
- [Test Suite Changes](../features/test-suite-changes) to see what was added, removed, or unchanged.
- Linked Jira release, when the run belongs to a version.

## Investigate Failures

Open failed tests from the run details view. [Failure Inspection](../features/failure-inspection) keeps the error message, stack trace, screenshots, traces, videos, logs, and metadata attached to the result.

When a failure needs follow-up, use [Issue Creation](../features/issue-creation) to create a Jira issue with the failure context already attached.

## Bring Test Evidence Into Jira Issues

[Test Run Summaries in Jira Issues](../features/test-run-summaries-in-jira-issues) show linked run status, branch, commit, and suite-change highlights on the Jira issue itself. This keeps quality signal readable for QA, engineering, product, and release stakeholders.

If your team writes acceptance criteria in Jira, [Testream BDD Specs](../features/bdd-gherkin-specs) can draft or improve Gherkin scenarios with Rovo and assess them against ingested automated evidence.

If you are still evaluating whether that workflow fits your team, read [BDD Jira integration](https://testream.app/bdd-jira-integration).

## Review Releases and Share Reports

Use [Trends & Analytics](../features/trends-analytics) to spot quality movement over time. Use [Release Management](../features/release-management) to connect runs to Jira releases before shipping. When stakeholders need a portable summary, generate [PDF Reports](../features/pdf-reports) from the run.

For the broader release-readiness product overview, read [Jira release test management](https://testream.app/jira-release-test-management).

## Permissions

Access depends on your Jira workspace, project permissions, and Testream app configuration. Contact your Jira administrator if users cannot see the app, project, or issue panel they expect.

## Getting Help

If you encounter issues or have questions:

- Email: [contact@testream.app](mailto:contact@testream.app)
- Documentation: [Read the docs](/)
- Report bugs: [Testream Service Space](https://testream.atlassian.net/servicedesk/customer/portal/1/group/1/create)

## What's Next?

- Publish a first run with the [Quick Start](../getting-started/quick-start).
- Choose a reporter from the [Installation guide](../getting-started/installation#reporters).
- Use the [Testream Setup Agent](../getting-started/ai-assisted-setup) if your Jira workspace has Rovo enabled.
- Review [Jira test reporting](https://testream.app/jira-test-reporting) for the commercial overview.
- Review [Jira release test management](https://testream.app/jira-release-test-management) for release-focused evaluation.
