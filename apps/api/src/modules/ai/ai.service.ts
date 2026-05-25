import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import Anthropic from '@anthropic-ai/sdk';
import { ConfigService } from '@nestjs/config';
import { SupabaseService } from '../../shared/supabase/supabase.service';
import { MemWalService } from '../../shared/memwal/memwal.service';

@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name);
  private readonly anthropic: Anthropic;

  constructor(
    private readonly config: ConfigService,
    private readonly supabase: SupabaseService,
    private readonly memwal: MemWalService,
  ) {
    this.anthropic = new Anthropic({
      apiKey: this.config.getOrThrow<string>('ANTHROPIC_API_KEY'),
    });
  }

  /** Every 4 hours, generate fresh recommendations for all active users. */
  @Cron('0 */4 * * *')
  async runRecommendationJob(): Promise<void> {
    // TODO:
    // 1. Fetch active users from Supabase
    // 2. For each user, fetch portfolio state, Pyth prices, grow APYs
    // 3. Load agent context from MemWal (past recommendations, user behavior)
    // 4. Call Claude API with structured prompt
    // 5. Parse response, upsert recommendations in Supabase
    // 6. Update MemWal context with new recommendation cycle
    this.logger.log('AI recommendation job triggered — TODO: implement');
  }

  async getRecommendations(userId: string): Promise<unknown[]> {
    // TODO: query Supabase recommendations WHERE user_id = userId AND actioned = false LIMIT 5
    return [];
  }

  async actionRecommendation(_userId: string, _recommendationId: string, _approved: boolean): Promise<unknown> {
    // TODO: if approved, read action_payload, route to GoalsService/GrowModeService/AutoSaveService
    // TODO: write recommendation_actions record
    // TODO: update MemWal context with user decision
    return { todo: true };
  }
}
