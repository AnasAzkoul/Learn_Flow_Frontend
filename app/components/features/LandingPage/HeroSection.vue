<script lang="ts" setup>
import {Button} from "@/components/ui/button";
</script>

<template>
  <section class="relative bg-esp-900 pt-36 pb-24 text-center overflow-hidden">
    <!-- Radial glow layer -->
    <div
      aria-hidden="true"
      class="absolute inset-0 hero-glow"
    />

    <!-- Bottom fade to page background -->
    <div
      aria-hidden="true"
      class="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-b from-transparent to-bg"
    />

    <!-- Content -->
    <div class="relative max-w-3xl mx-auto space-y-6">
      <!-- Eyebrow -->
      <span class="font-display text-xs font-semibold uppercase tracking-[0.1em] text-primary block reveal">
        AI-Powered Courses
      </span>

      <!-- Heading -->
      <h1 class="display-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-text-on-dark reveal reveal-delay-1">
        Your curriculum. Your pace.
        <br>
        <span class="text-primary">An AI that teaches.</span>
      </h1>

      <!-- Body -->
      <p class="text-base md:text-lg text-text-on-dark-sec max-w-[460px] mx-auto leading-relaxed reveal reveal-delay-2">
        Tell us what you want to learn. Our AI builds a structured, personalized
        course — calibrated to your level, ready in seconds.
      </p>

      <!-- Trust signal -->
      <div class="flex items-center justify-center gap-2 flex-wrap reveal reveal-delay-3">
        <span class="text-xs text-text-on-dark-mut font-display">People are learning</span>
        <span class="text-xs text-text-on-dark-mut">→</span>
        <div class="flex items-center gap-1.5">
          <span class="px-2.5 py-1 rounded-full bg-esp-800 border border-esp-700 text-primary text-xs font-display font-semibold">Python</span>
          <span class="px-2.5 py-1 rounded-full bg-esp-800 border border-esp-700 text-primary text-xs font-display font-semibold">System Design</span>
          <span class="px-2.5 py-1 rounded-full bg-esp-800 border border-esp-700 text-primary text-xs font-display font-semibold">React</span>
        </div>
      </div>

      <!-- CTA Buttons -->
      <div class="flex items-center justify-center pt-2 reveal reveal-delay-4">
        <Button
          class="rounded-lg font-display font-semibold h-13 px-8 text-lg"
          size="lg"
          to="/new-course"
          variant="default"
        >
          Start learning →
        </Button>
      </div>

      <!-- Product preview mockup -->
      <div class="bg-esp-800 border border-esp-700 rounded-[var(--radius-md)] max-w-xl mx-auto mt-4 text-left overflow-hidden reveal reveal-delay-5">
        <!-- Card header -->
        <div class="flex items-center justify-between px-5 py-4 border-b border-esp-700">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-esp-700 border border-esp-600 flex items-center justify-center shrink-0">
              <span class="text-primary text-sm">✦</span>
            </div>
            <div>
              <p class="font-display text-sm font-semibold text-text-on-dark">
                Introduction to Machine Learning
              </p>
              <p class="text-xs text-text-on-dark-mut">
                6 modules · Beginner
              </p>
            </div>
          </div>
          <span class="px-2.5 py-1 rounded-full bg-esp-700 border border-esp-600 text-primary text-xs font-display font-semibold shrink-0 ml-3">
            AI Generated
          </span>
        </div>

        <!-- Module rows -->
        <div class="divide-y divide-esp-700">
          <div class="flex items-center gap-4 px-5 py-3.5">
            <span class="w-6 h-6 rounded-md bg-primary flex items-center justify-center text-white text-xs font-display font-bold shrink-0">1</span>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-display font-medium text-text-on-dark">
                What is Machine Learning?
              </p>
              <p class="text-xs text-text-on-dark-mut">
                Concepts · 8 min
              </p>
            </div>
            <div class="w-16 h-1.5 rounded-full bg-esp-700 overflow-hidden shrink-0">
              <div class="h-full w-full bg-primary rounded-full" />
            </div>
          </div>
          <div class="flex items-center gap-4 px-5 py-3.5">
            <span class="w-6 h-6 rounded-md bg-esp-700 flex items-center justify-center text-text-on-dark-mut text-xs font-display font-bold shrink-0">2</span>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-display font-medium text-text-on-dark">
                Supervised vs Unsupervised
              </p>
              <p class="text-xs text-text-on-dark-mut">
                Theory · 12 min
              </p>
            </div>
            <div class="w-16 h-1.5 rounded-full bg-esp-700 overflow-hidden shrink-0">
              <div class="h-full w-1/2 bg-primary rounded-full" />
            </div>
          </div>
          <div class="flex items-center gap-4 px-5 py-3.5 opacity-50">
            <span class="w-6 h-6 rounded-md bg-esp-700 flex items-center justify-center text-text-on-dark-mut text-xs font-display font-bold shrink-0">3</span>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-display font-medium text-text-on-dark">
                Your First Model in Python
              </p>
              <p class="text-xs text-text-on-dark-mut">
                Hands-on · 20 min
              </p>
            </div>
            <div class="w-16 h-1.5 rounded-full bg-esp-700 shrink-0" />
          </div>
        </div>

        <!-- Card footer -->
        <div class="px-5 py-3 bg-esp-900 flex items-center justify-between border-t border-esp-700">
          <span class="text-xs text-text-on-dark-mut font-display">3 more modules</span>
          <span class="mono-space text-text-on-dark-mut">Generated in 3.2s</span>
        </div>
      </div>
    </div>
  </section>
</template>
