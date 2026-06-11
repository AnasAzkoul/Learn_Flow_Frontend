# LearnFlow - Nuxt Project

AI-powered personalized learning platform.

## Stack

- **Framework:** Nuxt 4 (Vue 3)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + tw-animate-css
- **UI Components:** shadcn-vue (new-york style, no prefix) via `shadcn-nuxt` module
- **Icons:** lucide-vue-next
- **State:** Pinia (`@pinia/nuxt`)
- **Forms:** vee-validate + @vee-validate/zod + zod
- **Utilities:** VueUse (`@vueuse/nuxt`), embla-carousel-vue, vue-sonner
- **Primitives:** reka-ui (headless UI primitives underlying shadcn-vue)
- **Font:** JetBrains Mono

## Project Structure

```
app/
  app.vue                        # Root component
  assets/css/main.css            # Global styles (Tailwind + shadcn theme)
  lib/utils.ts                   # Utility functions (cn helper)
  plugins/ssr-width.ts           # SSR width plugin
  layouts/
    default.vue                  # Default layout
    landing.vue                  # Landing page layout
    auth.vue                     # Auth pages layout (Login/Signup)
  pages/
    index.vue                    # Landing page
    dashboard.vue                # Dashboard page
    new-course.vue               # New course creation
    Login/                       # Login page (index.vue, useLogin.ts, config.ts)
    Signup/                      # Signup page (index.vue, useSignup.ts, config.ts)
  components/
    ui/                          # shadcn-vue primitives (42 component sets)
    common/                      # Reusable form components (BaseInput, BaseSelect, BaseCheckbox, BaseCalendar, SectionDivider)
    features/LandingPage/        # Landing page sections (Hero, Features, HowItWorks, Testimonial, CTA, etc.)
    layout/                      # Layout components (Navbar, AppLogo, AccountDropdown)
```

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run generate` — Static generation
- `npm run preview` — Preview production build

## API

- Backend API URL configured via `runtimeConfig.public.apiUrl` (default: `http://localhost:3001/api`)

## Conventions

- shadcn-vue components live in `@/components/ui` (no prefix)
- Use `cn()` from `@/lib/utils` for conditional class merging
- Tailwind v4 uses CSS-based config (no tailwind.config.ts)
- Dark mode via `.dark` class variant
- Pinia stores must use setup-store / Composition API style; do not use Options API stores for new or refactored store code
- Page-level composables colocated with page: `useLogin.ts`, `useSignup.ts`
- Page-level config/constants colocated with page: `config.ts`
- Feature components organized by domain under `components/features/`
- Layout components under `components/layout/`
- Common reusable form components under `components/common/` (wrap shadcn primitives with app-specific defaults)
