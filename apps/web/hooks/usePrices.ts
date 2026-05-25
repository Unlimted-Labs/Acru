'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api';
import { QUERY_KEYS } from '../lib/constants';

export interface PriceData {
  sui: { price: number; change24h: number; volatility: number };
  usdc: { price: number };
  fetchedAt: string;
}

export function usePrices() {
  return useQuery({
    queryKey: QUERY_KEYS.prices,
    queryFn: async () => {
      const res = await apiClient.get<PriceData>('/v1/prices');
      return res.data;
    },
    refetchInterval: 30_000,
    staleTime: 25_000,
  });
}
