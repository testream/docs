---
sidebar_position: 1
---

# Introduction

Welcome to **Testream** - a modern code-first test management platform designed for development teams who want to streamline their testing workflows and gain powerful insights into test results.

## What is Testream?

Testream is a comprehensive test management platform that integrates seamlessly with your existing testing frameworks and CI/CD pipelines. It provides:

- **Centralized Test Reporting** - Aggregate test results from multiple frameworks and projects
- **Advanced Analytics** - Track trends, identify flaky tests, and monitor test health
- **Jira Integration** - View test results directly in Jira issues and projects
- **CI/CD Ready** - Integrate Testream reporters to upload results from your pipelines with minimal configuration
- **Historical Tracking** - Track test performance over time with detailed dashboards
- **Artifact Management** - Store and view test artifacts like screenshots (videos and trace files coming soon!)
- **Source of Truth** - A single source of truth for all your test results, accessible to developers, QA, and stakeholders

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

### CTRF Standard

All reporters use the [Common Test Report Format (CTRF)](https://github.com/ctrf-io/ctrf) - an open standard for test result reporting. This ensures consistency and interoperability across different testing tools.

### CI/CD Integration

Upload test results and artifacts with minimal configuration in any stage of your pipeline. Whether you're using GitHub Actions, Jenkins, CircleCI, or any other CI/CD platform, Testream makes it easy to integrate:

```yaml
- uses: testream/cli@latest
  with:
    report-path: ctrf/ctrf-report.json
    test-tool: playwright
    api-key: ${{ secrets.TESTREAM_API_KEY }}
```

Or use the CLI directly:

```bash
git npx @testream/cli \
  --report-path ctrf/ctrf-report.json \
  --test-tool playwright \
  --api-key $TESTREAM_API_KEY
```

### Testream for Jira

Install the [Testream for Jira app](https://marketplace.atlassian.com/apps/3048460704/testream-for-jira) to access:

- **Test health metrics** - Pass rate, failed tests, and flaky test detection
- **Detailed test runs** - View results with branch, commit, and environment metadata
- **Create issues from failures** - One-click bug creation with pre-filled context
- **Rich debugging artifacts** - Screenshots, videos, and trace files inline
- **Trends & analytics** - Track test performance over time
- **Release management** - Filter and assess quality by release version
- **PDF reports** - Generate downloadable PDF summaries of test runs

[Learn more about the Jira integration](./jira-integration/overview) | [Explore all features](./features/dashboard)

## Getting Started

Ready to integrate Testream? Choose your path:

- [**Installation Guide**](./getting-started/installation) - Install reporters for your framework
- [**Quick Start**](./getting-started/quick-start) - Get up and running in 5 minutes
- [**CLI Reporter**](./reporters/cli) - Upload results from your pipeline

## Need Help?

- Email: [contact@testream.app](mailto:contact@testream.app)
- Issues: [GitHub Issues](https://github.com/testream/docs/issues)
- Website: [testream.app](https://testream.app)
