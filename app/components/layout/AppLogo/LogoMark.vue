<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  animated?: boolean;
}>();
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    fill="none"
    :class="cn('shrink-0', props.class)"
    aria-hidden="true"
  >
    <path
      :class="{ 'lf-wave1': animated }"
      d="M8,32 C14,16 22,16 28,32 C34,48 42,48 48,32 C51,24 54,22 56,24"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      fill="none"
    />
    <path
      :class="{ 'lf-wave2': animated }"
      d="M8,32 C14,48 22,48 28,32 C34,16 42,16 48,32 C51,40 54,42 56,40"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      fill="none"
      opacity="0.45"
    />
    <circle cx="8" cy="32" r="3" fill="currentColor" />
    <circle
      :class="{ 'lf-end1': animated }"
      cx="56"
      cy="24"
      r="2.5"
      fill="currentColor"
    />
    <circle
      :class="{ 'lf-end2': animated }"
      cx="56"
      cy="40"
      r="2.5"
      fill="currentColor"
      opacity="0.45"
    />
  </svg>
</template>
