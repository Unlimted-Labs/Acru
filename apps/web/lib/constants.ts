export const ACRU_PACKAGE_ID =
  process.env['NEXT_PUBLIC_ACRU_PACKAGE_ID'] ??
  '0x0000000000000000000000000000000000000000000000000000000000000000';

export const SUI_NETWORK = (process.env['NEXT_PUBLIC_SUI_NETWORK'] ?? 'testnet') as
  | 'mainnet'
  | 'testnet'
  | 'devnet';

export const WALRUS_AGGREGATOR_URL =
  process.env['NEXT_PUBLIC_WALRUS_AGGREGATOR_URL'] ??
  'https://aggregator.walrus-testnet.walrus.space';

/** Pyth SUI/USD feed ID */
export const SUI_USD_FEED_ID =
  '0x23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744';

export const QUERY_KEYS = {
  goals: ['goals'] as const,
  goal: (id: string) => ['goals', id] as const,
  prices: ['prices'] as const,
  recommendations: ['recommendations'] as const,
  passport: ['passport'] as const,
  growOptions: ['grow-options'] as const,
} as const;
