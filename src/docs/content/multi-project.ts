import type { DocPage } from '../types';

export const multiProject: DocPage = {
  slug: 'multi-project',
  title: 'Multi-Project Support',
  description: 'Configure the reporter for Playwright multi-project setups with shared or separate reporting.',
  sections: [
    {
      heading: 'Overview',
      body: [
        'Playwright supports multiple project configurations in a single config file — commonly used for testing across different browsers, viewports, or environments. The reporter handles multi-project setups natively, combining results into a single report with project-level filtering.',
      ],
    },
    {
      heading: 'Multi-Project Configuration',
      body: [
        'Define your projects in playwright.config.ts as usual. The reporter is configured once at the top level and applies to all projects.',
      ],
      code: {
        language: 'typescript',
        content: `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['playwright-smart-reporter', {
      outputFile: 'reports/smart-report.html',
      title: 'Cross-Browser Suite',
    }],
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});`,
      },
    },
    {
      heading: 'Report Structure',
      body: [
        'The report aggregates results from all projects into a unified view with project-level breakdowns.',
      ],
      list: {
        items: [
          'Summary dashboard shows pass/fail counts per project',
          'Project filter in the sidebar lets you view one project at a time',
          'Test names include a project prefix badge (e.g., [chromium] Login test)',
          'Comparison view tracks regressions per project independently',
          'Stability grades are calculated per project per test',
        ],
        icon: 'check',
      },
    },
    {
      heading: 'Shared vs Separate Reports',
      body: [
        'By default, all projects are merged into one report. If you prefer separate reports per project, use Playwright\'s built-in project filtering and run the reporter separately.',
      ],
      code: {
        language: 'bash',
        content: `# Single combined report (default)
npx playwright test

# Separate reports per project
npx playwright test --project=chromium
npx playwright test --project=firefox`,
      },
      note: {
        type: 'info',
        content: 'Combined reports are recommended for most teams. They give you a complete picture and let you spot browser-specific failures at a glance.',
      },
    },
    {
      heading: 'Project-Level Configuration',
      body: [
        'You can override reporter options per project by using environment variables or conditional config logic.',
      ],
      code: {
        language: 'typescript',
        content: `const reporterOptions = {
  outputFile: 'reports/smart-report.html',
  title: process.env.PROJECT_NAME
    ? \`\${process.env.PROJECT_NAME} Report\`
    : 'Full Suite Report',
};

export default defineConfig({
  reporter: [
    ['playwright-smart-reporter', reporterOptions],
  ],
  // ...projects
});`,
      },
    },
    {
      heading: 'Aggregated Views',
      body: [
        'The report provides aggregated views that summarise results across all projects.',
      ],
      table: {
        headers: ['View', 'Description'],
        rows: [
          ['Project Matrix', 'Grid showing pass/fail status for each test across all projects'],
          ['Browser Comparison', 'Side-by-side comparison of results per browser project'],
          ['Platform Coverage', 'Visual map of which tests run on which projects'],
          ['Cross-Project Failures', 'Tests that fail on some projects but pass on others'],
        ],
      },
    },
  ],
};
