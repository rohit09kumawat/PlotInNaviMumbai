import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { Reveal } from '@/components/shared/Reveal';
import { ArrowRight } from 'lucide-react';

export function WhyWeExist() {
  return (
    <Section tone="paper" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <div className="mb-4">
              <Eyebrow>WHY WE EXIST</Eyebrow>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium text-ink tracking-tight leading-[1.15] mb-6">
              A plot is not a product. It&apos;s usually somebody&apos;s biggest decision.
            </h2>
            <div className="space-y-4 font-sans text-base sm:text-lg text-ink/85 leading-relaxed mb-8">
              <p>
                For most families, buying land happens once, maybe twice. It involves savings built over years and a decision that shapes what comes next. That deserves more care than a site visit and a follow-up call.
              </p>
              <p>
                So we work the other way around. We ask what you&apos;re actually trying to do — build in three years, hold for ten, park capital, move your parents closer. Then we look at what fits. Sometimes the honest answer is that nothing we have fits, and we say so.
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-sans text-[0.9375rem] font-medium text-moss hover:text-ink transition-colors underline underline-offset-4 decoration-moss/40 hover:decoration-ink"
            >
              <span>Read the full story</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
