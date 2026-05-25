'use client';

import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import type { GrowOption, RiskLevel } from '@acru/shared';
import type { BadgeProps } from '../../ui/Badge';

interface GrowOptionCardProps {
  option: GrowOption;
  onSelect: (option: GrowOption) => void;
}

export function GrowOptionCard({ option, onSelect }: GrowOptionCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold text-text-primary">{option.name}</p>
          <p className="text-xs text-text-secondary mt-0.5">{option.protocol}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-success">{option.apy.toFixed(2)}%</p>
          <p className="text-xs text-text-secondary">APY</p>
        </div>
      </div>
      <p className="text-sm text-text-secondary mb-4">{option.description}</p>
      <div className="flex items-center justify-between">
        <Badge variant={option.riskLevel as BadgeProps['variant']}>{option.riskLevel} risk</Badge>
        <Button size="sm" onClick={() => onSelect(option)}>Select</Button>
      </div>
    </Card>
  );
}
