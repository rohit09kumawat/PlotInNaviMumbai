import { cn } from '@/lib/utils';
import React from 'react';

interface EmptyStateProps {
  title: string;
  description: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-start justify-center p-8 sm:p-12 border border-line rounded-lg bg-panel text-left", className)}>
      <h3 className="font-display text-xl md:text-2xl font-medium text-ink mb-3">{title}</h3>
      <div className="text-muted text-base max-w-[54ch] mb-6">
        {description}
      </div>
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </div>
  );
}
