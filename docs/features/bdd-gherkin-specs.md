---
sidebar_position: 8
title: BDD Specs
description: Draft and assess Jira issue-level Gherkin scenarios with Atlassian Rovo and compare them with the automated test evidence Testream captures from CI.
keywords:
  - bdd specs jira
  - gherkin scenarios rovo jira
  - acceptance criteria with test evidence
  - jira issue bdd coverage
---

# BDD Specs

Create and refine Jira issue-level acceptance criteria in Gherkin with **Atlassian Rovo**, then assess those scenarios against the test evidence Testream captures from your CI/CD runs.

:::info Adding BDD Specs to Jira Issues
The Testream BDD Specs section is added from the Jira issue detail view. If you do not see it on the issue, open the issue layout controls and add the **Testream BDD Specs** app to the issue view. Jira can hide app sections behind issue layout settings, so this only needs to be done when the section is not already visible.
![Add Testream BDD Gherkin Specs](/img/jira/BDD-Gherkin-Add-Jira-Issue.png)
:::

## What Are BDD Specs?

BDD Specs are feature and scenario descriptions stored in Jira issues. They use familiar Gherkin syntax so teams can describe expected behavior in a format that is easy to read and review:

```gherkin
Feature: Reporter guides redirection

Scenario: 'See reporter guides' button redirects to documentation
  Given I am on the Testream homepage
  When I click the 'See reporter guides' button in the header
  Then I should be redirected to the Testream documentation page
```

Use BDD Specs to keep requirements, test evidence, and coverage decisions close to the Jira work item they belong to. Testream stores saved specs through the Testream Jira issue panel, then Rovo compares each scenario with the evidence captured by Testream reporters, including test names, tags, source snippets, artifacts, branch, build, and commit metadata.

![BDD Gherkin Specs in Jira Issues](/img/jira/BDD-Gherkin-Specs.png)

## Workflow

### 1. Add the BDD Specs panel

Open the Jira issue and add **Testream BDD Specs** if the panel is not already visible.

### 2. Create or draft a spec

Write a scenario manually, or select **Draft with Rovo** to turn rough acceptance criteria into a focused Gherkin scenario. Rovo asks you to approve the exact text before saving it.

![Create BDD Gherkin Specs with Rovo](/img/jira/BDD-Rovo-Gherkin-Dialog.png)

### 3. Improve an existing spec

Use **Improve with Rovo** when the current scenario is too broad, unclear, or not independently testable. Review the proposed Gherkin before saving changes.

### 4. Assess automated coverage

Select **Assess with Rovo** or **Re-assess with Rovo**. Testream sends Rovo bounded evidence for the Jira issue so it can compare the saved Gherkin with matching automated test results.

### 5. Review the assessment

Rovo returns a coverage decision, confidence score, rationale, and best matching evidence. The result can be:

- **Confirmed** - candidate tests align with the scenario and the source mapping is strong enough to trust.
- **Likely** - evidence is relevant, but the match is inferred or not strong enough to confirm.
- **Not covered** - no meaningful automated evidence is available yet.

### 6. Link evidence manually when needed

If a relevant run was not linked automatically, use **Link evidence by Test Run ID**. Manual links guide the next assessment, but you should still review the matched tests and rationale before approving the result.

### 7. Approve or reject the assessment

After reviewing the assessment, approve it when the team accepts the coverage decision or reject it when the scenario needs more work or the evidence is not convincing.

## What Rovo Reviews

When you assess coverage, Testream sends Rovo the linked test context for the issue. Rovo reviews the BDD spec against the available evidence and returns a coverage decision, confidence score, rationale, and best matching evidence.

The assessment can use:

- Linked test runs from the Jira issue
- Matching test names, suites, tags, and steps
- Source snippets captured by Testream reporters
- Screenshots, traces, and other test artifacts
- Branch, build, commit, and repository context
- Reviewer-linked runs as additional evidence

## Best Practices

- Keep each scenario focused on one behavior.
- Prefer concrete `Given`, `When`, and `Then` steps over broad statements.
- Use the latest Testream reporters so source snippets and richer evidence are captured.
- Treat manual links as reviewer guidance, then confirm the matched tests actually cover the scenario.
- Re-assess after changing a BDD spec or adding new tests.

## Related Features

- [Test Run Summaries in Jira Issues](./test-run-summaries-in-jira-issues)
- [Test Run Details](./test-run-details)
- [Failure Inspection](./failure-inspection)
- [Jira Integration Usage](../jira-integration/usage)

## Next Steps

- [Quick Start](../getting-started/quick-start) to prove the first automated run before assessing coverage.
- [Use Testream in Jira](../jira-integration/usage) to review the issue-level workflow around runs and evidence.
- [Atlassian Marketplace listing](https://marketplace.atlassian.com/apps/3048460704) to install Testream for Jira.
