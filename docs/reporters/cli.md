---
sidebar_position: 6
title: "CLI Reporter"
description: "Upload CTRF test reports from any CI provider to Testream and Jira — branch, commit, build, environment, artifact context, and searchable run history included."
keywords:
  - ctrf upload jira
  - cli test reporting jira
  - upload test results to jira from ci
---

# CLI Reporter

Upload CTRF test reports to Testream from any CI provider with the CLI, then review the results in Jira with branch, commit, build, environment, and artifact context.

If you are evaluating the product path first, start with the website page for [CI/CD test results in Jira](https://testream.app/ci-test-results-jira).

## What you need

- **Testream API key** (from testream.app → Settings → API Keys)
- A **CTRF report** that you want to upload. Check out https://ctrf.io/ for generating CTRF reports from your test runs.

## GitHub Actions

Run the CLI after your test command to upload the CTRF report from GitHub Actions.

```yaml title=".github/workflows/tests.yml"
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 24

      - run: npm ci
      - run: npx playwright test

      - name: Upload to Testream
        if: always()
        env:
          TESTREAM_API_KEY: ${{ secrets.TESTREAM_API_KEY }}
        run: |
          npx @testream/cli \
            --report-path ctrf/ctrf-report.json \
            --api-key "$TESTREAM_API_KEY" \
            --test-tool playwright \
            --build-name "${{ github.workflow }}" \
            --test-environment ci \
            --app-name "${{ github.event.repository.name }}" \
            --app-version "${{ github.sha }}" \
            --test-type e2e \
            --fail-on-error
```

`fetch-depth: 0` lets Testream compare pull-request test changes with the correct baseline. The upload still works when that history is unavailable.

## CI context and pull-request comparisons

The CLI automatically adds available branch, commit, repository, and build details to each run. For pull requests, Testream can use the merge base to compare the run with the right trunk baseline. See [CI context and pull-request comparisons](../features/ci-context) for the one-time CI setup and fallback behavior.

## CLI (Any CI provider)

Use the CLI in CircleCI, Bitbucket Pipelines, GitLab, Jenkins, Azure Pipelines, or local scripts.

```bash
npx @testream/cli \
  --report-path ctrf/ctrf-report.json \
  --test-tool playwright \
  --api-key $TESTREAM_API_KEY
```

### CLI options

| Option                       | Type      | Default   | Description                                                                   |
| ---------------------------- | --------- | --------- | ----------------------------------------------------------------------------- |
| `-r, --report-path <path>`   | `string`  | -         | **Required** Path to CTRF report JSON file                                    |
| `-k, --api-key <key>`        | `string`  | -         | **Required** API key for authentication                                       |
| `--test-tool <name>`         | `string`  | -         | **Required** Test tool name (e.g., `playwright`, `jest`, `cypress`, `dotnet`) |
| `-b, --branch <name>`        | `string`  | auto (CI) | Git branch name                                                               |
| `-c, --commit-sha <sha>`     | `string`  | auto (CI) | Git commit SHA                                                                |
| `-u, --repository-url <url>` | `string`  | auto (CI) | Git repository URL                                                            |
| `--build-name <name>`        | `string`  | -         | Build name/identifier                                                         |
| `--build-number <num>`       | `string`  | auto (CI) | Build number                                                                  |
| `--build-url <url>`          | `string`  | auto (CI) | Build URL                                                                     |
| `--test-environment <env>`   | `string`  | -         | Test environment (e.g., `ci`, `staging`)                                      |
| `--app-name <name>`          | `string`  | -         | Application name                                                              |
| `--app-version <ver>`        | `string`  | -         | Application version                                                           |
| `--test-type <type>`         | `string`  | -         | Test type (e.g., `unit`, `e2e`)                                               |
| `--no-upload`                | `boolean` | `false`   | Skip uploading (validate + summarize only)                                    |
| `--fail-on-error`            | `boolean` | `false`   | Exit with non-zero code if upload fails                                       |

## CircleCI example

```yaml title=".circleci/config.yml"
version: 2.1

jobs:
  test:
    docker:
      - image: mcr.microsoft.com/playwright:latest
    steps:
      - checkout
      - run: npm ci
      - run: npx playwright test
      - run:
          name: Upload to Testream
          command: |
            npx @testream/cli \
              --report-path ctrf/ctrf-report.json \
              --test-tool playwright \
              --api-key $TESTREAM_API_KEY \
              --build-name "$CIRCLE_JOB" \
              --test-environment ci \
              --app-name "$CIRCLE_PROJECT_REPONAME" \
              --app-version "$CIRCLE_SHA1" \
              --test-type e2e \
              --fail-on-error
```

## Bitbucket Pipelines example

```yaml title="bitbucket-pipelines.yml"
image: mcr.microsoft.com/playwright:latest

pipelines:
  default:
    - step:
        name: Tests
        script:
          - npm ci
          - npx playwright test
          - |
            npx @testream/cli \
              --report-path ctrf/ctrf-report.json \
              --test-tool playwright \
              --api-key $TESTREAM_API_KEY \
              --build-name "Playwright Tests" \
              --test-environment ci \
              --app-name "$BITBUCKET_REPO_SLUG" \
              --app-version "$BITBUCKET_COMMIT" \
              --test-type e2e \
              --fail-on-error
```

## Other CI providers

Use the same CLI options in GitLab, Jenkins, Azure Pipelines, or any custom runner. The CLI detects available CI context automatically; pass explicit branch, commit, repository, or build options only when you need to override them. If you already have a CTRF report, the CLI is all you need.

## Sample Project

The **[testream/ctrf-jira-reporter](https://github.com/testream/ctrf-jira-reporter)** repository is a complete working example of using the CTRF CLI to upload test results to Testream. It includes example tests, CLI configuration, and a ready-to-use GitHub Actions workflow.

## NPM package

- **Package:** [@testream/cli](https://www.npmjs.com/package/@testream/cli)
- **Org:** [testream packages](https://www.npmjs.com/org/testream)

## What's Next?

- Learn about the [Playwright Reporter](./playwright)
- Learn about the [.NET Reporter](./dotnet)
- Learn about the [Pytest Reporter](./pytest)
- Set up [Testream for Jira](../getting-started/installation)
