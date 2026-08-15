---
sidebar_position: 2
title: '.NET Reporter'
description: 'Send xUnit, NUnit, MSTest, and TRX-based test results from CI/CD into Jira with the Testream .NET Reporter.'
keywords:
  - dotnet jira reporter
  - xunit jira reporting
  - nunit jira reporting
  - mstest jira reporting
  - trx jira reporting
---

# .NET Reporter

Use the Testream .NET Reporter to send xUnit, NUnit, MSTest, and TRX-based test results from CI/CD into Testream and Jira.

Looking for the higher-level product fit first? Read the website page for [.NET Jira integration](https://testream.app/dotnet-jira-integration).

For CI context and pull-request comparison setup, see [CI context and pull-request comparisons](../getting-started/ci-context).

## Installation

```bash
# Use with npx (recommended)
npx @testream/dotnet-reporter --help

# Or install globally
npm install -g @testream/dotnet-reporter
```

## Quick Start

```bash
npx @testream/dotnet-reporter -k $TESTREAM_API_KEY
```

This single command will:

1. Run `dotnet test`
2. Convert the results automatically
3. Upload to Testream (project key inferred from API key)

## CLI Options

| Option                     | Type      | Default     | Description                                         |
| -------------------------- | --------- | ----------- | --------------------------------------------------- |
| `-k, --api-key`            | `string`  | -           | **Required** API key (unless `--no-upload` is used) |
| `--project <path>`         | `string`  | current dir | Path to .NET project or solution                    |
| `--trx-path <path>`        | `string`  | -           | Use existing TRX file(s) instead of running tests   |
| `--branch <name>`          | `string`  | auto (CI)   | Git branch name                                     |
| `--commit-sha <sha>`       | `string`  | auto (CI)   | Git commit SHA                                      |
| `--repository-url <url>`   | `string`  | auto (CI)   | Git repository URL                                  |
| `--build-name <name>`      | `string`  | -           | Build name                                          |
| `--build-number <num>`     | `string`  | auto (CI)   | Build number                                        |
| `--build-url <url>`        | `string`  | auto (CI)   | Build URL                                           |
| `--test-environment <env>` | `string`  | -           | Test environment (e.g., `ci`, `staging`)            |
| `--app-name <name>`        | `string`  | -           | Application name                                    |
| `--app-version <ver>`      | `string`  | -           | Application version                                 |
| `--test-type <type>`       | `string`  | -           | Test type (e.g., `unit`, `integration`)             |
| `--no-upload`              | `boolean` | `false`     | Skip uploading (validate + summarize only)          |
| `--fail-on-error`          | `boolean` | `false`     | Exit with non-zero code if upload fails             |
| `-- <args>`                | -         | -           | Additional arguments passed to `dotnet test`        |

## Examples

### Run tests and upload

```bash
npx @testream/dotnet-reporter -k $TESTREAM_API_KEY
```

### Use a specific project or solution

```bash
npx @testream/dotnet-reporter -k $TESTREAM_API_KEY --project ./MySolution.sln
```

### Pass extra `dotnet test` arguments

```bash
npx @testream/dotnet-reporter -k $TESTREAM_API_KEY -- --filter "Category=Unit"
```

### Use existing TRX files

```bash
npx @testream/dotnet-reporter -k $TESTREAM_API_KEY --trx-path TestResults/*.trx
```

## Full Configuration Example

```bash
npx @testream/dotnet-reporter \
  -k $TESTREAM_API_KEY \
  --project ./MySolution.sln \
  --build-name $GITHUB_WORKFLOW \
  --test-environment ci \
  --app-name "My App" \
  --app-version 1.0.0 \
  --test-type unit \
  --fail-on-error
```

## GitHub Actions Example

```yaml title=".github/workflows/dotnet.yml"
name: .NET Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup .NET
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: "8.0.x"

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 24

      - name: Run tests and upload
        run: |
          npx @testream/dotnet-reporter \
            -k ${{ secrets.TESTREAM_API_KEY }} \
            --project ./MySolution.sln \
            --build-name "${{ github.workflow }}" \
            --test-environment ci \
            --app-name "${{ github.event.repository.name }}" \
            --app-version "${{ github.sha }}" \
            --test-type unit \
            --fail-on-error
```

## Supported Test Frameworks

- xUnit
- NUnit
- MSTest
- TRX (generic)

## Sample Project

The **[testream/dotnet-jira-reporter](https://github.com/testream/dotnet-jira-reporter)** repository is a complete working example of a .NET project integrated with Testream. It includes example tests, full reporter configuration, and a ready-to-use GitHub Actions workflow.

## NPM Package

- **Package:** [@testream/dotnet-reporter](https://www.npmjs.com/package/@testream/dotnet-reporter)
- **Org:** [testream packages](https://www.npmjs.com/org/testream)

## What's Next?

- Learn about the [Cypress Reporter](./cypress)
- Learn about the [Jest Reporter](./jest)
- Learn about the [Pytest Reporter](./pytest)
- Learn about the [Playwright Reporter](./playwright)
- Learn about the [WebdriverIO Reporter](./webdriverio)
- Set up [CLI Reporter](./cli)
- View results in [Jira](../jira-integration/usage)
