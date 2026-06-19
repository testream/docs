import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import styles from './index.module.css';
import { JSX, useState, type MouseEvent } from 'react';

const MARKETPLACE_URL = 'https://marketplace.atlassian.com/apps/3048460704';

// Simple SVG icons for features
const icons = {
  dashboard: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  sync: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  ),
  radar: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" />
      <path d="M4 6h.01" />
      <path d="M2.29 9.62A10 10 0 1 0 21.31 8.35" />
      <path d="M16.24 7.76A6 6 0 1 0 8.23 16.67" />
      <path d="M12 18h.01" />
      <circle cx="12" cy="12" r="2" />
      <path d="m13.41 10.59 5.66-5.66" />
    </svg>
  ),
  arrow: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  ),
  sparkles: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  ),
};

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <h1 className={styles.heroTitle}>
          Publish your first automated test run into Jira.
        </h1>
        <p className={styles.heroSubtitle}>
          Set up Playwright, Jest, Cypress, JUnit, .NET, Pytest, Vitest,
          WebdriverIO, Mocha, and CLI-based uploads so every automated run
          reaches Jira with failure evidence, artifacts, branch and commit
          context, trends, and release signal.
        </p>
        <div className={styles.heroButtons}>
          <Link to="/getting-started/quick-start" className={styles.primaryButton}>
            Start the 5-minute Quick Start
            {icons.arrow}
          </Link>
          <Link
            to={MARKETPLACE_URL}
            className={styles.secondaryButton}
          >
            Install on Jira
            {icons.arrow}
          </Link>
        </div>
        <div className={styles.heroReportersSection}>
          <p className={styles.heroReportersLabel}>Choose your reporter path</p>
          <div className={styles.heroReportersGrid}>
            {reporters.map((reporter) => (
              <HeroReporterCard key={reporter.name} reporter={reporter} />
            ))}
          </div>
          <p className={styles.heroReporterFallback}>
            Using another tool?{' '}
            <Link to="/reporters/cli">Upload reports with the CLI.</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: icons.dashboard,
    title: 'Jira-native run summaries',
    description:
      'See pass rate, failed tests, branch, commit, and suite changes where your team already tracks work.',
  },
  {
    icon: icons.radar,
    title: 'Failure evidence attached',
    description:
      'Keep errors, stack traces, screenshots, traces, videos, logs, and metadata connected to the test result.',
  },
  {
    icon: icons.sync,
    title: 'History that improves every run',
    description:
      'Track trends, flaky behavior, suite growth, and release readiness as automated runs keep landing.',
  },
  {
    icon: icons.sparkles,
    title: 'Rovo when it removes friction',
    description:
      'Use the Testream Setup Agent for first-run guidance, then Testream BDD Specs for evidence-based coverage review.',
  },
];

function FeaturesSection() {
  return (
    <section className={styles.features}>
      <div className={styles.featuresInner}>
        <h2 className={styles.sectionTitle}>What every test run gives your Jira team</h2>
        <div className={styles.featureGrid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const reporters = [
  {
    name: 'Playwright',
    icon: 'https://ctrf.io/img/playwright.svg',
    command: 'npm i -D @testream/playwright-reporter',
    description: 'Publish browser test results and artifacts into Jira.',
    docsLink: '/reporters/playwright',
  },
  {
    name: 'Jest',
    icon: 'https://ctrf.io/img/jest.svg',
    command: 'npm i -D @testream/jest-reporter',
    description: 'Send unit and integration test evidence to Jira.',
    docsLink: '/reporters/jest',
  },
  {
    name: 'Vitest',
    icon: 'https://ctrf.io/img/vitest.svg',
    command: 'npm i -D @testream/vitest-reporter',
    description: 'Publish fast frontend and service test runs.',
    docsLink: '/reporters/vitest',
  },
  {
    name: 'Cypress',
    icon: 'https://ctrf.io/img/cypress.svg',
    command: 'npm i -D @testream/cypress-reporter',
    description: 'Bring end-to-end results and artifacts into Jira.',
    docsLink: '/reporters/cypress',
  },
  {
    name: 'JUnit',
    icon: 'https://ctrf.io/img/junit.svg',
    command: 'npm i -D @testream/junit-reporter',
    description: 'Upload JUnit XML reports from existing CI jobs.',
    docsLink: '/reporters/junit',
  },
  {
    name: '.NET',
    icon: 'https://ctrf.io/img/dotnet.svg',
    command: 'npm i -D @testream/dotnet-reporter',
    description: 'Publish .NET test evidence from TRX-based runs.',
    docsLink: '/reporters/dotnet',
  },
  {
    name: 'WebdriverIO',
    icon: 'https://ctrf.io/img/wdio.svg',
    command: 'npm i -D @testream/webdriverio-reporter',
    description: 'Connect WebdriverIO suites to Jira run evidence.',
    docsLink: '/reporters/webdriverio',
  },
  {
    name: 'Mocha',
    icon: 'https://ctrf.io/img/mochajs.svg',
    command: 'npm i -D @testream/mocha-reporter',
    description: 'Publish JavaScript test runs from Mocha projects.',
    docsLink: '/reporters/mocha',
  },
  {
    name: 'Pytest',
    icon: 'https://ctrf.io/img/pytest.svg',
    command: 'npm i -D @testream/pytest-reporter',
    description: 'Send Python test results and metadata to Jira.',
    docsLink: '/reporters/pytest',
  },
];

function HeroReporterCard({ reporter }: Readonly<{ reporter: (typeof reporters)[0] }>) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(reporter.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={styles.heroReporterCard}>
      <Link
        to={reporter.docsLink}
        className={styles.heroReporterLink}
        aria-label={`Open ${reporter.name} reporter guide`}
      >
        <img
          src={reporter.icon}
          alt={reporter.name}
          className={styles.heroReporterIcon}
        />
        <h3 className={styles.heroReporterName}>{reporter.name}</h3>
        <p className={styles.heroReporterDescription}>{reporter.description}</p>
      </Link>
      <button
        className={styles.installCommandBox}
        onClick={handleCopy}
        type="button"
        aria-label={copied ? `Copied ${reporter.name} install command` : `Copy ${reporter.name} install command`}
      >
        <code className={styles.installCommandText}>{reporter.command}</code>
        <span
          className={`${styles.copyIconButton} ${copied ? styles.copied : ''}`}
          aria-hidden="true"
        >
          {copied ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
}

const steps = [
  {
    number: 1,
    title: 'Choose your reporter',
    description: 'Start with Playwright, Jest, Cypress, JUnit, .NET, Pytest, Vitest, WebdriverIO, Mocha, or CLI.'
  },
  {
    number: 2,
    title: 'Add your Testream API key',
    description: 'Run locally or configure your Testream API key in CI so Testream can publish results from your existing test command.'
  },
  {
    number: 3,
    title: 'Verify the run in Jira',
    description: 'Open your Jira project and confirm the run arrived with status, failures, branch, commit, and evidence attached.'
  }
];

function HowItWorksSection() {
  return (
    <section className={styles.howItWorks}>
      <div className={styles.howItWorksInner}>
        <h2 className={styles.sectionTitle}>From codebase to Jira in one test run</h2>
        <div className={styles.stepsGrid}>
          {steps.map((step) => (
            <div key={step.number} className={styles.step}>
              <div className={styles.stepNumber}>{step.number}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
        <div className={styles.stepsActions}>
          <Link to="/getting-started/quick-start" className={styles.primaryButton}>
            Open Quick Start
            {icons.arrow}
          </Link>
          <Link to="/getting-started/installation" className={styles.secondaryButton}>
            Browse reporters
            {icons.arrow}
          </Link>
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className={styles.finalCta}>
      <div className={styles.finalCtaInner}>
        <h2 className={styles.finalCtaTitle}>
          Prove your first Jira-ready test run.
        </h2>
        <p className={styles.finalCtaSubtitle}>
          Start with one automated run, then use every run after it to build
          release confidence with current Jira-native evidence.
        </p>
        <Link to="/getting-started/quick-start" className={styles.ctaButtonLight}>
          Start the Quick Start
          {icons.arrow}
        </Link>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title={'Automated Test Reporting Docs for Jira Teams | Testream'}
      description="Set up Playwright, Jest, Vitest, Cypress, JUnit, .NET, Pytest, WebdriverIO, Mocha, and CLI uploads for automated test reporting in Jira."
    >
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@testream" />
        <link rel="canonical" href="https://docs.testream.app/" />
      </Head>
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <FinalCTASection />
      </main>
    </Layout>
  );
}
