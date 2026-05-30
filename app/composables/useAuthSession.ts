export const useAuthSession = () => {
  const { $api } = useNuxtApp();

  return useAsyncData("auth-session", () => $api.auth.getSession());
};
