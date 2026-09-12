'use client';

import * as React from 'react';
import type { FAQItem } from '@/content/faqs';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  return (
    <Accordion className={`w-full space-y-3 ${className || ''}`}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className="border border-line rounded-[var(--radius)] bg-white px-5 py-1 transition-colors hover:border-moss/40"
        >
          <AccordionTrigger className="font-display text-base sm:text-lg font-medium text-ink hover:text-canopy text-left py-4 hover:no-underline cursor-pointer">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="font-sans text-sm sm:text-[0.9375rem] text-muted leading-relaxed pb-4 pt-1">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
