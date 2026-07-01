# PWA + Offline Catalog Plan

Turn GoMall into an installable Progressive Web App that lets shoppers browse the full catalog (Phones, Personal Care, Marketplace) without a connection, backed by a local IndexedDB cache and a background sync engine that refreshes from the server whenever online. Conflict policy: **server wins**.

## 1. Installable app shell

- Add `public/manifest.webmanifest` with app name "GoMall", short name, theme color matching the brand primary, `background_color`, `display: "standalone"`, `start_url: "/"`, `scope: "/"`.
- Generate maskable + standard icons (192, 512) from the existing GoMall logo, saved under `public/icons/`.
- Add manifest link, `theme-color`, and `apple-touch-icon` tags in `index.html` head.

## 2. Service worker (offline app shell + assets)

- Install `vite-plugin-pwa` with `registerType: "autoUpdate"`, `generateSW`, `devOptions.enabled: false`, `injectRegister: null`.
- Runtime caching:
  - HTML navigations → `NetworkFirst` (never cache-first).
  - Same-origin hashed JS/CSS/fonts → `CacheFirst`.
  - Product images (`/src/assets/*`, `/icons/*`, remote CDN if any) → `CacheFirst` with expiration (max 200 entries, 30 days).
  - Supabase REST `GET` calls → `NetworkFirst` with 5s timeout, fallback to cache.
- Exclude `/~oauth`, Supabase auth token endpoints, and mpesa functions from the SW.

## 3. Registration wrapper (`src/pwa/register-sw.ts`)

Guarded registration that refuses in dev, iframes, `id-preview--*`, `preview--*`, `*.lovableproject.com`, `*.lovableproject-dev.com`, `*.beta.lovable.dev`, and when URL has `?sw=off` (kill switch also unregisters). Called once from `src/main.tsx`.

## 4. Local database (Dexie / IndexedDB)

New `src/offline/db.ts` defines a Dexie database `gomall-cache` with tables:
- `phones` (id, payload, updated_at)
- `personalCare` (id, payload, updated_at)
- `marketplace` (id, payload, updated_at, hidden)
- `meta` (key, value) — stores per-table `lastSyncAt`.

## 5. Sync engine (`src/offline/sync.ts`)

- `syncAll()` — fetches marketplace overrides from Supabase and merges with static catalogs, then bulk-puts into Dexie. Static Phones and Personal Care are seeded from bundled JSON on first run (no network needed).
- Triggers: on app start (after mount), on `online` window event, on visibility change to visible, and every 5 minutes while the tab is active.
- Conflict rule: **server wins** — remote rows overwrite local rows unconditionally on each sync pass; no local write queue.
- Exposes an online/offline status via a tiny store consumed by a header pill ("Offline — showing cached data").

## 6. Data hook rewiring

- New `useOfflineCatalog(type)` reads from Dexie (via `dexie-react-hooks` `useLiveQuery`) and falls back to bundled static data when the DB is empty.
- Update `useMarketplace`, and add lightweight equivalents used by `FeaturedPhones`, `FeaturedProducts`, `Search`, `Categories`, and `ProductDetail` pages to source from the offline cache first, then trigger a background refresh.

## 7. UI touches

- Small "Offline" badge in `Navbar` when `navigator.onLine === false`.
- Toast on first successful cache warm-up: "Catalog saved for offline browsing".
- No changes to checkout, admin edits, cart, or wishlist behavior (those still require connectivity — out of scope per your answers).

## Technical notes

- Packages: `vite-plugin-pwa`, `workbox-window`, `dexie`, `dexie-react-hooks`.
- Preview safety: SW never registers inside the Lovable editor iframe; users only get offline behavior on the published `gomall.lovable.app` or a custom domain.
- No database migrations required — this is a client-only change; Supabase remains the source of truth and always wins on sync.
- Bundle impact ~40 KB gzipped (Dexie + Workbox runtime).

## Out of scope (per your answers)

- Offline cart / wishlist persistence
- Offline order placement
- Offline admin edits / write queue / conflict UI
