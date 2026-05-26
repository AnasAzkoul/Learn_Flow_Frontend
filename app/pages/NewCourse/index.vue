<script lang="ts" setup>
import {ref, onMounted, computed} from 'vue'
import {Loader2} from 'lucide-vue-next'
import {Field as VeeField} from 'vee-validate'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from '@/components/ui/select'
import {useNewCourse} from './useNewCourse'
import {knowledgeLevels, courseDepths, lessonTypes} from './config'

definePageMeta({layout: 'default', path: '/new-course'})

const mounted = ref(false)
onMounted(() => {
  requestAnimationFrame(() => {
    mounted.value = true
  })
})

const {onSubmit, isSubmitting, values} = useNewCourse()

const selectedKnowledgeLabel = computed(() =>
  knowledgeLevels.find(k => k.value === values.knowledgeLevel)?.label
)
const selectedDepthLabel = computed(() =>
  courseDepths.find(d => d.value === values.courseDepth)?.label
)
const selectedLessonLabel = computed(() =>
  lessonTypes.find(l => l.value === values.lessonType)?.label
)
</script>

<template>
  <div class="min-h-svh flex items-center justify-center px-4 py-12 md:py-20">
    <div class="w-full max-w-[680px]" :class="mounted ? 'nc-stagger' : 'opacity-0'">

      <!-- Header -->
      <div class="nc-stagger-1 mb-8 text-center">
        <h1
          class="text-text-main"
          style="font-family: var(--font-display); font-size: clamp(1.75rem, 3.5vw, 2.5rem); font-weight: 700; line-height: 1.1; letter-spacing: -0.04em"
        >
          What do you want to
          <em
            class="text-primary not-italic"
            style="font-family: var(--font-sans); font-style: italic; font-weight: 500"
          >learn?</em>
        </h1>
        <p class="text-text-sec mt-3 leading-relaxed" style="font-family: var(--font-sans)">
          Describe your topic and configure your course below
        </p>
      </div>

      <!-- Prompt bar -->
      <form
        class="nc-stagger-2"
        @submit.prevent="onSubmit"
      >
        <div class="prompt-bar-wrapper">
        <div class="prompt-bar">
          <!-- Textarea -->
          <VeeField
            v-slot="{ field, errors: topicErrors }"
            name="topic"
          >
            <div class="px-5 pt-5 pb-2">
              <textarea
                id="topic"
                v-bind="field"
                rows="3"
                placeholder="e.g. Rust memory management, Baroque art history, quantum computing basics…"
                class="w-full resize-none bg-transparent border-0 outline-none text-base text-text-main placeholder:text-esp-400 leading-relaxed"
                :aria-invalid="!!topicErrors.length"
                @keydown.meta.enter="onSubmit"
                @keydown.ctrl.enter="onSubmit"
              />
              <p
                v-if="topicErrors.length"
                class="text-error text-xs mt-1"
                style="font-family: var(--font-sans)"
              >
                {{ topicErrors[0] }}
              </p>
            </div>
          </VeeField>

          <!-- Bottom toolbar -->
          <div class="flex items-center justify-between gap-3 px-4 pb-4 pt-1">
            <!-- Selectors row -->
            <div class="flex items-center gap-2 flex-wrap">
              <!-- Knowledge Level pill -->
              <VeeField
                v-slot="{ field }"
                name="knowledgeLevel"
              >
                <Select
                  :model-value="field.value"
                  @update:model-value="field.onChange"
                >
                  <SelectTrigger class="pill-select">
                    <span v-if="selectedKnowledgeLabel" class="pill-value">{{ selectedKnowledgeLabel }}</span>
                    <span v-else class="pill-placeholder">Level</span>

                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        v-for="opt in knowledgeLevels"
                        :key="opt.value"
                        :value="opt.value"
                      >
                        <div class="flex flex-col py-0.5">
                          <span class="font-medium select-item-label">{{ opt.label }}</span>
                          <span class="text-xs select-item-desc">{{ opt.description }}</span>
                        </div>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </VeeField>

              <!-- Course Depth pill -->
              <VeeField
                v-slot="{ field }"
                name="courseDepth"
              >
                <Select
                  :model-value="field.value"
                  @update:model-value="field.onChange"
                >
                  <SelectTrigger class="pill-select">
                    <span v-if="selectedDepthLabel" class="pill-value">{{ selectedDepthLabel }}</span>
                    <span v-else class="pill-placeholder">Depth</span>

                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        v-for="opt in courseDepths"
                        :key="opt.value"
                        :value="opt.value"
                      >
                        <div class="flex flex-col py-0.5">
                          <span class="font-medium select-item-label">{{ opt.label }}</span>
                          <span class="text-xs select-item-desc">{{ opt.description }}</span>
                        </div>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </VeeField>

              <!-- Lesson Type pill -->
              <VeeField
                v-slot="{ field }"
                name="lessonType"
              >
                <Select
                  :model-value="field.value"
                  @update:model-value="field.onChange"
                >
                  <SelectTrigger class="pill-select">
                    <span v-if="selectedLessonLabel" class="pill-value">{{ selectedLessonLabel }}</span>
                    <span v-else class="pill-placeholder">Type</span>

                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        v-for="opt in lessonTypes"
                        :key="opt.value"
                        :value="opt.value"
                      >
                        <div class="flex flex-col py-0.5">
                          <span class="font-medium select-item-label">{{ opt.label }}</span>
                          <span class="text-xs select-item-desc">{{ opt.description }}</span>
                        </div>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </VeeField>
            </div>

            <!-- Submit button -->
            <button
              :disabled="isSubmitting"
              type="submit"
              class="submit-btn"
            >
              <Loader2 v-if="isSubmitting" class="size-4 animate-spin" />
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 36 20"
                fill="none"
                class="submit-icon"
                aria-hidden="true"
              >
                <path
                  class="submit-wave"
                  d="M4,10 C8,2 14,2 18,10 C22,18 28,18 32,10"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  fill="none"
                />
              </svg>
            </button>
          </div>
        </div>
        </div>
      </form>

    </div>
  </div>
</template>

<style scoped>
.prompt-bar-wrapper {
  position: relative;
}

.prompt-bar {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-bar);
  transition: all 0.5s var(--hearth-ease);
}

.prompt-bar-wrapper:focus-within .prompt-bar {
  border-color: rgba(232, 87, 26, 0.25);
  box-shadow:
    0 0 0 1px rgba(232, 87, 26, 0.1),
    0 0 15px rgba(232, 87, 26, 0.12),
    0 0 40px rgba(232, 87, 26, 0.1),
    0 0 80px rgba(232, 87, 26, 0.06);
}

/* Pill-style select triggers */
.pill-select {
  all: unset;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 32px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid var(--border-light);
  background: var(--bg-alt);
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s var(--hearth-ease);
  white-space: nowrap;
}

.pill-select:hover {
  border-color: var(--border-hover);
  background: var(--surface);
}

.pill-select[data-state="open"] {
  border-color: var(--accent);
  background: var(--accent-subtle);
}

.pill-placeholder {
  color: var(--text-muted);
}

.pill-value {
  color: var(--text-main);
}

/* Submit icon */
.submit-icon {
  width: 20px;
  height: 12px;
}

.submit-wave {
  stroke-dasharray: 60;
  stroke-dashoffset: 60;
  animation: waveDraw 0.6s ease-out forwards;
}

.submit-btn:hover .submit-wave {
  animation: waveFlow 1.2s ease-in-out infinite;
}

@keyframes waveDraw {
  to { stroke-dashoffset: 0; }
}

@keyframes waveFlow {
  0% { stroke-dashoffset: 0; }
  50% { stroke-dashoffset: -20; }
  100% { stroke-dashoffset: 0; }
}

/* Select item text — inherit parent focus color */

/* Submit circle */
.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--esp-900);
  color: var(--text-on-dark);
  border: none;
  cursor: pointer;
  transition: all 0.2s var(--hearth-ease);
  flex-shrink: 0;
}

.submit-btn:hover:not(:disabled) {
  background: var(--accent);
  box-shadow: var(--shadow-glow);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Stagger animations */
.nc-stagger-1 {
  animation: ncReveal 0.8s cubic-bezier(0.25, 1, 0.5, 1) 0.1s forwards;
  opacity: 0;
  transform: translateY(20px);
}

.nc-stagger-2 {
  animation: ncReveal 0.8s cubic-bezier(0.25, 1, 0.5, 1) 0.25s forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes ncReveal {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
