import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HermesClient } from '@pythnetwork/hermes-client';
import { SupabaseService } from '../../shared/supabase/supabase.service';

export interface PriceData {
  sui: { price: number; change24h: number; volatility: number };
  usdc: { price: number };
  fetchedAt: string;
}

@Injectable()
export class PricesService {
  private readonly logger = new Logger(PricesService.name);
  private readonly hermes: HermesClient;
  private readonly suiUsdFeedId: string;
  private readonly usdcUsdFeedId: string;

  constructor(
    private readonly config: ConfigService,
    private readonly supabase: SupabaseService,
  ) {
    this.hermes = new HermesClient(this.config.getOrThrow<string>('PYTH_HERMES_BASE_URL'));
    this.suiUsdFeedId = this.config.getOrThrow<string>('PYTH_SUI_USD_FEED_ID');
    this.usdcUsdFeedId = this.config.getOrThrow<string>('PYTH_USDC_USD_FEED_ID');
  }

  async getPrices(): Promise<PriceData> {
    // TODO:
    // 1. Check Supabase price_cache WHERE cached_at > now() - 30s
    // 2. If stale, fetch from hermes.getLatestPriceUpdates([suiUsdFeedId, usdcUsdFeedId])
    // 3. Compute volatility = confidence / price
    // 4. Upsert price_cache, return result
    return {
      sui: { price: 0, change24h: 0, volatility: 0 },
      usdc: { price: 1 },
      fetchedAt: new Date().toISOString(),
    };
  }
}
