'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/api';
import { QUERY_KEYS } from '../lib/constants';
import type { SavingsGoal } from '@acru/shared';
import type { CreateGoalInput, DepositInput, WithdrawInput } from '@acru/shared';

export function useGoals() {
  return useQuery({
    queryKey: QUERY_KEYS.goals,
    queryFn: async () => {
      const res = await apiClient.get<SavingsGoal[]>('/v1/goals');
      return res.data;
    },
  });
}

export function useGoal(goalId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.goal(goalId),
    queryFn: async () => {
      const res = await apiClient.get<SavingsGoal>(`/v1/goals/${goalId}`);
      return res.data;
    },
    enabled: !!goalId,
  });
}

export function useCreateGoal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateGoalInput) => {
      const res = await apiClient.post<SavingsGoal>('/v1/goals', data);
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.goals }),
  });
}

export function useDeposit(goalId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: DepositInput) => {
      const res = await apiClient.post(`/v1/goals/${goalId}/deposit`, data);
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.goal(goalId) }),
  });
}

export function useWithdraw(goalId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: WithdrawInput) => {
      const res = await apiClient.post(`/v1/goals/${goalId}/withdraw`, data);
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.goal(goalId) }),
  });
}
