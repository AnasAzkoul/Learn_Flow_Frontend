# <Feature Name> — Production-Readiness Review Ledger

**Reviewed:** YYYY-MM-DD
**Reviewer:** <person or AI agent + supervising person>
**Scope doc:** `<FEATURE>_SCOPE.md`
**Code state:** branch `<branch>` @ `<short-hash>`

---

## How to use this template

Drop the contents into your scope doc's §16.1 (Production-readiness review backlog) once the multi-axis review is complete. Keep this file in `scopes/templates/` as the starting shape for the next feature's review.

The review framework is documented in `AI_COLLABORATION.md` §8. This template covers the **§8.2 production-readiness pass** — five default axes plus domain-specific axes when relevant. The **§8.1 code-review pass** runs separately using `CODE_REVIEW_TEMPLATE.md`, with its own File:line — Severity — Issue — Fix format; its findings are consumed in-session (mechanical fixes applied in-pass, logic fixes promoted to a follow-up §6 chunk), not captured here. Every finding in this ledger is grounded in an actual code reference — see §8.4.

---

## Findings ledger

| ID  | Finding                             | Severity | Action         | Status  |
| --- | ----------------------------------- | -------- | -------------- | ------- |
| P-1 | <one-line statement, code-grounded> | Medium   | <one-line fix> | Backlog |
| S-1 | <one-line statement, code-grounded> | High     | <one-line fix> | Shipped |
| ... | ...                                 | ...      | ...            | ...     |

**ID convention**: `<axis-letter>-<number>`.

| Axis prefix | Axis                                                              |
| ----------- | ----------------------------------------------------------------- |
| P-          | Performance                                                       |
| S-          | Security                                                          |
| ST-         | Stability                                                         |
| A-          | Availability                                                      |
| SC-         | Scalability                                                       |
| <D>-        | Domain-specific (e.g., `AU-` for audit, `UL-` for user-lifecycle) |

**Severity:**

| Severity | Meaning                                                |
| -------- | ------------------------------------------------------ |
| Critical | Blocks ship; data loss risk; security incident waiting |
| High     | Blocks ship at scale; should fix before customer ramp  |
| Medium   | Fix opportunistically; document explicitly if deferred |
| Low      | Improvement candidate; backlog OK                      |

**Status:**

- **Shipped** — fix landed during the review pass
- **Backlog** — captured in §16.1 of the scope doc, owner / trigger documented
- **Deferred** — accepted as current state with explicit rationale; documented in scope §11 or equivalent
- **Accepted** — current behaviour is intentional, no action needed

---

## What was solid (verified)

A short list of axes where the review found nothing new — calibration so the reader knows the review actually covered them, not skipped.

- **<axis>** — <code-grounded statement of what was verified>
- ...

---

## Findings worth acting on (this pass)

Per finding, expand into 2-3 paragraphs:

### <ID> — <short title>

**Setup:** what the code looks like today.

**Concrete failure mode:** the path that triggers the issue.

**Severity rationale:** why it's at the named severity, not higher or lower.

**Options considered:**

- (a) ...
- (b) ...
- (c) status quo + explicit threat-model paragraph

**Recommendation + rationale:**

---

## Findings deferred

Per deferred finding, one paragraph:

### <ID> — <short title>

What it is, why it isn't blocking ship now, and the trigger condition for revisiting.

---

## Confidence reporting

After the review, report calibrated confidence per axis:

- **Performance:** <high / medium / low> — <what was verified, what wasn't>
- **Security:** ...
- **Stability:** ...
- **Availability:** ...
- **Scalability:** ...
- **Domain-specific:** ...

Avoid uniform "all good, ship it" without supporting work. Avoid uniform "everything's broken" if it isn't. Honest calibration builds trust over time.

---

## Recommendation

One paragraph: ship / hold / partial-ship-with-mitigations. The supporting evidence is everything above.
