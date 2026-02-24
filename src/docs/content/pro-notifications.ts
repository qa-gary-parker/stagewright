import type { DocPage } from '../types';

export const proNotifications: DocPage = {
  slug: 'pro-notifications',
  title: 'Advanced Notifications',
  description: 'Send test results to Slack, Microsoft Teams, and custom webhooks with configurable rules.',
  isPro: true,
  sections: [
    {
      heading: 'Overview',
      body: [
        'Advanced notifications push test results to your team communication channels automatically. Configure rules to control when notifications fire — for example, only on failure, only when quality gates fail, or only for specific projects.',
      ],
    },
    {
      heading: 'Slack Integration',
      body: [
        'Connect to Slack using an incoming webhook URL. The notification includes a summary card with pass/fail counts, duration, and a link to the full report.',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  notifications: {
    slack: {
      webhookUrl: process.env.SLACK_WEBHOOK_URL,
      channel: '#qa-results',
      mentionOnFailure: ['@qa-team'],
    },
  },
}]`,
      },
      note: {
        type: 'info',
        content: 'Store the webhook URL as a CI secret. Never commit it to your repository.',
      },
    },
    {
      heading: 'Microsoft Teams',
      body: [
        'Send notifications to Microsoft Teams via an incoming webhook connector.',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  notifications: {
    teams: {
      webhookUrl: process.env.TEAMS_WEBHOOK_URL,
      mentionOnFailure: ['qa-team@example.com'],
    },
  },
}]`,
      },
    },
    {
      heading: 'Notification Rules',
      body: [
        'Control when notifications are sent using rules. By default, notifications fire on every run. Use rules to reduce noise.',
      ],
      table: {
        headers: ['Rule', 'Type', 'Description'],
        rows: [
          ['always', 'boolean', 'Send on every run regardless of status'],
          ['onFailure', 'boolean', 'Send only when at least one test fails'],
          ['onGateFailure', 'boolean', 'Send only when a quality gate fails'],
          ['onRegression', 'boolean', 'Send only when new failures are detected vs. baseline'],
          ['minFailures', 'number', 'Send only when failure count exceeds threshold'],
          ['branches', 'string[]', 'Send only for specific branch names'],
        ],
      },
      code: {
        language: 'typescript',
        content: `notifications: {
  slack: {
    webhookUrl: process.env.SLACK_WEBHOOK_URL,
    rules: {
      onFailure: true,
      onGateFailure: true,
      onRegression: true,
      branches: ['main', 'release/*'],
    },
  },
}`,
      },
    },
    {
      heading: 'Custom Webhooks',
      body: [
        'Send notifications to any HTTP endpoint using the generic webhook configuration. The payload is a JSON object with the full report summary.',
      ],
      code: {
        language: 'typescript',
        content: `notifications: {
  webhook: {
    url: 'https://api.example.com/test-results',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + process.env.WEBHOOK_TOKEN,
      'Content-Type': 'application/json',
    },
    rules: {
      onFailure: true,
    },
  },
}`,
      },
    },
    {
      heading: 'Notification Content',
      body: [
        'Every notification includes a structured summary of the test run. The exact formatting adapts to each platform.',
      ],
      list: {
        items: [
          'Pass/fail/flaky/skip counts with colour-coded indicators',
          'Total suite duration',
          'Quality gate status (pass/fail)',
          'New failures and regressions from run comparison',
          'Link to the full HTML report (if published)',
          'Build metadata — commit, branch, and CI build URL',
        ],
        icon: 'check',
      },
    },
  ],
};
