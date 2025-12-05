# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 project using the App Router with React 19, TypeScript, and Tailwind CSS v4. The project uses the latest Tailwind PostCSS plugin (`@tailwindcss/postcss`) for styling.

## Commands

### Development
```bash
npm run dev        # Start development server on http://localhost:3000
npm run build      # Build production bundle
npm run start      # Start production server
npm run lint       # Run ESLint
```

## Architecture

### App Router Structure
- Uses Next.js App Router (`app/` directory)
- Layout defined in `app/layout.tsx` with font configuration (Geist Sans and Geist Mono)
- Global styles in `app/globals.css`
- Pages are TSX files in `app/` directory

### Styling System
- Tailwind CSS v4 with PostCSS integration
- CSS variables defined in `globals.css` with theme customization via `@theme inline`
- Custom CSS properties: `--background`, `--foreground`, `--font-sans`, `--font-mono`
- Dark mode via `prefers-color-scheme` media query

### TypeScript Configuration
- Path alias: `@/*` maps to root directory
- Strict mode enabled
- JSX set to `react-jsx` (React 19's automatic runtime)
- Module resolution: `bundler`

### ESLint Configuration
- Uses new flat config format (`eslint.config.mjs`)
- Integrates Next.js recommended configs: `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

## Key Conventions

- Font loading uses `next/font/google` with variable CSS injection
- Static assets in `public/` directory
- Type-safe with TypeScript strict mode
- React Server Components by default (App Router)
