import { PriceTicker } from '../../../components/features/prices/PriceTicker';
import { RecommendationsPanel } from '../../../components/features/ai/RecommendationsPanel';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
          <p className="text-text-secondary text-sm mt-1">Your savings at a glance</p>
        </div>
        <PriceTicker />
      </header>

      {/* Portfolio total — TODO: sum goal balances */}
      <div className="rounded-2xl bg-accent/5 border border-accent/10 p-6">
        <p className="text-text-secondary text-sm">Total Portfolio</p>
        <p className="text-4xl font-bold text-text-primary mt-1">$0.00</p>
      </div>

      {/* Goals row — TODO: render GoalCard components */}
      <section>
        <h2 className="font-semibold text-text-primary mb-4">Your Goals</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          <p className="text-text-secondary text-sm">No goals yet — create one to get started.</p>
        </div>
      </section>

      {/* AI Recommendations */}
      <RecommendationsPanel />
    </div>
  );
}
