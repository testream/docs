# Bing Webmaster SEO Fixes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the 3 SEO issues flagged by Bing Webmaster Tools for docs.testream.app: meta descriptions too short (5 pages), limited crawl capacity, and IndexNow verification.

**Architecture:** All fixes are in existing files — no new components needed. Meta descriptions live in frontmatter of Markdown docs (4 files) and a React component prop (1 file). Crawl config is in `static/robots.txt`. IndexNow key file already exists; just needs verification.

**Tech Stack:** Docusaurus v3, TypeScript, Markdown frontmatter, static files.

---

### Task 1: Expand homepage meta description

**Files:**

- Modify: `src/pages/index.tsx:195-195`

- [ ] **Step 1: Update the homepage `description` prop on `Layout`**

Current:

```tsx
<Layout title="Testream Documentation" description="Jira-native quality evidence for automated tests, BDD workflows, manual Test Cycles, and release readiness.">
```

Replace with expanded description (~155 chars):

```tsx
<Layout title="Testream Documentation" description="Jira-native quality evidence connecting automated CI/CD test results, reusable BDD workflows, manual Test Cycles, and release readiness — all inside Jira for your team.">
```

Count: 154 characters.

Also update the `twitter:description` to match:

Current:

```tsx
<meta
  name="twitter:description"
  content="Connect CI results, BDD specs, and manual Test Cycles to Jira releases."
/>
```

Replace with:

```tsx
<meta
  name="twitter:description"
  content="Jira-native quality evidence connecting automated CI/CD test results, reusable BDD workflows, manual Test Cycles, and release readiness."
/>
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: Build succeeds with no errors.

Verify the rendered meta tag in `build/index.html`:
Run: `grep 'name="description"' build/index.html`
Expected: Contains the new description text (~154 chars).

---

### Task 2: Expand Mocha reporter meta description

**Files:**

- Modify: `docs/reporters/mocha.md:3-4`

- [ ] **Step 1: Update frontmatter `description`**

Current:

```yaml
description: "Send Mocha test results from CI/CD into Jira with the Testream Mocha Reporter, built-in upload support, run metadata, failure evidence, and trend context."
```

Replace with (~156 chars):

```yaml
description: "Send Mocha test results from Node.js CI/CD pipelines into Jira with the Testream Mocha Reporter — built-in upload, run metadata, failure evidence, and trend context included."
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: Build succeeds.

Verify:
Run: `grep 'name="description"' build/reporters/mocha.html`
Expected: Contains the new description.

---

### Task 3: Refine Test Suite Changes meta description

**Files:**

- Modify: `docs/features/test-suite-changes.md:3-4`

- [ ] **Step 1: Update frontmatter `description`**

Current:

```yaml
description: Compare automated test runs on the same branch to track added, removed, unchanged, and net suite movement in Jira before release and quality decisions.
```

Replace with (~155 chars):

```yaml
description: Compare automated test runs on the same branch to track added, removed, and unchanged tests with net suite movement in Jira — before release and quality decisions.
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: Build succeeds.

Verify:
Run: `grep 'name="description"' build/features/test-suite-changes.html`
Expected: Contains the new description.

---

### Task 4: Refine JUnit reporter meta description

**Files:**

- Modify: `docs/reporters/junit.md:3-4`

- [ ] **Step 1: Update frontmatter `description`**

Current:

```yaml
description: "Upload JUnit XML results from Java CI/CD pipelines into Jira with the Testream JUnit Reporter, run metadata, failure context, artifacts, and release visibility."
```

Replace with (~156 chars):

```yaml
description: "Upload JUnit XML results from Java CI/CD pipelines into Jira with the Testream JUnit Reporter — run metadata, failure context, artifacts, and release visibility included."
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: Build succeeds.

Verify:
Run: `grep 'name="description"' build/reporters/junit.html`
Expected: Contains the new description.

---

### Task 5: Refine CLI reporter meta description

**Files:**

- Modify: `docs/reporters/cli.md:3-4`

- [ ] **Step 1: Update frontmatter `description`**

Current:

```yaml
description: "Upload CTRF test reports from any CI provider to Testream and Jira with branch, commit, build, environment, artifact context, and searchable run history."
```

Replace with (~155 chars):

```yaml
description: "Upload CTRF test reports from any CI provider to Testream and Jira — branch, commit, build, environment, artifact context, and searchable run history included."
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: Build succeeds.

Verify:
Run: `grep 'name="description"' build/reporters/cli.html`
Expected: Contains the new description.

---

### Task 6: Update robots.txt for crawl capacity

**Files:**

- Modify: `static/robots.txt`

- [ ] **Step 1: Add `Crawl-Delay` directive for better crawl management**

Current `static/robots.txt`:

```
User-agent: *
Allow: /
Disallow: /search
Disallow: /404.html
Disallow: /search-index.json
Disallow: /*.LICENSE.txt

Sitemap: https://docs.testream.app/sitemap.xml
```

Replace with:

```
User-agent: *
Allow: /
Disallow: /search
Disallow: /404.html
Disallow: /search-index.json
Disallow: /*.LICENSE.txt
Crawl-Delay: 10

User-agent: Bingbot
Allow: /
Disallow: /search
Disallow: /404.html
Disallow: /search-index.json
Disallow: /*.LICENSE.txt
Crawl-Delay: 5

Sitemap: https://docs.testream.app/sitemap.xml
```

This adds:

- A global `Crawl-Delay: 10` (10 seconds between requests for all bots)
- A specific `Bingbot` section with `Crawl-Delay: 5` (more aggressive for Bing specifically to improve crawl rate)
- Keeps all existing disallow rules

---

### Task 7: Verify IndexNow submission pipeline

**Files:**

- Inspect: `scripts/indexnow.mjs`
- Inspect: `static/76e19286e39a4bd8b8ff5f7354936f58.txt`
- Modify: `package.json` (if needed)

- [ ] **Step 1: Verify IndexNow key file is accessible in build**

The key file `static/76e19286e39a4bd8b8ff5f7354936f58.txt` is in the static folder which Docusaurus copies to build output. Verify:

Run: `ls -la build/76e19286e39a4bd8b8ff5f7354936f58.txt`
Expected: File exists.

- [ ] **Step 2: Add IndexNow submission to postbuild**

Check if `indexnow:submit` should run after each build. Currently `postbuild` only runs `add-noindex-404.mjs`. Consider adding IndexNow submission:

Modify `package.json`:

```json
"postbuild": "node scripts/add-noindex-404.mjs && node scripts/indexnow.mjs"
```

This would automatically ping Bing/IndexNow about URL changes every time the site is built and deployed.

- [ ] **Step 3: Test IndexNow with dry run**

Run: `npm run indexnow:dry-run`
Expected: JSON payload printed with all site URLs, no errors.

---

### Task 8: Build, verify, and submit

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: Build succeeds (0 errors).

- [ ] **Step 2: Verify all meta descriptions**

Run one final check on all 5 pages:

```bash
echo "=== Homepage ===" && grep 'name="description"' build/index.html | head -1
echo "=== Mocha ===" && grep 'name="description"' build/reporters/mocha.html | head -1
echo "=== Test Suite Changes ===" && grep 'name="description"' build/features/test-suite-changes.html | head -1
echo "=== JUnit ===" && grep 'name="description"' build/reporters/junit.html | head -1
echo "=== CLI ===" && grep 'name="description"' build/reporters/cli.html | head -1
```

Expected: All 5 pages show the new descriptions (150–160 chars each).

- [ ] **Step 3: Verify robots.txt in build output**

Run: `head -15 build/robots.txt`
Expected: Shows updated robots.txt with Crawl-Delay directives.

- [ ] **Step 4: Run IndexNow dry run**

Run: `npm run indexnow:dry-run`
Expected: Valid JSON payload printed.

- [ ] **Step 5: Commit all changes**

```bash
git add -A
git commit -m "fix: address Bing Webmaster SEO issues

- Expand meta descriptions on 5 flagged pages to 150–160 chars
- Add Crawl-Delay directives to robots.txt for better crawl management
- Verify IndexNow submission pipeline
- Fix homepage, mocha, test-suite-changes, junit, and cli descriptions"
```
