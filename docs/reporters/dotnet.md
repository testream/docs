---
sidebar_position: 2
---

# .NET Reporter

The Testream .NET Reporter runs your tests (or reads existing TRX files), converts results to CTRF, and uploads them to Testream.

## Installation

```bash
# Use with npx (recommended)
npx @testream/dotnet-reporter --help

# Or install globally
npm install -g @testream/dotnet-reporter
```

## Quick Start

```bash
npx @testream/dotnet-reporter -p PROJ -k $TESTREAM_API_KEY
```

This single command will:
1. Run `dotnet test`
2. Generate a CTRF report
3. Upload to Testream

## CLI Options

| Option | Description |
| --- | --- |
| `-p, --project-key` | **Required** Jira project key |
| `-k, --api-key` | **Required** API key (unless `--no-upload` is used) |
| `--project <path>` | Path to .NET project or solution (defaults to current directory) |
| `--trx-path <path>` | Use existing TRX file(s) instead of running tests |
| `--test-tool <name>` | Override detected test framework (`xunit`, `nunit`, `mstest`) |
| `--branch <name>` | Git branch name (auto-detected in CI) |
| `--commit-sha <sha>` | Git commit SHA (auto-detected in CI) |
| `--repository-url <url>` | Git repository URL (auto-detected in CI) |
| `--build-name <name>` | Build name |
| `--build-number <num>` | Build number |
| `--build-url <url>` | Build URL |
| `--test-environment <env>` | Test environment (e.g., `ci`, `staging`) |
| `--app-name <name>` | Application name |
| `--app-version <ver>` | Application version |
| `--test-type <type>` | Test type (e.g., `unit`, `integration`) |
| `--no-upload` | Skip uploading (validate + summarize only) |
| `--fail-on-error` | Exit with non-zero code if upload fails |
| `-- <args>` | Additional arguments passed to `dotnet test` |

## Examples

### Run tests and upload

```bash
npx @testream/dotnet-reporter -p PROJ -k $TESTREAM_API_KEY
```

### Use a specific project or solution

```bash
npx @testream/dotnet-reporter -p PROJ -k $TESTREAM_API_KEY --project ./MySolution.sln
```

### Pass extra `dotnet test` arguments

```bash
npx @testream/dotnet-reporter -p PROJ -k $TESTREAM_API_KEY -- --filter "Category=Unit"
```

### Use existing TRX files

```bash
npx @testream/dotnet-reporter -p PROJ -k $TESTREAM_API_KEY --trx-path TestResults/*.trx
```

### Add full metadata

```bash
npx @testream/dotnet-reporter \
  -p PROJ \
  -k $TESTREAM_API_KEY \
  --branch $GITHUB_REF_NAME \
  --commit-sha $GITHUB_SHA \
  --repository-url $GITHUB_SERVER_URL/$GITHUB_REPOSITORY \
  --build-name $GITHUB_WORKFLOW \
  --build-number $GITHUB_RUN_NUMBER \
  --build-url $GITHUB_SERVER_URL/$GITHUB_REPOSITORY/actions/runs/$GITHUB_RUN_ID \
  --test-environment ci \
  --app-name "My App" \
  --app-version 1.0.0 \
  --test-type unit
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

      - name: Setup .NET
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: '8.0.x'

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Run tests and upload
        run: |
          npx @testream/dotnet-reporter \
            -p ${{ secrets.TESTREAM_PROJECT_KEY }} \
            -k ${{ secrets.TESTREAM_API_KEY }} \
            --project ./MySolution.sln \
            --test-tool xunit \
            --test-environment ci \
            --app-name MyApp \
            --app-version 1.0.0 \
            --test-type unit \
            --fail-on-error
```

## Supported Test Frameworks

- xUnit
- NUnit
- MSTest
- TRX (generic)

## NPM Package

- **Package:** [@testream/dotnet-reporter](https://www.npmjs.com/package/@testream/dotnet-reporter)
- **Org:** [testream packages](https://www.npmjs.com/org/testream)

## What's Next?

- Learn about the [Playwright Reporter](./playwright)
- Set up [CI/CD integrations](../ci-integrations/setup)
- View results in [Jira](../jira-integration/usage)
