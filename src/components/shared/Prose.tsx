import * as React from 'react';
import { cn } from '@/lib/utils';

export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'max-w-[68ch] mx-auto text-ink font-sans leading-relaxed text-[1.0625rem]',
        'space-y-6',
        '[&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-ink [&_h2]:mt-10 [&_h2]:mb-4',
        '[&_h3]:font-display [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-ink [&_h3]:mt-8 [&_h3]:mb-3',
        '[&_p]:text-ink/90 [&_p]:leading-[1.8]',
        '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:text-ink/90',
        '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:text-ink/90',
        '[&_li]:leading-relaxed',
        '[&_a]:text-canopy [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-canopy/40 hover:[&_a]:decoration-canopy',
        '[&_blockquote]:border-l-2 [&_blockquote]:border-sprout [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted',
        className
      )}
    >
      {children}
    </div>
  );
}
