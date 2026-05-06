<script setup lang="ts">
import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import AppLogo from '@/components/layout/AppLogo/AppLogo.vue';
import {Menu, X} from "lucide-vue-next";

const mobileOpen = ref(false);
const route = useRoute();

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  {label: "Examples", href: "#examples"},
  {label: "How it works", href: "#how-it-works"},
  {label: "Pricing", href: "#pricing"},
];

watch(() => route.fullPath, () => {
  mobileOpen.value = false;
});

function closeMobile() {
  mobileOpen.value = false;
}
</script>

<template>
  <nav
    aria-label="Main navigation"
    class="fixed top-0 left-0 right-0 z-50 border-b border-border-light"
    style="background: rgba(250, 249, 245, 0.92); backdrop-filter: blur(12px)"
  >
    <div class="flex items-center justify-between h-[72px] mx-auto max-w-[1400px] px-6 md:px-10">
      <!-- Logo -->
      <NuxtLink to="/" class="flex shrink-0 transition-colors duration-300">
        <AppLogo variant="on-light" size="default" />
      </NuxtLink>

      <!-- Desktop center nav -->
      <div class="hidden md:flex items-center gap-2">
        <a
          v-for="link in navLinks"
          :key="link.label"
          :href="link.href"
          class="px-4 py-2 rounded-[var(--radius-md)] font-display text-sm font-medium text-text-sec hover:bg-bg-alt hover:text-text-main transition-colors duration-200"
        >
          {{ link.label }}
        </a>
      </div>

      <!-- Desktop right: divider + auth buttons -->
      <div class="hidden md:flex items-center gap-3">
        <div class="w-px h-6 bg-border-light" />
        <Button
          variant="secondary"
          size="md"
          class="font-display"
        >
          Sign in
        </Button>
        <Button
          variant="default"
          size="md"
          class="font-display"
        >
          Try free
        </Button>
      </div>

      <!-- Mobile hamburger -->
      <button
        class="md:hidden flex items-center justify-center size-10 rounded-lg text-text-main hover:bg-bg-alt transition-colors ml-auto"
        :aria-expanded="mobileOpen"
        aria-controls="mobile-menu"
        @click="mobileOpen = !mobileOpen"
      >
        <span class="sr-only">{{ mobileOpen ? 'Close menu' : 'Open menu' }}</span>
        <X v-if="mobileOpen" :size="20" />
        <Menu v-else :size="20" />
      </button>
    </div>

    <!-- Mobile menu panel -->
    <Transition name="mobile-nav">
      <div
        v-if="mobileOpen"
        id="mobile-menu"
        class="md:hidden absolute top-[72px] inset-x-0 border-b border-border-light"
        style="background: rgba(250, 249, 245, 0.95); backdrop-filter: blur(12px)"
      >
        <div class="flex flex-col px-6 py-4 gap-1">
          <a
            v-for="link in navLinks"
            :key="link.label"
            :href="link.href"
            class="flex items-center h-12 px-4 rounded-lg font-display text-sm font-medium text-text-sec hover:text-text-main hover:bg-bg-alt transition-colors"
            @click="closeMobile"
          >
            {{ link.label }}
          </a>
          <div class="h-px bg-border-light my-2" />
          <div class="flex flex-col gap-2 mt-1">
            <Button variant="secondary" size="lg" class="w-full font-display">
              Sign in
            </Button>
            <Button variant="default" size="lg" class="w-full font-display">
              Try free
            </Button>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: opacity 0.2s cubic-bezier(0.25, 1, 0.5, 1),
              transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
}

.mobile-nav-enter-from,
.mobile-nav-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
