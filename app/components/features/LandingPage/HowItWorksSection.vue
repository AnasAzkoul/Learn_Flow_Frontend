<script lang="ts" setup>
import {ref} from "vue";
import {useIntersectionObserver} from "@vueuse/core";
import Button from "../../ui/button/Button.vue";

const steps = [
  {
    num: "01",
    title: "Prompt",
    desc: 'Describe what you want to learn. Anything from "React for backend devs" to "the history of pasta."',
  },
  {
    num: "02",
    title: "Triage",
    desc: "AI classifies scope — single course, a multi-course roadmap, or a polite rejection for topics it can't responsibly teach.",
  },
  {
    num: "03",
    title: "Outline",
    desc: "A structured outline with modules, lessons, and objectives. You review it before a single word is written.",
  },
  {
    num: "04",
    title: "Approve",
    desc: "Keep what you want, cut what you don't, reshape the rest. Nothing ships without your nod.",
  },
  {
    num: "05",
    title: "Generate",
    desc: "Parallel subagents write every lesson at once — code samples, exercises, quizzes — in minutes, not weeks.",
  },
];

const barHeights = ["h-3/5", "h-4/5", "h-2/5", "h-full", "h-3/4", "h-1/2", "h-4/5", "h-2/5"];

const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);

useIntersectionObserver(
    sectionRef,
    ([entry]) => {
      if (entry?.isIntersecting) isVisible.value = true;
    },
    {threshold: 0.1},
);
</script>

<template>
  <section id="how-it-works" ref="sectionRef" class="pb-20">
    <!-- Divider -->
    <div class="h-px bg-border-light" />

    <!-- Section header -->
    <div
      :class="[
        'flex flex-col md:flex-row justify-between items-start md:items-end gap-8 py-14',
        isVisible ? 'reveal' : 'opacity-0',
      ]"
    >
      <h2 class="display-text text-4xl md:text-5xl leading-tight text-text-main">
        From prompt to<br>personal course.
      </h2>
      <p class="text-text-sec text-sm md:text-base max-w-xs leading-relaxed md:text-right">
        A five-stage agentic pipeline. You stay in the loop — the AI does the architecture.
      </p>
    </div>

    <!-- Pipeline panel -->
    <div
      :class="[
        'bg-esp-900 rounded-2xl overflow-hidden',
        isVisible ? 'reveal reveal-delay-1' : 'opacity-0',
      ]"
    >
      <!-- Scrollable on mobile -->
      <div class="overflow-x-auto">
        <div class="grid grid-cols-5 divide-x divide-white/10 min-w-[720px]">
          <div v-for="step in steps" :key="step.num" class="flex flex-col p-6 lg:p-8 gap-4">
            <!-- Step label -->
            <span class="font-mono text-[0.6rem] font-medium tracking-widest text-primary uppercase">
              STEP_{{ step.num }}
            </span>

            <!-- Title + description -->
            <div class="space-y-2">
              <h3 class="font-display font-bold text-base lg:text-lg tracking-tight text-text-on-dark">
                {{ step.title }}
              </h3>
              <p class="text-text-on-dark-sec text-xs leading-relaxed">
                {{ step.desc }}
              </p>
            </div>

            <!-- Mockup pinned to bottom -->
            <div class="mt-auto">
              <!-- Step 01: Prompt input -->
              <div
                v-if="step.num === '01'"
                class="bg-esp-700 rounded-lg px-3 py-2 font-mono text-[10px] text-text-on-dark-mut"
              >
                <span class="text-primary">›</span>
                react for backend devs<span class="text-primary animate-pulse">|</span>
              </div>

              <!-- Step 02: Triage classification -->
              <div v-else-if="step.num === '02'" class="space-y-1.5">
                <div
                  v-for="item in [
                    { l: 'SINGLE', v: '83%', accent: true },
                    { l: 'MULTI', v: '15%', accent: false },
                    { l: 'REJECT', v: '2%', accent: false },
                  ]"
                  :key="item.l"
                  class="flex items-center justify-between"
                >
                  <div class="flex items-center gap-1.5">
                    <div
                      :class="item.accent ? 'bg-primary' : 'bg-esp-500'"
                      class="w-1.5 h-1.5 rounded-full"
                    />
                    <span class="font-mono text-[9px] text-text-on-dark-sec">{{ item.l }}</span>
                  </div>
                  <span class="font-mono text-[9px] text-text-on-dark-mut">{{ item.v }}</span>
                </div>
              </div>

              <!-- Step 03: Outline tree -->
              <div v-else-if="step.num === '03'" class="font-mono text-[9px] space-y-0.5 leading-relaxed">
                <div class="text-primary">
                  ├── MOD_01 Foundations
                </div>
                <div class="pl-3 text-text-on-dark-sec">
                  ├── 01 Components
                </div>
                <div class="pl-3 text-text-on-dark-sec">
                  └── 02 Hooks
                </div>
                <div class="text-primary">
                  ├── MOD_02 State
                </div>
                <div class="pl-3 text-text-on-dark-mut">
                  └── ···
                </div>
              </div>

              <!-- Step 04: Approve actions -->
              <div v-else-if="step.num === '04'" class="grid grid-cols-2 gap-1">
                <div class="text-center text-[9px] font-display bg-esp-700 rounded py-1 text-text-on-dark">
                  ✓ Keep
                </div>
                <div class="text-center text-[9px] font-display border border-white/10 rounded py-1 text-text-on-dark-mut line-through">
                  Redux
                </div>
                <div class="text-center text-[9px] font-display bg-esp-700 rounded py-1 text-text-on-dark">
                  ✓ Keep
                </div>
                <div class="text-center text-[9px] font-display border border-accent-border rounded py-1 text-primary">
                  + Add SSR
                </div>
              </div>

              <!-- Step 05: Generate — animated parallel bars -->
              <div v-else-if="step.num === '05'">
                <div class="flex items-end gap-0.5 h-8">
                  <template v-if="isVisible">
                    <div
                      v-for="(height, i) in barHeights"
                      :key="i"
                      :class="['flex-1 bg-primary/70 rounded-sm origin-bottom bar-rise', height]"
                      :style="`animation-delay: ${0.4 + i * 0.07}s`"
                    />
                  </template>
                </div>
                <div class="flex items-center justify-between mt-1.5">
                  <span class="font-mono text-[9px] text-text-on-dark-mut">8 AGENTS</span>
                  <span class="font-mono text-[9px] text-text-on-dark-mut">PARALLEL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div
      :class="[
        'mt-12 flex flex-col items-center gap-3',
        isVisible ? 'reveal reveal-delay-2' : 'opacity-0',
      ]"
    >
      <p class="text-sm text-text-muted font-display">
        Ready to see it in action?
      </p>

      <Button
        class="rounded-lg font-display font-semibold"
        size="lg"
        to="/new-course"
        variant="default"
      >
        Start your first course →
      </Button>
    </div>
  </section>
</template>
