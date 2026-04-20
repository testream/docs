---
sidebar_position: 10
---

# Pytest Reporter

The Testream Pytest Reporter runs your Pytest suite (or ingests existing JUnit XML), converts results to CTRF, and uploads them to Testream.

## Installation

```bash
# Use with npx (recommended)
npx @testream/pytest-reporter --help

# Or install globally
npm install -g @testream/pytest-reporter
```

## Quick Start

```bash
npx @testream/pytest-reporter -k "$TESTREAM_API_KEY"
```

This single command will:

1. Run `pytest`
2. Write JUnit XML to `junit/pytest-junit.xml`
3. Convert to CTRF and upload to Testream

For a full end-to-end repository example (project layout, intentional failures, and CI setup), see the **Sample Project** section below.

## CLI Options

| Option                     | Type      | Default                             | Description                                                  |
| -------------------------- | --------- | ----------------------------------- | ------------------------------------------------------------ |
| `-k, --api-key <key>`      | `string`  | -                                   | **Required** Testream API key (unless `--no-upload` is used) |
| `--project <path>`         | `string`  | current dir                         | Path to Pytest project directory                             |
| `--python <path>`          | `string`  | auto (`python`, fallback `python3`) | Python executable used to run tests                          |
| `--junit-path <path/glob>` | `string`  | -                                   | Ingest existing JUnit XML and skip running Pytest            |
| `--branch <name>`          | `string`  | auto (CI)                           | Git branch name                                              |
| `--commit-sha <sha>`       | `string`  | auto (CI)                           | Git commit SHA                                               |
| `--repository-url <url>`   | `string`  | auto (CI)                           | Git repository URL                                           |
| `--build-name <name>`      | `string`  | -                                   | Build name/identifier                                        |
| `--build-number <num>`     | `string`  | auto (CI)                           | Build number                                                 |
| `--build-url <url>`        | `string`  | auto (CI)                           | Build URL                                                    |
| `--test-environment <env>` | `string`  | -                                   | Test environment (e.g., `ci`, `staging`)                     |
| `--app-name <name>`        | `string`  | -                                   | Application name                                             |
| `--app-version <ver>`      | `string`  | -                                   | Application version                                          |
| `--test-type <type>`       | `string`  | -                                   | Test type (e.g., `unit`, `integration`, `e2e`)               |
| `--no-upload`              | `boolean` | `false`                             | Skip uploading (convert + summarize only)                    |
| `--fail-on-error`          | `boolean` | `false`                             | Exit with non-zero code if upload fails                      |
| `-- <args>`                | -         | -                                   | Additional arguments passed directly to `pytest`             |

## Examples

### Run Pytest and upload

```bash
npx @testream/pytest-reporter -k $TESTREAM_API_KEY
```

### Pass additional Pytest arguments

```bash
npx @testream/pytest-reporter \
  -k $TESTREAM_API_KEY \
  -- -k "smoke and not slow" -m smoke -q
```

### Use a specific project path

```bash
npx @testream/pytest-reporter \
  -k $TESTREAM_API_KEY \
  --project ./services/api
```

### Ingest existing JUnit XML (skip running tests)

```bash
npx @testream/pytest-reporter \
  -k $TESTREAM_API_KEY \
  --junit-path "./reports/**/*.xml"
```

### Convert only (no upload)

```bash
npx @testream/pytest-reporter \
  --junit-path "./reports/**/*.xml" \
  --no-upload
```

## Full Configuration Example

```bash
npx @testream/pytest-reporter \
  -k $TESTREAM_API_KEY \
  --project ./services/api \
  --build-name "Pytest Suite" \
  --test-environment ci \
  --app-name my-python-service \
  --app-version 1.0.0 \
  --test-type unit \
  --fail-on-error
```

## GitHub Actions Example

```yaml title=".github/workflows/pytest.yml"
name: Example Pytest CI Workflow with Testream Reporter for Jira

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: pip

      - run: pip install -r requirements.txt

      - uses: actions/setup-node@v4
        with:
          node-version: lts/*

      - run: |
          npx @testream/pytest-reporter \
            -k "$TESTREAM_API_KEY" \
            --test-environment ci \
            --app-name pytest-jira-reporter-example \
            --app-version "${{ github.sha }}" \
            --test-type unit \
            --fail-on-error
        env:
          TESTREAM_API_KEY: ${{ secrets.TESTREAM_API_KEY }}
```

## Notes

- By default, the reporter writes JUnit output to `junit/pytest-junit.xml` before CTRF conversion.
- If Pytest exits with test failures, ingestion/upload still runs and the process exits with Pytest's failure code.
- Use `--junit-path` when you already have JUnit XML and only want conversion + upload.

## Sample Project

The **[testream/pytest-jira-reporter](https://github.com/testream/pytest-jira-reporter)** repository is a complete working example of a Pytest project integrated with Testream. It includes:

- A Python-first project layout (`src/`, `tests/`, `requirements.txt`, `pytest.ini`)
- Intentionally failing tests to demonstrate Jira/Testream failure triage
- A ready-to-use GitHub Actions workflow that authenticates with `secrets.TESTREAM_API_KEY`

## NPM Package

- **Package:** [@testream/pytest-reporter](https://www.npmjs.com/package/@testream/pytest-reporter)
- **Org:** [testream packages](https://www.npmjs.com/org/testream)

## What's Next?

- Learn about the [JUnit Reporter](./junit)
- Learn about the [Vitest Reporter](./vitest)
- Upload existing CTRF reports with the [CLI Reporter](./cli)
- Set up [Jira Integration](../jira-integration/installation)
