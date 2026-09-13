---
name: development/backend-platform
description: Core Library, Tenant Registry, identity/access, Capability Modules, Brand Core, and the Central Registry API — GenOSGoogle's Python/FastAPI backend platform layer.
permitted_agents: [developer]
version: 1.0.0
---

# Backend platform

## Core Library (`app/platform/core_library.py`)

File-backed Modules (`backend/core_library/modules/<id>/MODULE.md`), Skills
(`backend/skills/<id>/SKILL.md`), Memories (`backend/core_library/memories/<id>/MEMORY.md`) —
frontmatter + body, `@lru_cache`d loaders, `save_*()` writes straight to disk then
`cache_clear()`s. A separate draft-propose-promote flow (`propose_change`/`promote_draft`) edits
these WITHOUT touching the live file until a human promotes — that's the Agent Gym learning
loop, not a general-purpose versioning system; don't reuse it for something that isn't editing
existing shared content (a genuinely new per-client concept belongs in its own store — see
`client_feedback.py` for the precedent of *not* forcing it through this flow).

## Tenant Registry + identity/access (`tenancy.py`, `tenant_registry.py`, `membership.py`, `service_auth.py`)

Read `doc/decisions/identity_access_admin_build_plan.md` first — this is Phases 1–3 of that
plan, already implemented:

- `tenant_registry.py` — `TenantRecord` (pydantic), file-backed at `backend/tenants/*.json`.
  `require_tenant()` in `tenancy.py` validates every tenant_id against this — an unknown tenant
  is a 403, never a silently-accepted string.
- `membership.py` — who (email) belongs to which tenant, at what role. Every Entra-verified
  identity gets the default tenant implicitly; any other tenant needs a real, explicit
  membership row. `grant_membership`/`revoke_membership` write straight to
  `app/platform/memberships.json`, `cache_clear()` after.
- `service_auth.py` — `verify_entra_jwt`/`verify_service_token`, deliberately mirroring
  comfyui-platform's own `proxy/app/auth.py` shape (same libraries, same fail-closed-on-missing-
  config behaviour) rather than inventing a new pattern. If that file's approach changes, change
  this one to match — don't let them drift into two different Entra-verification
  implementations across the platform.

## Central Registry (`app/routers/registry.py`, `client_feedback.py`, `external_usage.py`)

What an external caller (brand-play-space) actually connects to: Skills/Memories read-only,
per-tenant Feedback and Usage read+write. Auth is `verify_service_token` (a trusted *service*
authenticating as itself), not `require_tenant` (an end user with a tenant of their own) — these
are two different callers with two different auth shapes; don't collapse them.

**Isolation rule, non-negotiable:** every read/write here takes an explicit `tenant_id`,
validated against the real registry (`_require_real_tenant`), and every query filters by it.
There is no "list everything" endpoint. If you add a new field or endpoint here, write a test
proving one tenant's data never appears when querying another's — see
`test_registry_api.py::test_feedback_and_usage_are_isolated_per_tenant`.

## Capability Modules + Brand Core (`modules.py`, `brand_core.py`)

Capability Modules bundle Core Library content by id; Brand Core (`backend/brand_cores/<id>/`)
is one per client, opts into a set of Capability Modules. Adding a brand is config, not code —
see `test_fashion_brand_added_purely_as_config` in `test_platform_core.py`.

## Run log / usage ledger (`run_log.py`)

GenOSGoogle's OWN internal judged-generation ledger (SQLite, `backend/run_artifacts/runs.db`) —
keyed by `brand_id`, has a judge-score/module-resolution shape specific to this platform's own
generation pipeline. This is **not** the same table as `external_usage.py`'s tenant-scoped
external-usage log — don't conflate the two or try to make one write into the other's schema.
