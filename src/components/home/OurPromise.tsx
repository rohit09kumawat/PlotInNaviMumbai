import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Reveal } from '@/components/shared/Reveal';
import { promises } from '@/content/promises';

export function OurPromise() {
  return (
    <Section tone="canopy" className="py-20 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="OUR PROMISE"
            title="Eight things you can hold us to."
            className="mb-14 max-w-2xl text-white [&_h2]:text-white [&_span]:text-sprout"
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 border-t border-white/15 pt-8">
          {promises.map((item, idx) => (
            <Reveal key={item.number} delay={idx * 0.05}>
              <div className="flex items-start gap-4">
                <span className="font-mono text-sm font-medium text-sprout shrink-0 pt-0.5">
                  {item.number}
                </span>
                <p className="font-sans text-base sm:text-lg text-white/90 leading-snug">
                  {item.statement}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
