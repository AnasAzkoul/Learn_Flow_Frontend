# LearnFlow - Nuxt Project

## Stack

- **Framework:** Nuxt 4 (Vue 3)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + tw-animate-css
- **UI Components:** shadcn-vue (new-york style, no prefix)
- **Icons:** lucide-vue-next
- **Utilities:** VueUse (@vueuse/nuxt)
- **Font:** JetBrains Mono

## Project Structure

```
app/
  app.vue          # Root component
  assets/css/      # Global styles (main.css with Tailwind + shadcn theme)
  lib/utils.ts     # Utility functions (cn helper)
  plugins/         # Nuxt plugins
```

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run generate` — Static generation
- `npm run preview` — Preview production build

## Conventions

- shadcn-vue components live in `@/components/ui`
- Use `cn()` from `@/lib/utils` for conditional class merging
- Tailwind v4 uses CSS-based config (no tailwind.config.ts)
- Dark mode via `.dark` class variant
