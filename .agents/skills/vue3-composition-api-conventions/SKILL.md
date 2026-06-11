---
name: vue3-composition-api-conventions
description: Vue 3 Composition API conventions for Scala QSR projects — `<script setup>` defaults, reactivity choices (`ref` vs `reactive` vs `shallowRef`), SFC structure, component splits, data flow, composables, lifecycle hooks. Use when writing or refactoring any `.vue` file or composable.
when_to_activate: Writing or modifying `.vue` components, composables (`composables/use*.{ts,js}`), or any Vue 3 setup/reactivity code. Trigger on tasks that create or edit a Vue SFC, declare reactive state (`ref`, `reactive`, `computed`, `watch`), or extract/refactor a composable. Skip if the project is still on Vue 2 — see the `vue2-to-vue3-migration` advisory.
---

# vue3-composition-api-conventions

Team conventions for writing Vue 3 components and composables across Scala QSR projects. Adapted from Anthony Fu's `vue-best-practices` skill — see _Source_ at the bottom.

## Defaults this skill assumes

- **Vue 3** with **`<script setup>`** and the **Composition API**.
- **Pinia** for cross-component state. Store-shape rules live in `pinia-store-patterns`; this skill stops at composables.
- **TypeScript is optional** per project. TS-only bullets below are tagged **(TS)** — JS projects can ignore those. Project-wide TS guidance lives in the `typescript-conventions` advisory.
- Vue 2 / Vuex projects: install the relevant migration advisory and defer to it for the transitional period.

## Core principles

- One source of truth — keep reactive state minimal and derive everything else with `computed`.
- Make data flow explicit — props down, events up by default; reach for `provide`/`inject` or a store only when the shape requires it.
- Small, focused components — split as soon as more than one clear responsibility appears.
- Readability over cleverness — templates stay declarative; branching and derivation belong in script.

---

## 1) `<script setup>` defaults & macros

Use `<script setup>` for every new SFC. Macros (`defineProps`, `defineEmits`, `defineModel`, `defineExpose`) are compiler-level — don't import them.

**SFC block order:** `<script setup>` → `<template>` → `<style scoped>`. Keep this order so cross-file scans are predictable.

**Component name:** PascalCase for both filename and in-template tag (`<UserCard />`, not `<user-card>`).

**Contracts (TS) — declare explicitly:**

```vue
<script setup lang="ts">
const props = defineProps<{ userId: string; expanded?: boolean }>();
const emit = defineEmits<{ select: [id: string]; close: [] }>();
const model = defineModel<string>();
</script>
```

**Contracts (JS) — runtime declarations:**

```vue
<script setup>
const props = defineProps({
	userId: { type: String, required: true },
	expanded: Boolean,
});
const emit = defineEmits(["select", "close"]);
</script>
```

**Don't:** mix `<script setup>` with a second `<script>` block unless you genuinely need a non-setup export (lazy route metadata, custom component name). Inline first; split only when forced.

---

## 2) Reactivity

### Picking a primitive

| Shape                                                                 | Pick                                                                           |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Primitive (string/number/boolean/null)                                | `shallowRef()` — same ergonomics as `ref`, less work for the reactivity system |
| Object/array you replace **wholesale**                                | `ref()` (deep reactivity)                                                      |
| Object you mostly **mutate in place** (form, store-style local state) | `reactive()`                                                                   |
| Class instance, SDK handle, large opaque blob                         | `shallowRef()` — Vue won't proxy its internals                                 |
| Wrapper where only top-level keys should be reactive                  | `shallowReactive()`                                                            |

```ts
const count = shallowRef(0); // ✅ primitive
const user = reactive({ name: "Alice", age: 30 }); // ✅ mutate in place
const items = ref<Item[]>([]); // ✅ frequently replaced
const sdk = shallowRef(new SomeClient()); // ✅ opaque instance
```

### `reactive` rules

- Don't destructure a `reactive()` object — destructured locals lose reactivity. Use `toRefs(state)` if you need named bindings.
- When watching a `reactive` property, pass a getter or `toRefs` it first:

  ```ts
  watch(() => state.count, ...)   // ✅
  watch(state.count, ...)         // ❌ inert watcher
  ```

### `computed`

- Derive — don't reassign a `ref` from a watcher when a `computed` will do.
- **Pure getters only.** No mutations, no fetches, no emits. Side effects go in watchers.
- Keep filtering/sorting **out of templates** — name the derivation in script and reference it from the template.

```ts
const visibleItems = computed(() =>
	items.value.filter((i) => i.active).sort((a, b) => a.name.localeCompare(b.name)),
);
```

### `watch` / `watchEffect`

- Prefer `{ immediate: true }` over a duplicate `onMounted(() => handler(value))`.
- Cancel in-flight async work via the cleanup parameter when watching rapidly-changing inputs (search boxes, filters):

  ```ts
  watch(query, async (q, _prev, onCleanup) => {
  	const ctl = new AbortController();
  	onCleanup(() => ctl.abort());
  	const res = await fetch(url, { signal: ctl.signal });
  	results.value = await res.json();
  });
  ```

- `watchEffect` is fine for tracked-dependency effects where old-vs-new values don't matter. Reach for explicit `watch` when you need either.

---

## 3) SFC structure & template safety

- **Scoped styles by default.** Reserve non-scoped `<style>` for global concerns (resets, design tokens) and only at app-shell level.
- Prefer **class selectors** over element selectors inside `<style scoped>` — element-selector scoped CSS is slower at runtime.
- Use `:deep()` only when crossing the scope boundary is unavoidable; an extra wrapper class is usually cleaner.
- Vue 3.5+: use `useTemplateRef('name')` over the legacy `ref('name')`-on-element pattern for typed template refs.

**Template rules:**

- Always give `v-for` a stable primitive key (`:key="item.id"`). Index keys break component identity on reorder.
- Never combine `v-if` and `v-for` on the same element. Put the filter in a `computed` and `v-for` over that.
- `v-if` for rarely-visible or heavy subtrees; `v-show` for frequently-toggled elements.
- Never `v-html` untrusted content. If user HTML must render, sanitize via DOMPurify (or equivalent) first.
- Use camelCase in `:style` bindings (`:style="{ marginTop }"`) — kebab-case works but loses IDE assistance.

---

## 4) Component splits

Entry/root and route-view components are **composition surfaces** — app shell, providers, feature wiring. They should not contain full feature implementations.

**Split a component if any are true:**

- It owns both orchestration _and_ substantial markup across multiple sections.
- It has 3+ distinct UI regions (form + filters + list + footer).
- A template block repeats, or is plausibly reusable.

**For CRUD/list features**, expect at least:

- a feature container (state + wiring)
- a form/input component
- a list (and/or item) component
- an actions/filter/footer component

**Folder layout** for non-trivial features:

```
components/<feature>/
  ContainerName.vue
  FormPart.vue
  ListPart.vue
composables/use<Feature>.ts
```

Small throwaway demos can stay in one file — call that out explicitly when skipping the split, so the next reader knows it was deliberate.

---

## 5) Data flow

Props down, events up is the primary model.

- `defineProps` / `defineEmits` — declare the contract. Type under TS, runtime-declare under JS; never leave props untyped.
- `v-model` — only for true two-way bindings. Use `defineModel()` (Vue 3.4+) over the legacy `modelValue` + `update:modelValue` pair.
- `provide` / `inject` — only for deep-tree dependencies or shared context that doesn't belong in a Pinia store. Use a typed `InjectionKey` (TS) so consumers don't drift.
- Pinia — when state crosses unrelated component subtrees. See `pinia-store-patterns`.

**Don't** mutate a prop in the child. Emit and let the parent own the state, or use `defineModel` if it's genuinely two-way.

---

## 6) Composables

Extract a composable when logic is **reused, stateful, or side-effect heavy**. Pure utilities (formatters, math) stay as plain functions in `utils/` — wrapping them in `useFoo()` muddies the trigger conventions.

**Naming & location:**

- `composables/useFeatureName.{ts,js}`. One composable per file unless they're tightly-coupled siblings.
- Name starts with `use`.

**Shape:**

- Use an options object for composables with more than ~2 optional params: `useFoo({ immediate, debounceMs })` reads better than `useFoo(true, 300)`.
- Return readonly state + explicit action functions, not raw refs the caller can mutate at will:

  ```ts
  export function useCounter() {
  	const count = shallowRef(0);
  	return {
  		count: readonly(count),
  		increment: () => count.value++,
  		reset: () => (count.value = 0),
  	};
  }
  ```

- Compose from smaller primitives — a kitchen-sink `useDashboard()` is a smell. Break it into `useDashboardData`, `useDashboardFilters`, etc., and let the component compose them.

**Lifecycle inside composables** — `onMounted` / `onBeforeUnmount` work inside a composable only when called **synchronously** during the parent's setup. If a composable starts a subscription, it must clean up in `onScopeDispose` (or `onBeforeUnmount`).

---

## 7) Lifecycle hook patterns

- Reach for `watch(source, fn, { immediate: true })` before `onMounted(() => fn(source.value))`.
- **Cleanup pairs.** Every `onMounted` that registers a listener / interval / subscription must have a matching `onBeforeUnmount` (or `onScopeDispose` inside a composable).
- For one-shot async on mount, prefer `<Suspense>` + `async setup` (Nuxt: `await useAsyncData(...)`) over a dangling `onMounted(async () => ...)` that leaves the component in a half-loaded state.
- `onUpdated` is almost always a smell — if you're using it, ask whether a watcher on the actual dependency is what you wanted.

---

## Done-checklist

Before declaring a component change done:

- [ ] `<script setup>` is the only `<script>` block (or the second block is justified).
- [ ] Reactive primitive choice matches §2 (no `ref` on plain primitives).
- [ ] No filtering/sorting in templates — derivations are named in script.
- [ ] Props/emits contracts are declared (typed under TS).
- [ ] Watchers / intervals / subscriptions registered on mount have cleanup pairs.
- [ ] Entry/route components stay thin — feature implementation lives one level down.
- [ ] Prettier + ESLint pass (see `prettier-and-eslint`).

---

## Source

Adapted from Anthony Fu's [`vue-best-practices`](https://github.com/antfu/skills/tree/main/skills/vue-best-practices) and [`vue`](https://github.com/antfu/skills/tree/main/skills/vue) skills, narrowed and rephrased to match the patterns the Scala QSR team has converged on. Where antfu's guidance and team practice diverge, this file is the source of truth for our projects — propose changes via the §15 living-doc loop in `team-ai-development-process`.

### Grounding note

This skill's content is grounded in **stack-baseline convergence** (Vue 3 + `<script setup>` + Composition API + Pinia as team defaults, plus opinionated cross-skill routing), not in specific named incidents the way some other team skills are (e.g., the Laravel `medialibrary-development` skill's incident-anchored rules). That's intentional for now — the Composition API conventions are the team's settled baseline across the project portfolio, and codifying defaults _is_ a legitimate stack-skill role per `stacks/vue/README.md`. As specific Vue/Nuxt incidents surface in future sessions ("we do X here because of Y"), they should land in this file via the §15 loop and graduate the grounding from baseline-codification toward incident-anchored. Sibling Tier 0 skills sit at different points on this gradient: `prettier-and-eslint` is the strongest (anchored to the locked Prettier-vs-`@antfu/eslint-config` decision), `pinia-store-patterns` is mid-gradient (one explicit team decision rule on getters vs `computed`), this skill is the lightest.
