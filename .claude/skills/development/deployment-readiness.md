---
name: development/deployment-readiness
description: deploy.sh, Cloud Run, and the no-test-gate-in-CI risk for GenOSGoogle.
permitted_agents: [developer]
version: 1.0.0
---

# Deployment readiness

## The one thing to always check before pushing

`.github/workflows/deploy.yml` triggers on **every push to `main`** and just runs `./deploy.sh`
— **there is no test, lint, or build gate anywhere in CI.** `deploy.sh`'s `SVC_DEFAULT` is
`genmedia-studio`; pushing to `main` will `gcloud run deploy genmedia-studio --source .`, which
**recreates that service if it was deliberately deleted.** Before pushing to `main`, check
whether the default target service is meant to exist right now — if in doubt, push to a feature
branch instead (triggers `deploy-preview.yml`, a per-branch preview service, not the main
target) and let a human decide when to merge.

## Local verification

- Backend: `PYTHONPATH=backend python backend/tests/test_X.py` per touched file (standalone-
  runnable, no `pytest` install required) or `pytest backend/tests/test_X.py`.
- Full app boot: `PYTHONPATH=backend python -c "import app.main"` — cheap, catches import-time
  errors before they'd only surface at Cloud Run startup.
- `make run` for a real local server at `http://localhost:8080` (Admin at `/admin`).

## Env vars that gate real functionality

- `AUTH_MODE` — `dev` (default, local), `iap` (prod, Google IAP header), `entra` (Phase 2,
  needs `ENTRA_TENANT_ID`/`ENTRA_CLIENT_ID` set or it fails closed with a 500).
- `SERVICE_AUTH_AUDIENCE`/`SERVICE_AUTH_TRUSTED_ACCOUNTS` — required for the Access/Registry
  APIs (`app/routers/{access,registry}.py`) to accept any real service-to-service caller; both
  empty by design until real values are provided (don't fabricate placeholder-looking real
  values — an empty string fails closed, which is the correct default).

## Known deploy-target gap

There is currently no deployed home for the Admin Console / Central Registry API —
`genmedia-studio` was retired, and its replacement hasn't been decided/stood up yet. Don't
assume a deploy will "just work" until that's resolved; flag it to `product-owner` if a task
implies deploying this backend.
