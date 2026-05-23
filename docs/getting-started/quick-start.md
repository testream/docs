---
sidebar_position: 2
---

# Quick Start

Get Testream up and running in minutes. These steps work for every supported framework.

## 1. Create an account and get your API key

1. Sign up at [testream.app](https://testream.app)
2. Go to **Dashboard → [Projects](https://testream.app/projects)**
   ![Example Jira Navigation Bar](/img/jira/Dashboard-Projects.png)
3. Click **+ New Project** and copy the API key! Please keep this key secret as it will not be shown again. You can always generate a new key if needed.

## 2. Install a reporter

Pick the reporter for your testing framework and follow its setup guide.

→ [View all reporters](./installation)

## 3. Set your API key

Set your Testream API key in the secret management system of your choice. In this example, we'll use GitHub Actions secrets since it's the most common CI environment, but you can set this in any CI or locally as an environment variable.

**Locally** — add to a `.env` file in your project root (don't commit this):

```
TESTREAM_API_KEY=your_api_key_here
```

**In CI (GitHub Actions)** — add `TESTREAM_API_KEY` as a repository secret (**Settings → Secrets → Actions → New repository secret**), then reference it in your workflow:

```yaml
env:
  TESTREAM_API_KEY: ${{ secrets.TESTREAM_API_KEY }}
```

## 4. Run your tests

Run your tests as normal. The reporter automatically uploads results to Testream when `TESTREAM_API_KEY` is present.

## 5. View your results

Open your Jira instance where Testream is installed and navigate to your project, and check **Test Runs** to see the uploaded results.

## Optional: Let Rovo guide setup

If you want help choosing the right reporter or shaping your CI workflow, open **Testream → Settings → Get Started with Rovo** in Jira. The Testream Setup Agent can use your selected project stack and CI provider to recommend a reporter, sample project, CI snippet, and first-run checklist.

→ [Use AI-assisted setup](./ai-assisted-setup)

## Optional: Add BDD Specs

After your first test runs are flowing into Testream, you can add **BDD Specs** to Jira issues. Rovo can draft or improve Gherkin scenarios and assess them against the test evidence Testream captures from CI.

→ [Learn about BDD Specs](../features/bdd-gherkin-specs)

## What's Next?

- [Reporters](./installation) — full configuration options for your framework
- [Jira Integration](../jira-integration/overview) — surface test results directly in Jira
