<script lang="ts" setup>
const props = defineProps<{
  kind: 'wave' | 'pulse' | 'paths';
  active: boolean;
  large?: boolean;
}>();

// Reactive colors
const stroke = computed(() => props.active ? '#e8571a' : '#6b7385');
const dim = computed(() => props.active ? '#9aa1b1' : '#2e353f');
const ink = '#eef0f4';

// Dimensions — large wave cropped tighter (content spans ~y10 to y155)
const w = computed(() => props.large ? 520 : 220);
const h = computed(() => props.large ? 160 : 130);

// Node positions for wave visual
const nodes = computed(() =>
  props.large
    ? [[0, 60], [40, 20], [40, 100], [80, 60], [120, 20], [120, 100], [160, 60]]
    : [[0, 28], [18, 8], [18, 48], [36, 28], [54, 8], [54, 48], [72, 28]]
);

// Connection pairs
const connections = [
  [0, 1], [0, 2], [0, 3], [1, 4], [2, 4], [2, 5], [3, 5], [4, 6], [5, 6],
  [1, 2], [3, 4], [4, 5],
];

// Lit node indices
const litNodes = [0, 3, 6];

// Skill bar dimensions
const trackWidth = computed(() => props.large ? 200 : 80);
const filledWidth = computed(() =>
  props.large ? (props.active ? 138 : 60) : (props.active ? 56 : 26)
);
const cursorPos = computed(() =>
  (props.large ? 200 : 80) * (props.active ? 0.69 : 0.32)
);
const cursorR = computed(() => props.large ? 9 : 4.5);
const pulseR = computed(() => props.large ? 22 : 11);

// Tick positions
const ticks = [0, 0.25, 0.5, 0.75, 1];

// Stat readouts
const stats = [
  { label: 'PRIOR', val: '12y' },
  { label: 'TEMPO', val: 'fast' },
  { label: 'GOAL', val: 'depth' },
];

// Pulse module rows
const moduleRows = [0, 1, 2, 3, 4];

// Paths branches
const branches = [
  { y: 28, label: 'BROAD', sub: 'survey', primary: false },
  { y: 60, label: 'BALANCED', sub: 'curated', primary: true },
  { y: 92, label: 'DEEP', sub: 'specialist', primary: false },
];

// Sub-route positions for primary branch
const subRoutes = [0, 1, 2, 3];
</script>

<template>
  <!-- WAVE: Neural node cluster + skill calibration meter -->
  <svg
    v-if="kind === 'wave'"
    :width="w" :height="h"
    :viewBox="large ? '0 15 520 160' : '0 0 220 130'"
    style="overflow: visible"
  >
    <!-- Neural node cluster -->
    <g :transform="large ? 'translate(40, 30)' : 'translate(10, 12)'">
      <!-- Connection web -->
      <line
        v-for="(conn, idx) in connections"
        :key="'conn-' + idx"
        :x1="nodes[conn[0]][0]"
        :y1="nodes[conn[0]][1]"
        :x2="nodes[conn[1]][0]"
        :y2="nodes[conn[1]][1]"
        :stroke="active && idx < 4 ? stroke : dim"
        :stroke-width="active && idx < 4 ? 1.4 : 0.8"
        :opacity="active && idx < 4 ? 0.9 : 0.4"
        style="transition: all 500ms ease"
      />
      <!-- Nodes -->
      <g v-for="(node, i) in nodes" :key="'node-' + i">
        <circle
          v-if="active && litNodes.includes(i)"
          :cx="node[0]" :cy="node[1]"
          :r="large ? 10 : 5"
          :fill="stroke"
          opacity="0.2"
        />
        <circle
          :cx="node[0]" :cy="node[1]"
          :r="large ? 5 : 2.5"
          :fill="litNodes.includes(i) && active ? stroke : 'none'"
          :stroke="litNodes.includes(i) && active ? stroke : dim"
          stroke-width="1.4"
          style="transition: all 400ms"
        />
      </g>
    </g>

    <!-- Arrow connecting cluster → calibration -->
    <g :transform="large ? 'translate(220, 110)' : 'translate(95, 60)'">
      <line
        x1="0" y1="0"
        :x2="large ? 50 : 22" y2="0"
        :stroke="stroke"
        stroke-width="1.2"
        stroke-dasharray="3 3"
        style="transition: stroke 400ms"
      />
      <path
        :d="large ? 'M 50 0 L 44 -4 L 44 4 Z' : 'M 22 0 L 18 -3 L 18 3 Z'"
        :fill="stroke"
        style="transition: fill 400ms"
      />
    </g>

    <!-- Skill calibration meter -->
    <g :transform="large ? 'translate(290, 30)' : 'translate(125, 12)'">
      <!-- Header label (large only) -->
      <text
        v-if="large"
        x="0" y="-8"
        font-size="9"
        font-family="JetBrains Mono, monospace"
        :fill="dim"
        letter-spacing="2"
      >SKILL · CALIBRATED</text>

      <!-- Track bg -->
      <rect
        x="0" :y="large ? 30 : 12"
        :width="trackWidth" :height="large ? 6 : 3"
        rx="2" :fill="dim" opacity="0.5"
      />
      <!-- Filled track -->
      <rect
        x="0" :y="large ? 30 : 12"
        :width="filledWidth" :height="large ? 6 : 3"
        rx="2" :fill="stroke"
        style="transition: all 1000ms var(--hearth-ease), fill 400ms"
      />

      <!-- Tick markers -->
      <line
        v-for="(t, i) in ticks"
        :key="'tick-' + i"
        :x1="trackWidth * t"
        :y1="large ? 26 : 9"
        :x2="trackWidth * t"
        :y2="large ? 42 : 18"
        :stroke="dim" stroke-width="1" opacity="0.6"
      />

      <!-- Cursor -->
      <g
        :transform="`translate(${cursorPos}, ${large ? 33 : 13.5})`"
        style="transition: transform 1000ms var(--hearth-ease)"
      >
        <circle :r="cursorR" :fill="stroke" />
        <circle :r="cursorR" fill="none" :stroke="stroke" opacity="0.4">
          <animate attributeName="r" :from="cursorR" :to="pulseR" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>

      <!-- Level labels (large only) -->
      <template v-if="large">
        <text x="0" y="64" font-size="9" font-family="JetBrains Mono, monospace" :fill="dim">0</text>
        <text x="48" y="64" font-size="9" font-family="JetBrains Mono, monospace" :fill="dim">BEGINNER</text>
        <text
          x="118" y="64" font-size="9" font-family="JetBrains Mono, monospace"
          :fill="stroke" font-weight="600"
          style="transition: fill 400ms"
        >YOU</text>
        <text x="170" y="64" font-size="9" font-family="JetBrains Mono, monospace" :fill="dim">EXPERT</text>
      </template>

      <!-- Stat readouts (large only) -->
      <g v-if="large" transform="translate(0, 92)">
        <g v-for="(d, i) in stats" :key="'stat-' + i" :transform="`translate(${i * 70}, 0)`">
          <text x="0" y="0" font-size="8" font-family="JetBrains Mono, monospace" :fill="dim" letter-spacing="1.5">{{ d.label }}</text>
          <text x="0" y="18" font-size="14" font-family="Sora, sans-serif" font-weight="600" :fill="ink">{{ d.val }}</text>
          <line x1="0" y1="26" x2="50" y2="26" :stroke="dim" opacity="0.4" />
        </g>
      </g>
    </g>
  </svg>

  <!-- PULSE: Document outline + module rows drawing in + speed gauge -->
  <svg
    v-else-if="kind === 'pulse'"
    width="220" height="130"
    viewBox="0 0 220 130"
    style="overflow: visible"
  >
    <!-- Document outline -->
    <rect x="6" y="10" width="100" height="110" rx="6" fill="none" :stroke="dim" stroke-width="1" />

    <!-- Module rows -->
    <g
      v-for="i in moduleRows"
      :key="'mod-' + i"
      :style="{
        opacity: active ? 1 : 0.5,
        transition: `opacity 400ms ${i * 120}ms`,
      }"
    >
      <circle cx="16" :cy="22 + i * 18" r="3" :fill="active ? stroke : dim" style="transition: fill 400ms" />
      <line
        x1="24" :y1="22 + i * 18"
        :x2="24 + (active ? 70 : 36)" :y2="22 + i * 18"
        :stroke="active ? stroke : dim" stroke-width="1.4"
        :style="`transition: all 500ms var(--hearth-ease) ${i * 100}ms`"
      />
      <line
        x1="24" :y1="27 + i * 18"
        :x2="24 + (active ? 50 : 20)" :y2="27 + i * 18"
        :stroke="dim" stroke-width="1" opacity="0.5"
        :style="`transition: all 500ms var(--hearth-ease) ${i * 100 + 80}ms`"
      />
    </g>

    <!-- Write-head cursor -->
    <line
      v-if="active"
      x1="16" y1="18" x2="16" y2="116"
      :stroke="stroke" stroke-width="1" opacity="0.7"
    >
      <animate attributeName="x1" values="16;100;16" dur="3s" repeatCount="indefinite" />
      <animate attributeName="x2" values="16;100;16" dur="3s" repeatCount="indefinite" />
    </line>

    <!-- Speed gauge -->
    <g transform="translate(130, 18)">
      <text x="0" y="0" font-size="7" font-family="JetBrains Mono, monospace" :fill="dim" letter-spacing="1.5">BUILD</text>
      <text
        x="0" y="32" font-size="28" font-family="Sora, sans-serif" font-weight="700"
        :fill="active ? stroke : ink" letter-spacing="-0.04em"
        style="transition: fill 400ms"
      >4.2s</text>

      <!-- Sparkline -->
      <polyline
        points="0,55 10,52 20,58 30,48 40,54 50,42 60,50 70,38 80,46"
        fill="none" :stroke="stroke" stroke-width="1.4" stroke-linecap="round"
        stroke-dasharray="120"
        :stroke-dashoffset="active ? 0 : 120"
        style="transition: stroke-dashoffset 1.2s var(--hearth-ease), stroke 400ms"
      />

      <!-- Module count -->
      <text x="0" y="80" font-size="7" font-family="JetBrains Mono, monospace" :fill="dim" letter-spacing="1.5">MODULES</text>
      <text x="0" y="100" font-size="18" font-family="Sora, sans-serif" font-weight="600" :fill="ink">6</text>
      <text x="22" y="100" font-size="9" font-family="JetBrains Mono, monospace" :fill="dim">· 1h 45m</text>
    </g>
  </svg>

  <!-- PATHS: Branching path tree with chosen route -->
  <svg
    v-else
    width="220" height="130"
    viewBox="0 0 220 130"
    style="overflow: visible"
  >
    <!-- YOU marker -->
    <g transform="translate(8, 60)">
      <circle r="6" :fill="stroke" />
      <circle r="10" fill="none" :stroke="stroke" opacity="0.4">
        <template v-if="active">
          <animate attributeName="r" from="6" to="14" dur="1.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.5" to="0" dur="1.8s" repeatCount="indefinite" />
        </template>
      </circle>
      <text x="-4" y="22" font-size="7" font-family="JetBrains Mono, monospace" :fill="dim" letter-spacing="1.2">YOU</text>
    </g>

    <!-- Path tree -->
    <g v-for="(b, i) in branches" :key="'branch-' + i">
      <!-- Curved path from YOU to branch -->
      <path
        :d="`M 16 60 C 60 60, 60 ${b.y}, 100 ${b.y}`"
        fill="none"
        :stroke="b.primary ? stroke : dim"
        :stroke-width="b.primary ? 1.6 : 1"
        :stroke-dasharray="b.primary ? 'none' : '3 4'"
        :opacity="b.primary ? 1 : 0.6"
        style="transition: all 500ms ease"
      />
      <!-- Branch node -->
      <circle
        cx="104" :cy="b.y"
        :r="b.primary ? 5 : 3.5"
        :fill="b.primary && active ? stroke : 'none'"
        :stroke="b.primary ? stroke : dim"
        stroke-width="1.4"
        style="transition: all 400ms"
      />
      <!-- Branch label -->
      <text
        x="114" :y="b.y - 2"
        font-size="8" font-family="JetBrains Mono, monospace"
        :fill="b.primary ? stroke : dim"
        letter-spacing="1.5"
        :font-weight="b.primary ? 600 : 400"
        style="transition: fill 400ms"
      >{{ b.label }}</text>
      <!-- Branch sub-label -->
      <text
        x="114" :y="b.y + 9"
        font-size="8" font-family="Source Serif 4, serif"
        :fill="dim" font-style="italic"
      >{{ b.sub }}</text>

      <!-- Sub-routes on primary branch -->
      <template v-if="b.primary">
        <g v-for="j in subRoutes" :key="'sub-' + j">
          <line
            x1="108" :y1="b.y"
            :x2="140 + j * 16" :y2="b.y - 18 + j * 12"
            :stroke="j === 1 && active ? stroke : dim"
            stroke-width="1"
            :stroke-dasharray="j === 1 ? 'none' : '2 3'"
            :opacity="j === 1 ? 1 : 0.4"
            style="transition: all 500ms ease"
          />
          <circle
            :cx="140 + j * 16" :cy="b.y - 18 + j * 12"
            r="2.2"
            :fill="j === 1 && active ? stroke : dim"
            style="transition: fill 400ms"
          />
        </g>
      </template>
    </g>
  </svg>
</template>
