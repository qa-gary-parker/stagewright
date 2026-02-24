import type { DocPage } from '../types';

export const stepTimeline: DocPage = {
  slug: 'step-timeline',
  title: 'Step Timeline',
  description: 'Visualise test execution as a step-by-step timeline with duration breakdowns for each action.',
  sections: [
    {
      heading: 'Overview',
      body: [
        'The step timeline breaks down each test into its individual Playwright actions and displays them as a horizontal timeline. Every click, navigation, assertion, and wait is shown with its duration, making it easy to identify which steps are slow or where failures occur.',
      ],
    },
    {
      heading: 'Enabling Step Display',
      body: [
        'Steps are enabled by default. If you have previously disabled them, re-enable with the showSteps option.',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  showSteps: true,
}]`,
      },
    },
    {
      heading: 'Timeline Visualisation',
      body: [
        'Each test\'s timeline is rendered as a series of coloured blocks. The width of each block is proportional to the step\'s duration, giving you an immediate visual sense of where time is spent.',
      ],
      table: {
        headers: ['Colour', 'Step Type', 'Description'],
        rows: [
          ['Blue', 'Navigation', 'page.goto, page.reload, page.goBack'],
          ['Green', 'Assertion', 'expect() calls and assertion helpers'],
          ['Purple', 'Interaction', 'click, fill, type, select, check'],
          ['Orange', 'Wait', 'waitForSelector, waitForResponse, waitForTimeout'],
          ['Grey', 'Other', 'evaluate, route, custom steps'],
          ['Red', 'Failed', 'Any step that threw an error'],
        ],
      },
    },
    {
      heading: 'Duration Breakdown',
      body: [
        'Below the visual timeline, a table shows every step with precise timing data.',
      ],
      list: {
        items: [
          'Step name and Playwright API call',
          'Absolute start time relative to test start',
          'Duration in milliseconds',
          'Percentage of total test time',
          'Status — passed, failed, or skipped',
          'Error message for failed steps (truncated, click to expand)',
        ],
        icon: 'check',
      },
    },
    {
      heading: 'Identifying Slow Steps',
      body: [
        'Steps that take disproportionately long are highlighted with a warning icon. The threshold for "slow" is configurable or defaults to any step taking more than 30% of the total test duration.',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  showSteps: true,
  slowStepThreshold: 5000,  // flag steps longer than 5 seconds
}]`,
      },
      note: {
        type: 'info',
        content: 'Common slow steps include page.goto for initial navigation, waitForResponse for API calls, and screenshot capture operations.',
      },
    },
    {
      heading: 'Custom Test Steps',
      body: [
        'Playwright supports custom test steps via the test.step API. These appear in the timeline just like built-in actions, giving you logical groupings for complex test flows.',
      ],
      code: {
        language: 'typescript',
        content: `import { test, expect } from '@playwright/test';

test('checkout flow', async ({ page }) => {
  await test.step('Add items to cart', async () => {
    await page.goto('/products');
    await page.click('[data-testid="add-to-cart"]');
    await expect(page.locator('.cart-count')).toHaveText('1');
  });

  await test.step('Complete checkout', async () => {
    await page.click('[data-testid="checkout"]');
    await page.fill('#email', 'test@example.com');
    await page.click('[data-testid="place-order"]');
    await expect(page).toHaveURL('/confirmation');
  });
});`,
      },
    },
  ],
};
