import { useAuthStore } from "~/stores/useAuthStore";

export const useAuthSession = () => {
  const authStore = useAuthStore();

  return useAsyncData("auth-session", () => authStore.refreshSession());
};
