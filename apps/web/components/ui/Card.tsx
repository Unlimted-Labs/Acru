import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({ className, padding = 'md', children, ...props }: CardProps) {
  const paddings = { sm: 'p-4', md: 'p-6', lg: 'p-8' };
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-white shadow-sm',
        paddings[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
