<script lang="ts" setup>
import {ref, computed} from 'vue'
import {personas} from './PersonalizationSection.data'

const activeId = ref('analyst')
const active = computed(() => personas.find((p) => p.id === activeId.value) ?? personas[0]!)
</script>

<template>
  <section id="personalization" class="pt-20 pb-20">
    <!-- Divider -->
    <div class="h-px bg-border-light" />

    <!-- Section header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 py-14 reveal">
      <div class="flex flex-col gap-4">
        <h2 class="display-text text-3xl md:text-[2.4rem] leading-tight text-text-main">
          Same topic.<br>
          Different course<br>
          <span class="text-primary">for each person.</span>
        </h2>
        <span class="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-lg bg-esp-900 border border-esp-700">
          <span class="font-mono text-[0.65rem] text-text-on-dark-sec uppercase tracking-widest">Prompt</span>
          <span class="font-mono text-xs text-text-on-dark font-medium">"learn SQL"</span>
        </span>
      </div>
      <p class="text-text-sec text-sm md:text-base max-w-xs leading-relaxed md:text-right">
        The same prompt produces entirely different material depending on who's learning — level, vocabulary, examples,
        and depth all tuned automatically.
      </p>
    </div>

    <!-- Persona tab row -->
    <div class="flex flex-wrap items-center justify-between gap-3 mb-6 reveal reveal-delay-1">
      <div aria-label="Learner personas" class="flex flex-wrap items-center gap-2" role="tablist">
        <span class="font-mono text-[0.65rem] text-text-muted uppercase tracking-widest mr-1 hidden sm:inline">
          Your role →
        </span>
        <Button
          v-for="persona in personas"
          :id="'tab-' + persona.id"
          :key="persona.id"
          :aria-controls="'panel-' + persona.id"
          :aria-selected="activeId === persona.id"
          :class="
            activeId === persona.id
              ? 'bg-primary text-white border-primary'
              : 'bg-bg text-text-muted border-border hover:text-text-main hover:border-esp-300'
          "
          class="px-4 py-2 rounded-lg font-display text-xs font-semibold transition-all duration-150 border cursor-pointer"
          role="tab"
          @click="activeId = persona.id"
        >
          {{ persona.label }}
        </Button>
      </div>
    </div>

    <!-- Cards — fade on persona switch -->
    <Transition mode="out-in" name="fade">
      <div
        :id="'panel-' + activeId"
        :key="activeId"
        :aria-labelledby="'tab-' + activeId"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 outline-none"
        role="tabpanel"
        tabindex="0"
      >
        <!-- Card 1: Level -->
        <div class="bg-bg-card border border-border-light rounded-xl p-6 flex flex-col gap-5">
          <span class="font-mono text-[0.65rem] tracking-widest text-text-muted uppercase">
            Tuned for / Level
          </span>
          <div class="flex-1 flex flex-col gap-3">
            <h3 class="font-display font-bold text-2xl text-text-main tracking-tight">
              {{ active.level.value }}
            </h3>
            <div
              :class="active.level.barWidth"
              class="h-1.5 bg-primary rounded-full transition-all duration-300"
            />
            <p class="text-text-sec text-sm leading-relaxed mt-1">
              {{ active.level.desc }}
            </p>
          </div>
        </div>

        <!-- Card 2: Code example -->
        <div class="bg-bg-card border border-border-light rounded-xl p-6 flex flex-col gap-4 md:col-span-2 lg:col-span-1">
          <span class="font-mono text-[0.65rem] tracking-widest text-text-muted uppercase">
            First lesson example
          </span>
          <div class="bg-esp-900 rounded-lg p-4 flex-1">
            <code class="font-mono text-xs text-text-on-dark-sec whitespace-pre-wrap leading-relaxed block">
              <span
                v-for="(seg, i) in active.code.segments"
                :key="i"
                :class="seg.cls"
              >{{ seg.text }}</span>
            </code>
          </div>
          <p class="text-text-muted text-xs leading-relaxed">
            {{ active.code.caption }}
          </p>
        </div>

        <!-- Card 3: Writing style -->
        <div class="bg-bg-card border border-border-light rounded-xl p-6 flex flex-col gap-5">
          <span class="font-mono text-[0.65rem] tracking-widest text-text-muted uppercase">
            Writing style
          </span>
          <div class="flex-1 flex flex-col gap-4">
            <h3 class="font-display font-bold text-2xl text-text-main tracking-tight">
              {{ active.style.name }}
            </h3>
            <div class="flex items-center gap-2 flex-wrap">
              <span
                v-for="trait in active.style.traits"
                :key="trait"
                class="font-display text-xs font-semibold px-3 py-1 rounded-md border bg-accent-subtle text-primary border-accent-border"
              >
                {{ trait }}
              </span>
            </div>
            <p class="text-text-sec text-sm leading-relaxed">
              {{ active.style.desc }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
