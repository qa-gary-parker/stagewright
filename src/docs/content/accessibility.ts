import type { DocPage } from '../types';

export const accessibility: DocPage = {
  slug: 'accessibility',
  title: 'Accessibility Scanning',
  description: 'Automatic WCAG compliance scanning powered by axe-core, with per-test violations and a dedicated Accessibility tab.',
  isPro: true,
  sections: [
    {
      heading: 'Overview',
      body: [
        'Accessibility scanning integrates axe-core into your Playwright tests via a custom test fixture. Each test automatically runs a WCAG compliance audit after completion, and results are aggregated into a dedicated Accessibility tab in your report.',
        'Basic accessibility scanning (per-test violations, severity badges, WCAG links) is available on all tiers. The dedicated Accessibility tab, AI-powered analysis, and accessibility quality gates require the Starter tier or above.',
      ],
    },
    {
      heading: 'Setup',
      body: [
        'Install the axe-core integration as a dev dependency:',
      ],
      code: {
        language: 'bash',
        content: 'npm install -D @axe-core/playwright',
      },
    },
    {
      heading: 'Using the Test Fixture',
      body: [
        'Import the accessibility test fixture instead of the standard Playwright test. The fixture automatically runs an axe scan after each test completes.',
      ],
      code: {
        language: 'typescript',
        content: `import { test } from 'playwright-smart-reporter/accessibility';
import { expect } from '@playwright/test';

test('homepage accessibility', async ({ page }) => {
  await page.goto('https://example.com');
  expect(page).toHaveTitle(/Example/);
  // axe scan runs automatically after this test
});`,
      },
    },
    {
      heading: 'Configuration',
      body: [
        'Enable accessibility scanning in your Playwright config via the use block:',
      ],
      code: {
        language: 'typescript',
        content: `// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    smartReporterA11y: {
      enabled: true,
      standard: 'WCAG2AA',  // WCAG2A, WCAG2AA, or WCAG2AAA
      // include: ['color-contrast', 'image-alt'],  // only check these rules
      // exclude: ['region'],                        // skip these rules
      // selector: '#main-content',                  // scope the scan
    },
  },
  reporter: [
    ['playwright-smart-reporter', {
      outputFile: 'smart-report.html',
      licenseKey: process.env.SMART_REPORTER_LICENSE_KEY,
    }],
  ],
});`,
      },
    },
    {
      heading: 'Report Features',
      body: [
        'When accessibility scanning is enabled, the report includes:',
      ],
      list: {
        icon: 'check',
        items: [
          'Per-test violation cards with impact badges (critical, serious, moderate, minor), WCAG criterion links, and affected DOM elements',
          'Dedicated Accessibility tab with suite-wide score rating, severity breakdown bar, top recurring issues, and worst offender tests (Starter+)',
          'Copy Prompt button to generate AI-ready fix prompts for each violation',
          'Accessibility tree viewer for visual tree snapshot inspection when tree data is present (Starter+)',
          'AI-powered accessibility analysis with prioritised remediation advice (Starter+, uses AI quota)',
        ],
      },
    },
    {
      heading: 'Tier Availability',
      body: [
        'Accessibility features are split across tiers to give every team useful violation data while reserving advanced analysis for paid plans.',
      ],
      table: {
        headers: ['Feature', 'Local (Free)', 'Starter', 'Pro'],
        rows: [
          ['Per-test violation cards with impact badges', 'Yes', 'Yes', 'Yes'],
          ['WCAG criterion links and Copy Prompt button', 'Yes', 'Yes', 'Yes'],
          ['Dedicated Accessibility tab', '', 'Yes', 'Yes'],
          ['Accessibility tree viewer', '', 'Yes', 'Yes'],
          ['AI accessibility analysis', '', 'Yes', 'Yes'],
          ['Accessibility quality gates', '', 'Yes', 'Yes'],
        ],
      },
    },
    {
      heading: 'AI Accessibility Analysis',
      body: [
        'When AI recommendations are enabled (Starter tier and above), the Accessibility tab includes an AI-generated summary that analyses your violation patterns and provides prioritised remediation advice.',
        'AI analysis is enabled by default when you have a valid license key. To disable it (e.g., to preserve AI quota), set enableAIRecommendations to false:',
      ],
      code: {
        language: 'typescript',
        content: `reporter: [
  ['playwright-smart-reporter', {
    outputFile: 'smart-report.html',
    licenseKey: process.env.SMART_REPORTER_LICENSE_KEY,
    enableAIRecommendations: false,  // disables AI for both failure analysis and a11y
  }],
]`,
      },
    },
    {
      heading: 'Quality Gates',
      body: [
        'Add accessibility thresholds to your quality gates to fail CI when accessibility standards are not met (Starter tier and above):',
      ],
      code: {
        language: 'typescript',
        content: `reporter: [
  ['playwright-smart-reporter', {
    qualityGates: {
      maxA11yViolations: 10,    // max total violations across all tests
      maxA11yCritical: 0,        // zero tolerance for critical violations
      minA11yRating: 'fair',     // minimum suite rating (excellent, good, fair, poor, critical)
    },
  }],
]`,
      },
    },
    {
      heading: 'Configuration Options',
      body: [
        'Customise accessibility scanning behaviour with the following options in the smartReporterA11y config:',
      ],
      table: {
        headers: ['Option', 'Type', 'Default', 'Description'],
        rows: [
          ['enabled', 'boolean', 'false', 'Enable accessibility scanning'],
          ['standard', 'string', 'WCAG2AA', 'WCAG conformance level (WCAG2A, WCAG2AA, WCAG2AAA)'],
          ['include', 'string[]', '[]', 'Only run these specific axe rule IDs'],
          ['exclude', 'string[]', '[]', 'Skip these specific axe rule IDs'],
          ['selector', 'string', '\u2014', 'CSS selector to scope the scan to a specific element'],
        ],
      },
    },
  ],
};
