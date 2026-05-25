'use client';

import { Button } from '../../ui/Button';

interface DepositDrawerProps {
  goalId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function DepositDrawer({ goalId: _goalId, isOpen, onClose }: DepositDrawerProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full rounded-t-3xl bg-white p-6 pb-safe animate-slide-up">
        <h2 className="text-lg font-semibold mb-6">Deposit</h2>
        {/* TODO: amount input, asset selector, DeepBook slippage preview */}
        <p className="text-text-secondary">TODO: implement deposit form</p>
        <Button className="w-full mt-6" isLoading={false}>Deposit</Button>
      </div>
    </div>
  );
}
