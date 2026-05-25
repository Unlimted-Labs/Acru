'use client';

import { AnimatePresence } from 'framer-motion';
import { RecommendationCard } from './RecommendationCard';
import { useRecommendations, useActionRecommendation } from '../../../hooks/useRecommendations';

export function RecommendationsPanel() {
  const { data: recommendations, isLoading } = useRecommendations();

  if (isLoading) return <div className="text-text-secondary text-sm">Loading recommendations…</div>;
  if (!recommendations?.length) return null;

  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-text-primary">AI Suggestions</h2>
      <AnimatePresence>
        {recommendations.slice(0, 2).map((rec) => (
          <RecommendationCardWrapper key={rec.id} recommendation={rec} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function RecommendationCardWrapper({ recommendation }: { recommendation: import('@acru/shared').AIRecommendation }) {
  const { mutate: action, isPending } = useActionRecommendation(recommendation.id);
  return (
    <RecommendationCard
      recommendation={recommendation}
      onApprove={() => action(true)}
      onDismiss={() => action(false)}
      isLoading={isPending}
    />
  );
}
