import { useAuthStore } from "~/stores/useAuthStore";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  await authStore.ensureSessionLoaded();

  if (!authStore.isAuthenticated) {
    return navigateTo({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  }
});
