---
sidebar_position: 1
---

# Jira Integration - Installation

Integrate Testream with Jira to view test results, trends, and artifacts directly in your Jira issues and projects.

## Prerequisites

- Jira Cloud instance (Atlassian Cloud)
- Jira administrator or permission to install apps
- Active Testream account

## Step 1: Install the Forge App

### From Atlassian Marketplace

1. Log in to your Jira instance as an administrator
2. Go to **Settings** (⚙️) → **Apps** → **Find new apps**
3. Search for **"Testream"** in the marketplace
4. Click on the Testream app
5. Click **"Get it now"** or **"Try it free"**
6. Follow the installation prompts
7. Accept the permissions requested by the app

### Required Permissions

The Testream Forge app requires the following permissions:

- **Read project data** - To display test results in project contexts
- **Read issue data** - To show test results linked to issues
- **Write issue data** - To add test result panels to issues
- **Storage** - To cache test data for performance

These permissions are necessary for the app to function correctly and display test information.

## Step 2: Connect Your Testream Account

After installing the app, you need to connect it to your Testream account:

1. In Jira, go to any project
2. Look for the **Testream** menu item in the project sidebar
3. Click **"Connect to Testream"**
4. You'll be redirected to testream.app to authenticate
5. Log in to your Testream account
6. Authorize the Jira integration
7. You'll be redirected back to Jira

Alternatively:

1. Go to **Settings** → **Apps** → **Manage apps**
2. Find "Testream" in the list
3. Click **"Configure"**
4. Follow the connection wizard

## Step 3: Configure API Key (Optional)

If you want to use organization-wide settings:

1. In Jira, go to **Settings** → **Apps** → **Manage apps**
2. Find "Testream" and click **Configure**
3. Enter your Testream API key (from testream.app → Settings → API Keys)
4. Click **Save**

This allows all users in your Jira instance to view test results without individual authentication.

## Step 4: Verify Installation

### Check App Status

1. Go to **Settings** → **Apps** → **Manage apps**
2. Find "Testream" in the list
3. Status should show **"Enabled"**

### Test the Integration

1. Create or open a Jira issue
2. Look for the **"Testream"** panel in the issue view
3. You should see:
   - "Connect to Testream" button (if not connected)
   - Or test results panel (if tests have been linked)

## Troubleshooting Installation

### App not appearing in marketplace

**Possible causes:**
- App not yet published to marketplace (check with Testream support)
- Your Jira instance doesn't allow Forge apps
- Network or firewall restrictions

**Solution:**
- Contact Testream support at [support@testream.app](mailto:support@testream.app)
- Check with your Jira administrator about app installation policies

### Installation fails

**Check:**
- You have administrator permissions in Jira
- Your Jira instance is on Atlassian Cloud (not Server/Data Center)
- No conflicting apps are installed

### Connection to Testream fails

**Solutions:**
- Verify your Testream account is active
- Check that you're logged into the correct Testream account
- Try clearing browser cache and cookies
- Disable browser extensions that might interfere

### API Key not working

**Check:**
- API key is copied correctly (no extra spaces)
- API key is not expired
- API key has correct permissions
- Generate a new key if needed

## Uninstalling

To remove the Testream app:

1. Go to **Settings** → **Apps** → **Manage apps**
2. Find "Testream" in the list
3. Click **"Uninstall"**
4. Confirm the uninstallation

**Note:** This will remove all Testream panels from issues, but your test data remains in Testream.

## What's Next?

- Learn how to [use the integration](./usage) to view test results
- Configure [test reporters](../reporters/playwright) to send data to Testream
- Set up [GitHub Actions](../github-action/setup) for automated uploads
