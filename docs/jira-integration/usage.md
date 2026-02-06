---
sidebar_position: 3
---

# Usage

Learn how to view test results, debug failures, track trends, and create issues directly in Jira using the Testream integration.

## Accessing the Dashboard

After installation and configuration, access Testream in Jira:

1. Click **Apps** in the top navigation bar
2. Select **Testream for Jira** from the dropdown menu

Alternatively, you may find Testream in your project sidebar depending on your Jira configuration.

## Dashboard Overview

The main dashboard provides a comprehensive view of your test health:

![Dashboard Overview](/img/jira/Dashboard-Screenshot.png)

### Test Metrics Cards

At the top of the dashboard, you'll see key metrics:

- **Total Tests** - Complete count of all tests in your suite
- **Pass Rate** - Overall success percentage
- **Failed Tests** - Number of currently failing tests
- **Skipped Tests** - Count of intentionally skipped tests
- **Flaky Tests** - Tests with inconsistent pass/fail behavior

### Test Results Distribution

The donut chart visualizes your test results breakdown showing passed, failed, and skipped tests. This provides an at-a-glance view of test suite health.

### Recent Test Runs

Below the metrics, you'll find a chronological list of recent test executions showing:
- Test run timestamp
- Duration
- Pass/fail counts
- Quick action buttons

### Action Buttons

- **Releases** - Navigate to release-specific test results
- **View Trends** - Access analytics and historical data
- **View All Runs** - See complete test run history

## Viewing Test Run Details

Click on any test run to see comprehensive details:

![Test Run Details](/img/jira/Test-Run-Details-Screenshot.png)

### Metadata Section

Each test run includes detailed context:

- **Branch** - Git branch where tests ran
- **Duration** - Total execution time
- **Started** - Timestamp of test execution
- **Tool** - Test framework used (Playwright, Jest, .NET, etc.)
- **Commit** - Git commit hash with link to repository
- **Environment** - Test environment (staging, production, etc.)

### Results Summary

View aggregate statistics:
- Number of passed tests
- Number of failed tests
- Number of skipped tests
- Overall success rate

### Release Linking

Associate test runs with Jira release versions using the **"Link to Release"** button. This helps track quality per release cycle.

### Failed Tests List

All failed tests are listed with:
- Test name
- Error message preview
- **"Create Issue"** button for each failure

## Inspecting Failed Tests

Click on a failed test to see detailed diagnostic information:

![Failed Test Details](/img/jira/Failed-Test-Screenshot.png)

### Error Messages

Clear, formatted error output explaining why the test failed.

### Stack Traces

Expandable stack trace sections showing:
- File paths with line numbers
- Function call hierarchy
- Error propagation

### Artifacts

Visual debugging aids captured during test execution:

- **Screenshots** - Visual state at failure point
- **Videos** - Recording of test execution
- **Trace Files** - Detailed execution traces (Playwright trace viewer compatible)

Artifacts appear as thumbnail previews that you can click to view full-size or download.

## Creating Jira Issues from Failed Tests

Streamline bug reporting by creating issues directly from test failures:

![Create Issue Modal](/img/jira/Create-Issue-From-Failed-Test-Screenshot.png)

### Steps to Create an Issue

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

## Tracking Trends & Analytics

Navigate to the Trends section to analyze test performance over time:

![Trends and Analytics](/img/jira/Trends-Screenshot-1.png)

### Date Range Selection

Use the date picker to analyze trends for specific time periods:
- Last 7 days
- Last 30 days
- Custom date ranges

### Test Results Trends Chart

The line chart displays pass percentage, fail percentage, skip percentage, and flaky percentage trends over time. Hover over data points to see exact values for any date.

### Additional Metrics

Depending on your configuration, you may also see:
- Test suite growth over time
- Average test duration trends
- Failure pattern analysis

## Managing Releases

Track test quality across your release cycle:

![Releases View](/img/jira/Releases-Screenshot.png)

### Releases Page Features

- **Release List** - All Jira releases with associated test runs
- **Test Run Count** - Number of test executions per release
- **Quality Metrics** - Pass rate for each release version
- **Filter by Release** - Click any release to see only its test runs

### Linking Test Runs to Releases

From any test run detail page:

1. Click the **"Link to Release"** button
2. Select a Jira release version from the dropdown
3. The test run will now appear filtered under that release

This helps teams assess release readiness and track quality gates.

## Best Practices

### Daily Usage

- Check the dashboard each morning to spot new failures
- Review flaky tests weekly and prioritize fixes
- Use the pass rate trend to gauge test suite stability

### Debugging Failures

- Always check error messages first before diving into artifacts
- Download screenshots and videos for failures that are hard to reproduce
- Use stack traces to identify the exact line of code causing failures
- Share artifact links with team members in issue comments

### Release Management

- Link test runs to releases as part of your release checklist
- Review release-specific test results before deployment
- Track pass rate trends leading up to release dates
- Use release filters to compare quality across versions

### Team Collaboration

- Create Jira issues for persistent failures to track fixes
- Share the dashboard URL in standup meetings
- Add test run links to pull request descriptions
- Use custom fields in issues to maintain traceability

## Permissions

By default, any Jira user who can access the workspace can view Testream data. Contact your Jira administrator if you need to restrict access.

## Getting Help

If you encounter issues or have questions:

- Email: [contact@testream.app](mailto:contact@testream.app)
- Documentation: [Read the docs](/)
- Report bugs: [GitHub Issues](https://github.com/testream/docs/issues)

## What's Next?

- Configure [reporters](../reporters/playwright) to send test data
- Set up [CI/CD integrations](../ci-integrations/setup) for CI/CD
- Explore [Testream dashboard](https://testream.app) for advanced features
