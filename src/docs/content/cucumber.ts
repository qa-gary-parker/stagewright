import type { DocPage } from '../types';

export const cucumber: DocPage = {
  slug: 'cucumber',
  title: 'Cucumber Integration',
  description: 'Display Gherkin features, scenarios, and steps in the report using the Cucumber integration.',
  sections: [
    {
      heading: 'Overview',
      body: [
        'If your team uses Behaviour-Driven Development (BDD) with Cucumber and Playwright, the reporter can display Gherkin feature files, scenarios, and steps alongside the standard test results. This gives stakeholders a readable view of test coverage in business language.',
      ],
    },
    {
      heading: 'Prerequisites',
      body: [
        'The Cucumber integration requires @cucumber/cucumber and playwright-bdd or a similar Playwright-Cucumber bridge.',
      ],
      code: {
        language: 'bash',
        content: `npm install @cucumber/cucumber playwright-bdd --save-dev`,
      },
      list: {
        items: [
          'Node.js 18 or later',
          '@playwright/test v1.30+',
          '@cucumber/cucumber v10+',
          'playwright-bdd or equivalent adapter',
        ],
        icon: 'check',
      },
    },
    {
      heading: 'Configuration',
      body: [
        'Enable the Cucumber display mode in the reporter options. The reporter will parse Gherkin metadata from test annotations.',
      ],
      code: {
        language: 'typescript',
        content: `import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['playwright-smart-reporter', {
      cucumber: {
        enabled: true,
        featuresPath: 'features/',
        showGherkin: true,
      },
    }],
  ],
});`,
      },
    },
    {
      heading: 'Feature and Scenario Display',
      body: [
        'When Cucumber mode is enabled, the report organises tests by feature file and scenario rather than by spec file. Each feature is collapsible and shows its full Gherkin text.',
      ],
      table: {
        headers: ['Element', 'Display'],
        rows: [
          ['Feature', 'Collapsible header with feature name and description'],
          ['Scenario', 'Test entry with Given/When/Then steps visible'],
          ['Scenario Outline', 'Expanded with one entry per example row'],
          ['Background', 'Shown as a shared setup section within the feature'],
          ['Tags', 'Rendered as filterable badges (@smoke, @regression, etc.)'],
        ],
      },
    },
    {
      heading: 'Step Mapping',
      body: [
        'Each Gherkin step (Given, When, Then, And, But) maps to a Playwright test step. The timeline view shows both the Gherkin text and the underlying Playwright actions.',
      ],
      code: {
        language: 'gherkin',
        content: `Feature: User Login
  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter "testuser@example.com" as the email
    And I enter "SecurePass123" as the password
    And I click the login button
    Then I should see the dashboard
    And the welcome message should say "Hello, Test User"`,
      },
      note: {
        type: 'info',
        content: 'The reporter preserves the Gherkin keywords (Given, When, Then) for readability while linking each step to its implementation duration and status.',
      },
    },
    {
      heading: 'BDD-Specific Metrics',
      body: [
        'The summary dashboard includes BDD-specific metrics when Cucumber mode is active.',
      ],
      list: {
        items: [
          'Feature pass rate — percentage of features where all scenarios pass',
          'Scenario count — total, passed, failed, and skipped scenarios',
          'Step success rate — percentage of individual steps that execute successfully',
          'Undefined steps — Gherkin steps with no matching step definition',
          'Tag coverage — which tags have full test coverage',
        ],
        icon: 'check',
      },
    },
  ],
};
