<script lang="ts" setup>
import {SidebarProvider, SidebarInset, SidebarTrigger, useSidebar} from '@/components/ui/sidebar'
import AppSidebar from '@/components/layout/AppSidebar/AppSidebar.vue'
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <slot />
    </SidebarInset>
  </SidebarProvider>
</template>
