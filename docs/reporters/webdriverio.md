---
sidebar_position: 5
---

# WebdriverIO Reporter

The Testream WebdriverIO Reporter generates CTRF reports and uploads test results to Testream. It extends `wdio-ctrf-json-reporter` to integrate seamlessly with WebdriverIO's reporter system.

## Installation

```bash
npm install --save-dev @testream/webdriverio-reporter wdio-ctrf-json-reporter
```

## Basic Configuration

Add the reporter and launcher service to your `wdio.conf.ts`:

```typescript title="wdio.conf.ts"
const testreamConfig = {
  apiKey: process.env.TESTREAM_API_KEY || '',
  uploadEnabled: true,
};

export const config: Options.Testrunner = {
  reporters: [
    'spec',
    ['@testream/webdriverio-reporter', testreamConfig],
  ],
  services: [
    ['@testream/webdriverio-reporter', testreamConfig],
  ],
};
```

The `services` entry registers a launcher service that automatically aggregates per-worker CTRF reports and uploads the merged result when the test run completes.

## Configuration Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `apiKey` | `string` | - | **Required** Testream API key |
| `uploadEnabled` | `boolean` | `true` | Enable/disable automatic upload |
| `failOnUploadError` | `boolean` | `false` | Fail the test run if upload fails |
| `branch` | `string` | auto | Git branch name |
| `commitSha` | `string` | auto | Git commit SHA |
| `repositoryUrl` | `string` | auto | Git repository URL |
| `outputDir` | `string` | `ctrf` | CTRF output directory |
| `outputFile` | `string` | `ctrf-report.json` | CTRF report filename |
| `buildName` | `string` | - | Build name |
| `buildNumber` | `string` | - | Build number |
| `buildUrl` | `string` | - | Build URL |
| `testEnvironment` | `string` | - | Environment name |
| `appName` | `string` | - | Application name |
| `appVersion` | `string` | - | Application version |
| `testType` | `string` | `e2e` | Test type (e.g., `api`, `unit`) |

## Full Configuration Example

```typescript title="wdio.conf.ts"
const testreamConfig = {
  apiKey: process.env.TESTREAM_API_KEY || '',
  uploadEnabled: true,
  failOnUploadError: true,
  branch: process.env.GITHUB_REF_NAME,
  commitSha: process.env.GITHUB_SHA,
  repositoryUrl: process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY
    ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}`
    : undefined,
  outputDir: 'ctrf',
  outputFile: 'ctrf-report.json',
  testType: 'e2e',
  appName: 'My App',
  appVersion: '1.0.0',
  buildName: process.env.GITHUB_WORKFLOW,
  buildNumber: process.env.GITHUB_RUN_NUMBER,
  buildUrl: process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY && process.env.GITHUB_RUN_ID
    ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
    : undefined,
  testEnvironment: process.env.TEST_ENV || 'ci',
};

export const config: Options.Testrunner = {
  runner: 'local',
  specs: ['./test/specs/**/*.ts'],
  maxInstances: 5,
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless', '--disable-gpu'] },
  }],
  logLevel: 'info',
  framework: 'mocha',
  reporters: [
    'spec',
    ['@testream/webdriverio-reporter', testreamConfig],
  ],
  services: [
    ['@testream/webdriverio-reporter', testreamConfig],
  ],
  mochaOpts: { ui: 'bdd', timeout: 60000 },
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

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Run WebdriverIO tests
        env:
          TESTREAM_API_KEY: ${{ secrets.TESTREAM_API_KEY }}
        run: npx wdio run wdio.conf.ts
```

## Notes

### Peer Dependency

The reporter requires `wdio-ctrf-json-reporter` as a peer dependency. Make sure it's installed:

```bash
npm install --save-dev wdio-ctrf-json-reporter
```

### Git Context Detection

In CI environments like GitHub Actions, GitLab CI, and CircleCI, git context (branch, commit SHA, repository URL) is automatically detected from environment variables. You only need to provide these values explicitly if running outside of standard CI environments.

## NPM Package

- **Package:** [@testream/webdriverio-reporter](https://www.npmjs.com/package/@testream/webdriverio-reporter)
- **Org:** [testream packages](https://www.npmjs.com/org/testream)

## What's Next?

- Learn about the [Playwright Reporter](./playwright)
- Learn about the [Cypress Reporter](./cypress)
- Learn about the [Jest Reporter](./jest)
- Learn about the [.NET Reporter](./dotnet)
- Set up [CLI Reporter](./cli)
- View results in [Jira](../jira-integration/usage)
