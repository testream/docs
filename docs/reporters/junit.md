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

| Option | Description | Default |
| --- | --- | --- |
| `-k, --api-key <key>` | Testream API key (*required unless `--no-upload` is used) | - |
| `-j, --junit-path <path/glob>` | Path or glob to JUnit XML file(s) | `target/surefire-reports/TEST-*.xml` |
| `--output-dir <dir>` | Output directory for CTRF report | `ctrf` |
| `--output-file <file>` | CTRF file name | `ctrf-report.json` |
| `--branch <name>` | Git branch name | auto (CI) |
| `--commit-sha <sha>` | Git commit SHA | auto (CI) |
| `--repository-url <url>` | Git repository URL | auto (CI) |
| `--build-name <name>` | Build name/identifier | auto (CI) |
| `--build-number <num>` | Build number | auto (CI) |
| `--build-url <url>` | Build URL | auto (CI) |
| `--test-environment <env>` | Test environment (e.g., `ci`, `staging`) | - |
| `--app-name <name>` | Application name under test | - |
| `--app-version <ver>` | Application version under test | - |
| `--test-type <type>` | Test type (e.g., `unit`, `integration`, `e2e`) | - |
| `--no-upload` | Skip uploading (convert + write report only) | `false` |
| `--fail-on-error` | Exit with non-zero code if upload fails | `false` |

## CI Example (GitHub Actions)

```yaml title=".github/workflows/tests.yml"
- uses: actions/setup-java@v4
  with:
    distribution: temurin
    java-version: '17'

- uses: actions/setup-node@v4
  with:
    node-version: '20'

- run: npm install -g @testream/junit-reporter

- run: mvn -B test -Dmaven.test.failure.ignore=true

- run: |
    testream-junit \
      --api-key "${{ secrets.TESTREAM_API_KEY }}" \
      --fail-on-error
```

## NPM Package

- **Package:** [@testream/junit-reporter](https://www.npmjs.com/package/@testream/junit-reporter)
- **Org:** [testream packages](https://www.npmjs.com/org/testream)

## What's Next?

- Learn about the [Vitest Reporter](./vitest)
- Learn about the [Jest Reporter](./jest)
- Upload existing CTRF reports with the [CLI Reporter](./cli)
