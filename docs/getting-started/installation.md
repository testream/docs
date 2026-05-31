---
sidebar_position: 1
---

# Installation

Use this page to install Testream for Jira and choose the reporter for your test stack. If you want the fastest proof, start with the [Quick Start](./quick-start) after the Jira app is installed.

## Pick the Right Starting Point

| I need to...                   | Go here                      |
| ------------------------------ | ---------------------------- |
| Install Testream in Jira       | Continue on this page        |
| Publish a first real test run  | [Quick Start](./quick-start) |
| Configure a specific framework | [Reporter docs](#reporters)  |

## 1. Install Testream for Jira

1. Log in to Jira as an admin.
2. Open **Apps → Explore new apps**.
3. Search for **Testream - Automated Test Management and Reporting for Jira**.
4. Open the app listing and select **Get app**.
5. Follow the Jira installation prompts until the app is installed.

:::info Admin Permissions Required
Only Jira admins can install Marketplace apps directly. If you are not an admin, select **Get it now**, then submit the install request for your admin to approve.
:::

## 2. Open Testream in Jira

After installation, open **Apps → Testream** from the Jira navigation bar. If your Jira workspace has many apps installed, Testream may appear under **More**.

![Example Jira Navigation Bar](/img/jira/Example-Jira-Navigation-Bar.png)

From here, you can open the Testream dashboard, settings, and project-level test run views.

## Reporters

Pick the reporter that matches the test output your team already produces. Each reporter page includes the install command, minimal configuration, CI notes, and a sample project link.

:::tip Rovo-enabled Jira workspace?
If your Jira workspace has Rovo enabled, use the **Testream Setup Agent** to finish setup with guided reporter recommendations, CI snippets, and first-run checks. Open **Testream → Settings → Get Started with Rovo** in Jira, or follow the [AI-assisted setup guide](./ai-assisted-setup).
:::

| Test stack      | Reporter docs                                    | Best first proof                    |
| --------------- | ------------------------------------------------ | ----------------------------------- |
| Playwright      | [Playwright Reporter](../reporters/playwright)   | Browser test results and artifacts  |
| Cypress         | [Cypress Reporter](../reporters/cypress)         | End-to-end results and artifacts    |
| Jest            | [Jest Reporter](../reporters/jest)               | Unit and integration test evidence  |
| Vitest          | [Vitest Reporter](../reporters/vitest)           | Fast frontend and service test runs |
| Mocha           | [Mocha Reporter](../reporters/mocha)             | JavaScript test runs                |
| WebdriverIO     | [WebdriverIO Reporter](../reporters/webdriverio) | WebdriverIO suite evidence          |
| Pytest          | [Pytest Reporter](../reporters/pytest)           | Python test results and metadata    |
| JUnit XML       | [JUnit Reporter](../reporters/junit)             | Existing JUnit XML reports          |
| .NET            | [.NET Reporter](../reporters/dotnet)             | .NET and TRX-based runs             |
| Any CTRF output | [CLI Reporter](../reporters/cli)                 | Converted or custom test reports    |

## 3. Publish Your First Run

Once Testream for Jira is installed and you know which reporter to use, continue with the [Quick Start](./quick-start). It walks through creating a Testream project, setting `TESTREAM_API_KEY`, running tests, and confirming the run in Jira.
