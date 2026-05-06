<script lang="ts" setup>
const steps = [
  {num: '01', label: 'Prompt', desc: 'You describe what you want to learn — broad survey or surgical deep-dive.', detail: '"Master OAuth 2.0 implementation"'},
  {num: '02', label: 'Analyze', desc: 'The AI reads between the lines: your level, your goals, your context.', detail: 'Backend dev · Intermediate'},
  {num: '03', label: 'Structure', desc: 'A curriculum forms. Modules, sequence, depth — all calibrated to you.', detail: '6 modules · 1h 45m'},
  {num: '04', label: 'Review', desc: 'You approve, refine, or reshape. The architecture is yours to direct.', detail: 'Edit · Reorder · Approve'},
  {num: '05', label: 'Learn', desc: 'Start the course. Progress at your pace, track your understanding.', detail: 'Begin →', highlight: true},
];
</script>

<template>
  <section id="how-it-works" class="relative py-24 px-6 md:px-10 bg-esp-900 overflow-hidden">
    <!-- Ambient ember glow -->
    <div
      aria-hidden="true"
      class="absolute pointer-events-none"
      style="top: 50%; right: -10%; width: 50%; height: 60%; background: radial-gradient(circle, rgba(232, 87, 26, 0.12) 0%, transparent 60%)"
    />

    <div class="relative max-w-[1280px] mx-auto">
      <!-- Header -->
      <div class="grid md:grid-cols-2 gap-10 md:gap-[60px] items-end mb-14 md:mb-[60px]">
        <div>
          <div class="flex items-center gap-3 mono-space text-primary tracking-[0.12em] mb-5">
            <span
              class="inline-block size-2 rounded-full bg-primary"
              style="box-shadow: 0 0 12px rgba(232, 87, 26, 0.6)"
            />
            The Pipeline
          </div>
          <h2
            class="text-text-on-dark"
            style="font-family: var(--font-display); font-size: clamp(2.25rem, 4.5vw, 3.5rem); font-weight: 700; line-height: 1.0; letter-spacing: -0.035em"
          >
            From a sentence<br />
            to a syllabus.
          </h2>
        </div>
        <div>
          <p class="text-text-on-dark-sec text-lg leading-relaxed max-w-[440px]" style="font-family: var(--font-sans)">
            Five agentic stages, working in seconds. The AI does the architecture; you stay the protagonist.
          </p>
        </div>
      </div>

      <!-- Steps — horizontal track -->
      <div class="relative">
        <!-- Connecting line -->
        <div
          aria-hidden="true"
          class="absolute hidden md:block"
          style="top: 38px; left: 5%; right: 5%; height: 1px; background: linear-gradient(to right, transparent 0%, var(--esp-700) 8%, var(--esp-700) 92%, transparent 100%)"
        />
        <!-- Active glow overlay -->
        <div
          aria-hidden="true"
          class="absolute hidden md:block opacity-40"
          style="top: 38px; left: 5%; width: 90%; height: 1px; background: linear-gradient(to right, var(--primary) 0%, var(--primary) 80%, transparent 100%)"
        />

        <!-- Scrollable on mobile -->
        <div class="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
          <div class="grid grid-cols-5 gap-6 relative z-[1] min-w-[720px]">
            <div v-for="step in steps" :key="step.num" class="flex flex-col items-start">
              <!-- Circle marker -->
              <div
                class="size-[76px] rounded-full flex items-center justify-center mb-6 shrink-0"
                :class="step.highlight ? 'bg-primary' : 'bg-esp-800 border border-esp-700'"
                :style="step.highlight
                  ? 'box-shadow: 0 0 32px rgba(232, 87, 26, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                  : 'box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04)'
                "
              >
                <span
                  class="font-mono text-sm font-semibold tracking-wide"
                  :class="step.highlight ? 'text-white' : 'text-text-on-dark-sec'"
                >
                  {{ step.num }}
                </span>
              </div>

              <!-- Label -->
              <h3 class="font-display font-bold text-2xl tracking-tight text-text-on-dark mb-3">
                {{ step.label }}
              </h3>

              <!-- Description -->
              <p class="text-text-on-dark-sec text-[0.9375rem] leading-relaxed mb-5" style="font-family: var(--font-sans)">
                {{ step.desc }}
              </p>

              <!-- Detail chip -->
              <div
                class="mono-space w-full pt-3"
                :class="step.highlight ? 'text-primary' : 'text-text-muted'"
                :style="`border-top: 1px solid ${step.highlight ? 'rgba(232, 87, 26, 0.25)' : 'var(--esp-700)'}`"
              >
                {{ step.detail }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
