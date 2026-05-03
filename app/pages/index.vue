<script lang="ts" setup>
import Navbar from "~/components/layout/Navbar/Navbar.vue";
import HeroSection from "../components/features/LandingPage/HeroSection.vue";
import HowItWorksSection from "../components/features/LandingPage/HowItWorksSection.vue";
import PersonalizationSection from "../components/features/LandingPage/Personalization/PersonalizationSection.vue";
import LessonPageSection from "../components/features/LandingPage/LessonPageSection.vue";
import CtaBannerSection from "~/components/features/LandingPage/CtaBannerSection.vue";
import FooterSection from "~/components/features/LandingPage/FooterSection.vue";
</script>

<template>
  <Navbar />
  <HeroSection />
  <div class="wrapper">
    <HowItWorksSection />
    <PersonalizationSection />
    <LessonPageSection />
  </div>
  <CtaBannerSection />
  <FooterSection />
</template>

<style scoped>

</style>