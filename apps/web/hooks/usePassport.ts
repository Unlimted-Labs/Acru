'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/api';
import { QUERY_KEYS } from '../lib/constants';
import type { PassportSummary } from '@acru/shared';

export function usePassport() {
  return useQuery({
    queryKey: QUERY_KEYS.passport,
    queryFn: async () => {
      const res = await apiClient.get<PassportSummary>('/v1/passport');
      return res.data;
    },
  });
}

export function useGenerateSnapshot() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await apiClient.post('/v1/passport/snapshot');
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.passport }),
  });
}
