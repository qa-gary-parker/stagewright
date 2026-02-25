import type { DocPage } from '../types';

export const proBranding: DocPage = {
  slug: 'pro-branding',
  title: 'Report Branding',
  description: 'Add your company logo, name, and custom styling to generated reports.',
  isPro: true,
  sections: [
    {
      heading: 'Overview',
      body: [
        'Report branding lets you customise the report header with your company logo, title, and footer text. This is particularly useful when sharing reports with stakeholders, clients, or cross-functional teams who expect a polished, professional presentation.',
      ],
    },
    {
      heading: 'Branding Configuration',
      body: [
        'Configure branding using the branding object in your reporter options. All fields are optional.',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  branding: {
    logo: './assets/company-logo.svg',
    title: 'Acme Corp',
    footer: 'QA Team',
    hidePoweredBy: true,
  },
}]`,
      },
      table: {
        headers: ['Property', 'Type', 'Description'],
        rows: [
          ['logo', 'string', 'Path or URL to a logo image. Local files are embedded as base64.'],
          ['title', 'string', 'Company or team name displayed in the report header'],
          ['footer', 'string', 'Text rendered in the report footer'],
          ['hidePoweredBy', 'boolean', 'Remove the "Powered by StageWright" attribution'],
        ],
      },
      note: {
        type: 'info',
        content: 'SVG logos are recommended for best quality at all screen sizes. PNG and JPEG are also supported.',
      },
    },
    {
      heading: 'Combining Branding with Themes',
      body: [
        'Combine branding with a custom theme for a fully branded report experience.',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  theme: { preset: 'ocean' },
  branding: {
    logo: './assets/logo.svg',
    title: 'Acme Corp',
    footer: 'E2E Test Report — QA Team',
    hidePoweredBy: true,
  },
}]`,
      },
      list: {
        items: [
          'Logo appears in the top-left corner of the header',
          'Title renders next to the logo in the configured theme colours',
          'Footer content renders at the bottom of the report',
          'hidePoweredBy removes the StageWright attribution link',
        ],
        icon: 'check',
      },
    },
    {
      heading: 'Branding in Exports',
      body: [
        'Branding elements carry through to all export formats. PDF exports include the logo on the cover page, and JSON exports include branding in the report metadata object.',
      ],
      note: {
        type: 'pro',
        content: 'Report branding requires a Starter or Pro license. Without a license, branding options are silently ignored.',
      },
    },
  ],
};
