# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16 App Router project with React 19, TypeScript, Tailwind CSS v4, and **Sanity CMS** integration with embedded Studio and webhook-based revalidation.

## Commands

```bash
npm run dev        # Start Next.js dev server (http://localhost:3000)
npm run build      # Build production bundle
npm run start      # Start production server
npm run lint       # Run ESLint
npm run typegen    # Generate TypeScript types from Sanity schemas
```

## Architecture

### Sanity CMS Integration
- **Embedded Studio**: Sanity Studio accessible at `/studio` route (configured in `sanity.config.ts`)
- **API Version**: `2025-02-19` (set in `.env.local` as `NEXT_PUBLIC_SANITY_API_VERSION`)
  - This version must match the webhook API version configured in Sanity dashboard
  - Changes to `NEXT_PUBLIC_*` env vars require Vercel redeploy to take effect
- **Content Structure**:
  - Schemas defined in `sanity/schemas/`
  - GROQ queries in `sanity/lib/queries.ts`
  - Client configuration in `sanity/lib/client.ts` with separate `client` (CDN) and `previewClient` (draft mode)
  - Helper `sanityFetch()` function supports ISR with tags or time-based revalidation

### Cache Revalidation System
- **Webhook endpoint**: `/api/revalidate` - validates Sanity webhook signature and revalidates by document type tag
- **Draft mode endpoints**: `/api/draft` and `/api/disable-draft` for content preview
- **Tag-based revalidation**: Uses `revalidateTag(body._type)` to invalidate cache for specific content types
- **Environment variables required**:
  - `SANITY_REVALIDATE_SECRET` - webhook signature validation
  - `SANITY_PREVIEW_SECRET` - draft mode authentication
  - `SANITY_API_READ_TOKEN` - preview client authentication

### Next.js Configuration
- App Router with React Server Components by default
- Path alias: `@/*` maps to root directory
- Tailwind CSS v4 via `@tailwindcss/postcss` plugin
- ESLint flat config format (`eslint.config.mjs`)

### Deployment (Vercel)
- **Production URL**: https://advanced-seven.vercel.app/
- Requires environment variables for all `NEXT_PUBLIC_*`, `SANITY_*` secrets
- Sanity webhook URL: `https://advanced-seven.vercel.app/api/revalidate`
- Webhook configured with API version `v2025-02-19` and signature validation enabled
