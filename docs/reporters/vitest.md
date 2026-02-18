---
sidebar_position: 8
---

# Vitest Reporter

The Testream Vitest Reporter generates a CTRF report from your Vitest test run and uploads the results to Testream.

## Installation

```bash
npm install --save-dev @testream/vitest-reporter
```

## Basic Configuration

Add the reporter to your `vitest.config.ts`:

```ts title="vitest.config.ts"
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    reporters: [
      'default',
      [
        '@testream/vitest-reporter',
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

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `apiKey` | `string` | - | **Required** Testream API key |
| `uploadEnabled` | `boolean` | `true` | Enable/disable automatic upload |
| `failOnUploadError` | `boolean` | `false` | Fail the test run if upload fails |
| `outputDir` | `string` | `ctrf` | CTRF output directory |
| `outputFile` | `string` | `ctrf-report.json` | CTRF report filename |
| `branch` | `string` | auto (CI) | Git branch name |
| `commitSha` | `string` | auto (CI) | Git commit SHA |
| `repositoryUrl` | `string` | auto (CI) | Git repository URL |
| `buildName` | `string` | - | Build name/identifier |
| `buildNumber` | `string` | - | Build number |
| `buildUrl` | `string` | - | Build URL |
| `testEnvironment` | `string` | - | Test environment (e.g., `ci`, `staging`) |
| `appName` | `string` | - | Application name |
| `appVersion` | `string` | - | Application version |
| `testType` | `string` | `unit` | Test type (e.g., `unit`, `integration`, `e2e`) |

## Full Configuration Example

```ts title="vitest.config.ts"
import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    test: {
      include: ['__tests__/**/*.test.ts'],
      reporters: [
        'default',
        [
          '@testream/vitest-reporter',
          {
            apiKey: process.env.TESTREAM_API_KEY || env.TESTREAM_API_KEY,
            uploadEnabled: true,
            failOnUploadError: true,
            testEnvironment: env.TESTREAM_TEST_ENVIRONMENT || 'local',
            appName: env.TESTREAM_APP_NAME || 'vitest-example',
            appVersion: env.TESTREAM_APP_VERSION || '1.0.0',
            testType: env.TESTREAM_TEST_TYPE || 'unit',
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

## NPM Package

- **Package:** [@testream/vitest-reporter](https://www.npmjs.com/package/@testream/vitest-reporter)
- **Org:** [testream packages](https://www.npmjs.com/org/testream)

## What's Next?

- Learn about the [Jest Reporter](./jest)
- Upload existing CTRF reports with the [CLI Reporter](./cli)
