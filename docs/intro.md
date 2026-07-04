---
sidebar_position: 1
title: Introduction
description: Learn how Testream sends automated test results from CI/CD into Jira with reporters, CTRF uploads, reusable BDD workflows, artifacts, and release visibility.
keywords:
  - jira test reporting docs
  - automated test reporting jira
  - ci cd test results jira
---

# Introduction

Welcome to **Testream**, code-first automated test reporting for Jira teams.

Testream brings automated test results from CI/CD into Jira so teams can review pass rate, failures, artifacts, branch and commit context, suite changes, reusable BDD workflows, and release readiness without creating a separate heavy manual test-case layer.

## What is Testream?

Testream publishes automated test results into Jira with the context teams need to understand delivery risk:

- **Jira-native run summaries** - See pass rate, failed tests, branch, commit, and suite changes where work is already tracked.
- **Failure evidence** - Keep errors, stack traces, screenshots, videos, traces, logs, and metadata connected to the result.
- **CI/CD context** - Attach branch, commit, environment, and run metadata from local runs or pipelines.
- **Trends and release signal** - Track flaky behavior, suite growth, timing changes, and release readiness over time.
- **Reusable BDD workflows** - Manage shared behaviors, manual cycles, and release evidence without duplicating acceptance criteria.
- **Code-first reporting** - Start from the automated tests you already run, not from a separate manual test-case inventory.
- **Shared quality visibility** - Give developers, QA, product, and release stakeholders one readable quality signal inside Jira.

## Key Features

### Multi-Framework Support

Testream supports the following reporters out of the box:

- **Playwright** - E2E testing for modern web apps
- **.NET** - xUnit, NUnit, MSTest, and TRX formats
- **Cypress** - E2E testing for web applications
- **Jest** - Unit and integration testing for JavaScript/TypeScript
- **WebdriverIO** - E2E testing for web applications
- **Mocha** - Flexible JavaScript test framework
- **CLI** - Upload CTRF reports from any test tool
- **JUnit** - Parse and upload JUnit XML test results
- **Vitest** - Blazing-fast unit testing for Vite projects
- **pytest** - Python testing framework with rich plugin ecosystem

### CTRF Standard

All reporters use the [Common Test Report Format (CTRF)](https://github.com/ctrf-io/ctrf) - an open standard for test result reporting. This ensures consistency and interoperability across different testing tools.

### CI/CD Integration

Upload test results and artifacts from local runs or any stage of your pipeline. Whether you use GitHub Actions, Jenkins, CircleCI, Azure DevOps, or another CI/CD provider, Testream reporters and the CLI can publish results with `TESTREAM_API_KEY`:

```yaml
- uses: testream/cli@latest
  with:
    report-path: ctrf/ctrf-report.json
    test-tool: playwright
    api-key: ${{ secrets.TESTREAM_API_KEY }}
```

Or use the CLI directly:

```bash
npx @testream/cli \
  --report-path ctrf/ctrf-report.json \
  --test-tool playwright \
  --api-key $TESTREAM_API_KEY
```

### Testream for Jira

Install the [Testream for Jira app](https://marketplace.atlassian.com/apps/3048460704) to make automated test evidence visible inside Jira:

- **Test Run Summaries in Jira Issues** - View summaries of test runs directly within Jira issues.
- **Test Suite Changes** - Track tests added, removed, and unchanged between runs on the same branch.
- **Rovo-assisted setup** - Let the Testream Setup Agent recommend reporters, CI guidance, and first-run checks from Jira.
- **BDD Specs with Rovo** - Draft Jira issue-level Gherkin scenarios and assess them against Testream's captured test evidence.
- **BDD Library** - Reuse behaviors across Jira issues, cycles, and releases.
- **Test cycles** - Execute lean manual coverage from reusable behaviors.
- **Detailed test runs** - View results with branch, commit, and environment metadata
- **Create issues from failures** - One-click bug creation with pre-filled context
- **Rich debugging artifacts** - Screenshots, videos, and trace files inline
- **Trends & analytics** - Track test performance over time
- **Release management** - Filter and assess quality by release version
- **Release visibility** - Review release readiness through behavior evidence, linked cycles, and mapping gaps
- **PDF reports** - Generate downloadable PDF summaries of test runs
- **Test health metrics** - Pass rate, failed tests, and flaky test detection

[Learn more about the Jira integration](./jira-integration/overview) | [Explore all features](./features/dashboard)

## Getting Started

The fastest proof is one real automated run in Jira:

- [**Quick Start**](./getting-started/quick-start) - Publish your first automated test run into Jira
- [**Installation Guide**](./getting-started/installation) - Choose the reporter for your framework
- [**AI-Assisted Setup with Rovo**](./getting-started/ai-assisted-setup) - Let the Testream Setup Agent guide reporter and CI setup
- [**CLI Reporter**](./reporters/cli) - Upload CTRF or converted reports from any test tool

## Need Help?

- Email: [contact@testream.app](mailto:contact@testream.app)
- Website: [testream.app](https://testream.app)
