import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import process from 'node:process';

const DEFAULT_ENDPOINT = 'https://api.indexnow.org/indexnow';
const DEFAULT_HOST = 'docs.testream.app';
const DEFAULT_KEY = '76e19286e39a4bd8b8ff5f7354936f58';
const DEFAULT_KEY_LOCATION = `https://${DEFAULT_HOST}/${DEFAULT_KEY}.txt`;
const DEFAULT_SITEMAP_PATH = 'build/sitemap.xml';
const IGNORED_PATHS = new Set(['/search']);

export function createUrlListFromSitemap(sitemapXml, { host = DEFAULT_HOST } = {}) {
  const matches = sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g);
  const urls = [];
  const seen = new Set();

  for (const match of matches) {
    const value = match[1]?.trim();
    if (!value) {
      continue;
    }

    const url = new URL(value);

    if (url.host !== host || IGNORED_PATHS.has(url.pathname)) {
      continue;
    }

    const normalizedUrl = url.toString();

    if (!seen.has(normalizedUrl)) {
      seen.add(normalizedUrl);
      urls.push(normalizedUrl);
    }
  }

  return urls;
}

export function buildIndexNowPayload({ host, key, keyLocation, urlList }) {
  if (!Array.isArray(urlList) || urlList.length === 0) {
    throw new Error('IndexNow payload requires at least one URL.');
  }

  return {
    host,
    key,
    keyLocation,
    urlList,
  };
}

export async function submitIndexNow({
  endpoint = DEFAULT_ENDPOINT,
  payload,
  fetchImpl = fetch,
}) {
  const response = await fetchImpl(endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const responseText = (await response.text()).trim();
    const details = responseText ? `: ${responseText}` : '';
    throw new Error(`IndexNow submission failed with ${response.status}${details}`);
  }

  return response;
}

function parseArgs(argv) {
  const options = {
    dryRun: false,
    endpoint: DEFAULT_ENDPOINT,
    sitemapPath: DEFAULT_SITEMAP_PATH,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--dry-run') {
      options.dryRun = true;
      continue;
    }

    if (arg === '--sitemap') {
      if (!argv[index + 1]) {
        throw new Error('Missing value for --sitemap');
      }
      options.sitemapPath = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg === '--endpoint') {
      if (!argv[index + 1]) {
        throw new Error('Missing value for --endpoint');
      }
      options.endpoint = argv[index + 1];
      index += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
}

async function main() {
  const { dryRun, endpoint, sitemapPath } = parseArgs(process.argv.slice(2));
  const sitemapXml = await readFile(sitemapPath, 'utf8');
  const urlList = createUrlListFromSitemap(sitemapXml);
  const payload = buildIndexNowPayload({
    host: DEFAULT_HOST,
    key: DEFAULT_KEY,
    keyLocation: DEFAULT_KEY_LOCATION,
    urlList,
  });

  if (dryRun) {
    console.log(JSON.stringify(payload, null, 2));
    console.log(`Prepared ${payload.urlList.length} URL(s) for IndexNow.`);
    return;
  }

  await submitIndexNow({ endpoint, payload });
  console.log(`Submitted ${payload.urlList.length} URL(s) to ${endpoint}.`);
}

const scriptPath = process.argv[1] ? pathToFileURL(process.argv[1]).href : null;

if (scriptPath === import.meta.url) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
