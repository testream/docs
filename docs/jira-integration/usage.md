---
sidebar_position: 2
---

# Jira Integration - Usage

Learn how to view and manage test results in Jira using the Testream integration.

## Dashboard Overview

After installing and connecting the Testream app, you can access test data in multiple ways within Jira.

## Viewing Test Results in Issues

### Issue Panel

When you open a Jira issue, the Testream panel appears showing:

- **Linked Test Runs** - All test executions associated with this issue
- **Test Summary** - Pass/fail counts and success rate
- **Recent Results** - Latest test run results
- **Trends** - Historical test performance

### How Tests Get Linked to Issues

Tests are automatically linked to Jira issues when:

1. Your commit message includes the issue key (e.g., `PROJECT-123`)
2. Your branch name includes the issue key (e.g., `feature/PROJECT-123-new-feature`)
3. You manually link tests in the Testream dashboard

Example commit message:
```bash
git commit -m "PROJECT-123: Add user authentication tests"
```

## Project Dashboard

Access the project-wide test dashboard:

1. Navigate to your Jira project
2. Click **"Testream"** in the project sidebar
3. View:
   - All test runs for the project
   - Test trends over time
   - Flaky test detection
   - Test coverage metrics

### Dashboard Features

#### Test Runs List

- View all test executions chronologically
- Filter by status (passed, failed, pending)
- Filter by date range
- Search by test name or suite

#### Test Trends

- Success rate over time
- Test duration trends
- Failure patterns
- Identify flaky tests

#### Test Details

Click on any test run to see:

- Individual test results
- Error messages and stack traces
- Execution time
- Environment information
- Linked artifacts

## Viewing Artifacts

Test artifacts (screenshots, videos, traces) are available directly in Jira:

### In Issue Panel

1. Open an issue with test results
2. Scroll to the Testream panel
3. Click on a failed test
4. View attached artifacts:
   - 📸 Screenshots
   - 🎥 Videos
   - 📊 Traces

### Download Artifacts

1. Click on any artifact thumbnail
2. Preview or download the file
3. Share with team members

## Linking Tests Manually

To manually link test results to issues:

### Option 1: From Testream Dashboard

1. Log in to [testream.app](https://testream.app)
2. Go to **Test Runs**
3. Select a test run
4. Click **"Link to Jira"**
5. Enter the issue key (e.g., `PROJECT-123`)
6. Click **"Link"**

### Option 2: From Jira Issue

1. Open the Jira issue
2. Go to the Testream panel
3. Click **"Link Test Run"**
4. Select from recent test runs
5. Click **"Link"**

## Real-Time Updates

The Testream panel updates automatically when:

- New test runs complete
- Test status changes
- Artifacts are uploaded

No need to refresh the page!

## Filtering and Searching

### In Issue Panel

Filter test results by:

- Status (passed, failed, skipped)
- Date range
- Test suite
- Environment

### In Project Dashboard

Advanced filtering:
- Test framework (Playwright, .NET, Jest)
- Branch name
- Commit SHA
- Author
- Tags

## Working with Test Trends

### Identify Flaky Tests

1. Navigate to Project Dashboard → **Trends**
2. Look for tests with:
   - Inconsistent pass/fail patterns
   - Multiple retries
   - Recent failures after long success streaks

3. Click on a flaky test to see:
   - Failure rate
   - Recent executions
   - Common error messages

### Track Test Health

Monitor key metrics:

- **Overall Success Rate** - Percentage of passing tests
- **Average Duration** - Test execution time trends
- **Failure Trends** - Number of failing tests over time
- **New Failures** - Recently broken tests

## Notifications

Stay informed about test results:

### Jira Notifications

- Test failures on linked issues
- New test runs completed
- Flaky test alerts

### Email Notifications

Configure in Testream dashboard:
1. Go to Settings → Notifications
2. Enable email alerts for:
   - Test failures
   - Flaky tests detected
   - Daily/weekly summaries

## Best Practices

### Issue Linking

✅ **DO:**
- Include issue keys in commit messages
- Use conventional branch naming (e.g., `feature/PROJECT-123`)
- Link critical tests manually if needed

❌ **DON'T:**
- Create too many manual links (automate instead)
- Link unrelated tests to issues
- Forget to update links when refactoring

### Dashboard Usage

✅ **DO:**
- Review test trends regularly
- Investigate flaky tests promptly
- Share dashboard with team in standups
- Use filters to focus on relevant data

❌ **DON'T:**
- Ignore consistent failures
- Let flaky tests accumulate
- Use dashboard as the only source of truth (check detailed logs)

### Artifact Management

✅ **DO:**
- Upload artifacts for failed tests
- Download artifacts before they expire
- Share artifact links in issue comments

❌ **DON'T:**
- Upload unnecessary artifacts (increases storage costs)
- Rely solely on artifacts without reading error messages

## Permissions

### Who Can View Test Results?

By default, anyone with access to the Jira issue can view test results.

### Who Can Link Tests?

- Project administrators
- Users with "Edit Issues" permission
- Testream account owners

### Configuring Permissions

1. Go to Jira **Settings** → **Apps** → **Testream**
2. Click **"Permissions"**
3. Configure:
   - Who can view test results
   - Who can link/unlink tests
   - Who can configure settings

## Troubleshooting

### No test results appearing

**Check:**
- Tests are actually being uploaded to Testream
- Issue key is correctly referenced in commits/branches
- Testream app is connected to your account
- Jira issue is in the correct project

### Artifacts not loading

**Possible causes:**
- Artifacts not uploaded with test results
- Network issues
- Artifacts expired (check retention policy)

**Solution:**
- Verify `uploadArtifacts: true` in reporter config
- Check artifact file sizes (large files may take time)
- Contact support if artifacts are missing

### Test runs not updating

**Try:**
- Refresh the page
- Check if test runs are completing in Testream dashboard
- Verify webhook connections in settings

### Slow performance

**Solutions:**
- Reduce date range in filters
- Limit number of displayed test runs
- Clear browser cache
- Check Jira instance performance

## Getting Help

If you encounter issues:

- 📧 Email: [support@testream.app](mailto:support@testream.app)
- 📖 Documentation: [docs](/)
- 🐛 Report bugs: [GitHub Issues](https://github.com/testream/docs/issues)

## What's Next?

- Configure [reporters](../reporters/playwright) to send test data
- Set up [CI/CD integrations](../ci-integrations/setup) for CI/CD
- Explore [Testream dashboard](https://testream.app) for advanced features
