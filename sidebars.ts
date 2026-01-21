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
      ],
    },
    {
      type: 'category',
      label: 'Reporters',
      items: [
        'reporters/playwright',
        'reporters/dotnet',
      ],
    },
    {
      type: 'category',
      label: 'CI/CD Integrations',
      items: [
        'ci-integrations/setup',
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
