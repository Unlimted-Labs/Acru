'use client';

// TODO: replace with @mysten/dapp-kit-react provider once integrated
// import { WalletProvider as DappKitProvider } from '@mysten/dapp-kit-react';

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    // TODO: wrap with DappKitProvider using SUI_NETWORK constant
    <>{children}</>
  );
}
