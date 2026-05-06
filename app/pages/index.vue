<script lang="ts" setup>
import Navbar from "~/components/layout/Navbar/Navbar.vue";
import HeroSection from "~/components/features/LandingPage/HeroSection.vue";
import HowItWorksSection from "~/components/features/LandingPage/HowItWorksSection.vue";
import FeaturesGridSection from "~/components/features/LandingPage/FeaturesGridSection.vue";
import TestimonialSection from "~/components/features/LandingPage/TestimonialSection.vue";
import ExampleCoursesSection from "~/components/features/LandingPage/ExampleCoursesSection.vue";
import CtaBannerSection from "~/components/features/LandingPage/CtaBannerSection.vue";
import FooterSection from "~/components/features/LandingPage/FooterSection.vue";
</script>

<template>
  <a
    class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:font-display focus:font-semibold focus:text-sm"
    href="#main-content"
  >
    Skip to content
  </a>
  <Navbar />
  <main id="main-content">
    <HeroSection />
    <HowItWorksSection />
    <FeaturesGridSection />
    <TestimonialSection />
    <ExampleCoursesSection />
    <CtaBannerSection />
  </main>
  <FooterSection />
</template>
