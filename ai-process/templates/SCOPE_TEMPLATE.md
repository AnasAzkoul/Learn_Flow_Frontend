# <Feature Name> — Scope & Specification

**Status:** Proposed | In progress | Shipped | Retrospective
**Owner:** TBD | <person>
**Last updated:** YYYY-MM-DD
**Audience:** Engineering, Product, Ops, ...

---

## How to use this template

Copy this file to `scopes/<FEATURE>_SCOPE.md` (or wherever your project keeps scope docs) before starting non-trivial work. Fill in or delete sections as the feature requires — not every feature needs a real-time architecture section, an API surface, or a frontend section. Keep the **bolded sections required**: §1 executive summary, §2 goals & non-goals, §15 phasing & estimates, §16 open items, §17 locked decisions.

The scope doc is the contract between human and AI for the build. Update it as decisions land. By the time the feature ships, the doc should read as the reviewer-grade record of what was built and why.

See `AI_COLLABORATION.md` §5 for the full guidance on when to write a scope doc and how decisions get captured.

---

## 1. Executive summary

Two or three paragraphs:

- The problem this feature solves
- The shape of the chosen solution
- Why now (trigger conditions if any)

**Out of scope by explicit decision:**

- Item 1 — reason
- Item 2 — reason

---

## 2. Goals & Non-Goals

### 2.1 Goals

- Bullet list. Each goal is one sentence, observable / testable.

### 2.2 Non-Goals

- What this feature explicitly does NOT do. The non-goals list is as load-bearing as the goals list.

---

## 3. Glossary

| Term | Meaning |
| ---- | ------- |
| ...  | ...     |

Domain-specific terms get defined here so the rest of the doc reads cleanly. Skip if there's nothing non-obvious.

---

## 4. Feature walkthrough

How users (or callers, or operators) experience the feature, organised by flow. Sub-sections per flow. Diagrams welcome.

---

## 5. Out of scope (v1) — with rationale

| Item | Reason | When |
| ---- | ------ | ---- |
| ...  | ...    | ...  |

Detailed table for items intentionally deferred, with the _when_ column making the deferral concrete (e.g., "after resource scoping ships," "if customer asks").

---

## 6. Configuration

Config keys this feature introduces or relies on. Env-var overrides, defaults, sensitive-vs-not.

---

## 7. Data model (if applicable)

Schema definitions for new tables/columns, indexed columns, FK relationships. Mirror central-vs-tenant migrations explicitly if your project has that split.

---

## 8. Real-time architecture (if applicable)

Channels, broadcast events, auth callbacks. Note ShouldBroadcast vs ShouldBroadcastNow per event.

---

## 9. API surface

Routes, request/response shapes, rate limits, throttles. Note any CSRF or middleware quirks.

---

## 10. Notification routing (if applicable)

Email / push / in-app notification flow. Cooldown windows, mute states, vacation handling.

---

## 11. Privacy / Security / GDPR

- Threat model
- Encryption posture (encrypted-at-rest fields, plaintext fields, why)
- Audit posture
- GDPR rights mapping (Access, Erasure, Rectification, Portability, Storage limitation, Confidentiality, Privacy by design)
- Snowflake `_str` mirror compliance

---

## 12. Performance & scalability

- Hot paths (operations that fire often)
- Expected volumes at current and projected scale
- Scaling triggers (when to revisit)
- Caching strategy

---

## 13. Frontend architecture (if applicable)

Components, composables, stores, state machines. Touch-aware patterns. i18n.

---

## 14. Existing patterns to follow

Pointers to similar features in the codebase that should be the reference. Reuse-before-adding §2.4 in `AI_COLLABORATION.md`.

---

## 15. Phasing & estimates

| Phase                  | Description | Estimate |
| ---------------------- | ----------- | -------- |
| Phase 0 — Foundation   | ...         | ...      |
| Phase 1 — MVP          | ...         | ...      |
| Phase 1.1 — Polish     | ...         | ...      |
| Phase 2 — Enhancements | ...         | ...      |
| Phase 3 — Later        | ...         | ...      |

Each phase has a clear handoff point and trigger condition for the next.

---

## 16. Open items & risks

| Item | Risk | Mitigation |
| ---- | ---- | ---------- |
| ...  | ...  | ...        |

### 16.1 Production-readiness review backlog (post-build)

Items surfaced during the multi-axis readiness review (see `REVIEW_LEDGER_TEMPLATE.md`) that aren't blocking ship. Drop them here so they survive across sessions.

**Performance (deferred):**

- ...

**Security (deferred):**

- ...

**Stability + availability (deferred):**

- ...

**Scalability (deferred):**

- ...

**Accepted current state (documented, not built):**

- ...

---

## 17. Appendix A — Locked decisions

| Decision | Rationale |
| -------- | --------- |
| ...      | ...       |

Every meaningful decision in the build gets an entry here. The _Rationale_ column is one or two lines — captures the why so future-readers don't re-litigate.

---

## 18. Appendix B — Memos & scopes referenced

- `<memo>.md` — what it covers
- `<related-scope>.md` — what it covers

Link to project memory entries, related scope docs, external runbooks. Anchors the doc in the broader knowledge base.
