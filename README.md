# Testream Documentation

Official documentation for Testream test management platform.

## Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

**Live Site:** [https://testream.github.io/docs](https://testream.github.io/docs)

## Local Development

### Prerequisites

- Node.js 18 or later
- npm

### Installation

```bash
npm install
```

### Start Development Server

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Deployment to GitHub Pages is handled manually via GitHub Actions.

### To Deploy:

1. Go to the repository on GitHub
2. Click on **Actions** tab
3. Select **Deploy to GitHub Pages** workflow
4. Click **Run workflow**
5. Select the `main` branch
6. Click **Run workflow**

The documentation will be deployed to: https://testream.github.io/docs

## Project Structure

```
docs/
├── docs/                        # Documentation content (Markdown)
│   ├── intro.md                # Introduction page
│   ├── getting-started/        # Getting started guides
│   ├── reporters/              # Reporter documentation
│   ├── ci-integrations/        # CI/CD integrations
│   └── jira-integration/       # Jira integration docs
├── src/                         # React components
│   ├── css/                    # Custom CSS
│   └── pages/                  # Custom pages
├── static/                      # Static files
│   └── img/                    # Images and icons
├── docusaurus.config.ts        # Site configuration
├── sidebars.ts                 # Sidebar configuration
└── package.json                # Dependencies
```

## Contributing

1. Create a new branch for your changes
2. Make your changes to the documentation
3. Test locally with `npm start`
4. Build to verify: `npm run build`
5. Create a pull request

## Documentation Guidelines

- Use clear, concise language
- Include code examples where applicable
- Add screenshots for UI-related content
- Keep navigation structure logical
- Test all links and code examples

## Links

- **Website:** [testream.app](https://testream.app)
- **NPM Packages:** [@testream](https://www.npmjs.com/search?q=%40testream)

## License

This documentation is licensed under the MIT License.
