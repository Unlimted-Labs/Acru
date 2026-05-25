import { z } from 'zod';

export const ZkLoginVerifySchema = z.object({
  jwt: z.string().min(1),
  walletAddress: z.string().min(1),
  ephemeralPublicKey: z.string().min(1),
  zkProof: z.record(z.unknown()),
});

export const NonceRequestSchema = z.object({
  ephemeralPublicKey: z.string().min(1),
  maxEpoch: z.number().int().positive(),
});

export type ZkLoginVerifyInput = z.infer<typeof ZkLoginVerifySchema>;
export type NonceRequestInput = z.infer<typeof NonceRequestSchema>;
