---
sidebar_position: 9
title: BDD Coverage Agent
description: Assess Jira BDD scenarios against captured Testream evidence with Rovo confidence, rationale, provenance, and reviewer control.
keywords:
  - bdd coverage agent jira
  - rovo bdd coverage
  - jira bdd test evidence
  - bdd scenario coverage jira
---

# BDD Coverage Agent

The **BDD Coverage Agent** helps reviewers assess whether a Jira BDD scenario is supported by the automated evidence Testream has captured. It returns a coverage assessment with confidence, rationale, and evidence provenance so a reviewer can confirm, refine, or override the result.

It is an evidence-review workflow—not a claim that a passing test automatically proves a behavior is covered.

![BDD Coverage Agent assessing a Jira scenario against Testream evidence](/img/product/testream-bdd-coverage-agent.jpeg)

## What does the agent assess?

The agent compares the scenario's behavior, examples, and expected outcome with the test evidence available to Testream. The result should help a reviewer answer:

> Does the captured test evidence support this behavior, and how strong is that connection?

It can surface:

- A coverage status: **Confirmed**, **Likely**, or **Not covered**.
- A confidence signal and plain-language rationale.
- The matched test evidence and provenance behind the assessment.
- Gaps that need a new or better-mapped test.

## Before you start

You need:

- Testream installed in the Jira project.
- At least one captured automated run with usable test names, steps, or metadata.
- A BDD scenario in [Testream BDD Specs](./bdd-gherkin-specs).
- Rovo enabled for the Jira workspace if you want the AI assessment. The underlying evidence remains useful without Rovo.

## Review a scenario

### 1. Open the BDD Specs view

Open the BDD Specs section on a Jira issue and choose a scenario to review. If the issue does not have a scenario yet, [draft or refine one with Rovo](./bdd-gherkin-specs).

### 2. Run the coverage assessment

Ask the BDD Coverage Agent to assess the scenario. Testream provides the available scenario context and captured evidence to the assessment workflow.

### 3. Inspect the explanation

Read the matched evidence, rationale, confidence, and provenance. Pay particular attention to differences in preconditions, data, environment, and expected outcomes; a similar test name is not by itself proof of coverage.

### 4. Make the reviewer decision

Confirm the assessment when it matches the evidence, refine the scenario or mapping when it is incomplete, or override it when your team's domain knowledge differs from the suggestion. Record the decision in the Jira workflow your team uses for review.

## Understanding the result

| Status | Meaning | Recommended reviewer action |
| --- | --- | --- |
| **Confirmed** | The available evidence strongly supports the scenario. | Check the cited evidence and confirm it reflects the intended behavior. |
| **Likely** | The evidence appears related, but the connection is incomplete or less certain. | Review the rationale and improve the scenario, mapping, or test evidence. |
| **Not covered** | No usable evidence supports the scenario. | Add or update an automated test, then run it again before reassessing. |

These statuses describe coverage mapping, not the latest execution outcome. A scenario can be well covered while its latest run fails, or pass in a run without proving the full scenario.

## Evidence and reviewer control

The useful output is the combination of the assessment and the evidence behind it. Keep the following distinctions clear:

- **Coverage mapping** asks whether a test appears to implement a behavior.
- **Execution outcome** asks whether the latest captured run passed or failed.
- **Release readiness** combines evidence from runs, BDD behaviors, manual cycles, and Jira issue or release context.

Rovo can accelerate comparison and explanation, but reviewers remain responsible for accepting the result. Do not use an unreviewed assessment as the only release gate.

## Troubleshooting weak matches

If the agent returns a low-confidence or unexpected result:

1. Check that the latest run reached the correct Testream project.
2. Use precise behavior language and expected outcomes in the scenario.
3. Keep test names, steps, and metadata descriptive enough to establish provenance.
4. Re-run the relevant tests after changing the scenario or implementation.
5. Review the new evidence before confirming coverage.

## Related workflows

- [BDD Specs](./bdd-gherkin-specs) - write issue-level Gherkin and review its evidence.
- [BDD Library](./bdd-library) - reuse behaviors across issues and releases.
- [Test Cycles](./test-cycles) - execute focused manual coverage from reusable behaviors.
- [Release Visibility](./release-visibility) - review the evidence mix and coverage gaps for a release.
- [Automated test reporting Quick Start](../getting-started/quick-start) - capture the first run.
