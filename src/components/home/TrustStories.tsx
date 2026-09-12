import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { Reveal } from '@/components/shared/Reveal';
import { testimonials } from '@/content/testimonials';
import { ArrowRight } from 'lucide-react';

export function TrustStories() {
  return (
    <Section tone="paper" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <Eyebrow>STORIES OF TRUST</Eyebrow>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium text-ink tracking-tight leading-[1.2] mb-6">
              Stories of trust
            </h2>

            {testimonials.length === 0 ? (
              <div className="bg-panel p-8 sm:p-10 rounded-[var(--radius-lg)] border border-line text-left max-w-xl mx-auto">
                <p className="font-sans text-base text-ink/85 leading-relaxed mb-6">
                  We&apos;re collecting these properly — with permission, in people&apos;s own words, and only from people we&apos;ve actually worked with. Rather than fill this page with something invented, we&apos;ve left it as it is until we have the real thing.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-sans text-sm font-medium text-moss hover:text-ink underline underline-offset-4 decoration-moss/40 hover:decoration-ink transition-colors"
                >
                  <span>Talk to us directly instead</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {testimonials.map((t) => (
                  <div key={t.id} className="p-6 bg-white rounded-[var(--radius)] border border-line">
                    <p className="italic text-ink mb-4">&quot;{t.quote}&quot;</p>
                    <p className="font-medium text-sm text-ink">{t.name}</p>
                    <p className="text-xs text-muted font-mono">{t.location}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
