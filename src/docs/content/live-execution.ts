import type { DocPage } from '../types';

export const liveExecution: DocPage = {
  slug: 'live-execution',
  title: 'Live Execution',
  description: 'Run, cancel, and filter Playwright tests directly from the report with real-time SSE progress streaming.',
  isPro: true,
  sections: [
    {
      heading: 'Overview',
      body: [
        'The Live tab shows real-time test execution progress streamed via Server-Sent Events (SSE). All tiers see a read-only progress view with pass/fail counters and a failure feed. Starter and Pro tiers unlock interactive controls to run, cancel, and filter tests without leaving the report.',
      ],
    },
    {
      heading: 'How It Works',
      body: [
        'The reporter writes test results to a JSONL file as each test completes. The serve CLI watches this file and streams events to the browser over SSE. The Live tab renders counters, a progress bar, and a scrolling failure feed in real time.',
      ],
      list: {
        items: [
          'Reporter writes events to .smart-live-results.jsonl during the test run',
          'Serve CLI tails the file and pushes each line as an SSE event',
          'Browser renders live counters (passed, failed, flaky, skipped) and a progress bar',
          'Failed tests appear in a scrolling failure feed with error summaries',
          'When the run completes, the page reloads with the full static report',
        ],
        icon: 'arrow',
      },
    },
    {
      heading: 'Enabling Live Mode',
      body: [
        'Add the live option to your reporter configuration, then serve the report with the --live flag.',
      ],
      code: {
        language: 'typescript',
        content: `// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['playwright-smart-reporter', {
      outputFile: 'smart-report.html',
      live: { enabled: true },
    }],
  ],
});`,
      },
    },
    {
      heading: 'Serving with Live Mode',
      body: [
        'Use the serve CLI with the --live and --run-command flags to enable the Run button and SSE streaming.',
      ],
      code: {
        language: 'bash',
        content: `# Serve with live mode and a run command
npx playwright-smart-reporter-serve smart-report.html \\
  --live \\
  --run-command "npx playwright test" \\
  --cwd ./my-project

# Custom live file path
npx playwright-smart-reporter-serve smart-report.html \\
  --live \\
  --live-file ./results/live.jsonl \\
  --run-command "npx playwright test"`,
      },
    },
    {
      heading: 'Free Tier: Read-Only Progress',
      body: [
        'On the free (Local) tier, the Live tab shows real-time progress counters and a failure feed during test execution. Run, cancel, and filter controls are visible but greyed out with a Starter badge on the tab.',
      ],
    },
    {
      heading: 'Starter/Pro: Interactive Controls',
      body: [
        'With a Starter or Pro license, the full set of interactive controls is unlocked.',
      ],
      list: {
        items: [
          'Run Tests button triggers the configured --run-command via the /run endpoint',
          'Cancel button stops a running test execution',
          'Filter widget lets you run a subset of tests by file, tag, or grep pattern',
          'Failure items show "View Details" links that navigate to the Tests tab after completion',
        ],
        icon: 'check',
      },
      note: {
        type: 'pro',
        content: 'Live run/cancel/filter controls require a Starter or Pro license. The run capability is validated server-side on the /run endpoint.',
      },
    },
    {
      heading: 'Failure Feed',
      body: [
        'During execution, failed tests appear in a scrolling feed showing the test title, file path, and the first 500 characters of the error message. After the run completes and the report reloads, failure items become clickable cards with screenshot thumbnails and "View Details" links that navigate to the full test detail in the Tests tab.',
      ],
    },
    {
      heading: 'CLI Reference',
      table: {
        headers: ['Flag', 'Description'],
        rows: [
          ['--live', 'Enable SSE endpoint for live reporting'],
          ['--live-file <path>', 'Path to live results JSONL (default: .smart-live-results.jsonl)'],
          ['--run-command <cmd>', 'Command to execute when the Run button is clicked'],
          ['--cwd <dir>', 'Working directory for --run-command (default: current directory)'],
        ],
      },
    },
  ],
};
