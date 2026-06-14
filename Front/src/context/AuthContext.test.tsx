import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect } from 'vitest';
import { AuthProvider } from './AuthContext';
import { useAuth } from './useAuth';
import React from 'react';

function Consumer() {
  const { isAuthenticated, user, signIn, signOut } = useAuth();
  return (
    <div>
      <div>auth:{String(isAuthenticated)}</div>
      <div>user:{user?.email ?? 'none'}</div>
      <button onClick={() => signIn({ email: 'usuario@exemplo.com', password: 'SenhaForte123', remember: true })}>signin</button>
      <button onClick={() => signOut()}>signout</button>
    </div>
  );
}

test('sign in and out via AuthProvider', async () => {
  render(
    <AuthProvider>
      <Consumer />
    </AuthProvider>
  );

  expect(screen.queryByText(/auth:false/)).toBeTruthy();
  expect(screen.queryByText(/user:none/)).toBeTruthy();

  await userEvent.click(screen.getByText('signin'));

  await waitFor(() => expect(screen.queryByText(/auth:true/)).toBeTruthy(), { timeout: 2000 });
  expect(screen.queryByText(/user:usuario@exemplo.com/)).toBeTruthy();

  await userEvent.click(screen.getByText('signout'));

  await waitFor(() => expect(screen.queryByText(/auth:false/)).toBeTruthy());
});
