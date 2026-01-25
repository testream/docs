import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import { JSX } from 'react';

// Simple SVG icons for features
const icons = {
  dashboard: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  sync: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  ),
  radar: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  ),
  github: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
};

// Framework/tool logos
const frameworks = [
  { name: 'Playwright', icon: 'https://ctrf.io/img/playwright.svg' },
  { name: 'Jest', icon: 'https://ctrf.io/img/jest.svg' },
  { name: 'Cypress', icon: 'https://ctrf.io/img/cypress.svg' },
  { name: '.NET', icon: 'https://ctrf.io/img/dotnet.svg' },
];

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <h1 className={styles.heroTitle}>
          One Dashboard.{' '}
          <span className={styles.heroTitleAccent}>Every Test.</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Centralize results from Playwright, Jest, Cypress, and .NET.
          Track trends and kill flaky tests—synced to Jira.
        </p>
        <div className={styles.heroButtons}>
          <Link to="/intro" className={styles.primaryButton}>
            Get Started
            {icons.arrow}
          </Link>
          <Link
            to="https://github.com/testream"
            className={styles.secondaryButton}
          >
            {icons.github}
            View on GitHub
          </Link>
        </div>
        <div className={styles.logoStrip}>
          <p className={styles.logoStripLabel}>Works with your stack</p>
          <div className={styles.logoGrid}>
            {frameworks.map((fw) => (
              <span key={fw.name} className={styles.logoItem}>
                <img src={fw.icon} alt={fw.name} className={styles.logoIcon} />
                {fw.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: icons.dashboard,
    title: 'Instant Setup',
    description:
      'npm install, run your tests, done. Testream captures results automatically with zero configuration.',
  },
  {
    icon: icons.radar,
    title: 'Flaky Test Radar',
    description:
      'Spot unreliable tests before they cause chaos. Track patterns and fix flakiness with data-driven insights.',
  },
  {
    icon: icons.sync,
    title: 'CI/CD Native',
    description:
      'Works with GitHub Actions, GitLab, CircleCI, Jenkins, and more. One CLI for any pipeline.',
  },
];

function FeaturesSection() {
  return (
    <section className={styles.features}>
      <div className={styles.featuresInner}>
        <h2 className={styles.sectionTitle}>Why teams choose Testream</h2>
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

const steps = [
  {
    number: 1,
    title: 'Install the Reporter',
    description: 'Add Testream to your test framework',
    code: 'npm install testream-reporter',
  },
  {
    number: 2,
    title: 'Run Your Tests',
    description: 'Results are captured automatically',
    code: null,
  },
  {
    number: 3,
    title: 'View in Jira',
    description: 'Test results appear in your issues',
    code: null,
  },
];

function HowItWorksSection() {
  return (
    <section className={styles.howItWorks}>
      <div className={styles.howItWorksInner}>
        <h2 className={styles.sectionTitle}>Get started in minutes</h2>
        <div className={styles.stepsGrid}>
          {steps.map((step) => (
            <div key={step.number} className={styles.step}>
              <div className={styles.stepNumber}>{step.number}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
              {step.code && <code className={styles.codeSnippet}>{step.code}</code>}
            </div>
          ))}
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
          Stop chasing test results across tools
        </h2>
        <p className={styles.finalCtaSubtitle}>
          Join teams who have unified their test reporting with Testream.
        </p>
        <Link to="/intro" className={styles.ctaButtonLight}>
          Get Started Free
          {icons.arrow}
        </Link>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Official documentation for Testream test management platform"
    >
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <FinalCTASection />
      </main>
    </Layout>
  );
}
