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

let phraseTimer: ReturnType<typeof setInterval>;
let topicTimer: ReturnType<typeof setInterval>;

onMounted(() => {
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
      <div style="background: linear-gradient(135deg, var(--esp-900) 0%, var(--esp-800) 60%, #0e1116 100%)" />
    </div>

    <div class="relative max-w-[1400px] mx-auto px-6 md:px-10 grid lg:grid-cols-[1.1fr_1fr] min-h-[calc(100vh-72px)]">
      <!-- LEFT — content on parchment -->
      <div class="relative py-16 lg:py-20 flex flex-col justify-center">
        <!-- Dot grid overlay -->
        <div aria-hidden="true" class="absolute inset-0 dot-grid opacity-70 pointer-events-none" />
        <div class="relative max-w-[560px]">
          <!-- Rotating headline -->
          <h1
            class="mb-7 h-[3em]"
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
          <div class="flex gap-2 mb-8">
            <button
              v-for="(_, i) in phrases"
              :key="i"
              :aria-label="'Phrase ' + (i + 1)"
              :class="i === phraseIdx ? 'w-7 bg-primary' : 'w-2 bg-border'"
              class="h-2 rounded-full border-0 p-0 cursor-pointer transition-all duration-[400ms]"
              style="transition-timing-function: var(--hearth-ease)"
              @click="setPhrase(i)"
            />
          </div>

          <!-- Body text -->
          <p class="text-text-sec text-xl leading-relaxed mb-10 max-w-[520px]" style="font-family: var(--font-sans)">
            Tell LearnFlow what you want to master. An agentic pipeline drafts a structured course — modules, sequence,
            depth — calibrated to your exact level in under five seconds.
          </p>

          <!-- CTA buttons -->
          <div class="flex flex-wrap gap-3 mb-12">
            <Button class="font-display font-semibold" size="lg" variant="default">
              Start learning free →
            </Button>
            <Button class="font-display font-semibold" size="lg" variant="ghost">
              See how it works
            </Button>
          </div>

          <!-- Try-it bar -->
          <div class="bg-bg-card rounded-xl border border-border p-5 shadow-md">
            <div class="flex justify-between mono-space text-text-muted tracking-[0.16em] text-[0.65rem] mb-3">
              <span>I want to learn…</span>
              <span class="text-primary hidden sm:inline">⌘ + ↵ to generate</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="flex-1 h-[52px] px-4 bg-bg-alt border border-border rounded-lg flex items-center overflow-hidden">
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
          <div class="mt-9 flex gap-10 flex-wrap">
            <div
              v-for="stat in [
                {value: '14,206', label: 'courses generated'},
                {value: '4.2s', label: 'median build'},
                {value: '97%', label: 'completion'},
              ]"
              :key="stat.label"
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
        <!-- Ember glow -->
        <div
          aria-hidden="true"
          class="absolute inset-0 pointer-events-none"
          style="background: radial-gradient(ellipse 60% 50% at 30% 40%, rgba(232, 87, 26, 0.18) 0%, transparent 60%)"
        />
        <!-- Dot grid -->
        <div aria-hidden="true" class="absolute inset-0 dot-grid-dark pointer-events-none" />

        <!-- Ambient orbits -->
        <svg
          aria-hidden="true"
          class="absolute inset-0 pointer-events-none opacity-40"
          height="100%"
          preserveAspectRatio="none"
          viewBox="0 0 600 800"
          width="100%"
        >
          <circle
            v-for="(r, i) in [120, 200, 280]"
            :key="i"
            :r="r"
            :stroke-dasharray="`${4 + i * 2} ${10 + i * 4}`"
            cx="300"
            cy="400"
            fill="none"
            stroke="rgba(232, 87, 26, 0.25)"
            stroke-width="1"
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

        <!-- Floating chips -->
        <div
          v-for="(chip, i) in [
            {text: '◐ Calibrating depth · 87%', pos: 'top-[12%] left-[8%]', ember: true, dur: '6s', delay: '0s'},
            {text: '▪ 6 modules drafted', pos: 'top-[18%] right-[10%]', ember: false, dur: '7s', delay: '1.2s'},
            {text: '✓ Tuned to YOU · expert', pos: 'bottom-[14%] left-[6%]', ember: false, dur: '5.4s', delay: '0.6s'},
            {text: '↪ Branching curriculum', pos: 'bottom-[10%] right-[8%]', ember: true, dur: '6.4s', delay: '0.4s'},
          ]"
          :key="i"
          :class="['absolute', chip.pos]"
          :style="{
            background: 'rgba(31, 36, 43, 0.7)',
            backdropFilter: 'blur(10px)',
            border: chip.ember ? '1px solid rgba(232, 87, 26, 0.3)' : '1px solid rgba(238, 240, 244, 0.15)',
            color: chip.ember ? 'var(--primary)' : 'var(--text-on-dark-sec)',
            animation: `heroFloat ${chip.dur} ease-in-out ${chip.delay} infinite`,
          }"
          class="px-3.5 py-2 rounded-full mono-space text-[0.65rem] tracking-[0.16em]"
        >
          {{ chip.text }}
        </div>

        <!-- Course card -->
        <div class="relative z-[1]">
          <CourseCardShowcase />
        </div>
      </div>
    </div>

    <!-- Mobile course card preview -->
    <div class="lg:hidden px-6 pb-12 -mt-4">
      <CourseCardShowcase />
    </div>
  </section>
</template>
