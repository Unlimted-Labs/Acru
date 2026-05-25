import { Injectable } from '@nestjs/common';
import { SuiService } from '../../shared/sui/sui.service';
import { SupabaseService } from '../../shared/supabase/supabase.service';

export interface GrowOptionDto {
  id: string;
  protocol: string;
  name: string;
  description: string;
  apy: number;
  riskLevel: 'low' | 'medium' | 'high';
  assetType: number;
}

@Injectable()
export class GrowModeService {
  constructor(
    private readonly sui: SuiService,
    private readonly supabase: SupabaseService,
  ) {}

  async getOptions(): Promise<GrowOptionDto[]> {
    // TODO: fetch live APYs from Aftermath, Navi, DeepBook
    return [
      {
        id: 'aftermath-asui',
        protocol: 'Aftermath Finance',
        name: 'SUI Liquid Staking',
        description: 'Stake SUI for aSUI and earn liquid staking yield via Aftermath Finance.',
        apy: 0,
        riskLevel: 'low',
        assetType: 1,
      },
      {
        id: 'navi-usdc',
        protocol: 'Navi Protocol',
        name: 'USDC Yield',
        description: 'Supply USDC to Navi Protocol lending pool and earn variable interest.',
        apy: 0,
        riskLevel: 'low',
        assetType: 0,
      },
      {
        id: 'deepbook-lp',
        protocol: 'DeepBook',
        name: 'SUI/USDC LP',
        description: 'Provide liquidity to DeepBook SUI/USDC pool and earn trading fees.',
        apy: 0,
        riskLevel: 'medium',
        assetType: 1,
      },
    ];
  }

  async allocate(_userId: string, _goalId: string, _protocol: string, _amount: string): Promise<unknown> {
    // TODO: build atomic PTB: allocate_to_grow → protocol stake/supply/LP
    return { todo: true };
  }

  async withdrawFromProtocol(_userId: string, _goalId: string, _protocol: string): Promise<unknown> {
    // TODO: build reverse PTB: protocol withdraw → return_from_grow
    return { todo: true };
  }
}
