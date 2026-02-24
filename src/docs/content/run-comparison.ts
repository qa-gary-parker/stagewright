import type { DocPage } from '../types';

export const runComparison: DocPage = {
  slug: 'run-comparison',
  title: 'Run Comparison',
  description: 'Compare test runs side by side to detect new failures, regressions, fixes, and duration changes.',
  sections: [
    {
      heading: 'Overview',
      body: [
        'Run comparison lets you diff two test runs to understand exactly what changed. The reporter compares the current run against a baseline (typically the previous run or a specific reference build) and highlights new failures, fixed tests, regressions, and performance differences.',
      ],
    },
    {
      heading: 'Enabling Comparison',
      body: [
        'Comparison requires a baseline file from a previous run. Use the historyPath option to store and load run data.',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  historyPath: 'reports/history.json',
  outputFile: 'reports/smart-report.html',
}]`,
      },
      note: {
        type: 'info',
        content: 'The history file is updated automatically after each run. On the first run, no comparison is available — the file is created as the initial baseline.',
      },
    },
    {
      heading: 'Comparison Categories',
      body: [
        'Every test in the current run is classified into one of these comparison categories based on its status relative to the baseline.',
      ],
      table: {
        headers: ['Category', 'Icon', 'Description'],
        rows: [
          ['New Failure', 'Red circle', 'Test passed in the baseline but fails in the current run'],
          ['Regression', 'Orange triangle', 'Test that was fixed has started failing again'],
          ['Fixed', 'Green check', 'Test failed in the baseline but passes in the current run'],
          ['New Test', 'Blue plus', 'Test exists in the current run but not in the baseline'],
          ['Removed', 'Grey minus', 'Test existed in the baseline but not in the current run'],
          ['Stable Pass', 'Green dot', 'Test passes in both runs'],
          ['Stable Fail', 'Red dot', 'Test fails in both runs'],
        ],
      },
    },
    {
      heading: 'Duration Comparison',
      body: [
        'Beyond pass/fail status, the comparison view shows duration changes for every test. This helps you catch performance regressions early — before they become user-facing issues.',
      ],
      list: {
        items: [
          'Duration delta displayed as both absolute (ms) and percentage change',
          'Tests slower by more than 20% are flagged with a warning badge',
          'Sort the comparison table by duration change to find the biggest regressions',
          'Overall suite duration comparison shown in the summary header',
        ],
        icon: 'check',
      },
    },
    {
      heading: 'Using Comparison in CI',
      body: [
        'In CI pipelines, store the history file as a build artifact and restore it before each run. This gives you continuous comparison across builds.',
      ],
      code: {
        language: 'yaml',
        content: `# GitHub Actions example
- name: Restore test history
  uses: actions/cache@v4
  with:
    path: reports/history.json
    key: test-history-\${{ github.ref }}
    restore-keys: test-history-

- name: Run tests
  run: npx playwright test

- name: Upload report
  uses: actions/upload-artifact@v4
  with:
    name: test-report
    path: reports/`,
      },
    },
    {
      heading: 'Comparison API',
      body: [
        'Access comparison data programmatically through the report JSON export for custom integrations and dashboards.',
      ],
      code: {
        language: 'typescript',
        content: `interface ComparisonResult {
  newFailures: TestDiff[];
  regressions: TestDiff[];
  fixed: TestDiff[];
  newTests: TestDiff[];
  removed: TestDiff[];
  durationDelta: {
    total: number;
    percentage: number;
    perTest: Record<string, number>;
  };
}`,
      },
    },
  ],
};
