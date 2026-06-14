export type AuthProvider = 'google' | 'github';

export interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export type FieldErrors = {
  email?: string;
  password?: string;
};

export type AuthUser = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  avatarUrl: string;
  provider: 'email' | 'google' | 'github';
};

export type AuthCredentials = {
  email: string;
  password: string;
  remember: boolean;
};

export type RegisterPayload = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar?: File | null;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  token: string;
  password: string;
  confirmPassword: string;
};

export type AuthState = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
};

export type AuthContextValue = AuthState & {
  signIn: (credentials: AuthCredentials) => Promise<void>;
  signUp: (payload: RegisterPayload) => Promise<void>;
  signOut: () => void;
  requestPasswordReset: (payload: ForgotPasswordPayload) => Promise<{ message: string }>;
  resetPassword: (payload: ResetPasswordPayload) => Promise<{ message: string }>;
  signInWithProvider: (provider: AuthProvider) => Promise<void>;
};
