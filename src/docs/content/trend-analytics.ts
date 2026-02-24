import type { DocPage } from '../types';

export const trendAnalytics: DocPage = {
  slug: 'trend-analytics',
  title: 'Trend Analytics',
  description: 'Track pass rates, durations, and flakiness over time to spot regressions and measure improvement.',
  sections: [
    {
      heading: 'Overview',
      body: [
        'Trend analytics give you a historical view of your test suite health. By tracking metrics across multiple runs, you can identify degradation patterns early and measure the impact of improvements.',
        'Trends require historical data — enable the historyPath option and the reporter will accumulate run data automatically.',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  historyPath: 'reports/history.json',
}]`,
      },
    },
    {
      heading: 'Pass Rate Trends',
      body: [
        'The pass rate trend chart shows overall suite health over time. Each data point represents one test run, plotted on a timeline. A declining trend is a clear signal that something in the codebase or environment is degrading test reliability.',
      ],
      list: {
        items: [
          'Line chart with pass rate percentage on the Y-axis and run date on the X-axis',
          'Hover over any point to see the full run summary',
          'Click a data point to jump to that run\'s comparison view',
          'Configurable time window — last 7 days, 30 days, or all history',
        ],
        icon: 'check',
      },
    },
    {
      heading: 'Duration Trends',
      body: [
        'Track how long your test suite takes to run. Duration trends help you catch performance regressions and validate that optimisation efforts are working.',
      ],
      table: {
        headers: ['Metric', 'Description'],
        rows: [
          ['Total Duration', 'Wall-clock time for the entire suite'],
          ['Average Test Duration', 'Mean execution time per test'],
          ['P95 Duration', '95th percentile test duration — catches outliers'],
          ['Slowest Test', 'The longest-running test in each run'],
          ['Retry Overhead', 'Extra time spent on retries'],
        ],
      },
    },
    {
      heading: 'Flakiness Trends',
      body: [
        'The flakiness trend shows the percentage of tests that required retries to pass. A rising flakiness trend often precedes a spike in genuine failures.',
      ],
      note: {
        type: 'warning',
        content: 'A sudden jump in flakiness often indicates an environment change (new dependency version, infrastructure update, or data migration) rather than a code issue.',
      },
    },
    {
      heading: 'Degradation Detection',
      body: [
        'The reporter automatically flags degradation patterns when metrics cross predefined thresholds. These alerts appear in the report summary and can trigger CI notifications.',
      ],
      table: {
        headers: ['Alert', 'Trigger', 'Severity'],
        rows: [
          ['Pass rate drop', 'Pass rate decreases by more than 5% from 7-day average', 'High'],
          ['Duration spike', 'Total duration increases by more than 20%', 'Medium'],
          ['Flakiness increase', 'Flaky test count doubles from previous run', 'Medium'],
          ['New failures cluster', 'More than 3 new failures in a single run', 'High'],
          ['Grade degradation', 'Average stability grade drops by one letter', 'Low'],
        ],
      },
    },
    {
      heading: 'History File Management',
      body: [
        'The history file grows with each run. By default it retains the last 100 runs. You can adjust retention and manage the file size with these options.',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  historyPath: 'reports/history.json',
  historyRetention: 50,  // keep last 50 runs
}]`,
      },
      note: {
        type: 'info',
        content: 'In CI environments, persist the history file using cache actions or artifact storage to maintain continuity across builds.',
      },
    },
  ],
};
