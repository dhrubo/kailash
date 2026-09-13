---
name: testing/release-readiness
description: Evidence-based go/no-go assessment for GenOSGoogle, handed to the human approver.
permitted_agents: [tester]
version: 1.0.0
---

# Release readiness

Produce evidence, not a verdict — the human decides go/no-go, you gather what they need to
decide.

## What to check, in priority order

1. **Tenant isolation, if touched at all** — the single highest-value check in this repo right
   now. Run (or write) a test proving data under one `tenant_id` never surfaces when querying
   another. No exceptions, no "it's probably fine."
2. **Auth fail-closed behaviour** — for any Entra/service-token path, confirm a missing config
   value produces a 401/500, never a silent pass-through.
3. **App boots** — `PYTHONPATH=backend python -c "import app.main"`. Cheap, catches real
   breakage.
4. **Deploy-target awareness** — if the change will be pushed to `main`, confirm whether that's
   actually intended given `deploy.sh`'s `SVC_DEFAULT=genmedia-studio` auto-redeploy behaviour
   and the fact that service was deliberately retired.
5. **Scope** — `git diff --name-only` matches what was actually asked for.

## Format

Cite real command output for every claim. `N/A` with a one-line reason is fine for genuinely
inapplicable items — don't pad the report with checks that don't apply just to look thorough.
