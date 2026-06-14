import type {
  AuthCredentials,
  AuthUser,
  ForgotPasswordPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from '../types/auth';

const simulateRequest = (delay = 600) =>
  new Promise<void>((resolve) => setTimeout(resolve, delay));

const createDemoUser = (email: string, provider: 'email' | 'google' | 'github'): AuthUser => ({
  id: 'user-1',
  fullName: 'Marina Costa',
  username: provider === 'email' ? 'marina.costa' : `user.${provider}`,
  email,
  avatarUrl:
    provider === 'github'
      ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80'
      : 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=256&q=80',
  provider,
});

export async function signInWithEmail(credentials: AuthCredentials): Promise<{ token: string; user: AuthUser }> {
  await simulateRequest();

  const email = credentials.email.trim().toLowerCase();
  const password = credentials.password.trim();

  if (email !== 'usuario@exemplo.com' || password !== 'SenhaForte123') {
    throw new Error('E-mail ou senha inválidos. Verifique seus dados e tente novamente.');
  }

  return {
    token: 'demo-token-email',
    user: createDemoUser(email, 'email'),
  };
}

export async function signInWithProvider(provider: 'google' | 'github'): Promise<{ token: string; user: AuthUser }> {
  await simulateRequest();

  const email = provider === 'google' ? 'google@exemplo.com' : 'github@exemplo.com';

  return {
    token: `demo-token-${provider}`,
    user: createDemoUser(email, provider),
  };
}

export async function signUp(payload: RegisterPayload): Promise<{ token: string; user: AuthUser }> {
  await simulateRequest();

  if (payload.password !== payload.confirmPassword) {
    throw new Error('As senhas não correspondem. Por favor, confirme novamente.');
  }

  if (!payload.acceptTerms || !payload.acceptPrivacy) {
    throw new Error('Você deve aceitar os Termos de Uso e a Política de Privacidade para continuar.');
  }

  return {
    token: 'demo-token-register',
    user: {
      id: 'user-2',
      fullName: payload.fullName,
      username: payload.username,
      email: payload.email.trim().toLowerCase(),
      avatarUrl:
        payload.avatar instanceof File
          ? URL.createObjectURL(payload.avatar)
          : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
      provider: 'email',
    },
  };
}

export async function requestPasswordReset(payload: ForgotPasswordPayload): Promise<{ message: string }> {
  await simulateRequest();

  if (!payload.email.includes('@')) {
    throw new Error('Informe um e-mail válido para recuperação de senha.');
  }

  return {
    message: 'O link de redefinição foi enviado para o seu e-mail. Verifique sua caixa de entrada.',
  };
}

export async function resetPassword(payload: ResetPasswordPayload): Promise<{ message: string }> {
  await simulateRequest();

  if (payload.password.length < 8) {
    throw new Error('A senha deve ter pelo menos 8 caracteres.');
  }

  if (payload.password !== payload.confirmPassword) {
    throw new Error('As senhas não correspondem.');
  }

  return { message: 'Senha redefinida com sucesso. Você já pode fazer login novamente.' };
}
