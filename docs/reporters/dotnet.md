---
sidebar_position: 2
---

# .NET Reporter

The Testream .NET Reporter converts .NET test results to CTRF format and uploads them to Testream. It supports xUnit, NUnit, MSTest, and TRX formats.

## Installation

### Global Installation

```bash
npm install -g @testream/dotnet-reporter
```

### Use with npx (No Installation)

```bash
npx @testream/dotnet-reporter --file TestResults.trx
```

## Supported Test Formats

- ✅ **TRX** - Visual Studio Test Results format
- ✅ **xUnit** - xUnit XML output
- ✅ **NUnit** - NUnit XML output
- ✅ **MSTest** - MSTest results

## Basic Usage

### 1. Run Your .NET Tests

Generate test results in TRX format:

```bash
dotnet test --logger "trx;LogFileName=TestResults.trx"
```

Or with xUnit/NUnit XML:

```bash
# xUnit
dotnet test --logger "xunit;LogFileName=TestResults.xml"

# NUnit
dotnet test --logger "nunit;LogFileName=TestResults.xml"
```

### 2. Convert and Upload

```bash
testream-dotnet --file TestResults/TestResults.trx --apiKey $TESTREAM_API_KEY
```

Or with npx:

```bash
npx @testream/dotnet-reporter --file TestResults/TestResults.trx --apiKey $TESTREAM_API_KEY
```

## CLI Options

| Option | Alias | Required | Description |
|--------|-------|----------|-------------|
| `--file` | `-f` | Yes | Path to test results file |
| `--apiKey` | `-k` | No* | Testream API key |
| `--apiUrl` | `-u` | No | API endpoint URL (default: backend configured) |
| `--output` | `-o` | No | Output CTRF file path (default: `ctrf-report.json`) |
| `--upload` | | No | Force upload (auto-enabled if apiKey provided) |
| `--help` | `-h` | No | Show help message |

*Required for upload functionality

## Examples

### Convert Only (No Upload)

```bash
testream-dotnet --file TestResults.trx --output my-report.json
```

### Convert and Upload

```bash
testream-dotnet \
  --file TestResults/TestResults.trx \
  --apiKey $TESTREAM_API_KEY \
  --output ctrf-report.json
```

### Custom API URL

```bash
testream-dotnet \
  --file TestResults.trx \
  --apiKey $TESTREAM_API_KEY \
  --apiUrl https://custom-api.example.com
```

## CI/CD Integration

### GitHub Actions

```yaml title=".github/workflows/dotnet.yml"
name: .NET Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4

    - name: Setup .NET
      uses: actions/setup-dotnet@v4
      with:
        dotnet-version: '8.0.x'

    - name: Restore dependencies
      run: dotnet restore

    - name: Build
      run: dotnet build --no-restore

    - name: Run tests
      run: dotnet test --no-build --logger "trx;LogFileName=TestResults.trx"

    - name: Upload to Testream
      if: always()
      run: npx @testream/dotnet-reporter --file TestResults/TestResults.trx --apiKey ${{ secrets.TESTREAM_API_KEY }}
```

### Azure DevOps

```yaml title="azure-pipelines.yml"
trigger:
- main

pool:
  vmImage: 'ubuntu-latest'

steps:
- task: UseDotNet@2
  inputs:
    version: '8.0.x'

- script: dotnet restore
  displayName: 'Restore dependencies'

- script: dotnet build --no-restore
  displayName: 'Build'

- script: dotnet test --no-build --logger "trx;LogFileName=TestResults.trx"
  displayName: 'Run tests'

- script: |
    npm install -g @testream/dotnet-reporter
    testream-dotnet --file TestResults/TestResults.trx --apiKey $(TESTREAM_API_KEY)
  displayName: 'Upload to Testream'
  condition: always()
```

### GitLab CI

```yaml title=".gitlab-ci.yml"
test:
  image: mcr.microsoft.com/dotnet/sdk:8.0
  script:
    - dotnet restore
    - dotnet build --no-restore
    - dotnet test --no-build --logger "trx;LogFileName=TestResults.trx"
    - npx @testream/dotnet-reporter --file TestResults/TestResults.trx --apiKey $TESTREAM_API_KEY
  artifacts:
    when: always
    paths:
      - TestResults/
```

## Test Result Formats

### TRX (Visual Studio Test Results)

Most common format for .NET testing:

```bash
dotnet test --logger "trx;LogFileName=TestResults.trx"
```

Output location: `TestResults/TestResults.trx`

### xUnit

```bash
dotnet test --logger "xunit;LogFileName=TestResults.xml"
```

### NUnit

```bash
dotnet test --logger "nunit;LogFileName=TestResults.xml"
```

### Multiple Loggers

You can use multiple loggers simultaneously:

```bash
dotnet test \
  --logger "trx;LogFileName=TestResults.trx" \
  --logger "html;LogFileName=TestResults.html"
```

## CTRF Output Format

The reporter converts .NET test results to CTRF format:

```json title="ctrf-report.json"
{
  "results": {
    "tool": {
      "name": "dotnet"
    },
    "summary": {
      "tests": 25,
      "passed": 23,
      "failed": 1,
      "pending": 0,
      "skipped": 1,
      "other": 0,
      "start": 1234567890,
      "stop": 1234567900
    },
    "tests": [
      {
        "name": "UserServiceTests.CreateUser_ShouldReturnUser",
        "status": "passed",
        "duration": 156,
        "suite": "UserServiceTests"
      },
      {
        "name": "AuthTests.Login_WithInvalidCredentials_ShouldFail",
        "status": "failed",
        "duration": 89,
        "message": "Expected 401, but was 200",
        "trace": "at AuthTests.Login_WithInvalidCredentials_ShouldFail() in ...",
        "suite": "AuthTests"
      }
    ]
  }
}
```

## Environment Variables

### Local Development

```bash
export TESTREAM_API_KEY=your_api_key_here
export TESTREAM_API_URL=https://api.testream.app  # Optional
```

### Using .env file

Create `.env`:

```bash title=".env"
TESTREAM_API_KEY=your_api_key_here
```

Load and use:

```bash
# Load environment variables
export $(cat .env | xargs)

# Run tests and upload
dotnet test --logger "trx;LogFileName=TestResults.trx"
testream-dotnet --file TestResults/TestResults.trx
```

## Advanced Usage

### Batch Processing

Process multiple test result files:

```bash
# Run tests for multiple projects
dotnet test Project1 --logger "trx;LogFileName=Project1.trx"
dotnet test Project2 --logger "trx;LogFileName=Project2.trx"

# Upload each separately
testream-dotnet --file TestResults/Project1.trx --apiKey $TESTREAM_API_KEY
testream-dotnet --file TestResults/Project2.trx --apiKey $TESTREAM_API_KEY
```

### Wildcard Processing

```bash
# Find and process all TRX files
find TestResults -name "*.trx" -exec testream-dotnet --file {} --apiKey $TESTREAM_API_KEY \;
```

### Integration with Cake Build

```csharp title="build.cake"
Task("Test")
    .Does(() =>
{
    DotNetTest("./MySolution.sln", new DotNetTestSettings
    {
        Configuration = "Release",
        Loggers = new[] { "trx;LogFileName=TestResults.trx" }
    });
});

Task("Upload-Results")
    .IsDependentOn("Test")
    .Does(() =>
{
    var apiKey = EnvironmentVariable("TESTREAM_API_KEY");
    StartProcess("npx", new ProcessSettings {
        Arguments = $"@testream/dotnet-reporter --file TestResults/TestResults.trx --apiKey {apiKey}"
    });
});
```

## Troubleshooting

### File not found error

```
Error: Test results file not found: TestResults.trx
```

**Solution:**
- Verify the file path is correct
- Check that `dotnet test` completed successfully
- Use absolute path: `--file /full/path/to/TestResults.trx`

### Invalid format error

```
Error: Unable to parse test results - invalid format
```

**Solution:**
- Ensure the file is valid TRX/XML format
- Verify the logger type matches the file format
- Try opening the file in a text editor to check validity

### Upload fails

```
Error: Failed to upload results
```

**Check:**
- API key is valid and not expired
- Internet connection is available
- API URL is correct (if custom)
- File size is reasonable (large files may timeout)

### No tests found in results

```
Warning: No tests found in results file
```

**Check:**
- Tests actually ran (check console output)
- Test results file is not empty
- Logger is correctly configured

## NPM Package

- **Package:** [@testream/dotnet-reporter](https://www.npmjs.com/package/@testream/dotnet-reporter)
- **Version:** 0.4.0
- **Repository:** [GitHub](https://github.com/hasanalituran/jira-test-manager)

## What's Next?

- Set up [Playwright Reporter](./playwright) for E2E tests
- Use [GitHub Action](../github-action/setup) for automated uploads
- View results in [Jira](../jira-integration/usage)
