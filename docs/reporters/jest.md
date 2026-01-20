---
sidebar_position: 3
---

# Jest Reporter

:::info Coming Soon
The Testream Jest Reporter is currently in development. This page serves as a placeholder for future documentation.
:::

## Planned Features

The Jest reporter will provide:

- 🧪 CTRF report generation for Jest test results
- 📤 Automatic upload to Testream
- 📊 Test coverage integration
- 🎯 Snapshot test tracking
- ⚡ Fast and lightweight

## Notify Me

Want to be notified when the Jest reporter is released?

- Email us at [support@testream.app](mailto:support@testream.app?subject=Jest%20Reporter%20Interest)
- Star our [GitHub repository](https://github.com/hasanalituran/jira-test-manager)

## Alternative Solutions

In the meantime, you can use the GitHub Action to upload Jest results:

### Option 1: Use a CTRF Jest Reporter

1. Install a compatible CTRF reporter for Jest
2. Generate CTRF report during test execution
3. Upload using the [GitHub Action](../github-action/setup)

### Option 2: Convert Jest JSON Output

1. Export Jest results as JSON:
   ```json title="jest.config.js"
   module.exports = {
     reporters: [
       'default',
       ['jest-json-reporter', {
         outputPath: 'test-results/jest-results.json'
       }]
     ]
   };
   ```

2. Convert to CTRF format (custom script)
3. Upload using [@testream/upload-action](../github-action/setup)

## Stay Updated

Follow our progress:
- Website: [testream.app](https://testream.app)
- GitHub: [@testream](https://github.com/testream)
- NPM: [@testream packages](https://www.npmjs.com/search?q=%40testream)
