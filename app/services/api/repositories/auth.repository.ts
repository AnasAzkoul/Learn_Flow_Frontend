import type { ApiFetch } from "../fetchFactory";
import type {
  AuthCredentialsResponse,
  AuthSession,
  SignupRequest,
} from "../types";

export const createAuthRepository = (apiFetch: ApiFetch) => ({
  login(
    email: string,
    password: string,
  ): Promise<AuthCredentialsResponse> {
    return apiFetch<AuthCredentialsResponse>("/auth/sign-in/email", {
      method: "POST",
      body: {
        email,
        password,
      },
    });
  },

  signup(payload: SignupRequest): Promise<AuthCredentialsResponse> {
    const {
      fullName,
      email,
      password,
      occupation,
      birthDate,
      gender,
      educationalLevel,
      learningStyle,
      termsAndConditions,
    } = payload;

    return apiFetch<AuthCredentialsResponse>("/auth/sign-up/email", {
      method: "POST",
      body: {
        name: fullName,
        email,
        password,
        occupation,
        birthDate,
        gender,
        educationalLevel,
        learningStyle,
        termsAndConditions,
      },
    });
  },

  async getSession(): Promise<AuthSession | null> {
    const session = await apiFetch<AuthSession | null>("/auth/get-session", {
      method: "GET",
    });

    return session ?? null;
  },

  async signOut(): Promise<void> {
    await apiFetch<{ success: boolean }>("/auth/sign-out", {
      method: "POST",
      body: {},
    });
  },
});

export type AuthRepository = ReturnType<typeof createAuthRepository>;
