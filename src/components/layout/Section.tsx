import * as React from "react";
import { cn } from "@/lib/utils";
import { PlotGrid } from "@/components/shared/PlotGrid";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  tone?: 'paper' | 'panel' | 'sand' | 'canopy';
  grid?: boolean;
}

export function Section({ 
  children, 
  tone = 'paper', 
  grid = false,
  className,
  ...props 
}: SectionProps) {
  const isDark = tone === 'canopy';
  
  return (
    <section
      className={cn(
        "relative py-20 md:py-28 lg:py-32 overflow-hidden",
        {
          "bg-paper text-ink": tone === 'paper',
          "bg-panel text-ink": tone === 'panel',
          "bg-sand text-ink": tone === 'sand',
          "bg-canopy text-white": tone === 'canopy',
        },
        className
      )}
      {...props}
    >
      {grid && <PlotGrid variant={isDark ? 'dark' : 'light'} />}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}
