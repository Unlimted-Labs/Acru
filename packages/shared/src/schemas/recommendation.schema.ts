import { z } from 'zod';
import { RecommendationType, RiskLevel } from '../types/recommendation';

export const RecommendationResponseSchema = z.object({
  type: z.nativeEnum(RecommendationType),
  title: z.string().max(60),
  body: z.string(),
  expectedOutcome: z.string(),
  riskLevel: z.nativeEnum(RiskLevel),
  actionPayload: z.object({
    type: z.nativeEnum(RecommendationType),
    goalId: z.string().optional(),
    protocol: z.string().optional(),
    amount: z.string().optional(),
    allocationBps: z.number().int().min(0).max(10000).optional(),
    autoSaveAmount: z.string().optional(),
    autoSaveIntervalEpochs: z.number().int().positive().optional(),
    targetAssetType: z.number().int().min(0).max(1).optional(),
  }),
});

export const RecommendationActionSchema = z.object({
  approved: z.boolean(),
});

export type RecommendationResponse = z.infer<typeof RecommendationResponseSchema>;
export type RecommendationActionInput = z.infer<typeof RecommendationActionSchema>;
