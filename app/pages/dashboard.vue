<script lang="ts" setup>
definePageMeta({layout: 'default', middleware: 'auth'})
defineOptions({name: 'DashboardPage'})
</script>

<template>
  <div class="max-w-[1400px] mx-auto px-6 md:px-10 py-10">
    <h1 class="font-display text-2xl font-bold text-text-main">Dashboard</h1>
    <p class="text-text-sec mt-2">Welcome back.</p>
  </div>
</template>
