'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../../ui/Button';

const STEPS = ['Name', 'Target', 'Deadline', 'Auto-Save', 'Grow Mode', 'Review'] as const;

export function GoalCreateWizard() {
  const [step, setStep] = useState(0);

  return (
    <div className="max-w-lg mx-auto">
      {/* Step indicators */}
      <div className="flex gap-2 mb-8">
        {STEPS.map((label, i) => (
          <div
            key={label}
            className={`flex-1 h-1 rounded-full transition-colors ${i <= step ? 'bg-accent' : 'bg-border'}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {/* TODO: render step-specific form content */}
          <div className="min-h-[200px] flex items-center justify-center text-text-secondary">
            Step {step + 1}: {STEPS[step]} — TODO: implement
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        {step > 0 && (
          <Button variant="secondary" onClick={() => setStep((s) => s - 1)}>Back</Button>
        )}
        <Button
          className="ml-auto"
          onClick={() => step < STEPS.length - 1 ? setStep((s) => s + 1) : undefined}
        >
          {step === STEPS.length - 1 ? 'Create Goal' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}
