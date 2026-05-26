<script lang="ts" setup>
import {
  Search,
  Sparkles,
  LayoutDashboard,
  Settings,
  BookOpen,
  Clock,
  LogOut,
  ChevronsUpDown,
} from 'lucide-vue-next'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import LogoMark from '@/components/layout/AppLogo/LogoMark.vue'

const {state} = useSidebar()

const navItems = [
  {label: 'Search', icon: Search, href: '#'},
  {label: 'New Course', icon: Sparkles, href: '/new-course'},
  {label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard'},
  {label: 'Customize', icon: Settings, href: '#'},
]

const currentCourses = [
  {title: 'Rust Memory Management', progress: 68},
  {title: 'Baroque Art History', progress: 34},
  {title: 'Quantum Computing', progress: 12},
]

const pendingCourses = [
  {title: 'Advanced TypeScript Patterns'},
  {title: 'Music Theory Fundamentals'},
]

const route = useRoute()
</script>

<template>
  <Sidebar collapsible="icon" class="border-r-0 font-display">
    <!-- Header — Logo -->
    <SidebarHeader class="p-4">
      <div class="flex items-center justify-between">
        <NuxtLink to="/dashboard" class="flex items-center gap-2.5 overflow-hidden">
          <LogoMark class="size-7 shrink-0 text-sidebar-foreground" />
          <span
            class="display-text text-lg text-sidebar-foreground tracking-tight truncate transition-opacity duration-200 group-data-[collapsible=icon]:opacity-0"
          >
            LearnFlow
          </span>
        </NuxtLink>
        <SidebarTrigger class="text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent group-data-[collapsible=icon]:hidden" />
      </div>
    </SidebarHeader>

    <SidebarContent>
      <!-- Main nav -->
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem v-for="item in navItems" :key="item.label">
            <SidebarMenuButton
              as-child
              :is-active="route.path === item.href"
              :tooltip="item.label"
            >
              <NuxtLink :to="item.href">
                <component :is="item.icon" />
                <span class="text-[13px] font-medium tracking-tight">{{ item.label }}</span>
              </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <SidebarSeparator />

      <!-- Current Courses -->
      <SidebarGroup>
        <SidebarGroupLabel class="mono-space text-sidebar-foreground/40">
          Current Courses
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="course in currentCourses" :key="course.title">
              <SidebarMenuButton :tooltip="course.title" as-child>
                <NuxtLink to="#">
                  <BookOpen class="shrink-0" />
                  <div class="flex flex-col gap-1 overflow-hidden min-w-0">
                    <span class="truncate text-[13px] tracking-tight">{{ course.title }}</span>
                    <div class="flex items-center gap-2">
                      <div class="h-1 flex-1 rounded-full bg-sidebar-accent overflow-hidden">
                        <div
                          class="h-full rounded-full bg-primary transition-all"
                          :style="{width: `${course.progress}%`}"
                        />
                      </div>
                      <span class="text-[10px] text-sidebar-foreground/50 font-mono tabular-nums shrink-0">{{ course.progress }}%</span>
                    </div>
                  </div>
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarSeparator />

      <!-- Pending Courses -->
      <SidebarGroup>
        <SidebarGroupLabel class="mono-space text-sidebar-foreground/40">
          Pending
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="course in pendingCourses" :key="course.title">
              <SidebarMenuButton :tooltip="course.title" as-child>
                <NuxtLink to="#">
                  <Clock class="shrink-0 text-sidebar-foreground/40" />
                  <span class="truncate text-[13px] tracking-tight text-sidebar-foreground/60">{{ course.title }}</span>
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <!-- Footer — User -->
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <SidebarMenuButton size="lg" class="cursor-pointer">
                <Avatar class="size-7 shrink-0">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback class="bg-sidebar-accent text-sidebar-foreground text-xs font-medium">
                    AA
                  </AvatarFallback>
                </Avatar>
                <div class="flex flex-col gap-0.5 overflow-hidden min-w-0">
                  <span class="text-[13px] font-medium tracking-tight truncate">Anas Azkoul</span>
                  <span class="text-[11px] text-sidebar-foreground/50 font-mono truncate">anas.azkoul@gmail.com</span>
                </div>
                <ChevronsUpDown class="ml-auto size-4 shrink-0 opacity-50" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" class="w-56">
              <DropdownMenuItem class="gap-2 font-display text-[13px]">
                <Settings :size="16" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem class="gap-2 font-display text-[13px]">
                <LogOut :size="16" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>

    <SidebarRail />
  </Sidebar>
</template>
