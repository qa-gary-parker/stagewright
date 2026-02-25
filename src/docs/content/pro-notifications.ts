import type { DocPage } from '../types';

export const proNotifications: DocPage = {
  slug: 'pro-notifications',
  title: 'Advanced Notifications',
  description: 'Send test results to Slack, Microsoft Teams, PagerDuty, email, and custom webhooks with configurable conditions.',
  isPro: true,
  sections: [
    {
      heading: 'Overview',
      body: [
        'Advanced notifications push test results to your team communication channels automatically. Configure conditions to control when notifications fire — for example, only when a minimum number of failures occur, when the pass rate drops below a threshold, or when stability grades degrade.',
      ],
    },
    {
      heading: 'Configuration',
      body: [
        'Notifications are configured as an array of NotificationConfig objects. Each entry specifies a channel, its connection config, and optional conditions.',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  notifications: [
    {
      channel: 'slack',
      config: { webhookUrl: process.env.SLACK_WEBHOOK_URL },
      conditions: { minFailures: 1 },
    },
    {
      channel: 'teams',
      config: { webhookUrl: process.env.TEAMS_WEBHOOK_URL },
      conditions: { maxPassRate: 90 },
    },
  ],
}]`,
      },
      note: {
        type: 'info',
        content: 'For simple setups, you can also use the top-level slackWebhook and teamsWebhook shortcuts which send on every run.',
      },
    },
    {
      heading: 'Supported Channels',
      table: {
        headers: ['Channel', 'Config Keys', 'Description'],
        rows: [
          ['slack', 'webhookUrl', 'Slack incoming webhook'],
          ['teams', 'webhookUrl', 'Microsoft Teams incoming webhook'],
          ['pagerduty', 'routingKey', 'PagerDuty Events API v2'],
          ['email', 'to, from, smtpUrl', 'Email delivery via SMTP'],
          ['webhook', 'url, method, headers', 'Generic HTTP webhook with JSON payload'],
        ],
      },
    },
    {
      heading: 'Notification Conditions',
      body: [
        'Use conditions to control when a notification fires. If no conditions are set, the notification sends on every run.',
      ],
      table: {
        headers: ['Condition', 'Type', 'Description'],
        rows: [
          ['minFailures', 'number', 'Send only when failure count meets or exceeds this threshold'],
          ['maxPassRate', 'number (0-100)', 'Send only when pass rate drops to or below this percentage'],
          ['tags', 'string[]', 'Send only when failing tests include any of these tags'],
          ['stabilityGradeDrop', 'boolean', 'Send when the average stability grade drops from the previous run'],
        ],
      },
    },
    {
      heading: 'Slack Example',
      body: [
        'Connect to Slack using an incoming webhook URL. The notification includes a summary card with pass/fail counts, duration, and quality gate status.',
      ],
      code: {
        language: 'typescript',
        content: `notifications: [
  {
    channel: 'slack',
    config: { webhookUrl: process.env.SLACK_WEBHOOK_URL },
    conditions: {
      minFailures: 3,
      stabilityGradeDrop: true,
    },
  },
]`,
      },
      note: {
        type: 'info',
        content: 'Store the webhook URL as a CI secret. Never commit it to your repository.',
      },
    },
    {
      heading: 'Custom Webhooks',
      body: [
        'Send notifications to any HTTP endpoint using the generic webhook channel. The payload is a JSON object with the full report summary.',
      ],
      code: {
        language: 'typescript',
        content: `notifications: [
  {
    channel: 'webhook',
    config: {
      url: 'https://api.example.com/test-results',
      method: 'POST',
      headers: JSON.stringify({
        'Authorization': 'Bearer ' + process.env.WEBHOOK_TOKEN,
      }),
    },
    conditions: { minFailures: 1 },
  },
]`,
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
