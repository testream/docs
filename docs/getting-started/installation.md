---
sidebar_position: 1
---

# Installation

Choose the reporter that matches your testing framework and follow the installation instructions below.

## Playwright Reporter

Install the Playwright reporter for automatic CTRF report generation and upload.

```bash
npm install --save-dev @testream/playwright-reporter
```

Or with other package managers:

```bash
# Yarn
yarn add --dev @testream/playwright-reporter

# pnpm
pnpm add --save-dev @testream/playwright-reporter
```

**Next Step:** Configure the reporter in your `playwright.config.ts` - see [Playwright Documentation](../reporters/playwright).

---

## .NET Reporter

Install the .NET reporter CLI globally for converting .NET test results to CTRF format.

```bash
npm install -g @testream/dotnet-reporter
```

Or use npx without installation:

```bash
npx @testream/dotnet-reporter --file TestResults.trx
```

**Supported Formats:**
- xUnit XML
- NUnit XML
- MSTest TRX
- Generic TRX format

**Next Step:** Learn how to use the CLI - see [.NET Documentation](../reporters/dotnet).

---

## Requirements

### Node.js Version

All reporters and tools require **Node.js 18 or later**.

Check your Node.js version:

```bash
node --version
```

If you need to upgrade, visit [nodejs.org](https://nodejs.org/).

### API Key

You'll need a Testream API key to upload test results.

**To get your API key:**

1. Visit [testream.app](https://testream.app)
2. Sign up or log in to your account
3. Navigate to Settings → API Keys
4. Create a new API key
5. Copy and store it securely (e.g., GitHub Secrets, environment variables)

---

## What's Next?

- Follow the [Quick Start Guide](./quick-start) for a complete setup walkthrough
- Set up [CI/CD integrations](../ci-integrations/setup) for automated uploads
- Set up [Jira Integration](../jira-integration/installation)
