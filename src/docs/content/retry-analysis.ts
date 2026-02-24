import type { DocPage } from '../types';

export const retryAnalysis: DocPage = {
  slug: 'retry-analysis',
  title: 'Retry Analysis',
  description: 'Track test retries, detect flaky tests, and analyse retry patterns across your suite.',
  sections: [
    {
      heading: 'How Retries Are Tracked',
      body: [
        'Playwright supports automatic retries for failing tests via the retries config option. The reporter captures every retry attempt — including intermediate failures — and presents a complete picture of retry behaviour across your suite.',
        'Each test entry in the report shows the number of attempts, which attempts passed or failed, and the total time spent including retries.',
      ],
    },
    {
      heading: 'Configuring Retries',
      body: [
        'Retries are configured in your Playwright config. The reporter automatically detects and tracks them without additional configuration.',
      ],
      code: {
        language: 'typescript',
        content: `import { defineConfig } from '@playwright/test';

export default defineConfig({
  retries: 2,
  reporter: [
    ['playwright-smart-reporter', {
      outputFile: 'smart-report.html',
    }],
  ],
});`,
      },
    },
    {
      heading: 'Flaky Test Detection',
      body: [
        'A test is classified as flaky when it fails on one attempt but passes on a subsequent retry within the same run. The reporter flags these tests with a flaky badge and tracks the flakiness rate over time.',
      ],
      table: {
        headers: ['Classification', 'Behaviour', 'Badge'],
        rows: [
          ['Passed', 'Passed on first attempt', 'Green — Pass'],
          ['Flaky', 'Failed initially, passed on retry', 'Yellow — Flaky'],
          ['Failed', 'Failed all attempts including retries', 'Red — Fail'],
          ['Skipped', 'Not executed', 'Grey — Skip'],
        ],
      },
      note: {
        type: 'warning',
        content: 'Tests that pass on retry are still counted as passing in the overall results, but the flaky badge ensures they are visible for investigation.',
      },
    },
    {
      heading: 'Retry Statistics',
      body: [
        'The report summary includes aggregate retry statistics to help you understand the overall flakiness of your suite.',
      ],
      list: {
        items: [
          'Total retry count across all tests in the run',
          'Flaky test percentage — tests that needed retries to pass',
          'Average retries per failing test',
          'Time spent on retries (wasted CI minutes)',
          'Top 10 most retried tests ranked by retry frequency',
        ],
        icon: 'check',
      },
    },
    {
      heading: 'Retry Patterns Over Time',
      body: [
        'When historical data is enabled, the reporter tracks retry patterns across runs. This lets you identify tests that are becoming increasingly flaky before they start consistently failing.',
      ],
      code: {
        language: 'typescript',
        content: `// Example: retry trend data structure
{
  testId: 'login-flow.spec.ts:15',
  retryHistory: [
    { run: '2024-01-15', attempts: 1, passed: true },
    { run: '2024-01-16', attempts: 2, passed: true },  // flaky
    { run: '2024-01-17', attempts: 3, passed: true },  // getting worse
    { run: '2024-01-18', attempts: 3, passed: false },  // broken
  ]
}`,
      },
    },
    {
      heading: 'Reducing Flakiness',
      body: [
        'Retries mask underlying issues. Use the retry analysis data to prioritise fixes and reduce overall flakiness.',
      ],
      table: {
        headers: ['Strategy', 'When to Use'],
        rows: [
          ['Add explicit waits', 'Tests fail due to timing or animation delays'],
          ['Mock external APIs', 'Tests depend on third-party services'],
          ['Isolate test data', 'Tests share database state or files'],
          ['Run flaky tests serially', 'Tests compete for shared browser resources'],
          ['Use test.fixme() annotation', 'Test is known-broken and should be skipped temporarily'],
        ],
      },
    },
  ],
};
