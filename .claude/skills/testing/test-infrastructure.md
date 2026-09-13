---
name: testing/test-infrastructure
description: The standalone-runnable pytest pattern used throughout backend/tests/ in GenOSGoogle.
permitted_agents: [tester]
version: 1.0.0
---

# Test infrastructure

Every test file in `backend/tests/` follows the same shape — a real, working convention, not
aspirational:

```python
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
# ... tests as plain test_*() functions, no fixtures/pytest-specific API ...

def _run_all():
    tests = [v for k, v in sorted(globals().items()) if k.startswith("test_") and callable(v)]
    for t in tests:
        t()
        print(f"  PASS  {t.__name__}")

if __name__ == "__main__":
    _run_all()
```

Runnable two ways: `pytest backend/tests/test_X.py` or
`PYTHONPATH=backend python backend/tests/test_X.py` — no `pytest` install required for the
second form, which matters since this environment doesn't have it installed by default (check
before assuming `pytest` works: `python -m pytest` will fail with `No module named pytest` if
so — fall back to the direct-run form).

## Patterns worth reusing

- **Monkeypatching a verification function directly**, not mocking a whole client: e.g.
  `tenancy.verify_entra_jwt = lambda token: "someone@accenture.com"`, restored in a `finally`.
  See `test_tenancy_auth.py`'s Entra tests.
- **Backing up and restoring a real file-backed store around a test** that writes to it — see
  `test_membership_admin.py`'s `_preserve_memberships_file` context manager. Don't let a test
  permanently mutate `memberships.json`/`tenants/*.json`.
- **Isolating a SQLite-backed store's `_DB_PATH` to a `tempfile.TemporaryDirectory()`** for a
  test that writes real rows — see `test_registry_api.py`. Don't let a test write into the real
  `run_artifacts/*.db` files.
- **FastAPI `Query(...)` defaults don't resolve outside real request handling** — calling a
  route function directly needs every param passed explicitly, even ones with a declared
  default. A real bug was caught this way once; don't reintroduce it in a new test.
- **Async route functions** — call via `asyncio.run(fn(...))` when testing directly (see
  `test_registry_api.py::_run`).
