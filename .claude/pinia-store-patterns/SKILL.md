---
name: pinia-store-patterns
description: Pinia conventions for Scala QSR projects — setup-style stores, state/getters/actions shape, `storeToRefs` & destructuring, getter vs component-computed decision rule, cross-store composition, outside-component access, SSR/Nuxt notes, testing, HMR. Use when designing or modifying any Pinia store. Persistence lives in the `pinia-persistence` advisory.
when_to_activate: Designing, creating, or modifying a Pinia store (any file calling `defineStore` or under `stores/`), wiring cross-store calls, debugging lost reactivity after destructure, or accessing a store outside a component (route guards, plugins, server middleware). Skip if the project is still on Vuex — see the `vuex-to-pinia-migration` advisory. For persistence questions, route to the `pinia-persistence` advisory's skill.
---

# pinia-store-patterns

Team conventions for writing Pinia stores across Scala QSR projects. Adapted from Anthony Fu's `pinia` skill — see _Source_ at the bottom.

## Defaults this skill assumes

- **Vue 3** with **Composition API** (`<script setup>`). For component-side conventions see `vue3-composition-api-conventions`.
- **Pinia ≥ 2.1** (Setup stores supported throughout).
- **TypeScript is optional** per project. TS-only bullets are tagged **(TS)**.
- Mid-migration from Vuex: install `vuex-to-pinia-migration` and defer to its overrides.

**Out of scope (covered elsewhere):**

- **Persistence** (`pinia-plugin-persistedstate` and related conventions) — install the `pinia-persistence` advisory when the project needs it.

## Core principles

- One store = one **feature concern**, not one model class. Don't ship a god-store.
- Stores hold **cross-component** state. View-local derivations stay in the component as `computed`.
- State changes go through actions. Components don't reach into the store and mutate fields directly except for trivial assignments via `v-model`.
- Compose stores via _late access_ — never read another store's state at setup time.

---

## 1) Store style — setup stores by default

Use **setup stores** for every new store. Option stores are permitted only when porting Vuex-era code one-for-one as part of a migration.

```ts
// stores/useMenuStore.ts
import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", () => {
	// state
	const items = ref<MenuItem[]>([]);
	const selectedId = shallowRef<string | null>(null);

	// getters
	const selected = computed(() => items.value.find((i) => i.id === selectedId.value) ?? null);

	// actions
	async function load(menuId: string) {
		items.value = await $fetch(`/api/menus/${menuId}`);
	}
	function select(id: string) {
		selectedId.value = id;
	}
	function $reset() {
		items.value = [];
		selectedId.value = null;
	}

	return { items, selectedId, selected, load, select, $reset };
});
```

**Conventions:**

- Filename and exported symbol use `useFeatureStore` / `useFeatureStore.ts`. The store id (the first arg to `defineStore`) is the kebab-case feature name (`'menu'`, `'session-config'`).
- One store per file. Co-locate types in `stores/types.ts` (or alongside if file is small).
- **Return everything** — Pinia only tracks what you return. Forgetting to return a `ref` silently disables it.
- Provide a setup-store `$reset()` when the store ever needs to reset (logout, route change). Option stores get one for free; setup stores don't.
- Reactive primitive choice follows the rules in `vue3-composition-api-conventions` §2 — `shallowRef` for primitives and opaque values; `ref` for objects you replace wholesale; `reactive` for objects you mutate in place. The example above shows the typical mix.

---

## 2) State / getters / actions — what goes where

**State:** the minimal source-of-truth fields. If a value can be derived from other state, it's a **getter** not state.

**Getters** = shared derivations. Promote a derivation to a getter only when **more than one component** consumes it, or it's referenced from an action. Otherwise it stays as a `computed` in the component that needs it.

> **Decision rule (team):** _one consumer = component `computed`. Two or more consumers = store getter._ Resist the urge to pre-emptively promote — moving a `computed` into the store later is a cheap refactor.

**Actions:**

- All mutations to multi-field state go through an action. Single-field assignments from a component (e.g. `store.selectedId = id`) are fine.
- Actions return data when callers need it (e.g. fetched item), otherwise return `void`.
- Async is fine — but see §4 for the "stores before `await`" rule.
- Batch related field updates with `store.$patch({ ... })` or `store.$patch(state => { ... })` rather than several sequential assignments, so subscribers fire once.

**Parameterized getters** (return a function): allowed, but **lose caching** — they re-run on every call. Prefer filtering inside a regular getter when possible.

---

## 3) Consuming stores in components

```ts
import { storeToRefs } from "pinia";

const menu = useMenuStore();
const { items, selected } = storeToRefs(menu); // ✅ state/getters keep reactivity
const { load, select } = menu; // ✅ actions destructure fine
```

**Rules:**

- **Always** use `storeToRefs(store)` when destructuring **state or getters**. A plain `const { items } = menu` produces a non-reactive local.
- **Never** wrap actions in `storeToRefs` — they don't need it and it complicates types.
- For one-off reads, `menu.items` and `menu.selected` are fine — destructuring is for ergonomics, not correctness.
- Subscriptions:
  - `store.$subscribe((mutation, state) => ...)` — listen to state changes. Auto-cleans on component unmount.
  - `store.$onAction(({ name, args, after, onError }) => ...)` — listen to actions. Useful for analytics/logging.

---

## 4) Composing stores (cross-store)

**Rule:** instantiate other stores at the **top** of the setup function, then read their state/getters **only inside functions** (getters, actions, watchers). Never read another store's state at top-level setup time.

```ts
export const useCartStore = defineStore("cart", () => {
	const items = ref<CartItem[]>([]);
	const auth = useAuthStore(); // ✅ top-level instantiate

	// ❌ DON'T: const userId = auth.userId  (read at setup — circular-dep risk)

	const ownerId = computed(() => auth.userId); // ✅ deferred read

	async function checkout() {
		if (!auth.isAuthenticated) throw new Error("not signed in");
		await $fetch("/api/checkout", { method: "POST", body: { items: items.value } });
	}

	return { items, ownerId, checkout };
});
```

**SSR / async rule:** in an async action, instantiate every store you'll touch **before the first `await`**. After an `await`, the active Pinia instance can change and `useOtherStore()` may pick up the wrong context.

```ts
async function syncCart() {
	const auth = useAuthStore();
	const orders = useOrdersStore(); // ✅ instantiated before any await
	const me = await auth.refreshSession();
	await orders.fetchFor(me.id); // ✅ orders is still the right instance
}
```

**Prefer composables for orchestration** of _multiple_ stores. A composable like `useCheckout()` that reads `useCartStore` + `useAuthStore` + `useOrdersStore` is usually cleaner than a single mega-store importing all three.

---

## 5) Outside components

Calling `useStore()` at module scope (top of a file, before `app.use(pinia)`) crashes with _"getActivePinia() was called but there was no active Pinia"_. Defer the call.

| Context                        | How                                                                                                                                    |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| Route guard                    | `useAuth()` **inside** the guard body, not at module scope.                                                                            |
| Pinia/Vue plugin               | Same — call inside the install function, not at import time.                                                                           |
| Nuxt middleware / server route | Pass the Pinia instance through Nuxt's helpers (`useNuxtApp().$pinia`) or use Nuxt's auto-imported `useFooStore()` inside the handler. |
| Manual SSR app                 | Pass the instance explicitly: `useMainStore(pinia)`.                                                                                   |

```ts
// router/guards.ts
router.beforeEach((to) => {
	const auth = useAuthStore(); // ✅ inside the guard, not at module top
	if (to.meta.requiresAuth && !auth.isAuthenticated) return "/login";
});
```

---

## 6) SSR / Nuxt notes

- Each request needs its own Pinia instance (Nuxt's module handles this — don't import Pinia manually in a Nuxt project).
- Hydration: state set on the server flows to the client automatically. Don't re-fetch in `onMounted` for data already loaded server-side.
- The "stores before `await`" rule (§4) applies to every async action in an SSR context.

---

## 7) Testing

Use `@pinia/testing` and `createTestingPinia()` for component tests that depend on a store.

```ts
import { createTestingPinia } from '@pinia/testing'

mount(MyComponent, {
  global: {
    plugins: [createTestingPinia({
      stubActions: false,         // run real actions; default stubs them
      initialState: { menu: { items: [...] } },
    })],
  },
})
```

- Default behaviour stubs actions — opt into real action execution with `stubActions: false` when behaviour matters.
- Set initial state via the `initialState` option, keyed by **store id**, not the composable name.
- Prefer testing **store behaviour** (call an action, assert state/getters) over mounting a component just to exercise a store.

---

## 8) HMR

For a smooth dev experience, accept HMR in each store file:

```ts
import.meta.hot?.accept(acceptHMRUpdate(useMenuStore, import.meta.hot));
```

(`acceptHMRUpdate` from `pinia`.) Skip on stores that are unlikely to change while you work, but the snippet is cheap and avoids "store became disconnected" mid-session.

---

## Done-checklist

Before declaring a store change done:

- [ ] Setup-store style; all state/getters/actions returned from the setup function.
- [ ] `$reset` defined if the store can be reset.
- [ ] Getter vs component-computed call follows §2 (1 consumer → component; 2+ → getter).
- [ ] No cross-store reads at top-level setup; cross-store deps instantiated at top, read inside functions (§4).
- [ ] Async actions instantiate every store they'll use **before** the first `await`.
- [ ] Components destructure state/getters via `storeToRefs`; actions destructured directly.
- [ ] HMR accept block present where the store is likely to be edited often.
- [ ] If persistence is involved, the `pinia-persistence` advisory is installed and its done-checklist also applies.
- [ ] Prettier + ESLint pass (see `prettier-and-eslint`).

---

## Source

Adapted from Anthony Fu's [`pinia`](https://github.com/antfu/skills/tree/main/skills/pinia) skill — its `core-stores.md`, `features-composing-stores.md`, `best-practices-outside-component.md`, and `best-practices-testing.md` references in particular — narrowed and rephrased to match the patterns the Scala QSR team has converged on. Persistence conventions live in the `pinia-persistence` advisory because not every project needs them. Where upstream and team practice diverge, this file is the source of truth for our projects — propose changes via the §15 living-doc loop in `team-ai-development-process`.
