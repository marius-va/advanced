# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16 App Router project with React 19, TypeScript, Tailwind CSS v4, shadcn/ui components, and Sanity CMS integration with embedded Studio and webhook-based revalidation.

## Commands

```bash
npm run dev        # Start Next.js dev server (http://localhost:3000)
npm run build      # Build production bundle
npm run start      # Start production server
npm run lint       # Run ESLint
npm run typegen    # Generate TypeScript types from Sanity schemas
```

## Architecture

### Technology Stack
- **Next.js 16** with App Router (React Server Components by default)
- **React 19** with TypeScript
- **Tailwind CSS v4** using CSS-first configuration via `@tailwindcss/postcss`
- **shadcn/ui** component library (New York style)
- **Sanity CMS** for content management with embedded Studio

### Component System (shadcn/ui)
- **Configuration**: `components.json` defines "new-york" style with RSC support
- **Component location**: `components/ui/` - 14+ pre-installed components
- **Utility function**: `lib/utils.ts` exports `cn()` for className merging (uses clsx + tailwind-merge)
- **Import pattern**: `import { Button } from "@/components/ui/button"`
- **Adding components**: `npx shadcn@latest add [component-name]`
- **Design tokens**: CSS custom properties in `app/globals.css` (HSL format without wrapper)
- **Dark mode**: Automatic via CSS media query `prefers-color-scheme` (no manual toggle)

### Styling System (Tailwind v4)
- **Configuration approach**: CSS-first via `@theme inline` directive in `globals.css` (no `tailwind.config.js`)
- **CSS variables**: shadcn/ui design tokens mapped to Tailwind via `@theme inline`
- **Color format**: HSL values without `hsl()` wrapper in CSS variables, consumed with `hsl(var(--variable))`
- **Font system**: Geist Sans and Geist Mono loaded via `next/font/google`
- **Important note**: When modifying theme colors, update both `:root` and `@media (prefers-color-scheme: dark)` sections

### Component Organization
```
components/
  ui/           # shadcn/ui components (managed by CLI)
  sanity/       # Sanity-specific components (e.g., PreviewProvider)
lib/
  utils.ts      # Shared utilities (cn() function)
```

### Path Aliases
- `@/*` → Root directory (configured in `tsconfig.json`)
- All imports use this alias: `@/components/ui/button`, `@/lib/utils`

### Sanity CMS Integration
- **Embedded Studio**: Accessible at `/studio` route (configured in `sanity.config.ts`)
- **Studio configuration**:
  - Project ID and dataset from environment variables
  - `basePath: '/studio'` enables embedded mode
  - Plugins: `structureTool()` and `visionTool()`
- **API Version**: `2025-02-19` (set in `.env.local` as `NEXT_PUBLIC_SANITY_API_VERSION`)
  - This version must match the webhook API version configured in Sanity dashboard
  - Changes to `NEXT_PUBLIC_*` env vars require Vercel redeploy to take effect
- **Content Structure**:
  - Schemas defined in `sanity/schemas/`
  - GROQ queries in `sanity/lib/queries.ts`
  - Client configuration in `sanity/lib/client.ts` with separate `client` (CDN) and `previewClient` (draft mode)
  - Helper `sanityFetch()` function supports ISR with tags or time-based revalidation

### Resend Email Integration
- **Email service**: Resend SDK for transactional emails
- **Client configuration**: `lib/resend.ts` - single instance export
- **API endpoint**: `/api/send-email` - example route for sending emails
- **Environment variables required**:
  - `RESEND_API_KEY` - API key from Resend dashboard (https://resend.com/api-keys)
- **Usage pattern**:
  ```typescript
  import { resend } from '@/lib/resend'

  const { data, error } = await resend.emails.send({
    from: 'your-verified-domain@example.com',
    to: 'recipient@example.com',
    subject: 'Subject',
    text: 'Plain text content',
  })
  ```
- **Important notes**:
  - Replace `onboarding@resend.dev` with your verified domain in production
  - Resend requires domain verification for custom sender addresses
  - Email sending is async and returns `{ data, error }` tuple pattern

### Cache Revalidation System
- **Webhook endpoint**: `/api/revalidate` - validates Sanity webhook signature and revalidates by document type tag
- **Draft mode endpoints**:
  - `/api/draft` - Enable preview mode for draft content
  - `/api/disable-draft` - Exit preview mode
- **Tag-based revalidation**: Uses `revalidateTag(body._type)` to invalidate cache for specific content types
- **Environment variables required**:
  - `SANITY_REVALIDATE_SECRET` - webhook signature validation
  - `SANITY_PREVIEW_SECRET` - draft mode authentication
  - `SANITY_API_READ_TOKEN` - preview client authentication for drafts

### App Router Structure
- **Routes**:
  - `/` - Main page (`app/page.tsx`)
  - `/studio` - Embedded Sanity Studio (`app/studio/[[...tool]]/page.tsx`)
  - `/api/revalidate` - Webhook handler for cache invalidation
  - `/api/draft` - Enable draft mode
  - `/api/disable-draft` - Disable draft mode
- **Layout**: `app/layout.tsx` includes `suppressHydrationWarning` for dark mode compatibility
- **Global styles**: `app/globals.css` contains Tailwind imports and design tokens

### TypeScript Configuration
- Strict mode enabled
- JSX transform: `react-jsx` (React 19 automatic runtime)
- Module resolution: `bundler` (Next.js optimized)
- Path alias: `@/*` maps to root directory

### Deployment (Vercel)
- **Production URL**: https://www.advancedcraftjoiners.co.uk/
- **Required environment variables**:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `NEXT_PUBLIC_SANITY_API_VERSION`
  - `SANITY_REVALIDATE_SECRET`
  - `SANITY_PREVIEW_SECRET`
  - `SANITY_API_READ_TOKEN`
- **Sanity webhook**: Configure at `https://www.advancedcraftjoiners.co.uk/api/revalidate` with API version `v2025-02-19` and signature validation enabled

### Key Implementation Notes
- **Server Components**: Use by default; mark with `"use client"` only when needed (e.g., interactive components)
- **Styling conflicts**: Sanity Studio uses `styled-components`, but this doesn't conflict with Tailwind/shadcn
- **Type generation**: Run `npm run typegen` after modifying Sanity schemas to update TypeScript types
- **CSS variables consumption**: Always use `hsl(var(--variable))` when consuming design tokens in CSS
- **Hydration warnings**: `suppressHydrationWarning` on `<html>` tag prevents warnings from dark mode media queries
