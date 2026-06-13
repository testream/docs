import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildIndexNowPayload,
  createUrlListFromSitemap,
  submitIndexNow,
} from './indexnow.mjs';

test('createUrlListFromSitemap keeps canonical docs URLs and removes ignored paths', () => {
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>https://docs.testream.app/</loc></url>
    <url><loc>https://docs.testream.app/reporters/dotnet</loc></url>
    <url><loc>https://docs.testream.app/search</loc></url>
    <url><loc>https://docs.testream.app/reporters/dotnet</loc></url>
    <url><loc>https://testream.app/</loc></url>
  </urlset>`;

  assert.deepEqual(createUrlListFromSitemap(sitemapXml), [
    'https://docs.testream.app/',
    'https://docs.testream.app/reporters/dotnet',
  ]);
});

test('buildIndexNowPayload uses the provided host, key, keyLocation, and url list', () => {
  const payload = buildIndexNowPayload({
    host: 'docs.testream.app',
    key: 'abc123',
    keyLocation: 'https://docs.testream.app/abc123.txt',
    urlList: ['https://docs.testream.app/intro'],
  });

  assert.deepEqual(payload, {
    host: 'docs.testream.app',
    key: 'abc123',
    keyLocation: 'https://docs.testream.app/abc123.txt',
    urlList: ['https://docs.testream.app/intro'],
  });
});

test('submitIndexNow throws a descriptive error when the API rejects the payload', async () => {
  await assert.rejects(
    submitIndexNow({
      endpoint: 'https://api.indexnow.org/indexnow',
      payload: {
        host: 'docs.testream.app',
        key: 'abc123',
        keyLocation: 'https://docs.testream.app/abc123.txt',
        urlList: ['https://docs.testream.app/intro'],
      },
      fetchImpl: async () => ({
        ok: false,
        status: 403,
        async text() {
          return 'key not valid';
        },
      }),
    }),
    /IndexNow submission failed with 403: key not valid/,
  );
});
