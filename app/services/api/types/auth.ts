export type SignupGender = "male" | "female" | "other" | "prefer_not_to_say";

export type SignupEducationalLevel =
  | "primary"
  | "secondary"
  | "tertiary"
  | "diploma"
  | "degree"
  | "master"
  | "phd";

export type SignupLearningStyle =
  | "conversational"
  | "academic"
  | "example_driven";

export interface SignupRequest {
  fullName: string;
  email: string;
  occupation: string;
  birthDate: string;
  gender: SignupGender;
  educationalLevel: SignupEducationalLevel;
  learningStyle: SignupLearningStyle;
  password: string;
  termsAndConditions: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  emailVerified?: boolean;
  fullName?: string | null;
  name?: string | null;
  image?: string | null;
  occupation?: string | null;
  birthDate?: string | null;
  gender?: SignupGender | null;
  educationalLevel?: SignupEducationalLevel | null;
  learningStyle?: SignupLearningStyle | null;
  termsAndConditions?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface AuthSessionRecord {
  id: string;
  userId: string;
  expiresAt: string | Date;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export interface AuthSession {
  user: AuthUser;
  session: AuthSessionRecord;
}

export interface AuthCredentialsResponse {
  token?: string | null;
  redirect?: boolean;
  url?: string | null;
  user: AuthUser;
}
