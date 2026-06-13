# Testream Documentation

Official documentation for Testream automated test reporting.

## Documentation

- **Live docs:** https://docs.testream.app

## Get Started

- Playwright Reporter: https://docs.testream.app/reporters/playwright
- .NET Reporter: https://docs.testream.app/reporters/dotnet
- Cypress Reporter: https://docs.testream.app/reporters/cypress
- Jest Reporter: https://docs.testream.app/reporters/jest
- WebdriverIO Reporter: https://docs.testream.app/reporters/webdriverio
- Mocha Reporter: https://docs.testream.app/reporters/mocha
- CLI Reporter: https://docs.testream.app/reporters/cli
- JUnit Reporter: https://docs.testream.app/reporters/junit
- Pytest Reporter: https://docs.testream.app/reporters/pytest
- Vitest Reporter: https://docs.testream.app/reporters/vitest
- Jira Integration: https://docs.testream.app/jira-integration/overview (Marketplace: https://marketplace.atlassian.com/apps/3048460704)

## Packages

- https://www.npmjs.com/org/testream

## Support

- Email: contact@testream.app

## IndexNow Automation

- The GitHub Pages deploy workflow now submits the current public docs URL set to IndexNow after a successful production deploy.
- The ownership key is hosted at `static/76e19286e39a4bd8b8ff5f7354936f58.txt` and is expected to stay available at `https://docs.testream.app/76e19286e39a4bd8b8ff5f7354936f58.txt`.
- The submission payload is built from `build/sitemap.xml`, so only canonical docs URLs from the generated sitemap are submitted. `/search` is excluded.
- To validate the payload locally, run `npm run build` and then `npm run indexnow:dry-run -- --sitemap build/sitemap.xml`.
- To rerun a real submission manually after a local build, run `npm run indexnow:submit -- --sitemap build/sitemap.xml`.
- A successful submission logs the submitted URL count in GitHub Actions. Bing Webmaster Tools should later show the URLs as received, but IndexNow does not guarantee indexing.
