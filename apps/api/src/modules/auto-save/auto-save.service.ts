import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SupabaseService } from '../../shared/supabase/supabase.service';
import { SuiService } from '../../shared/sui/sui.service';

@Injectable()
export class AutoSaveService {
  private readonly logger = new Logger(AutoSaveService.name);

  constructor(
    private readonly supabase: SupabaseService,
    private readonly sui: SuiService,
  ) {}

  /** Runs daily — checks all auto-save enabled goals and executes due ones. */
  @Cron('0 0 * * *')
  async runAutoSaveJob(): Promise<void> {
    // TODO:
    // 1. Query Supabase for goals with auto_save_enabled = true
    // 2. For each, call check_auto_save_due via SuiService.getObject
    // 3. For due goals, build + submit execute_auto_save PTB via session key
    // 4. Write auto_save_logs record
    // 5. Emit WebSocket event to user if connected
    this.logger.log('Auto-save job triggered — TODO: implement');
  }
}
