---
sidebar_position: 6
title: Release Management
description: Link automated test runs to Jira releases so teams can filter linked runs, review linked BDD cycles, and assess release readiness per version.
keywords:
  - release management jira test results
  - link test runs to jira releases
  - release readiness test reporting jira
  - jira version quality gates
---

# Release Management

Track test quality across your release cycle by linking test runs to Jira releases and monitoring quality metrics per version.

Looking for the broader product overview first? Read [Jira release test management](https://testream.app/jira-release-test-management).

![Releases page showing the Jira release filter, linked runs, and release-level quality context](/img/jira/Releases-Screenshot.png)

## Release Filter And Linked Runs

Use the Releases page to select a Jira version and review the runs linked to that release.

The page combines:

- A Jira release filter
- Linked test runs for the selected version
- BDD-aware release visibility when that version is selected

## Linking Test Runs to Releases

From any test run detail page:

1. Open the **Release** section.
2. Click **Manage link**.
3. Use the **Link Test Run to Release** modal.
4. Select a Jira release version.
5. Save the change.

After saving, the run appears under that release filter on the Releases page.

This helps teams assess release readiness and track quality gates.

## Link And Create Issue

When a run is not already linked, you can also create a Jira issue in the same release-linking flow.

![Link test run to release modal with issue creation option](/img/jira/Releases-Create-Issue-Screenshot.png)

From the **Link Test Run to Release** modal:

1. Select a **Release version**.
2. Set **Also create a Jira issue for this release** to **Yes**.
3. Choose an **Issue type**.
4. Click **Link & Create Issue**.

This creates the Jira issue and links the test run to the selected release in a single step.

## Filter By Release

Use the release filter bar on the Releases page to switch between Jira versions and review only the runs linked to the selected release.

This makes it easier to compare release-specific quality without leaving the page.

## BDD Release Visibility

When a release is selected, Testream can also show a BDD-aware release board with:

- Linked test cycles
- Behavior evidence coverage
- Issue coverage gaps
- Release-readiness callouts such as **Needs mapping**, **Needs evidence**, or **Ready**

Use this when automated runs alone are not enough to explain whether a release is fully covered.

See the dedicated guide: [Release Visibility](./release-visibility).

## Linked Cycles From Releases

If your team uses [Test Cycles](./test-cycles), any cycle linked to the selected Jira release can appear directly in the release workflow. This makes it easier to move from release health into the exact manual execution batch that still needs attention.

## Next Steps

- [Release Visibility](./release-visibility) to review BDD evidence, issue coverage, and readiness.
- [Test Cycles](./test-cycles) to execute manual coverage linked to a release.
- [Test Run Details](./test-run-details) to inspect one release-linked run.
- [PDF Reports](./pdf-reports) to share release evidence with stakeholders.
- [Jira test reporting](https://testream.app/jira-test-reporting) for the broader product overview.
- [Jira release test management](https://testream.app/jira-release-test-management) for the commercial release-readiness path.
