---
sidebar_position: 10
title: Rovo Setup Agent
description: Use the Testream Setup Agent in Jira to choose a reporter, shape CI guidance, and verify the first automated Testream run.
keywords:
  - rovo setup agent jira
  - ai test reporting setup
  - testream reporter setup
  - jira ci test setup
---

# Rovo Setup Agent

The **Testream Setup Agent** guides the first connection between an existing test project, its CI provider, and Testream for Jira. It can recommend a reporter, provide a starting CI workflow, link to the relevant guide, and help verify that the first run arrived.

![Testream Rovo Setup Agent recommending a reporter and CI setup](/img/product/testream-rovo-setup-agent.png)

:::warning Review every recommendation
Rovo is a setup accelerator. Check every command, package, workflow snippet, permission, and API-key instruction against your repository and CI provider before applying it.
:::

## When should I use it?

Use the Setup Agent when you are unsure which reporter matches your framework, want a CI starting point, or want a checklist for verifying the first ingestion. If you already know your stack, the [Quick Start](../getting-started/quick-start) and [reporter guides](../getting-started/installation#reporters) are usually faster.

## Start guided setup

### 1. Choose your stack

Open **Apps → Testream → Settings → Get Started with Rovo** in Jira. Select the project or test framework you use and your CI provider. If you are unsure, choose **I'm not sure** and use the recommendation as a starting point.

![Testream setup dialog for choosing a framework and CI provider](/img/product/testream-rovo-setup-dialog.png)

The setup flow supports the Testream reporter paths for Playwright, Cypress, Jest, Vitest, WebdriverIO, Mocha, pytest, JUnit XML, .NET, and CLI-based CTRF uploads.

![Testream setup screen for selecting the test stack](/img/product/testream-rovo-setup-selection.png)

### 2. Apply the recommendation carefully

The agent can suggest:

- The closest Testream reporter package.
- An install command and reporter configuration.
- A documentation link or sample project.
- CI guidance for providers such as GitHub Actions, GitLab CI, Bitbucket Pipelines, Azure Pipelines, CircleCI, or Jenkins.
- A first-run verification checklist.

Use `TESTREAM_API_KEY` as the secret name in examples. Store the real key in your local environment or CI secret manager; never commit it or paste it into a source file.

### 3. Verify the first ingestion

Run the same test command your team already uses. Then open the Testream dashboard or **Test Runs** in Jira and check for a run with status, framework metadata, and any available branch, commit, or artifact context.

![Testream Setup Agent showing the path from configuration to first-run verification](/img/product/testream-rovo-setup-agent.png)

If no run appears, check the API-key environment, reporter configuration, selected Testream project, and CI logs. The [Quick Start](../getting-started/quick-start) has a framework-neutral verification checklist.

## What the Setup Agent does not do

- It does not replace your CI secret manager or store your API key for you.
- It does not guarantee that a generated command matches your repository.
- It does not replace the framework-specific reporter documentation.
- It does not make release decisions or assess BDD coverage; use the [BDD Coverage Agent](./bdd-coverage-agent) for evidence review with Rovo.

## Next steps

- [AI-Assisted Setup procedure](../getting-started/ai-assisted-setup) - follow the full Jira setup flow.
- [Installation](../getting-started/installation) - compare all reporter paths.
- [BDD Coverage Agent](./bdd-coverage-agent) - assess BDD scenarios against captured evidence.
- [Jira Integration](../jira-integration/overview) - understand where evidence appears in Jira.
