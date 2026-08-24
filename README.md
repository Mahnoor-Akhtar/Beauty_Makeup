# Beauty Saloon

A premium beauty e-commerce web experience built with TanStack Start, React, TypeScript, and Vite.

The project focuses on cinematic visuals, smooth navigation, and a boutique-style shopping flow for beauty products.

## Highlights

- Editorial, luxury-inspired storefront experience
- Video-rich landing sections and polished UI interactions
- Product browsing by category
- Cart and wishlist state management hooks
- Reusable component architecture with UI primitives
- Cloudflare-ready server entry via TanStack React Start

## Tech Stack

- React 19
- TypeScript
- Vite 7
- TanStack Router + TanStack React Start
- Tailwind CSS 4
- Radix UI primitives
- Cloudflare Vite plugin + Wrangler config

## Project Structure

```text
src/
  routes/         Route pages (home, shop, about, contact, checkout)
  components/     Reusable UI and feature components
  components/ui/  UI primitives and controls
  hooks/          Client-side state hooks (cart, wishlist, mobile)
  lib/            Shared utilities and product data
  assets/         Local media assets
public/videos/    Public video files
```

## Getting Started

### Prerequisites

- Node.js 20+
- Bun (recommended, lockfile is included)

### Install Dependencies

```bash
bun install
```

### Start Development Server

```bash
bun run dev
```

The app runs in Vite dev mode with TanStack Start integration.

## Available Scripts

```bash
bun run dev         # Start local development server
bun run build       # Build for production
bun run build:dev   # Build in development mode
bun run preview     # Preview production build locally
bun run lint        # Run ESLint
bun run format      # Run Prettier
```

## Build and Preview

```bash
bun run build
bun run preview
```

## Deployment Notes

This project includes Wrangler configuration for Cloudflare-compatible deployment:

- Main entry: `@tanstack/react-start/server-entry`
- Compatibility date and Node.js compatibility flags are configured in `wrangler.jsonc`

If you deploy to Cloudflare Workers, ensure your account/project settings match the local Wrangler configuration.

## UI and Branding Notes

- The current implementation uses a high-end editorial visual language.
- Product and visual assets are managed through `src/lib/products.ts`, `src/assets/`, and `public/videos/`.
- Keep typography, motion, and media quality consistent when adding new pages/components.

## Code Quality

- Linting: ESLint
- Formatting: Prettier
- Strong typing with TypeScript throughout routes and components

## Contributing

1. Create a feature branch.
2. Keep changes scoped and consistent with existing patterns.
3. Run lint and format before opening a PR.
4. Include screenshots/video captures for UI-impacting changes.

## License

Private project. All rights reserved.
