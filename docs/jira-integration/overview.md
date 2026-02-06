---
sidebar_position: 2
---

# Overview

The Testream for Jira integration brings comprehensive test reporting directly into your Jira workspace. View test results, track quality trends, inspect failures with rich artifacts, and create issues from failed tests—all without leaving Jira.

## Key Features

### Test Health at a Glance

Monitor your test suite's overall health with an intuitive dashboard that displays:

- **Total Tests** - Complete count of tests in your suite
- **Pass Rate** - Success percentage at a glance
- **Failed Tests** - Quick identification of test failures
- **Skipped Tests** - Track intentionally skipped tests
- **Flaky Tests** - Identify unreliable tests that need attention
- **Test Results Distribution** - Visual donut chart showing pass/fail/skip breakdown
- **Recent Test Runs** - Chronological list of your latest test executions

![Dashboard Overview](/img/jira/Dashboard-Screenshot.png)

### View Detailed Test Results

Click into any test run to see comprehensive metadata and results:

- **Metadata** - Branch name, commit hash, environment, duration, test tool used, and start time
- **Results Summary** - Detailed breakdown of passed, failed, and skipped tests
- **Release Linking** - Associate test runs with specific Jira release versions
- **Failed Tests List** - Quick access to all failures with the ability to create issues directly

![Test Run Details](/img/jira/Test-Run-Details-Screenshot.png)

### Turn Failed Tests into Jira Issues

Streamline your bug reporting workflow with one-click issue creation:

- **One-Click Creation** - Click "Create Issue" button next to any failed test
- **Pre-Filled Context** - Issue summary and description automatically populated with test details
- **Custom Fields** - Test Run ID, Test Name, and Environment automatically attached
- **Seamless Workflow** - Create issues without context switching or manual copy-paste

![Create Issue from Failed Test](/img/jira/Create-Issue-From-Failed-Test-Screenshot.png)

### Inspect Test Failures

Debug failures efficiently with rich diagnostic information:

- **Error Messages** - Clear, formatted error output
- **Stack Traces** - Full stack traces with expandable sections
- **Artifacts** - Screenshots, videos, and trace files captured during test execution
- **Thumbnail Previews** - Visual artifacts displayed inline for quick inspection

![Failed Test Details](/img/jira/Failed-Test-Screenshot.png)

### Trends & Analytics

Understand your test suite's evolution over time:

- **Pass/Fail Trends** - Visualize test results over custom date ranges
- **Test Suite Growth** - Track how your test coverage expands
- **Duration Trends** - Monitor test execution time patterns
- **Date Range Selection** - Filter trends by specific time periods
- **Flaky Test Detection** - Identify tests with inconsistent results

![Trends and Analytics](/img/jira/Trends-Screenshot-1.png)

### Release Management

Track test quality across your release cycle:

- **Release Filtering** - View test runs associated with specific Jira releases
- **Version Tracking** - Monitor quality gates for each release version
- **Release Health** - Assess readiness by reviewing test results per release

![Releases View](/img/jira/Releases-Screenshot.png)

## Who Should Use This Integration?

The Testream for Jira integration is designed for:

- **QA Engineers** - Monitor test health and debug failures without switching tools
- **Developers** - View test results for your commits and branches directly in Jira
- **Product Managers** - Track quality metrics and release readiness
- **Engineering Managers** - Gain visibility into team testing practices and quality trends
- **DevOps Teams** - Integrate testing data into existing Jira workflows

## What's Next?

Ready to get started? Follow these steps:

1. **[Install the app](./installation)** - Set up Testream for Jira in your workspace
2. **[Learn to use it](./usage)** - Explore features and best practices
3. **Configure reporters** - Set up test framework reporters to send data to Testream
4. **Start testing** - Run your tests and see results appear in Jira
