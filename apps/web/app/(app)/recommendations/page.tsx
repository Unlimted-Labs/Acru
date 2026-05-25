import { RecommendationsPanel } from '../../../components/features/ai/RecommendationsPanel';

export default function RecommendationsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-2">AI Recommendations</h1>
      <p className="text-text-secondary mb-8">Personalized suggestions powered by your savings behavior and market data.</p>
      <RecommendationsPanel />
    </div>
  );
}
