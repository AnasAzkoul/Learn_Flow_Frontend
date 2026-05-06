<script lang="ts" setup>
import AppLogo from "~/components/layout/AppLogo/AppLogo.vue";

const currentYear = new Date().getFullYear();

const columns = [
  {
    title: 'Product',
    links: ['How it works', 'Examples', 'Pricing', 'API'],
  },
  {
    title: 'Company',
    links: ['About', 'Blog', 'Careers', 'Contact'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'Security'],
  },
];
</script>

<template>
  <footer class="bg-bg-alt border-t border-border-light">
    <div class="max-w-[1400px] mx-auto px-6 md:px-10">
      <!-- Main footer grid -->
      <div class="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 md:gap-16 py-16 md:py-20">
        <!-- Brand column -->
        <div>
          <AppLogo variant="on-light" size="default" />
          <p class="text-text-sec text-base mt-5 leading-relaxed" style="font-family: var(--font-sans)">
            AI-powered courses built for you.
          </p>
        </div>

        <!-- Link columns -->
        <div v-for="col in columns" :key="col.title">
          <h4 class="font-display font-bold text-text-main text-base mb-5">
            {{ col.title }}
          </h4>
          <ul class="space-y-3.5">
            <li v-for="link in col.links" :key="link">
              <a
                href="#"
                class="text-text-sec text-[0.9375rem] hover:text-text-main transition-colors duration-200"
                style="font-family: var(--font-sans)"
              >
                {{ link }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4 py-6 border-t border-border-light">
        <span class="mono-space text-[0.75rem] text-text-muted tracking-[0.12em]">
          &copy; {{ currentYear }} LearnFlow. All rights reserved.
        </span>
        <span class="text-text-muted text-sm" style="font-family: var(--font-sans)">
          Made with care
        </span>
      </div>
    </div>
  </footer>
</template>
