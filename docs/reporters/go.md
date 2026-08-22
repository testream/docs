---
sidebar_position: 12
title: 'Go Reporter'
description: 'Run Go tests from CI/CD and send CTRF results into Jira with the Testream Go Reporter, source evidence, CI metadata, and test-run history.'
keywords:
  - go jira reporter
  - golang test reporting jira
  - go test reporter
  - go ctrf reporter
---

# Go Reporter

Use the Testream Go Reporter to run Go tests, generate CTRF results, and send source evidence and CI context into Testream and Jira.

Looking for the higher-level product fit first? Read the website page for [CI/CD test results in Jira](https://testream.app/ci-test-results-jira).

For CI context and pull-request comparison setup, see [CI context and pull-request comparisons](../features/ci-context).

## Installation

Use the package with `npx`:

```bash
npx @testream/go-reporter --help
```

Or install the CLI globally:

```bash
npm install -g @testream/go-reporter
```

The reporter requires a Go project and a `go` executable available in the environment. It uses the official Go CTRF reporter when a local `go-ctrf-json-reporter` executable is not available.

## Quick Start

Run the default Go test package selector and upload the generated report:

```bash
npx @testream/go-reporter \
  --api-key "$TESTREAM_API_KEY"
```

The command runs `go test -json ./...`, converts the output to CTRF, adds source evidence when matching Go files are available, writes `ctrf/ctrf-report.json`, and uploads the completed run.

## CLI Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `-k, --api-key <key>` | `string` | - | **Required** API key unless `--no-upload` is used. |
| `--project <path>` | `string` | current directory | Path to the Go project root. |
| `--go <path>` | `string` | `go` | Go executable to run. |
| `--go-reporter <path>` | `string` | auto-detected | Local `go-ctrf-json-reporter` executable. |
| `--go-packages <selector>` | `string` | `./...` | Package selector passed to `go test`. |
| `--ctrf-path <path/glob>` | `string` | - | Ingest existing CTRF JSON files without running Go tests. |
| `--output-dir <dir>` | `string` | `ctrf` | Directory for the generated or merged CTRF report. |
| `--output-file <file>` | `string` | `ctrf-report.json` | CTRF report filename. |
| `--branch <name>` | `string` | auto from CI | Override the Git branch name. |
| `--commit-sha <sha>` | `string` | auto from CI | Override the Git commit SHA. |
| `--repository-url <url>` | `string` | auto from CI | Override the repository URL. |
| `--build-name <name>` | `string` | optional | Build name or identifier. |
| `--build-number <number>` | `string` | auto from CI | Build number. |
| `--build-url <url>` | `string` | auto from CI | CI pipeline URL. |
| `--test-environment <env>` | `string` | optional | Environment such as `ci`, `staging`, or `production`. |
| `--app-name <name>` | `string` | optional | Application name under test. |
| `--app-version <version>` | `string` | optional | Application version under test. |
| `--test-type <type>` | `string` | optional | Test type such as `unit`, `integration`, or `e2e`. |
| `--no-upload` | `boolean` | `false` | Generate and validate the CTRF report without uploading it. |
| `--fail-on-error` | `boolean` | `false` | Exit with a non-zero code when the upload fails. |
| `-- <args>` | - | - | Additional arguments passed to `go test`. |

Git and CI context are detected automatically when the command runs in a supported provider. Provide explicit values when the reporter runs outside CI or when you need to override detected metadata.

## Examples

### Run tests and upload

```bash
npx @testream/go-reporter \
  --api-key "$TESTREAM_API_KEY" \
  --build-name "Go Tests" \
  --test-environment ci \
  --app-name "my-go-service" \
  --app-version 1.0.0 \
  --test-type unit \
  --fail-on-error
```

### Generate a local report without upload

```bash
npx @testream/go-reporter \
  --no-upload \
  --output-dir artifacts \
  --output-file go-results.json
```

### Use an existing CTRF report

```bash
npx @testream/go-reporter \
  --ctrf-path ./ctrf/ctrf-report.json \
  --no-upload
```

### Run a specific project or package selector

```bash
npx @testream/go-reporter \
  --project ./services/api \
  --go-packages ./services/api/...
```

### Pass arguments to `go test`

```bash
npx @testream/go-reporter \
  --api-key "$TESTREAM_API_KEY" \
  -- --run TestCriticalPath
```

## Source Evidence and Test Failures

The Go Reporter enriches matching test results with Go source locations and bounded snippets inside the project root. The reporter uses the Go module path from `go.mod` when it matches test suites to source files.

Go test failures remain Go test failures after the report is generated and uploaded. The reporter continues conversion and upload for a test exit code of `1`, then returns that original non-zero code. The `--fail-on-error` option controls upload failures; it does not turn a failed Go test run into a passing command.

## GitHub Actions Example

```yaml title=".github/workflows/go-tests.yml"
name: Go Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-go@v5
        with:
          go-version: "1.24"

      - uses: actions/setup-node@v4
        with:
          node-version: 24

      - run: npm install -g @testream/go-reporter

      - name: Run Go tests and upload results
        env:
          TESTREAM_API_KEY: ${{ secrets.TESTREAM_API_KEY }}
        run: |
          testream-go \
            --api-key "$TESTREAM_API_KEY" \
            --build-name "${{ github.workflow }}" \
            --test-environment ci \
            --app-name "${{ github.event.repository.name }}" \
            --app-version "${{ github.sha }}" \
            --test-type unit \
            --fail-on-error
```

## NPM Package

- **Package:** [@testream/go-reporter](https://www.npmjs.com/package/@testream/go-reporter)
- **Organization:** [Testream packages](https://www.npmjs.com/org/testream)
- **Official converter:** [go-ctrf-json-reporter](https://github.com/ctrf-io/go-ctrf-json-reporter)

## What's Next?

- Learn about the [JUnit Reporter](./junit).
- Learn about the [CLI Reporter](./cli) for existing CTRF results from other tools.
- Review [CI context and pull-request comparisons](../features/ci-context).
