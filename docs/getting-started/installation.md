---
sidebar_position: 1
---

# Installation

Testream offers a free Jira app that can be installed in your workspace to access comprehensive test reporting directly in Jira. Follow the instructions below to get started:

## Steps for Installation

- Log into your instance of Jira as an admin.
- Select the Apps dropdown menu from top navigation bar, and choose Explore new apps.
- Once the screen loads, you can type **Testream - Automated Test Management and Reporting for Jira** in the search bar to find the appropriate app.
- Select the app tile and the app details page of the specific app loads.
- You can select Get app to install the app.
- Once the app is installed, you will be notified via a success message. Following which, you can start using the app.

:::info Admin Permissions Required
These steps are only for admins. If you are not an admin, then you have to select **Get it now**, and then request for the app by selecting **Submit request**.
:::

When the installation is complete, you can access the Testream in the top navigation bar of your Jira instance. If you have many apps installed, you might need to click on the "More" dropdown to find Testream. Click on the Testream icon to access the dashboard and start exploring your test results!

![Example Jira Navigation Bar](/img/jira/Example-Jira-Navigation-Bar.png)

## Reporters

:::tip AI-Ready Setup
AI agents are great at setting up Testream workflows! If you point them to any documentation of the project you want to integrate, they can handle the installation and configuration for you quite easily.
:::

| Framework   | Reporter Docs                                    |
| ----------- | ------------------------------------------------ |
| Playwright  | [Playwright Reporter](../reporters/playwright)   |
| Cypress     | [Cypress Reporter](../reporters/cypress)         |
| Jest        | [Jest Reporter](../reporters/jest)               |
| Vitest      | [Vitest Reporter](../reporters/vitest)           |
| Mocha       | [Mocha Reporter](../reporters/mocha)             |
| WebdriverIO | [WebdriverIO Reporter](../reporters/webdriverio) |
| Pytest      | [Pytest Reporter](../reporters/pytest)           |
| JUnit       | [JUnit Reporter](../reporters/junit)             |
| .NET        | [.NET Reporter](../reporters/dotnet)             |
| Any (CTRF)  | [CLI Reporter](../reporters/cli)                 |

## Sample Projects

:::tip Quick Start with Samples
Each of the sample projects linked below has a GitHub Action workflow already set up. You can simply fork the repository, add your Testream API key to the secrets, and start pushing commits to see how the integration works end-to-end with real test runs and results in Jira. It's a great place to get started if you need to create new test projects!
:::

Each reporter has a complete working example repository with tests, configuration, and a GitHub Actions workflow ready to use.

| Framework   | Sample Project                                                                              |
| ----------- | ------------------------------------------------------------------------------------------- |
| Playwright  | [testream/playwright-jira-reporter](https://github.com/testream/playwright-jira-reporter)   |
| Cypress     | [testream/cypress-jira-reporter](https://github.com/testream/cypress-jira-reporter)         |
| Jest        | [testream/jest-jira-reporter](https://github.com/testream/jest-jira-reporter)               |
| Mocha       | [testream/mocha-jira-reporter](https://github.com/testream/mocha-jira-reporter)             |
| Vitest      | [testream/vitest-jira-reporter](https://github.com/testream/vitest-jira-reporter)           |
| WebdriverIO | [testream/webdriverio-jira-reporter](https://github.com/testream/webdriverio-jira-reporter) |
| Pytest      | [testream/pytest-jira-reporter](https://github.com/testream/pytest-jira-reporter)           |
| JUnit       | [testream/junit-jira-reporter](https://github.com/testream/junit-jira-reporter)             |
| .NET        | [testream/dotnet-jira-reporter](https://github.com/testream/dotnet-jira-reporter)           |
| CTRF CLI    | [testream/ctrf-jira-reporter](https://github.com/testream/ctrf-jira-reporter)               |
