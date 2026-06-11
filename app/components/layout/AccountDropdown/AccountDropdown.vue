<script setup lang="ts">
import {storeToRefs} from "pinia";
import {LogOut} from "lucide-vue-next";
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {useAuthStore} from "~/stores/useAuthStore";

interface UserDropdownItem {
    label: string;
    href: string;
}

const userDropdownItems: UserDropdownItem[] = [
  { label: "Profile", href: "/profile" },
  { label: "Billing", href: "/billing" },
  { label: "Subscription", href: "/subscription" },
]

const authStore = useAuthStore();
const {user, userInitials, isLoading} = storeToRefs(authStore);
const {signOutAndRedirect} = useAuthSignOut();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Avatar>
        <AvatarImage :src="user?.image ?? ''" />
        <AvatarFallback>{{ userInitials }}</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      class="w-56 bg-background-hover"
      align="end"
    >
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        v-for="item in userDropdownItems"
        :key="item.label"
        as-child
      >
        <NuxtLink :to="item.href" class="w-full">
          {{ item.label }}
        </NuxtLink>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        :disabled="isLoading"
        variant="destructive"
        @select="signOutAndRedirect"
      >
        <LogOut :size="16" />
        Sign out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
