import { useRequestHeaders, useRuntimeConfig } from "#app";

import { normalizeApiError } from "./errors";

export type ApiFetchOptions = NonNullable<Parameters<typeof $fetch>[1]>;
export type ApiFetch = <TResponse>(
  endpoint: string,
  options?: ApiFetchOptions,
) => Promise<TResponse>;

export const fetchFactory = (): ApiFetch => {
  const config = useRuntimeConfig();
  const headers = import.meta.server ? useRequestHeaders(["cookie"]) : undefined;
  const apiFetch = $fetch.create({
    baseURL: config.public.apiUrl,
    credentials: "include",
    headers,
    onRequestError({ error }) {
      throw normalizeApiError(error);
    },
    onResponseError({ response }) {
      throw normalizeApiError({ response });
    },
  });

  return apiFetch as ApiFetch;
};
