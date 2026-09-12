import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Reveal } from '@/components/shared/Reveal';

export function RealProblem() {
  const problems = [
    {
      title: 'Ten brokers, ten prices.',
      desc: 'The same sector, quoted five different ways, and no clear reason why.',
    },
    {
      title: 'A file nobody explains.',
      desc: "You're handed documents and expected to nod along without clarity.",
    },
    {
      title: 'The urgency that never ends.',
      desc: '"Only two plots left, sir" — repeated every single week, for months.',
    },
    {
      title: 'The question nobody answers.',
      desc: 'Not "is this a good plot", but "is this a good plot for me and my family".',
    },
  ];

  return (
    <Section tone="panel" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="WHY THIS FEELS HARD"
            title="Nobody is confused about wanting land. The confusion starts after that."
            lead="Most people we meet aren't short of options. They're short of someone who will explain things plainly and has no reason to rush them."
            className="mb-14 max-w-2xl"
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {problems.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.08}>
              <div className="p-6 sm:p-8 bg-white rounded-[var(--radius)] border border-line h-full flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-medium text-muted uppercase tracking-wider block mb-3">
                    Point 0{idx + 1}
                  </span>
                  <h3 className="font-display text-xl font-medium text-ink mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-muted leading-relaxed">
                    {item.desc}
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
