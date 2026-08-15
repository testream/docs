---
sidebar_position: 4
title: 'Jest Reporter'
description: 'Send Jest test results from CI/CD into Jira with the Testream Jest Reporter and review failures and trends in Testream.'
keywords:
  - jest jira reporter
  - jest test reporting jira
  - jest ci results jira
---

# Jest Reporter

Use the Testream Jest Reporter to send Jest unit and integration test results from CI/CD into Testream and Jira.

Looking for the higher-level product fit first? Read the website page for [Jest Jira integration](https://testream.app/jest-jira-integration).

If you are deciding between reporter-level setup and the broader upload path, compare this guide with [CI/CD test results in Jira](https://testream.app/ci-test-results-jira).

For CI context and pull-request comparison setup, see [CI context and pull-request comparisons](../getting-started/ci-context).

## Installation

```bash
npm install --save-dev @testream/jest-reporter
```

## Basic Configuration

Add the reporter to your `jest.config.js`:

```javascript title="jest.config.js"
module.exports = {
  reporters: [
    "default",
    [
      "@testream/jest-reporter",
      {
        apiKey: process.env.TESTREAM_API_KEY,
        uploadEnabled: true,
      },
    ],
  ],
};
```

Then run your tests normally:

```bash
jest
```

The reporter will automatically upload results after each test run.

## Configuration Options

| Option              | Type      | Default | Description                              |
| ------------------- | --------- | ------- | ---------------------------------------- |
| `apiKey`            | `string`  | -       | **Required** Testream API key            |
| `uploadEnabled`     | `boolean` | `true`  | Enable/disable automatic upload          |
| `failOnUploadError` | `boolean` | `false` | Fail test run if upload fails            |
| `branch`            | `string`  | auto    | Git branch name                          |
| `commitSha`         | `string`  | auto    | Git commit SHA                           |
| `repositoryUrl`     | `string`  | auto    | Git repository URL                       |
| `testType`          | `string`  | -       | Test type (e.g., `unit`, `integration`)  |
| `appName`           | `string`  | -       | Application name                         |
| `appVersion`        | `string`  | -       | Application version                      |
| `buildName`         | `string`  | -       | Build name                               |
| `buildNumber`       | `string`  | auto    | Build number                             |
| `buildUrl`          | `string`  | auto    | Build URL                                |
| `testEnvironment`   | `string`  | -       | Test environment (e.g., `ci`, `staging`) |

## Full Configuration Example

```javascript title="jest.config.js"
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  reporters: [
    "default",
    [
      "@testream/jest-reporter",
      {
        // API Configuration
        apiKey: process.env.TESTREAM_API_KEY,

        // Upload Configuration
        uploadEnabled: process.env.CI === "true",
        failOnUploadError: true,

        // Build Metadata
        buildName: process.env.GITHUB_WORKFLOW || "Jest Tests",

        // Application Metadata
        testEnvironment: process.env.TEST_ENV || "ci",
        appName: "My App",
        appVersion: "1.0.0",
        testType: "unit",
      },
    ],
  ],
};
```

## Examples

### Basic Setup

Minimal configuration for local development:

```javascript title="jest.config.js"
module.exports = {
  reporters: [
    "default",
    [
      "@testream/jest-reporter",
      {
        apiKey: process.env.TESTREAM_API_KEY,
      },
    ],
  ],
};
```

### Environment-Based Configuration

Enable upload only in CI environments:

```javascript title="jest.config.js"
module.exports = {
  reporters: [
    "default",
    [
      "@testream/jest-reporter",
      {
        apiKey: process.env.TESTREAM_API_KEY,
        uploadEnabled: process.env.CI === "true",
        testEnvironment: process.env.CI ? "ci" : "local",
      },
    ],
  ],
};
```

### With Coverage

Jest reporter works with coverage:

```bash
jest --coverage
```

The reporter will still upload test results even when coverage is enabled.

### TypeScript Configuration

If using TypeScript for your Jest config:

```typescript title="jest.config.ts"
import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  reporters: [
    "default",
    [
      "@testream/jest-reporter",
      {
        apiKey: process.env.TESTREAM_API_KEY!,
        uploadEnabled: true,
        testType: "unit",
      },
    ],
  ],
};

export default config;
```

### Using Environment Variables

For maximum flexibility, read all settings from environment variables:

```javascript title="jest.config.js"
module.exports = {
  reporters: [
    "default",
    [
      "@testream/jest-reporter",
      {
        apiKey: process.env.TESTREAM_API_KEY,
        uploadEnabled: process.env.TESTREAM_UPLOAD_ENABLED === "true",
        failOnUploadError:
          process.env.TESTREAM_FAIL_ON_UPLOAD_ERROR === "true",
        buildName: process.env.TESTREAM_BUILD_NAME,
        testEnvironment: process.env.TESTREAM_TEST_ENVIRONMENT,
        appName: process.env.TESTREAM_APP_NAME,
        appVersion: process.env.TESTREAM_APP_VERSION,
        testType: process.env.TESTREAM_TEST_TYPE,
      },
    ],
  ],
};
```

## GitHub Actions Example

```yaml title=".github/workflows/jest-tests.yml"
name: Jest Tests

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

      - name: Run Jest tests
        env:
          TESTREAM_API_KEY: ${{ secrets.TESTREAM_API_KEY }}
          TESTREAM_UPLOAD_ENABLED: "true"
          TESTREAM_BUILD_NAME: ${{ github.workflow }}
          TESTREAM_TEST_ENVIRONMENT: ci
          TESTREAM_APP_NAME: ${{ github.event.repository.name }}
          TESTREAM_APP_VERSION: ${{ github.sha }}
          TESTREAM_TEST_TYPE: unit
          TESTREAM_FAIL_ON_UPLOAD_ERROR: "true"
        run: npm test
```

## Notes

### Multiple Reporters

You can use the Testream reporter alongside other Jest reporters. Simply add them to the `reporters` array:

```javascript
reporters: [
  'default',
  ['jest-junit', { outputDirectory: 'reports' }],
  ['@testream/jest-reporter', { /* config */ }],
],
```

### Git Context Detection

In CI environments like GitHub Actions, GitLab CI, and CircleCI, git context (branch, commit SHA, repository URL) is automatically detected from environment variables. You only need to provide these values explicitly if running outside of standard CI environments.

## Sample Project

The **[testream/jest-jira-reporter](https://github.com/testream/jest-jira-reporter)** repository is a complete working example of a Jest project integrated with Testream. It includes example tests, full reporter configuration, and a ready-to-use GitHub Actions workflow.

## NPM Package

- **Package:** [@testream/jest-reporter](https://www.npmjs.com/package/@testream/jest-reporter)
- **Org:** [testream packages](https://www.npmjs.com/org/testream)

## What's Next?

- Learn about the [Cypress Reporter](./cypress)
- Learn about the [Pytest Reporter](./pytest)
- Learn about the [Playwright Reporter](./playwright)
- Learn about the [WebdriverIO Reporter](./webdriverio)
- Set up [CLI Reporter](./cli)
- View results in [Jira](../jira-integration/usage)
