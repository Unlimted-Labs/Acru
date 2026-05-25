import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import * as Joi from 'joi';

// Shared infrastructure
import { SupabaseModule } from './shared/supabase/supabase.module';
import { SuiModule } from './shared/sui/sui.module';
import { WalrusModule } from './shared/walrus/walrus.module';
import { MemWalModule } from './shared/memwal/memwal.module';

// Feature modules
import { AuthModule } from './modules/auth/auth.module';
import { GoalsModule } from './modules/goals/goals.module';
import { AutoSaveModule } from './modules/auto-save/auto-save.module';
import { GrowModeModule } from './modules/grow-mode/grow-mode.module';
import { AIModule } from './modules/ai/ai.module';
import { PassportModule } from './modules/passport/passport.module';
import { PricesModule } from './modules/prices/prices.module';
import { EventIndexerModule } from './modules/event-indexer/event-indexer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3001),
        NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
        SUI_RPC_URL: Joi.string().required(),
        SUPABASE_URL: Joi.string().required(),
        SUPABASE_SERVICE_ROLE_KEY: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        SESSION_KEY_ENCRYPTION_SECRET: Joi.string().required(),
        ANTHROPIC_API_KEY: Joi.string().required(),
        WALRUS_PUBLISHER_URL: Joi.string().required(),
        WALRUS_AGGREGATOR_URL: Joi.string().required(),
        PYTH_HERMES_BASE_URL: Joi.string().required(),
        PYTH_SUI_USD_FEED_ID: Joi.string().required(),
        PYTH_USDC_USD_FEED_ID: Joi.string().required(),
        MEMWAL_NETWORK: Joi.string().default('testnet'),
      }),
    }),
    ScheduleModule.forRoot(),
    // Shared
    SupabaseModule,
    SuiModule,
    WalrusModule,
    MemWalModule,
    // Features
    AuthModule,
    GoalsModule,
    AutoSaveModule,
    GrowModeModule,
    AIModule,
    PassportModule,
    PricesModule,
    EventIndexerModule,
  ],
})
export class AppModule {}
