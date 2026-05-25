import { z } from 'zod';

export const CreateGoalSchema = z.object({
  name: z.string().min(1).max(100),
  notes: z.string().max(500).optional(),
  targetAmount: z.string().regex(/^\d+(\.\d+)?$/),
  assetType: z.number().int().min(0).max(1),
  deadline: z.string().datetime(),
  autoSaveEnabled: z.boolean().default(false),
  autoSaveAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  autoSaveIntervalEpochs: z.number().int().positive().optional(),
  growModeEnabled: z.boolean().default(false),
  growModeAllocationBps: z.number().int().min(0).max(10000).optional(),
});

export const UpdateAutoSaveSchema = z.object({
  autoSaveEnabled: z.boolean(),
  autoSaveAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  autoSaveIntervalEpochs: z.number().int().positive().optional(),
});

export const UpdateGrowModeSchema = z.object({
  growModeEnabled: z.boolean(),
  growModeAllocationBps: z.number().int().min(0).max(10000).optional(),
});

export const DepositSchema = z.object({
  amount: z.string().regex(/^\d+(\.\d+)?$/),
  assetType: z.number().int().min(0).max(1),
});

export const WithdrawSchema = z.object({
  amount: z.string().regex(/^\d+(\.\d+)?$/),
  assetType: z.number().int().min(0).max(1),
});

export type CreateGoalInput = z.infer<typeof CreateGoalSchema>;
export type UpdateAutoSaveInput = z.infer<typeof UpdateAutoSaveSchema>;
export type UpdateGrowModeInput = z.infer<typeof UpdateGrowModeSchema>;
export type DepositInput = z.infer<typeof DepositSchema>;
export type WithdrawInput = z.infer<typeof WithdrawSchema>;
