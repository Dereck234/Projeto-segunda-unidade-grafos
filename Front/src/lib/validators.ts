const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function sanitizeText(value: string) {
  return value.trim();
}

export function validateEmail(email: string): string | undefined {
  if (email.trim().length === 0) {
    return 'O e-mail é obrigatório.';
  }

  if (!emailPattern.test(email.trim())) {
    return 'Insira um e-mail válido.';
  }

  return undefined;
}

export function validatePassword(password: string): string | undefined {
  if (password.length === 0) {
    return 'A senha é obrigatória.';
  }

  if (password.length < 8) {
    return 'A senha deve ter ao menos 8 caracteres.';
  }

  return undefined;
}
