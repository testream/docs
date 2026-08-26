---
sidebar_position: 2
title: Quick Start
description: Publish your first automated test run into Jira in about five minutes with your existing framework, a Testream reporter path, and a Testream API key.
keywords:
  - quick start jira test reporting
  - first automated test run jira
  - testream quick start
  - send test results to jira
---

# Quick Start

Publish your first automated test run into Jira in about five minutes. By the end, you should see a real run with status, framework metadata, branch or CI context, and available failure evidence inside your Jira project.

If you are still evaluating the product path rather than the exact setup flow, start with [Jira test reporting](https://testream.app/jira-test-reporting) or [CI/CD test results in Jira](https://testream.app/ci-test-results-jira).

These steps work for every supported framework. Use the reporter guide for your stack when you need framework-specific configuration, or use the [Rovo Setup Agent](../features/rovo-setup-agent) when you want guided setup in Jira.

## Choose your starting point

| Your situation | Recommended path |
| --- | --- |
| You know your framework | Choose its [reporter guide](./installation#reporters). |
| You have CTRF or JUnit output already | Use the [CLI Reporter](../reporters/cli). |
| You are unsure about the reporter or CI configuration | Use the [Rovo Setup Agent](../features/rovo-setup-agent). |

## Before You Start

You need:

- [Testream for Jira installed](./installation) in your Jira workspace.
- A codebase with automated tests.
- Permission to create a Testream project or access an existing project API key.

## 1. Create or Select a Testream Project

1. Sign up at [testream.app](https://testream.app)
2. Open **Dashboard → [Projects](https://testream.app/projects)**
   ![Testream projects page showing available projects and where to create or open a project for API key access](/img/product/testream-dashboard-overview.png)
3. Create a project or open an existing one.
4. Copy the API key.

Keep this key secret. It is shown once, and you can generate a new key later if needed.

## 2. Choose Your Reporter

Open the [reporter table](./installation#reporters), choose the guide for your stack, and add the minimal configuration. If your tool already produces CTRF or another report format, use the [CLI Reporter](../reporters/cli).

## 3. Set `TESTREAM_API_KEY`

Set your Testream API key locally for the first proof, or store it in your CI secret manager.

**Locally** - add to a `.env` file in your project root, but do not commit it:

```
TESTREAM_API_KEY=your_api_key_here
```

**In CI (GitHub Actions)** - add `TESTREAM_API_KEY` as a repository secret (**Settings → Secrets → Actions → New repository secret**), then reference it in your workflow:

```yaml
env:
  TESTREAM_API_KEY: ${{ secrets.TESTREAM_API_KEY }}
```

## 4. Run Your Tests

Run the same test command your team already uses. The reporter uploads results to Testream when `TESTREAM_API_KEY` is present.

Examples:

```bash
npx playwright test
```

```bash
npm test
```

```bash
dotnet test
```

## 5. Confirm the Run in Jira

Open your Jira project where Testream is installed and check **Test Runs**.

![Jira Test Runs view showing imported automated runs with status, pass rate, and run metadata](/img/product/testream-test-runs.png)

A successful first proof should show:

- Run status and pass rate
- Failed tests, if any
- Framework and run metadata
- Branch, commit, or CI context when provided
- Artifacts such as screenshots, traces, videos, or logs when your reporter uploads them

If no run appears, check that `TESTREAM_API_KEY` is available to the test process and that the reporter is configured for your framework.

## Optional Paths

### Let Rovo guide setup

If you want help choosing the right reporter or shaping your CI workflow, open **Testream → Settings → Get Started with Rovo** in Jira. The **Testream Setup Agent** can recommend a reporter, sample project, CI snippet, and first-run checklist.

→ [Use AI-assisted setup](./ai-assisted-setup)

### Add BDD Specs after runs are flowing

After your first test runs are flowing into Testream, you can add **Testream BDD Specs** to Jira issues. Rovo can draft or improve Gherkin scenarios and assess them against the test evidence Testream captures from CI.

→ [Learn about BDD Specs](../features/bdd-gherkin-specs)

### Build reusable BDD workflows after the first run

If your team wants reusable behavior coverage beyond one Jira issue, the next step is usually:

1. Create behaviors in [BDD Library](../features/bdd-library)
2. Reuse them across issues
3. Build [Test Cycles](../features/test-cycles) for manual execution
4. Review [Release Visibility](../features/release-visibility) for linked evidence and gaps before the release review

For the broader product overview first, see [BDD Jira integration](https://testream.app/bdd-jira-integration).

## What's Next?

- [Reporter installation](./installation#reporters) - choose the setup guide for your stack
- [Jira Integration](../jira-integration/overview) - surface test results directly in Jira
- [BDD Library](../features/bdd-library) - manage reusable behaviors for Jira work and releases
- [Test Cycles](../features/test-cycles) - execute manual coverage from reusable behaviors
- [Test Run Summaries in Jira Issues](../features/test-run-summaries-in-jira-issues) - see issue-level run context
- [CI/CD test results in Jira](https://testream.app/ci-test-results-jira) - understand the higher-level product path
- [Jira release test management](https://testream.app/jira-release-test-management) - see how release readiness stays tied to automated evidence
