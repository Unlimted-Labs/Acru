export interface SavingsPassport {
  objectId: string;
  owner: string;
  version: number;
  walrusBlobId: string;
}

export interface PassportSnapshot {
  id: string;
  userId: string;
  walrusBlobId: string;
  onchainVersion: number;
  createdAt: string;
}

export interface PassportEvent {
  id: string;
  type: 'goal_created' | 'deposit' | 'withdrawal' | 'goal_completed' | 'grow_allocate' | 'grow_return' | 'recommendation_approved' | 'snapshot_generated';
  title: string;
  description: string;
  amount?: string;
  assetType?: number;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface PassportSummary {
  walletAddress: string;
  accountCreatedAt: string;
  goalsCompleted: number;
  totalSaved: string;
  latestNarrative: string;
  events: PassportEvent[];
}
