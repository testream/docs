import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Testream Documentation',
  tagline: 'Automated Test Reporting for Jira Teams',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.testream.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '',

  // Trailing slash behavior
  trailingSlash: false,

  // GitHub pages deployment config.
  organizationName: 'testream',
  projectName: 'docs',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

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
          routeBasePath: '/', // Serve docs at baseUrl root (/)
          sidebarPath: './sidebars.ts',
          showLastUpdateTime: true,
          breadcrumbs: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/testream/docs/tree/main/',
        },
        blog: false,
        sitemap: {
          ignorePatterns: ['/search'],
          changefreq: 'weekly',
          priority: 0.5,
          createSitemapItems: async ({defaultCreateSitemapItems, ...params}) => {
            const items = await defaultCreateSitemapItems(params);

            return items
              .filter((item) => new URL(item.url).pathname !== '/search')
              .map((item) => {
                const pathname = new URL(item.url).pathname.replace(/\/$/, '') || '/';

                let priority = 0.5;

                if (pathname === '/') {
                  priority = 1;
                } else if (pathname === '/intro') {
                  priority = 0.7;
                } else if (pathname.startsWith('/getting-started')) {
                  priority = 0.8;
                } else if (pathname.startsWith('/reporters')) {
                  priority = 0.7;
                }

                return {
                  ...item,
                  priority,
                };
              });
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        docsRouteBasePath: "/",
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
      },
    ],
  ],

  themeConfig: {
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    // Replace with your project's social card
    image: 'img/logo-48.png',
    navbar: {
      title: 'Testream',
      logo: {
        alt: 'Testream Logo',
        src: 'img/logo-48.png',
        target: '_self',
        href: '/',
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
              label: 'CLI Reporter',
              to: '/reporters/cli',
            },
            {
              label: 'Jira Integration',
              to: '/jira-integration/overview',
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
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: {start: 'highlight-start', end: 'highlight-end'},
        },
        {
          className: 'code-block-error-line',
          line: 'This will error',
        },
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
