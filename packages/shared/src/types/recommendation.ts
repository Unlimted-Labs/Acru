export enum RecommendationType {
  REBALANCE = 'rebalance',
  GROW_ALLOCATE = 'grow_allocate',
  GROW_WITHDRAW = 'grow_withdraw',
  AUTO_SAVE_ADJUST = 'auto_save_adjust',
  CURRENCY_SWITCH = 'currency_switch',
  ALERT = 'alert',
}

export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export interface ActionPayload {
  type: RecommendationType;
  goalId?: string;
  protocol?: string;
  amount?: string;
  allocationBps?: number;
  autoSaveAmount?: string;
  autoSaveIntervalEpochs?: number;
  targetAssetType?: number;
}

export interface AIRecommendation {
  id: string;
  userId: string;
  type: RecommendationType;
  title: string;
  body: string;
  expectedOutcome: string;
  riskLevel: RiskLevel;
  actionPayload: ActionPayload;
  actioned: boolean;
  approved: boolean;
  createdAt: string;
}
