---
sidebar_position: 3
---

# Usage

Learn how to access and use the Testream for Jira integration, including permissions and best practices.

## Accessing the Dashboard

After installation and configuration, access Testream in Jira:

1. Click **Apps** in the top navigation bar
2. Select **Testream for Jira** from the dropdown menu

Alternatively, you may find Testream in your project sidebar depending on your Jira configuration.

## Feature Guides

For detailed guides on each feature, visit the dedicated pages:

- **[Dashboard](../features/dashboard)** - Test metrics, result distributions, and recent runs
- **[Test Run Details](../features/test-run-details)** - Metadata, results summary, and release linking
- **[Issue Creation](../features/issue-creation)** - Creating Jira issues from failed tests
- **[Failure Inspection](../features/failure-inspection)** - Error messages, stack traces, and artifacts
- **[Trends & Analytics](../features/trends-analytics)** - Historical performance charts and analysis
- **[Release Management](../features/release-management)** - Linking test runs to Jira releases
- **[PDF Reports](../features/pdf-reports)** - Generating downloadable PDF summaries

## Best Practices

### Daily Usage

- Check the dashboard each morning to spot new failures
- Review flaky tests weekly and prioritize fixes
- Use the pass rate trend to gauge test suite stability

### Debugging Failures

- Always check error messages first before diving into artifacts
- Download screenshots and videos for failures that are hard to reproduce
- Use stack traces to identify the exact line of code causing failures
- Share artifact links with team members in issue comments

### Release Management

- Link test runs to releases as part of your release checklist
- Review release-specific test results before deployment
- Track pass rate trends leading up to release dates
- Use release filters to compare quality across versions

### Team Collaboration

- Create Jira issues for persistent failures to track fixes
- Share the dashboard URL in standup meetings
- Add test run links to pull request descriptions
- Use custom fields in issues to maintain traceability

## Permissions

By default, any Jira user who can access the workspace can view Testream data. Contact your Jira administrator if you need to restrict access.

## Getting Help

If you encounter issues or have questions:

- Email: [contact@testream.app](mailto:contact@testream.app)
- Documentation: [Read the docs](/)
- Report bugs: [GitHub Issues](https://github.com/testream/docs/issues)

## What's Next?

- Configure [reporters](../reporters/playwright) to send test data
- Set up [CLI Reporter](../reporters/cli) for ingesting framework agnostic CTRF reports
- Explore [Testream dashboard](https://testream.app) for advanced features
