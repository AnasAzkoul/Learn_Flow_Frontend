# Working with AI Agents - Learn Flow Process Guide

**Audience:** Developers using AI coding agents on Learn Flow, including Claude Code and Codex.
**Purpose:** A reusable process for taking a Learn Flow feature from idea through ship, with the agent doing structured work and the human staying in control of every meaningful decision.
**Last updated:** 2026-05-27

---

## How to use this document

Pull this document in at the start of every non-trivial AI session.

- Claude Code sessions should read `CLAUDE.md` and `ai-process/AI_COLLABORATION.md`.
- Codex sessions should read `AGENTS.md` and `ai-process/AI_COLLABORATION.md`.
- Both agents must verify current code state before making claims.
- Neither agent should rely on memory alone.

This document is the shared process layer. `CLAUDE.md` and `AGENTS.md` are tool entrypoints. Repo docs, scope docs, and the current codebase are the durable source of truth.

If you are a human reader: sections 1-3 give the mental model quickly. Sections 4-9 walk through the feature flow. Sections 10-15 are reference.

## TL;DR for agents reading this at session start

**Read §2 carefully.** Those are non-negotiable unless the human explicitly overrides one for the current task.

Default to section 3. The six-phase arc is the cadence for non-trivial work unless the human asks for something lighter.

Verify before claiming. Memory is a hypothesis; code is the truth.

Ask when the choice changes product behavior, architecture, security, or scope. Do not ask when the answer can be found by reading the repo.

Be honest about confidence. Name what you checked and what you did not check.

Treat the human as your reviewer, not your audience. Show reasoning, surface uncertainty, and keep decisions explicit.

Watch for candidate doc additions. If a pattern emerges, a correction lands, or a failure mode appears that belongs in this document, propose it using section 11.5. Do not edit this document silently.

Update the header date when an approved doc change ships.

---

## 1. Executive summary

Building features with an AI agent goes well when both sides treat the work as collaboration with explicit checkpoints, not as blind code generation. The agent's value is structured exploration, code-first verification, implementation discipline, review, and patient documentation.

Learn Flow currently spans a Nuxt 4 frontend and a Hono TypeScript backend. The exact repo you are in may contain only one side. Agents must discover the active repo's scripts, conventions, tests, and entrypoints before prescribing commands or making claims.

The default process has six phases:

1. Ideation - agree on the problem and shape before coding starts.
2. Scoping - write the contract for non-trivial work.
3. Implementation - code against the scope with frequent green checkpoints.
4. Testing - validate every change before calling it done.
5. Review - run code review and production-readiness checks.
6. Closing - update durable docs, capture backlog, and leave a clean handoff.

The artifacts that survive across sessions are the scope docs, repo docs, durable tool memory where available, and the commit history. Conversation is temporary.

---

## 2. Working agreements

These are the hard rules. The human can override individual cases, but the agent should surface the tradeoff when that happens.

### 2.1 Code-first verification

Never make claims about current code state from memory. Before recommending a code change, declaring something shipped or missing, naming a function, or citing a file path, read the actual file or search for the symbol.

The cost of verifying is small. The cost of being wrong is a real bug, wasted review, or a recommendation that breaks the product.

If memory conflicts with code, trust the code. Then update or propose updating the durable context.

### 2.2 Lint, typecheck, build, and test before "done"

A change is not done until the relevant checks are green or the limitation is clearly reported.

For Learn Flow frontend work:

- Run affected tests where a test harness exists.
- Run relevant scripts discovered from `package.json`.
- Run ESLint on touched files or the affected project when configured.
- Run Prettier checks when configured.
- Run `npm run build`, `npm run generate`, or another Nuxt validation command when routing, Nuxt config, shared types, or page/component structure changed.
- Document a browser smoke path if no automated test exists for the touched area.

For Learn Flow backend work:

- Discover scripts from the backend `package.json`.
- Run relevant typecheck, lint, test, and build scripts when available.
- Run request-level tests for Hono routes where the harness exists.
- Document a request smoke path when no automated route test exists.

For both sides:

- No skipped tests introduced without explicit approval.
- No temporary `console.log`, `debugger`, throwaway mocks, dumped state, or diagnostic output left behind.
- Do not declare done if checks fail. Report the failing command and the current blocker.

### 2.3 Scope doc as contract

For non-trivial work, write a scope doc first. A scope doc is the agreement between human and agent about what is being built and why. It survives the conversation, gets updated as decisions evolve, and becomes the reviewer-grade record of what shipped.

Write one when:

- The feature touches more than three files.
- The feature spans more than a day.
- The feature has architectural decisions.
- The feature changes API contracts.
- Multiple humans or agents will work on it.
- The feature has security, privacy, billing, or data retention implications.

Skip one when:

- The task is a small bug fix.
- The task is a one-line change.
- The task is a doc-only edit.
- The work is fully prescribed by an existing accepted scope.

### 2.4 Reuse before adding

Before proposing a new dependency, helper, component, store, service, middleware, schema, or abstraction:

1. Search `package.json` for existing packages.
2. Search the repo for existing components, composables, stores, services, API clients, schemas, middleware, utilities, and patterns.
3. Check framework defaults before reimplementing behavior.

For the Nuxt frontend, prefer existing shadcn-vue components, common form wrappers, Pinia stores, composables, `useFetch`, `useState`, `useRoute`, `useNuxtApp`, and `NuxtLink` where they fit.

For the Hono backend, prefer existing route modules, middleware, validation schemas, service helpers, response helpers, and typed contracts where they fit.

Add a dependency only when nothing existing fits and the agent has explained why.

### 2.5 Ask before destructive or shared-state actions

Some actions are reversible. Some are not. Some are visible to other people.

The agent must confirm before:

- Force-pushing.
- Deleting branches.
- Dropping data.
- Changing production or shared environment configuration.
- Sending external messages.
- Creating or closing issues or pull requests.
- Deploying.
- Running scripts that mutate shared services.

Authorization is scope-bound. "Commit that change" does not mean "push to the default branch."

### 2.6 Production-grade code quality by default

Every line the agent writes should be production-grade, even during a prototype.

TypeScript expectations:

- Avoid `any` unless the boundary truly cannot be typed and the reason is documented.
- Use explicit interfaces or schemas for public shapes.
- Type component props, emits, composables, stores, service inputs, and service outputs.
- Handle errors at trust boundaries, not by swallowing internal exceptions.
- Do not leave commented-out code.
- Comments explain non-obvious reasons, not what the code already says.
- Use descriptive names.
- Do not add backwards-compatibility shims unless the feature explicitly needs them.

Frontend expectations:

- Use `<script setup lang="ts">` in Vue single-file components.
- Use explicit props and emits interfaces.
- Use typed `ref` and `computed` where inference would be unclear.
- Use composables for reusable reactive logic.
- Use Pinia for cross-component state.
- Use the existing shadcn-vue and common component conventions.
- Use `cn()` from the project utilities for conditional class merging where applicable.
- Consider touch-aware interaction patterns where hover behavior is involved.

Backend expectations:

- Keep Hono route handlers thin.
- Validate input at request boundaries.
- Keep request and response contracts typed.
- Put reusable business logic in services or helpers rather than route bodies.
- Keep middleware focused and named by behavior.
- Return consistent error shapes.
- Treat external AI provider calls as fallible.

### 2.7 Decisions in writing

Every meaningful locked decision goes in the scope doc with rationale. "We chose X because Y" is enough when the decision is simple.

This prevents the same discussion from recurring across sessions and gives future agents context to overrule safely.

### 2.8 Hardening pass on high-velocity builds

Feature work shipped at AI velocity should be treated as functional before it is treated as production-ready. Between "tests pass" and "safe to ship" sits a hardening pass for non-trivial, customer-facing, security-sensitive, or data-sensitive work.

Findings can be grouped by blast radius:

- H1 - ship blockers: correctness, data loss, security, privacy.
- H2 - architectural drift: choices that compound future work.
- H3 - scale watch list: triggers and tripwires.
- H4 - UX polish: quick wins that can batch.
- H5 - additions: new surface area for a later scope.

H1 blocks release. Security-shaped work needs a second set of eyes from a human or a fresh agent review.

This does not apply to small bug fixes, narrow refactors, or tooling scripts unless the risk profile says otherwise.

### 2.9 Simplicity by default

Write the minimum code that solves the stated problem. No speculative features for hypothetical future needs. No abstractions for single-use code. No "framework for X" when one function is enough.

Production-grade means correctly handling the cases that exist. It does not mean defensively building for every case that might exist someday.

### 2.10 Read before writing

Before adding code to an existing file, read it. Also read obvious callers, exports, shared utilities, and adjacent conventions.

If the agent does not understand why code is structured the way it is, it should ask before extending that structure.

### 2.11 Conform to the codebase's conventions

When the codebase has an established convention, match it: naming, layout, component style, composable shape, store structure, service shape, route organization, import style, error shape, and test style.

Conformance does not override quality bars. If the codebase has a weak pattern, surface the cleanup as a backlog or scope topic instead of spreading it silently.

If two contradictory patterns coexist, pick the more recent, better-tested, or closer-to-current-direction pattern. If that cannot be determined, ask before writing.

---

## 3. The session arc

The default cadence for non-trivial work:

```text
[Human] States the problem or feature need
   |
[Agent] Reads the relevant repo context and asks clarifying questions
   |
[Human] Answers and chooses among tradeoffs
   |
[Agent] Drafts or updates a scope doc when needed
   |
[Human] Confirms or refines
   |
[Agent] Implements against scope with checked checkpoints
   |
[Human] Reviews implementation as it lands
   |
[Agent] Runs code review and production-readiness review
   |
[Human] Picks which findings to act on
   |
[Agent] Closes findings and updates durable docs
   |
[Agent] Surfaces topics list, including load-test relevance
   |
[Human + Agent] Decide handle-now, backlog, drop, or refine-scope
   |
[Agent] Produces commit message when asked
   |
[Human] Commits, deploys, or ships
```

The agent should not skip ahead. Do not code before scope is agreed for non-trivial work. Do not claim done before checks and review. Do not commit, push, deploy, or mutate shared state before confirmation.

---

## 4. Phase 1 - Ideation

Goal: agree on the problem and solution shape before implementation.

### 4.1 What the human does

- States the need plainly.
- Provides constraints: user audience, security, performance, data, time, must-not-do items.
- Indicates urgency or absence of urgency.
- Flags prior context the agent should read.

### 4.2 What the agent does

- Reads relevant repo context before asking questions that code can answer.
- Asks clarifying questions for product intent and tradeoffs.
- Proposes options with explicit tradeoffs.
- Advocates for simpler when a simpler path meets the same criteria.
- Surfaces dependencies.
- Names what is out of scope.

Example:

> We can validate generated-course creation entirely in the Hono route, or define a shared request schema that the Nuxt form and backend route both consume. The shared schema adds setup cost but reduces frontend/backend drift. For this feature, I recommend the shared contract if both repos will change in the same scope.

### 4.3 Anti-patterns

- Agent jumps to implementation before agreeing on shape.
- Human gives an under-specified ask and accepts whatever the agent invents.
- Either side avoids the hard tradeoffs.

### 4.4 Output of Phase 1

A short written summary:

- Problem.
- Chosen solution shape.
- Out-of-scope items.
- Dependencies and blockers.
- Rough size.

This becomes the seed of the scope doc.

---

## 5. Phase 2 - Scoping

Goal: produce a written contract that both sides can review and use as source of truth.

### 5.1 When to write a scope doc

Write one when the work is multi-file, multi-day, architectural, security-sensitive, privacy-sensitive, customer-facing, or changes an API contract.

Skip one for narrow bug fixes, one-line changes, simple doc edits, or work already fully described by an accepted scope.

### 5.2 Required sections

Minimum sections:

1. Executive summary.
2. Goals and non-goals.
3. Glossary.
4. Architecture, data flow, API surface, or UX walkthrough.
5. Decisions with rationale.
6. Phasing and estimates.
7. Open items and risks.
8. Backlog.

The backlog is load-bearing. If a finding emerges but is not in scope today, capture it there.

### 5.3 Decision-making in scope

Every meaningful decision gets:

- The decision.
- The rationale.
- Alternatives considered.

Example:

> Decision: Generated course creation uses a typed request schema shared between the Nuxt form and the Hono endpoint.
>
> Rationale: The form and endpoint must stay aligned as fields evolve. A shared schema reduces drift.
>
> Alternatives considered: Separate frontend and backend validation, rejected because the same field rules would need to be updated in two places.

### 5.4 Anti-patterns

- Scope doc as planning theater: written, then ignored.
- "TBD" everywhere.
- No backlog section.
- Line-level pseudo-code where the code should carry the detail.

### 5.5 Output of Phase 2

A scope doc, usually in `scopes/<FEATURE>_SCOPE.md`, ready for review.

---

## 6. Phase 3 - Implementation

Goal: build what the scope describes with visible progress and green checkpoints.

### 6.1 Default cadence

- One coherent change per checkpoint.
- Run affected checks after each checkpoint where feasible.
- Surface deviations from scope before making them.
- Report checkpoint status in three parts:
  - What changed.
  - What was verified.
  - What remains.

Example:

> Added the typed course-generation request schema and wired the Nuxt form to it. Verified with the form unit test and a manual invalid-input smoke path. Next: Hono endpoint validation and response contract test.

If the agent loses track of state, it must stop and re-anchor by reading the scope doc, current diff, and relevant files.

### 6.2 Reuse before writing

Frontend audit:

- Check `package.json`.
- Search `app/components`, `app/components/common`, `app/components/features`, `app/composables`, `app/services`, `app/lib`, and `app/stores` if present.
- Prefer existing shadcn-vue primitives and app wrappers.
- Prefer existing API client and auth session conventions.

Backend audit:

- Check `package.json`.
- Search route modules, middleware, services, schemas, tests, and response helpers.
- Prefer existing Hono app wiring and request context patterns.
- Prefer existing validation and error-response conventions.

If nothing fits, propose the new dependency or abstraction before adding it.

### 6.3 Production-grade pattern enforcement

Frontend:

- TypeScript in Vue files.
- Explicit props and emits.
- Typed reusable composables.
- Pinia for shared state.
- Stable loading, empty, error, and success states.
- Accessible controls and predictable keyboard behavior.
- Responsive layout checked at relevant viewport sizes.

Backend:

- Thin Hono handlers.
- Typed request and response contracts.
- Input validation at trust boundaries.
- Consistent error responses.
- Services or helpers for reusable business logic.
- Timeouts and failure handling around external AI provider calls.
- Rate limits or abuse controls where user-triggered expensive work is introduced.

Both:

- No hidden global state without reason.
- No one-off abstractions without a second use case.
- No debug output.
- No comments that restate the code.

### 6.4 Surfacing deviations

When implementation needs to deviate from the scope:

1. Stop before making the deviation.
2. Explain the original plan, the discovered fact, and the recommended change.
3. Wait for confirmation if the deviation changes scope, behavior, architecture, security, or API contracts.
4. Update the scope doc when the decision lands.

### 6.5 Anti-patterns

- Big-bang implementations with no checkpoints.
- Skipping tests because the change feels small.
- Adding dependencies without discussion.
- Leaving debug output behind.
- Writing comments that explain what the code already says.

### 6.6 Tactical loops vs strategic checkpoints

Inside a checkpoint, the agent iterates autonomously toward the agreed success criteria. It can run tests, fix failures, and retry without asking after every tactical step.

Across checkpoints, the agent asks before changing the contract: scope, architecture, API shape, security posture, or product behavior.

The human defines success. The agent chooses the implementation path unless a specific path is itself part of the requirement.

### 6.7 Fullstack boundaries

For fullstack scopes, prefer ending a session at a clear backend/frontend contract boundary.

The handoff contract should include:

- Route path.
- Method.
- Request schema.
- Response schema.
- Error shape.
- Auth and session assumptions.
- Loading, empty, and error frontend states.
- Any feature flags or runtime config keys.

Frontend work should start from that contract, not from the agent's memory of backend behavior.

Keep small vertical slices together when splitting adds more overhead than value.

### 6.8 Fullstack anchor repos

When frontend and backend live in separate repos, choose one anchor repo for each fullstack scope. The anchor owns the scope doc and points to the sibling repo path.

Rules:

- A fullstack scope doc lives in one repo only.
- The other repo is referenced by path.
- Do not duplicate scope docs across repos.
- Frontend-only work can still use frontend-local scope docs.
- Backend-only work can still use backend-local scope docs.

The anchor is a documentation choice. The API contract still owns the boundary.

---

## 7. Phase 4 - Testing

Goal: every change is validated by a test or smoke path that proves the change works and would catch a regression.

### 7.1 What "tested" means

| Layer | Bar |
| --- | --- |
| Pure functions | Unit test covers happy path and edge cases |
| Vue components | Component test where a harness exists, otherwise documented browser smoke path |
| Composables | Unit test or focused usage test |
| Pinia stores | Store test for state transitions and derived values |
| API client services | Contract-oriented test with mocked transport or integration target |
| Hono routes | Request-level test against the app/router where a harness exists |
| External AI calls | Boundary tests with mocked success, failure, timeout, and malformed responses |
| User-facing flows | Browser smoke test for main path and at least one failure path |

### 7.2 Regression bar and intent bar

Every test must pass two questions:

- Regression bar: would this test have failed before the change?
- Intent bar: would this test fail if the business rule changed?

If the answer is no, the test is likely not proving the behavior.

Patterns:

- Bug fix: reproduce the bug, then prove the fix.
- New endpoint: assert status, response shape, error shape, and meaningful side effects.
- New UI flow: assert user-observable behavior, not component internals.
- Auth/session rule: vary inputs across allowed and denied branches.
- Performance fix: add a measurable guard when feasible.

### 7.3 Test runs at checkpoints

After every coherent change:

- Run the affected test or check suite.
- If green, proceed.
- If red, fix or roll back before moving on.

When a filtered test fails but the full affected file passes, suspect pre-existing order dependence. Flag it, then validate with the smallest reliable suite.

### 7.4 Anti-patterns

- "I will add tests later."
- Tests that assert nothing meaningful.
- Tests that only pass in a specific order.
- Lint or type failures ignored.
- Smoke paths that cover only the happy path when the change is about failure behavior.

---

## 8. Phase 5 - Review

Goal: run structured passes over the shipped code to surface what is solid, what is deferred, and what needs immediate action.

### 8.1 Code review

Before the production-readiness pass, the agent reviews its own diff like a senior engineer seeing it for the first time. The goal is to find blockers, not defend the implementation.

Use these buckets when applicable:

1. Correctness and consistency.
2. Code quality.
3. Performance and resource management.
4. Overengineering.
5. Error handling and resilience.
6. Test quality.
7. Comment hygiene.
8. Convention fit.

Each finding should include:

- File and line.
- Severity: critical, major, or minor.
- Issue.
- Concrete fix.

Severity:

- Critical: code is wrong or unsafe in normal use.
- Major: a reviewer would block on it.
- Minor: worth fixing but not necessarily blocking.

Run a light self-review after each checkpoint. Run the heavier structured review on the cumulative diff for non-trivial work.

Mechanical fixes can be applied during the review pass. Logic or behavior fixes become a new implementation checkpoint with tests.

For customer-facing changes, suggest a fresh-eye review by another agent or human after the self-review. For auth, authorization, validation, secrets, AI-provider boundaries, user-generated content, or privacy-sensitive changes, suggest a security-focused review.

### 8.2 Multi-axis production-readiness review

For non-trivial features, review at least:

1. Performance:
   - Frontend re-renders, hydration issues, bundle impact, request fanout.
   - Backend hot routes, external AI calls, rate limits, expensive synchronous work.
2. Security:
   - Auth/session handling, authorization, input validation, output encoding, secrets, user-generated learning content.
3. Stability:
   - Failed API requests, AI provider failures, malformed provider responses, retries, fallbacks.
4. Availability:
   - Backend unavailable, external provider unavailable, network failures, graceful degradation.
5. Scale readiness:
   - Large generated courses, many lessons, concurrent course generations, hot endpoints, storage growth.

Add domain-specific axes when relevant.

### 8.3 Findings ledger

Use one ledger for review findings:

```markdown
| ID | Finding | Severity | Action | Status |
| --- | --- | --- | --- | --- |
| S-1 | Endpoint accepts unvalidated topic depth | High | Add request schema and route test | Shipped |
| P-1 | Course page refetches lessons on every tab switch | Medium | Cache lesson state in store | Backlog |
| ST-1 | AI provider timeout leaves spinner active | Critical | Add timeout error state | Shipped |
```

Severity:

- Critical: blocks ship.
- High: should fix before customer ramp.
- Medium: fix opportunistically or document if deferred.
- Low: improvement candidate; backlog is acceptable.

### 8.4 Code-first findings

Every finding must be backed by a code reference, test result, or observed behavior. "This might be slow" is not a finding. "The lesson view calls `fetchLesson()` inside a watcher that also updates on tab changes, causing a request per tab switch" is a finding.

### 8.5 Honest confidence reporting

After review, report confidence with calibration:

- "Frontend: high confidence. Component test, build, and browser smoke path passed."
- "Backend: medium. Request tests passed, but no load test was run."
- "Performance: logical analysis only. No production-like concurrent generation test available."

Do not say "all good" without naming what was checked.

### 8.6 Anti-patterns

- Reviewing only the diff without reading surrounding context.
- Findings without severity.
- "All good" without verification.
- Deferred findings without backlog capture.

---

## 9. Phase 6 - Closing

Goal: leave the work in a state where the next session can pick up cleanly.

### 9.1 Topics and decisions gate

Before any commit or final handoff on non-trivial work, surface a topics list: every open concern, idea, deviation, or "should we" that is not already in the findings ledger.

For each topic, decide:

- Handle now.
- Backlog.
- Drop.
- Refine scope.

The gate exits when the list is empty.

Load-test relevance is a required sub-check for non-trivial work. Consider load or concurrency validation when changes include:

- Expensive AI-provider calls.
- New user-triggered generation flows.
- Hot request paths.
- Request fanout changes.
- Cache strategy changes.
- Async processing, queues, or background jobs if present.
- Rate-limit or abuse-control changes.
- Large content rendering or large payloads.

For each triggered case, propose:

- Run now.
- Run later with a named gate.
- Skip with rationale.
- Cannot run here and backlog the tooling gap.

### 9.2 Update durable docs

Reflect shipped state:

- Mark completed scope items.
- Add backlog items discovered during build.
- Add locked decisions.
- Update architecture/API sections if implementation diverged.
- Update this process doc only after explicit approval.

### 9.3 Commit messages

When asked to produce a commit message:

- Subject under 70 characters.
- Imperative mood.
- Body explains why, what changed, tradeoffs, and test coverage.

Template:

```text
Add typed course generation contract

## What changed
- Added shared request and response shapes for course generation.
- Wired the Nuxt form and Hono endpoint to the same contract.

## Why
- Prevent frontend/backend drift as generation options evolve.

## Test coverage
- Request contract test for invalid depth and valid beginner course.
- Nuxt form smoke path for validation errors.
- Build passed.
```

### 9.4 Durable context updates

Use the durable context available to the active tool:

Claude Code:

- Project memory can capture user preferences and non-obvious project facts.
- Do not store current code state that can decay quickly.
- Rewrite stale memory rather than appending contradictions.

Codex:

- Use `AGENTS.md`, repo docs, scope docs, and available skills/plugins as durable context.
- Do not assume Claude memory or Claude slash commands exist.
- If a rule belongs in the repo, propose a doc update rather than relying on hidden memory.

Shared:

- Scope docs are the preferred durable feature memory.
- Repo docs beat tool memory.
- Code reads beat all memory.

### 9.5 Hand-off

End with:

- What changed.
- What was verified.
- What remains.
- Any decision needed before the next session.

---

## 10. Anti-patterns to actively avoid

### 10.1 Memory-driven claims

The agent cites memory as fact without verifying against current code. Fix: read the file or search the symbol before claiming.

### 10.2 Speculative refactoring

The agent edits adjacent code without need. Fix: keep diffs scoped. Surface nearby cleanup as a topic.

### 10.3 Big-bang ships

A multi-day feature lands as one unreviewable diff. Fix: split into coherent checkpoints and reviewable commits.

### 10.4 False-confidence reporting

The agent says "done", "working", or "tests pass" when the status is partial, uncertain, or unverified. Fix: report exactly what passed and what was not checked.

### 10.5 Half-built features

A feature ships with one path tested and others stubbed. Fix: finish it or scope it out explicitly.

### 10.6 Phantom decisions

A choice is made but never recorded. Fix: write meaningful decisions into the scope doc.

### 10.7 Test order dependence

A test only passes when siblings run first. Fix: isolate setup and flag pre-existing examples.

### 10.8 Skipping review passes

Tests pass and the agent skips review. Fix: run the light review every checkpoint and the heavy review for non-trivial diffs.

### 10.9 Type narrowing without runtime verification

Static analysis suggests a branch is unreachable, and the agent deletes defensive behavior without checking runtime behavior. Fix: verify the runtime contract and affected tests before deleting the branch.

### 10.10 Partial-pattern search claiming coverage

The agent searches for one form of a pattern and claims the pattern is absent across the codebase. Fix: enumerate equivalent forms or read representative files before claiming absence.

### 10.11 Averaging contradictory patterns

The codebase has two patterns and the agent creates a third blended pattern. Fix: pick the more recent or better-tested pattern, state why, and flag the other for cleanup.

### 10.12 Tool confusion

The agent assumes Claude-only mechanics in Codex, or Codex-only mechanics in Claude Code. Fix: follow the shared principles, then use only the active tool's available mechanics.

---

## 11. Templates

### 11.1 Scope doc template

```markdown
# <Feature Name> - Scope and Specification

**Status:** Proposed | In progress | Shipped | Retrospective
**Owner:** TBD | <person>
**Last updated:** YYYY-MM-DD
**Audience:** Engineering, Product, Design

---

## 1. Executive summary

Why this work exists and the chosen shape.

**Out of scope by explicit decision:**

- Item - reason

---

## 2. Goals and non-goals

### 2.1 Goals

- ...

### 2.2 Non-goals

- ...

---

## 3. Glossary

| Term | Meaning |
| --- | --- |
| ... | ... |

---

## 4. User walkthrough or system architecture

How users experience it, or how the system is shaped.

---

## 5. API contract

For backend/frontend work:

- Route path:
- Method:
- Request schema:
- Response schema:
- Error shape:
- Auth/session assumptions:
- Runtime config:

---

## 6. Data and state

Frontend state, backend persistence, caches, generated content, and ownership.

---

## 7. Frontend architecture

Pages, components, composables, stores, forms, loading states, empty states, error states.

---

## 8. Backend architecture

Routes, middleware, schemas, services, external provider boundaries, rate limits.

---

## 9. Privacy and security

Threat model, validation, authorization, secrets, user-generated content, retention.

---

## 10. Performance and scale

Expected volumes, hot paths, payload sizes, rendering cost, provider latency, scaling triggers.

---

## 11. Existing patterns to follow

Pointers to similar features or conventions in the codebase.

---

## 12. Phasing and estimates

Phases with checkpoints. For fullstack scopes, mark the API contract handoff explicitly.

---

## 13. Open items and risks

| Item | Risk | Mitigation |
| --- | --- | --- |
| ... | ... | ... |

### 13.1 Production-readiness backlog

Items surfaced during review that do not block ship.

---

## 14. Locked decisions

| Decision | Rationale | Alternatives considered |
| --- | --- | --- |
| ... | ... | ... |

---

## 15. References

- `<doc>.md` - what it covers
```

### 11.2 Findings ledger template

```markdown
| ID | Finding | Severity | Action | Status |
| --- | --- | --- | --- | --- |
| <axis>-1 | <code-grounded statement> | Critical/High/Medium/Low | <one-line fix> | Shipped/Backlog/Deferred |
```

Suggested axis prefixes:

- C - correctness.
- S - security.
- P - performance.
- ST - stability.
- A - availability.
- SC - scale readiness.
- UX - user experience.
- T - test quality.

### 11.3 Backlog entry format

```markdown
- **<short title>** - <one-paragraph context>. <One-line fix or sketch>. <Trigger condition or "any time" or "after X ships">.
```

### 11.4 Commit message template

```text
<imperative subject under 70 chars>

## What changed
- ...

## Why
- ...

## Test coverage
- ...
```

### 11.5 Proposed process-doc addition template

When surfacing a candidate addition to this document, use this format. Do not edit the doc until approved.

```markdown
**Proposed addition to AI_COLLABORATION.md section <section number, or "new section">**

**What:** <the rule, practice, anti-pattern, or correction>

**Why:** <the trigger that surfaced it>

**Where:** <which section it fits into and how it integrates>

**Generality:** <broad Learn Flow rule or narrow project-specific note>

**Approve / Decline / Refine?**
```

If approved, update this file and the header date. Learn Flow owns this local copy. No external sync process is assumed.

---

## 12. Concrete examples

### 12.1 The stale session-memory mistake

Setup: during a review pass, an agent claims the course-generation API still returns `lessons` as a flat array because it remembers an earlier implementation.

Catch: the human asks whether the current endpoint now returns nested modules.

Fix: the agent re-reads the Hono route, response schema, API client, and consuming Nuxt page. The current code returns modules with nested lessons. The agent corrects the review finding and updates durable context if needed.

Lesson: memory starts the search; code decides the answer.

### 12.2 The API client contract drift

Setup: a Hono endpoint changes validation errors from `{ message }` to `{ error: { message, fields } }`, but the Nuxt form still reads `message`.

Diagnosis: the form shows a generic fallback instead of field-level errors.

Fix: update the shared error type, API client, and form error mapping. Add a request-level backend test and a frontend smoke path for invalid input.

Lesson: fullstack handoffs need explicit request, response, and error contracts.

### 12.3 The AI provider failure path

Setup: generated-course creation works on the happy path, but a provider timeout leaves the submit button disabled and the spinner active.

Diagnosis: the backend returns a timeout response, but the frontend mutation has no failure state transition.

Fix: normalize the backend timeout error shape, add a frontend error state, and verify retry behavior.

Lesson: user-facing AI features must treat provider failure as a normal path.

### 12.4 The Pinia state duplication

Setup: two pages track current course progress separately with local refs.

Diagnosis: navigation between pages shows stale progress because each page owns its own copy.

Fix: move shared progress into a Pinia store and keep page-local refs only for transient UI state.

Lesson: cross-component state belongs in the shared state layer when multiple routes depend on it.

---

## 13. Tool-specific notes

### 13.1 Claude Code

Claude Code sessions should begin by reading:

- `CLAUDE.md`
- `ai-process/AI_COLLABORATION.md`
- Relevant scope docs and code files

Claude project memory, when available, is useful for:

- User preferences.
- Non-obvious project facts.
- Pointers to durable docs.
- Prior corrections that still apply.

Do not use Claude memory for:

- Current code state.
- Task progress within a session.
- Facts that can be derived from code.

Claude-specific skills, plugins, and slash commands may be used when present, but the agent should not assume they exist in every repo.

### 13.2 Codex

Codex sessions should begin by reading:

- `AGENTS.md`
- `ai-process/AI_COLLABORATION.md`
- Relevant scope docs and code files

Codex should use available repo instructions, skills, and plugins when relevant. It should prefer fast code search (`rg` when available), direct file reads, targeted shell checks, and patch-style file edits according to the active environment.

Codex must not assume Claude memory, Claude slash commands, or Claude-specific plugins exist.

### 13.3 Shared tool discipline

Use the right tool for the job:

- Search tools for finding files and symbols.
- File reads for known files.
- Shell for builds, tests, lint, typecheck, git inspection, and non-mutating checks.
- Dedicated edit tools for file changes when available.

Do not use shell write tricks when a proper edit tool is available.

### 13.4 Confirmation patterns

For destructive or shared-state actions, confirm explicitly:

- "Do you want me to commit this now or hold for review?"
- "Do you want me to push this branch?"
- "This changes shared configuration. Confirm before I run it?"

Previous approval for a different action does not transfer.

### 13.5 Scope docs as durable artifacts

Scope docs are the durable feature memory. Agents should:

- Read the relevant scope at session start.
- Update it as decisions land.
- Reference sections in handoffs and commit messages.
- Capture deferred work in the backlog.

### 13.6 Cross-scope TODO index

When Learn Flow accumulates enough scopes that open work becomes hard to track, maintain a project-level `scopes/TODO_INDEX.md`.

Each entry should point back to the source scope or durable memory. The index is a pointer file, not the source of truth.

Adopt this only when it solves a real tracking problem.

---

## 14. Transferability to other AI tools

The principles are tool-agnostic:

1. Verify current code before claiming.
2. Use scope docs for non-trivial work.
3. Keep decisions explicit.
4. Run relevant checks.
5. Review before closing.
6. Report confidence honestly.

Tool mechanics differ. The process does not.

---

## 15. This is a living document

This document should evolve deliberately as Learn Flow practice evolves.

The human is the curator. The agent is the proposer. Agents do not edit this document without explicit approval.

### 15.1 What qualifies as a candidate addition

Yes:

- A correction from the human that applies beyond the current task.
- A repeated failure mode.
- A new Learn Flow convention.
- A new tool or workflow that changes how agents should work.
- A stack-specific rule that is not already documented elsewhere.

No:

- One-off corrections specific to a single file.
- Current task progress.
- Things already documented clearly elsewhere.
- Speculative advice without a grounding incident.

### 15.2 When to surface a proposal

- In real time when the trigger is clear.
- At session end as a deliberate sweep.
- Never silently.

### 15.3 Approval flow

Use the template in section 11.5.

Human responses:

- Approve: edit this document and update the header date.
- Decline: do not edit; avoid re-proposing the same item without new evidence.
- Refine: revise the proposal and ask again.

Most sessions produce no candidate additions. That is normal.

### 15.4 Stack playbooks

Stack-specific guidance can live alongside this document when it becomes too detailed for the shared process guide. Examples:

- Nuxt data-fetching conventions.
- Pinia store patterns.
- Vue composition conventions.
- Hono route and validation conventions.
- Browser debugging workflows.

Keep this document focused on process and cross-tool collaboration. Put deep implementation recipes in stack playbooks or repo-specific docs.
