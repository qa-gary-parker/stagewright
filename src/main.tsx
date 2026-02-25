import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { docsRoutes } from './docs/routes.tsx'

const DocsLayout = lazy(() => import('./docs/DocsLayout.tsx'))
const LegalLayout = lazy(() => import('./components/LegalLayout.tsx'))
const Privacy = lazy(() => import('./pages/Privacy.tsx'))
const Terms = lazy(() => import('./pages/Terms.tsx'))

const suspenseFallback = (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <div className="text-slate-400">Loading...</div>
  </div>
)

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  {
    path: '/docs',
    element: (
      <Suspense fallback={suspenseFallback}>
        <DocsLayout />
      </Suspense>
    ),
    children: docsRoutes,
  },
  {
    element: (
      <Suspense fallback={suspenseFallback}>
        <LegalLayout />
      </Suspense>
    ),
    children: [
      { path: '/privacy', element: <Suspense fallback={suspenseFallback}><Privacy /></Suspense> },
      { path: '/terms', element: <Suspense fallback={suspenseFallback}><Terms /></Suspense> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
