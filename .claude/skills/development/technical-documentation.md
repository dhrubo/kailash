---
name: development/technical-documentation
description: Keeping README.md and doc/decisions/*.md in sync with what actually shipped, for GenOSGoogle.
permitted_agents: [developer]
version: 1.0.0
---

# Technical documentation

`doc/decisions/identity_access_admin_build_plan.md` explicitly tracks phase status ("ready to
start" / implemented) — update it when a phase actually lands, don't let it silently drift
stale the way `docs/genos-master-plan.md` did in brand-play-space (a real incident that cost a
whole review pass to catch). Same for `doc/decisions/cross_repo_master_plan_alignment_brand_play_space.md`
if anything about the brand-play-space relationship changes.

Root `README.md`'s own "Status: Proof of Concept" banner and architecture description should
stay accurate — if a change makes a claim there false (e.g. "no auth beyond IAP" once Entra
mode is actually configured somewhere real), fix it in the same change, not as a follow-up.
