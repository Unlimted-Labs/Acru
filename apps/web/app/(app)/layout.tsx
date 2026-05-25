import Link from 'next/link';

const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/goals/new', label: 'New Goal' },
  { href: '/grow', label: 'Grow' },
  { href: '/recommendations', label: 'AI' },
  { href: '/passport', label: 'Passport' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      <nav className="fixed top-0 inset-x-0 z-40 border-b border-border bg-white/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="font-bold text-text-primary">Acru</Link>
          <div className="flex items-center gap-6">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <div className="pt-16">
        <main className="max-w-5xl mx-auto px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
