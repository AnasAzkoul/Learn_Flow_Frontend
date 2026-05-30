import type { ApiErrorShape } from "./types";

export class ApiError extends Error implements ApiErrorShape {
  status?: number;
  code?: string;
  details?: unknown;

  constructor({ status, code, message, details }: ApiErrorShape) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const getString = (value: unknown): string | undefined =>
  typeof value === "string" && value.length > 0 ? value : undefined;

const getNumber = (value: unknown): number | undefined =>
  typeof value === "number" ? value : undefined;

const getNestedRecord = (
  value: Record<string, unknown>,
  key: string,
): Record<string, unknown> | undefined => {
  const nested = value[key];

  return isRecord(nested) ? nested : undefined;
};

export const normalizeApiError = (
  error: unknown,
  fallbackMessage = "Something went wrong. Please try again.",
): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }

  if (!isRecord(error)) {
    return new ApiError({ message: fallbackMessage, details: error });
  }

  const response = getNestedRecord(error, "response");
  const responseData = response?._data;
  const data = isRecord(responseData)
    ? responseData
    : getNestedRecord(error, "data");
  const nestedError = data ? getNestedRecord(data, "error") : undefined;

  const status =
    getNumber(response?.status) ??
    getNumber(error.status) ??
    getNumber(error.statusCode);
  const code =
    getString(data?.code) ??
    getString(nestedError?.code) ??
    getString(error.code);
  const message =
    getString(data?.message) ??
    getString(nestedError?.message) ??
    getString(error.statusMessage) ??
    getString(response?.statusText) ??
    getString(error.message) ??
    fallbackMessage;
  const details = data?.details ?? nestedError?.details ?? data ?? error;

  return new ApiError({
    status,
    code,
    message,
    details,
  });
};
