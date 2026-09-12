import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Reveal } from '@/components/shared/Reveal';
import { FAQAccordion } from '@/components/shared/FAQAccordion';
import { faqs } from '@/content/faqs';
import { WhatsAppButton } from '@/components/whatsapp/WhatsAppButton';
import { waMessages } from '@/lib/whatsapp';
import { HelpCircle, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | PlotInNaviMumbai.com',
  description:
    'Clear answers to questions about buying land in Navi Mumbai — 7/12 extracts, NA sanction, site visits, and NRI land regulations.',
};

export default function FAQPage() {
  const categories: Array<'Getting started' | 'Site visits' | 'Documentation' | 'NRI buyers'> = [
    'Getting started',
    'Site visits',
    'Documentation',
    'NRI buyers',
  ];

  // Prepare FAQPage JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header Banner - Royal Midnight Navy */}
      <Section tone="canopy" grid={true} className="pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-white/10 text-white relative">
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Frequently Asked Questions' },
            ]}
            className="text-white/70 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white/40"
          />
          <div className="max-w-3xl mt-6">
            <div className="mb-4">
              <Eyebrow className="text-sprout font-semibold">CLEAR ANSWERS & KNOWLEDGE BASE</Eyebrow>
            </div>
            <h1 className="font-display text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold text-white tracking-tight leading-[1.12] mb-6 uppercase">
              Straight answers to common land questions.
            </h1>
            <p className="font-sans text-lg sm:text-xl text-white/85 leading-relaxed max-w-[56ch] mb-8">
              Everything you need to know about our advisory practice, land documentation, 7/12 extracts, site visits, and NRI ownership rules.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/15 text-xs font-mono uppercase tracking-wider text-white/80">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-sprout font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-sprout" /> Verified Revenue Terminology
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQs Categorized */}
      <Section tone="panel" className="py-20 sm:py-28 border-b border-line">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            {categories.map((category, idx) => {
              const categoryFaqs = faqs.filter((f) => f.category === category);
              return (
                <Reveal key={category} delay={idx * 0.05}>
                  <div className="bg-[#FCFAF6] rounded-2xl border border-line p-7 sm:p-10 shadow-card">
                    <div className="border-b border-line pb-4 mb-6 flex items-center justify-between">
                      <div>
                        <span className="font-mono text-[0.6875rem] font-bold text-sprout uppercase tracking-widest block mb-1">
                          SECTION 0{idx + 1}
                        </span>
                        <h2 className="font-display text-2xl font-bold text-ink uppercase tracking-tight">
                          {category}
                        </h2>
                      </div>
                      <HelpCircle className="w-6 h-6 text-muted shrink-0" />
                    </div>
                    <FAQAccordion items={categoryFaqs} />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Still have questions CTA */}
      <Section tone="canopy" className="py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sprout/15 via-transparent to-transparent" />
        <Container className="relative z-10">
          <Reveal>
            <div className="max-w-xl mx-auto text-center">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-sprout mb-3 block">
                UNLISTED QUESTIONS
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white mb-3">
                Have a question not listed here?
              </h2>
              <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed mb-8">
                Feel free to ask us directly. We are happy to clarify revenue terminology, mutation records, survey references, or sector zoning.
              </p>
              <WhatsAppButton
                message={waMessages.general()}
                variant="primary"
                source="faq_footer"
                label="Ask your question on WhatsApp"
                className="bg-sprout text-ink hover:bg-sprout/90 font-medium"
              />
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
