import { useNuxtApp } from "#app";
import { acceptHMRUpdate, defineStore } from "pinia";
import { computed, ref, shallowRef } from "vue";

import { normalizeApiError } from "~/services/api";
import type { ApiErrorShape, AuthSession, SignupRequest } from "~/services/api";

export type AuthStatus =
  | "idle"
  | "loading"
  | "authenticated"
  | "unauthenticated"
  | "error";

export type LoginRequest = {
  email: string;
  password: string;
};

const toApiErrorShape = (error: unknown): ApiErrorShape => {
  const normalizedError = normalizeApiError(error);

  return {
    status: normalizedError.status,
    code: normalizedError.code,
    message: normalizedError.message,
    details: normalizedError.details,
  };
};

const getInitials = (value: string): string =>
  value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export const useAuthStore = defineStore("auth", () => {
  const { $api } = useNuxtApp();

  const session = shallowRef<AuthSession | null>(null);
  const status = shallowRef<AuthStatus>("idle");
  const error = ref<ApiErrorShape | null>(null);
  const hasLoadedSession = shallowRef(false);

  const user = computed(() => session.value?.user ?? null);
  const isAuthenticated = computed(() => Boolean(session.value));
  const isLoading = computed(() => status.value === "loading");
  const isError = computed(() => status.value === "error");
  const displayName = computed(
    () => user.value?.fullName ?? user.value?.name ?? user.value?.email ?? "User",
  );
  const userInitials = computed(() => {
    const source = displayName.value || user.value?.email || "User";
    const initials = getInitials(source);

    return initials || "U";
  });

  function resetError() {
    error.value = null;

    if (status.value === "error") {
      status.value = session.value ? "authenticated" : "unauthenticated";
    }
  }

  function setSession(nextSession: AuthSession | null) {
    session.value = nextSession;
    hasLoadedSession.value = true;
    error.value = null;
    status.value = nextSession ? "authenticated" : "unauthenticated";
  }

  function setError(nextError: unknown) {
    error.value = toApiErrorShape(nextError);
    status.value = "error";
  }

  async function refreshSession(): Promise<AuthSession | null> {
    status.value = "loading";
    error.value = null;

    try {
      const nextSession = await $api.auth.getSession();

      setSession(nextSession);

      return nextSession;
    } catch (nextError) {
      hasLoadedSession.value = true;
      setError(nextError);
      throw normalizeApiError(nextError);
    }
  }

  async function login(payload: LoginRequest): Promise<AuthSession | null> {
    status.value = "loading";
    error.value = null;

    try {
      await $api.auth.login(payload.email, payload.password);

      return await refreshSession();
    } catch (nextError) {
      setError(nextError);
      throw normalizeApiError(nextError);
    }
  }

  async function signup(payload: SignupRequest): Promise<AuthSession | null> {
    status.value = "loading";
    error.value = null;

    try {
      await $api.auth.signup(payload);

      return await refreshSession();
    } catch (nextError) {
      setError(nextError);
      throw normalizeApiError(nextError);
    }
  }

  async function signOut(): Promise<void> {
    status.value = "loading";
    error.value = null;

    try {
      await $api.auth.signOut();
      session.value = null;
      hasLoadedSession.value = true;
      status.value = "unauthenticated";
    } catch (nextError) {
      setError(nextError);
      throw normalizeApiError(nextError);
    }
  }

  function $reset() {
    session.value = null;
    status.value = "idle";
    error.value = null;
    hasLoadedSession.value = false;
  }

  return {
    session,
    status,
    error,
    hasLoadedSession,
    user,
    isAuthenticated,
    isLoading,
    isError,
    displayName,
    userInitials,
    refreshSession,
    login,
    signup,
    signOut,
    resetError,
    $reset,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
