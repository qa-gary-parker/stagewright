import type { DocPage } from '../types';

export const gettingStarted: DocPage = {
  slug: 'getting-started',
  title: 'Getting Started',
  description: 'Install playwright-smart-reporter and generate your first test report in under five minutes.',
  sections: [
    {
      heading: 'Installation',
      body: [
        'Add the reporter to your Playwright project as a dev dependency. It works with Playwright Test v1.30 and above on Node 18+.',
      ],
      code: {
        language: 'bash',
        content: 'npm install playwright-smart-reporter --save-dev',
      },
      note: {
        type: 'info',
        content: 'You can also use pnpm, yarn, or bun — the package has zero native dependencies.',
      },
    },
    {
      heading: 'Add the Reporter to Your Config',
      body: [
        'Open your playwright.config.ts and add playwright-smart-reporter to the reporter array. The reporter runs alongside the built-in reporters, so you can keep the default list reporter as well.',
      ],
      code: {
        language: 'typescript',
        content: `import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['list'],
    ['playwright-smart-reporter', {
      outputFile: 'smart-report.html',
      title: 'My Test Suite',
    }],
  ],
});`,
      },
    },
    {
      heading: 'Run Your Tests',
      body: [
        'Execute your test suite as normal. When the run finishes, the reporter writes a self-contained HTML file to your project root.',
      ],
      code: {
        language: 'bash',
        content: `npx playwright test

# Open the report
open smart-report.html`,
      },
    },
    {
      heading: 'Understanding the Report',
      body: [
        'The generated report is a single-page application that includes everything the viewer needs — no server required. It contains several key sections that give you full visibility into the test run.',
      ],
      list: {
        items: [
          'Summary dashboard with pass/fail/skip counts and overall duration',
          'AI failure analysis highlighting root causes and patterns',
          'Stability grades ranking every test from A+ to F',
          'Artifact gallery for screenshots, videos, and trace files',
          'Step timeline showing duration breakdowns per test',
          'Trend analytics when historical data is available',
        ],
        icon: 'check',
      },
    },
    {
      heading: 'Configuring Output Location',
      body: [
        'By default the report is written to smart-report.html in your project root. Use the outputFile option to change the filename or the outputDir option to write it to a subdirectory.',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  outputFile: 'test-results/report.html',
  title: 'Regression Suite',
}]`,
      },
    },
    {
      heading: 'Next Steps',
      body: [
        'Now that you have a basic report, explore the Configuration Reference to unlock the full feature set — including AI analysis, run comparison, and CI integration.',
      ],
      list: {
        items: [
          'Upgrade to Pro for AI failure analysis, themes, and quality gates',
          'Enable run comparison to track regressions between builds',
          'Set up CI integration to publish reports automatically',
        ],
        icon: 'arrow',
      },
    },
  ],
};
