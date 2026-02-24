import type { DocPage } from '../types';

export const testHistory: DocPage = {
  slug: 'test-history',
  title: 'Test History',
  description: 'View per-test historical data including pass/fail patterns, duration trends, and flakiness over time.',
  sections: [
    {
      heading: 'Overview',
      body: [
        'Test history tracks the results of individual tests across multiple runs. Instead of looking at suite-level metrics, you can drill down into any specific test and see its complete pass/fail timeline, duration trend, and flakiness pattern.',
      ],
    },
    {
      heading: 'Enabling Test History',
      body: [
        'Test history is automatically available when you configure a history path. Each run appends per-test results to the history file.',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  historyPath: 'reports/history.json',
}]`,
      },
    },
    {
      heading: 'Per-Test Timeline',
      body: [
        'Click any test in the report to open its history panel. The timeline shows every recorded run with colour-coded status indicators.',
      ],
      table: {
        headers: ['Indicator', 'Meaning'],
        rows: [
          ['Green square', 'Test passed on first attempt'],
          ['Yellow square', 'Test passed after retry (flaky)'],
          ['Red square', 'Test failed all attempts'],
          ['Grey square', 'Test was skipped'],
          ['Blue square', 'Test was not present in that run'],
        ],
      },
      note: {
        type: 'info',
        content: 'The timeline is interactive — hover over any square to see the run date, duration, and error message if applicable.',
      },
    },
    {
      heading: 'Duration History',
      body: [
        'The duration chart for each test shows how execution time changes over runs. This helps identify tests that are gradually slowing down — a common sign of growing page complexity or test scope creep.',
      ],
      list: {
        items: [
          'Duration plotted as a line chart with run dates on the X-axis',
          'Average, minimum, and maximum durations displayed',
          'Standard deviation shown to indicate consistency',
          'Outlier runs highlighted with tooltips',
        ],
        icon: 'check',
      },
    },
    {
      heading: 'Identifying Problematic Tests',
      body: [
        'The history view includes a ranked list of the most problematic tests in your suite, sorted by a composite health score.',
      ],
      table: {
        headers: ['Factor', 'Weight', 'Description'],
        rows: [
          ['Failure frequency', '40%', 'How often the test fails across recorded runs'],
          ['Flakiness rate', '30%', 'Percentage of runs that required retries'],
          ['Duration variance', '15%', 'Consistency of execution time'],
          ['Recent trend', '15%', 'Whether the test is getting worse or better'],
        ],
      },
    },
    {
      heading: 'History Data Structure',
      body: [
        'The history file stores structured data for each test. You can access this data programmatically for custom dashboards or alerting.',
      ],
      code: {
        language: 'typescript',
        content: `interface TestHistoryEntry {
  testId: string;
  title: string;
  file: string;
  runs: {
    date: string;
    status: 'passed' | 'failed' | 'flaky' | 'skipped';
    duration: number;
    attempts: number;
    error?: string;
  }[];
}`,
      },
    },
  ],
};
