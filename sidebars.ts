import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Start Here',
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
        'reporters/jasmine',
      ],
    },
    {
      type: 'category',
      label: 'Automated Evidence',
      collapsed: false,
      items: [
        'features/dashboard',
        'features/test-run-details',
        'features/test-run-summaries-in-jira-issues',
        'features/test-suite-changes',
        'features/failure-inspection',
        'features/issue-creation',
        'features/trends-analytics',
        'features/artifact-storage',
        'features/pdf-reports',
        'features/ci-context',
      ],
    },
    {
      type: 'category',
      label: 'BDD, Manual QA & Releases',
      collapsed: false,
      items: [
        'features/bdd-gherkin-specs',
        'features/bdd-coverage-agent',
        'features/rovo-setup-agent',
        'features/bdd-library',
        'features/test-cycles',
        'features/release-management',
        'features/release-visibility',
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
