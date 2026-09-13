---
name: development/studio-frontend
description: frontend/apps/{audi,coach} — the per-client Turborepo/pnpm Studio frontend, currently unused/retired.
permitted_agents: [developer]
version: 1.0.0
---

# Studio frontend (currently unused)

`frontend/apps/audi`, `frontend/apps/coach` (plus shared `frontend/packages/{app,theme,ui,config,modules}`)
are a real, working Turborepo/pnpm React app — but their deployed services (`genos-audi`,
`genos-coach`, and the aggregate `genmedia-studio`) have all been retired: this Studio surface
is superseded by brand-play-space as the actual end-user experience layer.

**Touching this code is a real decision, not a default.** Before making a change here, confirm
with `product-owner`/the user whether this is being revived for a specific reason or should
instead be formally archived/removed. Don't silently "fix" something in a frontend nothing
deploys anymore.
