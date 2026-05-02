<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ref } from "vue";
import { cn } from "@/lib/utils";
import LogoMark from "./LogoMark.vue";

const props = withDefaults(
  defineProps<{
    size?: "sm" | "default";
    variant?: "on-dark" | "on-light";
    class?: HTMLAttributes["class"];
  }>(),
  { size: "default", variant: "on-dark" },
);

const isHovered = ref(false);
</script>

<template>
  <div
    :class="
      cn(
        'flex items-center',
        size === 'sm' ? 'gap-2.5' : 'gap-3',
        props.class,
      )
    "
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <LogoMark
      :animated="isHovered"
      :class="size === 'sm' ? 'size-6' : 'size-8'"
    />
    <span
      :class="
        cn(
          'display-text tracking-tight',
          variant === 'on-light' ? 'text-text-main' : 'text-text-on-dark',
          size === 'sm' ? 'text-xl' : 'text-2xl',
        )
      "
    >
      LearnFlow
    </span>
  </div>
</template>
