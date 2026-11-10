# Tulasi Flex Printing & Arts

Frontend foundation for the Tulasi Flex Printing & Arts website, based on the
provided "Obsidian & Gold Atelier" design handover.

## Requirements

- Node.js 22.12.0 or newer
- npm
- Google Fonts network access for Playfair Display, Plus Jakarta Sans, and
  JetBrains Mono (local fallbacks are configured)

## Getting started

```sh
npm install
npm run dev
```

Vite prints the local development URL after the server starts.

Copy `.env.example` to `.env` and replace `VITE_WHATSAPP_PHONE_NUMBER` with the
business WhatsApp number, including the country code and digits only.

## Available scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build in `dist/`
- `npm run preview` — preview the production build locally

## Public deployment

GitHub Actions builds and publishes the static site to GitHub Pages whenever
changes are pushed to `main`. The project-site base path is configured for
`guruteja1974/tulasi-flex-printing`; React Router uses the same base path for
direct route navigation. The Pages site is public even though the source
repository is private. GitHub plan eligibility is required to publish Pages
from a private repository. Do not add private customer data or credentials to
the frontend bundle.

## Styling

Tailwind CSS v4 is integrated through its official `@tailwindcss/vite` plugin.
Design tokens are defined CSS-first in `src/styles/variables.css` using
`@theme`, then shared with the existing global CSS through CSS custom properties.
No legacy `tailwind.config.js` or separate PostCSS integration is needed.

## Project organization

- `public/` — static files served as-is, including image libraries and icons
- `src/assets/` — assets imported and processed by the application
- `src/components/` — reusable interface components grouped by responsibility
- `src/pages/` — route-level page entry points
- `src/sections/` — reusable page sections, including the Home page
- `src/data/` — structured content for services, portfolio, and testimonials
- `src/routes/` — application route definitions
- `src/styles/` — global styles, design tokens, and responsive rules
- `src/services/`, `src/hooks/`, `src/utils/` — application logic and shared helpers

## Design references and assets

The supplied screenshots and Version 1.1.0 handover are the design references.
The designer's Services and Portfolio HTML files include reference photography;
local copies are organized under `src/assets/images/reference/` and are labeled
in the UI as illustrative, not verified company work. No separate original
Home-page HTML or production company photography was supplied. No customer
projects, team portraits, maps, or certifications have been fabricated. The
temporary text brand remains replaceable when the official logo is supplied.

Pending imagery includes approved company hero/plant machinery, archival and
current facility photography, team portraits, verified portfolio work, and the
approved regional map. Place approved static assets in the corresponding
`public/images/` folder, or import app-managed images from `src/assets/images/`.

All six routes are implemented. The Services page presents the six enquiry
categories; Portfolio includes client-side category filtering; Experience and
About identify historical and team information that still needs confirmation;
Contact includes an accessible FAQ and a preview-only enquiry form. No form
currently transmits or stores submitted information.

Replace designer-reference imagery with approved company photography and
confirm historical milestones, team details, facility capabilities, project
claims, business contact details, and regional travel information before
publication. Configure the WhatsApp number only after the business provides a
verified contact. The current WhatsApp CTA stays disabled without that value.
