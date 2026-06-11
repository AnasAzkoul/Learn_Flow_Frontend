<script lang="ts" setup>
import {ref, onMounted} from 'vue'
import {AlertCircle, ArrowRight, Loader2} from 'lucide-vue-next'
import {Button} from '@/components/ui/button'
import {Alert, AlertDescription} from '@/components/ui/alert'
import AppLogo from '@/components/layout/AppLogo/AppLogo.vue'
import SectionDivider from '@/components/common/SectionDivider.vue'
import BaseCalendarInput from "~/components/common/BaseCalendar/BaseCalendarInput.vue";
import BaseInput from "~/components/common/BaseInput/BaseInput.vue";
import BaseSelect from "~/components/common/BaseSelect/BaseSelect.vue";
import BaseCheckbox from "~/components/common/BaseCheckbox/BaseCheckbox.vue";

import {useSignup} from './useSignup';

definePageMeta({layout: 'auth', middleware: 'guest'})
defineOptions({name: 'SignupPage'})

const mounted = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    mounted.value = true
  })
})

const {onSubmit, isSubmitting, errors, authError} = useSignup()
</script>

<template>
  <div :class="mounted ? 'signup-stagger' : 'opacity-0'">
    <!-- Logo -->
    <div class="signup-stagger-1">
      <AppLogo class="mb-8" variant="on-light" />
    </div>

    <!-- Heading -->
    <div class="signup-stagger-2 mb-8">
      <h1
        class="text-text-main"
        style="font-family: var(--font-display); font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 700; line-height: 1.0; letter-spacing: -0.04em"
      >
        Create your
        <em
          class="text-primary not-italic"
          style="font-family: var(--font-sans); font-style: italic; font-weight: 500"
        >account.</em>
      </h1>
      <p class="text-text-sec mt-3 leading-relaxed" style="font-family: var(--font-sans)">
        Start your personalized learning journey today
      </p>
    </div>

    <!-- Card -->
    <div class="hearth-card p-8 md:p-10">
      <form
        class="space-y-5"
        @submit.prevent="onSubmit"
      >
        <Alert
          v-if="authError"
          class="signup-stagger-3"
          variant="destructive"
        >
          <AlertCircle />
          <AlertDescription>{{ authError.message }}</AlertDescription>
        </Alert>

        <!-- Profile Section -->
        <div class="signup-stagger-3">
          <SectionDivider label="Profile" />
        </div>

        <div class="signup-stagger-3 space-y-5">
          <!-- Full Name -->
          <BaseInput
            auto-complete="name"
            class-name="flex flex-col gap-2 lg:col-span-2"
            label="Full Name"
            name="fullName"
            placeholder="Enter your full name"
            type="text"
          />

          <!-- Email -->
          <BaseInput
            auto-complete="email"
            class-name="flex flex-col gap-2 lg:col-span-2"
            label="Email"
            name="email"
            placeholder="you@example.com"
            type="email"
          />

          <!-- Gender + Birth Date -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Gender -->
            <BaseSelect
              :data="['male', 'female', 'other', 'prefer_not_to_say']"
              class-name="flex flex-col gap-2"
              label="Gender"
              name="gender"
              placeholder="Select gender"
            />

            <BaseCalendarInput
              label="Birth Date"
              name="birthDate"
            />
          </div>

          <!-- Education + Occupation -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Education -->
            <BaseSelect
              :data="[
                'primary',
                'secondary',
                'tertiary',
                'diploma',
                'degree',
                'master',
                'phd',
              ]"
              class-name="flex flex-col gap-2"
              label="Education"
              name="educationalLevel"
              placeholder="Select education"
            />
            <!-- Occupation -->
            <BaseInput
              auto-complete="occupation"
              class-name="flex flex-col gap-2"
              label="Occupation"
              name="occupation"
              placeholder="Your occupation"
              type="text"
            />
          </div>

          <!-- Learning Style -->
          <BaseSelect
            :data="['conversational', 'academic', 'example_driven']"
            class-name="lg:col-span-2"
            description="What is your preferred written style AI can offer you?"
            label="Learning Style"
            name="learningStyle"
            placeholder="How do you learn best?"
          />
        </div>

        <!-- Security Section -->
        <div class="signup-stagger-4">
          <SectionDivider label="Security" />
        </div>

        <div class="signup-stagger-4 space-y-5">
          <!-- Password -->
          <BaseInput
            :is-input-group="true"
            auto-complete="new-password"
            class-name="flex flex-col gap-2 lg:col-span-2"
            label="Password"
            name="password"
            placeholder="••••••••••••"
            type="password"
          />

          <!-- Confirm Password -->
          <BaseInput
            :is-input-group="true"
            auto-complete="new-password"
            class-name="flex flex-col gap-2 lg:col-span-2"
            label="Confirm Password"
            name="confirmPassword"
            placeholder="••••••••••••"
            type="password"
          />
        </div>

        <!-- Terms & Submit -->
        <div class="signup-stagger-5 space-y-5">
          <!-- Terms & Conditions -->
          <BaseCheckbox
            id="termsAndConditions"
            name="termsAndConditions"
          >
            I agree to the
            <RouterLink
              class="text-primary hover:text-accent-hover transition-colors"
              to="/terms"
            >
              Terms of Service
            </RouterLink>
            and
            <RouterLink
              class="text-primary hover:text-accent-hover transition-colors"
              to="/privacy"
            >
              Privacy Policy
            </RouterLink>
          </BaseCheckbox>

          <!-- Submit -->
          <Button
            :disabled="isSubmitting"
            class="w-full font-display font-semibold signup-cta"
            size="xl"
            type="submit"
            variant="generate"
          >
            <template v-if="isSubmitting">
              <Loader2 class="size-4 animate-spin" />
              Creating Account...
            </template>
            <template v-else>
              Initialize Account
              <ArrowRight class="size-4" />
            </template>
          </Button>
        </div>
      </form>
    </div>

    <!-- Sign in link -->
    <p class="signup-stagger-5 text-center mt-8 text-sm text-text-sec" style="font-family: var(--font-sans)">
      Already have an account?
      <NuxtLink class="text-accent font-medium hover:underline" to="/login">
        Sign in
      </NuxtLink>
    </p>
  </div>
</template>

<style scoped>
/* Staggered entrance — mirrors HeroSection pattern */
.signup-stagger > * {
  opacity: 0;
  transform: translateY(20px);
}

.signup-stagger.signup-stagger > * {
  animation: signupReveal 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

.signup-stagger-1 {
  animation-delay: 0.1s !important;
}

.signup-stagger-2 {
  animation-delay: 0.2s !important;
}

.signup-stagger-3 {
  animation-delay: 0.35s !important;
}

.signup-stagger-4 {
  animation-delay: 0.5s !important;
}

.signup-stagger-5 {
  animation-delay: 0.65s !important;
}

@keyframes signupReveal {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* CTA shimmer — mirrors hero primary button */
.signup-cta {
  position: relative;
  overflow: hidden;
}

.signup-cta::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent);
  animation: signupShimmer 3s ease-in-out 1.5s infinite;
}

@keyframes signupShimmer {
  0% {
    left: -100%;
  }
  40% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}
</style>
