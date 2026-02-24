import type { DocPage } from '../types';

export const traceViewer: DocPage = {
  slug: 'trace-viewer',
  title: 'Trace Viewer',
  description: 'Replay test executions step by step with the integrated Playwright trace viewer.',
  sections: [
    {
      heading: 'Overview',
      body: [
        'The trace viewer integration lets you replay failing tests step by step directly from the report. Each trace captures the full timeline of actions, network requests, console messages, and DOM snapshots — giving you a complete picture of what happened during execution.',
      ],
    },
    {
      heading: 'Enabling Trace Capture',
      body: [
        'Configure trace capture in your Playwright config. The reporter automatically detects trace files and adds viewer links to the corresponding tests.',
      ],
      code: {
        language: 'typescript',
        content: `import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    trace: 'retain-on-failure',
  },
  reporter: [
    ['playwright-smart-reporter', {
      showAttachments: true,
    }],
  ],
});`,
      },
      note: {
        type: 'info',
        content: 'Using retain-on-failure is recommended for CI. The on option captures traces for all tests, which significantly increases report size and execution time.',
      },
    },
    {
      heading: 'Viewing Traces in the Report',
      body: [
        'When a test has an associated trace file, a "View Trace" button appears in the test details panel. Clicking it opens the Playwright Trace Viewer in a new tab with the trace pre-loaded.',
      ],
      list: {
        items: [
          'Action timeline shows every Playwright command with duration',
          'DOM snapshots let you inspect the page state at each step',
          'Network tab displays all HTTP requests with timing waterfall',
          'Console tab shows browser console output with log levels',
          'Source tab links actions back to your test source code',
        ],
        icon: 'check',
      },
    },
    {
      heading: 'Trace File Handling',
      body: [
        'Trace files (.zip) can be large. The reporter provides options to manage how traces are included in the report.',
      ],
      table: {
        headers: ['Mode', 'Description', 'Best For'],
        rows: [
          ['embedded', 'Trace data is base64-encoded into the HTML', 'Small suites, offline viewing'],
          ['linked', 'Traces stay as separate files, referenced by path', 'Large suites, CI artifacts'],
          ['cloud', 'Traces are uploaded to StageWright Cloud', 'Teams, shared debugging'],
        ],
      },
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  traceMode: 'linked',  // 'embedded' | 'linked' | 'cloud'
  tracesDir: 'test-results/traces/',
}]`,
      },
    },
    {
      heading: 'Debugging with Traces',
      body: [
        'Traces are the most powerful debugging tool for Playwright tests. Here is a practical workflow for using them effectively.',
      ],
      list: {
        items: [
          'Open the trace from the failing test in the report',
          'Navigate to the failing action in the timeline',
          'Inspect the DOM snapshot at that point to understand the page state',
          'Check the network tab for failed or slow API calls',
          'Review the console tab for JavaScript errors',
          'Compare against a passing trace from a previous run if available',
        ],
        icon: 'arrow',
      },
    },
    {
      heading: 'Trace Viewer Keyboard Shortcuts',
      table: {
        headers: ['Shortcut', 'Action'],
        rows: [
          ['Left / Right', 'Navigate between actions'],
          ['Enter', 'Expand action details'],
          ['N', 'Jump to network tab'],
          ['C', 'Jump to console tab'],
          ['S', 'Jump to source tab'],
          ['Escape', 'Close detail panel'],
        ],
      },
    },
  ],
};
