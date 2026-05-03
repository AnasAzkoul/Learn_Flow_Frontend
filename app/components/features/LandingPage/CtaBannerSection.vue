<script lang="ts" setup>
import {ref} from "vue";
import Button from "@/components/ui/button/Button.vue";

const router = useRouter();
const query = ref("");

function handleSubmit() {
  router.push("/new-course");
}
</script>

<template>
  <section class="relative bg-bg px-6 py-20 sm:px-12 md:py-28 overflow-hidden">
    <div aria-hidden="true" class="absolute inset-0 hero-glow-light" />
    <div class="relative mx-auto max-w-3xl text-center space-y-8">
      <!-- Eyebrow -->
      <div class="flex items-center justify-center gap-4 reveal">
        <div class="h-px w-10 bg-primary/40" />
        <span class="mono-space text-primary">BEGIN_TRANSMISSION</span>
        <div class="h-px w-10 bg-primary/40" />
      </div>

      <!-- Heading -->
      <h2 class="display-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text-main reveal reveal-delay-1">
        WHAT DO YOU WANT
        <br>
        <span class="text-primary">TO LEARN?</span>
      </h2>

      <!-- Command bar -->
      <form
        class="flex items-stretch gap-0 max-w-2xl mx-auto reveal reveal-delay-2"
        @submit.prevent="handleSubmit"
      >
        <div class="flex flex-1 items-center gap-3 bg-white border border-border rounded-l-xl px-5 py-4">
          <span class="font-mono text-primary text-lg shrink-0">&gt;</span>
          <input
            v-model="query"
            class="w-full bg-transparent text-text-main placeholder:text-text-muted font-mono text-sm outline-none"
            placeholder="e.g. orbital mechanics from Newton to rocket equations"
            type="text"
          >
        </div>
        <Button
          class="shrink-0 bg-primary hover:bg-accent-hover text-white font-display font-semibold text-sm uppercase tracking-wider px-6 rounded-r-xl transition-colors duration-200"
          type="submit"
        >
          Generate →
        </Button>
      </form>

      <!-- Trust signal -->
      <p class="mono-space text-text-muted reveal reveal-delay-3">
        FREE · NO CREDIT CARD · UNLIMITED COURSES DURING BETA
      </p>
    </div>
  </section>
</template>
