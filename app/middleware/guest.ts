import { useAuthStore } from "~/stores/useAuthStore";

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore();

  await authStore.ensureSessionLoaded();

  if (authStore.isAuthenticated) {
    return navigateTo("/dashboard");
  }
});
