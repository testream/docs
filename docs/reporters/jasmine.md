---
sidebar_position: 11
title: 'Jasmine Reporter'
description: 'Send Jasmine 5 test results from Node.js CI/CD into Jira with the Testream Jasmine Reporter, source evidence, CTRF output, and run metadata.'
keywords:
  - jasmine jira reporter
  - jasmine test reporting jira
  - jasmine ci results jira
  - jasmine ctrf reporter
---

# Jasmine Reporter

Use the Testream Jasmine Reporter to send Jasmine 5 test results from Node.js CI/CD into Testream and Jira with CTRF output, source evidence, and CI run metadata.

Looking for the higher-level product fit first? Read the website page for [CI/CD test results in Jira](https://testream.app/ci-test-results-jira).

For CI context and pull-request comparison setup, see [CI context and pull-request comparisons](../features/ci-context).

## Installation

```bash
npm install --save-dev @testream/jasmine-reporter
```

## Basic Configuration

Register the reporter from a Jasmine helper loaded by your configuration, such as `helpers/testream-reporter.js`:

```javascript title="helpers/testream-reporter.js"
const TestreamJasmineReporter = require("@testream/jasmine-reporter");

jasmine.getEnv().addReporter(
  new TestreamJasmineReporter({
    apiKey: process.env.TESTREAM_API_KEY,
    uploadEnabled: process.env.TESTREAM_UPLOAD_ENABLED === "true",
    failOnUploadError:
      process.env.TESTREAM_FAIL_ON_UPLOAD_ERROR === "true",
    testEnvironment: process.env.TESTREAM_TEST_ENVIRONMENT || "ci",
    appName: process.env.TESTREAM_APP_NAME || "my-app",
    appVersion: process.env.TESTREAM_APP_VERSION || "1.0.0",
    testType: process.env.TESTREAM_TEST_TYPE || "unit",
  }),
);
```

Run Jasmine normally:

```bash
npx jasmine
```

The reporter writes `ctrf/ctrf-report.json` by default. It uploads the report when upload is enabled and an API key is available.

## Local Report Without Upload

Generate a local CTRF report without making a network request:

```javascript
new TestreamJasmineReporter({
  uploadEnabled: false,
  outputDir: "artifacts",
  outputFile: "jasmine-results.json",
});
```

The reporter normalizes the report tool to `jasmine` and adds `generatedBy: "@testream/jasmine-reporter"`.

## Configuration Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `apiKey` | `string` | empty | Testream API key. Upload is skipped when no key is available. |
| `apiUrl` | `string` | `TESTREAM_API_URL` or production API | Override the Testream API base URL. |
| `uploadEnabled` | `boolean \| string` | `true` | Enable or disable automatic upload. |
| `failOnUploadError` | `boolean \| string` | `false` | Fail the Jasmine run when upload fails. |
| `outputDir` | `string` | `ctrf` | Directory for the CTRF report. |
| `outputFile` | `string` | `ctrf-report.json` | Report filename. A `.json` suffix is added when omitted. |
| `sourceRoot` | `string` | `process.cwd()` | Root used for source evidence discovery. |
| `discoverFiles` | `boolean` | `true` | Discover source files when Jasmine does not provide file locations. |
| `sourceFiles` | `string[]` | Jasmine-loaded files | Restrict discovery to files relative to `sourceRoot` or to absolute paths. Useful for ESM or programmatic setups. |
| `maxChars`, `maxLines` | `number` | shared defaults | Bound the source evidence stored in each test result. |
| `branch` | `string` | auto from CI | Override the Git branch name. |
| `commitSha` | `string` | auto from CI | Override the Git commit SHA. |
| `repositoryUrl` | `string` | auto from CI | Override the repository URL. |
| `buildName`, `buildNumber`, `buildUrl` | `string` | optional/CI | Add build metadata or override detected CI values. |
| `testEnvironment` | `string` | optional | Environment such as `ci`, `staging`, or `local`. |
| `appName`, `appVersion`, `testType` | `string` | optional | Application and test metadata. |

When branch, commit, repository, build, or merge-base values are not supplied, Testream resolves supported CI context during upload. See the [CI context guide](../features/ci-context) for checkout requirements and supported providers.

## Source Evidence

The upstream Jasmine CTRF reporter does not emit source locations. Testream therefore scans the JavaScript and TypeScript files that Jasmine loaded before the run, matches `describe` and `it` declarations to the Jasmine full test name, and adds a relative `filePath`, `line`, and bounded `snippet` to the test result. Set `sourceFiles` when tests are loaded through ESM or programmatic setup; paths may be relative to `sourceRoot` or absolute.

The scan supports `.js`, `.jsx`, `.mjs`, `.cjs`, `.ts`, `.tsx`, `.mts`, and `.cts` files. It skips dependency and generated directories such as `node_modules`, `dist`, `coverage`, `.git`, `.next`, `build`, and `out`. Set `discoverFiles: false` to disable the scan.

## Upload Failures and Test Exit Status

Uploads are best-effort by default. Set `failOnUploadError: true` when a failed upload must fail the Jasmine process:

```javascript
new TestreamJasmineReporter({
  apiKey: process.env.TESTREAM_API_KEY,
  failOnUploadError: true,
});
```

Jasmine test failures remain the test command's exit signal. The upload-failure option adds upload status to that signal; it does not replace Jasmine's test result handling.

## Artifacts

Jasmine's standard reporter lifecycle does not provide framework-owned screenshots or videos. This package reports tests, source evidence, and CTRF metadata; artifact capture requires a separate CI or test integration.

## GitHub Actions Example

```yaml title=".github/workflows/jasmine-tests.yml"
name: Jasmine Tests

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

      - name: Run Jasmine tests
        env:
          TESTREAM_API_KEY: ${{ secrets.TESTREAM_API_KEY }}
          TESTREAM_UPLOAD_ENABLED: "true"
          TESTREAM_FAIL_ON_UPLOAD_ERROR: "true"
          TESTREAM_BUILD_NAME: ${{ github.workflow }}
          TESTREAM_TEST_ENVIRONMENT: ci
          TESTREAM_APP_NAME: ${{ github.event.repository.name }}
          TESTREAM_APP_VERSION: ${{ github.sha }}
          TESTREAM_TEST_TYPE: unit
        run: npm test
```

## NPM Package

- **Package:** [@testream/jasmine-reporter](https://www.npmjs.com/package/@testream/jasmine-reporter)
- **Organization:** [Testream packages](https://www.npmjs.com/org/testream)

## What's Next?

- Learn about the [Jest Reporter](./jest).
- Learn about the [Vitest Reporter](./vitest).
- Review [CI context and pull-request comparisons](../features/ci-context).
