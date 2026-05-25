'use client';

import { usePrices } from '../../../hooks/usePrices';

export function PriceTicker() {
  const { data: prices } = usePrices();

  return (
    <div className="flex items-center gap-6 text-sm">
      <span className="text-text-secondary">SUI</span>
      <span className="font-medium text-text-primary">
        ${prices?.sui.price.toFixed(4) ?? '—'}
      </span>
      {prices && (
        <span className={prices.sui.change24h >= 0 ? 'text-success' : 'text-danger'}>
          {prices.sui.change24h >= 0 ? '+' : ''}{prices.sui.change24h.toFixed(2)}%
        </span>
      )}
    </div>
  );
}
