import type { Metadata } from 'next';
import './globals.css';
import { QueryProvider } from '../components/providers/QueryProvider';
import { WalletProvider } from '../components/providers/WalletProvider';
import { AuthProvider } from '../components/providers/AuthProvider';

export const metadata: Metadata = {
  title: 'Acru — Save & Grow Onchain',
  description: 'Personal savings and onchain investing on Sui.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased bg-[--color-surface]">
        <QueryProvider>
          <WalletProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </WalletProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
