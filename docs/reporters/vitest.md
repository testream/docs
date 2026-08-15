---
sidebar_position: 8
title: 'Vitest Reporter'
description: 'Send Vitest test results from CI/CD into Jira with the Testream Vitest Reporter and run metadata.'
keywords:
  - vitest jira reporter
  - vitest test reporting jira
  - vitest ci results jira
---

# Vitest Reporter

Use the Testream Vitest Reporter to send Vitest test results from CI/CD into Testream and Jira with run metadata and CI-friendly uploads.

Looking for the broader use case? Read the website page for [Vitest Jira integration](https://testream.app/vitest-jira-integration).

If you are deciding between Vitest-specific setup and the broader upload path, compare this guide with [CI/CD test results in Jira](https://testream.app/ci-test-results-jira).

For CI context and pull-request comparison setup, see [CI context and pull-request comparisons](../features/ci-context).

## Installation

```bash
npm install --save-dev @testream/vitest-reporter
```

## Basic Configuration

Add the reporter to your `vitest.config.ts`:

```ts title="vitest.config.ts"
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    reporters: [
      "default",
      [
        "@testream/vitest-reporter",
        {
          apiKey: process.env.TESTREAM_API_KEY,
          uploadEnabled: true,
        },
      ],
    ],
  },
});
```

## Configuration Options

| Option              | Type      | Default            | Description                                    |
| ------------------- | --------- | ------------------ | ---------------------------------------------- |
| `apiKey`            | `string`  | -                  | **Required** Testream API key                  |
| `uploadEnabled`     | `boolean` | `true`             | Enable/disable automatic upload                |
| `failOnUploadError` | `boolean` | `false`            | Fail the test run if upload fails              |
| `outputDir`         | `string`  | `ctrf`             | CTRF output directory                          |
| `outputFile`        | `string`  | `ctrf-report.json` | CTRF report filename                           |
| `branch`            | `string`  | auto (CI)          | Git branch name                                |
| `commitSha`         | `string`  | auto (CI)          | Git commit SHA                                 |
| `repositoryUrl`     | `string`  | auto (CI)          | Git repository URL                             |
| `buildName`         | `string`  | -                  | Build name/identifier                          |
| `buildNumber`       | `string`  | auto (CI)          | Build number                                   |
| `buildUrl`          | `string`  | auto (CI)          | Build URL                                      |
| `testEnvironment`   | `string`  | -                  | Test environment (e.g., `ci`, `staging`)       |
| `appName`           | `string`  | -                  | Application name                               |
| `appVersion`        | `string`  | -                  | Application version                            |
| `testType`          | `string`  | `unit`             | Test type (e.g., `unit`, `integration`, `e2e`) |

## Full Configuration Example

```ts title="vitest.config.ts"
import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    test: {
      include: ["__tests__/**/*.test.ts"],
      reporters: [
        "default",
        [
          "@testream/vitest-reporter",
          {
            apiKey: process.env.TESTREAM_API_KEY || env.TESTREAM_API_KEY,
            uploadEnabled: true,
            failOnUploadError:
              process.env.TESTREAM_FAIL_ON_UPLOAD_ERROR === "true",
            buildName: process.env.TESTREAM_BUILD_NAME,
            testEnvironment:
              process.env.TESTREAM_TEST_ENVIRONMENT || "local",
            appName: process.env.TESTREAM_APP_NAME || "vitest-example",
            appVersion: process.env.TESTREAM_APP_VERSION || "1.0.0",
            testType: process.env.TESTREAM_TEST_TYPE || "unit",
          },
        ],
      ],
    },
  };
});
```

## Notes

- The reporter writes the CTRF report to `ctrf/ctrf-report.json` by default.
- Git context (branch/commit/repository) is auto-detected in many CI environments if not provided.

## GitHub Actions Example

```yaml title=".github/workflows/vitest-tests.yml"
name: Vitest Tests

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

      - name: Run Vitest tests
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

The **[testream/vitest-jira-reporter](https://github.com/testream/vitest-jira-reporter)** repository is a complete working example of a Vitest project integrated with Testream. It includes example tests, full reporter configuration, and a ready-to-use GitHub Actions workflow.

## NPM Package

- **Package:** [@testream/vitest-reporter](https://www.npmjs.com/package/@testream/vitest-reporter)
- **Org:** [testream packages](https://www.npmjs.com/org/testream)

## What's Next?

- Learn about the [Jest Reporter](./jest)
- Learn about the [Pytest Reporter](./pytest)
- Upload existing CTRF reports with the [CLI Reporter](./cli)
