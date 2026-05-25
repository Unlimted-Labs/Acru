import { Button } from '../../../components/ui/Button';

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-text-primary">Acru</h1>
          <p className="text-text-secondary mt-2">Save smarter, grow onchain.</p>
        </div>
        <div className="space-y-3">
          {/* TODO: integrate @mysten/dapp-kit-react ConnectButton */}
          <Button variant="primary" className="w-full">
            Connect Wallet
          </Button>
          {/* TODO: implement zkLogin Google OAuth flow */}
          <Button variant="secondary" className="w-full">
            Continue with Google
          </Button>
        </div>
      </div>
    </main>
  );
}
