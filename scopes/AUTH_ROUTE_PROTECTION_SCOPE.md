# Auth Route Protection - Scope & Specification

**Status:** Shipped
**Owner:** Anas
**Last updated:** 2026-06-11
**Audience:** Engineering

---

## 1. Executive summary

LearnFlow already has an auth API repository and Pinia auth store, but the UI and routing still behave as if auth state is not authoritative. The landing navbar always shows "Sign in", the account menus do not consistently call the store sign-out action, and protected pages can be opened without a loaded authenticated session.

This scope wires the existing auth store into navigation and route access. Login and signup become guest-only pages, dashboard and new-course become authenticated-only pages, and sign-out surfaces call `authStore.signOut()` before routing the user back to login.

**Out of scope by explicit decision:**

- Backend auth changes - the existing BetterAuth cookie-backed API remains the source of truth.
- Manual token persistence - auth state continues to be refreshed through `/auth/get-session`.
- New auth UI screens - this scope only wires existing navbar/sidebar/dropdown controls.
- Full account/profile pages - existing placeholder menu destinations are not implemented here.

---

## 2. Goals & Non-Goals

### 2.1 Goals

- Show "Sign out" instead of "Sign in" in the landing navbar when the user is authenticated.
- Connect account/sidebar sign-out menu items to `useAuthStore().signOut()`.
- Protect `/dashboard` and `/new-course` so unauthenticated users are redirected to login.
- Prevent authenticated users from opening `/login` or `/signup`.
- Keep the landing page public for both authenticated and unauthenticated users.

### 2.2 Non-Goals

- Do not add persisted Pinia state or frontend token storage.
- Do not change login/signup form validation.
- Do not implement profile, billing, subscription, or settings pages.
- Do not add a new frontend testing framework.

---

## 13. Frontend architecture

Route access is enforced with Nuxt route middleware:

- `auth` middleware refreshes the session if needed and redirects unauthenticated users to `/login`.
- `guest` middleware refreshes the session if needed and redirects authenticated users to `/dashboard`.

The landing layout consumes `useAuthStore()` through `storeToRefs()` and renders an authenticated sign-out button when `isAuthenticated` is true.

---

## 14. Existing patterns to follow

- `app/stores/useAuthStore.ts` remains the shared auth state boundary.
- `app/services/api/repositories/auth.repository.ts` remains the only API caller for sign-out.
- `app/pages/Login/useLogin.ts` and `app/pages/Signup/useSignup.ts` already route successful auth flows into protected pages.

---

## 15. Phasing & estimates

| Phase | Description | Estimate |
| ----- | ----------- | -------- |
| Phase 1 - Routing | Add route middleware and page metadata. | Small |
| Phase 2 - UI wiring | Wire navbar and account/sidebar sign-out controls. | Small |
| Phase 3 - Verification | Run Nuxt validation and smoke auth redirects. | Small |

---

## 16. Open items & risks

| Item | Risk | Mitigation |
| ---- | ---- | ---------- |
| Backend unavailable during local verification | Auth middleware cannot confirm real sessions without the API. | Validate build/type behavior and document browser smoke paths. |
| Session refresh errors other than unauthenticated | Network/API failures may redirect users to login. | Keep middleware conservative for v1 and revisit richer error states when an app shell exists. |

### 16.1 Production-readiness review backlog

- Existing `nuxi typecheck` blockers remain in landing visual components: `CourseGlyph.vue` has possibly undefined array entries and `FeatureVisual.vue` has possibly undefined index usage.
- ESLint still reports existing Vue formatting warnings in `app/pages/NewCourse/index.vue`, `app/pages/dashboard.vue`, and one sidebar attribute layout warning.

---

## 17. Appendix A - Locked decisions

| Decision | Rationale |
| -------- | --------- |
| Use page-level route middleware instead of a global hard-coded route allowlist. | Protected and guest-only intent stays close to each page while the landing page remains public. |
| Redirect authenticated users from `/login` and `/signup` to `/dashboard`. | Dashboard is the existing post-login home. |
| Redirect unauthenticated protected-page visits to `/login` with a `redirect` query. | The login flow can preserve the intended destination in a future enhancement without changing route policy. |
