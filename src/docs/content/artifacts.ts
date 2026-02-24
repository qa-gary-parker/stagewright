import type { DocPage } from '../types';

export const artifacts: DocPage = {
  slug: 'artifacts',
  title: 'Artifact Gallery',
  description: 'View screenshots, videos, and trace files captured during test execution in an interactive gallery.',
  sections: [
    {
      heading: 'Overview',
      body: [
        'The artifact gallery collects all screenshots, videos, and trace files generated during a test run and presents them in a browsable, filterable interface. Each artifact is linked to its originating test and step, so you can quickly understand the context of a failure.',
      ],
    },
    {
      heading: 'Screenshot Capture',
      body: [
        'Playwright captures screenshots automatically on failure when configured. The reporter embeds these directly in the HTML report — no external hosting required.',
      ],
      code: {
        language: 'typescript',
        content: `import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    screenshot: 'only-on-failure',
    // or 'on' to capture for every test
  },
  reporter: [
    ['playwright-smart-reporter', {
      showAttachments: true,
    }],
  ],
});`,
      },
      list: {
        items: [
          'Failure screenshots shown inline with the test result',
          'Click any screenshot to open a full-resolution lightbox viewer',
          'Compare screenshots side by side across runs',
          'Filter gallery by test status (failed, flaky, all)',
        ],
        icon: 'check',
      },
    },
    {
      heading: 'Video Recording',
      body: [
        'Test videos provide a full replay of what happened during execution. This is invaluable for debugging timing issues, animations, and complex user flows.',
      ],
      code: {
        language: 'typescript',
        content: `use: {
  video: 'retain-on-failure',
  // Options: 'off', 'on', 'retain-on-failure', 'on-first-retry'
}`,
      },
      note: {
        type: 'info',
        content: 'Videos are embedded as base64 in the HTML report. For large suites with many videos, consider using retain-on-failure to keep report size manageable.',
      },
    },
    {
      heading: 'Trace File Management',
      body: [
        'Playwright traces capture a detailed timeline of every action, network request, and console message during a test. The reporter integrates with the Playwright Trace Viewer for in-browser playback.',
      ],
      code: {
        language: 'typescript',
        content: `use: {
  trace: 'retain-on-failure',
  // Options: 'off', 'on', 'retain-on-failure', 'on-first-retry'
}`,
      },
    },
    {
      heading: 'Gallery Navigation',
      body: [
        'The gallery supports filtering, sorting, and keyboard navigation to help you find specific artifacts quickly.',
      ],
      table: {
        headers: ['Action', 'Control'],
        rows: [
          ['Filter by test name', 'Search bar at the top of the gallery'],
          ['Filter by type', 'Toggle buttons: Screenshots, Videos, Traces'],
          ['Filter by status', 'Toggle buttons: Failed, Flaky, Passed, All'],
          ['Sort artifacts', 'By test name, timestamp, or file size'],
          ['Navigate lightbox', 'Arrow keys or swipe gestures'],
          ['Close lightbox', 'Escape key or click outside'],
        ],
      },
    },
    {
      heading: 'Custom Attachments',
      body: [
        'You can attach custom files to any test using the Playwright test info API. The reporter will include them in the gallery alongside built-in artifacts.',
      ],
      code: {
        language: 'typescript',
        content: `import { test } from '@playwright/test';

test('visual regression', async ({ page }, testInfo) => {
  await page.goto('/dashboard');

  // Attach a custom screenshot
  const screenshot = await page.screenshot();
  await testInfo.attach('dashboard-state', {
    body: screenshot,
    contentType: 'image/png',
  });
});`,
      },
    },
  ],
};
