# StageWright Landing Page

Landing page and marketing site for [stagewright.dev](https://stagewright.dev) — the home of [playwright-smart-reporter](https://www.npmjs.com/package/playwright-smart-reporter).

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Routing:** React Router DOM v7
- **Email:** Resend (license delivery)
- **Payments:** LemonSqueezy (checkout + webhooks)
- **Hosting:** Vercel

## Structure

```
stagewright-landing/
├── api/webhook/              # Vercel serverless functions
│   └── lemonsqueezy.ts       # LemonSqueezy webhook → license generation + email
├── src/
│   ├── components/
│   │   ├── Navbar.tsx        # Sticky nav with mobile hamburger
│   │   ├── Hero.tsx          # Main hero with CTAs
│   │   ├── Features.tsx      # Feature grid with Pro badges
│   │   ├── Demo.tsx          # Interactive tabbed demo
│   │   ├── Pricing.tsx       # Local/Starter/Pro tiers with Cloud coming soon
│   │   ├── EmailSignup.tsx   # Get Started section with install guide
│   │   ├── Footer.tsx        # Columnar footer with links
│   │   └── ProBadge.tsx      # Reusable Pro badge component
│   ├── docs/
│   │   ├── content/          # 25 docs pages as typed data objects
│   │   ├── DocsLayout.tsx    # Fixed sidebar + content area
│   │   ├── DocsSidebar.tsx   # Collapsible nav with active states
│   │   ├── DocsPage.tsx      # Generic page renderer
│   │   ├── DocsIndex.tsx     # Docs landing page
│   │   ├── routes.tsx        # React Router route mapping
│   │   └── types.ts          # Content type definitions
│   ├── App.tsx
│   ├── main.tsx              # createBrowserRouter setup
│   └── index.css
├── vercel.json               # SPA rewrite rules
└── package.json
```

## Purchase Flow

1. Customer clicks "Get Starter" or "Get Pro" → LemonSqueezy checkout
2. LemonSqueezy sends `order_created` webhook → `/api/webhook/lemonsqueezy`
3. Webhook generates ES256 JWT license key
4. Resend delivers license key + setup instructions via email
5. Customer adds key to env var or Playwright config → paid features unlock

## Environment Variables (Vercel)

| Variable | Purpose |
|---|---|
| `LICENSE_PRIVATE_KEY` | ES256 private key for signing license JWTs |
| `LEMONSQUEEZY_WEBHOOK_SECRET` | HMAC-SHA256 webhook signature verification |
| `RESEND_API_KEY` | Email delivery of license keys |
| `OPENAI_API_KEY` | OpenAI API key for AI failure analysis |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL for rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token for rate limiting |

## Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # TypeScript check + Vite production build
npm run preview   # Preview production build
```

## Docs

The `/docs` area covers 25 pages across 4 sections:

- **Getting Started** — Installation, configuration reference
- **Core Features** — AI analysis, stability grades, trends, artifacts, trace viewer, etc.
- **Integrations** — CI, annotations, multi-project, Cucumber, CLI tools, keyboard shortcuts
- **Pro Features** — Themes, branding, exports, quality gates, quarantine, notifications, AI config

All content is typed TypeScript data (no markdown library needed). Pro pages show inline badges in the sidebar.
