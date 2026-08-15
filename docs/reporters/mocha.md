---
sidebar_position: 9
title: "Mocha Reporter"
description: "Send Mocha test results from Node.js CI/CD pipelines into Jira with the Testream Mocha Reporter — built-in upload, run metadata, failure evidence, and trend context included."
keywords:
  - mocha jira reporter
  - mocha test reporting jira
  - node mocha jira
---

# Mocha Reporter

Use the Testream Mocha Reporter to send Mocha test results from CI/CD into Testream and Jira with built-in upload support.

Looking for the commercial overview first? Read the website page for [Mocha Jira integration](https://testream.app/mocha-jira-integration).

For CI context and pull-request comparison setup, see [CI context and pull-request comparisons](../features/ci-context).

## Installation

```bash
npm install --save-dev @testream/mocha-reporter
```

## Basic Configuration

Add the reporter to your `.mocharc.js`:

```js title=".mocharc.js"
module.exports = {
  reporter: "@testream/mocha-reporter",
  "reporter-option": [
    `apiKey=${process.env.TESTREAM_API_KEY}`,
    "uploadEnabled=true",
  ],
};
```

## Configuration Options

| Option              | Type      | Default   | Description                                    |
| ------------------- | --------- | --------- | ---------------------------------------------- |
| `apiKey`            | `string`  | -         | **Required** Testream API key                  |
| `uploadEnabled`     | `boolean` | `true`    | Enable/disable automatic upload                |
| `failOnUploadError` | `boolean` | `false`   | Fail the test run if upload fails              |
| `branch`            | `string`  | auto (CI) | Git branch name                                |
| `commitSha`         | `string`  | auto (CI) | Git commit SHA                                 |
| `repositoryUrl`     | `string`  | auto (CI) | Git repository URL                             |
| `testType`          | `string`  | -         | Test type (e.g., `unit`, `integration`, `e2e`) |
| `appName`           | `string`  | -         | Application name                               |
| `appVersion`        | `string`  | -         | Application version                            |
| `buildName`         | `string`  | -         | Build name                                     |
| `buildNumber`       | `string`  | auto (CI) | Build number                                   |
| `buildUrl`          | `string`  | auto (CI) | Build URL                                      |
| `testEnvironment`   | `string`  | -         | Test environment (e.g., `ci`, `staging`)       |

## Full Configuration Example

```js title=".mocharc.js"
module.exports = {
  spec: "test/**/*.spec.js",
  timeout: 30000,
  reporter: "@testream/mocha-reporter",
  "reporter-option": [
    `apiKey=${process.env.TESTREAM_API_KEY}`,
    "uploadEnabled=true",
    `failOnUploadError=${process.env.TESTREAM_FAIL_ON_UPLOAD_ERROR === "true"}`,
    `buildName=${process.env.TESTREAM_BUILD_NAME || "mocha-tests"}`,
    `testEnvironment=${process.env.TESTREAM_TEST_ENVIRONMENT || "local"}`,
    `appName=${process.env.TESTREAM_APP_NAME || "my-app"}`,
    `appVersion=${process.env.TESTREAM_APP_VERSION || "1.0.0"}`,
    `testType=${process.env.TESTREAM_TEST_TYPE || "unit"}`,
  ],
};
```

## Notes

- The reporter writes the CTRF report to `ctrf/ctrf-report.json`.
- Git and CI metadata can be auto-detected when running in supported CI providers.
- Mocha passes reporter options as strings (`key=value`), including booleans.

## GitHub Actions Example

```yaml title=".github/workflows/mocha-tests.yml"
name: Mocha Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 24

      - run: npm ci

      - name: Run Mocha tests
        env:
          TESTREAM_API_KEY: ${{ secrets.TESTREAM_API_KEY }}
          TESTREAM_BUILD_NAME: ${{ github.workflow }}
          TESTREAM_TEST_ENVIRONMENT: ci
          TESTREAM_APP_NAME: ${{ github.event.repository.name }}
          TESTREAM_APP_VERSION: ${{ github.sha }}
          TESTREAM_TEST_TYPE: unit
          TESTREAM_FAIL_ON_UPLOAD_ERROR: "true"
        run: npm test
```

## Sample Project

The **[testream/mocha-jira-reporter](https://github.com/testream/mocha-jira-reporter)** repository is a complete working example of a Mocha project integrated with Testream. It includes example tests, full reporter configuration, and a ready-to-use GitHub Actions workflow.

## NPM Package

- **Package:** [@testream/mocha-reporter](https://www.npmjs.com/package/@testream/mocha-reporter)
- **Org:** [testream packages](https://www.npmjs.com/org/testream)

## What's Next?

- Learn about the [Playwright Reporter](./playwright)
- Learn about the [Jest Reporter](./jest)
- Learn about the [Pytest Reporter](./pytest)
- Learn about the [Vitest Reporter](./vitest)
- Upload existing CTRF reports with the [CLI Reporter](./cli)
