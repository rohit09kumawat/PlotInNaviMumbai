import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Reveal } from '@/components/shared/Reveal';
import { services, legalDisclaimer } from '@/content/services';
import { WhatsAppButton } from '@/components/whatsapp/WhatsAppButton';
import { waMessages } from '@/lib/whatsapp';
import { CheckCircle, XCircle, AlertCircle, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Advisory Services | PlotInNaviMumbai.com',
  description:
    'Independent land advisory services across Navi Mumbai — plot search, title document coordination, family site tours, and NRI advisory.',
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      {/* Header Banner - Royal Midnight Navy */}
      <Section tone="canopy" grid={true} className="pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-white/10 text-white relative">
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Advisory Services' },
            ]}
            className="text-white/70 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white/40"
          />
          <div className="max-w-3xl mt-6">
            <div className="mb-4">
              <Eyebrow className="text-sprout font-semibold">HOW WE WORK WITH YOU</Eyebrow>
            </div>
            <h1 className="font-display text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold text-white tracking-tight leading-[1.12] mb-6 uppercase">
              Advisory built around your needs, not a sales catalogue.
            </h1>
            <p className="font-sans text-lg sm:text-xl text-white/85 leading-relaxed max-w-[56ch] mb-8">
              We offer end-to-end guidance from initial requirement mapping to revenue record review, layout appraisal, and site tours across Navi Mumbai.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/15 text-xs font-mono uppercase tracking-wider text-white/80">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-sprout font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-sprout" /> 100% Client-Aligned Advisory
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Mandatory Legal Disclaimer Banner */}
      <Section tone="sand" className="py-6 border-b border-line">
        <Container>
          <div className="flex items-start gap-4 p-5 bg-[#FCFAF6] rounded-2xl border border-line shadow-xs max-w-4xl mx-auto">
            <AlertCircle className="w-5 h-5 text-canopy shrink-0 mt-0.5" />
            <div className="font-sans text-xs sm:text-sm text-ink/85 leading-relaxed">
              <span className="font-bold text-ink uppercase font-mono text-xs">Important Legal Notice: </span>
              {legalDisclaimer}
            </div>
          </div>
        </Container>
      </Section>

      {/* Services List */}
      <Section tone="panel" className="py-20 sm:py-28 border-b border-line">
        <Container>
          <div className="space-y-16 max-w-5xl mx-auto">
            {services.map((service, idx) => (
              <Reveal key={service.id} delay={idx * 0.05}>
                <div className="border border-line rounded-2xl bg-[#FCFAF6] p-7 sm:p-12 shadow-card">
                  <div className="max-w-3xl mb-8">
                    <span className="font-mono text-xs font-bold text-sprout uppercase tracking-widest block mb-2">
                      ADVISORY PRACTICE 0{idx + 1}
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-3">
                      {service.title}
                    </h2>
                    <p className="font-sans text-base text-ink/80 leading-relaxed">
                      {service.subtitle}
                    </p>
                  </div>

                  <div className="mb-8 p-4 bg-panel rounded-xl border border-line/60">
                    <span className="font-mono text-[0.6875rem] uppercase font-bold text-muted tracking-wider block mb-1">
                      Who This Is For:
                    </span>
                    <p className="font-sans text-sm font-medium text-ink">
                      {service.whoItsFor}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-line">
                    <div>
                      <h3 className="font-display text-base font-bold text-ink flex items-center gap-2 mb-4">
                        <CheckCircle className="w-4 h-4 text-canopy" />
                        What happens during this service
                      </h3>
                      <ul className="space-y-3">
                        {service.whatHappens.map((point, pIdx) => (
                          <li key={pIdx} className="font-sans text-xs sm:text-sm text-ink/80 leading-relaxed flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-canopy shrink-0 mt-2" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-display text-base font-bold text-ink flex items-center gap-2 mb-4">
                        <XCircle className="w-4 h-4 text-amber" />
                        What is not included
                      </h3>
                      <ul className="space-y-3">
                        {service.whatIsNotIncluded.map((point, pIdx) => (
                          <li key={pIdx} className="font-sans text-xs sm:text-sm text-muted leading-relaxed flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber shrink-0 mt-2" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section tone="canopy" className="py-20 sm:py-28 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sprout/15 via-transparent to-transparent" />
        <Container className="relative z-10">
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-sprout mb-3 block">
                GET IN TOUCH
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-4">
                Want to discuss your specific land requirement?
              </h2>
              <p className="font-sans text-base text-white/80 leading-relaxed mb-8 max-w-md mx-auto">
                No pressure, no hard sell. Let&apos;s start with a simple conversation.
              </p>
              <WhatsAppButton
                message={waMessages.consultation()}
                variant="primary"
                source="services_footer"
                label="Discuss your requirement on WhatsApp"
                className="bg-sprout text-ink hover:bg-sprout/90 font-medium"
              />
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
