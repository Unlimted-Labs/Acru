'use client';

import type { PassportSummary } from '@acru/shared';

interface PassportCardProps {
  passport: PassportSummary;
}

export function PassportCard({ passport }: PassportCardProps) {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 text-white p-8">
      <p className="text-xs text-slate-400 uppercase tracking-widest mb-6">Savings Passport</p>
      <p className="font-mono text-sm text-slate-300 mb-8 truncate">{passport.walletAddress}</p>
      <div className="grid grid-cols-3 gap-4">
        <Stat label="Goals Completed" value={String(passport.goalsCompleted)} />
        <Stat label="Total Saved" value={passport.totalSaved} />
        <Stat label="Member Since" value={new Date(passport.accountCreatedAt).getFullYear().toString()} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-slate-400 text-xs">{label}</p>
      <p className="text-white font-semibold mt-1">{value}</p>
    </div>
  );
}
