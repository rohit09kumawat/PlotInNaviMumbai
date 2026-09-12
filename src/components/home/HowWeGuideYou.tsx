import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Reveal } from '@/components/shared/Reveal';
import { processSteps } from '@/content/process';

export function HowWeGuideYou() {
  return (
    <Section tone="paper" grid id="how-we-guide" className="py-20 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="HOW WE GUIDE YOU"
            title="Six steps. You control the pace of every one."
            lead="No manufactured urgency. No forced timeline. We move as fast or as deliberately as you need."
            className="mb-16 max-w-2xl"
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step, idx) => (
            <Reveal key={step.step} delay={idx * 0.06}>
              <div className="p-6 sm:p-8 bg-white rounded-[var(--radius)] border border-line h-full flex flex-col justify-between hover:border-moss/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-semibold text-sprout uppercase tracking-widest">
                      Step {step.step}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-medium text-ink mb-3">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
