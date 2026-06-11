---
name: prettier-and-eslint
description: Formatting + linting discipline for Vue/JS/TS edits across Scala QSR projects — when to run them, which to run first, how to handle Prettier-vs-ESLint conflicts, what to do when only one tool is installed, scope rules (changed files vs whole repo), pre-commit gate, editor integration. Use before declaring any JS/TS/Vue edit done.
when_to_activate: About to declare any `.js`, `.ts`, `.vue`, `.mjs`, or `.cjs` edit done — this is a closing-gate skill, activate it on every such change. Also activate when setting up or debugging a project's lint/format toolchain (`prettier`, `eslint`, `package.json` scripts, `.prettierrc*`, `eslint.config.{js,mjs,ts}`, `.eslintrc.*`, `lint-staged`, `simple-git-hooks`, `husky`, `.editorconfig`), or when resolving a fight between Prettier and ESLint over the same file.
---

# prettier-and-eslint

Formatting and linting discipline for Vue / JS / TS edits across Scala QSR projects. Adapted from Anthony Fu's lint-as-release-gate approach — see _Source_ at the bottom.

## Defaults this skill assumes

- **Prettier + ESLint are the team's stack** — Prettier for formatting, ESLint for correctness, `eslint-config-prettier` keeping them out of each other's way. This is settled, not under review. Antfu's all-in-one `@antfu/eslint-config` shows up below as background for the Source section only; do not propose it as an alternative mid-edit.
- **Prettier wins** on any formatting disagreement. ESLint's stylistic rules are off the table — they're the source of the fight.
- **Not every project is fully wired yet.** Some have only Prettier, some only ESLint, some neither. Brownfield repos are catching up to the team default; the skill checks what's there before running and treats missing pieces as gaps to flag, not as deliberate alternative setups.

## Core principles

- **Both tools, every edit.** Prettier _and_ ESLint pass on every JS/TS/Vue change before "done" is uttered.
- **Run on changed files, not the whole repo.** A lint pass on a 50k-file project costs nothing for the agent and minutes for the dev. Targeted runs are the convention.
- **Don't invent commands.** Read `package.json` scripts and what's installed; use what's wired.
- **Don't suppress.** No `// eslint-disable-next-line` or `// prettier-ignore` to make a warning go away. If a rule genuinely shouldn't apply to a file, change the config — and explain why in the same edit.

---

## 1) Discover what's installed before running anything

Before suggesting any command, check what the project actually has:

```bash
# Tools as dependencies (dev or runtime)
grep -E '"(prettier|eslint)"' package.json

# Project-defined scripts
grep -E '"(format|lint|check)"' package.json

# Config files present
ls -1 .prettierrc* .prettierignore eslint.config.* .eslintrc.* .editorconfig 2>/dev/null
```

**Decision tree:**

- Both tools present → §3 (run both).
- Only Prettier → §3 step 1 only.
- Only ESLint → §3 step 2 only.
- Neither → §8 (edge cases).

Project scripts (`npm run format`, `npm run lint`) are the **first-choice invocation** — they encode the project's chosen flags. Fall back to `npx prettier` / `npx eslint` only if no script is wired.

---

## 2) The discipline

Before declaring any JS / TS / Vue edit done, both tools must have run cleanly on the changed files.

**This is a gate, not a suggestion.** Tests that pass don't substitute for a lint pass — they verify behaviour, not formatting or rule compliance. Skipping lint on "declaring done" forces the next contributor (or CI) to clean up, and CI failures on otherwise-correct work are the most expensive way to learn the convention.

Surfacing the run in conversation matters too — show the command you ran and the result. "Lint passes" without showing the invocation is the same as not running it.

---

## 3) Run order — Prettier first, ESLint second

Two separate steps in this order.

```bash
# Step 1 — format the changed files
npm run format -- path/to/Changed.vue src/changed.ts
# or, if no script: npx prettier --write path/to/Changed.vue src/changed.ts

# Step 2 — lint the same files with --fix
npm run lint -- --fix path/to/Changed.vue src/changed.ts
# or, if no script: npx eslint --fix path/to/Changed.vue src/changed.ts
```

**Why Prettier first.** Prettier handles formatting concerns (whitespace, line breaks, quotes); ESLint then handles correctness and any non-formatting rules. With `eslint-config-prettier` in the project's ESLint config (the team default), ESLint's formatting rules are turned off, so the two tools don't fight on the same line.

**Alternate setup.** Some older projects use `eslint-plugin-prettier`, which runs Prettier as an ESLint rule — in that case running ESLint alone covers both. Detect via:

```bash
grep -E '"eslint-(config|plugin)-prettier"' package.json
```

If only `eslint-plugin-prettier` is present, step 2 alone is the gate. Don't run Prettier separately on top — it duplicates work and can produce diff churn.

---

## 4) Scope — changed files, not the whole repo

```bash
# What changed in this edit?
git diff --name-only
git diff --name-only --staged

# Filter to lintable extensions
git diff --name-only | grep -E '\.(js|ts|vue|mjs|cjs)$'
```

Pass those paths to the format/lint commands. **Never** run the project-wide `npm run lint` / `npm run format` as part of a closing pass on a single-feature edit:

- It surfaces unrelated pre-existing violations the agent didn't introduce, and tempts a noisy "fix everything" diff.
- It's slow and obscures the actual signal — did _this edit_ lint clean?

A whole-repo run belongs to one of three contexts only: initial adoption of a config, a deliberate "fix-the-world" commit, or CI.

---

## 5) Prettier vs ESLint — conflict resolution

When Prettier and ESLint disagree on the same file, **Prettier wins.** The path to enforce this is config-level, not per-file:

1. Ensure `eslint-config-prettier` is in the ESLint config (last in the `extends` chain or last in the flat-config array). It disables every ESLint rule Prettier handles.

   Flat config:

   ```js
   // eslint.config.js
   import eslintConfigPrettier from "eslint-config-prettier";
   export default [
   	// ...other configs
   	eslintConfigPrettier,
   ];
   ```

   Legacy `.eslintrc`:

   ```json
   { "extends": ["...", "prettier"] }
   ```

2. Verify with `npx eslint-config-prettier path/to/any-file.ts` — it prints any ESLint rules still active that conflict with Prettier.

3. If a conflict persists after that, it's an ESLint _non-formatting_ rule masquerading as a formatting one (e.g. `vue/html-indent` with logic in it). Disable it in the config file with a one-line comment explaining why.

**Never** resolve a conflict by adding `// prettier-ignore` to source files. That's a per-line suppression of a config problem.

---

## 6) Pre-commit gate

Projects with `lint-staged` + `simple-git-hooks` (or `husky`) wired up get a free closing pass on commit. When proposing this setup, the convention is:

```json
// package.json
{
	"scripts": {
		"prepare": "simple-git-hooks"
	},
	"simple-git-hooks": {
		"pre-commit": "npx lint-staged"
	},
	"lint-staged": {
		"*.{js,ts,vue,mjs,cjs}": ["prettier --write", "eslint --fix"]
	}
}
```

If a project doesn't have this wired and is large enough to benefit (multi-dev, frequent commits), suggest it as a follow-up — don't silently add it to a feature commit.

**The pre-commit hook is a safety net, not a replacement for the closing gate.** Always lint before announcing done in conversation; the hook just catches the case where you forgot.

---

## 7) Editor integration

For developers running the editor alongside the agent, the conventional wiring:

- VS Code: `editor.formatOnSave: true`, `editor.defaultFormatter: "esbenp.prettier-vscode"`, `editor.codeActionsOnSave: { "source.fixAll.eslint": "explicit" }`.
- `.vscode/extensions.json` recommends `esbenp.prettier-vscode` and `dbaeumer.vscode-eslint` so new contributors get the prompts.

This is project-shape guidance the agent rarely sets up directly — but when reviewing why a teammate's edits keep introducing format churn, the missing editor wiring is usually the answer.

---

## 8) Edge cases

**Only Prettier installed (no ESLint).** Run Prettier. Surface the gap: "ESLint isn't wired in this project — the team stack expects both. Want me to set ESLint up alongside Prettier?"

**Only ESLint installed (no Prettier).** Run ESLint with `--fix` and surface the gap: "Prettier isn't wired in this project — the team stack uses Prettier for formatting. Want me to add it?" If the ESLint config includes stylistic rules (`@stylistic/eslint-plugin`, `@antfu/eslint-config`) it's doing Prettier's job; adding Prettier will fight those rules until stylistic is turned off, so flag the migration shape rather than just running `pnpm add -D prettier`. **Don't silently leave a project on an ESLint-only setup** — the team default is Prettier + ESLint, and surfacing the divergence is the first step toward closing it.

**Neither installed.** Don't invent. Check for alternative formatters before declaring the project unconfigured:

```bash
grep -E '"(biome|@biomejs|oxlint|deno|rome)"' package.json
ls -1 biome.json deno.json .oxlintrc* 2>/dev/null
```

If Biome or Oxlint is wired, use that for the closing pass — and surface that the project is outside the team's Prettier + ESLint default. If genuinely nothing is configured, surface it explicitly: "This project has no formatter/linter configured — closing-pass discipline can't run. The team default is Prettier + ESLint; want me to set them up?"

**Lint passes locally but fails in CI.** Usually a Node-version or config-resolution mismatch. Check that the project's `engines.node` (or `.nvmrc`) matches the CI's Node version and that the ESLint/Prettier configs being loaded are the same in both environments.

---

## Done-checklist

Before declaring a JS/TS/Vue edit done:

- [ ] Identified what's installed via §1 (read `package.json` + config files).
- [ ] Ran Prettier on the changed files (or noted absence).
- [ ] Ran ESLint with `--fix` on the changed files (or noted absence).
- [ ] No new `// eslint-disable-*` or `// prettier-ignore` comments introduced.
- [ ] If a conflict surfaced, fixed it in config per §5 — not per-line suppressions.
- [ ] Showed the actual commands and their results in conversation, not just "lint passes".

---

## Source

Discipline structure adapted from Anthony Fu's [`antfu`](https://github.com/antfu/skills/tree/main/skills/antfu) skill — particularly the lint-as-release-gate framing, lint-staged + simple-git-hooks pre-commit pattern, and editor-integration emphasis. The Scala QSR team's actual stack diverges from antfu's recommended `@antfu/eslint-config` single-config approach: we use **Prettier + ESLint as separate tools** with `eslint-config-prettier` mediating, because that's the convention every active Scala QSR Vue/Nuxt project has converged on. Where antfu's approach and team practice diverge, this file is the source of truth — propose changes via the §15 living-doc loop in `team-ai-development-process`.
