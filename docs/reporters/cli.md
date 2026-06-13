---
sidebar_position: 6
title: 'CLI Reporter'
description: 'Upload CTRF test reports to Testream and Jira from GitHub Actions, CircleCI, Bitbucket Pipelines, Jenkins, GitLab, or any custom CI.'
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

Use the action for the easiest setup in GitHub Actions.

```yaml title=".github/workflows/tests.yml"
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm ci
      - run: npx playwright test

      - name: Upload to Testream
        if: always()
        uses: testream/cli@latest
        with:
          report-path: ctrf/ctrf-report.json
          api-key: ${{ secrets.TESTREAM_API_KEY }}
```

### Action inputs

| Option             | Type      | Default | Description                                                                   |
| ------------------ | --------- | ------- | ----------------------------------------------------------------------------- |
| `report-path`      | `string`  | -       | **Required** Path to CTRF report JSON file                                    |
| `api-key`          | `string`  | -       | **Required** Testream API key (\*required unless `no-upload` is true)         |
| `test-tool`        | `string`  | -       | **Required** Test tool name (e.g., `playwright`, `jest`, `cypress`, `dotnet`) |
| `branch`           | `string`  | auto    | Git branch name                                                               |
| `commit-sha`       | `string`  | auto    | Git commit SHA                                                                |
| `repository-url`   | `string`  | auto    | Git repository URL                                                            |
| `build-name`       | `string`  | -       | Build name/identifier                                                         |
| `build-number`     | `string`  | auto    | Build number                                                                  |
| `build-url`        | `string`  | auto    | Build URL                                                                     |
| `test-environment` | `string`  | -       | Environment name (e.g., `ci`, `staging`)                                      |
| `app-name`         | `string`  | -       | Application name                                                              |
| `app-version`      | `string`  | -       | Application version                                                           |
| `test-type`        | `string`  | -       | Test type (e.g., `unit`, `e2e`)                                               |
| `no-upload`        | `boolean` | `false` | Skip upload (validate + summarize only)                                       |
| `fail-on-error`    | `boolean` | `true`  | Fail the action if upload fails                                               |

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
              --branch $CIRCLE_BRANCH \
              --commit-sha $CIRCLE_SHA1 \
              --repository-url $CIRCLE_REPOSITORY_URL \
              --build-number $CIRCLE_BUILD_NUM \
              --build-url $CIRCLE_BUILD_URL \
              --test-environment ci
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
              --branch $BITBUCKET_BRANCH \
              --commit-sha $BITBUCKET_COMMIT \
              --repository-url $BITBUCKET_GIT_HTTP_ORIGIN \
              --build-number $BITBUCKET_BUILD_NUMBER \
              --build-url "https://bitbucket.org/${BITBUCKET_REPO_FULL_NAME}/pipelines/results/${BITBUCKET_BUILD_NUMBER}" \
              --test-environment ci
```

## Other CI providers

Use the same CLI options in GitLab, Jenkins, Azure Pipelines, or any custom runner. If you already have a CTRF report, the CLI is all you need.

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
