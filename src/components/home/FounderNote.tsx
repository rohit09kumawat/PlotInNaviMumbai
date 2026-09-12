import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { Reveal } from '@/components/shared/Reveal';
import { ArrowRight } from 'lucide-react';

export function FounderNote() {
  return (
    <Section tone="sand" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="max-w-2xl mx-auto">
            <div className="mb-4">
              <Eyebrow>A PERSONAL NOTE</Eyebrow>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium text-ink tracking-tight leading-[1.2] mb-6">
              Why we don&apos;t treat property like a marketplace.
            </h2>
            <div className="space-y-4 font-sans text-base sm:text-lg text-ink/85 leading-relaxed mb-8">
              <p>
                When someone decides to buy a plot of land, they aren&apos;t just buying square feet. They are committing hard-earned family savings, planning where a child might grow up, or investing for retirement.
              </p>
              <p>
                In a market filled with aggressive calls, manufactured urgency, and opaque paperwork, we wanted to build a place where you could simply get honest answers without being pushed.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-ink/10">
              <div>
                <p className="font-display font-medium text-ink text-base">Rohit Kumawat</p>
                <p className="font-mono text-xs text-muted">Founder, PlotInNaviMumbai.com</p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-ink hover:text-moss underline underline-offset-4 decoration-ink/30 hover:decoration-moss transition-colors"
              >
                <span>Read the founder&apos;s story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
