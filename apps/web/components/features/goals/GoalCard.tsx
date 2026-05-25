'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ProgressRing } from '../../ui/ProgressRing';
import { Card } from '../../ui/Card';
import type { SavingsGoal } from '@acru/shared';

interface GoalCardProps {
  goal: SavingsGoal;
}

export function GoalCard({ goal }: GoalCardProps) {
  const progress = goal.targetAmount !== '0'
    ? (Number(goal.currentBalance) / Number(goal.targetAmount)) * 100
    : 0;

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>
      <Link href={`/goals/${goal.objectId}`}>
        <Card className="min-w-[200px] cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <ProgressRing progress={progress} size={56} strokeWidth={5} />
            <span className="text-sm text-text-secondary">{Math.round(progress)}%</span>
          </div>
          {/* TODO: decrypt goal.nameEncrypted with Seal client-side */}
          <p className="font-semibold text-text-primary truncate">{goal.nameEncrypted || 'Goal'}</p>
          <p className="text-sm text-text-secondary mt-1">{goal.currentBalance} / {goal.targetAmount}</p>
        </Card>
      </Link>
    </motion.div>
  );
}
