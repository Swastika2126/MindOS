# Developer guide

Short map of how MindOS is put together.

## Folders

```
src/app/            Routes (App Router)
src/components/     UI — layout, login, shared primitives
src/lib/            Firebase client, auth stubs, nav, types
src/styles/         Color tokens (colors.css)
```

- `@/*` maps to `src/*`.
- Login is a centered card (`LoginScreen` → BrandPanel + LoginForm).
- Dashboard is full-bleed: `dashboard/layout` → `AppShell` → Sidebar + page content. Each page owns its `TopBar`.

## Routes

| Path | Notes |
|------|--------|
| `/` | Redirects to `/login` |
| `/login` | Auth UI only (not wired to Firebase yet) |
| `/dashboard/*` | planner, tasks, goals, notes, vault, assistant, focus, settings |

Nav links live in `src/lib/nav.ts`.

## Design tokens

1. Add or change raw values in `src/styles/colors.css`.
2. Expose them in the `@theme` block in `src/app/globals.css`.
3. Use Tailwind utilities (`bg-accent`, `text-text-primary`, …) — avoid hard-coded hex in components.

Fonts: DM Sans (body) + Source Serif 4 (brand / titles) via `next/font` in `src/app/layout.tsx`.

## Auth (later)

- `src/lib/firebase.ts` — Firebase app / auth / Firestore init from env.
- `src/lib/auth.ts` — stub `signInWithEmail`, `signInWithGoogle`, `signOut`. Implement these, then call from `LoginForm`.
- Copy `.env.local.example` → `.env.local`. No route guards yet.

## Conventions

- Prefer shared UI under `components/ui` (Button, Input, Badge, ProgressBar).
- Dashboard pages keep mock/local state until persistence exists.
- Shell chrome is full-bleed; don’t reintroduce a centered “app card” wrapper around the dashboard.
- Sidebar is fixed desktop width — a mobile drawer is a follow-up.
