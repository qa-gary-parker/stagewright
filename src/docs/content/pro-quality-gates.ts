import type { DocPage } from '../types';

export const proQualityGates: DocPage = {
  slug: 'pro-quality-gates',
  title: 'Quality Gates',
  description: 'Define pass rate thresholds, maximum failure limits, and duration budgets to enforce quality standards.',
  isPro: true,
  sections: [
    {
      heading: 'Overview',
      body: [
        'Quality gates define minimum quality thresholds that a test run must meet. When a gate fails, the reporter sets a non-zero exit code, which causes your CI pipeline to fail the build. This creates an automated quality checkpoint that prevents low-quality releases from progressing.',
      ],
    },
    {
      heading: 'Defining Quality Gates',
      body: [
        'Configure gates in the reporter options. Each gate has a metric, a threshold, and an optional scope.',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  qualityGates: {
    minPassRate: 95,
    maxFailures: 5,
    maxFlakyRate: 10,
    minStabilityGrade: 'B',
    noNewFailures: true,
  },
}]`,
      },
    },
    {
      heading: 'Available Gate Types',
      table: {
        headers: ['Gate', 'Type', 'Description'],
        rows: [
          ['minPassRate', 'number (0-100)', 'Minimum pass rate percentage'],
          ['maxFailures', 'number', 'Maximum number of failing tests allowed'],
          ['maxFlakyRate', 'number (0-100)', 'Maximum percentage of flaky tests'],
          ['minStabilityGrade', "'A' | 'B' | 'C' | 'D'", 'Minimum average stability grade'],
          ['noNewFailures', 'boolean', 'Fail if new failures are detected vs. baseline (requires comparison data)'],
        ],
      },
    },
    {
      heading: 'Gate Evaluation',
      body: [
        'Gates are evaluated after all tests complete and the report is generated. The evaluation results are displayed in the report summary and written to stdout.',
      ],
      code: {
        language: 'text',
        content: `Quality Gates:
  ✓ Pass rate: 97.2% (threshold: ≥ 95%)
  ✓ Failures: 3 (threshold: ≤ 5)
  ✗ Flaky rate: 12.1% (threshold: ≤ 10%)  ← GATE FAILED
  ✓ Stability grade: B (threshold: ≥ B)
  ✓ No new failures

Result: FAILED (1 gate failed)
Exit code: 1`,
      },
      note: {
        type: 'warning',
        content: 'When any gate fails, the reporter exits with code 1. This causes CI builds to fail, which is the intended behaviour.',
      },
    },
    {
      heading: 'CI Integration',
      body: [
        'Quality gates integrate naturally with CI pipelines. The exit code controls whether the build passes or fails.',
      ],
      code: {
        language: 'yaml',
        content: `# GitHub Actions — build fails if gates fail
- name: Run tests with quality gates
  run: npx playwright test
  # Reporter exits with code 1 if any gate fails

# Optional: continue and read the report even if gates fail
- name: Upload report
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: test-report
    path: reports/`,
      },
    },
    {
      heading: 'Gate History',
      body: [
        'The report tracks gate evaluation results over time when history is enabled. This lets you see how close your suite is to the thresholds and whether quality is trending up or down.',
      ],
      list: {
        items: [
          'Gate pass/fail status plotted on the trend chart',
          'Threshold proximity — how close each metric is to the gate limit',
          'Alert when a metric is within 5% of failing a gate',
          'Recommendations for adjusting thresholds based on historical data',
        ],
        icon: 'check',
      },
    },
  ],
};
