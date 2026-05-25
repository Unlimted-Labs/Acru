import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', {
  variants: {
    variant: {
      low: 'bg-success/10 text-success',
      medium: 'bg-warning/10 text-warning',
      high: 'bg-danger/10 text-danger',
      default: 'bg-accent/10 text-accent',
      rebalance: 'bg-blue-100 text-blue-700',
      grow_allocate: 'bg-green-100 text-green-700',
      grow_withdraw: 'bg-purple-100 text-purple-700',
      alert: 'bg-red-100 text-red-700',
      auto_save_adjust: 'bg-yellow-100 text-yellow-700',
      currency_switch: 'bg-indigo-100 text-indigo-700',
    },
  },
  defaultVariants: { variant: 'default' },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props}>
      {children}
    </span>
  );
}
