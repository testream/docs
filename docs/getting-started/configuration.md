---
sidebar_position: 3
---

# Configuration

Learn how to configure Testream reporters, API keys, and environment variables for different environments.

## Environment Variables

### TESTREAM_API_KEY

The API key for authenticating with Testream services.

**How to obtain:**
1. Log in to [testream.app](https://testream.app)
2. Navigate to Settings → API Keys
3. Click "Create API Key"
4. Copy and securely store the generated key

**Usage:**

```bash
# Local development
export TESTREAM_API_KEY=your_api_key_here

# Or in .env file
TESTREAM_API_KEY=your_api_key_here
```

### TESTREAM_API_URL (Optional)

Override the default API endpoint URL. Useful for testing or enterprise deployments.

**Default:** `https://api.testream.app` (configured in backend)

```bash
# Custom API endpoint
export TESTREAM_API_URL=https://custom-api.example.com
```

---

## CI/CD Configuration

### GitHub Actions

Store secrets in your repository settings:

1. Repository → Settings → Secrets and variables → Actions
2. Create `TESTREAM_API_KEY` secret
3. Reference in workflows:

```yaml
env:
  TESTREAM_API_KEY: ${{ secrets.TESTREAM_API_KEY }}
```

### GitLab CI

Add variables in GitLab CI/CD settings:

```yaml title=".gitlab-ci.yml"
test:
  script:
    - npm test
  variables:
    TESTREAM_API_KEY: $TESTREAM_API_KEY
```

Store `TESTREAM_API_KEY` in: Settings → CI/CD → Variables

### Jenkins

Use Jenkins credentials:

```groovy
pipeline {
  environment {
    TESTREAM_API_KEY = credentials('testream-api-key')
  }
  stages {
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
  }
}
```

### CircleCI

Configure environment variables in project settings:

```yaml title=".circleci/config.yml"
jobs:
  test:
    steps:
      - run:
          name: Run tests
          command: npm test
          environment:
            TESTREAM_API_KEY: $TESTREAM_API_KEY
```

---

## Reporter-Specific Configuration

### Playwright Reporter

Configure in `playwright.config.ts`:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['@testream/playwright-reporter', {
      // Required: Enable uploads
      upload: true,

      // Required: API key (use environment variable)
      apiKey: process.env.TESTREAM_API_KEY,

      // Optional: API endpoint URL
      apiUrl: process.env.TESTREAM_API_URL,

      // Optional: Output file path
      outputFile: 'test-results/ctrf-report.json',

      // Optional: Upload artifacts (screenshots, videos, traces)
      uploadArtifacts: true,

      // Optional: Minimal reporter (less console output)
      minimal: false,

      // Optional: Print summary at the end
      printSummary: true,
    }],
  ],
});
```

**Available Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `upload` | boolean | `false` | Enable automatic upload to Testream |
| `apiKey` | string | `undefined` | Testream API key (required if upload is true) |
| `apiUrl` | string | backend default | Override API endpoint URL |
| `outputFile` | string | `'ctrf-report.json'` | Path to save CTRF report |
| `uploadArtifacts` | boolean | `true` | Upload screenshots, videos, and traces |
| `minimal` | boolean | `false` | Reduce console output |
| `printSummary` | boolean | `true` | Print test summary |

### .NET Reporter

Configure via CLI arguments:

```bash
testream-dotnet \
  --file TestResults.trx \
  --apiKey $TESTREAM_API_KEY \
  --apiUrl https://api.testream.app \
  --output ctrf-report.json
```

**CLI Options:**

| Option | Alias | Required | Description |
|--------|-------|----------|-------------|
| `--file` | `-f` | Yes | Path to test results file (TRX, xUnit, NUnit) |
| `--apiKey` | `-k` | No | API key for upload (can use env var) |
| `--apiUrl` | `-u` | No | Override API endpoint |
| `--output` | `-o` | No | Output CTRF file path |
| `--upload` | | No | Enable upload (automatically enabled if apiKey is provided) |

### GitHub Action

Configure in workflow YAML:

```yaml
- uses: testream/upload-action@v0.4.1
  with:
    # Required: API key
    apiKey: ${{ secrets.TESTREAM_API_KEY }}

    # Optional: API URL
    apiUrl: 'https://api.testream.app'

    # Optional: Path to CTRF report
    ctrfPath: 'ctrf-report.json'

    # Optional: Glob pattern for artifacts
    artifacts: 'test-results/**/*.{png,jpg,webm,mp4}'

    # Optional: Working directory
    workingDirectory: './'
```

---

## Security Best Practices

### ✅ DO

- Store API keys in environment variables or secrets managers
- Use `.env` files for local development (and add to `.gitignore`)
- Rotate API keys regularly
- Use separate API keys for different environments (dev, staging, prod)
- Limit API key permissions if possible

### ❌ DON'T

- Commit API keys to version control
- Share API keys in plain text (Slack, email, etc.)
- Use production API keys in development
- Hardcode API keys in source code

### Example: Secure .env Setup

```bash title=".env"
# Local development only - DO NOT commit this file!
TESTREAM_API_KEY=your_dev_api_key_here
TESTREAM_API_URL=https://api.testream.app
```

```bash title=".gitignore"
# Ignore environment files
.env
.env.local
.env.*.local
```

---

## Multiple Environments

### Separate Keys per Environment

```bash title=".env.development"
TESTREAM_API_KEY=dev_key_here
TESTREAM_API_URL=https://dev-api.testream.app
```

```bash title=".env.production"
TESTREAM_API_KEY=prod_key_here
TESTREAM_API_URL=https://api.testream.app
```

### Load Based on Environment

```typescript title="playwright.config.ts"
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment-specific config
const envFile = process.env.NODE_ENV === 'production'
  ? '.env.production'
  : '.env.development';

dotenv.config({ path: envFile });

export default defineConfig({
  reporter: [
    ['@testream/playwright-reporter', {
      upload: true,
      apiKey: process.env.TESTREAM_API_KEY,
      apiUrl: process.env.TESTREAM_API_URL,
    }],
  ],
});
```

---

## What's Next?

- Learn about specific reporters:
  - [Playwright Reporter](../reporters/playwright)
  - [.NET Reporter](../reporters/dotnet)
- Set up [GitHub Action workflows](../github-action/setup)
- Integrate with [Jira](../jira-integration/installation)
