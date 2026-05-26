<script lang="ts" setup>
import {ref, onMounted, onUnmounted} from "vue";
import Button from "@/components/ui/button/Button.vue";
import CourseCardShowcase from "./CourseCardShowcase.vue";

const phrases = [
  {lead: 'Learn anything,', accent: 'on your own terms.'},
  {lead: 'Personal courses', accent: 'built only for you.'},
  {lead: 'Master your craft —', accent: 'learn your way.'},
  {lead: 'From a sentence', accent: 'to a syllabus.'},
];

const topics = [
  'organic chemistry — at my pace',
  'medieval architecture, deeply',
  'systems design for staff eng',
  'quantum mechanics from scratch',
  'how typography really works',
];

const phraseIdx = ref(0);
const topicIdx = ref(0);
const mounted = ref(false);

let phraseTimer: ReturnType<typeof setInterval>;
let topicTimer: ReturnType<typeof setInterval>;

onMounted(() => {
  requestAnimationFrame(() => { mounted.value = true; });
  phraseTimer = setInterval(() => {
    phraseIdx.value = (phraseIdx.value + 1) % phrases.length;
  }, 4200);
  topicTimer = setInterval(() => {
    topicIdx.value = (topicIdx.value + 1) % topics.length;
  }, 2800);
});

onUnmounted(() => {
  clearInterval(phraseTimer);
  clearInterval(topicTimer);
});

function setPhrase(i: number) {
  phraseIdx.value = i;
}
</script>

<template>
  <section class="relative mt-[72px] min-h-[calc(100vh-72px)] overflow-hidden">
    <!-- Background split: left parchment, right dark -->
    <div aria-hidden="true" class="absolute inset-0 lg:grid lg:grid-cols-2 pointer-events-none">
      <div class="bg-bg" />
      <div class="hero-right-bg" />
    </div>

    <div class="relative max-w-[1400px] mx-auto px-6 md:px-10 grid lg:grid-cols-[1.1fr_1fr] min-h-[calc(100vh-72px)]">
      <!-- LEFT — content on parchment -->
      <div class="relative py-16 lg:py-20 flex flex-col justify-center">
        <!-- Dot grid overlay -->
        <div aria-hidden="true" class="absolute inset-0 dot-grid opacity-70 pointer-events-none" />

        <!-- Subtle accent gradient bleed from right panel -->
        <div
          aria-hidden="true"
          class="absolute top-0 right-0 w-1/2 h-full pointer-events-none hidden lg:block"
          style="background: linear-gradient(to left, rgba(232, 87, 26, 0.03) 0%, transparent 60%)"
        />

        <div class="relative max-w-[560px]" :class="mounted ? 'hero-stagger' : 'opacity-0'">
          <!-- Eyebrow badge -->
          <div class="hero-stagger-1 mb-6 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-accent-subtle border border-accent-border">
            <span class="relative flex size-2">
              <span class="absolute inline-flex size-full rounded-full bg-primary opacity-60 animate-ping" style="animation-duration: 2s" />
              <span class="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <span class="mono-space text-primary !text-[0.65rem]">14,206 courses generated & counting</span>
          </div>

          <!-- Rotating headline -->
          <h1
            class="hero-stagger-2 mb-7 h-[3em]"
            style="font-family: var(--font-display); font-size: clamp(2.75rem, 5.5vw, 5rem); font-weight: 700; line-height: 1.0; letter-spacing: -0.045em; color: var(--esp-900)"
          >
            <div :key="'lead-' + phraseIdx" style="animation: heroPhraseIn 700ms var(--hearth-ease) both">
              {{ phrases[phraseIdx]?.lead }}
            </div>
            <div
              :key="'accent-' + phraseIdx"
              class="italic text-primary"
              style="font-family: var(--font-sans); font-weight: 500; animation: heroPhraseIn 700ms var(--hearth-ease) 120ms both"
            >
              {{ phrases[phraseIdx]?.accent }}
            </div>
          </h1>

          <!-- Carousel dots -->
          <div class="hero-stagger-3 flex gap-2 mb-8">
            <button
              v-for="(_, i) in phrases"
              :key="i"
              :aria-label="'Phrase ' + (i + 1)"
              :class="i === phraseIdx ? 'w-7 bg-primary shadow-glow' : 'w-2 bg-border hover:bg-esp-300'"
              class="h-2 rounded-full border-0 p-0 cursor-pointer transition-all duration-[400ms]"
              style="transition-timing-function: var(--hearth-ease)"
              @click="setPhrase(i)"
            />
          </div>

          <!-- Body text -->
          <p class="hero-stagger-3 text-text-sec text-xl leading-relaxed mb-10 max-w-[520px]" style="font-family: var(--font-sans)">
            Tell LearnFlow what you want to master. An agentic pipeline drafts a structured course — modules, sequence,
            depth — calibrated to your exact level in under five seconds.
          </p>

          <!-- CTA buttons -->
          <div class="hero-stagger-4 flex flex-wrap gap-3 mb-12">
            <Button class="font-display font-semibold hero-cta-primary group" size="lg" variant="default">
              <span>Start learning free</span>
              <svg class="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" stroke-width="2">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Button>
            <Button class="font-display font-semibold" size="lg" variant="ghost">
              See how it works
            </Button>
          </div>

          <!-- Try-it bar -->
          <div class="hero-stagger-5 hero-try-bar bg-bg-card rounded-xl border border-border p-5">
            <div class="flex justify-between mono-space text-text-muted tracking-[0.16em] text-[0.65rem] mb-3">
              <span>I want to learn…</span>
              <span class="text-primary hidden sm:inline">⌘ + ↵ to generate</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="flex-1 h-[52px] px-4 bg-bg-alt border border-border rounded-lg flex items-center overflow-hidden transition-all duration-300 focus-within:border-primary/40 focus-within:shadow-[0_0_0_3px_rgba(232,87,26,0.08)]">
                <span
                  :key="topicIdx"
                  class="text-text-main"
                  style="font-family: var(--font-sans); font-size: 1.0625rem; animation: heroTopicIn 600ms var(--hearth-ease) both"
                >
                  {{ topics[topicIdx] }}
                </span>
                <span
                  class="inline-block w-0.5 h-5 bg-primary ml-1 shrink-0"
                  style="animation: heroCaret 1.05s steps(2) infinite"
                />
              </div>
              <Button class="font-display font-semibold shrink-0" size="md" variant="default">
                Generate
              </Button>
            </div>
          </div>

          <!-- Micro-stats -->
          <div class="hero-stagger-5 mt-9 flex gap-10 flex-wrap">
            <div
              v-for="stat in [
                {value: '14,206', label: 'courses generated'},
                {value: '4.2s', label: 'median build'},
                {value: '97%', label: 'completion'},
              ]"
              :key="stat.label"
              class="group"
            >
              <span class="block font-display text-base font-semibold text-text-main tracking-tight">{{
                stat.value
              }}</span>
              <span class="mono-space text-text-muted tracking-[0.14em]">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT — dark atmospheric stage -->
      <div class="relative hidden lg:flex items-center justify-center overflow-hidden py-20 pl-8">
        <!-- Layered ember glows -->
        <div
          aria-hidden="true"
          class="absolute inset-0 pointer-events-none"
          style="background: radial-gradient(ellipse 60% 50% at 30% 40%, rgba(232, 87, 26, 0.18) 0%, transparent 60%)"
        />
        <div
          aria-hidden="true"
          class="absolute inset-0 pointer-events-none"
          style="background: radial-gradient(ellipse 40% 30% at 70% 65%, rgba(232, 87, 26, 0.08) 0%, transparent 50%)"
        />

        <!-- Dot grid -->
        <div aria-hidden="true" class="absolute inset-0 dot-grid-dark pointer-events-none" />

        <!-- Noise texture overlay -->
        <div aria-hidden="true" class="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22256%22 height=%22256%22 filter=%22url(%23n)%22/%3E%3C/svg%3E'); background-size: 256px" />

        <!-- Ambient orbits -->
        <svg
          aria-hidden="true"
          class="absolute inset-0 pointer-events-none opacity-30"
          height="100%"
          preserveAspectRatio="none"
          viewBox="0 0 600 800"
          width="100%"
        >
          <defs>
            <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="rgba(232, 87, 26, 0.4)" />
              <stop offset="50%" stop-color="rgba(232, 87, 26, 0.15)" />
              <stop offset="100%" stop-color="rgba(232, 87, 26, 0.4)" />
            </linearGradient>
          </defs>
          <circle
            v-for="(r, i) in [120, 200, 280, 360]"
            :key="i"
            :r="r"
            :stroke-dasharray="`${4 + i * 2} ${10 + i * 4}`"
            cx="300"
            cy="400"
            fill="none"
            stroke="url(#orbitGrad)"
            :stroke-width="i === 0 ? '1.2' : '0.8'"
            :opacity="1 - i * 0.15"
          >
            <animateTransform
              :dur="`${40 + i * 20}s`"
              :from="`0 300 400`"
              :to="`${i % 2 === 0 ? 360 : -360} 300 400`"
              attributeName="transform"
              repeatCount="indefinite"
              type="rotate"
            />
          </circle>
        </svg>

        <!-- Floating chips — staggered entrance -->
        <div
          v-for="(chip, i) in [
            {text: '◐ Calibrating depth · 87%', pos: 'top-[12%] left-[8%]', ember: true, dur: '6s', delay: '0s'},
            {text: '▪ 6 modules drafted', pos: 'top-[18%] right-[10%]', ember: false, dur: '7s', delay: '1.2s'},
            {text: '✓ Tuned to YOU · expert', pos: 'bottom-[14%] left-[6%]', ember: false, dur: '5.4s', delay: '0.6s'},
            {text: '↪ Branching curriculum', pos: 'bottom-[10%] right-[8%]', ember: true, dur: '6.4s', delay: '0.4s'},
          ]"
          :key="i"
          :class="['absolute', chip.pos, mounted ? 'hero-chip-in' : 'opacity-0']"
          :style="{
            background: chip.ember ? 'rgba(232, 87, 26, 0.08)' : 'rgba(31, 36, 43, 0.7)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: chip.ember ? '1px solid rgba(232, 87, 26, 0.3)' : '1px solid rgba(238, 240, 244, 0.1)',
            color: chip.ember ? 'var(--primary)' : 'var(--text-on-dark-sec)',
            animation: `heroFloat ${chip.dur} ease-in-out ${chip.delay} infinite`,
            animationDelay: mounted ? `${0.6 + i * 0.15}s` : '0s',
          }"
          class="px-3.5 py-2 rounded-full mono-space text-[0.65rem] tracking-[0.16em] shadow-[0_2px_12px_rgba(0,0,0,0.2)]"
        >
          {{ chip.text }}
        </div>

        <!-- Particle dots -->
        <div
          v-for="p in 6"
          :key="'particle-' + p"
          aria-hidden="true"
          class="absolute rounded-full pointer-events-none"
          :style="{
            width: `${2 + (p % 3)}px`,
            height: `${2 + (p % 3)}px`,
            background: p % 2 === 0 ? 'rgba(232, 87, 26, 0.5)' : 'rgba(238, 240, 244, 0.15)',
            top: `${15 + p * 12}%`,
            left: `${10 + ((p * 17) % 80)}%`,
            animation: `heroParticle ${4 + p * 0.8}s ease-in-out ${p * 0.5}s infinite`,
          }"
        />

        <!-- Course card with glow backdrop -->
        <div class="relative z-[1]" :class="mounted ? 'hero-card-entrance' : 'opacity-0'">
          <div
            aria-hidden="true"
            class="absolute -inset-8 pointer-events-none rounded-3xl"
            style="background: radial-gradient(ellipse at center, rgba(232, 87, 26, 0.12) 0%, transparent 70%); filter: blur(20px)"
          />
          <CourseCardShowcase />
        </div>
      </div>
    </div>

    <!-- Mobile course card preview -->
    <div class="lg:hidden px-6 pb-12 -mt-4">
      <CourseCardShowcase />
    </div>

    <!-- Bottom edge gradient fade -->
    <div aria-hidden="true" class="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style="background: linear-gradient(to top, var(--bg), transparent)" />
  </section>
</template>

<style scoped>
.hero-right-bg {
  background: linear-gradient(135deg, var(--esp-900) 0%, var(--esp-800) 60%, #0e1116 100%);
}

/* Staggered entrance for left content */
.hero-stagger > * {
  opacity: 0;
  transform: translateY(20px);
}

.hero-stagger.hero-stagger > * {
  animation: heroContentReveal 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

.hero-stagger-1 { animation-delay: 0.1s !important; }
.hero-stagger-2 { animation-delay: 0.2s !important; }
.hero-stagger-3 { animation-delay: 0.35s !important; }
.hero-stagger-4 { animation-delay: 0.5s !important; }
.hero-stagger-5 { animation-delay: 0.65s !important; }

/* Try-it bar hover lift */
.hero-try-bar {
  box-shadow: var(--shadow-md);
  transition: box-shadow 0.4s var(--hearth-ease), transform 0.4s var(--hearth-ease);
}

.hero-try-bar:hover {
  box-shadow: var(--shadow-bar-focus);
  transform: translateY(-2px);
}

/* Primary CTA shimmer */
.hero-cta-primary {
  position: relative;
  overflow: hidden;
}

.hero-cta-primary::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
  animation: heroShimmer 3s ease-in-out 1.5s infinite;
}

/* Card entrance */
.hero-card-entrance {
  animation: heroCardIn 1s cubic-bezier(0.25, 1, 0.5, 1) 0.4s both;
}

/* Chip entrance */
.hero-chip-in {
  animation: heroChipReveal 0.6s cubic-bezier(0.25, 1, 0.5, 1) both;
}

@keyframes heroContentReveal {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes heroCardIn {
  from {
    opacity: 0;
    transform: translateY(32px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes heroChipReveal {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes heroShimmer {
  0% { left: -100%; }
  40% { left: 100%; }
  100% { left: 100%; }
}

@keyframes heroParticle {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-16px) scale(1.3);
    opacity: 1;
  }
}
</style>
