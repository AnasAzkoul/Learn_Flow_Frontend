import { toast } from "vue-sonner";

import { normalizeApiError } from "~/services/api";
import { useAuthStore } from "~/stores/useAuthStore";

export function useAuthSignOut() {
  const authStore = useAuthStore();

  async function signOutAndRedirect() {
    try {
      await authStore.signOut();
      await navigateTo("/login");
    } catch (error) {
      const normalizedError = normalizeApiError(error);

      toast.error(normalizedError.message || "Sign out failed. Please try again.");
    }
  }

  return {
    signOutAndRedirect,
  };
}
