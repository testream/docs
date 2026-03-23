---
sidebar_position: 2
---

# Quick Start

Get Testream up and running in minutes. These steps work for every supported framework.

## 1. Create an account and get your API key

1. Sign up at [testream.app](https://testream.app)
2. Go to **Settings → API Keys**
3. Click **Create API Key** and copy it

## 2. Install a reporter

Pick the reporter for your testing framework and follow its setup guide.

→ [View all reporters](./installation)

## 3. Set your API key

The reporter reads your API key from the `TESTREAM_API_KEY` environment variable.

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

Open [testream.app](https://testream.app), navigate to your project, and check **Test Runs** to see the uploaded results.

## What's Next?

- [Reporters](./installation) — full configuration options for your framework
- [Jira Integration](../jira-integration/overview) — surface test results directly in Jira
