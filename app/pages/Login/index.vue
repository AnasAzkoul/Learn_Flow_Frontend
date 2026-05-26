<script lang="ts" setup>
import {ref, onMounted} from 'vue'
import {ArrowRight, Loader2} from 'lucide-vue-next'
import {Button} from '@/components/ui/button'
import AppLogo from '@/components/layout/AppLogo/AppLogo.vue'
import SectionDivider from '@/components/common/SectionDivider.vue'
import BaseInput from "~/components/common/BaseInput/BaseInput.vue";

import {useLogin} from './useLogin';

definePageMeta({layout: 'auth'})

const mounted = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    mounted.value = true
  })
})

const {onSubmit, isSubmitting, errors} = useLogin()
</script>

<template>
  <div :class="mounted ? 'login-stagger' : 'opacity-0'">
    <!-- Logo -->
    <div class="login-stagger-1">
      <AppLogo class="mb-8" variant="on-light" />
    </div>

    <!-- Heading -->
    <div class="login-stagger-2 mb-8">
      <h1
        class="text-text-main"
        style="font-family: var(--font-display); font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 700; line-height: 1.0; letter-spacing: -0.04em"
      >
        Welcome
        <em
          class="text-primary not-italic"
          style="font-family: var(--font-sans); font-style: italic; font-weight: 500"
        >back.</em>
      </h1>
      <p class="text-text-sec mt-3 leading-relaxed" style="font-family: var(--font-sans)">
        Login with your Apple or Google account
      </p>
    </div>

    <!-- Card -->
    <div class="hearth-card p-8 md:p-10">
      <!-- OAuth Buttons -->
      <div class="login-stagger-3 flex flex-col gap-4">
        <Button
          class="w-full font-display font-semibold"
          size="xl"
          type="button"
          variant="outline"
          @click="() => {}"
        >
          <svg class="size-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
          </svg>
          Login with Apple
        </Button>

        <Button
          class="w-full font-display font-semibold"
          size="xl"
          type="button"
          variant="outline"
          @click="() => {}"
        >
          <svg class="size-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Login with Google
        </Button>
      </div>

      <!-- Divider -->
      <div class="login-stagger-3 my-6">
        <SectionDivider label="Or continue with" />
      </div>

      <form
        class="flex flex-col gap-5"
        @submit.prevent="onSubmit"
      >
        <div class="login-stagger-4 space-y-5">
          <!-- Email -->
          <BaseInput
            auto-complete="email"
            class-name="flex flex-col gap-2 lg:col-span-2"
            label="Email"
            name="email"
            placeholder="m@example.com"
            type="email"
          />

          <!-- Password -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label
                class="text-sm font-medium text-text-main"
                for="password"
                style="font-family: var(--font-sans)"
              >Password</label>
              <NuxtLink
                class="text-sm text-primary hover:text-accent-hover transition-colors"
                style="font-family: var(--font-sans)"
                to="/forgot-password"
              >
                Forgot your password?
              </NuxtLink>
            </div>
            <BaseInput
              :is-input-group="true"
              auto-complete="current-password"
              class-name="flex flex-col gap-2 lg:col-span-2"
              name="password"
              placeholder="••••••••••••"
              type="password"
            />
          </div>
        </div>

        <!-- Submit -->
        <div class="login-stagger-5">
          <Button
            :disabled="isSubmitting"
            class="w-full font-display font-semibold login-cta"
            size="xl"
            type="submit"
            variant="generate"
          >
            <template v-if="isSubmitting">
              <Loader2 class="size-4 animate-spin" />
              Signing in...
            </template>
            <template v-else>
              Login
              <ArrowRight class="size-4" />
            </template>
          </Button>
        </div>
      </form>
    </div>

    <!-- Sign up link -->
    <p class="login-stagger-5 text-center mt-8 text-sm text-text-sec" style="font-family: var(--font-sans)">
      Don't have an account?
      <NuxtLink class="text-accent font-medium hover:underline" to="/signup">
        Sign up
      </NuxtLink>
    </p>

    <!-- Terms -->
    <p class="login-stagger-5 text-center mt-4 text-xs text-muted-foreground" style="font-family: var(--font-sans)">
      By clicking continue, you agree to our
      <NuxtLink class="text-primary hover:text-accent-hover transition-colors underline underline-offset-4" to="/terms">
        Terms of Service
      </NuxtLink>
      and
      <NuxtLink class="text-primary hover:text-accent-hover transition-colors underline underline-offset-4" to="/privacy">
        Privacy Policy</NuxtLink>.
    </p>
  </div>
</template>

<style scoped>
.login-stagger > * {
  opacity: 0;
  transform: translateY(20px);
}

.login-stagger.login-stagger > * {
  animation: loginReveal 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

.login-stagger-1 { animation-delay: 0.1s !important; }
.login-stagger-2 { animation-delay: 0.2s !important; }
.login-stagger-3 { animation-delay: 0.35s !important; }
.login-stagger-4 { animation-delay: 0.5s !important; }
.login-stagger-5 { animation-delay: 0.65s !important; }

@keyframes loginReveal {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.login-cta {
  position: relative;
  overflow: hidden;
}

.login-cta::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent);
  animation: loginShimmer 3s ease-in-out 1.5s infinite;
}

@keyframes loginShimmer {
  0% { left: -100%; }
  40% { left: 100%; }
  100% { left: 100%; }
}
</style>
