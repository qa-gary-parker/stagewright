import type { DocPage } from '../types';

export const keyboardShortcuts: DocPage = {
  slug: 'keyboard-shortcuts',
  title: 'Keyboard Shortcuts',
  description: 'Navigate the report efficiently with keyboard shortcuts for filtering, expanding, and navigating.',
  sections: [
    {
      heading: 'Overview',
      body: [
        'The HTML report supports comprehensive keyboard navigation for power users who prefer to browse results without reaching for the mouse. Shortcuts cover navigation, filtering, expansion, and utility actions.',
      ],
    },
    {
      heading: 'Navigation Shortcuts',
      table: {
        headers: ['Shortcut', 'Action'],
        rows: [
          ['j / Down Arrow', 'Move to the next test in the list'],
          ['k / Up Arrow', 'Move to the previous test in the list'],
          ['Enter', 'Open/close the selected test details panel'],
          ['g g', 'Jump to the top of the test list'],
          ['G', 'Jump to the bottom of the test list'],
          ['Tab', 'Move focus to the next section'],
          ['Shift + Tab', 'Move focus to the previous section'],
        ],
      },
    },
    {
      heading: 'Filter Shortcuts',
      table: {
        headers: ['Shortcut', 'Action'],
        rows: [
          ['f', 'Focus the search/filter input'],
          ['1', 'Show all tests'],
          ['2', 'Show only passed tests'],
          ['3', 'Show only failed tests'],
          ['4', 'Show only skipped tests'],
          ['5', 'Show only flaky tests'],
          ['Escape', 'Clear active filters and search'],
        ],
      },
    },
    {
      heading: 'Expansion and Collapse',
      table: {
        headers: ['Shortcut', 'Action'],
        rows: [
          ['e', 'Expand all test entries'],
          ['c', 'Collapse all test entries'],
          ['x', 'Toggle expand/collapse on the selected test'],
          ['s', 'Toggle the step timeline for the selected test'],
          ['n', 'Toggle network logs for the selected test'],
          ['a', 'Toggle artifacts panel for the selected test'],
        ],
      },
    },
    {
      heading: 'Utility Shortcuts',
      table: {
        headers: ['Shortcut', 'Action'],
        rows: [
          ['?', 'Open the keyboard shortcuts help overlay'],
          ['/', 'Focus the search bar (same as f)'],
          ['t', 'Toggle between light and dark theme'],
          ['p', 'Toggle the project filter sidebar'],
          ['d', 'Open the summary dashboard'],
          ['h', 'Open the history/trends panel'],
        ],
      },
    },
    {
      heading: 'Customisation',
      body: [
        'Keyboard shortcuts can be customised or disabled entirely via the reporter config. This is useful if shortcuts conflict with browser extensions or accessibility tools.',
      ],
      code: {
        language: 'typescript',
        content: `['playwright-smart-reporter', {
  keyboard: {
    enabled: true,
    custom: {
      'nextTest': 'n',      // remap from j
      'prevTest': 'p',      // remap from k
      'toggleTheme': null,  // disable theme toggle shortcut
    },
  },
}]`,
      },
      note: {
        type: 'info',
        content: 'Press ? at any time while viewing the report to see the full shortcut reference overlay with your current key mappings.',
      },
    },
  ],
};
