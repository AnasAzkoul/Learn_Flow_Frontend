<script setup lang="ts">
import {ref} from "vue";
import AppLogo from '@/components/layout/AppLogo/AppLogo.vue';
import AccountDropdown from "~/components/layout/AccountDropdown/AccountDropdown.vue";


const isAuthenticated = ref(false);

export interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Personalization", href: "#personalization" },
  { label: "The experience", href: "#reader" },
];


</script>

<template>
  <NavigationMenu>
    <NavigationMenuList class="flex justify-between fixed top-0 left-0 right-0 z-50 bg-bg/70 backdrop-blur-xl border-b border-border-light w-full h-16 px-6 md:px-10">
      <NavigationMenuItem class="flex gap-6 shrink-0 text-primary transition-colors duration-300 pr-6 border-r border-border-light hover:text-text-main hover:cursor-pointer">
        <NuxtLink to="/">
          <AppLogo variant="on-light" />
        </NuxtLink>
      </NavigationMenuItem>

      <ul class="flex items-center gap-6 px-6 h-full">
        <NavigationMenuItem
          v-for="link in navLinks"
          :key="link.label"
          class="text-text-main hover:text-text-main transition-colors duration-300 hover:cursor-pointer"
        >
          <Button
            :href="link.href"
            variant="ghost"
            class="hover:bg-background-hover"
            size="lg"
          >
            {{ link.label }}
          </Button>
        </NavigationMenuItem>
      </ul>

      <!-- Auth / CTA -->
      <NavigationMenuItem class="ml-auto flex items-center gap-3 shrink-0">
        <Button
          v-if="!isAuthenticated"
          variant="default"
          size="lg"
        >
          Get started
        </Button>
        <AccountDropdown v-else />
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>