<script lang="ts" setup>
import HeroSection from '~/components/features/LandingPage/HeroSection.vue';
import HowItWorksSection from '~/components/features/LandingPage/HowItWorksSection.vue';
import FeaturesGridSection from '~/components/features/LandingPage/FeaturesGridSection.vue';
import TestimonialSection from '~/components/features/LandingPage/TestimonialSection.vue';
import ExampleCoursesSection from '~/components/features/LandingPage/ExampleCoursesSection.vue';
import CtaBannerSection from '~/components/features/LandingPage/CtaBannerSection.vue';

definePageMeta({ layout: 'landing' });
</script>

<template>
  <HeroSection />
  <HowItWorksSection />
  <FeaturesGridSection />
  <TestimonialSection />
  <ExampleCoursesSection />
  <CtaBannerSection />
</template>
