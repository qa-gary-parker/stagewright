import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { docsRoutes } from './docs/routes.tsx'

const DocsLayout = lazy(() => import('./docs/DocsLayout.tsx'))

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  {
    path: '/docs',
    element: (
      <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center"><div className="text-slate-400">Loading...</div></div>}>
        <DocsLayout />
      </Suspense>
    ),
    children: docsRoutes,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
