export default function GrowPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-2">Grow Mode</h1>
      <p className="text-text-secondary mb-8">Put your savings to work with curated onchain yield opportunities.</p>
      {/* TODO: fetch /v1/grow/options, render GrowOptionCard components */}
      <p className="text-text-secondary text-sm">Loading options…</p>
    </div>
  );
}
