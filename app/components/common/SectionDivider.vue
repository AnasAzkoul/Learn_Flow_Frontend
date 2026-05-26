<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <div class="relative flex items-center py-2">
    <div class="flex-grow border-t border-border" />
    <span class="mono-space px-4 text-muted-foreground text-xs">{{ label }}</span>
    <div class="flex-grow border-t border-border" />
  </div>
</template>
