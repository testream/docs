---
sidebar_position: 11
title: 'Go Reporter'
description: 'Run Go tests, convert go test JSON to CTRF, and send Go test evidence from CI/CD into Testream and Jira.'
keywords:
  - go jira reporter
  - golang jira test reporting
  - go test ctrf
  - go ci test results jira
---

# Go Reporter

Use the Testream Go Reporter to run Go tests, convert the official `go test -json` stream to CTRF, enrich matching results with Go source evidence, and send the run to Testream and Jira.

If you are comparing Go-specific setup with the broader upload path, see [CI/CD test results in Jira](https://testream.app/ci-test-results-jira).

For branch, commit, build, and pull-request comparison context, see [CI context and pull-request comparisons](../features/ci-context).

## Prerequisites

- Go installed and available as `go` (or pass a custom executable with `--go`).
- A Go module with a `go.mod` file when you want module-aware source evidence.
- A Testream API key for uploading, stored locally or in your CI secret manager as `TESTREAM_API_KEY`.

## Installation

Install the reporter in the Go project that runs your tests:

```bash
npm install --save-dev @testream/go-reporter
```

The package exposes the `testream-go` command:

```bash
npx testream-go --help
```

For a CI runner that does not keep a project-local Node.js dependency, install it globally instead:

```bash
npm install --global @testream/go-reporter
```

## Quick Start

Run Go tests, generate `ctrf/ctrf-report.json`, and upload the result:

```bash
npx testream-go --api-key "$TESTREAM_API_KEY"
```

By default, the command runs:

```bash
go test -json ./...
```

The Go event stream is converted with the official [go-ctrf-json-reporter](https://github.com/ctrf-io/go-ctrf-json-reporter). If that executable is not already in `PATH`, the reporter falls back to the pinned `go run` command:

```bash
go run github.com/ctrf-io/go-ctrf-json-reporter/cmd/go-ctrf-json-reporter@v0.1.0
```

To install the pinned converter once and avoid resolving it during every run:

```bash
go install github.com/ctrf-io/go-ctrf-json-reporter/cmd/go-ctrf-json-reporter@v0.1.0
```

## Convert Without Uploading

Use `--no-upload` to generate and inspect a local CTRF report without an API key:

```bash
npx testream-go --no-upload
```

The command still runs Go tests and writes the report. This is useful for validating the conversion and source evidence locally before adding a CI secret.

## Use an Existing CTRF Report

Use `--ctrf-path` when another tool has already produced CTRF JSON. The Go test command is skipped. A file path or glob is accepted; matching files are normalized and merged in deterministic path order.

```bash
npx testream-go \
  --api-key "$TESTREAM_API_KEY" \
  --ctrf-path './reports/*.json'
```

Convert an existing report without uploading it:

```bash
npx testream-go \
  --ctrf-path ./reports/ctrf-report.json \
  --no-upload
```

## Pass Go Test Arguments

Arguments after `--` are passed unchanged to `go test`:

```bash
npx testream-go \
  --api-key "$TESTREAM_API_KEY" \
  -- --run TestCriticalPath
```

You can also select packages with `--go-packages`:

```bash
npx testream-go \
  --api-key "$TESTREAM_API_KEY" \
  --go-packages './internal/...'
```

## CLI Options

| Option                       | Type      | Default                         | Description                                                               |
| ---------------------------- | --------- | ------------------------------- | ------------------------------------------------------------------------- |
| `-k, --api-key <key>`        | `string`  | -                               | **Required** Testream API key unless `--no-upload` is used                |
| `--project <path>`           | `string`  | current directory               | Go project root                                                           |
| `--go <path>`                | `string`  | `go`                            | Go executable                                                             |
| `--go-reporter <path>`       | `string`  | auto-detected or `go run`      | `go-ctrf-json-reporter` executable or command                            |
| `--go-packages <selector>`   | `string`  | `./...`                         | Package selector passed to `go test`                                      |
| `--ctrf-path <path-or-glob>` | `string`  | -                               | Read existing CTRF JSON instead of running Go tests                       |
| `--output-dir <dir>`         | `string`  | `ctrf`                          | CTRF output directory                                                     |
| `--output-file <file>`       | `string`  | `ctrf-report.json`              | CTRF report filename                                                      |
| `--branch <name>`             | `string`  | auto (CI)                       | Git branch name                                                           |
| `--commit-sha <sha>`          | `string`  | auto (CI)                       | Git commit SHA                                                            |
| `--repository-url <url>`      | `string`  | auto (CI)                       | Git repository URL                                                        |
| `--build-name <name>`         | `string`  | -                               | Build name or identifier                                                  |
| `--build-number <number>`     | `string`  | auto (CI)                       | Build number                                                              |
| `--build-url <url>`           | `string`  | auto (CI)                       | CI build URL                                                              |
| `--test-environment <name>`   | `string`  | -                               | Test environment, such as `ci` or `staging`                               |
| `--app-name <name>`           | `string`  | -                               | Application under test                                                    |
| `--app-version <version>`     | `string`  | -                               | Application version                                                       |
| `--test-type <type>`          | `string`  | -                               | Test type, such as `unit` or `integration`                                |
| `--no-upload`                 | `boolean` | `false`                         | Generate or normalize CTRF without uploading                             |
| `--fail-on-error`             | `boolean` | `false`                         | Return a failure when the upload fails                                    |
| `-- <args>`                   | -         | -                               | Pass additional arguments unchanged to `go test`                          |

## Source Evidence

When the reporter can match a CTRF result to a Go source definition under the configured project/source root, it adds:

- Source file path
- Line number
- A bounded source snippet

The matcher recognizes `Test`, `Benchmark`, `Fuzz`, and `Example` functions, including receiver methods and nested test names. Absolute paths outside the project/source root are skipped rather than published.

## GitHub Actions

This workflow keeps full checkout history for pull-request comparisons, installs the reporter, and lets the reporter own the Go test and upload lifecycle:

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
          node-version: "24"

      - run: npm install --global @testream/go-reporter

      - name: Run Go tests and upload
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

The reporter automatically uses available branch, commit, repository, and build values from supported CI environments. Pass explicit metadata flags when you need to override the detected values.

## Results and Failure Behavior

- A Go test failure returns exit code `1`, but the CTRF report is still generated and uploaded when possible. The original non-zero Go exit code is then returned.
- Other Go execution failures stop the run before a successful ingestion.
- Upload failures are non-fatal by default. Add `--fail-on-error` when an upload failure must fail the command.
- `--no-upload` skips authentication and upload while still generating or normalizing the local CTRF report.

## NPM Package

- **Package:** [@testream/go-reporter](https://www.npmjs.com/package/@testream/go-reporter)
- **Source example:** [Go reporter example](https://github.com/hasanalituran/jira-test-manager/tree/main/examples/go-example)

## What's Next?

- Review [CI context and pull-request comparisons](../features/ci-context).
- Upload an already generated report with the [CLI Reporter](./cli).
- Follow the [Quick Start](../getting-started/quick-start) to confirm the first run in Jira.
