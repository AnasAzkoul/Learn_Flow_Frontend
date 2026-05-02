<script lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import AppLogo from "~/components/layout/AppLogo/AppLogo.vue";

export default defineComponent({
  components: {AppLogo, NavigationMenuItem}
})

</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NuxtLink>
          <AppLogo variant="on-light" />
        </NuxtLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
  <div class="h-screen bg-black"></div>
</template>
