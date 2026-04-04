---
sidebar_position: 7
---

# JUnit Reporter

The Testream JUnit Reporter converts JUnit XML into a CTRF report and uploads the results to Testream.

## Installation

```bash
# Use with npx (recommended)
npx @testream/junit-reporter --help

# Or install globally
npm install -g @testream/junit-reporter
```

## Quick Start

Convert and upload using the default JUnit XML path:

```bash
npx @testream/junit-reporter \
  -k $TESTREAM_API_KEY
```

Convert only (skip upload) with a custom JUnit path:

```bash
npx @testream/junit-reporter \
  --junit-path "./reports/**/*.xml" \
  --no-upload
```

## Defaults

- **JUnit input path:** `target/surefire-reports/TEST-*.xml`
- **CTRF output:** `ctrf/ctrf-report.json`

## CLI Options

| Option                         | Type      | Default                              | Description                                    |
| ------------------------------ | --------- | ------------------------------------ | ---------------------------------------------- |
| `-k, --api-key <key>`          | `string`  | -                                    | **Required** Testream API key                  |
| `-j, --junit-path <path/glob>` | `string`  | `target/surefire-reports/TEST-*.xml` | Path or glob to JUnit XML file(s)              |
| `--output-dir <dir>`           | `string`  | `ctrf`                               | Output directory for CTRF report               |
| `--output-file <file>`         | `string`  | `ctrf-report.json`                   | CTRF file name                                 |
| `--branch <name>`              | `string`  | auto (CI)                            | Git branch name                                |
| `--commit-sha <sha>`           | `string`  | auto (CI)                            | Git commit SHA                                 |
| `--repository-url <url>`       | `string`  | auto (CI)                            | Git repository URL                             |
| `--build-name <name>`          | `string`  | -                                    | Build name/identifier                          |
| `--build-number <num>`         | `string`  | auto (CI)                            | Build number                                   |
| `--build-url <url>`            | `string`  | auto (CI)                            | Build URL                                      |
| `--test-environment <env>`     | `string`  | -                                    | Test environment (e.g., `ci`, `staging`)       |
| `--app-name <name>`            | `string`  | -                                    | Application name under test                    |
| `--app-version <ver>`          | `string`  | -                                    | Application version under test                 |
| `--test-type <type>`           | `string`  | -                                    | Test type (e.g., `unit`, `integration`, `e2e`) |
| `--no-upload`                  | `boolean` | `false`                              | Skip uploading (convert + write report only)   |
| `--fail-on-error`              | `boolean` | `false`                              | Exit with non-zero code if upload fails        |

## Full Configuration Example

```bash
npx @testream/junit-reporter \
  -k $TESTREAM_API_KEY \
  --junit-path "./target/surefire-reports/TEST-*.xml" \
  --output-dir ctrf \
  --output-file ctrf-report.json \
  --build-name "JUnit Tests" \
  --test-environment ci \
  --app-name "my-java-service" \
  --app-version 1.0.0 \
  --test-type unit \
  --fail-on-error
```

## CI Example (GitHub Actions)

```yaml title=".github/workflows/tests.yml"
- uses: actions/setup-java@v4
  with:
    distribution: temurin
    java-version: "17"

- uses: actions/setup-node@v4
  with:
    node-version: "20"

- run: npm install -g @testream/junit-reporter

- run: mvn -B test -Dmaven.test.failure.ignore=true

- run: |
    testream-junit \
      --api-key "${{ secrets.TESTREAM_API_KEY }}" \
      --fail-on-error
```

## Sample Project

The **[testream/junit-jira-reporter](https://github.com/testream/junit-jira-reporter)** repository is a complete working example of a JUnit project integrated with Testream. It includes example tests, full reporter configuration, and a ready-to-use GitHub Actions workflow.

## NPM Package

- **Package:** [@testream/junit-reporter](https://www.npmjs.com/package/@testream/junit-reporter)
- **Org:** [testream packages](https://www.npmjs.com/org/testream)

## What's Next?

- Learn about the [Vitest Reporter](./vitest)
- Learn about the [Jest Reporter](./jest)
- Learn about the [Pytest Reporter](./pytest)
- Upload existing CTRF reports with the [CLI Reporter](./cli)
