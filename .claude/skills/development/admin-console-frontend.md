---
name: development/admin-console-frontend
description: app/static/js/admin.js and app/templates/admin.html — the in-browser-transpiled React admin console, no build step.
permitted_agents: [developer]
version: 1.0.0
---

# Admin console frontend

**No build step.** `admin.html` loads React 18 + Babel standalone from CDN
(version-pinned — don't unpin, unpinned CDNs drift and break the transpile) and transpiles
`admin.js`'s JSX live in the browser. Edit `admin.js` directly; there is no bundler, no
`npm run build`, no separate `.jsx` source file.

## Structure

- `App()` at the bottom of the file holds `tab` state and renders `AdminNavDrawer` (the left
  nav — a hardcoded `items` array of `{id, label, icon}`) plus a `<main>` that conditionally
  renders one panel per tab.
- Reusable building blocks already defined earlier in the file: `Panel` (a titled card),
  `Modal`, `Badge`, `EditableField`, and the `useJsonFetch(path)` hook (fetch + loading/error
  state + a `reload()` callback) — reuse these before inventing a new pattern.
- Tailwind config (colors, fonts) is inline in `admin.html`'s `<script>` block, not a separate
  config file — the `panel-*`/`accent`/`success`/`warn`/`danger`/`surface-*` tokens are shared
  with the Studio page's own styling.

## Adding a new tab

1. Add `{ id: "...", label: "...", icon: "..." }` to `AdminNavDrawer`'s `items` array (icon
   names are Material Symbols Outlined).
2. Add a `{tab === "..." && (<div className="max-w-7xl mx-auto px-6 py-8">...</div>)}` block in
   `App()`'s `<main>`.
3. Write the panel component above `App()` in the file, following the `Panel` +
   `useJsonFetch` pattern the existing tabs use.

## Verification — do not skip

FastAPI's `Query(...)` defaults only resolve through real HTTP request handling; calling a route
function directly in a test needs every value passed explicitly (a real bug caught this way
once already — see `test_registry_api.py`'s history). For the frontend itself: **actually start
the server and check in a browser** — `make run` or
`AUTH_MODE=dev uvicorn app.main:app --app-dir backend --port 8080`, then open `/admin`, click the
new tab, and check the browser console for errors before calling it done. Don't assume JSX
written without a build step is correct just because it looks right.
