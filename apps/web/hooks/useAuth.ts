'use client';

import { useAuthStore } from '../store/auth.store';
import { apiClient } from '../lib/api';

export function useAuth() {
  const { user, jwt, setUser, logout } = useAuthStore();

  const verifyZkLogin = async (payload: {
    jwt: string;
    walletAddress: string;
    ephemeralPublicKey: string;
    zkProof: Record<string, unknown>;
  }) => {
    // TODO: POST /v1/auth/verify, store returned JWT
    const res = await apiClient.post<{ accessToken: string }>('/v1/auth/verify', payload);
    return res.data;
  };

  const getNonce = async (ephemeralPublicKey: string, maxEpoch: number) => {
    // TODO: GET /v1/auth/nonce
    const res = await apiClient.post<{ nonce: string }>('/v1/auth/nonce', { ephemeralPublicKey, maxEpoch });
    return res.data.nonce;
  };

  return { user, jwt, isAuthenticated: !!user, setUser, logout, verifyZkLogin, getNonce };
}
