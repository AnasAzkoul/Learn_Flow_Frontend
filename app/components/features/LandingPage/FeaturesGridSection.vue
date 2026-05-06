<script lang="ts" setup>
import {ref, onMounted, onUnmounted} from "vue";
import FeatureVisual from "./FeatureVisual.vue";

const active = ref(0);
let timer: ReturnType<typeof setInterval>;

onMounted(() => {
  timer = setInterval(() => {
    active.value = (active.value + 1) % 3;
  }, 4200);
});

onUnmounted(() => clearInterval(timer));

function setActive(i: number) {
  active.value = i;
}

const smallCards = [
  {
    kicker: 'II.',
    title: 'Lightning generation',
    desc: 'From prompt to structured syllabus in under 5 seconds. No templates — pure architecture.',
    stat: '4.2s',
    statLabel: 'median build',
    visual: 'pulse' as const,
  },
  {
    kicker: 'III.',
    title: 'Your curriculum',
    desc: 'Broad survey or surgical deep-dive. You set the breadth; the AI commits to it.',
    stat: '∞',
    statLabel: 'paths possible',
    visual: 'paths' as const,
  },
];
</script>

<template>
  <section class="relative py-16 md:py-20 px-6 md:px-10 bg-esp-900 overflow-hidden">
    <!-- Ambient glow -->
    <div
      aria-hidden="true"
      class="absolute pointer-events-none"
      style="top: -30%; left: 20%; width: 70%; height: 80%; background: radial-gradient(ellipse at center, rgba(232, 87, 26, 0.16) 0%, transparent 65%)"
    />
    <!-- Dot grid -->
    <div aria-hidden="true" class="absolute inset-0 dot-grid-dark pointer-events-none" />

    <div class="relative max-w-[1400px] mx-auto">
      <!-- Section header -->
      <div class="grid md:grid-cols-2 gap-8 md:gap-[60px] items-end mb-10">
        <div>
          <div class="inline-flex items-center gap-3 mono-space text-primary tracking-[0.18em] mb-4">
            <span
              class="size-1.5 rounded-full bg-primary"
              style="box-shadow: 0 0 12px rgba(232, 87, 26, 0.8); animation: hearthPulse 2s ease-in-out infinite"
            />
            The mechanics — under the hood
          </div>
          <h2 class="text-text-on-dark" style="font-family: var(--font-display); font-size: clamp(2.25rem, 5vw, 3.75rem); font-weight: 700; line-height: 1.0; letter-spacing: -0.04em">
            How LearnFlow<br />
            <em class="text-primary not-italic" style="font-family: var(--font-sans); font-style: italic; font-weight: 500">Adapts to you.</em>
          </h2>
        </div>
        <div>
          <p class="text-text-on-dark-sec text-base leading-relaxed max-w-[460px]" style="font-family: var(--font-sans)">
            Three systems work in concert: a model that reads your skill level signal-by-signal, a generator that drafts a full syllabus in seconds, and a router that branches your path through it. Hover any card to see the mechanism.
          </p>
        </div>
      </div>

      <!-- Asymmetric grid -->
      <div class="grid md:grid-cols-[1.25fr_1fr] gap-4">
        <!-- Hero card (spans 2 rows) -->
        <div
          class="md:row-span-2 relative rounded-2xl p-8 md:p-10 flex flex-col cursor-pointer overflow-hidden transition-all duration-[600ms]"
          :style="{
            background: active === 0
              ? 'linear-gradient(160deg, rgba(232, 87, 26, 0.18) 0%, rgba(31, 36, 43, 0.95) 55%)'
              : 'rgba(31, 36, 43, 0.5)',
            border: `1px solid ${active === 0 ? 'rgba(232, 87, 26, 0.45)' : 'rgba(238, 240, 244, 0.08)'}`,
            boxShadow: active === 0
              ? '0 32px 80px rgba(232, 87, 26, 0.18), inset 0 1px 0 rgba(255,255,255,0.06)'
              : 'inset 0 1px 0 rgba(255,255,255,0.03)',
            transitionTimingFunction: 'var(--hearth-ease)',
          }"
          @mouseenter="setActive(0)"
        >
          <!-- Corner pip -->
          <div class="absolute top-5 right-5 mono-space text-[0.65rem] tracking-[0.18em] text-primary flex items-center gap-2">
            <span
              class="size-2 rounded-full bg-primary"
              style="box-shadow: 0 0 16px rgba(232, 87, 26, 0.8); animation: hearthPulse 2s ease-in-out infinite"
            />
            Live · calibrating
          </div>

          <!-- Animated SVG visual -->
          <div class="flex items-center justify-center mb-1">
            <FeatureVisual kind="wave" :active="active === 0" :large="true" />
          </div>

          <div class="mt-auto">
            <div
              class="mono-space text-[0.7rem] tracking-[0.18em] mb-2.5 transition-colors duration-[400ms]"
              :class="active === 0 ? 'text-primary' : 'text-text-muted'"
            >
              I. &nbsp;·&nbsp; Hero force
            </div>
            <h3
              class="font-display font-bold tracking-tight text-text-on-dark mb-3"
              style="font-size: clamp(1.75rem, 2.5vw, 2.5rem); line-height: 1.05; letter-spacing: -0.035em"
            >
              Adaptive intelligence.
            </h3>
            <p class="text-text-on-dark-sec text-[0.9375rem] leading-relaxed mb-5 max-w-[440px]" style="font-family: var(--font-sans)">
              Courses calibrated to your exact level. Whether you're a beginner or bringing years of context, the AI meets you where you are — and reshapes depth in real time.
            </p>

            <!-- Stat row -->
            <div
              class="flex items-baseline gap-8 pt-4 transition-[border-color] duration-[400ms]"
              :style="`border-top: 1px solid ${active === 0 ? 'rgba(232, 87, 26, 0.25)' : 'rgba(238, 240, 244, 0.08)'}`"
            >
              <div>
                <span class="block font-display text-[2rem] font-bold tracking-tight text-primary leading-none">10K+</span>
                <span class="mono-space text-[0.6rem] tracking-[0.14em] text-text-muted mt-1 block">Difficulty signals</span>
              </div>
              <div>
                <span class="block font-display text-[2rem] font-bold tracking-tight text-text-on-dark leading-none">97%</span>
                <span class="mono-space text-[0.6rem] tracking-[0.14em] text-text-muted mt-1 block">On-target depth</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Two small stacked cards -->
        <div
          v-for="(card, i) in smallCards"
          :key="i"
          class="relative rounded-2xl p-6 md:p-7 cursor-pointer overflow-hidden transition-all duration-[600ms]"
          :style="{
            background: active === i + 1
              ? 'linear-gradient(180deg, rgba(232, 87, 26, 0.12) 0%, rgba(31, 36, 43, 0.95) 60%)'
              : 'rgba(31, 36, 43, 0.5)',
            border: `1px solid ${active === i + 1 ? 'rgba(232, 87, 26, 0.45)' : 'rgba(238, 240, 244, 0.08)'}`,
            transform: active === i + 1 ? 'translateY(-4px)' : 'none',
            boxShadow: active === i + 1
              ? '0 24px 60px rgba(232, 87, 26, 0.15), inset 0 1px 0 rgba(255,255,255,0.06)'
              : 'inset 0 1px 0 rgba(255,255,255,0.03)',
            transitionTimingFunction: 'var(--hearth-ease)',
          }"
          @mouseenter="setActive(i + 1)"
        >
          <!-- Active dot -->
          <div
            class="absolute top-4 right-4 size-2 rounded-full transition-all duration-[400ms]"
            :style="{
              background: active === i + 1 ? 'var(--primary)' : 'transparent',
              border: active === i + 1 ? 'none' : '1px solid rgba(238, 240, 244, 0.15)',
              boxShadow: active === i + 1 ? '0 0 16px rgba(232, 87, 26, 0.8)' : 'none',
            }"
          />

          <!-- Layout: SVG left, text right on md+ -->
          <div class="flex flex-col md:flex-row md:items-start gap-4">
            <!-- SVG visual -->
            <div class="shrink-0">
              <FeatureVisual :kind="card.visual" :active="active === i + 1" />
            </div>

            <div class="flex-1 min-w-0">
              <div
                class="mono-space text-[0.65rem] tracking-[0.18em] mb-1.5 transition-colors duration-[400ms]"
                :class="active === i + 1 ? 'text-primary' : 'text-text-muted'"
              >
                {{ card.kicker }} &nbsp;·&nbsp; Force
              </div>
              <h3 class="font-display font-bold text-[1.375rem] leading-tight tracking-tight text-text-on-dark mb-2">
                {{ card.title }}
              </h3>
              <p class="text-text-on-dark-sec text-[0.875rem] leading-relaxed mb-3" style="font-family: var(--font-sans)">
                {{ card.desc }}
              </p>
              <div
                class="flex items-baseline gap-2.5 pt-3 transition-[border-color] duration-[400ms]"
                :style="`border-top: 1px solid ${active === i + 1 ? 'rgba(232, 87, 26, 0.25)' : 'rgba(238, 240, 244, 0.08)'}`"
              >
                <span
                  class="font-display text-[1.5rem] font-bold tracking-tight leading-none transition-colors duration-[400ms]"
                  :class="active === i + 1 ? 'text-primary' : 'text-text-on-dark'"
                >
                  {{ card.stat }}
                </span>
                <span class="mono-space text-[0.6rem] tracking-[0.14em] text-text-muted">
                  {{ card.statLabel }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
