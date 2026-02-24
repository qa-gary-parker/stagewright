import type { DocPage } from '../types';

export const proQuarantine: DocPage = {
  slug: 'pro-quarantine',
  title: 'Flaky Quarantine',
  description: 'Automatically detect and quarantine flaky tests to stabilise your CI pipeline.',
  isPro: true,
  sections: [
    {
      heading: 'Overview',
      body: [
        'Flaky quarantine automatically identifies tests that fail intermittently and isolates them from your main results. Quarantined tests still run, but their failures do not count against quality gates or block the CI pipeline. This lets you maintain a stable build while tracking and fixing flaky tests separately.',
      ],
    },
    {
      heading: 'Auto-Detection',
      body: [
        'The quarantine system analyses test history to detect flaky patterns. A test is flagged as a quarantine candidate when it meets the configured flakiness threshold.',
      ],
      table: {
        headers: ['Signal', 'Description', 'Default Threshold'],
        rows: [
          ['Retry pass rate', 'Fails on first attempt but passes on retry', '≥ 3 occurrences in last 20 runs'],
          ['Alternating status', 'Alternates between pass and fail across runs', '≥ 4 status changes in last 20 runs'],
          ['Environment sensitivity', 'Passes locally but fails in CI (or vice versa)', '≥ 2 environment-specific failures'],
        ],
      },
    },
    {
      heading: 'Configuration',
      body: [
        'Enable quarantine and configure detection thresholds in the reporter options.',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  quarantine: {
    enabled: true,
    autoDetect: true,
    threshold: {
      minRuns: 10,         // minimum history before quarantine eligible
      flakyRate: 20,       // quarantine if flaky in ≥ 20% of runs
      lookbackRuns: 20,    // analyse the last 20 runs
    },
    maxQuarantined: 50,    // cap on quarantined tests
  },
  historyPath: 'reports/history.json',
}]`,
      },
      note: {
        type: 'warning',
        content: 'Quarantine requires historical data. Enable historyPath and accumulate at least minRuns before auto-detection activates.',
      },
    },
    {
      heading: 'Manual Quarantine',
      body: [
        'You can manually quarantine specific tests using annotations, bypassing the auto-detection system.',
      ],
      code: {
        language: 'typescript',
        content: `import { test } from '@playwright/test';

test('flaky dashboard load', async ({ page }) => {
  test.info().annotations.push({
    type: 'quarantine',
    description: 'Investigating intermittent timeout — JIRA-789',
  });

  await page.goto('/dashboard');
  // ...
});`,
      },
    },
    {
      heading: 'Quarantine Reports',
      body: [
        'The report includes a dedicated quarantine section showing all quarantined tests with their flakiness history and current status.',
      ],
      list: {
        items: [
          'Quarantine dashboard showing total quarantined tests and trend',
          'Per-test flakiness timeline with pass/fail/flaky markers',
          'Quarantine age — how long each test has been quarantined',
          'Auto-release candidates — quarantined tests that have stabilised',
          'Impact score — estimated CI time saved by quarantining',
        ],
        icon: 'check',
      },
    },
    {
      heading: 'Managing Quarantined Tests',
      body: [
        'Quarantine is not a permanent solution. The system helps you track and eventually fix quarantined tests.',
      ],
      table: {
        headers: ['Action', 'Trigger', 'Description'],
        rows: [
          ['Auto-quarantine', 'Flakiness exceeds threshold', 'Test is automatically quarantined'],
          ['Auto-release', 'Test passes consistently for N runs', 'Test is removed from quarantine'],
          ['Manual release', 'Annotation removed', 'Test re-enters the main results'],
          ['Permanent skip', 'Team decision', 'Test marked as fixme and tracked for removal'],
        ],
      },
    },
  ],
};
