---
sidebar_position: 9
---

# Mocha Reporter

The Testream Mocha Reporter generates CTRF test reports from Mocha and uploads them to Testream.

## Installation

```bash
npm install --save-dev @testream/mocha-reporter
```

## Basic Configuration

Add the reporter to your `.mocharc.js`:

```js title=".mocharc.js"
module.exports = {
  reporter: '@testream/mocha-reporter',
  'reporter-option': [
    `apiKey=${process.env.TESTREAM_API_KEY}`,
    'uploadEnabled=true',
  ],
};
```

## Configuration Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `apiKey` | `string` | - | **Required** Testream API key |
| `uploadEnabled` | `boolean` | `true` | Enable/disable automatic upload |
| `failOnUploadError` | `boolean` | `false` | Fail the test run if upload fails |
| `branch` | `string` | auto (CI) | Git branch name |
| `commitSha` | `string` | auto (CI) | Git commit SHA |
| `repositoryUrl` | `string` | auto (CI) | Git repository URL |
| `testType` | `string` | - | Test type (e.g., `unit`, `integration`, `e2e`) |
| `appName` | `string` | - | Application name |
| `appVersion` | `string` | - | Application version |
| `buildName` | `string` | - | Build name |
| `buildNumber` | `string` | auto (CI) | Build number |
| `buildUrl` | `string` | auto (CI) | Build URL |
| `testEnvironment` | `string` | - | Test environment (e.g., `ci`, `staging`) |

## Full Configuration Example

```js title=".mocharc.js"
module.exports = {
  spec: 'test/**/*.spec.js',
  timeout: 30000,
  reporter: '@testream/mocha-reporter',
  'reporter-option': [
    `apiKey=${process.env.TESTREAM_API_KEY}`,
    'uploadEnabled=true',
    'failOnUploadError=false',
    `branch=${process.env.GITHUB_REF_NAME || 'local'}`,
    `commitSha=${process.env.GITHUB_SHA || ''}`,
    `repositoryUrl=${process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY
      ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}`
      : ''}`,
    `buildName=${process.env.GITHUB_WORKFLOW || 'mocha-tests'}`,
    `buildNumber=${process.env.GITHUB_RUN_NUMBER || ''}`,
    `buildUrl=${process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY && process.env.GITHUB_RUN_ID
      ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
      : ''}`,
    `testEnvironment=${process.env.TEST_ENV || 'ci'}`,
    `appName=${process.env.APP_NAME || 'my-app'}`,
    `appVersion=${process.env.APP_VERSION || '1.0.0'}`,
    'testType=unit',
  ],
};
```

## Notes

- The reporter writes the CTRF report to `ctrf/ctrf-report.json`.
- Git and CI metadata can be auto-detected when running in supported CI providers.
- Mocha passes reporter options as strings (`key=value`), including booleans.

## NPM Package

- **Package:** [@testream/mocha-reporter](https://www.npmjs.com/package/@testream/mocha-reporter)
- **Org:** [testream packages](https://www.npmjs.com/org/testream)

## What's Next?

- Learn about the [Playwright Reporter](./playwright)
- Learn about the [Jest Reporter](./jest)
- Learn about the [Vitest Reporter](./vitest)
- Upload existing CTRF reports with the [CLI Reporter](./cli)
