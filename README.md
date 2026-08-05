# DSE Analysis

Web app Next.js untuk DSE Analysis.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint

## Struktur

```text
src/
  app/                 # routes & layouts (App Router)
    api/health/        # contoh API route
  components/
    layout/            # header, sidebar, dll
    ui/                # komponen UI reusable
  hooks/               # custom React hooks
  lib/                 # utilitas & helpers
  types/               # shared TypeScript types
public/                # static assets
```

## Menjalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Deskripsi              |
| --------------- | ---------------------- |
| `npm run dev`   | Development server     |
| `npm run build` | Production build       |
| `npm run start` | Jalankan hasil build   |
| `npm run lint`  | Jalankan ESLint        |
