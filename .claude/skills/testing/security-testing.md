---
name: testing/security-testing
description: Independent re-check of security for GenOSGoogle — tester-side pass, distinct from developer's security-review.
permitted_agents: [tester]
version: 1.0.0
---

# Security testing (independent re-check)

Re-derive the same class of risk `development/security-review` covers, independently — don't
just read the developer's own claim and agree with it.

- Actually attempt the cross-tenant leakage case yourself: write test data under tenant A, query
  as tenant B, confirm nothing comes back. Don't accept "the query has a WHERE clause" as proof
  without running it.
- Actually attempt the auth-bypass case: call the endpoint with no `Authorization` header, with
  a malformed bearer token, and (where applicable) with a token for the wrong audience —
  confirm each is rejected, don't just confirm the happy path works.
