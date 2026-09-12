import * as React from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  eyebrow?: string;
  lead?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ 
  title, 
  eyebrow, 
  lead, 
  align = 'left',
  className,
  ...props 
}: SectionHeadingProps) {
  return (
    <div 
      className={cn(
        "flex flex-col gap-5 max-w-[68ch]", 
        {
          "mx-auto items-center text-center": align === 'center',
        },
        className
      )}
      {...props}
    >
      {eyebrow && <Eyebrow className={align === 'center' ? 'justify-center' : ''}>{eyebrow}</Eyebrow>}
      <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-display font-medium leading-[1.15] tracking-[-0.02em]">
        {title}
      </h2>
      {lead && (
        <p className="text-[clamp(1.0625rem,1.6vw,1.25rem)] text-muted-foreground leading-[1.6] max-w-[54ch]">
          {lead}
        </p>
      )}
    </div>
  );
}
