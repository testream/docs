---
sidebar_position: 5
title: 'WebdriverIO Reporter'
description: 'Send WebdriverIO test results from CI/CD into Jira with the Testream WebdriverIO Reporter and built-in upload support.'
keywords:
  - webdriverio jira reporter
  - wdio jira reporting
  - webdriverio test reporting jira
---

# WebdriverIO Reporter

Use the Testream WebdriverIO Reporter to send browser-automation test results from CI/CD into Testream and Jira with built-in upload support.

Looking for the commercial overview first? Read the website page for [WebdriverIO Jira integration](https://testream.app/webdriverio-jira-integration).

If your WebdriverIO suites include Cucumber and Gherkin workflows, also read [BDD Jira integration](https://testream.app/bdd-jira-integration).

For CI context and pull-request comparison setup, see [CI context and pull-request comparisons](../getting-started/ci-context).

## Installation

```bash
npm install --save-dev @testream/webdriverio-reporter
```

## Basic Configuration

Add the reporter and launcher service to your `wdio.conf.ts`:

```typescript title="wdio.conf.ts"
const testreamConfig = {
  apiKey: process.env.TESTREAM_API_KEY || "",
  uploadEnabled: true,
};

export const config: Options.Testrunner = {
  reporters: ["spec", ["@testream/webdriverio-reporter", testreamConfig]],
  services: [["@testream/webdriverio-reporter", testreamConfig]],
};
```

The `services` entry registers a launcher service that automatically aggregates per-worker CTRF reports and uploads the merged result when the test run completes.

## Configuration Options

| Option              | Type      | Default            | Description                       |
| ------------------- | --------- | ------------------ | --------------------------------- |
| `apiKey`            | `string`  | -                  | **Required** Testream API key     |
| `uploadEnabled`     | `boolean` | `true`             | Enable/disable automatic upload   |
| `failOnUploadError` | `boolean` | `false`            | Fail the test run if upload fails |
| `branch`            | `string`  | auto               | Git branch name                   |
| `commitSha`         | `string`  | auto               | Git commit SHA                    |
| `repositoryUrl`     | `string`  | auto               | Git repository URL                |
| `outputDir`         | `string`  | `ctrf`             | CTRF output directory             |
| `outputFile`        | `string`  | `ctrf-report.json` | CTRF report filename              |
| `buildName`         | `string`  | -                  | Build name                        |
| `buildNumber`       | `string`  | auto               | Build number                      |
| `buildUrl`          | `string`  | auto               | Build URL                         |
| `testEnvironment`   | `string`  | -                  | Environment name                  |
| `appName`           | `string`  | -                  | Application name                  |
| `appVersion`        | `string`  | -                  | Application version               |
| `testType`          | `string`  | `e2e`              | Test type (e.g., `api`, `unit`)   |

## Full Configuration Example

```typescript title="wdio.conf.ts"
const testreamConfig = {
  apiKey: process.env.TESTREAM_API_KEY || "",
  uploadEnabled: true,
  failOnUploadError:
    process.env.TESTREAM_FAIL_ON_UPLOAD_ERROR === "true",
  outputDir: "ctrf",
  outputFile: "ctrf-report.json",
  testType: process.env.TESTREAM_TEST_TYPE || "e2e",
  appName: process.env.TESTREAM_APP_NAME,
  appVersion: process.env.TESTREAM_APP_VERSION,
  buildName: process.env.TESTREAM_BUILD_NAME,
  testEnvironment: process.env.TESTREAM_TEST_ENVIRONMENT || "local",
};

export const config: Options.Testrunner = {
  runner: "local",
  specs: ["./test/specs/**/*.ts"],
  maxInstances: 5,
  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": { args: ["--headless", "--disable-gpu"] },
    },
  ],
  logLevel: "info",
  framework: "mocha",
  reporters: ["spec", ["@testream/webdriverio-reporter", testreamConfig]],
  services: [["@testream/webdriverio-reporter", testreamConfig]],
  mochaOpts: { ui: "bdd", timeout: 60000 },
};
```

## GitHub Actions Example

```yaml title=".github/workflows/wdio-tests.yml"
name: WebdriverIO Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 24

      - name: Install dependencies
        run: npm ci

      - name: Run WebdriverIO tests
        env:
          TESTREAM_API_KEY: ${{ secrets.TESTREAM_API_KEY }}
          TESTREAM_BUILD_NAME: ${{ github.workflow }}
          TESTREAM_TEST_ENVIRONMENT: ci
          TESTREAM_APP_NAME: ${{ github.event.repository.name }}
          TESTREAM_APP_VERSION: ${{ github.sha }}
          TESTREAM_TEST_TYPE: e2e
          TESTREAM_FAIL_ON_UPLOAD_ERROR: "true"
        run: npx wdio run wdio.conf.ts
```

## Notes

### Git Context Detection

In CI environments like GitHub Actions, GitLab CI, and CircleCI, git context (branch, commit SHA, repository URL) is automatically detected from environment variables. You only need to provide these values explicitly if running outside of standard CI environments.

## Sample Project

The **[testream/webdriverio-jira-reporter](https://github.com/testream/webdriverio-jira-reporter)** repository is a complete working example of a WebdriverIO project integrated with Testream. It includes example tests, full reporter configuration, and a ready-to-use GitHub Actions workflow.

## NPM Package

- **Package:** [@testream/webdriverio-reporter](https://www.npmjs.com/package/@testream/webdriverio-reporter)
- **Org:** [testream packages](https://www.npmjs.com/org/testream)

## What's Next?

- Learn about the [Playwright Reporter](./playwright)
- Learn about the [Cypress Reporter](./cypress)
- Learn about the [Jest Reporter](./jest)
- Learn about the [Pytest Reporter](./pytest)
- Learn about the [.NET Reporter](./dotnet)
- Set up [CLI Reporter](./cli)
- View results in [Jira](../jira-integration/usage)
