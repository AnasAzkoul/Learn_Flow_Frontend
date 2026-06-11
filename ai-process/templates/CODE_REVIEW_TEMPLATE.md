# <Feature/Chunk Name> — Code Review

**Reviewed:** YYYY-MM-DD
**Pass:** light (checkpoint <N>) / heavy (cumulative diff)
**Reviewer:** <agent + supervising person>
**Code state:** `<branch>` @ `<short-hash>` (heavy pass) or chunk description (light pass)

---

## How to use this template

The code-review pass is documented in `AI_COLLABORATION.md` §8.1. The mental model: a senior engineer reviewing the diff for the first time. Be hard on the choices made — defending a decision is the wrong instinct; finding the weak choice is the right one. "Senior engineer" is stack-specific — anchor to the stack skill (§6.8), not generic enterprise instincts.

Two tiers:

- **Light pass** — every §6 implementation checkpoint, 60-second self-critique. Output is normally woven into the "done / verified / left" report. Use this template only if the light pass surfaced enough findings to warrant a separate artefact.
- **Heavy pass** — at §8 on the cumulative diff, before §8.2 production-readiness. Use this template every time.

This is the companion to §8.2 production-readiness (which uses `REVIEW_LEDGER_TEMPLATE.md`). Same code, different lens: this asks "is this code any good?"; §8.2 asks "will this survive in prod?"

---

## Bucket applicability

For each bucket: ran or skipped (with one-line rationale). Skipping isn't laziness — running all eight thin produces noise; the gating produces signal.

| Bucket                            | Ran?     | Rationale if skipped |
| --------------------------------- | -------- | -------------------- |
| Correctness & consistency         | Yes / No | —                    |
| Code quality                      | Yes / No | —                    |
| Performance & resource management | Yes / No | —                    |
| Overengineering                   | Yes / No | —                    |
| Error handling & resilience       | Yes / No | —                    |
| Test quality                      | Yes / No | —                    |
| Comment hygiene                   | Yes / No | —                    |
| Convention fit                    | Yes / No | —                    |

---

## Findings

Each finding: File:line — Severity — Issue — Fix. Concrete code change required, not "consider improving."

| ID  | File:line       | Severity                 | Issue                | Fix                                |
| --- | --------------- | ------------------------ | -------------------- | ---------------------------------- |
| F-1 | `<path>:<line>` | critical / major / minor | <one-sentence issue> | <concrete code change or refactor> |
| F-2 | ...             | ...                      | ...                  | ...                                |

**Severity:**

| Severity | Meaning                                                                     |
| -------- | --------------------------------------------------------------------------- |
| Critical | The code is wrong; will produce bad behaviour in normal use                 |
| Major    | Significant quality or correctness concern a senior reviewer would block on |
| Minor    | Improvement worth making; a senior reviewer would request but not block     |

---

## Mechanical fixes applied in-pass

Fixes applied during the review itself — rename, unused import removed, narration comment deleted, constant extracted, idiom alignment. The shipped diff now differs from the pre-review diff; this list tells the human what changed.

- `<path>:<line>` — <one-line description>
- ...

---

## Logic fixes promoted to follow-up §6 chunk

Behaviour-changing fixes — control flow, error handling, refactor scope, test changes. Not applied in-pass; these go through §6 → §7 → §8 as a new implementation chunk. Severity applies to prioritisation, not to where the fix lands.

- `<path>:<line>` — <one-line description + why it can't be a mechanical fix>
- ...

---

## Next step

One line:

- **Continue to §8.2 production-readiness** — review complete, only mechanical/minor findings or none.
- **Back to §6 with new scope** — logic-only findings; implementation isn't done. §8 doesn't claim closure yet.
- **Done — trivial commit** — no production-readiness pass needed (per §8.1 trivial-skip rule).
