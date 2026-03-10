# Salongo Web

A clean, production-ready Next.js 14 SaaS marketing website with App Router, TypeScript, and Tailwind CSS.

## Tech Stack

- **Next.js 14** — App Router
- **TypeScript**
- **Tailwind CSS** — Mobile-first responsive
- **SEO** — Metadata, robots.txt, sitemap

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── layout.tsx    # Root layout, SEO metadata
│   ├── page.tsx      # Home page
│   ├── globals.css
│   ├── robots.ts     # Robots.txt
│   └── sitemap.ts    # XML sitemap
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   └── CTA.tsx
└── lib/
    └── metadata.ts   # Site config
```

## Scripts

- `npm run dev` — Development server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint
