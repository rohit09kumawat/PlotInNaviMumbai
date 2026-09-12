import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Reveal } from '@/components/shared/Reveal';
import { testimonials } from '@/content/testimonials';
import { ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';
import { WhatsAppButton } from '@/components/whatsapp/WhatsAppButton';
import { waMessages } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Stories of Trust | PlotInNaviMumbai.com',
  description:
    'Client experiences and honest stories of property acquisition across Navi Mumbai. No fabricated reviews.',
};

export default function StoriesOfTrustPage() {
  return (
    <main className="min-h-screen">
      {/* Header Banner - Royal Midnight Navy */}
      <Section tone="canopy" grid={true} className="pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-white/10 text-white relative">
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Stories of Trust' },
            ]}
            className="text-white/70 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white/40"
          />
          <div className="max-w-3xl mt-6">
            <div className="mb-4">
              <Eyebrow className="text-sprout font-semibold">TESTIMONIALS & EXPERIENCES</Eyebrow>
            </div>
            <h1 className="font-display text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold text-white tracking-tight leading-[1.12] mb-6 uppercase">
              Authentic Stories of Trust
            </h1>
            <p className="font-sans text-lg sm:text-xl text-white/85 leading-relaxed max-w-[56ch] mb-8">
              Real feedback from families and investors who navigated their land purchases with our independent advisory.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/15 text-xs font-mono uppercase tracking-wider text-white/80">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-sprout font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-sprout" /> Zero Fabricated Testimonials
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Testimonials Body / Transparent State */}
      <Section tone="panel" className="py-20 sm:py-28 border-b border-line">
        <Container>
          <div className="max-w-3xl mx-auto">
            {testimonials.length === 0 ? (
              <Reveal>
                <div className="bg-[#FCFAF6] p-8 sm:p-12 rounded-2xl border border-line shadow-card text-center">
                  <div className="w-14 h-14 rounded-2xl bg-panel border border-line flex items-center justify-center text-canopy mx-auto mb-6">
                    <MessageSquare className="w-7 h-7 text-sprout" />
                  </div>
                  <span className="font-mono text-xs font-bold text-sprout uppercase tracking-widest block mb-2">
                    TRANSPARENCY COMMITMENT
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-4">
                    Collecting Authentic Client Feedback
                  </h2>
                  <p className="font-sans text-base text-ink/80 leading-relaxed mb-8 max-w-xl mx-auto">
                    We collect testimonials only with explicit client consent, in their own words, after verified transaction completion. Rather than publishing placeholders, we maintain complete honesty until our documented case studies go live.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-canopy hover:bg-moss text-white px-7 py-3.5 rounded-[var(--radius)] text-sm font-semibold transition-colors w-full sm:w-auto shadow-xs"
                    >
                      <span>Speak with an Advisor</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <WhatsAppButton
                      message={waMessages.general()}
                      variant="outline"
                      source="stories_of_trust_empty_state"
                      label="Connect on WhatsApp"
                      className="w-full sm:w-auto text-ink font-medium"
                    />
                  </div>
                </div>
              </Reveal>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {testimonials.map((t) => (
                  <div key={t.id} className="p-8 bg-[#FCFAF6] rounded-2xl border border-line shadow-card">
                    <p className="italic font-sans text-base text-ink mb-4">&quot;{t.quote}&quot;</p>
                    <p className="font-display font-bold text-base text-ink">{t.name}</p>
                    <p className="font-mono text-xs text-muted">{t.location}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>
    </main>
  );
}
