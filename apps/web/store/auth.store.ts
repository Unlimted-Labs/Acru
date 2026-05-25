import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthUser {
  userId: string;
  walletAddress: string;
}

interface AuthState {
  user: AuthUser | null;
  jwt: string | null;
  setUser: (user: AuthUser, jwt: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      jwt: null,
      setUser: (user, jwt) => set({ user, jwt }),
      logout: () => set({ user: null, jwt: null }),
    }),
    { name: 'acru-auth' },
  ),
);
