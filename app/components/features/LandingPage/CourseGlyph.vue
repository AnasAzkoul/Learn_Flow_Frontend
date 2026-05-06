<script lang="ts" setup>
const props = defineProps<{
  kind: 'grid' | 'chart' | 'lock';
  hue: string;
  active: boolean;
}>();

// Grid rows/cols
const gridCells = computed(() => {
  const cells: { r: number; c: number; lit: boolean }[] = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 5; c++) {
      cells.push({ r, c, lit: props.active && (r + c) % 2 === 0 });
    }
  }
  return cells;
});

// Token swatches
const swatches = ['#e8571a', '#c6890e', '#5a8a5e', '#475063', '#9aa1b1'];

// Chart bars
const barHeights = [60, 90, 45, 75, 110, 55, 95];

// Chart line markers
const markers = [[38,80],[58,55],[78,90],[98,60],[118,30],[138,75],[158,40]];

// OAuth nodes
const authNodes = [
  { x: 30, y: 80, label: 'CLIENT' },
  { x: 100, y: 30, label: 'AUTH' },
  { x: 170, y: 80, label: 'API' },
];

// OAuth flow arrows
const flowArrows = [
  { from: [52, 80], to: [78, 30], label: '1 · auth', curve: false },
  { from: [122, 30], to: [148, 80], label: '2 · token', curve: false },
  { from: [148, 92], to: [52, 92], label: '3 · access', curve: true },
];
</script>

<template>
  <!-- GRID: Design systems — modular grid composing itself -->
  <svg
    v-if="kind === 'grid'"
    width="200" height="160" viewBox="0 0 200 160"
    style="overflow: visible"
  >
    <!-- Grid cells -->
    <rect
      v-for="cell in gridCells"
      :key="`${cell.r}-${cell.c}`"
      :x="20 + cell.c * 32"
      :y="20 + cell.r * 28"
      width="28" height="24"
      rx="3"
      :fill="cell.lit ? hue : 'none'"
      :stroke="cell.lit ? hue : 'rgba(238, 240, 244, 0.18)'"
      stroke-width="1"
      :opacity="cell.lit ? 0.9 : 1"
      :style="`transition: all 500ms var(--hearth-ease) ${(cell.r * 5 + cell.c) * 40}ms`"
    />

    <!-- Token swatches -->
    <g transform="translate(20, 130)">
      <circle
        v-for="(sw, i) in swatches"
        :key="i"
        :cx="i * 14" cy="0" r="5"
        :fill="sw"
        :opacity="active ? 1 : 0.7"
        style="transition: opacity 400ms"
      />
    </g>
  </svg>

  <!-- CHART: Data viz — bar chart + line overlay -->
  <svg
    v-else-if="kind === 'chart'"
    width="200" height="160" viewBox="0 0 200 160"
    style="overflow: visible"
  >
    <!-- Axes -->
    <line x1="20" y1="20" x2="20" y2="130" stroke="rgba(238, 240, 244, 0.25)" stroke-width="1" />
    <line x1="20" y1="130" x2="180" y2="130" stroke="rgba(238, 240, 244, 0.25)" stroke-width="1" />

    <!-- Bars -->
    <rect
      v-for="(bh, i) in barHeights"
      :key="'bar-' + i"
      :x="32 + i * 20"
      :y="130 - bh"
      width="12"
      :height="bh"
      :fill="active && i === 4 ? hue : 'rgba(238, 240, 244, 0.2)'"
      :style="`transition: all 600ms var(--hearth-ease) ${i * 60}ms; transform-origin: ${38 + i * 20}px 130px`"
    />

    <!-- Line overlay -->
    <polyline
      points="38,80 58,55 78,90 98,60 118,30 138,75 158,40"
      fill="none"
      :stroke="hue"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray="200"
      :stroke-dashoffset="active ? 0 : 200"
      style="transition: stroke-dashoffset 1.4s var(--hearth-ease)"
    />

    <!-- Markers -->
    <circle
      v-for="(m, i) in markers"
      :key="'marker-' + i"
      :cx="m[0]" :cy="m[1]"
      :r="i === 4 ? 4 : 2.5"
      :fill="i === 4 ? hue : 'white'"
      :stroke="hue"
      stroke-width="1.5"
      :opacity="active ? 1 : 0.6"
      :style="`transition: opacity 500ms ${i * 80}ms`"
    />
  </svg>

  <!-- LOCK: OAuth flow diagram -->
  <svg
    v-else
    width="200" height="160" viewBox="0 0 200 160"
    style="overflow: visible"
  >
    <!-- Actor nodes -->
    <g v-for="(n, i) in authNodes" :key="'node-' + i">
      <rect
        :x="n.x - 22" :y="n.y - 14"
        width="44" height="28" rx="4"
        :fill="i === 1 && active ? hue : 'none'"
        :stroke="i === 1 ? hue : 'rgba(238, 240, 244, 0.3)'"
        stroke-width="1.2"
        style="transition: all 500ms"
      />
      <text
        :x="n.x" :y="n.y + 3"
        font-size="8"
        font-family="JetBrains Mono, monospace"
        :fill="i === 1 && active ? 'white' : 'rgba(238, 240, 244, 0.7)'"
        text-anchor="middle"
        letter-spacing="1.5"
        style="transition: fill 500ms"
      >{{ n.label }}</text>
    </g>

    <!-- Flow arrows -->
    <g v-for="(a, i) in flowArrows" :key="'arrow-' + i">
      <path
        :d="a.curve
          ? `M ${a.from[0]} ${a.from[1]} Q 100 130 ${a.to[0]} ${a.to[1]}`
          : `M ${a.from[0]} ${a.from[1]} L ${a.to[0]} ${a.to[1]}`"
        fill="none"
        :stroke="active ? hue : 'rgba(238, 240, 244, 0.3)'"
        stroke-width="1.4"
        :stroke-dasharray="active ? 'none' : '3 3'"
        :style="`transition: all 500ms ${i * 200}ms`"
      />
      <text
        :x="a.curve ? 100 : (a.from[0] + a.to[0]) / 2"
        :y="a.curve ? 122 : (a.from[1] + a.to[1]) / 2 - 3"
        font-size="7"
        font-family="JetBrains Mono, monospace"
        :fill="active ? hue : 'rgba(238, 240, 244, 0.5)'"
        text-anchor="middle"
        letter-spacing="1"
        style="transition: fill 500ms"
      >{{ a.label }}</text>
    </g>

    <!-- Lock icon -->
    <g transform="translate(100, 132)">
      <rect
        x="-8" y="-4" width="16" height="12" rx="2"
        :fill="active ? hue : 'rgba(238, 240, 244, 0.4)'"
        style="transition: fill 400ms"
      />
      <path
        d="M -5 -4 L -5 -8 Q -5 -13 0 -13 Q 5 -13 5 -8 L 5 -4"
        fill="none"
        :stroke="active ? hue : 'rgba(238, 240, 244, 0.4)'"
        stroke-width="1.5"
        style="transition: stroke 400ms"
      />
    </g>
  </svg>
</template>
