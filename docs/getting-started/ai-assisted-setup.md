---
sidebar_position: 3
---

# AI-Assisted Setup with Rovo

Use the **Testream Setup Agent** in Jira to choose the right reporter, generate CI guidance, and verify that Testream receives your first test run.

## Before You Start

You need:

- Testream for Jira installed in your Jira workspace.
- Access to the Jira project where Testream is configured.
- A test project that uses one of the supported Testream reporters or can produce CTRF/JUnit output.
- Permission to add a CI secret named `TESTREAM_API_KEY`.

You do not need to paste a real API key into source code or chat. The setup agent uses `TESTREAM_API_KEY` as a placeholder while you shape the workflow.

## 1. Open Testream Settings in Jira

1. Open your Jira project.
2. Open **Apps → Testream**.
3. Go to **Settings**.
4. Select **Get Started with Rovo** in the **Set up Testream with Rovo** section.

![Settings Page](/img/jira/Find-Settings-Page.png)

## 2. Choose Your Stack and CI Provider

In the launcher, choose:

- **Project/test framework** - for example Playwright, Cypress, Jest, Vitest, WebdriverIO, Mocha, pytest, JUnit XML, or .NET.
- **CI provider** - for example GitHub Actions, GitLab CI, Bitbucket Pipelines, Azure Pipelines, CircleCI, Jenkins, or **I'm not sure**.

Testream maps those choices to the closest reporter, sample project, and setup template before opening Rovo.

![Setup Testream Rovo Dialog](/img/jira/Setup-Testream-Rovo.png)

## 3. Review the Rovo Recommendation

Rovo opens with the selected project context and setup recommendation. It can provide:

- The recommended Testream reporter package.
- The install command for your framework.
- The relevant documentation link.
- A sample project reference.
- CI workflow guidance for your selected provider.
- A first-run checklist.

Rovo should use `TESTREAM_API_KEY` as the secret name in generated examples. Store the real key only in your CI secret manager and in Testream for Jira Settings.

## 4. Create or Select a Testream Project

After the workflow shape is ready:

1. Open [testream.app/projects](https://testream.app/projects).
2. Create a new project or select an existing one.
3. Copy the one-time API key.
4. Add it to your CI secret manager as `TESTREAM_API_KEY`.
5. Return to Testream for Jira Settings and add or validate the API key.

![Add Project API Key](/img/jira/Add-Api-Key.png)

## 5. Run Your Pipeline Once

Run your test workflow from CI. The reporter should upload the test results when `TESTREAM_API_KEY` is available.

After the run finishes, tell Rovo that the pipeline has run. The setup agent can check whether Testream received a run for the Jira project and return the next step:

- If a run was received, open the Testream dashboard and review the results.
- If no run was received, check the reporter command, CI secret name, project key, and workflow logs.

## What Rovo Does Not Do

- It does not store generated CI snippets as a Testream object.
- It does not ask you to paste raw API keys into source files.
- It does not replace your CI secret manager.
- It does not require screenshots or artifacts for setup verification; the first successful Testream ingestion is enough.

## Next Steps

- [Quick Start](./quick-start)
- [Reporter installation](./installation)
- [BDD Specs](../features/bdd-gherkin-specs)
- [Test Run Summaries in Jira Issues](../features/test-run-summaries-in-jira-issues)
