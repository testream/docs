---
sidebar_position: 1
---

# Installation

Integrate Testream with Jira to view test results, trends, and artifacts directly in your Jira workspace.

## Prerequisites

- Jira Cloud instance (Atlassian Cloud)
- Jira administrator permission to install apps (or ability to request app installation)
- Active Testream account with a test project

## Step 1: Install from Atlassian Marketplace

### For Jira Administrators

1. Log in to your Jira instance as an administrator
2. Click the **Apps** dropdown in the top navigation bar
3. Select **"Explore new apps"** (or **"Find new apps"**)
4. In the search box, type **"Testream for Jira"**
5. Click on the **Testream for Jira** app tile in the search results
6. Click the **"Get app"** button
7. Wait for the installation success message to appear

The app will be installed and enabled automatically for your entire Jira workspace.

### For Non-Administrators

If you don't have admin permissions:

1. Navigate to **Apps** → **Explore new apps**
2. Search for **"Testream for Jira"**
3. Click **"Request installation"**
4. Your Jira administrator will receive a notification to approve the installation

## Step 2: Get Your Testream API Key

Before you can view test data in Jira, you need an API key from Testream:

1. Visit [testream.app/projects](https://testream.app/projects)
2. Log in to your Testream account (or create one if needed)
3. Create a test project or select an existing one
4. Navigate to **Settings** → **API Keys**
5. Click **"Generate New API Key"**
6. Copy the API key immediately (it won't be shown again)
7. Store it securely - you'll need it in the next step

## Step 3: Configure API Key in Jira

Now connect your Jira workspace to Testream using the API key:

1. In Jira, click **Apps** in the top navigation
2. Select **Testream for Jira** from the dropdown (or find it in the sidebar)
3. You'll see the API Key Management screen:

![API Key Management](/img/jira/Welcome-Screenshot.png)

4. Click the **"Add API Key"** button
5. Paste your Testream API key into the input field
6. Click **"Save"** or **"Connect"**

Once connected, test data from your Testream projects will start appearing in Jira.

## Step 4: Verify Installation

After completing the setup, verify everything is working:

1. Navigate to **Apps** → **Testream for Jira** in your Jira workspace
2. You should see the dashboard with test metrics (if you have test data)
3. If you see test runs and statistics, the integration is working correctly

If you don't see any data yet, run your tests with a Testream reporter configured, and results will appear within minutes.

## Troubleshooting

### App not appearing in marketplace

**Possible causes:**
- Your Jira instance is not on Atlassian Cloud (Server/Data Center not supported)
- Network or firewall restrictions blocking marketplace access
- Regional availability limitations

**Solution:**
- Verify you're using Jira Cloud at `*.atlassian.net`
- Contact your IT team about marketplace access
- Reach out to Testream support at [contact@testream.app](mailto:contact@testream.app)

### Installation fails

**Common issues:**
- Missing administrator permissions in Jira
- Organization policies blocking new app installations
- Browser extensions interfering with installation

**Solution:**
- Confirm you have Jira administrator role
- Request installation approval from your Jira admin
- Try installation in an incognito/private browser window

### API Key not working

**Check:**
- API key copied correctly without extra spaces or line breaks
- API key generated from the correct Testream project
- API key not revoked or expired in Testream settings

**Solution:**
- Copy the API key again directly from Testream
- Generate a fresh API key and try again
- Verify the key in Testream Settings → API Keys shows as active

### No test data appearing

**If the app is installed but shows no data:**
- Test results must be uploaded to Testream first using a reporter
- Configure an reporter that is compatible with your test suite (e.g., Playwright, Jest, etc.)
- Run your tests with the reporter configured
- Wait a few minutes for data to sync to Jira

## Uninstalling

To remove the Testream for Jira app:

1. Go to **Apps** → **Manage apps** (requires Jira admin permissions)
2. Find **"Testream for Jira"** in the installed apps list
3. Click the settings icon next to the app
4. Select **"Uninstall"**
5. Confirm the uninstallation when prompted

**Note:** Uninstalling removes the Jira integration, but your test data remains safely stored in Testream and can be viewed at [testream.app](https://testream.app).

## What's Next?

- Learn how to [use the integration](./usage) to view test results
- Configure [test reporters](../reporters/playwright) to send data to Testream
- Set up [CLI Reporter](../reporters/cli) for automated uploads
