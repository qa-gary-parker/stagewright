import type { DocPage } from '../types';

export const annotations: DocPage = {
  slug: 'annotations',
  title: 'Annotations',
  description: 'Add custom metadata to tests with annotations and see them rendered in the report.',
  sections: [
    {
      heading: 'What Are Annotations?',
      body: [
        'Annotations are key-value metadata attached to tests. Playwright provides several built-in annotations (skip, fixme, fail, slow) and the reporter renders them as badges and filterable tags in the report. You can also add custom annotations for your own categorisation needs.',
      ],
    },
    {
      heading: 'Built-in Playwright Annotations',
      body: [
        'Playwright includes several annotation types out of the box. The reporter displays them prominently in the test list.',
      ],
      table: {
        headers: ['Annotation', 'Effect', 'Report Display'],
        rows: [
          ['test.skip()', 'Skips the test entirely', 'Grey badge with skip reason'],
          ['test.fixme()', 'Marks test as known-broken, skips it', 'Orange badge with fixme label'],
          ['test.fail()', 'Expects the test to fail', 'Red badge with expected-failure label'],
          ['test.slow()', 'Triples the test timeout', 'Yellow badge with slow indicator'],
        ],
      },
      code: {
        language: 'typescript',
        content: `import { test, expect } from '@playwright/test';

test('legacy payment flow', async ({ page }) => {
  test.fixme(true, 'Payment gateway sandbox is down — tracking in JIRA-1234');
  // Test body skipped
});

test('complex data migration', async ({ page }) => {
  test.slow();
  // Test gets 3x the normal timeout
});`,
      },
    },
    {
      heading: 'Custom Annotations',
      body: [
        'Add custom annotations using the test.info().annotations API. These are rendered as tags in the report and can be used for filtering.',
      ],
      code: {
        language: 'typescript',
        content: `import { test, expect } from '@playwright/test';

test('checkout flow', async ({ page }) => {
  test.info().annotations.push(
    { type: 'priority', description: 'P1' },
    { type: 'team', description: 'payments' },
    { type: 'jira', description: 'PAY-456' },
  );

  await page.goto('/checkout');
  // ...
});`,
      },
    },
    {
      heading: 'Annotation Display in the Report',
      body: [
        'The reporter renders annotations in multiple places to maximise visibility.',
      ],
      list: {
        items: [
          'Annotation badges appear next to the test name in the test list',
          'Filter sidebar includes all unique annotation types for quick filtering',
          'Test detail panel shows all annotations with their descriptions',
          'Summary dashboard counts tests by annotation type',
          'CSV export includes annotation data as columns',
        ],
        icon: 'check',
      },
    },
    {
      heading: 'Configuration',
      body: [
        'Control how annotations are displayed in the report with the showAnnotations option.',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  showAnnotations: true,
  annotationTypes: ['priority', 'team', 'jira'],  // only show these custom types
}]`,
      },
      note: {
        type: 'info',
        content: 'Built-in Playwright annotations (skip, fixme, fail, slow) are always shown regardless of the annotationTypes filter.',
      },
    },
    {
      heading: 'Tag-Based Filtering',
      body: [
        'Combine Playwright tags with annotations for powerful test organisation. Tags defined with @tag syntax in test titles are also rendered as filterable badges.',
      ],
      code: {
        language: 'typescript',
        content: `test('checkout flow @smoke @payments', async ({ page }) => {
  // @smoke and @payments are extracted as tags
  await page.goto('/checkout');
});

// Run only tagged tests
// npx playwright test --grep @smoke`,
      },
    },
  ],
};
