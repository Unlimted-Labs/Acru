import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SuiService } from '../../shared/sui/sui.service';
import { SupabaseService } from '../../shared/supabase/supabase.service';

@Injectable()
export class EventIndexerService {
  private readonly logger = new Logger(EventIndexerService.name);

  constructor(
    private readonly sui: SuiService,
    private readonly supabase: SupabaseService,
  ) {}

  /** Poll for new acru package events every 30 seconds. */
  @Cron('*/30 * * * * *')
  async pollEvents(): Promise<void> {
    // TODO:
    // 1. Read last_event_cursor from indexer_state (id=1)
    // 2. SuiService.queryEvents({ MoveEventModule: { package: ACRU_PACKAGE_ID } }, cursor)
    // 3. For each event, upsert Supabase record based on event type:
    //    - GoalCreated → insert goals
    //    - Deposit/Withdrawal → update goals.current_balance, insert transactions
    //    - GoalCompleted → update goals.completed = true
    //    - AutoSaveExecuted → insert auto_save_logs
    //    - GrowAllocationReturned → update grow_mode_positions
    //    - PassportUpdated → insert passport_snapshots
    // 4. Update indexer_state.last_event_cursor
    // 5. If > 500 events behind, log warning
  }
}
