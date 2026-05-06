<script lang="ts" setup>
import {ref} from "vue";
import CourseGlyph from "./CourseGlyph.vue";

interface SyllabusRow {
  t: string;
  n: number;
  hot?: boolean;
}

interface Course {
  catalog: string;
  kicker: string;
  title: string;
  level: string;
  modules: number;
  time: string;
  prompt: string;
  hue: string;
  author: string;
  authorRole: string;
  rating: string;
  students: string;
  glyph: 'grid' | 'chart' | 'lock';
  syllabus: SyllabusRow[];
}

const active = ref(0);

const courses: Course[] = [
  {
    catalog: 'LF-2401',
    kicker: 'Design',
    title: 'Design Systems\nfrom Scratch',
    level: 'Intermediate',
    modules: 12,
    time: '3h 20m',
    prompt: 'Build production design systems',
    hue: '#e8571a',
    glyph: 'grid',
    author: 'Adaora N.',
    authorRole: 'Senior PD, Linear',
    rating: '4.9',
    students: '2,847',
    syllabus: [
      {t: 'Foundations', n: 4, hot: true},
      {t: 'Tokens & Theming', n: 3, hot: true},
      {t: 'Component API design', n: 2},
      {t: 'Documentation', n: 2},
      {t: 'Versioning & release', n: 1},
    ],
  },
  {
    catalog: 'LF-2402',
    kicker: 'Data',
    title: 'Data Visualization\nFundamentals',
    level: 'Beginner',
    modules: 8,
    time: '2h 10m',
    prompt: 'Tell stories with data, not noise',
    hue: '#c6890e',
    glyph: 'chart',
    author: 'Rafael M.',
    authorRole: 'Analytics lead, Stripe',
    rating: '4.8',
    students: '1,923',
    syllabus: [
      {t: 'The grammar of graphics', n: 2, hot: true},
      {t: 'Choosing the right chart', n: 2},
      {t: 'Color, scale & legibility', n: 2},
      {t: 'Narrative dashboards', n: 2},
    ],
  },
  {
    catalog: 'LF-2403',
    kicker: 'Security',
    title: 'OAuth 2.0\nDeep Dive',
    level: 'Advanced',
    modules: 6,
    time: '1h 45m',
    prompt: 'Implement OAuth like a security engineer',
    hue: '#5a8a5e',
    glyph: 'lock',
    author: 'Mei L.',
    authorRole: 'Staff SRE, Cloudflare',
    rating: '4.9',
    students: '4,118',
    syllabus: [
      {t: 'Why OAuth (and why not)', n: 1},
      {t: 'The four flows', n: 2, hot: true},
      {t: 'PKCE & native apps', n: 1, hot: true},
      {t: 'Token rotation', n: 1},
      {t: 'Common attacks', n: 1},
    ],
  },
];
</script>

<template>
  <section id="examples" class="relative py-28 px-6 md:px-10 bg-bg overflow-hidden">
    <!-- Dot grid -->
    <div
      aria-hidden="true"
      class="absolute inset-0 pointer-events-none opacity-60"
      style="background-image: radial-gradient(circle at 1px 1px, rgba(20, 24, 29, 0.04) 1px, transparent 0); background-size: 28px 28px"
    />

    <div class="relative max-w-[1400px] mx-auto">
      <!-- Editorial header -->
      <div class="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-[60px] items-end mb-16 pb-8 border-b border-border">
        <div>
          <div class="flex items-center gap-3.5 mono-space text-primary tracking-[0.18em] mb-6">
            <span class="w-8 h-px bg-primary" />
            The Catalog · Vol. 04
            <span class="flex-1 h-px bg-border" />
            <span class="text-text-muted hidden sm:inline">Updated weekly</span>
          </div>
          <h2
            class="text-text-main"
            style="font-family: var(--font-display); font-size: clamp(2.5rem, 5.5vw, 4.5rem); font-weight: 700; line-height: 1.0; letter-spacing: -0.04em"
          >
            Built in minutes.<br />
            <em class="not-italic" style="font-family: var(--font-sans); font-style: italic; font-weight: 500; color: var(--primary)">Read like a syllabus.</em>
          </h2>
        </div>
        <div class="pb-2">
          <p class="text-text-sec text-[1.0625rem] leading-relaxed" style="font-family: var(--font-sans)">
            Three real prompts. Three working courses, peer-reviewed and shipped to learners last week. Click any cover to see how the AI structured the curriculum from a single sentence.
          </p>
        </div>
      </div>

      <!-- Course cards grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        <article
          v-for="(c, i) in courses"
          :key="c.catalog"
          class="bg-bg-card rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-all duration-[600ms]"
          :style="{
            border: `1px solid ${active === i ? 'rgba(232, 87, 26, 0.35)' : 'var(--border-light)'}`,
            boxShadow: active === i ? '0 24px 60px rgba(20, 24, 29, 0.12)' : 'var(--shadow-sm)',
            transform: active === i ? 'translateY(-6px)' : 'none',
            transitionTimingFunction: 'var(--hearth-ease)',
          }"
          @mouseenter="active = i"
        >
          <!-- Cover plate -->
          <div
            class="relative h-[220px] overflow-hidden flex flex-col justify-between p-5"
            style="background: linear-gradient(160deg, var(--esp-900) 0%, var(--esp-800) 100%)"
          >
            <!-- Tinted radial -->
            <div
              aria-hidden="true"
              class="absolute pointer-events-none"
              :style="`top: -30%; right: -30%; width: 120%; height: 120%; background: radial-gradient(circle, ${c.hue}33 0%, transparent 60%)`"
            />

            <!-- Glyph art -->
            <div
              class="absolute inset-0 flex items-center justify-center transition-opacity duration-[400ms]"
              :style="{ opacity: active === i ? 1 : 0.85 }"
            >
              <CourseGlyph :kind="c.glyph" :hue="c.hue" :active="active === i" />
            </div>

            <!-- Top row -->
            <div class="relative z-[1] flex justify-between items-start">
              <span class="mono-space text-[0.65rem] tracking-[0.16em] text-text-on-dark-sec">
                № {{ c.catalog }}
              </span>
              <span
                class="mono-space text-[0.6rem] tracking-[0.16em] px-2 py-1 rounded-sm"
                :style="`color: ${c.hue}; border: 1px solid ${c.hue}55; background: ${c.hue}11`"
              >
                {{ c.level }}
              </span>
            </div>

            <!-- Bottom kicker -->
            <div class="relative z-[1] flex items-center gap-2 mono-space text-[0.7rem] tracking-[0.18em]" :style="`color: ${c.hue}`">
              <span class="size-1.5 rounded-full" :style="`background: ${c.hue}; box-shadow: 0 0 10px ${c.hue}`" />
              {{ c.kicker }}
            </div>
          </div>

          <!-- Content -->
          <div class="flex-1 flex flex-col p-6">
            <h3 class="font-display text-2xl font-bold leading-tight tracking-tight text-text-main mb-3.5 whitespace-pre-line">
              {{ c.title }}
            </h3>

            <!-- Prompt pull-quote -->
            <div class="pl-[18px] py-3 mb-5" :style="`border-left: 2px solid ${c.hue}`">
              <div class="mono-space text-[0.6rem] tracking-[0.16em] text-text-muted mb-1">From the prompt</div>
              <div class="text-text-main text-[0.95rem] italic leading-snug" style="font-family: var(--font-sans)">
                "{{ c.prompt }}"
              </div>
            </div>

            <!-- Mini syllabus -->
            <div class="mb-5">
              <div class="flex justify-between mono-space text-[0.6rem] tracking-[0.16em] text-text-muted mb-2.5">
                <span>Syllabus</span>
                <span>{{ c.modules }} modules · {{ c.time }}</span>
              </div>
              <div
                v-for="(row, j) in c.syllabus"
                :key="j"
                class="grid grid-cols-[20px_1fr_auto] items-center gap-2.5 py-[7px]"
                :style="j < c.syllabus.length - 1 ? 'border-bottom: 1px dashed var(--border-light)' : ''"
              >
                <span
                  class="mono-space text-[0.65rem] font-semibold"
                  :style="`color: ${row.hot ? c.hue : 'var(--text-muted)'}`"
                >
                  {{ String(j + 1).padStart(2, '0') }}
                </span>
                <span
                  class="text-text-main text-[0.9375rem]"
                  :class="row.hot ? 'font-semibold' : ''"
                  style="font-family: var(--font-sans)"
                >
                  {{ row.t }}
                </span>
                <span class="mono-space text-[0.65rem] text-text-muted tracking-wide">
                  {{ row.n }} {{ row.n === 1 ? 'lesson' : 'lessons' }}
                </span>
              </div>
            </div>

            <!-- Author + meta -->
            <div class="mt-auto pt-[18px] border-t border-border-light flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <div
                  class="size-8 rounded-full flex items-center justify-center text-white font-display text-xs font-bold"
                  :style="`background: linear-gradient(135deg, ${c.hue} 0%, var(--esp-800) 100%)`"
                >
                  {{ c.author.split(' ').map(p => p[0]).join('') }}
                </div>
                <div>
                  <div class="font-display text-[0.8125rem] font-semibold text-text-main leading-tight">{{ c.author }}</div>
                  <div class="text-text-muted text-xs leading-tight" style="font-family: var(--font-sans)">{{ c.authorRole }}</div>
                </div>
              </div>
              <div class="text-right mono-space text-[0.7rem] text-text-muted tracking-wide">
                <div class="text-text-main font-semibold">★ {{ c.rating }}</div>
                <div>{{ c.students }}</div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- Catalog footer -->
      <div class="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 mono-space text-[0.7rem] tracking-[0.14em] text-text-muted">
        <span>Showing 3 of 14,206 community-built courses</span>
        <span class="flex items-center gap-2.5 text-primary">
          Browse the full catalog
          <span class="w-6 h-px bg-primary" />
          →
        </span>
      </div>
    </div>
  </section>
</template>
