---
sidebar_position: 1
---

# GitHub Action Setup

Upload test results and artifacts to Testream using the official GitHub Action.

## Quick Start

Add this to your workflow file:

```yaml title=".github/workflows/test.yml"
name: Run Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run tests
        run: npm test

      - name: Upload to Testream
        if: always()
        uses: testream/upload-action@v0.4.1
        with:
          apiKey: ${{ secrets.TESTREAM_API_KEY }}
```

## Configuration

### Required Inputs

| Input | Description |
|-------|-------------|
| `apiKey` | Your Testream API key (use GitHub Secrets) |

### Optional Inputs

| Input | Default | Description |
|-------|---------|-------------|
| `apiUrl` | (backend default) | Override API endpoint URL |
| `ctrfPath` | `ctrf-report.json` | Path to CTRF report file |
| `artifacts` | `test-results/**/*.{png,jpg,webm,mp4}` | Glob pattern for artifacts |
| `workingDirectory` | `./` | Working directory for the action |

## Setup API Key

### Step 1: Get Your API Key

1. Log in to [testream.app](https://testream.app)
2. Go to Settings → API Keys
3. Click "Create API Key"
4. Copy the generated key

### Step 2: Add to GitHub Secrets

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `TESTREAM_API_KEY`
5. Value: (paste your API key)
6. Click **Add secret**

## Usage Examples

### Basic Upload (Auto-detect CTRF file)

```yaml
- uses: testream/upload-action@v0.4.1
  with:
    apiKey: ${{ secrets.TESTREAM_API_KEY }}
```

### Custom CTRF Path

```yaml
- uses: testream/upload-action@v0.4.1
  with:
    apiKey: ${{ secrets.TESTREAM_API_KEY }}
    ctrfPath: 'build/test-results/ctrf-report.json'
```

### Upload with Artifacts

```yaml
- uses: testream/upload-action@v0.4.1
  with:
    apiKey: ${{ secrets.TESTREAM_API_KEY }}
    ctrfPath: 'ctrf-report.json'
    artifacts: 'test-results/**/*.{png,jpg,webm,mp4,zip}'
```

### Custom API URL

```yaml
- uses: testream/upload-action@v0.4.1
  with:
    apiKey: ${{ secrets.TESTREAM_API_KEY }}
    apiUrl: 'https://custom-api.example.com'
```

### Multiple Test Runs

Upload results from multiple test suites:

```yaml
- name: Upload Unit Tests
  uses: testream/upload-action@v0.4.1
  with:
    apiKey: ${{ secrets.TESTREAM_API_KEY }}
    ctrfPath: 'unit-tests/ctrf-report.json'

- name: Upload E2E Tests
  uses: testream/upload-action@v0.4.1
  with:
    apiKey: ${{ secrets.TESTREAM_API_KEY }}
    ctrfPath: 'e2e-tests/ctrf-report.json'
    artifacts: 'e2e-tests/screenshots/**/*.png'
```

## Complete Workflow Examples

### Playwright Tests

```yaml title=".github/workflows/playwright.yml"
name: Playwright Tests
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

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

    - name: Upload to Testream
      if: always()
      uses: testream/upload-action@v0.4.1
      with:
        apiKey: ${{ secrets.TESTREAM_API_KEY }}
        ctrfPath: 'ctrf-report.json'
        artifacts: 'test-results/**/*.{png,webm,zip}'
```

### .NET Tests

```yaml title=".github/workflows/dotnet.yml"
name: .NET Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4

    - name: Setup .NET
      uses: actions/setup-dotnet@v4
      with:
        dotnet-version: '8.0.x'

    - name: Restore dependencies
      run: dotnet restore

    - name: Build
      run: dotnet build --no-restore

    - name: Run tests
      run: dotnet test --no-build --logger "trx;LogFileName=TestResults.trx"

    - name: Convert and Upload to Testream
      if: always()
      run: npx @testream/dotnet-reporter --file TestResults/TestResults.trx --apiKey ${{ secrets.TESTREAM_API_KEY }}
```

### Jest Tests

```yaml title=".github/workflows/jest.yml"
name: Jest Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4

    - uses: actions/setup-node@v4
      with:
        node-version: 20

    - name: Install dependencies
      run: npm ci

    - name: Run tests
      run: npm test -- --json --outputFile=jest-results.json

    - name: Upload to Testream
      if: always()
      uses: testream/upload-action@v0.4.1
      with:
        apiKey: ${{ secrets.TESTREAM_API_KEY }}
        ctrfPath: 'ctrf-report.json'
```

### Matrix Strategy (Multiple Node Versions)

```yaml title=".github/workflows/matrix.yml"
name: Test Matrix
on: [push, pull_request]

jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [18, 20, 22]
    steps:
    - uses: actions/checkout@v4

    - uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install dependencies
      run: npm ci

    - name: Run tests
      run: npm test

    - name: Upload to Testream
      if: always()
      uses: testream/upload-action@v0.4.1
      with:
        apiKey: ${{ secrets.TESTREAM_API_KEY }}
        ctrfPath: 'ctrf-report.json'
```

## CLI Tool

The action package also includes a standalone CLI tool.

### Installation

```bash
npm install -g @testream/upload-action
```

### Usage

```bash
# Basic upload
testream-upload --apiKey $TESTREAM_API_KEY

# Custom CTRF path
testream-upload --apiKey $TESTREAM_API_KEY --ctrfPath build/report.json

# Custom API URL
testream-upload \
  --apiKey $TESTREAM_API_KEY \
  --apiUrl https://custom-api.example.com

# With artifacts
testream-upload \
  --apiKey $TESTREAM_API_KEY \
  --artifacts "test-results/**/*.png"
```

### CLI Options

| Option | Required | Description |
|--------|----------|-------------|
| `--apiKey` | Yes | Testream API key |
| `--apiUrl` | No | Override API endpoint |
| `--ctrfPath` | No | Path to CTRF file (default: `ctrf-report.json`) |
| `--artifacts` | No | Glob pattern for artifacts |

## Troubleshooting

### Action fails with "API key not found"

**Check:**
- Secret is named `TESTREAM_API_KEY` (exact case)
- Secret is added to the correct repository
- Secret syntax in workflow: `${{ secrets.TESTREAM_API_KEY }}`

### CTRF file not found

```
Error: CTRF report not found at path: ctrf-report.json
```

**Solutions:**
- Verify the test step actually generates a CTRF file
- Check the `ctrfPath` matches your actual file location
- Use `ls -la` step before upload to list files:
  ```yaml
  - name: List files
    run: ls -la
  ```

### Upload succeeds but no artifacts

**Check:**
- Artifacts glob pattern matches your files
- Files exist in the expected location
- File extensions are included in the glob pattern

### Permission denied errors

```
Error: Permission denied
```

**Solution:**
Add permissions to the workflow:

```yaml
permissions:
  contents: read
```

## Best Practices

### Always Upload (Even on Failure)

Use `if: always()` to upload results even when tests fail:

```yaml
- name: Upload to Testream
  if: always()
  uses: testream/upload-action@v0.4.1
  with:
    apiKey: ${{ secrets.TESTREAM_API_KEY }}
```

### Separate Test and Upload Steps

Keep test execution separate from upload:

```yaml
- name: Run tests
  run: npm test

- name: Upload results
  if: always()
  uses: testream/upload-action@v0.4.1
  with:
    apiKey: ${{ secrets.TESTREAM_API_KEY }}
```

### Use Branch Protection

Protect sensitive branches (main, production):

- Require status checks to pass
- Require pull request reviews
- Don't allow force pushes

### Rotate API Keys Regularly

- Generate new API keys periodically
- Update GitHub secrets
- Delete old keys from Testream dashboard

## NPM Package

- **Package:** [@testream/upload-action](https://www.npmjs.com/package/@testream/upload-action)
- **Version:** 0.4.1
- **Marketplace:** [GitHub Actions Marketplace](https://github.com/marketplace/actions/testream-upload-action)
- **Repository:** [GitHub](https://github.com/hasanalituran/jira-test-manager)

## What's Next?

- Learn about [Playwright Reporter](../reporters/playwright)
- Learn about [.NET Reporter](../reporters/dotnet)
- Set up [Jira Integration](../jira-integration/installation)
