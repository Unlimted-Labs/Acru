'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/api';
import { QUERY_KEYS } from '../lib/constants';
import type { AIRecommendation } from '@acru/shared';

export function useRecommendations() {
  return useQuery({
    queryKey: QUERY_KEYS.recommendations,
    queryFn: async () => {
      const res = await apiClient.get<AIRecommendation[]>('/v1/ai/recommendations');
      return res.data;
    },
  });
}

export function useActionRecommendation(recommendationId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (approved: boolean) => {
      const res = await apiClient.post(`/v1/ai/recommendations/${recommendationId}/action`, { approved });
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.recommendations }),
  });
}
