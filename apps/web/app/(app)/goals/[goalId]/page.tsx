export default function GoalDetailPage({ params }: { params: { goalId: string } }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Goal Detail</h1>
      {/* TODO: useGoal(params.goalId), render detail UI */}
      <p className="text-text-secondary">Goal ID: {params.goalId}</p>
    </div>
  );
}
