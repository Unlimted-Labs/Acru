import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GrowModeController } from './grow-mode.controller';
import { GrowModeService } from './grow-mode.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
      }),
    }),
  ],
  controllers: [GrowModeController],
  providers: [GrowModeService],
  exports: [GrowModeService],
})
export class GrowModeModule {}
