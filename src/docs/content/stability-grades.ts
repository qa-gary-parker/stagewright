import type { DocPage } from '../types';

export const stabilityGrades: DocPage = {
  slug: 'stability-grades',
  title: 'Stability Grades',
  description: 'Understand how every test is graded from A to F based on pass rate, flakiness, and duration consistency.',
  sections: [
    {
      heading: 'What Are Stability Grades?',
      body: [
        'Every test in your suite receives a stability grade based on its historical behaviour. Grades range from A (rock solid) to F (consistently failing) and give you an at-a-glance understanding of test health without reading individual results.',
        'Grades are calculated using a weighted formula that considers pass rate, retry frequency, and duration variance over the available history window.',
      ],
    },
    {
      heading: 'Grade Scale',
      table: {
        headers: ['Grade', 'Score Threshold', 'Meaning'],
        rows: [
          ['A', '≥ 90', 'Excellent — highly reliable with minimal variance'],
          ['B', '≥ 80', 'Good — generally stable with occasional issues'],
          ['C', '≥ 70', 'Average — noticeable flakiness or timing issues'],
          ['D', '≥ 60', 'Below average — frequent failures or retries'],
          ['F', '< 60', 'Failing — unreliable and needs immediate attention'],
        ],
      },
    },
    {
      heading: 'How Grades Are Calculated',
      body: [
        'The grade formula uses three weighted components. The default weights are optimized for most test suites but can be adjusted in Pro configurations.',
      ],
      code: {
        language: 'text',
        content: `Grade Score = (passRate × 0.6) + (1 - retryRate) × 0.25 + (1 - durationVariance) × 0.15

Where:
  passRate         = successful runs / total runs
  retryRate        = runs with retries / total runs
  durationVariance = stddev(duration) / mean(duration)`,
      },
      note: {
        type: 'info',
        content: 'When historical data is not available, the grade is based on the current run only. Grades become more accurate as history accumulates over multiple runs.',
      },
    },
    {
      heading: 'Viewing Grades in the Report',
      body: [
        'Grades appear in several places throughout the report to help you quickly assess test health.',
      ],
      list: {
        items: [
          'Summary dashboard shows a grade distribution chart',
          'Test list includes grade badges next to each test name',
          'Filter controls let you filter by grade range (e.g., show only D and F tests)',
          'Trend view shows how grades change over time',
          'Stability leaderboard ranks all tests by grade',
        ],
        icon: 'check',
      },
    },
    {
      heading: 'Using Grades for Quality Decisions',
      body: [
        'Stability grades integrate with quality gates to enforce minimum standards. You can block deployments when the average grade drops below a threshold.',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  qualityGates: {
    minStabilityGrade: 'B',
    minPassRate: 90,
    noNewFailures: true,
  },
}]`,
      },
      note: {
        type: 'pro',
        content: 'Quality gates with grade thresholds are a Pro feature. Free users can view grades but cannot enforce gates.',
      },
    },
    {
      heading: 'Improving Low Grades',
      body: [
        'Tests with low grades typically fall into predictable categories. Address the root cause rather than masking the symptom.',
      ],
      table: {
        headers: ['Problem', 'Common Cause', 'Fix'],
        rows: [
          ['Low pass rate', 'Brittle selectors or timing issues', 'Use data-testid attributes and explicit waits'],
          ['High retry rate', 'Flaky test depending on external state', 'Isolate test data and mock external services'],
          ['High duration variance', 'Network latency or resource contention', 'Use request interception or run serially'],
        ],
      },
    },
  ],
};
