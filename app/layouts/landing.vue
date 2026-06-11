<script lang="ts" setup>
import {storeToRefs} from 'pinia';
import Navbar from '~/components/layout/Navbar/Navbar.vue';
import FooterSection from '~/components/features/LandingPage/FooterSection.vue';
import {useAuthStore} from '~/stores/useAuthStore';

defineOptions({name: 'LandingLayout'});

const navLinks = [
  {label: 'Examples', href: '#examples', isAnchor: true},
  {label: 'How it works', href: '#how-it-works', isAnchor: true},
  {label: 'Pricing', href: '#pricing', isAnchor: true},
];

const authStore = useAuthStore();
const {isAuthenticated, isLoading} = storeToRefs(authStore);
const {signOutAndRedirect} = useAuthSignOut();

await useAuthSession();
</script>

<template>
  <div>
    <a
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:font-display focus:font-semibold focus:text-sm"
      href="#main-content"
    >
      Skip to content
    </a>
    <Navbar :links="navLinks">
      <template #actions>
        <Button
          v-if="isAuthenticated"
          :disabled="isLoading"
          variant="secondary"
          class="font-display"
          size="md"
          @click="signOutAndRedirect"
        >
          Sign out
        </Button>
        <Button
          v-else
          to="/login"
          variant="secondary"
          class="font-display"
          size="md"
        >
          Sign in
        </Button>
      </template>
      <template #mobile-actions>
        <Button
          v-if="isAuthenticated"
          :disabled="isLoading"
          variant="secondary"
          class="w-full font-display"
          size="lg"
          @click="signOutAndRedirect"
        >
          Sign out
        </Button>
        <Button
          v-else
          to="/login"
          variant="secondary"
          class="w-full font-display"
          size="lg"
        >
          Sign in
        </Button>
      </template>
    </Navbar>
    <main id="main-content">
      <slot />
    </main>
    <FooterSection />
  </div>
</template>
