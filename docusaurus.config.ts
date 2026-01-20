import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Testream Documentation',
  tagline: 'Test Management Platform for Modern Development Teams',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://testream.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs/',

  // Trailing slash behavior
  trailingSlash: false,

  // GitHub pages deployment config.
  organizationName: 'testream',
  projectName: 'docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/', // Serve docs at baseUrl root (/docs/) instead of /docs/docs/
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          editUrl: 'https://github.com/testream/docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Testream',
      logo: {
        alt: 'Testream Logo',
        src: 'img/logo.svg',
        target: '_self',
        href: '/intro',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://testream.app',
          label: 'Website',
          position: 'right',
        },
        {
          href: 'https://github.com/testream',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/intro',
            },
            {
              label: 'Reporters',
              to: '/reporters/playwright',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'GitHub Action',
              to: '/github-action/setup',
            },
            {
              label: 'Jira Integration',
              to: '/jira-integration/installation',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Website',
              href: 'https://testream.app',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/testream',
            },
            {
              label: 'NPM',
              href: 'https://www.npmjs.com/search?q=%40testream',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Testream. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'typescript', 'javascript', 'json', 'yaml', 'csharp'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
