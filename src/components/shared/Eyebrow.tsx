import * as React from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 text-[0.75rem] font-medium font-mono uppercase tracking-[0.12em]", className)}>
      <div className="h-[1px] w-6 bg-sprout" />
      <span>{children}</span>
    </div>
  );
}
