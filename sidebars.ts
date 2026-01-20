import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/configuration',
      ],
    },
    {
      type: 'category',
      label: 'Reporters',
      items: [
        'reporters/playwright',
        'reporters/dotnet',
        'reporters/jest',
      ],
    },
    {
      type: 'category',
      label: 'GitHub Action',
      items: [
        'github-action/setup',
      ],
    },
    {
      type: 'category',
      label: 'Jira Integration',
      items: [
        'jira-integration/installation',
        'jira-integration/usage',
      ],
    },
  ],
};

export default sidebars;
