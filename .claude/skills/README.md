# Skill Registry — GenOSGoogle

Adapted from `brand-play-space/.claude/skills/README.md`'s convention: skills are reusable
domain knowledge an agent loads, not agents themselves. This file *is* the registry — no
running skill-loader service, enforcement by convention.

## Registry

| Skill | Permitted agent(s) | Covers |
|---|---|---|
| `development/backend-platform` | developer | Core Library, Tenant Registry, membership, service auth, Capability Modules, Brand Core, the Central Registry API |
| `development/admin-console-frontend` | developer | `app/static/js/admin.js` — the in-browser React admin console |
| `development/studio-frontend` | developer | `frontend/apps/{audi,coach}` — currently unused/retired, real decision to touch |
| `development/security-review` | developer | Auth bypass, cross-tenant leakage, secret exposure, SQL param binding — implementer-side pass |
| `development/technical-documentation` | developer | Keeping `README.md`/`doc/decisions/*.md` in sync with what shipped |
| `development/deployment-readiness` | developer | `deploy.sh`, Cloud Run, the no-test-gate-in-CI risk, env vars |
| `design/accessibility-review` | designer | Static WCAG review during design |
| `testing/test-infrastructure` | tester | The standalone-runnable pytest pattern used throughout `backend/tests/` |
| `testing/security-testing` | tester | Independent re-check of security — tester-side pass |
| `testing/release-readiness` | tester | Evidence-based go/no-go assessment for the human approver |

## Why security has two skills, not one shared skill

Same reasoning as brand-play-space: `developer`'s `security-review` and `tester`'s
`security-testing` are two independent, un-collapsed passes over the same class of problem — an
agent must not be the sole evaluator of its own output.

## What this registry is not

A documentation convention, not a running service — see brand-play-space's own skills/README.md
for the fuller rationale; it applies here unchanged.
