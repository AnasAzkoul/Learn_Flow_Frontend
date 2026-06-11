<script lang="ts" setup>
import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import AppLogo from '@/components/layout/AppLogo/AppLogo.vue';
import {Menu, X} from "lucide-vue-next";

interface NavLink {
  label: string;
  href: string;
  isAnchor?: boolean;
}

interface NavAction {
  label: string;
  variant: 'default' | 'secondary';
  to: string;
}

defineOptions({name: 'AppNavbar'});

const props = withDefaults(defineProps<{
  links?: NavLink[];
  actions?: NavAction[];
}>(), {
  links: () => [],
  actions: () => [],
});

const mobileOpen = ref(false);
const route = useRoute();

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
      <NuxtLink class="flex shrink-0 transition-colors duration-300" to="/">
        <AppLogo size="default" variant="on-light" />
      </NuxtLink>

      <!-- Desktop center nav -->
      <div class="hidden md:flex items-center gap-2">
        <template v-for="link in links" :key="link.label">
          <a
            v-if="link.isAnchor"
            :href="link.href"
            class="px-4 py-2 rounded-[var(--radius-md)] font-display text-sm font-medium text-text-sec hover:bg-bg-alt hover:text-text-main transition-colors duration-200"
          >
            {{ link.label }}
          </a>
          <NuxtLink
            v-else
            :to="link.href"
            class="px-4 py-2 rounded-[var(--radius-md)] font-display text-sm font-medium text-text-sec hover:bg-bg-alt hover:text-text-main transition-colors duration-200"
          >
            {{ link.label }}
          </NuxtLink>
        </template>
      </div>

      <!-- Desktop right: actions slot -->
      <div class="hidden md:flex items-center gap-3">
        <div class="w-px h-6 bg-border-light" />
        <slot name="actions">
          <Button
            v-for="action in actions"
            :key="action.label"
            :to="action.to"
            :variant="action.variant"
            class="font-display"
            size="md"
          >
            {{ action.label }}
          </Button>
        </slot>
      </div>

      <!-- Mobile hamburger -->
      <button
        :aria-expanded="mobileOpen"
        aria-controls="mobile-menu"
        class="md:hidden flex items-center justify-center size-10 rounded-lg text-text-main hover:bg-bg-alt transition-colors ml-auto"
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
          <template v-for="link in links" :key="link.label">
            <a
              v-if="link.isAnchor"
              :href="link.href"
              class="flex items-center h-12 px-4 rounded-lg font-display text-sm font-medium text-text-sec hover:text-text-main hover:bg-bg-alt transition-colors"
              @click="closeMobile"
            >
              {{ link.label }}
            </a>
            <NuxtLink
              v-else
              :to="link.href"
              class="flex items-center h-12 px-4 rounded-lg font-display text-sm font-medium text-text-sec hover:text-text-main hover:bg-bg-alt transition-colors"
              @click="closeMobile"
            >
              {{ link.label }}
            </NuxtLink>
          </template>
          <div class="h-px bg-border-light my-2" />
          <div class="flex flex-col gap-2 mt-1">
            <slot name="mobile-actions">
              <Button
                v-for="action in actions"
                :key="action.label"
                :to="action.to"
                :variant="action.variant"
                class="w-full font-display"
                size="lg"
              >
                {{ action.label }}
              </Button>
            </slot>
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
