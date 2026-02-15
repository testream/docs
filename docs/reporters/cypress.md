---
sidebar_position: 3
---

# Cypress Reporter

The Testream Cypress Reporter runs your Cypress tests and automatically uploads test results to Testream. You can use it as a CLI tool or integrate it directly into your Cypress configuration.

## Installation

```bash
npm install --save-dev @testream/cypress-reporter cypress-ctrf-json-reporter
```

## Quick Start

### Option 1: CLI (Recommended)

The easiest way to get started is using the CLI:

```bash
npx @testream/cypress-reporter -k $TESTREAM_API_KEY
```

This single command will:
1. Run your Cypress tests
2. Generate a CTRF report automatically
3. Upload results to Testream (project key inferred from API key)

### Option 2: Programmatic Configuration

Add the reporter to your `cypress.config.ts`:

```typescript title="cypress.config.ts"
import { defineConfig } from 'cypress';
import { TestreamReporter } from '@testream/cypress-reporter';

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

| Option | Description |
| --- | --- |
| `-k, --api-key` | **Required** API key (unless `--no-upload` is used) |
| `--project <path>` | Path to Cypress project (defaults to current directory) |
| `--results-path <path>` | Use existing CTRF file(s) instead of running tests |
| `--branch <name>` | Git branch name (auto-detected in CI) |
| `--commit-sha <sha>` | Git commit SHA (auto-detected in CI) |
| `--repository-url <url>` | Git repository URL (auto-detected in CI) |
| `--build-name <name>` | Build name |
| `--build-number <num>` | Build number |
| `--build-url <url>` | Build URL |
| `--test-environment <env>` | Test environment (e.g., `ci`, `staging`) |
| `--app-name <name>` | Application name |
| `--app-version <ver>` | Application version |
| `--test-type <type>` | Test type (e.g., `e2e`, `integration`) |
| `--no-upload` | Skip uploading (validate + summarize only) |
| `--fail-on-error` | Exit with non-zero code if upload fails |
| `-- <args>` | Additional arguments passed to `cypress run` |

## Configuration Options

When using programmatic configuration, these options are available:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `on` | `PluginEvents` | - | **Required** Cypress plugin events object |
| `apiKey` | `string` | - | **Required** Testream API key |
| `uploadEnabled` | `boolean` | `true` | Enable/disable automatic upload |
| `failOnUploadError` | `boolean` | `false` | Fail test run if upload fails |
| `outputDir` | `string` | `ctrf` | CTRF output directory |
| `outputFile` | `string` | `ctrf-report.json` | CTRF report filename |
| `screenshot` | `boolean` | `true` | Include screenshots in report |
| `minimal` | `boolean` | `false` | Generate minimal report |
| `annotations` | `boolean` | `false` | Include Cypress annotations |
| `testType` | `string` | `e2e` | Test type (e.g., `e2e`, `integration`) |
| `appName` | `string` | - | Application name |
| `appVersion` | `string` | - | Application version |
| `branchName` | `string` | auto | Git branch name |
| `commitSha` | `string` | auto | Git commit SHA |
| `repositoryUrl` | `string` | auto | Git repository URL |
| `repositoryName` | `string` | auto | Git repository name |
| `buildName` | `string` | - | Build name |
| `buildNumber` | `string` | - | Build number |
| `buildUrl` | `string` | - | Build URL |
| `testEnvironment` | `string` | - | Test environment name |

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

### Add full metadata

```bash
npx @testream/cypress-reporter \
  -k $TESTREAM_API_KEY \
  --branch $GITHUB_REF_NAME \
  --commit-sha $GITHUB_SHA \
  --repository-url $GITHUB_SERVER_URL/$GITHUB_REPOSITORY \
  --build-name "E2E Tests" \
  --build-number $GITHUB_RUN_NUMBER \
  --build-url $GITHUB_SERVER_URL/$GITHUB_REPOSITORY/actions/runs/$GITHUB_RUN_ID \
  --test-environment ci \
  --app-name "My App" \
  --app-version 1.0.0 \
  --test-type e2e
```

### Full Programmatic Configuration Example

```typescript title="cypress.config.ts"
import { defineConfig } from 'cypress';
import { TestreamReporter } from '@testream/cypress-reporter';

export default defineConfig({
  e2e: {
    baseUrl: 'https://example.cypress.io',
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
        outputDir: 'ctrf',
        outputFile: 'ctrf-report.json',

        // Report Options
        screenshot: true,
        testType: 'e2e',
        minimal: false,

        // Application Info
        appName: 'My App',
        appVersion: '1.0.0',

        // Environment
        testEnvironment: process.env.TEST_ENV || 'local',

        // Git Info (auto-detected in CI)
        commitSha: process.env.GITHUB_SHA,
        repositoryUrl: process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY
          ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}`
          : undefined,
        branchName: process.env.GITHUB_REF_NAME,

        // Build Info
        buildNumber: process.env.GITHUB_RUN_NUMBER,
        buildName: 'Cypress E2E Tests',
        buildUrl: process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY && process.env.GITHUB_RUN_ID
          ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
          : undefined,
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

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Run Cypress tests and upload
        env:
          TESTREAM_API_KEY: ${{ secrets.TESTREAM_API_KEY }}
        run: |
          npx @testream/cypress-reporter \
            -k $TESTREAM_API_KEY \
            --test-environment ci \
            --app-name MyApp \
            --app-version 1.0.0 \
            --fail-on-error
```

## Notes

### Peer Dependency

The reporter requires `cypress-ctrf-json-reporter` as a peer dependency. Make sure it's installed:

```bash
npm install --save-dev cypress-ctrf-json-reporter
```

### Screenshots and Artifacts

Cypress screenshots captured during test runs are automatically included in the CTRF report when `screenshot: true` is set (default behavior).

## NPM Package

- **Package:** [@testream/cypress-reporter](https://www.npmjs.com/package/@testream/cypress-reporter)
- **Org:** [testream packages](https://www.npmjs.com/org/testream)

## What's Next?

- Learn about the [Jest Reporter](./jest)
- Learn about the [Playwright Reporter](./playwright)
- Learn about the [WebdriverIO Reporter](./webdriverio)
- Set up [CLI Reporter](./cli)
- View results in [Jira](../jira-integration/usage)
