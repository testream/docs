---
sidebar_position: 4
---

# Jest Reporter

The Testream Jest Reporter integrates seamlessly with your Jest test suite to automatically generate CTRF reports and upload test results to Testream. Simply add it to your Jest configuration and continue running tests as usual.

## Installation

```bash
npm install --save-dev @testream/jest-reporter
```

## Basic Configuration

Add the reporter to your `jest.config.js`:

```javascript title="jest.config.js"
module.exports = {
  reporters: [
    'default',
    [
      '@testream/jest-reporter',
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

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `apiKey` | `string` | - | **Required** Testream API key |
| `uploadEnabled` | `boolean` | `true` | Enable/disable automatic upload |
| `failOnUploadError` | `boolean` | `false` | Fail test run if upload fails |
| `branch` | `string` | auto | Git branch name |
| `commitSha` | `string` | auto | Git commit SHA |
| `repositoryUrl` | `string` | auto | Git repository URL |
| `testType` | `string` | - | Test type (e.g., `unit`, `integration`) |
| `appName` | `string` | - | Application name |
| `appVersion` | `string` | - | Application version |
| `buildName` | `string` | - | Build name |
| `buildNumber` | `string` | - | Build number |
| `buildUrl` | `string` | - | Build URL |
| `testEnvironment` | `string` | - | Test environment (e.g., `ci`, `staging`) |

## Full Configuration Example

```javascript title="jest.config.js"
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      '@testream/jest-reporter',
      {
        // API Configuration
        apiKey: process.env.TESTREAM_API_KEY,
        
        // Upload Configuration
        uploadEnabled: process.env.CI === 'true',
        failOnUploadError: true,
        
        // Git Context (auto-detected in most CI environments)
        branch: process.env.GITHUB_REF_NAME,
        commitSha: process.env.GITHUB_SHA,
        repositoryUrl: process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY
          ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}`
          : undefined,
        
        // Build Metadata
        buildName: process.env.GITHUB_WORKFLOW || 'Jest Tests',
        buildNumber: process.env.GITHUB_RUN_NUMBER,
        buildUrl: process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY && process.env.GITHUB_RUN_ID
          ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
          : undefined,
        
        // Application Metadata
        testEnvironment: process.env.TEST_ENV || 'ci',
        appName: 'My App',
        appVersion: '1.0.0',
        testType: 'unit',
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
    'default',
    [
      '@testream/jest-reporter',
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
    'default',
    [
      '@testream/jest-reporter',
      {
        apiKey: process.env.TESTREAM_API_KEY,
        uploadEnabled: process.env.CI === 'true',
        testEnvironment: process.env.CI ? 'ci' : 'local',
      },
    ],
  ],
};
```

### With Coverage

Jest reporter works seamlessly with coverage:

```bash
jest --coverage
```

The reporter will still upload test results even when coverage is enabled.

### TypeScript Configuration

If using TypeScript for your Jest config:

```typescript title="jest.config.ts"
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      '@testream/jest-reporter',
      {
        apiKey: process.env.TESTREAM_API_KEY!,
        uploadEnabled: true,
        testType: 'unit',
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
    'default',
    [
      '@testream/jest-reporter',
      {
        apiKey: process.env.TESTREAM_API_KEY,
        uploadEnabled: process.env.TESTREAM_UPLOAD_ENABLED === 'true',
        failOnUploadError: process.env.TESTREAM_FAIL_ON_ERROR === 'true',
        branch: process.env.TESTREAM_BRANCH,
        commitSha: process.env.TESTREAM_COMMIT_SHA,
        repositoryUrl: process.env.TESTREAM_REPOSITORY_URL,
        buildName: process.env.TESTREAM_BUILD_NAME,
        buildNumber: process.env.TESTREAM_BUILD_NUMBER,
        buildUrl: process.env.TESTREAM_BUILD_URL,
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
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Run tests with Testream reporter
        env:
          TESTREAM_API_KEY: ${{ secrets.TESTREAM_API_KEY }}
        run: npm test
```

### GitHub Actions with Full Metadata

For complete test result metadata:

```yaml title=".github/workflows/jest-tests.yml"
name: Jest Tests

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

      - name: Run tests
        env:
          TESTREAM_API_KEY: ${{ secrets.TESTREAM_API_KEY }}
          TESTREAM_UPLOAD_ENABLED: 'true'
          TESTREAM_BRANCH: ${{ github.ref_name }}
          TESTREAM_COMMIT_SHA: ${{ github.sha }}
          TESTREAM_REPOSITORY_URL: ${{ github.server_url }}/${{ github.repository }}
          TESTREAM_BUILD_NAME: 'Jest Tests'
          TESTREAM_BUILD_NUMBER: ${{ github.run_number }}
          TESTREAM_BUILD_URL: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
          TESTREAM_TEST_ENVIRONMENT: 'ci'
          TESTREAM_APP_NAME: 'my-app'
          TESTREAM_APP_VERSION: '1.0.0'
          TESTREAM_TEST_TYPE: 'unit'
          TESTREAM_FAIL_ON_UPLOAD_ERROR: 'true'
        run: npm test
```

## Notes

### Automatic CTRF Generation

The reporter uses `jest-ctrf-json-reporter` under the hood to generate CTRF reports automatically. You don't need to configure anything else - just add the reporter and you're ready to go!

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

## NPM Package

- **Package:** [@testream/jest-reporter](https://www.npmjs.com/package/@testream/jest-reporter)
- **Org:** [testream packages](https://www.npmjs.com/org/testream)

## What's Next?

- Learn about the [Cypress Reporter](./cypress)
- Learn about the [Playwright Reporter](./playwright)
- Learn about the [WebdriverIO Reporter](./webdriverio)
- Set up [CI/CD integrations](../ci-integrations/setup)
- View results in [Jira](../jira-integration/usage)
