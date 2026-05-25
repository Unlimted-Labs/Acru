import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AutoSaveService } from './auto-save.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [AutoSaveService],
})
export class AutoSaveModule {}
