<script lang="ts" setup>
const modules = [
  {num: 1, title: 'Foundations: What makes a system?', time: '12m', complete: true},
  {num: 2, title: 'Color theory & accessible palettes', time: '18m', complete: true},
  {num: 3, title: 'Typography scales & hierarchies', time: '22m', complete: false, active: true},
  {num: 4, title: 'Spacing tokens & layout grids', time: '16m', complete: false},
];
</script>

<template>
  <div
    class="bg-esp-800 border border-esp-700 rounded-2xl max-w-[520px] w-full"
    style="box-shadow: 0 24px 64px rgba(26, 19, 16, 0.4)"
  >
    <!-- Header -->
    <div class="flex items-start gap-4 p-6 border-b border-esp-700">
      <div class="size-12 rounded-xl bg-esp-700 border border-esp-600 flex items-center justify-center shrink-0">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Grid of design system blocks -->
          <rect x="2" y="2" width="8" height="8" rx="1.5" stroke="#e8571a" stroke-width="1.4" fill="#e8571a" fill-opacity="0.15" />
          <rect x="14" y="2" width="8" height="8" rx="1.5" stroke="#9aa1b1" stroke-width="1.2" fill="none" />
          <rect x="2" y="14" width="8" height="8" rx="1.5" stroke="#9aa1b1" stroke-width="1.2" fill="none" />
          <rect x="14" y="14" width="8" height="8" rx="1.5" stroke="#e8571a" stroke-width="1.4" fill="#e8571a" fill-opacity="0.15" />
          <!-- Connecting dots -->
          <circle cx="12" cy="6" r="1" fill="#6b7385" />
          <circle cx="12" cy="18" r="1" fill="#6b7385" />
          <circle cx="6" cy="12" r="1" fill="#6b7385" />
          <circle cx="18" cy="12" r="1" fill="#6b7385" />
        </svg>
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="font-display text-lg font-bold text-text-on-dark mb-1">
          Design Systems from Scratch
        </h3>
        <span class="mono-space text-text-on-dark-sec">
          12 modules · Intermediate · 3h 20m
        </span>
      </div>
      <span class="px-3 py-1.5 rounded-full bg-primary/15 border border-primary/30 font-display text-[0.7rem] font-semibold text-primary uppercase tracking-wide shrink-0">
        AI Built
      </span>
    </div>

    <!-- Modules -->
    <div>
      <div
        v-for="mod in modules"
        :key="mod.num"
        class="flex items-center gap-4 px-6 py-[18px] border-b border-esp-700"
        :class="!mod.complete && !mod.active ? 'opacity-40' : ''"
      >
        <div
          class="size-8 rounded-lg flex items-center justify-center font-display text-sm font-bold shrink-0"
          :class="
            mod.complete
              ? 'bg-primary text-white'
              : mod.active
                ? 'bg-esp-700 border-2 border-primary text-primary'
                : 'border-2 border-esp-700 text-text-on-dark-sec'
          "
        >
          {{ mod.complete ? '✓' : mod.num }}
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-display text-[0.9rem] font-semibold text-text-on-dark mb-0.5">
            {{ mod.title }}
          </p>
          <span class="mono-space text-text-on-dark-sec text-[0.65rem]">
            {{ mod.time }}
          </span>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between px-6 py-4 bg-esp-900 border-t border-esp-700">
      <span class="mono-space text-text-on-dark-sec">8 more modules</span>
      <span class="font-mono text-[0.7rem] text-text-muted">Generated in 2.8s</span>
    </div>
  </div>
</template>
