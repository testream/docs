---
sidebar_position: 3
title: AI-Assisted Setup with Rovo
description: Use the Testream Setup Agent in Jira to choose the right reporter, generate CI guidance, and verify that Testream receives your first automated test run.
keywords:
  - rovo testream setup
  - ai assisted jira test reporting setup
  - reporter recommendation jira
  - first test run jira rovo
---

# AI-Assisted Setup with Rovo

Use the **Testream Setup Agent** in Jira to choose a reporter, shape CI guidance, and verify that Testream receives your first test run. For the product overview and boundaries, see the dedicated [Rovo Setup Agent](../features/rovo-setup-agent) page.

This page is for teams that want guided setup. If you already know your framework and just want to prove the first run, use the [Quick Start](./quick-start).

:::warning Verify Rovo outputs
Rovo can make mistakes or suggest configuration that does not match your repository, CI provider, permissions, or Testream project. Review every install command, workflow snippet, reporter option, and API-key instruction before applying it. Treat Rovo guidance as a setup accelerator, not as a replacement for your own validation.
:::

## When to Use This

Use the Testream Setup Agent when:

- You are not sure which reporter matches your test project.
- You want CI guidance for GitHub Actions, GitLab CI, Bitbucket Pipelines, Azure Pipelines, CircleCI, or Jenkins.
- You want a first-run checklist before changing your pipeline.
- You want Rovo to help confirm whether Testream received a run.

## Before You Start

You need:

- Testream for Jira installed in your Jira workspace.
- Access to the Jira project where Testream is configured.
- A test project that uses one of the supported Testream reporters or can produce CTRF/JUnit output.
- Permission to add a CI secret named `TESTREAM_API_KEY`, if you plan to automate the run in CI.

You do not need to paste a real API key into source code or chat. The setup agent uses `TESTREAM_API_KEY` as a placeholder while you shape the workflow.

## 1. Open Testream Settings in Jira

1. Open your Jira project.
2. Open **Apps → Testream**.
3. Go to **Settings**.
4. Select **Get Started with Rovo** in the **Set up Testream with Rovo** section.

![Testream settings page in Jira with the Get Started with Rovo setup entry point](/img/product/testream-rovo-setup-selection.png)

## 2. Choose Your Stack and CI Provider

In the launcher, choose:

- **Project/test framework** - for example Playwright, Cypress, Jest, Vitest, WebdriverIO, Mocha, pytest, JUnit XML, or .NET.
- **CI provider** - for example GitHub Actions, GitLab CI, Bitbucket Pipelines, Azure Pipelines, CircleCI, Jenkins, or **I'm not sure**.

Testream maps those choices to the closest reporter, sample project, and setup template before opening Rovo.

![Testream Rovo setup dialog for selecting a test framework and CI provider](/img/product/testream-rovo-setup-dialog.png)

## 3. Use the Rovo Recommendation

Rovo opens with the selected project context and setup recommendation. It can provide:

- The recommended Testream reporter package.
- The install command for your framework.
- The relevant documentation link.
- A sample project reference.
- CI workflow guidance for your selected provider.
- A first-run checklist.

Verify and follow the recommendation to update your reporter config or CI workflow. Keep `TESTREAM_API_KEY` as the secret name in generated examples, and store the real key only in your CI secret manager and Testream settings.

## 4. Add the API Key

If you have not created a Testream project yet:

1. Open [testream.app/projects](https://testream.app/projects).
2. Create a new project or select an existing one.
3. Copy the one-time API key.
4. Add it locally for a proof run, or store it in CI as `TESTREAM_API_KEY`.

Then return to **Testream → Settings** in Jira and add or validate the API key.

![Testream settings screen for adding or validating a project API key in Jira](/img/jira/Add-Api-Key.png)

## 5. Run Tests Once

Run your tests locally or from CI. The reporter should upload results when `TESTREAM_API_KEY` is available.

After the run finishes, tell Rovo that the tests have run. The setup agent can check whether Testream received a run for the Jira project and return the next step:

- If a run was received, open the Testream dashboard and review the results.
- If no run was received, check the reporter command, CI secret name, project key, and workflow logs.

![Jira Test Runs view confirming that Testream received and displayed the first automated run](/img/product/testream-test-runs.png)

## What Rovo Does Not Do

- It does not store generated CI snippets as a Testream object.
- It does not ask you to paste raw API keys into source files.
- It does not replace your CI secret manager.
- It does not require screenshots or artifacts for setup verification; the first successful Testream ingestion is enough.

## Next Steps

- [Quick Start](./quick-start)
- [Reporter installation](./installation)
- [BDD Specs](../features/bdd-gherkin-specs)
- [BDD Coverage Agent](../features/bdd-coverage-agent)
- [Test Run Summaries in Jira Issues](../features/test-run-summaries-in-jira-issues)
- [Atlassian Marketplace listing](https://marketplace.atlassian.com/apps/3048460704)
