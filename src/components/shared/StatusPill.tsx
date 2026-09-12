import { VerificationStatus } from '@/types';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StatusPillProps {
  status: VerificationStatus | 'sold-out' | 'few-remaining' | 'available';
  label: string;
  className?: string;
}

export function StatusPill({ status, label, className }: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-[0.6875rem] font-mono tracking-[0.12em] uppercase font-medium border",
        status === 'verified' && "bg-panel text-canopy border-canopy/20",
        status === 'under-review' && "bg-amber/10 text-amber border-amber/20",
        status === 'applicable' && "bg-panel text-ink border-line",
        status === 'not-applicable' && "bg-transparent text-muted border-line",
        status === 'sold-out' && "bg-panel text-muted border-line opacity-75",
        status === 'few-remaining' && "bg-amber/10 text-amber border-amber/20",
        status === 'available' && "bg-panel text-ink border-line",
        className
      )}
    >
      {status === 'verified' && <Check className="w-3 h-3 stroke-[3]" />}
      {label}
    </span>
  );
}
