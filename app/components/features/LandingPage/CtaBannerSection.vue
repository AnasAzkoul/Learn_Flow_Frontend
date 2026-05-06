<script lang="ts" setup>
import Button from "@/components/ui/button/Button.vue";
</script>

<template>
  <section class="relative py-28 md:py-36 px-6 md:px-10 bg-esp-900 overflow-hidden">
    <!-- Ember glow -->
    <div
      aria-hidden="true"
      class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(ellipse 70% 50% at 50% 50%, rgba(232, 87, 26, 0.16) 0%, transparent 60%)"
    />

    <div class="relative max-w-[800px] mx-auto text-center">
      <h2
        class="text-text-on-dark mb-10"
        style="font-family: var(--font-display); font-size: clamp(2.5rem, 5.5vw, 4.5rem); font-weight: 700; line-height: 1.0; letter-spacing: -0.04em"
      >
        Start learning.<br />
        <span class="text-primary">Your way.</span>
      </h2>

      <Button variant="default" size="lg" class="font-display font-semibold text-base px-8">
        Get started free →
      </Button>
    </div>
  </section>
</template>
