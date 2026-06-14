import { useContext } from 'react';
import type { AuthContextValue } from '../types/auth';
import { AuthContext } from './auth-context';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context as AuthContextValue;
}
