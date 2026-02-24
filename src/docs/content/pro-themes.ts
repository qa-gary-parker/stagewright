import type { DocPage } from '../types';

export const proThemes: DocPage = {
  slug: 'pro-themes',
  title: 'Pro Themes',
  description: 'Customise the report appearance with six built-in themes or create your own.',
  isPro: true,
  sections: [
    {
      heading: 'Overview',
      body: [
        'Pro themes transform the visual appearance of your test reports. Choose from six professionally designed themes or configure custom colours to match your brand. Themes affect the entire report including charts, badges, code blocks, and the navigation sidebar.',
      ],
    },
    {
      heading: 'Available Themes',
      table: {
        headers: ['Theme', 'Style', 'Best For'],
        rows: [
          ['ocean', 'Teal and aqua palette with light backgrounds', 'Clean, modern team environments'],
          ['sunset', 'Warm oranges and reds with dark backgrounds', 'High contrast, visibility in presentations'],
          ['dracula', 'Purple and pink palette with dark background', 'Developer-focused, classic dark aesthetic'],
          ['cyberpunk', 'Vibrant neon gradients with deep dark background', 'High-energy, futuristic dashboards'],
          ['forest', 'Green tones with earthy accents', 'Nature-inspired, calming aesthetic'],
          ['rose', 'Pink and rose palette with dark background', 'Warm, modern aesthetic'],
        ],
      },
    },
    {
      heading: 'Configuration',
      body: [
        'Set the theme in your reporter options. The theme applies to the generated HTML report.',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  theme: { preset: 'ocean' },
}]`,
      },
      note: {
        type: 'pro',
        content: 'Themes require a valid Pro license. Without a license, the default theme is used.',
      },
    },
    {
      heading: 'Custom Theme Properties',
      body: [
        'For teams that need precise brand alignment, the corporate theme accepts custom colour overrides.',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  theme: {
    primary: '#1a56db',
    accent: '#7c3aed',
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#1e293b',
    success: '#059669',
    error: '#dc2626',
    warning: '#d97706',
  },
}]`,
      },
    },
    {
      heading: 'Theme Preview',
      body: [
        'Each theme applies a consistent design language across all report components.',
      ],
      list: {
        items: [
          'Header and navigation sidebar background and text colours',
          'Test status badges (pass, fail, flaky, skip) colour scheme',
          'Chart and graph colours for trends and distributions',
          'Code block syntax highlighting palette',
          'Table striping and border colours',
          'Tooltip and modal overlay styles',
        ],
        icon: 'check',
      },
    },
    {
      heading: 'Theme Switching in the Report',
      body: [
        'Viewers can temporarily switch themes while browsing the report using the theme toggle in the top-right corner. This does not change the default theme — it only applies to the current viewing session.',
      ],
      note: {
        type: 'info',
        content: 'Press T while viewing the report to cycle through available themes quickly.',
      },
    },
  ],
};
