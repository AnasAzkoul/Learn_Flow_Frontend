import { fetchFactory } from "./fetchFactory";
import { createAuthRepository } from "./repositories";

export type { ApiFetch, ApiFetchOptions } from "./fetchFactory";
export { ApiError, normalizeApiError } from "./errors";
export { createAuthRepository, type AuthRepository } from "./repositories";
export type {
  ApiErrorShape,
  AuthCredentialsResponse,
  AuthSession,
  AuthSessionRecord,
  AuthUser,
  SignupEducationalLevel,
  SignupGender,
  SignupLearningStyle,
  SignupRequest,
} from "./types";

export const createApi = () => {
  const apiFetch = fetchFactory();

  return {
    auth: createAuthRepository(apiFetch),
  };
};

export type Api = ReturnType<typeof createApi>;
