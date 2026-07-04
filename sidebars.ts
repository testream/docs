import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/ai-assisted-setup',
      ],
    },
    {
      type: 'category',
      label: 'Reporters',
      collapsed: false,
      items: [
        'reporters/playwright',
        'reporters/dotnet',
        'reporters/cypress',
        'reporters/jest',
        'reporters/webdriverio',
        'reporters/mocha',
        'reporters/cli',
        'reporters/junit',
        'reporters/pytest',
        'reporters/vitest',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      collapsed: false,
      items: [
        'features/dashboard',
        'features/test-run-details',
        'features/test-run-summaries-in-jira-issues',
        'features/test-suite-changes',
        'features/issue-creation',
        'features/failure-inspection',
        'features/trends-analytics',
        'features/release-management',
        'features/release-visibility',
        'features/pdf-reports',
        'features/bdd-gherkin-specs',
        'features/bdd-library',
        'features/test-cycles',
        'features/artifact-storage',
      ],
    },
    {
      type: 'category',
      label: 'Jira Integration',
      collapsed: false,
      items: [
        'jira-integration/overview',
        'jira-integration/usage',
      ],
    },
  ],
};

export default sidebars;
