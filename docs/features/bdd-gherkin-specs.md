---
sidebar_position: 8
---

# BDD Specs

Create and refine Jira issue-level acceptance criteria in Gherkin with **Atlassian Rovo**, and assess them against the test evidence Testream captures from your CI/CD runs.

:::info Adding BDD Specs to Jira Issues
Testream BDD Specs section is added from the Jira issue detail view. If you do not see it on the issue, open the issue layout controls and add the **Testream BDD Specs** app to the issue view. Jira can hide app sections behind issue layout settings, so this only needs to be done when the section is not already visible.
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

Use them to keep requirements, test evidence, and coverage decisions close to the Jira work item they belong to. An example Testream BDD Spec can be seen below image. The spec describes a criteria for a new featue and with the details Testream native reporters automatically capture, Rovo can assess whether the criteria is covered by the available test evidence making use of test code snippets, test names, tags, artifacts, and other metadata to find the best matching tests and determine if the scenario is adequately covered.

![BDD Gherkin Specs in Jira Issues](/img/jira/BDD-Gherkin-Specs.png)

## Create and Improve BDD Specs with Rovo

Start from the detail view of a Jira issue and write a scenario yourself, or ask Rovo to create or improve BDD Gherkin specs for you using natural language. Rovo can help turn rough acceptance criteria into a clearer Gherkin spec while keeping the scenario tied to the issue.

![Create BDD Gherkin Specs with Rovo](/img/jira/BDD-Rovo-Gherkin-Dialog.png)

## Review a Rovo Assessment

When you assess coverage, Testream sends Rovo the linked test context for the issue. Rovo reviews the BDD spec against the available evidence and returns a coverage decision, confidence score, rationale, and best matching evidence.

The assessment can use:

- Linked test runs from the Jira issue
- Matching test names, suites, tags, and steps
- Source snippets captured by Testream reporters
- Screenshots, traces, and other test artifacts
- Branch, build, commit, and repository context
- Reviewer-linked runs as additional evidence

## Link Evidence Manually

If a test run is relevant but was not linked automatically, you can link evidence by Test Run ID. Manual links help guide the assessment, but you should still review the matched tests and rationale before approving the result.

## Approve or Reject Assessments

After Rovo completes an assessment, review the rationale and best evidence before accepting it. Approving an assessment records that the team agrees with the coverage decision. Rejecting it keeps the scenario available for another review after the spec or test evidence changes.

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
