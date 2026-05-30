import { createApi, type Api } from "~/services/api";

declare module "#app" {
  interface NuxtApp {
    $api: Api;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $api: Api;
  }
}

export default defineNuxtPlugin(() => {
  const api = createApi();

  return {
    provide: {
      api,
    },
  };
});
