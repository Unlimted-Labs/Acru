import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../shared/supabase/supabase.service';
import { SuiService } from '../../shared/sui/sui.service';
import { WalrusService } from '../../shared/walrus/walrus.service';
import type { CreateGoalDto, DepositDto, WithdrawDto, UpdateAutoSaveDto, UpdateGrowModeDto } from './dto/create-goal.dto';

@Injectable()
export class GoalsService {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly sui: SuiService,
    private readonly walrus: WalrusService,
  ) {}

  async findAll(_userId: string): Promise<unknown[]> {
    // TODO: query Supabase goals WHERE user_id = userId
    return [];
  }

  async findOne(_userId: string, _goalId: string): Promise<unknown> {
    // TODO: combine Supabase cache + SuiService.getObject for live state
    return null;
  }

  async create(_userId: string, _walletAddress: string, _dto: CreateGoalDto): Promise<unknown> {
    // TODO: Seal-encrypt metadata, build + submit create_goal PTB, upsert Supabase
    return { todo: true };
  }

  async deposit(_userId: string, _goalId: string, _dto: DepositDto): Promise<unknown> {
    // TODO: build deposit PTB (with optional DeepBook swap for cross-currency)
    return { todo: true };
  }

  async withdraw(_userId: string, _goalId: string, _dto: WithdrawDto): Promise<unknown> {
    // TODO: build withdraw PTB
    return { todo: true };
  }

  async updateAutoSave(_userId: string, _goalId: string, _dto: UpdateAutoSaveDto): Promise<unknown> {
    // TODO: update onchain + Supabase
    return { todo: true };
  }

  async updateGrowMode(_userId: string, _goalId: string, _dto: UpdateGrowModeDto): Promise<unknown> {
    // TODO: update onchain + Supabase
    return { todo: true };
  }
}
