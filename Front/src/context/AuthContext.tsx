import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type {
  AuthCredentials,
  AuthState,
  AuthUser,
  ForgotPasswordPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from '../types/auth';
import { AuthContext } from './auth-context';
import * as authService from '../services/auth';

const STORAGE_USER = 'booksauth:user';
const STORAGE_TOKEN = 'booksauth:token';

const defaultState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
};

function initializeAuthState(): AuthState {
  const userJson = localStorage.getItem(STORAGE_USER) ?? sessionStorage.getItem(STORAGE_USER);
  const token = localStorage.getItem(STORAGE_TOKEN) ?? sessionStorage.getItem(STORAGE_TOKEN);

  if (userJson && token) {
    try {
      const user = JSON.parse(userJson) as AuthUser;
      return { user, token, isAuthenticated: true, loading: false };
    } catch {
      localStorage.removeItem(STORAGE_USER);
      localStorage.removeItem(STORAGE_TOKEN);
      sessionStorage.removeItem(STORAGE_USER);
      sessionStorage.removeItem(STORAGE_TOKEN);
    }
  }

  return { ...defaultState, loading: false };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(initializeAuthState);

  const persistSession = useCallback((user: AuthUser, token: string, remember: boolean) => {
    setState({ user, token, isAuthenticated: true, loading: false });

    if (remember) {
      localStorage.setItem(STORAGE_USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_TOKEN, token);
      sessionStorage.removeItem(STORAGE_USER);
      sessionStorage.removeItem(STORAGE_TOKEN);
    } else {
      sessionStorage.setItem(STORAGE_USER, JSON.stringify(user));
      sessionStorage.setItem(STORAGE_TOKEN, token);
      localStorage.removeItem(STORAGE_USER);
      localStorage.removeItem(STORAGE_TOKEN);
    }
  }, []);

  const signIn = useCallback(async (credentials: AuthCredentials) => {
    const response = await authService.signInWithEmail(credentials);
    persistSession(response.user, response.token, credentials.remember);
  }, [persistSession]);

  const signInWithProvider = useCallback(async (provider: 'google' | 'github') => {
    const response = await authService.signInWithProvider(provider);
    persistSession(response.user, response.token, true);
  }, [persistSession]);

  const signUp = useCallback(async (payload: RegisterPayload) => {
    const response = await authService.signUp(payload);
    persistSession(response.user, response.token, true);
  }, [persistSession]);

  const requestPasswordReset = useCallback(async (payload: ForgotPasswordPayload) => {
    return authService.requestPasswordReset(payload);
  }, []);

  const resetPassword = useCallback(async (payload: ResetPasswordPayload) => {
    return authService.resetPassword(payload);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(STORAGE_USER);
    localStorage.removeItem(STORAGE_TOKEN);
    sessionStorage.removeItem(STORAGE_USER);
    sessionStorage.removeItem(STORAGE_TOKEN);
    setState({ ...defaultState, loading: false });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      signIn,
      signInWithProvider,
      signUp,
      signOut,
      requestPasswordReset,
      resetPassword,
    }),
    [state, signIn, signInWithProvider, signUp, signOut, requestPasswordReset, resetPassword]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// AuthProvider is exposed from this module; useAuth hook is defined in src/context/useAuth.ts
