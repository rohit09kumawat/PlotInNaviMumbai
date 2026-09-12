'use client';

import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { Reveal } from '@/components/shared/Reveal';
import { site } from '@/content/site';

export function FamilyTourInvite() {
  return (
    <Section tone="canopy" className="py-20 sm:py-32 text-white">
      <Container>
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <Eyebrow className="text-sprout [&_span]:border-sprout">
                BOOK SITE VISIT
              </Eyebrow>
            </div>
            <h2 className="font-display text-[clamp(1.85rem,4vw,3rem)] font-medium text-white tracking-tight leading-[1.15] mb-6">
              Come see the projects before anyone talks about paperwork.
            </h2>
            <div className="space-y-4 font-sans text-base sm:text-lg text-white/85 leading-relaxed mb-10 max-w-xl mx-auto">
              <p>
                Book a dedicated site visit to our active projects in Navi Mumbai. We will show you the exact plot layout, boundaries, and surroundings, and answer all your questions directly on site. There is no obligation to purchase, and no cost for the visit.
              </p>
              <p className="text-sm sm:text-base text-white/70">
                We believe in unhurried decisions made at your own pace.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/book-site-visit"
                className="inline-flex items-center justify-center font-sans font-medium text-[0.9375rem] bg-sprout text-ink hover:bg-sprout/90 h-12 px-8 rounded-[var(--radius)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout w-full sm:w-auto text-center"
              >
                Book Site Visit
              </Link>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-white/80 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors"
              >
                WhatsApp us for details
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
