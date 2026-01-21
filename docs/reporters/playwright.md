---
sidebar_position: 1
---

# Playwright Reporter

The Testream Playwright Reporter generates CTRF reports and uploads test results (plus artifacts) to Testream.

## Installation

```bash
npm install --save-dev @testream/playwright-reporter
```

## Basic Configuration

Add the reporter to your `playwright.config.ts`:

```typescript title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['@testream/playwright-reporter', {
      apiKey: process.env.TESTREAM_API_KEY,
      projectKey: 'PROJ',
      uploadEnabled: true,
    }],
    ['html'],
  ],
});
```

## Configuration Options

### Required

| Option | Type | Description |
| --- | --- | --- |
| `apiKey` | `string` | Testream API key |
| `projectKey` | `string` | Jira project key |

### Optional

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `uploadEnabled` | `boolean` | `true` | Enable/disable automatic upload |
| `failOnUploadError` | `boolean` | `false` | Fail the test run if upload fails |
| `branch` | `string` | auto | Git branch name |
| `commitSha` | `string` | auto | Git commit SHA |
| `repositoryUrl` | `string` | auto | Git repository URL |
| `outputFile` | `string` | `ctrf-report.json` | CTRF report filename |
| `outputDir` | `string` | `ctrf` | CTRF output directory |
| `screenshot` | `boolean` | `true` | Include screenshots in CTRF |
| `annotations` | `boolean` | `false` | Include Playwright annotations |
| `testType` | `string` | `e2e` | Test type (e.g., `api`, `unit`) |
| `appName` | `string` | - | Application name |
| `appVersion` | `string` | - | Application version |
| `buildName` | `string` | - | Build name |
| `buildNumber` | `string` | - | Build number |
| `buildUrl` | `string` | - | Build URL |
| `testEnvironment` | `string` | - | Environment name |

## Full Configuration Example

```typescript title="playwright.config.ts"
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['@testream/playwright-reporter', {
      apiKey: process.env.TESTREAM_API_KEY,
      projectKey: 'PROJ',
      uploadEnabled: true,
      failOnUploadError: true,
      branch: process.env.GITHUB_REF_NAME,
      commitSha: process.env.GITHUB_SHA,
      repositoryUrl: process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY
        ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}`
        : undefined,
      outputFile: 'ctrf-report.json',
      outputDir: 'ctrf',
      screenshot: true,
      annotations: true,
      testType: 'e2e',
      appName: 'My App',
      appVersion: '1.0.0',
      buildName: process.env.GITHUB_WORKFLOW,
      buildNumber: process.env.GITHUB_RUN_NUMBER,
      buildUrl: process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY && process.env.GITHUB_RUN_ID
        ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
        : undefined,
      testEnvironment: process.env.TEST_ENV || 'ci',
    }],
    ['html', { open: 'never' }],
    ['list'],
  ],
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

## Notes on Artifacts

Playwright artifacts (screenshots, videos, traces) are uploaded automatically when they are attached to tests. Keep Playwright artifact capture enabled in `use` and the reporter will pick them up.

## NPM Package

- **Package:** [@testream/playwright-reporter](https://www.npmjs.com/package/@testream/playwright-reporter)
- **Org:** [testream packages](https://www.npmjs.com/org/testream)

## What's Next?

- Learn about the [.NET Reporter](./dotnet)
- Set up [CI/CD integrations](../ci-integrations/setup)
- View results in [Jira](../jira-integration/usage)
