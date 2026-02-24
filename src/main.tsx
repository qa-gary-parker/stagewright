import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import DocsLayout from './docs/DocsLayout.tsx'
import { docsRoutes } from './docs/routes.tsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  {
    path: '/docs',
    element: <DocsLayout />,
    children: docsRoutes,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
