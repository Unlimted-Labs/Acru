import { GoalCreateWizard } from '../../../../components/features/goals/GoalCreateWizard';

export default function NewGoalPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-8">Create a Goal</h1>
      <GoalCreateWizard />
    </div>
  );
}
