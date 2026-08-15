---
sidebar_position: 3
title: 'Cypress Reporter'
description: 'Send Cypress test results, screenshots, videos, and end-to-end artifacts into Jira with the Testream Cypress Reporter.'
keywords:
  - cypress jira reporter
  - cypress test reporting jira
  - cypress component testing jira
---

# Cypress Reporter

Use the Testream Cypress Reporter to send Cypress test results, screenshots, videos, and CI/CD run context into Testream and Jira.

Looking for the commercial overview first? Read the website page for [Cypress Jira integration](https://testream.app/cypress-jira-integration).

If you are deciding between Cypress-specific setup and the broader upload workflow, compare this guide with [CI/CD test results in Jira](https://testream.app/ci-test-results-jira).

For CI context and pull-request comparison setup, see [CI context and pull-request comparisons](../features/ci-context).

## Installation

```bash
npm install --save-dev @testream/cypress-reporter
```

## Quick Start

### Option 1: CLI (Recommended)

The easiest way to get started is using the CLI:

```bash
npx @testream/cypress-reporter -k $TESTREAM_API_KEY
```

This single command will:

1. Run your Cypress tests
2. Prepare uploadable results automatically
3. Upload results to Testream (project key inferred from API key)

### Option 2: Programmatic Configuration

Add the reporter to your `cypress.config.ts`:

```typescript title="cypress.config.ts"
import { defineConfig } from "cypress";
import { TestreamReporter } from "@testream/cypress-reporter";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      new TestreamReporter({
        on,
        apiKey: process.env.TESTREAM_API_KEY,
        uploadEnabled: true,
      });
    },
  },
});
```

Then run your tests normally:

```bash
cypress run
```

## CLI Options

| Option                     | Type      | Default     | Description                                         |
| -------------------------- | --------- | ----------- | --------------------------------------------------- |
| `-k, --api-key`            | `string`  | -           | **Required** API key (unless `--no-upload` is used) |
| `--project <path>`         | `string`  | current dir | Path to Cypress project                             |
| `--results-path <path>`    | `string`  | -           | Use existing CTRF file(s) instead of running tests  |
| `--branch <name>`          | `string`  | auto (CI)   | Git branch name                                     |
| `--commit-sha <sha>`       | `string`  | auto (CI)   | Git commit SHA                                      |
| `--repository-url <url>`   | `string`  | auto (CI)   | Git repository URL                                  |
| `--build-name <name>`      | `string`  | -           | Build name                                          |
| `--build-number <num>`     | `string`  | auto (CI)   | Build number                                        |
| `--build-url <url>`        | `string`  | auto (CI)   | Build URL                                           |
| `--test-environment <env>` | `string`  | -           | Test environment (e.g., `ci`, `staging`)            |
| `--app-name <name>`        | `string`  | -           | Application name                                    |
| `--app-version <ver>`      | `string`  | -           | Application version                                 |
| `--test-type <type>`       | `string`  | -           | Test type (e.g., `e2e`, `integration`)              |
| `--no-upload`              | `boolean` | `false`     | Skip uploading (validate + summarize only)          |
| `--fail-on-error`          | `boolean` | `false`     | Exit with non-zero code if upload fails             |
| `-- <args>`                | -         | -           | Additional arguments passed to `cypress run`        |

## Configuration Options

When using programmatic configuration, these options are available:

| Option              | Type           | Default            | Description                               |
| ------------------- | -------------- | ------------------ | ----------------------------------------- |
| `on`                | `PluginEvents` | -                  | **Required** Cypress plugin events object |
| `apiKey`            | `string`       | -                  | **Required** Testream API key             |
| `uploadEnabled`     | `boolean`      | `true`             | Enable/disable automatic upload           |
| `failOnUploadError` | `boolean`      | `false`            | Fail test run if upload fails             |
| `outputDir`         | `string`       | `ctrf`             | CTRF output directory                     |
| `outputFile`        | `string`       | `ctrf-report.json` | CTRF report filename                      |
| `screenshot`        | `boolean`      | `true`             | Include screenshots in report             |
| `minimal`           | `boolean`      | `false`            | Generate minimal report                   |
| `annotations`       | `boolean`      | `false`            | Include Cypress annotations               |
| `testType`          | `string`       | `e2e`              | Test type (e.g., `e2e`, `integration`)    |
| `appName`           | `string`       | -                  | Application name                          |
| `appVersion`        | `string`       | -                  | Application version                       |
| `branchName`        | `string`       | auto               | Git branch name                           |
| `commitSha`         | `string`       | auto               | Git commit SHA                            |
| `repositoryUrl`     | `string`       | auto               | Git repository URL                        |
| `repositoryName`    | `string`       | auto               | Git repository name                       |
| `buildName`         | `string`       | -                  | Build name                                |
| `buildNumber`       | `string`       | auto               | Build number                              |
| `buildUrl`          | `string`       | auto               | Build URL                                 |
| `testEnvironment`   | `string`       | -                  | Test environment name                     |

## Examples

### Run tests and upload

```bash
npx @testream/cypress-reporter -k $TESTREAM_API_KEY
```

### Run tests from a specific project directory

```bash
npx @testream/cypress-reporter -k $TESTREAM_API_KEY --project ./e2e
```

### Pass additional arguments to Cypress

```bash
npx @testream/cypress-reporter -k $TESTREAM_API_KEY -- --spec "cypress/e2e/**/*.cy.js"
```

### Use existing CTRF results

If you've already run your tests and have CTRF reports:

```bash
npx @testream/cypress-reporter -k $TESTREAM_API_KEY --results-path ctrf/ctrf-report.json
```

### Add application and environment metadata

```bash
npx @testream/cypress-reporter \
  -k $TESTREAM_API_KEY \
  --build-name "E2E Tests" \
  --test-environment ci \
  --app-name "My App" \
  --app-version 1.0.0 \
  --test-type e2e
```

## Full Configuration Example

```typescript title="cypress.config.ts"
import { defineConfig } from "cypress";
import { TestreamReporter } from "@testream/cypress-reporter";

export default defineConfig({
  e2e: {
    baseUrl: "https://example.cypress.io",
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      new TestreamReporter({
        on,
        // API Configuration
        apiKey: process.env.TESTREAM_API_KEY,

        // Upload Configuration
        uploadEnabled: true,
        failOnUploadError: false,

        // Output Configuration
        outputDir: "ctrf",
        outputFile: "ctrf-report.json",

        // Report Options
        screenshot: true,
        testType: "e2e",
        minimal: false,

        // Application Info
        appName: "My App",
        appVersion: "1.0.0",

        // Environment
        testEnvironment: process.env.TEST_ENV || "local",

        // Build Metadata
        buildName: "Cypress E2E Tests",
      });
    },
  },
});
```

## GitHub Actions Example

```yaml title=".github/workflows/cypress-tests.yml"
name: Cypress Tests

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

      - name: Run Cypress tests and upload
        env:
          TESTREAM_API_KEY: ${{ secrets.TESTREAM_API_KEY }}
        run: |
          npx @testream/cypress-reporter \
            -k $TESTREAM_API_KEY \
            --build-name "${{ github.workflow }}" \
            --test-environment ci \
            --app-name "${{ github.event.repository.name }}" \
            --app-version "${{ github.sha }}" \
            --test-type e2e \
            --fail-on-error
```

## Notes

### Screenshots and Artifacts

Cypress screenshots captured during test runs are automatically included in the CTRF report when `screenshot: true` is set (default behavior).

## Sample Project

The **[testream/cypress-jira-reporter](https://github.com/testream/cypress-jira-reporter)** repository is a complete working example of a Cypress project integrated with Testream. It includes example tests, full reporter configuration, and a ready-to-use GitHub Actions workflow.

## NPM Package

- **Package:** [@testream/cypress-reporter](https://www.npmjs.com/package/@testream/cypress-reporter)
- **Org:** [testream packages](https://www.npmjs.com/org/testream)

## What's Next?

- Learn about the [Jest Reporter](./jest)
- Learn about the [Pytest Reporter](./pytest)
- Learn about the [Playwright Reporter](./playwright)
- Learn about the [WebdriverIO Reporter](./webdriverio)
- Set up [CLI Reporter](./cli)
- View results in [Jira](../jira-integration/usage)
