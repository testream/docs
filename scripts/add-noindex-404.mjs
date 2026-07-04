/**
 * Post-build script: Injects a noindex meta tag into build/404.html
 * to prevent search engines from indexing the 404 page.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = resolve(__dirname, '..', 'build', '404.html');

try {
  let html = readFileSync(filePath, 'utf-8');

  // Insert noindex meta tag right after the charset declaration
  html = html.replace(
    '<meta charset="UTF-8">',
    '<meta charset="UTF-8">\n<meta name="robots" content="noindex">',
  );

  writeFileSync(filePath, html, 'utf-8');
  console.log('✅ Injected noindex meta tag into build/404.html');
} catch (err) {
  if (err.code === 'ENOENT') {
    console.error('❌ build/404.html not found. Run `npm run build` first.');
  } else {
    console.error('❌ Failed to inject noindex into 404.html:', err.message);
  }
  process.exit(1);
}
