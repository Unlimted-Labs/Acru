import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import Anthropic from '@anthropic-ai/sdk';
import { ConfigService } from '@nestjs/config';
import { SupabaseService } from '../../shared/supabase/supabase.service';
import { SuiService } from '../../shared/sui/sui.service';
import { WalrusService } from '../../shared/walrus/walrus.service';

@Injectable()
export class PassportService {
  private readonly logger = new Logger(PassportService.name);
  private readonly anthropic: Anthropic;

  constructor(
    private readonly config: ConfigService,
    private readonly supabase: SupabaseService,
    private readonly sui: SuiService,
    private readonly walrus: WalrusService,
  ) {
    this.anthropic = new Anthropic({
      apiKey: this.config.getOrThrow<string>('ANTHROPIC_API_KEY'),
    });
  }

  async getPassport(_userId: string): Promise<unknown> {
    // TODO: get SavingsPassport object from Sui, fetch Walrus blob, return for client-side Seal decrypt
    return { todo: true };
  }

  async generateSnapshot(_userId: string): Promise<unknown> {
    // TODO:
    // 1. Fetch transaction history + goal completions from Supabase
    // 2. Call Claude API for 2-paragraph narrative
    // 3. Seal-encrypt summary
    // 4. PUT to Walrus: ${WALRUS_PUBLISHER_URL}/v1/blobs?epochs=52
    // 5. Call update_passport_blob onchain with returned blob ID
    // 6. Upsert passport_snapshots in Supabase
    return { todo: true };
  }

  /** Weekly snapshot generation for all active users. */
  @Cron('0 0 * * 0')
  async runWeeklySnapshot(): Promise<void> {
    this.logger.log('Weekly passport snapshot job triggered — TODO: implement');
  }
}
