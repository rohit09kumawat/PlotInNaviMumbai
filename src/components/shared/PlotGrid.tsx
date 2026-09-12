import * as React from "react";
import { cn } from "@/lib/utils";

export function PlotGrid({ variant = 'light', className }: { variant?: 'light' | 'dark', className?: string }) {
  const isDark = variant === 'dark';
  
  return (
    <div 
      className={cn("absolute inset-0 z-0 overflow-hidden pointer-events-none", className)}
      aria-hidden="true"
    >
      <svg
        className={cn("absolute w-full h-full", {
          "opacity-40": !isDark,
          "opacity-10": isDark, 
        })}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="plot-grid-pattern"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke={isDark ? "rgba(255, 255, 255, 0.2)" : "var(--color-line)"}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#plot-grid-pattern)" />
        
        {/* Plot highlights */}
        <rect x="48" y="96" width="96" height="144" fill="none" stroke={isDark ? "rgba(255,255,255,0.4)" : "var(--color-line)"} strokeWidth="2" />
        <rect x="192" y="48" width="144" height="96" fill="none" stroke={isDark ? "rgba(255,255,255,0.4)" : "var(--color-line)"} strokeWidth="2" />
        <rect x="528" y="240" width="96" height="96" fill="none" stroke={isDark ? "rgba(255,255,255,0.4)" : "var(--color-line)"} strokeWidth="2" />
      </svg>
    </div>
  );
}
