# Auth API Repository Layer - Scope & Specification

**Status:** Shipped
**Owner:** Anas
**Last updated:** 2026-05-30
**Audience:** Engineering

---

## 1. Executive summary

LearnFlow Nuxt needs a fresh frontend API layer for authentication. The current partial implementation under `app/services/api` uses a service-class shape and should be replaced with a repository-pattern layer built around a shared `fetchFactory`.

The first version is intentionally auth-only. It will expose BetterAuth auth calls through Nuxt injection as `$api.auth.*`, use cookie-based sessions, and avoid manual session-token or JWT storage. This keeps the frontend aligned with the backend's BetterAuth server-side session model, where sessions live in PostgreSQL and the browser authenticates by sending the BetterAuth session cookie.

This scope is layer-only. It creates the transport, auth repository, public types, error normalization, and Nuxt plugin API shape. It does not wire the login/signup forms to real API calls yet.

**Out of scope by explicit decision:**

- Course repositories - backend/frontend course integration is not ready for this layer.
- Generation repositories and SSE handling - generation UX and streaming behavior need a separate scope.
- Login/signup UI wiring - the selected first step is layer-only.
- Backend changes - BetterAuth routes already exist in the sibling backend.
- Manual token storage - BetterAuth session cookies are the source of truth.

---

## 2. Goals & Non-Goals

### 2.1 Goals

- Replace the existing partial API service layer with a fresh repository-pattern API layer.
- Add a shared `fetchFactory` that configures base URL, credentials, SSR cookie forwarding, and error normalization.
- Expose auth methods through `const { $api } = useNuxtApp()` as `$api.auth.login(...)`, `$api.auth.signup(...)`, `$api.auth.getSession()`, and `$api.auth.signOut()`.
- Use BetterAuth session cookies for authentication.
- Ensure client-side requests include cookies with `credentials: "include"`.
- Ensure SSR requests forward the incoming `cookie` header when calling the backend.
- Keep frontend auth requests compatible with backend routes mounted at `/api/auth/*`.
- Keep public request and response contracts typed in TypeScript.

### 2.2 Non-Goals

- Do not manually store session tokens in `localStorage`, `sessionStorage`, Pinia, or custom headers.
- Do not add BetterAuth's frontend client package.
- Do not implement course repositories.
- Do not implement generation repositories or SSE utilities.
- Do not wire form submission flows to real auth requests in this scope.
- Do not change backend CORS, routes, schemas, session storage, or BetterAuth configuration.
- Do not introduce a frontend test framework as part of this scope.

---

## 3. Glossary

| Term | Meaning |
| ---- | ------- |
| `fetchFactory` | Shared factory that creates the typed `$fetch` wrapper used by repositories. |
| Repository | Frontend API module grouped by domain, such as `auth`. |
| BetterAuth | Backend auth library mounted under `/api/auth/*`. |
| Session cookie | HTTP cookie set by BetterAuth and sent with requests using `credentials: "include"`. |
| App envelope | Backend app-route response shape `{ success: true, data, meta? }` or `{ success: false, error }`; BetterAuth auth routes do not use this envelope. |

---

## 4. Feature walkthrough

### 4.1 Frontend caller experience

A frontend caller gets the API from Nuxt:

```ts
const { $api } = useNuxtApp()
```

The caller uses auth methods:

```ts
await $api.auth.login(email, password)
await $api.auth.signup(payload)
const session = await $api.auth.getSession()
await $api.auth.signOut()
```

The frontend never reads, stores, or forwards a token manually. BetterAuth sets the cookie, and the API layer ensures cookies are included on requests.

### 4.2 Runtime request behavior

Client-side requests send cookies with:

```ts
credentials: "include"
```

Server-side Nuxt requests forward incoming cookies using:

```ts
useRequestHeaders(["cookie"])
```

This allows backend session validation to keep using:

```ts
auth.api.getSession({ headers })
```

---

## 5. Out of scope (v1) - with rationale

| Item | Reason | When |
| ---- | ------ | ---- |
| Course repository | User requested auth-only because other repositories are not ready. | After course UI/API integration is scoped. |
| Generation repository | SSE and generation UX need separate decisions. | After generation flow scope. |
| Login/signup form wiring | User selected layer-only implementation. | Follow-up auth UI integration scope. |
| Dashboard course fetching | Depends on course repository scope. | After course API layer exists. |
| API-layer unit tests | No frontend test harness exists in the repo today. | When test tooling is introduced or requested. |
| Backend auth changes | The frontend layer should adapt to existing BetterAuth routes. | Separate backend scope if cookie/CORS behavior needs changes. |

---

## 6. Configuration

Relies on existing Nuxt runtime config:

```ts
runtimeConfig: {
  public: {
    apiUrl: "http://localhost:3001/api",
  },
}
```

No new config keys are introduced.

Auth endpoint base resolution:

```text
runtimeConfig.public.apiUrl + /auth/*
```

Given the current default:

```text
http://localhost:3001/api/auth/*
```

Backend context verified:

- Auth routes are mounted at `/api/auth/*`.
- Protected app routes are mounted under `/api/v1/*`.
- Backend CORS is configured with credentials support.
- Backend session validation uses BetterAuth's cookie-backed session.

---

## 7. Data model

No frontend persistence is added.

The backend stores sessions in PostgreSQL through BetterAuth and Drizzle. The frontend treats the session cookie as opaque and does not maintain an auth token data model.

Frontend types will model only the shapes needed by callers:

- Signup request payload.
- BetterAuth credential response.
- Auth user.
- Auth session.
- API error.

---

## 8. Real-time architecture

Not applicable for auth-only v1.

Generation SSE handling is explicitly deferred to a separate scope.

---

## 9. API surface

### 9.1 Public frontend API

```ts
$api.auth.login(email: string, password: string): Promise<AuthCredentialsResponse>
$api.auth.signup(payload: SignupRequest): Promise<AuthCredentialsResponse>
$api.auth.getSession(): Promise<AuthSession | null>
$api.auth.signOut(): Promise<void>
```

### 9.2 Backend routes used

| Method | Route | Notes |
| ------ | ----- | ----- |
| POST | `/auth/sign-in/email` | BetterAuth raw response, sets session cookie. |
| POST | `/auth/sign-up/email` | BetterAuth raw response, sets session cookie by default. |
| GET | `/auth/get-session` | Returns `{ user, session }` or `null`. |
| POST | `/auth/sign-out` | Clears session cookie and returns `{ success: true }`. |

### 9.3 Signup request mapping

Frontend repository input:

```ts
{
  fullName,
  email,
  password,
  occupation,
  birthDate,
  gender,
  educationalLevel,
  learningStyle,
  termsAndConditions,
}
```

Request body sent to BetterAuth:

```ts
{
  name: fullName,
  email,
  password,
  occupation,
  birthDate,
  gender,
  educationalLevel,
  learningStyle,
  termsAndConditions,
}
```

`confirmPassword` is not part of the repository payload and must not be sent to the backend.

### 9.4 Error shape

The frontend will normalize both BetterAuth raw errors and app-envelope errors into:

```ts
type ApiErrorShape = {
  status?: number
  code?: string
  message: string
  details?: unknown
}
```

Supported source shapes include:

- `{ success: false, error: { code, message, details } }`
- `{ message }`
- `{ error: { message, code, details } }`
- `$fetch` response objects with `response.status`, `response.statusText`, and `response._data`
- unknown network/request errors

---

## 10. Notification routing

Not applicable.

This scope does not introduce email, push, in-app notifications, or auth email flows.

---

## 11. Privacy / Security / GDPR

### 11.1 Threat model

The primary auth risks in this frontend scope are accidental token persistence, missing cookie credentials, and SSR requests that drop the user's cookie. The implementation must keep session ownership on the backend and treat the BetterAuth session cookie as opaque.

### 11.2 Security requirements

- Do not store returned BetterAuth tokens anywhere.
- Do not copy session tokens into app state.
- Do not add `Authorization` headers for BetterAuth sessions.
- Always use `credentials: "include"` for API requests.
- Forward cookies during SSR with `useRequestHeaders(["cookie"])`.
- Normalize auth errors without leaking unexpected raw objects into user-facing flows.

### 11.3 GDPR and privacy posture

This scope adds no new persistence and no new personal-data storage in the frontend. Signup payloads contain personal data already required by the backend user model; the frontend repository only transports that data to BetterAuth.

---

## 12. Performance & scalability

This is a thin transport layer. No caching, polling, batching, or request fanout is introduced.

Expected request volume is low and user-driven:

- Login.
- Signup.
- Session checks.
- Sign out.

No load test is required for this frontend-only auth wrapper. Load or concurrency testing becomes relevant in later generation/course scopes, especially for AI-provider calls and SSE.

---

## 13. Frontend architecture

### 13.1 Target file structure

```text
app/services/api/
  fetchFactory.ts
  errors.ts
  index.ts
  repositories/
    auth.repository.ts
    index.ts
  types/
    auth.ts
    error.ts
    index.ts
app/plugins/api.ts
```

### 13.2 Existing partial implementation to replace

```text
app/services/api/client.ts
app/services/api/services/auth.service.ts
```

The implementation may delete these files or stop exporting/using them. The final public API must not require `$api.AuthService`.

### 13.3 `fetchFactory`

Create a shared typed fetch wrapper that:

- Reads `runtimeConfig.public.apiUrl`.
- Uses `$fetch.create`.
- Sets `credentials: "include"`.
- For SSR, forwards `cookie` headers from `useRequestHeaders(["cookie"])`.
- Normalizes request and response errors.
- Returns a generic fetch function typed as:

```ts
export type ApiFetch = <TResponse>(
  endpoint: string,
  options?: ApiFetchOptions,
) => Promise<TResponse>
```

### 13.4 Auth repository

Create `createAuthRepository(apiFetch)` with:

```ts
login(email, password)
signup(payload)
getSession()
signOut()
```

The repository owns endpoint paths and request body mapping. It does not know about Vue components, forms, route navigation, toasts, or Pinia.

### 13.5 Nuxt plugin

`app/plugins/api.ts` provides:

```ts
{
  provide: {
    api,
  },
}
```

The module augmentation exposes:

```ts
const { $api } = useNuxtApp()
```

### 13.6 Existing consumer migration

Update:

```text
app/composables/useAuthSession.ts
```

From:

```ts
$api.AuthService.getSession()
```

To:

```ts
$api.auth.getSession()
```

No login/signup form wiring is included in this scope.

---

## 14. Existing patterns to follow

- `app/plugins/api.ts` already provides the Nuxt injection point.
- `nuxt.config.ts` already provides `runtimeConfig.public.apiUrl`.
- The current partial API client already forwards cookies during SSR and uses `credentials: "include"`; preserve that behavior in the fresh `fetchFactory`.
- Use TypeScript interfaces and exported types for public request/response shapes.
- Use Nuxt composables only inside plugin/factory code where Nuxt context is available.
- Keep repositories framework-light: they receive `apiFetch` and return plain async methods.

---

## 15. Phasing & estimates

| Phase | Description | Estimate |
| ----- | ----------- | -------- |
| Phase 0 - Scope | Create and review this scope doc before implementation. | Small |
| Phase 1 - Foundation | Add `fetchFactory`, shared API types, and error normalization. | Small |
| Phase 2 - Auth repository | Add `createAuthRepository()` with login, signup, session, and sign-out methods. | Small |
| Phase 3 - Nuxt plugin | Expose `$api.auth` through `app/plugins/api.ts`. | Small |
| Phase 4 - Migration | Update `useAuthSession()` to use `$api.auth.getSession()`. | Small |
| Phase 5 - Verification | Run typecheck/build/lint where available and document smoke paths. | Small |
| Phase 6 - Review and closing | Run self-review, update this scope with outcomes/backlog, and report remaining decisions. | Small |

Each phase has a clear checkpoint. Any discovered need to wire UI flows, change backend auth behavior, or add non-auth repositories must be treated as a scope deviation before implementation.

---

## 16. Open items & risks

| Item | Risk | Mitigation |
| ---- | ---- | ---------- |
| BetterAuth response shape may include fields not modeled exactly. | Frontend types may be slightly narrower than runtime response. | Keep response types permissive for optional fields. |
| Backend uses secure cookies. | Local HTTP development may require backend cookie config alignment. | Treat as backend environment issue, not a reason for frontend token storage. |
| Frontend password validation currently allows 4 characters while BetterAuth defaults to 8. | Signup can pass frontend validation and fail backend validation. | Backlog validation alignment for auth UI wiring scope. |
| Auth routes do not use the app envelope. | A normalizer written only for app routes would miss BetterAuth messages. | Normalize both BetterAuth raw errors and app-envelope errors. |
| No frontend test harness exists. | API behavior may rely on typecheck/build plus manual smoke testing. | Document manual smoke path and add tests when a harness exists. |

### 16.1 Production-readiness review backlog (post-build)

**Performance (deferred):**

- No deferred performance work for auth-only v1.

**Security (deferred):**

- Confirm backend cookie settings work in local and deployed environments with the frontend origin.
- Consider a focused auth/security review before shipping login/signup UI wiring.

**Stability + availability (deferred):**

- Add API-layer unit tests with mocked transport once frontend test tooling exists.
- Add a browser smoke path when login/signup forms are wired to `$api.auth`.

**Scalability (deferred):**

- No load test needed for this auth wrapper. Revisit load testing for AI generation and SSE scopes.

**Accepted current state (documented, not built):**

- Login and signup composables remain stubbed.
- New-course and dashboard data flows remain outside this API layer v1.

---

## 17. Appendix A - Locked decisions

| Decision | Rationale |
| -------- | --------- |
| Build auth-only v1. | The user said the other repositories are not ready. |
| Expose the API as `$api.auth.*`. | The user requested `const { $api } = useNuxtApp()` and calls like `$api.auth.login(email, password)`. |
| Keep this implementation layer-only. | The user selected not to wire active UI flows yet. |
| Replace the current partial implementation. | The user asked to ignore the existing implementation and start fresh. |
| Use cookie-based auth only. | The backend uses BetterAuth server-side sessions stored in PostgreSQL. |
| Do not manually store returned tokens. | BetterAuth owns the session cookie; frontend token storage would weaken the model and conflict with the backend design. |
| Normalize both BetterAuth raw errors and app-envelope errors. | Auth routes are BetterAuth routes, while protected app routes use the backend envelope. Future repositories will likely need both behaviors. |
| Defer frontend validation alignment. | Password-length mismatch is real but belongs with auth UI wiring, not the repository layer. |

---

## 18. Appendix B - Memos & scopes referenced

- `ai-process/AI_COLLABORATION.md` - six-phase collaboration process and quality gates.
- `ai-process/templates/SCOPE_TEMPLATE.md` - scope document structure and required sections.
- `AGENTS.md` - Nuxt project conventions.
- `app/plugins/api.ts` - existing Nuxt API injection point.
- `app/services/api/*` - current partial implementation to replace.
- `/Users/anasazkoul/Desktop/Projects/Dev/learn_flow/learn_flow_api/src/utils/auth.ts` - BetterAuth backend configuration.
- `/Users/anasazkoul/Desktop/Projects/Dev/learn_flow/learn_flow_api/src/index.ts` - backend route mounting and CORS context.
- `/Users/anasazkoul/Desktop/Projects/Dev/learn_flow/learn_flow_api/src/schemas/auth.schema.ts` - backend user/session schema fields.

---

## 19. Implementation checkpoint log

### 2026-05-30 - Phase 3 implementation

Changed:

- Replaced `app/services/api/client.ts` with `app/services/api/fetchFactory.ts`.
- Removed the old `AuthService` class implementation.
- Added `app/services/api/repositories/auth.repository.ts`.
- Added `app/services/api/repositories/index.ts`.
- Updated `app/services/api/index.ts` to expose `$api.auth`.
- Expanded auth request/response types in `app/services/api/types/auth.ts`.
- Updated `app/composables/useAuthSession.ts` from `$api.AuthService.getSession()` to `$api.auth.getSession()`.

Verified:

- Scoped ESLint passed for `app/services/api`, `app/plugins/api.ts`, and `app/composables/useAuthSession.ts`.
- `npm run build` completed successfully.
- `npx nuxi typecheck` ran but failed on pre-existing Vue errors outside this API scope.

Remaining:

- Manual BetterAuth smoke path if backend, database, and environment are running.

### 2026-05-30 - Phase 5 structured review

Reviewed:

- Public API shape is `$api.auth.*`.
- `fetchFactory` uses `$fetch.create`, runtime base URL, `credentials: "include"`, and SSR cookie forwarding.
- Auth repository maps BetterAuth login, signup, session, and sign-out endpoints.
- Signup maps frontend `fullName` to BetterAuth `name`.
- No manual token persistence, `Authorization` header, `localStorage`, or `sessionStorage` usage exists in the scoped API layer.
- Existing UI form stubs remain unwired, matching the layer-only scope.
- `useAsyncData` remains at the consumer/composable level and is not used inside `fetchFactory`.

Findings ledger:

| ID | Finding | Severity | Action | Status |
| --- | --- | --- | --- | --- |
| C-1 | No correctness blockers found in the scoped API layer. | Low | No code change. | Closed |
| S-1 | No manual token storage or manual auth headers found. | Low | Keep cookie-only model. | Closed |
| T-1 | Typecheck remains blocked by unrelated pre-existing Vue errors. | Medium | Track outside this API scope or fix before requiring full-project typecheck as a release gate. | Backlog |

Confidence:

- API layer: high for static correctness within the scoped files; scoped lint and production build passed.
- Runtime auth behavior: medium; manual backend smoke path was not run in this session.
- Security posture: medium-high for frontend token handling; backend cookie behavior still needs environment-level smoke verification.

### 2026-05-30 - Phase 6 closing

Final state:

- Auth-only repository-pattern API layer is implemented.
- Public frontend API is `$api.auth.*`.
- `fetchFactory` owns transport behavior and does not use `useAsyncData`.
- `useAuthSession()` remains the only migrated consumer and keeps `useAsyncData` at the composable layer.
- Login/signup/new-course UI wiring remains intentionally out of scope.

Topics and decisions gate:

| Topic | Decision | Rationale |
| ----- | -------- | --------- |
| Fix unrelated full-project typecheck errors now? | Backlog | Errors are outside the scoped API files and pre-existed this auth API work. |
| Run manual BetterAuth smoke path now? | Backlog until backend/database/env are running | The frontend layer is ready, but runtime cookie verification needs the backend environment. |
| Wire login/signup forms to `$api.auth` now? | Backlog | User selected layer-only implementation for this scope. |
| Add course/generation repositories now? | Backlog | User explicitly limited v1 to auth only. |
| Add a frontend test harness now? | Backlog | No harness exists and adding one would be separate tooling scope. |

Load-test relevance:

- Skipped for this scope. The change is a thin frontend auth transport wrapper with low-volume user-triggered requests.
- Revisit load/concurrency testing in future AI generation, SSE, request fanout, or hot-route scopes.

Final verification summary:

- Scoped lint passed.
- Production build passed.
- Full typecheck did not pass because of unrelated pre-existing Vue errors.
- Manual backend smoke test was not run.

---

## Verification plan

Run after implementation:

```bash
npx nuxi typecheck
npm run build
npx eslint app/services/api app/plugins/api.ts app/composables/useAuthSession.ts
```

Manual smoke path if backend, database, and environment are running:

- `getSession()` returns `null` while signed out.
- Failed login throws `ApiError` with a useful message.
- Successful login sets a BetterAuth cookie.
- `getSession()` returns `{ user, session }` after successful login.
- `signOut()` clears the session, and a later `getSession()` returns `null`.

If backend services are not running, report manual smoke testing as blocked by environment instead of changing the frontend auth model.

### 2026-05-30 verification results

| Check | Result | Notes |
| ----- | ------ | ----- |
| `npx eslint app/services/api app/plugins/api.ts app/composables/useAuthSession.ts` | Passed | No lint output. |
| `npm run build` | Passed | Build completed with existing sourcemap/CSS warnings. |
| `npx nuxi typecheck` | Failed | Reported errors in `CourseGlyph.vue`, `FeatureVisual.vue`, and `Login/index.vue`; no touched API files were reported. |
| Manual backend smoke path | Not run | Requires backend/database/env to be running. |
