import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {useState, type MouseEvent} from 'react';
import ProductScreenshot from '../components/ProductScreenshot';
import styles from './index.module.css';

const MARKETPLACE_URL = 'https://marketplace.atlassian.com/apps/3048460704/testream-automated-test-management-for-jira';

const reporters = [
  {name: 'Playwright', packageName: '@testream/playwright-reporter', link: '/reporters/playwright', icon: 'https://ctrf.io/img/playwright.svg'},
  {name: 'Jest', packageName: '@testream/jest-reporter', link: '/reporters/jest', icon: 'https://ctrf.io/img/jest.svg'},
  {name: 'Vitest', packageName: '@testream/vitest-reporter', link: '/reporters/vitest', icon: 'https://ctrf.io/img/vitest.svg'},
  {name: 'Cypress', packageName: '@testream/cypress-reporter', link: '/reporters/cypress', icon: 'https://ctrf.io/img/cypress.svg'},
  {name: 'JUnit', packageName: '@testream/junit-reporter', link: '/reporters/junit', icon: 'https://ctrf.io/img/junit.svg'},
  {name: '.NET', packageName: '@testream/dotnet-reporter', link: '/reporters/dotnet', icon: 'https://ctrf.io/img/dotnet.svg'},
  {name: 'WebdriverIO', packageName: '@testream/webdriverio-reporter', link: '/reporters/webdriverio', icon: 'https://ctrf.io/img/wdio.svg'},
  {name: 'Mocha', packageName: '@testream/mocha-reporter', link: '/reporters/mocha', icon: 'https://ctrf.io/img/mochajs.svg'},
  {name: 'Pytest', packageName: '@testream/pytest-reporter', link: '/reporters/pytest', icon: 'https://ctrf.io/img/pytest.svg'},
  {name: 'Go', packageName: '@testream/go-reporter', link: '/reporters/go', icon: 'https://ctrf.io/img/go.svg'},
  {name: 'Jasmine', packageName: '@testream/jasmine-reporter', link: '/reporters/jasmine', icon: 'https://ctrf.io/img/jasmine.svg'},
  {name: 'CLI', packageName: '@testream/cli', link: '/reporters/cli', icon: '/img/command-line-icon.png'},
] as const;

const capabilities = [
  {
    eyebrow: 'Automated evidence',
    title: 'Make every run useful in Jira',
    text: 'Bring pass rates, failures, branch and commit context, artifacts, and suite changes into the issues and releases your team already owns.',
    link: '/features/dashboard',
    linkLabel: 'Explore automated evidence',
  },
  {
    eyebrow: 'BDD & Rovo',
    title: 'Connect behavior to proof',
    text: 'Write reusable BDD behaviors, assess Jira scenarios against captured evidence, and keep reviewers in control of the final decision.',
    link: '/features/bdd-coverage-agent',
    linkLabel: 'Explore BDD coverage',
  },
  {
    eyebrow: 'Manual QA',
    title: 'Keep focused manual coverage',
    text: 'Turn reusable behaviors into lean Test Cycles for exploratory, regression, or release checks without building a second test-management universe.',
    link: '/features/test-cycles',
    linkLabel: 'Explore Test Cycles',
  },
  {
    eyebrow: 'Release intelligence',
    title: 'Decide with shared evidence',
    text: 'Link runs, cycles, behaviors, and Jira issues to releases so delivery conversations start from current evidence instead of scattered status updates.',
    link: '/features/release-visibility',
    linkLabel: 'Explore Release Visibility',
  },
];

function CopyButton({command}: Readonly<{command: string}>) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(`npm i -D ${command}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button className={styles.copyButton} onClick={handleCopy} type="button">
      <code>npm i -D {command}</code>
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <p className={styles.eyebrow}>Automated test management in Jira</p>
        <h1>Test evidence your whole Jira team can trust.</h1>
        <p className={styles.heroSubtitle}>
          Connect CI results, reusable BDD specs, and manual Test Cycles to your Jira releases—so QA, engineering, product, and delivery leaders decide from the same evidence.
        </p>
        <div className={styles.heroActions}>
          <Link className={styles.primaryButton} to="/getting-started/quick-start">Start with one Jira project</Link>
          <Link className={styles.secondaryButton} to={MARKETPLACE_URL}>Install on Jira</Link>
        </div>
        <div className={styles.promiseRow}>
          <span>Keep your existing frameworks</span>
          <span>Free plan available</span>
          <span>BYO Cloud</span>
        </div>
      </div>
    </section>
  );
}

function ProofSection() {
  return (
    <section className={styles.proofSection} aria-labelledby="proof-heading">
      <div className={styles.sectionIntro}>
        <p className={styles.eyebrow}>One evidence system</p>
        <h2 id="proof-heading">From the first run to release readiness</h2>
        <p>Start with the evidence your CI already produces. Add the Jira workflows your team needs as coverage grows.</p>
      </div>
      <div className={styles.proofGrid}>
        <Link className={styles.proofCard} to="/features/dashboard">
          <ProductScreenshot src="/img/product/testream-dashboard-overview.png" alt="Testream dashboard showing run evidence and quality trends" width={2812} height={1754} priority />
          <span><strong>See the signal</strong> across projects, runs, and trends.</span>
        </Link>
        <Link className={styles.proofCard} to="/features/bdd-coverage-agent">
          <ProductScreenshot src="/img/product/testream-bdd-coverage-agent.jpeg" alt="BDD Coverage Agent assessing a Jira scenario against Testream evidence" width={1600} height={900} />
          <span><strong>Review the proof</strong> behind a BDD coverage assessment.</span>
        </Link>
        <Link className={styles.proofCard} to="/features/release-visibility">
          <ProductScreenshot src="/img/product/testream-release-visibility.png" alt="Testream release visibility showing linked evidence and issue coverage" width={3430} height={1764} />
          <span><strong>Make the call</strong> with release-scoped evidence.</span>
        </Link>
      </div>
    </section>
  );
}

function CapabilitySection() {
  return (
    <section className={styles.capabilitySection} aria-labelledby="capabilities-heading">
      <div className={styles.sectionIntro}>
        <p className={styles.eyebrow}>Built around how Jira teams work</p>
        <h2 id="capabilities-heading">Quality context without the tool sprawl</h2>
      </div>
      <div className={styles.capabilityGrid}>
        {capabilities.map((capability) => (
          <article className={styles.capabilityCard} key={capability.title}>
            <p className={styles.cardEyebrow}>{capability.eyebrow}</p>
            <h3>{capability.title}</h3>
            <p>{capability.text}</p>
            <Link to={capability.link}>{capability.linkLabel} <span aria-hidden="true">→</span></Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function ReporterSection() {
  return (
    <section className={styles.reporterSection} aria-labelledby="reporters-heading">
      <div className={styles.sectionIntro}>
        <p className={styles.eyebrow}>Keep your current stack</p>
        <h2 id="reporters-heading">Choose the reporter that matches your tests</h2>
        <p>Install a framework reporter or use the CLI when your tool already produces CTRF or JUnit output.</p>
      </div>
      <div className={styles.reporterGrid}>
        {reporters.map((reporter) => (
          <article className={styles.reporterCard} key={reporter.name}>
            <Link to={reporter.link} aria-label={`Open ${reporter.name} reporter guide`}>
              <span className={styles.reporterIdentity}>
                <img className={styles.reporterLogo} src={reporter.icon} alt="" width={32} height={32} loading="lazy" decoding="async" aria-hidden="true" />
                <h3>{reporter.name}</h3>
              </span>
              <span className={styles.reporterGuide}>Open guide →</span>
            </Link>
            <CopyButton command={reporter.packageName} />
          </article>
        ))}
      </div>
      <Link className={styles.textLink} to="/reporters/cli">Need another tool? Upload with the CLI reporter →</Link>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className={styles.finalCta}>
      <p className={styles.eyebrow}>Ready when you are</p>
      <h2>Make the next test run visible in Jira.</h2>
      <p>Use the Quick Start to prove the flow with one project, one reporter, and one real run.</p>
      <Link className={styles.ctaButton} to="/getting-started/quick-start">Open the Quick Start →</Link>
    </section>
  );
}

export default function Home() {
  return (
            <Layout title="Testream Documentation" description="Jira-native quality evidence connecting automated CI/CD test results, reusable BDD workflows, manual Test Cycles, and release readiness — all inside Jira for your team.">
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@testream" />
        <meta name="twitter:title" content="Testream Documentation | Quality evidence in Jira" />
        <meta name="twitter:description" content="Jira-native quality evidence connecting automated CI/CD test results, reusable BDD workflows, manual Test Cycles, and release readiness." />
        <link rel="canonical" href="https://docs.testream.app/" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Testream Documentation',
            url: 'https://docs.testream.app/',
            publisher: {
              '@type': 'Organization',
              name: 'Testream',
              url: 'https://testream.app/',
              sameAs: ['https://github.com/testream', MARKETPLACE_URL],
            },
          })}
        </script>
      </Head>
      <main>
        <Hero />
        <ReporterSection />
        <ProofSection />
        <CapabilitySection />
        <FinalCTA />
      </main>
    </Layout>
  );
}
