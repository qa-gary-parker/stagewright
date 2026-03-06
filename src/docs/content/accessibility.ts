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
        'This feature requires the Starter tier or above.',
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
        '**Per-test violation cards** — Each test with violations shows an expandable accessibility section with impact badges (critical, serious, moderate, minor), WCAG criterion links, and affected DOM elements.',
        '**Dedicated Accessibility tab** — A suite-wide dashboard with an overall score rating (excellent/good/fair/poor/critical), severity breakdown bar, top recurring issues across all tests, and worst offender tests sorted by violation count.',
        '**Copy Prompt button** — One-click copy of a structured fix prompt for each violation, ready to paste into an AI assistant for remediation guidance.',
        '**AI accessibility analysis** — When AI recommendations are enabled, an AI-generated summary provides prioritised remediation advice based on your violation patterns.',
      ],
    },
    {
      heading: 'Quality Gates',
      body: [
        'Add accessibility thresholds to your quality gates to fail CI when accessibility standards are not met:',
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
        '| Option | Type | Default | Description |',
        '|---|---|---|---|',
        '| `enabled` | `boolean` | `false` | Enable accessibility scanning |',
        '| `standard` | `string` | `WCAG2AA` | WCAG conformance level (`WCAG2A`, `WCAG2AA`, `WCAG2AAA`) |',
        '| `include` | `string[]` | `[]` | Only run these specific axe rule IDs |',
        '| `exclude` | `string[]` | `[]` | Skip these specific axe rule IDs |',
        '| `selector` | `string` | — | CSS selector to scope the scan to a specific element |',
      ],
    },
  ],
};
