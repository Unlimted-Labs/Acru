import { Global, Module } from '@nestjs/common';
import { WalrusService } from './walrus.service';

@Global()
@Module({
  providers: [WalrusService],
  exports: [WalrusService],
})
export class WalrusModule {}
