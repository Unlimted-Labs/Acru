'use client';

import { createContext, useContext } from 'react';
import { useAuthStore } from '../../store/auth.store';
import type { AuthUser } from '../../store/auth.store';

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue>({ user: null, isAuthenticated: false });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
