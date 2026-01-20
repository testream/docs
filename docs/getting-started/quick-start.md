---
sidebar_position: 2
---

# Quick Start

Get up and running with Testream in under 5 minutes! This guide uses Playwright as an example, but the process is similar for other frameworks.

## Prerequisites

- Node.js 18 or later
- An existing Playwright project (or create one with `npm init playwright@latest`)
- A Testream account ([sign up at testream.app](https://testream.app))

## Step 1: Get Your API Key

1. Log in to [testream.app](https://testream.app)
2. Go to **Settings** → **API Keys**
3. Click **Create API Key**
4. Copy the generated API key (you'll need this in the next steps)

## Step 2: Install the Reporter

```bash
npm install --save-dev @testream/playwright-reporter
```

## Step 3: Configure Playwright

Update your `playwright.config.ts`:

```typescript title="playwright.config.ts"
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['@testream/playwright-reporter', {
      // Upload configuration
      upload: true,
      apiKey: process.env.TESTREAM_API_KEY,

      // Optional: customize the report
      outputFile: 'ctrf-report.json',

      // Optional: upload artifacts (screenshots, videos, traces)
      uploadArtifacts: true,
    }],

    // Keep your existing reporters
    ['html'],
  ],

  // Rest of your config...
});
```

## Step 4: Set Environment Variable

### Local Development

Create a `.env` file in your project root:

```bash title=".env"
TESTREAM_API_KEY=your_api_key_here
```

**Important:** Add `.env` to your `.gitignore` to avoid committing secrets!

```bash title=".gitignore"
.env
```

### CI/CD (GitHub Actions)

Add your API key as a GitHub secret:

1. Go to your repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `TESTREAM_API_KEY`
4. Value: (paste your API key)
5. Click **Add secret**

## Step 5: Run Your Tests

```bash
# Make sure the environment variable is loaded
export TESTREAM_API_KEY=your_api_key_here

# Run your tests
npx playwright test
```

That's it! Your test results will automatically be uploaded to Testream.

## Step 6: View Results

1. Visit [testream.app](https://testream.app)
2. Navigate to **Dashboard** or **Test Runs**
3. You should see your latest test run with all results and artifacts

## Using with GitHub Actions

Create or update `.github/workflows/playwright.yml`:

```yaml title=".github/workflows/playwright.yml"
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4

    - uses: actions/setup-node@v4
      with:
        node-version: 20

    - name: Install dependencies
      run: npm ci

    - name: Install Playwright Browsers
      run: npx playwright install --with-deps

    - name: Run Playwright tests
      run: npx playwright test
      env:
        TESTREAM_API_KEY: ${{ secrets.TESTREAM_API_KEY }}
```

The reporter will automatically upload results during the test run!

## Alternative: Upload After Tests

You can also run tests first and upload results separately using the GitHub Action:

```yaml
- name: Run Playwright tests
  run: npx playwright test

- name: Upload to Testream
  if: always()
  uses: testream/upload-action@v0.4.1
  with:
    apiKey: ${{ secrets.TESTREAM_API_KEY }}
    ctrfPath: 'ctrf-report.json'
```

## Troubleshooting

### Tests run but nothing appears in Testream

- Verify your API key is correct
- Check that `upload: true` is set in the reporter config
- Look for error messages in the test output
- Ensure you have an active internet connection

### API Key not found

- Make sure the environment variable is exported: `export TESTREAM_API_KEY=your_key`
- In GitHub Actions, verify the secret is added and referenced correctly
- Check for typos in the environment variable name

### Upload fails with authentication error

- Your API key might be expired or invalid
- Generate a new API key from the Testream dashboard
- Update the environment variable/secret with the new key

## What's Next?

- Explore [configuration options](./configuration) for reporters
- Learn about [artifact uploads](../reporters/playwright#artifact-uploads)
- Set up [Jira integration](../jira-integration/installation) to view results in Jira
- Check out [.NET reporter](../reporters/dotnet) if you're testing .NET applications
