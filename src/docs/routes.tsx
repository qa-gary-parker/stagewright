import type { RouteObject } from 'react-router-dom';
import DocsIndex from './DocsIndex.tsx';
import DocsNotFound from './DocsNotFound.tsx';
import DocsPage from './DocsPage.tsx';
import { docsNavigation, allPages } from './content/index.ts';

export const docsRoutes: RouteObject[] = [
  { index: true, element: <DocsIndex /> },
  ...docsNavigation.flatMap((section) =>
    section.items.map((item) => ({
      path: item.slug,
      element: <DocsPage page={allPages[item.slug]} />,
    }))
  ),
  { path: '*', element: <DocsNotFound /> },
];
