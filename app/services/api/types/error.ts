export type ApiErrorShape = {
  status?: number;
  code?: string;
  message: string;
  details?: unknown;
};
