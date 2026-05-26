<script lang="ts" setup>
import Navbar from '~/components/layout/Navbar/Navbar.vue';
import FooterSection from '~/components/features/LandingPage/FooterSection.vue';

const navLinks = [
  {label: 'Examples', href: '#examples', isAnchor: true},
  {label: 'How it works', href: '#how-it-works', isAnchor: true},
  {label: 'Pricing', href: '#pricing', isAnchor: true},
];

const navActions = [
  {label: 'Sign in', variant: 'secondary' as const, to: '/login'},
];
</script>

<template>
  <div>
    <a
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:font-display focus:font-semibold focus:text-sm"
      href="#main-content"
    >
      Skip to content
    </a>
    <Navbar :actions="navActions" :links="navLinks" />
    <main id="main-content">
      <slot />
    </main>
    <FooterSection />
  </div>
</template>
