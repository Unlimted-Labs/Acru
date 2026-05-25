import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { EventIndexerService } from './event-indexer.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [EventIndexerService],
})
export class EventIndexerModule {}
