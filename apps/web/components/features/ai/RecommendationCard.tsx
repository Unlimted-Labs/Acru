'use client';

import { motion } from 'framer-motion';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import type { AIRecommendation } from '@acru/shared';
import type { BadgeProps } from '../../ui/Badge';

interface RecommendationCardProps {
  recommendation: AIRecommendation;
  onApprove: () => void;
  onDismiss: () => void;
  isLoading?: boolean;
}

export function RecommendationCard({ recommendation, onApprove, onDismiss, isLoading }: RecommendationCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="rounded-2xl border border-border bg-white p-5"
    >
      <div className="flex items-start gap-3 mb-3">
        <Badge variant={recommendation.type as BadgeProps['variant']}>{recommendation.type.replace('_', ' ')}</Badge>
        <Badge variant={recommendation.riskLevel as BadgeProps['variant']} className="ml-auto">{recommendation.riskLevel} risk</Badge>
      </div>
      <h3 className="font-semibold text-text-primary">{recommendation.title}</h3>
      <p className="text-sm text-text-secondary mt-1">{recommendation.body}</p>
      <p className="text-xs text-success mt-2">{recommendation.expectedOutcome}</p>
      <div className="flex gap-2 mt-4">
        <Button variant="primary" size="sm" className="flex-1" onClick={onApprove} isLoading={isLoading}>
          Approve
        </Button>
        <Button variant="ghost" size="sm" onClick={onDismiss} disabled={isLoading}>
          Dismiss
        </Button>
      </div>
    </motion.div>
  );
}
