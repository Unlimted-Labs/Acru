import { Global, Module } from '@nestjs/common';
import { MemWalService } from './memwal.service';

@Global()
@Module({
  providers: [MemWalService],
  exports: [MemWalService],
})
export class MemWalModule {}
