export enum AssetType {
  USDC = 0,
  SUI = 1,
}

import { RiskLevel } from './recommendation';
export { RiskLevel };

export interface SavingsGoal {
  id: string;
  objectId: string;
  userId: string;
  nameEncrypted: string;
  targetAmount: string;
  currentBalance: string;
  assetType: AssetType;
  deadline: string;
  autoSaveEnabled: boolean;
  autoSaveAmount: string;
  autoSaveIntervalEpochs: number;
  growModeEnabled: boolean;
  growModeAllocationBps: number;
  completed: boolean;
  walrusMetadataBlobId?: string;
  createdAt: string;
}

export interface GrowOption {
  id: string;
  protocol: string;
  name: string;
  description: string;
  apy: number;
  riskLevel: RiskLevel;
  assetType: AssetType;
}

export interface GrowModePosition {
  id: string;
  goalId: string;
  protocol: string;
  positionObjectId: string;
  allocatedAmount: string;
  currentValue: string;
}

export interface Transaction {
  id: string;
  goalId: string;
  type: 'deposit' | 'withdrawal' | 'auto_save' | 'grow_allocate' | 'grow_return';
  amount: string;
  assetType: AssetType;
  txDigest: string;
  epoch: number;
  createdAt: string;
}
