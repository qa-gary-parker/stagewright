# StageWright Landing Page

Landing page for [stagewright.dev](https://stagewright.dev) - a test reporting dashboard for Playwright.

## Project Status

**Current State:** MVP Complete - Ready for deployment

The landing page is feature-complete with email waitlist signup functionality. All content has been reviewed for accuracy and realism.

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS v4 (with `@tailwindcss/postcss`)
- **Animations:** Framer Motion
- **Icons:** Custom SVG icons (Heroicons-style)

## Components

| Component | Description |
|-----------|-------------|
| `Hero.tsx` | Main hero section with animated background blobs, headline, and CTA buttons |
| `Features.tsx` | 9-feature grid showcasing product capabilities, CI integrations, cloud storage, and roadmap |
| `Demo.tsx` | Interactive tabbed demo with 4 views: AI Analysis, Test Results, Dashboard, Gallery |
| `EmailSignup.tsx` | Waitlist signup form with email/company fields, stores to localStorage |
| `Footer.tsx` | Site footer with navigation links and legal |

## Features Showcased

### Current/Planned Features
- AI-Powered Analysis (failure clustering, root cause detection)
- Stability Grades (A+ to F scoring)
- Run Comparison
- One-Click Trace Viewer
- Performance Tracking
- Retry Analysis
- Artifact Gallery (screenshots, videos, traces)
- Slack & Teams Alerts
- Trend Analytics

### CI Integrations
- GitHub Actions
- GitLab CI
- CircleCI
- Jenkins

### Cloud Storage
- AWS S3
- Cloudflare R2
- MinIO
- Any S3-compatible storage

### Roadmap (Coming Soon)
- GitHub PR Comments (In Development)
- VS Code Extension (Planned)
- Smart Test Selection (Planned)
- Team Dashboard (Planned)

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Design References

The design draws inspiration from:
- [ready.so](https://ready.so) - Clean typography, tight letter-spacing
- [superlist.com](https://www.superlist.com) - Card hover effects, gradient backgrounds

## Open TODOs

### Landing Page
- [ ] Connect email signup to actual backend/API (currently stores to localStorage)
- [ ] Add real domain and deploy to stagewright.dev
- [ ] Set up analytics tracking
- [ ] Add meta tags and Open Graph images for social sharing

### Parent Project (playwright-smart-reporter)
- [ ] Implement S3 attachment storage (paused during landing page work)

## File Structure

```
stagewright-landing/
├── src/
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Demo.tsx
│   │   ├── EmailSignup.tsx
│   │   └── Footer.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Notes

- All inflated/unverified statistics have been removed to maintain credibility
- The demo section shows mockups of the product interface, not actual screenshots
- Email signups are stored in localStorage under key `stagewright-waitlist` until backend integration
