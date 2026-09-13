---
name: development/security-review
description: Implementer-side security pass for GenOSGoogle — auth bypass, cross-tenant leakage, secret exposure, SQL injection.
permitted_agents: [developer]
version: 1.0.0
---

# Security review

## The two things most likely to actually go wrong here

1. **Cross-tenant data leakage** — every new query against `client_feedback.py`/
   `external_usage.py` (or any future per-tenant store) must filter by `tenant_id` at the SQL
   level, not filter client-side after fetching everything. Check the actual `WHERE` clause, not
   just that a `tenant_id` parameter exists in the function signature.
2. **Auth silently widened** — a `Depends(require_tenant)` removed from a route, a
   `verify_service_token`/`verify_entra_jwt` call short-circuited "temporarily for testing" and
   left in, or a new route added to a router that's included without the auth dependency the
   sibling routes have. Diff against how the sibling endpoints in the same router are gated.

## Standard checks, still apply

- No hardcoded secret (`ENTRA_CLIENT_ID`, `SERVICE_AUTH_*`, any API key) — env-var only.
- SQL: every `execute()` call in `run_log.py`/`external_usage.py`/`client_feedback.py` uses
  parameterized `?` placeholders, never an f-string building the query with user input.
- `admin.js`: no `dangerouslySetInnerHTML` or raw HTML built from an API response without
  escaping — React's default JSX escaping is the expectation, don't bypass it for convenience.
