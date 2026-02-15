---
sidebar_position: 1
---

# Introduction

Welcome to **Testream** - a modern test management platform designed for development teams who want to streamline their testing workflows and gain powerful insights into test results.

## What is Testream?

Testream is a comprehensive test management platform that integrates seamlessly with your existing testing frameworks and CI/CD pipelines. It provides:

- **Centralized Test Reporting** - Aggregate test results from multiple frameworks and projects
- **Advanced Analytics** - Track trends, identify flaky tests, and monitor test health
- **Jira Integration** - View test results directly in Jira issues and projects
- **CI/CD Ready** - GitHub Actions + CLI for any CI provider
- **Historical Tracking** - Track test performance over time with detailed dashboards

## Key Features

### Multi-Framework Support

Testream supports popular testing frameworks out of the box:

- **Playwright** - E2E testing for modern web apps
- **Cypress** - E2E testing for web applications
- **Jest** - Unit and integration testing for JavaScript/TypeScript
- **.NET** - xUnit, NUnit, MSTest, and TRX formats

### CTRF Standard

All reporters use the [Common Test Report Format (CTRF)](https://github.com/ctrf-io/ctrf) - an open standard for test result reporting. This ensures consistency and interoperability across different testing tools.

### CI Uploads (Action & CLI)

Upload test results and artifacts with minimal configuration:

```yaml
- uses: testream/upload-action@v0.4.1
  with:
    report-path: ctrf/ctrf-report.json
    test-tool: playwright
    api-key: ${{ secrets.TESTREAM_API_KEY }}
```

Or use the CLI directly:

```bash
npx @testream/upload-action \
  --report-path ctrf/ctrf-report.json \
  --test-tool playwright \
  --api-key $TESTREAM_API_KEY
```

### Jira Dashboard

Install the Testream for Jira app to access:

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
