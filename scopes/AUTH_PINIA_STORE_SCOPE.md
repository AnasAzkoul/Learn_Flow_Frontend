# Auth Pinia Store - Scope & Specification

**Status:** In progress
**Owner:** Anas
**Last updated:** 2026-05-30
**Audience:** Engineering

---

## 1. Executive summary

LearnFlow Nuxt now has an auth repository exposed as `$api.auth.*`, but auth state is still not modeled as shared frontend state. Login and signup composables are currently stubbed, `useAuthSession()` fetches session data directly, and sidebar/user surfaces still use hardcoded user details.

This scope adds a setup-style Pinia store named `useAuthStore` that becomes the frontend's shared auth state boundary. The store will call the existing auth repository, keep the BetterAuth cookie as the source of truth, expose derived user/auth status for components, and provide actions for login, signup, session refresh, error reset, and sign-out.

**Out of scope by explicit decision:**

- Manual token storage - BetterAuth session cookies remain the only auth credential.
- Backend auth changes - the repository/API layer already targets existing BetterAuth routes.
- OAuth implementation - Apple and Google buttons remain outside this email/password store scope.
- Route protection middleware - can consume the store later, but route policy needs a separate product decision.
- Course/dashboard data loading - depends on future course repositories.

---

## 2. Goals & Non-Goals

### 2.1 Goals

- Add `app/stores/useAuthStore.ts` using Pinia setup-store style.
- Centralize auth state from `$api.auth.getSession()` into one reusable store.
- Provide typed actions for `login`, `signup`, `refreshSession`, `signOut`, `resetError`, and `$reset`.
- Expose shared derived state such as `user`, `isAuthenticated`, `isLoading`, `isError`, and `displayName`.
- Wire email/password login and signup composables to the store instead of their current console stubs.
- Keep auth errors available to forms without leaking raw unknown error objects into UI state.
- Keep the frontend free of token persistence, custom auth headers, and cookie parsing.

### 2.2 Non-Goals

- Do not store BetterAuth tokens in Pinia, `localStorage`, `sessionStorage`, cookies, or custom headers.
- Do not introduce `pinia-plugin-persistedstate`.
- Do not add a new auth client dependency.
- Do not implement OAuth flows.
- Do not add backend routes or change backend BetterAuth configuration.
- Do not add a frontend test framework as part of this store scope.
- Do not solve unrelated full-project typecheck errors already documented in `AUTH_API_REPOSITORY_SCOPE.md`.

---

## 3. Glossary

| Term | Meaning |
| ---- | ------- |
| Auth store | Pinia setup store exported as `useAuthStore`. |
| Session refresh | A call to `$api.auth.getSession()` that updates store state from the backend session cookie. |
| Credential action | Email/password `login` or `signup` using the existing auth repository. |
| Cookie source of truth | The frontend treats the BetterAuth session cookie as opaque and validates auth state through `getSession()`. |

---

## 4. Feature walkthrough

### 4.1 App/session initialization

A consumer calls:

```ts
const authStore = useAuthStore()
await authStore.refreshSession()
```

The store calls `$api.auth.getSession()`, stores the returned `AuthSession | null`, clears stale errors on success, and exposes `isAuthenticated` from the resulting session state.

The existing `useAuthSession()` composable should either become a small wrapper around the store or be retired if all consumers move directly to `useAuthStore()`.

### 4.2 Login flow

`app/pages/Login/useLogin.ts` submits validated form values to:

```ts
await authStore.login({
  email: values.email,
  password: values.password,
})
```

The store calls `$api.auth.login(email, password)`, then calls `refreshSession()` so the local state reflects the server-owned session. On success, the composable resets the form and routes to `dashboard`. On failure, the store exposes a normalized message and the form stays on the login page.

### 4.3 Signup flow

`app/pages/Signup/useSignup.ts` keeps `confirmPassword` as form-only state. It submits the repository-compatible payload to:

```ts
await authStore.signup(payload)
```

The store calls `$api.auth.signup(payload)`, then calls `refreshSession()` to capture the newly authenticated session if BetterAuth signs the user in after registration. On success, the composable resets the form and routes to `newCourse`.

### 4.4 Sign-out flow

Components call:

```ts
await authStore.signOut()
```

The store calls `$api.auth.signOut()`, resets local auth state, and leaves navigation decisions to the caller. Sidebar/account UI can later use this action and route to login.

---

## 5. Out of scope (v1) - with rationale

| Item | Reason | When |
| ---- | ------ | ---- |
| Route middleware for protected pages | Requires deciding redirect behavior, public routes, and SSR policy. | Separate auth route-protection scope. |
| OAuth buttons | Current API repository only covers email/password routes. | After backend OAuth provider behavior is confirmed. |
| Persistent Pinia state | Would duplicate cookie-backed auth and increase stale-session risk. | Do not add unless a future requirement justifies it. |
| Sidebar account polish | Can consume `user` and `displayName`, but broader sidebar data is currently mocked. | Follow-up UI integration scope. |
| Test harness setup | No frontend test harness exists today. | Separate tooling scope or when requested. |

---

## 6. Configuration

No new runtime config is introduced.

The store relies on the existing injected API:

```ts
const { $api } = useNuxtApp()
```

The API layer already reads:

```ts
runtimeConfig.public.apiUrl
```

and already owns cookie credentials plus SSR cookie forwarding.

---

## 7. Data model

The store holds only frontend session state:

```ts
type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated" | "error"

state:
  session: AuthSession | null
  status: AuthStatus
  error: ApiErrorShape | null
  hasLoadedSession: boolean
```

Derived values:

```ts
user = session?.user ?? null
isAuthenticated = Boolean(session)
isLoading = status === "loading"
isError = status === "error"
displayName = user.fullName ?? user.name ?? user.email ?? "User"
userInitials = derived from displayName or email
```

The store must not hold token fields from `AuthCredentialsResponse`.

---

## 8. Real-time architecture

Not applicable.

---

## 9. API surface

### 9.1 Store file

```text
app/stores/useAuthStore.ts
```

### 9.2 Public store contract

```ts
export const useAuthStore = defineStore("auth", () => {
  // state
  // getters
  // actions
})
```

Expected action signatures:

```ts
login(payload: { email: string; password: string }): Promise<AuthSession | null>
signup(payload: SignupRequest): Promise<AuthSession | null>
refreshSession(): Promise<AuthSession | null>
signOut(): Promise<void>
resetError(): void
$reset(): void
```

### 9.3 Existing repository calls

```ts
$api.auth.login(email, password)
$api.auth.signup(payload)
$api.auth.getSession()
$api.auth.signOut()
```

---

## 10. Notification routing

Not applicable. UI toast behavior is optional for the form wiring layer and should not live inside the store.

---

## 11. Privacy / Security / GDPR

### 11.1 Threat model

The primary risk is drifting from the backend-owned BetterAuth session model by persisting tokens, caching stale identity too aggressively, or treating a credential response as proof of an active session without checking the session endpoint.

### 11.2 Security requirements

- Do not store, expose, or persist `AuthCredentialsResponse.token`.
- Do not parse document cookies in the store.
- Do not create `Authorization` headers.
- Do not add persisted Pinia state for auth.
- Refresh session state through `$api.auth.getSession()` after login and signup.
- Clear session state after sign-out even if downstream navigation fails.
- Normalize errors into `ApiErrorShape` or a typed fallback before assigning store error state.

### 11.3 GDPR and privacy posture

The store keeps personal data already returned by the backend session endpoint in memory only. It adds no browser persistence and no new data collection.

---

## 12. Performance & scalability

The store introduces low-volume user-driven requests only:

- Login.
- Signup.
- Session refresh.
- Sign out.

`refreshSession()` should be called intentionally by pages, layouts, middleware, or a wrapper composable. Avoid hidden polling. If multiple app entrypoints need initial session loading later, add a guard such as `ensureSessionLoaded()` instead of fanning out duplicate `getSession()` calls.

No load test is required for this frontend store scope.

---

## 13. Frontend architecture

### 13.1 Store conventions

Follow project Pinia conventions:

- Use setup-store style.
- File and export name: `app/stores/useAuthStore.ts` and `useAuthStore`.
- Store id: `"auth"`.
- Return all state, getters, and actions.
- Include a setup-store `$reset()`.
- Add HMR support with `acceptHMRUpdate`.
- Components must use `storeToRefs(authStore)` when destructuring state/getters.

### 13.2 State ownership

The store owns shared auth state. Forms own field state and validation. Components own navigation and presentation details.

### 13.3 Form integration

`useLogin.ts` and `useSignup.ts` should:

- Use `useAuthStore()`.
- Call store actions from `handleSubmit`.
- Reset form and navigate only after action success.
- Surface `authStore.error` to UI consumers.
- Call `authStore.resetError()` when relevant form values change.
- Remove temporary `console.log` calls and commented-out stale store code.

### 13.4 Session composable integration

`useAuthSession()` should not maintain a competing session source. Preferred v1 shape:

```ts
export const useAuthSession = () => {
  const authStore = useAuthStore()

  return useAsyncData("auth-session", () => authStore.refreshSession())
}
```

If this composable becomes unnecessary after store adoption, deleting it is acceptable only after confirming no callers remain.

---

## 14. Existing patterns to follow

- `scopes/AUTH_API_REPOSITORY_SCOPE.md` - upstream API/auth session decisions.
- `app/services/api/repositories/auth.repository.ts` - repository methods the store must call.
- `app/services/api/types/auth.ts` - auth session, user, and signup payload types.
- `app/services/api/errors.ts` - normalized API error shape and helpers.
- `app/pages/Login/useLogin.ts` and `app/pages/Signup/useSignup.ts` - current form composables to migrate.
- Pinia setup-store conventions from the project skill: setup store, `$reset`, HMR, and `storeToRefs` for state/getters.

---

## 15. Phasing & estimates

| Phase | Description | Estimate |
| ----- | ----------- | -------- |
| Phase 0 - Scope | Create and review this scope doc before implementation. | Small |
| Phase 1 - Store foundation | Add `useAuthStore` state, getters, `$reset`, error handling, and HMR. | Small |
| Phase 2 - Repository-backed actions | Add login, signup, refreshSession, signOut, and resetError actions. | Small |
| Phase 3 - Consumer migration | Wire login/signup composables and reconcile `useAuthSession()`. | Small |
| Phase 4 - UI error exposure | Surface auth error state in login/signup pages if not already displayed by wrappers. | Small |
| Phase 5 - Verification | Run scoped lint/build/typecheck where available and document blocked checks. | Small |
| Phase 6 - Review and closing | Self-review auth/security behavior and update this scope with outcomes/backlog. | Small |

Any need to add route protection, persistence, OAuth, or backend changes is a scope deviation.

---

## 16. Open items & risks

| Item | Risk | Mitigation |
| ---- | ---- | ---------- |
| `AuthCredentialsResponse` does not include a full session record. | Store could incorrectly mark auth as complete from a partial credential response. | Always call `refreshSession()` after login/signup. |
| Password validation currently allows 4 characters while BetterAuth may require a longer password. | Signup can fail backend validation after frontend passes. | Surface backend error now; align validation in a follow-up or during implementation if product approves. |
| No frontend test harness exists. | Store transitions may lack automated regression coverage. | Run lint/build/typecheck; document manual smoke path; add tests when harness exists. |
| Full-project typecheck has unrelated known failures. | Implementation verification may be partially blocked. | Report exact command results and avoid claiming full typecheck success unless it passes. |
| Duplicate session refresh calls from multiple consumers. | Extra low-volume API calls during app startup. | Add `ensureSessionLoaded()` only if duplicate call sites appear during implementation. |

### 16.1 Production-readiness review backlog (post-build)

**Performance (deferred):**

- Consider `ensureSessionLoaded()` if route middleware, layouts, and components all request session on boot.

**Security (deferred):**

- Run a focused auth/security review before adding route protection or shipping credential flows broadly.

**Stability + availability (deferred):**

- Add store unit tests with mocked `$api.auth` once test tooling exists.
- Run a browser smoke path against a running backend/database environment.

**Scalability (deferred):**

- No load testing needed for this store.

**Accepted current state (documented, not built):**

- OAuth remains non-functional.
- Protected route middleware remains unscoped.
- Sidebar user/course data may remain partially mocked unless included in implementation.

---

## 17. Appendix A - Locked decisions

| Decision | Rationale |
| -------- | --------- |
| Use a Pinia setup store named `useAuthStore`. | Matches Nuxt 4/Vue 3 project conventions and the requested target. |
| Keep the store id as `"auth"`. | Pinia ids should be kebab/lower feature names; this is the single auth concern. |
| Do not persist auth store state. | BetterAuth cookie is the durable session source; persisted frontend user state can become stale or unsafe. |
| Refresh session after login/signup. | Credential responses do not provide the full `AuthSession`; `getSession()` confirms cookie-backed state. |
| Keep navigation and toasts outside the store. | The store owns state/actions; pages and composables own presentation and routing. |
| Normalize errors before storing them. | UI consumers need stable error state and should not depend on unknown thrown values. |
| Do not add route middleware in v1. | Route protection changes product behavior and should be scoped separately. |

---

## 18. Appendix B - Memos & scopes referenced

- `ai-process/AI_COLLABORATION.md` - collaboration process, scope-doc rules, and verification expectations.
- `ai-process/templates/SCOPE_TEMPLATE.md` - scope document structure.
- `scopes/AUTH_API_REPOSITORY_SCOPE.md` - shipped auth API repository scope and cookie-session decisions.
- `app/services/api/repositories/auth.repository.ts` - existing auth repository.
- `app/services/api/types/auth.ts` - existing auth request/response types.
- `app/composables/useAuthSession.ts` - current session composable.
- `app/pages/Login/useLogin.ts` - login composable to migrate.
- `app/pages/Signup/useSignup.ts` - signup composable to migrate.

---

## Verification plan

Run after implementation:

```bash
npx eslint app/stores app/pages/Login app/pages/Signup app/composables/useAuthSession.ts
npm run build
npx nuxi typecheck
```

Manual smoke path if backend, database, and environment are running:

- Signed-out `refreshSession()` returns `null` and sets `isAuthenticated` to `false`.
- Failed login sets `authStore.error` and does not navigate.
- Successful login sets the BetterAuth cookie, refreshes session, and navigates to dashboard.
- Successful signup refreshes session and navigates to new course.
- Sign-out clears local auth state and a later session refresh returns `null`.

If backend services are not running, report manual smoke testing as blocked by environment rather than weakening the cookie-backed auth model.

### 2026-05-30 verification results

| Check | Result | Notes |
| ----- | ------ | ----- |
| `npx eslint app/stores app/pages/Login app/pages/Signup app/composables/useAuthSession.ts app/components/common/BaseInput/BaseInput.vue` | Passed | No lint output after adding page component names, fixing login template style warnings, and adding defaults for optional BaseInput props. |
| `npm run build` | Passed | Build completed with existing sourcemap/CSS warnings. |
| `npx nuxi typecheck` | Failed | Touched-file `BaseInput` prop issue was fixed; remaining errors are in `CourseGlyph.vue` and `FeatureVisual.vue`, plus a vue-router/Volar plugin resolution warning for `@vue/language-core`. |
| `npx tsc --noEmit --project .nuxt/tsconfig.app.json` | Not useful | Failed on project-wide `.vue` barrel exports because plain `tsc` is not the Nuxt/vue-tsc typecheck path. |
| Manual backend smoke path | Not run | Requires backend/database/env to be running. |

---

## 19. Implementation checkpoint log

### 2026-05-30 - Store and form wiring

Changed:

- Added `app/stores/useAuthStore.ts` as a Pinia setup store with session, status, error, derived user state, auth actions, `$reset`, and HMR support.
- Updated `app/composables/useAuthSession.ts` to refresh session through the store instead of calling `$api.auth.getSession()` directly.
- Wired `app/pages/Login/useLogin.ts` to `authStore.login()` and removed the console stub.
- Wired `app/pages/Signup/useSignup.ts` to `authStore.signup()` and removed stale commented user-store code plus the console stub.
- Added auth error alerts to login and signup pages.
- Added explicit component names to login/signup route components to satisfy the Vue multi-word component rule while keeping route filenames unchanged.
- Made the `BaseInput` label prop optional so the login password field can keep its existing external label/forgot-password layout without failing typecheck.

Verified:

- Scoped ESLint passed for the store, auth pages, auth form composables, and `useAuthSession()`.
- Production build passed.

Remaining:

- Full-project typecheck is still blocked by unrelated landing-page type errors and a vue-router/Volar package resolution warning.
- Run the manual BetterAuth smoke path with backend, database, and environment running.
