---
sidebar_position: 3
title: Test Suite Changes
description: Compare one run against the previous run on the same branch to see added, removed, unchanged, and net test-suite movement in Jira.
keywords:
  - test suite changes jira
  - compare test runs jira
  - added removed tests jira
  - suite drift automated tests
---

# Test Suite Changes

Track how your suite evolves between runs directly from Test Run Details.

![Test suite changes summary card comparing the current run with the previous run on the same branch](/img/jira/Test-Suite-Changes.png)

## What It Compares

Testream compares the current run against the previous run on the same branch and shows:

- Tests added since the previous run
- Tests removed since the previous run
- Net and percentage change in suite size
- Count of tests that are unchanged

## Summary States

The summary card adapts based on available data:

- **First run on branch** - shows all tests as new because no baseline exists
- **No changes** - confirms unchanged test count
- **Changes detected** - highlights added and removed totals with net trend

## Detailed Diff View

Select **View Details** to open the Test Suite Changes modal and inspect:

- Run-to-run comparison context (commit/branch)
- Added test list
- Removed test list
- Aggregate chips for Added, Removed, Common, and Change

![Test suite changes details modal listing added and removed tests between two runs](/img/jira/Test-Suite-Changes-Details.png)

Use this view to quickly validate suite refactors, identify accidental test removals, and track planned coverage growth.

## Related Feature

- [Test Run Details](./test-run-details)

## Next Steps

- [Test Run Details](./test-run-details) to review the run that produced this diff.
- [Trends & Analytics](./trends-analytics) to track longer-term quality movement.
- [CI/CD test results in Jira](https://testream.app/ci-test-results-jira) for the product overview.
