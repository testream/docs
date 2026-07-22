---
sidebar_position: 2
title: Test Run Details
description: Inspect one Testream run in Jira with branch, commit, build, app, reporter, release, cycle, failure, and suite-change context.
keywords:
  - test run details jira
  - inspect automated test results jira
  - build metadata test results jira
  - failed tests jira details
---

# Test Run Details

Click into any test run to see rich execution metadata, build/app context, suite change analysis, and failed tests with issue creation actions.

![Test run details page showing metadata, results summary, release evidence, and failed test inspection actions](/img/product/testream-run-details-overview.png)

## Metadata Section

Each test run displays key context in a two-column layout. Some fields are always visible while others appear only when data is available:

| Field           | Details                                                                                                                     |
| --------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Branch**      | Git branch name (always shown)                                                                                              |
| **Started**     | Timestamp of test execution (always shown)                                                                                  |
| **Commit**      | Short SHA (first 7 chars), links to the commit in your repository when a repository URL is available (shown when available) |
| **Environment** | Test environment, e.g. staging, production (shown when available)                                                           |
| **Duration**    | Total execution time (always shown)                                                                                         |
| **Tool**        | Test framework name and version, e.g. "Playwright 1.40" (shown when available)                                              |

## Build and App Info

When provided by the reporter or CI environment, the **Build and App Info** panel appears with:

| Field            | Details                                         |
| ---------------- | ----------------------------------------------- |
| **Build Name**   | CI workflow or build identifier                 |
| **Build Number** | Build/run number from CI                        |
| **Build Link**   | Direct URL to the CI pipeline run               |
| **Reporter**     | Reporter/tool that generated the test payload   |
| **App**          | Application name under test                     |
| **Version**      | Application version under test                  |
| **Test Type**    | Run type tag, e.g. `unit`, `integration`, `e2e` |

## Results Summary

View aggregate statistics:

- Number of passed tests
- Number of failed tests
- Number of skipped tests
- Number of flaky tests (when present)
- Number of pending tests (when present)

## Test Suite Changes

Test Run Details includes a **Test Suite Changes** summary card that compares the run against the previous run on the same branch.

- Highlights added and removed tests
- Shows net/percentage change
- Supports first-run and no-change states
- Opens a detailed modal for added/removed test inspection

See the dedicated guide: [Test Suite Changes](./test-suite-changes).

## Release Linking

Associate test runs with Jira release versions using the **"Manage"** action in the Release section. This helps track quality per release cycle.

If the run is linked to a release, Testream can also show:

- Release state details such as released, archived, or unreleased
- The linked release issue, when one exists
- Linked test cycles for that same release
- A direct path to the release board

This makes Test Run Details a useful bridge between automated execution evidence and release-level BDD readiness.

## Linked Test Cycles

When the release already has linked cycles, the Release section can display:

- Cycle name
- Cycle state
- Pass rate
- A compact execution summary
- An **Open cycle** action that takes you into the cycle detail workspace

![Release evidence section on test run details showing the linked release, run result summary, and a linked test cycle with pass rate and open-cycle action](/img/jira/Test-Run-Details-Linked-BDD-Test-Cycle.png)

See the dedicated guides: [Test Cycles](./test-cycles) and [Release Visibility](./release-visibility).

## Failed Tests List

All failed tests are listed with:

- Test name
- Error message preview
- **"Create Issue"** button for each failure

## Next Steps

- [Release Visibility](./release-visibility) to review release-level BDD evidence and readiness.
- [Test Cycles](./test-cycles) to inspect linked manual execution batches.
- [Failure Inspection](./failure-inspection) to debug a specific failed test.
- [Test Suite Changes](./test-suite-changes) to review run-to-run drift.
- [CI/CD test results in Jira](https://testream.app/ci-test-results-jira) for the higher-level product overview.
