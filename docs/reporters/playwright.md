---
sidebar_position: 1
---

# Playwright Reporter

The Testream Playwright Reporter automatically generates CTRF reports and uploads test results and artifacts to Testream.

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
      upload: true,
      apiKey: process.env.TESTREAM_API_KEY,
    }],
    ['html'], // Keep other reporters
  ],

  // Your test configuration...
  testDir: './tests',
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
});
```

## Configuration Options

### Required Options

| Option | Type | Description |
|--------|------|-------------|
| `apiKey` | string | Your Testream API key (use environment variable) |
| `upload` | boolean | Set to `true` to enable uploads |

### Optional Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiUrl` | string | (backend default) | Override API endpoint URL |
| `outputFile` | string | `'ctrf-report.json'` | Path to save CTRF report file |
| `uploadArtifacts` | boolean | `true` | Upload screenshots, videos, and traces |
| `minimal` | boolean | `false` | Minimal console output |
| `printSummary` | boolean | `true` | Print test summary at the end |

## Complete Example

```typescript title="playwright.config.ts"
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    // Testream reporter with all options
    ['@testream/playwright-reporter', {
      // Upload configuration
      upload: true,
      apiKey: process.env.TESTREAM_API_KEY,
      apiUrl: process.env.TESTREAM_API_URL,

      // Report configuration
      outputFile: 'test-results/ctrf-report.json',
      uploadArtifacts: true,

      // Console output
      minimal: false,
      printSummary: true,
    }],

    // Other reporters
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
  ],

  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

## Artifact Uploads

The reporter automatically uploads test artifacts when `uploadArtifacts: true`:

### Supported Artifact Types

- **Screenshots** (`.png`, `.jpg`, `.jpeg`)
- **Videos** (`.webm`, `.mp4`)
- **Traces** (`.zip`)

### How It Works

1. Run tests with artifact capture enabled:
   ```typescript
   use: {
     screenshot: 'only-on-failure',
     video: 'retain-on-failure',
     trace: 'retain-on-failure',
   }
   ```

2. Playwright saves artifacts to `test-results/` directory

3. The reporter automatically discovers and uploads artifacts

4. View artifacts in Testream dashboard

### Customizing Artifact Locations

If you use custom output directories:

```typescript
use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
},
outputDir: 'custom-test-results',
```

The reporter will automatically detect artifacts in your custom directory.

## Environment Variables

### Local Development

Create `.env` file:

```bash title=".env"
TESTREAM_API_KEY=your_api_key_here
TESTREAM_API_URL=https://api.testream.app  # Optional
```

Load it in your config:

```typescript title="playwright.config.ts"
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  reporter: [
    ['@testream/playwright-reporter', {
      upload: true,
      apiKey: process.env.TESTREAM_API_KEY,
    }],
  ],
});
```

### GitHub Actions

```yaml
- name: Run Playwright tests
  run: npx playwright test
  env:
    TESTREAM_API_KEY: ${{ secrets.TESTREAM_API_KEY }}
```

## Running Tests

```bash
# Make sure environment variables are set
export TESTREAM_API_KEY=your_api_key_here

# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/example.spec.ts

# Run in headed mode
npx playwright test --headed

# Run with specific browser
npx playwright test --project=chromium
```

## CTRF Report Format

The reporter generates a CTRF (Common Test Report Format) JSON file:

```json title="ctrf-report.json"
{
  "results": {
    "tool": {
      "name": "playwright"
    },
    "summary": {
      "tests": 10,
      "passed": 8,
      "failed": 1,
      "pending": 0,
      "skipped": 1,
      "other": 0,
      "start": 1234567890,
      "stop": 1234567900
    },
    "tests": [
      {
        "name": "should login successfully",
        "status": "passed",
        "duration": 1523
      }
    ]
  }
}
```

This format ensures compatibility with CTRF tools and services.

## Troubleshooting

### Tests run but no upload happens

**Check:**
- ✅ `upload: true` is set in reporter config
- ✅ `TESTREAM_API_KEY` environment variable is set
- ✅ API key is valid (not expired)
- ✅ Internet connection is available

### Artifacts not uploading

**Check:**
- ✅ `uploadArtifacts: true` in reporter config
- ✅ Artifacts are actually being generated (check `test-results/` folder)
- ✅ Test configuration includes `screenshot`, `video`, or `trace` settings

### Authentication errors

```
Error: Authentication failed - invalid API key
```

**Solution:**
- Generate a new API key from [testream.app](https://testream.app)
- Update `TESTREAM_API_KEY` environment variable
- Verify no typos in the API key

### Network errors

```
Error: Failed to upload - network error
```

**Check:**
- Internet connection
- Firewall settings
- Corporate proxy configuration
- `apiUrl` if using custom endpoint

## Advanced Usage

### Conditional Upload (CI only)

```typescript
reporter: [
  ['@testream/playwright-reporter', {
    upload: !!process.env.CI,  // Only upload in CI
    apiKey: process.env.TESTREAM_API_KEY,
  }],
],
```

### Multiple Environments

```typescript
const isProduction = process.env.NODE_ENV === 'production';

reporter: [
  ['@testream/playwright-reporter', {
    upload: true,
    apiKey: isProduction
      ? process.env.TESTREAM_PROD_API_KEY
      : process.env.TESTREAM_DEV_API_KEY,
    apiUrl: isProduction
      ? 'https://api.testream.app'
      : 'https://dev-api.testream.app',
  }],
],
```

### Disable Artifacts for Faster Uploads

```typescript
reporter: [
  ['@testream/playwright-reporter', {
    upload: true,
    apiKey: process.env.TESTREAM_API_KEY,
    uploadArtifacts: false,  // Faster uploads, no artifacts
  }],
],
```

## NPM Package

- **Package:** [@testream/playwright-reporter](https://www.npmjs.com/package/@testream/playwright-reporter)
- **Version:** 0.4.0
- **Repository:** [GitHub](https://github.com/hasanalituran/jira-test-manager)

## What's Next?

- Learn about [.NET Reporter](./dotnet) for .NET projects
- Set up [GitHub Action](../github-action/setup) for CI/CD
- View results in [Jira](../jira-integration/usage)
