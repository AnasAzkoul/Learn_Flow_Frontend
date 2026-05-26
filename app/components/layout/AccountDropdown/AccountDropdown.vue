<script setup lang="ts">
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";

interface UserDropdownItem {
    label: string;
    href?: string;
    onClick?: () => void;
}

const userDropdownItems: UserDropdownItem[] = [
  { label: "Profile", href: "/profile" },
  { label: "Billing", href: "/billing" },
  { label: "Subscription", href: "/subscription" },
  { label: "Logout", onClick: handleLogout },
]

function handleLogout() {
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
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
        :class="item.label === 'Logout' ? 'focus:bg-destructive' : ''"
      >
        <Button
          :variant="item.label === 'Logout' ? 'destructive' : 'ghost'"
          class="pl-0 pb-0 w-full"
          size="sm"
          :to="item.href"
          @click="item.onClick"
        >
          {{ item.label }}
        </Button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
