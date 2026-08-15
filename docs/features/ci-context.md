---
sidebar_position: 3
title: CI Context and PR Comparisons
description: Attach CI context to Testream runs and compare pull-request test changes with the correct trunk baseline.
---

# CI Context and Pull-Request Comparisons

Every Testream reporter and the CLI add available branch, commit, repository, and build details to a test run. This keeps your CI evidence connected to the code and pipeline that produced it.

For pull requests, Testream also uses the branch's merge base when it is available. That lets Testream compare the run with the matching `main` or `master` baseline rather than an unrelated newer run.

## GitHub Actions setup

Keep the checkout history available in pull-request workflows:

```yaml title=".github/workflows/tests.yml"
- uses: actions/checkout@v4
  with:
    fetch-depth: 0
```

Testream reads the CI context supplied by supported providers, including GitHub Actions, GitLab CI, Azure Pipelines, Bitbucket Pipelines, CircleCI, and Jenkins. It never fetches additional Git history itself.

## When a merge base is unavailable

Your upload is not blocked. Testream uses the best available earlier trunk run based on when the tests executed. If no suitable baseline exists yet, the run remains available and Testream shows that a comparison baseline is not available.

This means shallow checkouts, non-pull-request runs, and older runs continue to work normally; they may simply have less precise pull-request comparison context.

## Advanced CI setup

If your CI system already knows the exact merge-base commit, set `TESTREAM_MERGE_BASE_SHA` in the environment for the test or upload step. This is optional—GitLab merge-request metadata and supported provider context are detected automatically.

```bash
TESTREAM_MERGE_BASE_SHA="$BASE_SHA" npx @testream/cli \
  --report-path ctrf/ctrf-report.json \
  --test-tool playwright \
  --api-key "$TESTREAM_API_KEY"
```

For custom CI systems, set `TESTREAM_BASE_BRANCH` when the target branch already exists in the checkout.

→ [View test-suite changes](./test-suite-changes)
