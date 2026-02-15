---
sidebar_position: 2
---

# Test Run Details

Click into any test run to see comprehensive metadata, results summary, and a list of failed tests with the ability to create issues directly.

![Test Run Details](/img/jira/Test-Run-Details-Screenshot.png)

## Metadata Section

Each test run displays key context in a two-column layout. Some fields are always visible while others appear only when data is available:

| Field | Details |
|-------|---------|
| **Branch** | Git branch name (always shown) |
| **Started** | Timestamp of test execution (always shown) |
| **Commit** | Short SHA (first 7 chars), links to the commit in your repository when a repository URL is available (shown when available) |
| **Environment** | Test environment, e.g. staging, production (shown when available) |
| **Duration** | Total execution time (always shown) |
| **Tool** | Test framework name and version, e.g. "Playwright 1.40" (shown when available) |

## Results Summary

View aggregate statistics:

- Number of passed tests
- Number of failed tests
- Number of skipped tests
- Overall success rate

## Release Linking

Associate test runs with Jira release versions using the **"Link to Release"** button. This helps track quality per release cycle.

## Failed Tests List

All failed tests are listed with:

- Test name
- Error message preview
- **"Create Issue"** button for each failure
