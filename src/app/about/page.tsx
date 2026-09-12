import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Reveal } from '@/components/shared/Reveal';
import { promises } from '@/content/promises';
import { WhatsAppButton } from '@/components/whatsapp/WhatsAppButton';
import { waMessages } from '@/lib/whatsapp';
import { site } from '@/content/site';
import { 
  ShieldCheck, 
  HeartHandshake, 
  AlertCircle, 
  CheckCircle2, 
  ExternalLink,
  Building
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | PlotInNaviMumbai.com',
  description:
    'Why we started an honest, independent property advisory practice for land buyers in Navi Mumbai. Our philosophy, standards, and promise.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Header Banner - Royal Midnight Navy */}
      <Section tone="canopy" grid={true} className="pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-white/10 text-white relative">
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'About Us' },
            ]}
            className="text-white/70 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white/40"
          />
          <div className="max-w-3xl mt-6">
            <div className="mb-4">
              <Eyebrow className="text-sprout font-semibold">OUR PRACTICE & PHILOSOPHY</Eyebrow>
            </div>
            <h1 className="font-display text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold text-white tracking-tight leading-[1.12] mb-6 uppercase">
              A plot is not a product. It&apos;s someone&apos;s biggest lifetime decision.
            </h1>
            <p className="font-sans text-lg sm:text-xl text-white/85 leading-relaxed max-w-[56ch] mb-8">
              We founded PlotInNaviMumbai.com because real estate guidance across the MMR region is overwhelmingly driven by developer sales quotas rather than the families investing their life savings.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/15 text-xs font-mono uppercase tracking-wider text-white/80">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-sprout font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-sprout" /> Independent Due Diligence
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-white font-bold">
                <HeartHandshake className="w-3.5 h-3.5 text-sprout" /> Zero Manufactured Urgency
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Section 1: The Problem We Observed */}
      <Section tone="panel" className="py-20 sm:py-28 border-b border-line">
        <Container>
          <Reveal>
            <div className="max-w-3xl mb-12">
              <div className="mb-3">
                <Eyebrow>THE PROBLEM IN LAND BUYING</Eyebrow>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-semibold text-ink tracking-tight mb-4">
                What we witnessed across Navi Mumbai
              </h2>
              <p className="font-sans text-base sm:text-lg text-ink/80 leading-relaxed">
                Most land transactions in Navi Mumbai happen under asymmetric information. Buyers are given glossy brochures without title documentation, pressured into non-refundable tokens, and left to navigate zoning approvals alone.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal delay={0.05}>
              <div className="bg-[#FCFAF6] border border-line rounded-2xl p-7 sm:p-9 shadow-card flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber/15 text-amber flex items-center justify-center">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-ink">What Buyers Experience Elsewhere</h3>
                </div>
                <ul className="space-y-3 pt-2 text-sm text-ink/80 font-sans leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber shrink-0 mt-2" />
                    <span>Heavy sales pressure and artificial scarcity countdowns.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber shrink-0 mt-2" />
                    <span>Unvetted agricultural or reservation land presented as ready residential NA.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber shrink-0 mt-2" />
                    <span>Hidden infrastructure costs and vague internal road layout promises.</span>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="bg-[#FCFAF6] border border-line rounded-2xl p-7 sm:p-9 shadow-card flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sprout/20 text-ink flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-canopy" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-ink">How We Run Our Advisory</h3>
                </div>
                <ul className="space-y-3 pt-2 text-sm text-ink/80 font-sans leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-canopy shrink-0 mt-2" />
                    <span>Every recommendation starts with verifying the 7/12 extract and NA order.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-canopy shrink-0 mt-2" />
                    <span>Transparent physical visits with family; no token deposit requested.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-canopy shrink-0 mt-2" />
                    <span>Direct alignment with your objective: lifestyle villa or long-term growth.</span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Section 2: How We Work — 4 Methodology Pillars */}
      <Section tone="sand" className="py-20 sm:py-28 border-b border-line">
        <Container>
          <Reveal>
            <div className="max-w-3xl mb-12">
              <div className="mb-3">
                <Eyebrow>OUR METHODOLOGY</Eyebrow>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-semibold text-ink tracking-tight mb-4">
                Four principles behind every advisory recommendation
              </h2>
              <p className="font-sans text-base sm:text-lg text-ink/80 leading-relaxed">
                We have codified our evaluation process so every client receives the exact same standard of independent scrutiny.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Title & Revenue Scrutiny',
                desc: 'We verify the 7/12 extract, Collector NA sanction, mutation entries (Ferfar), and search report before recommending any parcel.',
              },
              {
                step: '02',
                title: 'Ground Infrastructure Check',
                desc: 'We inspect physical demarcation, approach road width, electricity grid availability, and drainage slope in person.',
              },
              {
                step: '03',
                title: 'Micro-Market Realism',
                desc: 'We analyze actual registry transaction data rather than developer marketing brochures or speculative promises.',
              },
              {
                step: '04',
                title: 'Zero Sales Pressure',
                desc: 'We do not take advance deposits for site tours. You take all the time your family needs to consult independent legal counsel.',
              },
            ].map((pillar, idx) => (
              <Reveal key={pillar.step} delay={idx * 0.05}>
                <div className="p-7 rounded-2xl bg-[#FCFAF6] border border-line shadow-card flex flex-col justify-between h-full">
                  <div>
                    <span className="font-mono text-xs font-bold text-sprout uppercase tracking-widest block mb-3">
                      Pillar {pillar.step}
                    </span>
                    <h3 className="font-display text-xl font-bold text-ink mb-3 leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="font-sans text-sm text-ink/75 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Section 3: Founder & Team Letter */}
      <Section tone="panel" className="py-20 sm:py-28 border-b border-line">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
            {/* Left: Founder Portrait Card */}
            <div className="lg:col-span-5">
              <Reveal>
                <div className="relative rounded-2xl overflow-hidden border border-line bg-[#FCFAF6] p-4 shadow-card">
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-panel mb-5">
                    <Image
                      src="/rohit-kumawat.jpeg"
                      alt="Rohit Kumawat, Founder & Lead Advisor"
                      fill
                      sizes="(max-width: 1024px) 100vw, 400px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="text-center pb-2">
                    <h3 className="font-display text-2xl font-bold text-ink mb-1">
                      Rohit Kumawat
                    </h3>
                    <p className="font-mono text-xs font-semibold text-sprout uppercase tracking-widest mb-3">
                      Founder & Lead Advisory Partner
                    </p>
                    <p className="font-sans text-xs text-muted leading-relaxed">
                      Navi Mumbai Real Estate Strategist & NA Land Specialist
                    </p>

                    {/* Social links */}
                    <div className="flex items-center justify-center gap-3 mt-4 pt-3 border-t border-line">
                      {site.social.linkedin && (
                        <a
                          href={site.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-canopy hover:text-sprout transition-colors"
                        >
                          LinkedIn <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {site.social.instagram && (
                        <a
                          href={site.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-canopy hover:text-sprout transition-colors"
                        >
                          Instagram <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: Personal Statement Letter */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Reveal delay={0.05}>
                <div>
                  <Eyebrow>A MESSAGE FROM OUR FOUNDER</Eyebrow>
                  <h2 className="font-display text-2xl sm:text-4xl font-bold text-ink tracking-tight mt-3 mb-6">
                    &ldquo;My grandfather used to say: Land never lies, but the people selling it might.&rdquo;
                  </h2>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="font-sans text-base sm:text-lg text-ink/85 leading-relaxed space-y-4">
                  <p>
                    When I began advising families on Navi Mumbai real estate, I noticed a troubling pattern: buyers were treated like transactions rather than partners making a generational investment.
                  </p>
                  <p>
                    Navi Mumbai is undergoing India&apos;s largest infrastructure transformation with Atal Setu, the International Airport, and NAINA town planning. The growth potential is genuine — but only when you buy title-clear land.
                  </p>
                  <p>
                    Backed by the proven plotted development pedigree of Riyasat Infra — which has successfully completed and delivered approximately <strong>65+ JDA &amp; RERA-approved townships in Jaipur</strong> and has multiple future townships in the pipeline — we bring this same uncompromising standard of 100% legal, clear-title land to Navi Mumbai and Panvel.
                  </p>
                  <p>
                    Our promise is simple: we will tell you the uncomfortable truth about a plot before we tell you why you should buy it.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Section: Riyasat Infra Proven Execution Track Record */}
      <Section tone="paper" className="py-20 sm:py-28 border-b border-line bg-[#FCFAF6]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="mb-3">
                  <Eyebrow className="text-canopy font-semibold">PROVEN TOWNSHIP EXECUTION TRACK RECORD</Eyebrow>
                </div>
                <h2 className="font-display text-2xl sm:text-4xl font-bold text-ink tracking-tight mb-6">
                  65+ JDA &amp; RERA-Approved Completed Townships in Jaipur — and Expanding into Navi Mumbai
                </h2>
                <p className="font-sans text-base sm:text-lg text-ink/85 leading-relaxed mb-6">
                  Trust isn&apos;t built on promises; it&apos;s proven through delivered communities. Riyasat Infra has successfully completed and delivered approximately <strong>65+ gated plotted townships in Jaipur — all 100% JDA (Jaipur Development Authority) and RERA approved</strong>. Every project was handed over with complete infrastructure — wide asphalt roads, boundary walls, underground electricity cabling, piped water supply, and landscaped parks.
                </p>
                <p className="font-sans text-base sm:text-lg text-ink/80 leading-relaxed mb-8">
                  We are now actively expanding this proven legacy into the Mumbai Metropolitan Region, launching premium, 100% legal, and MahaRERA-sanctioned plotted developments across Navi Mumbai and Panvel — with <strong>many more future townships currently in the planning and development pipeline</strong>.
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-wider text-ink/90">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sprout/20 border border-sprout/40 text-canopy font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-canopy" /> 65+ JDA &amp; RERA Approved in Jaipur
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-panel border border-line text-ink font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-canopy" /> 100% Clear-Title Heritage
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-panel border border-line text-ink font-semibold">
                    <Building className="w-3.5 h-3.5 text-canopy" /> Many More Townships in Future
                  </span>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl border border-line p-6 shadow-card flex flex-col justify-between">
                    <div className="font-display text-4xl sm:text-5xl font-bold text-canopy mb-2">
                      65+
                    </div>
                    <div>
                      <h4 className="font-display text-base font-bold text-ink mb-1">JDA &amp; RERA Approved</h4>
                      <p className="text-xs text-muted leading-relaxed">Completed townships in Jaipur with full JDA sanction &amp; registry.</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-line p-6 shadow-card flex flex-col justify-between">
                    <div className="font-display text-4xl sm:text-5xl font-bold text-canopy mb-2">
                      100%
                    </div>
                    <div>
                      <h4 className="font-display text-base font-bold text-ink mb-1">Legal &amp; Sanctioned</h4>
                      <p className="text-xs text-muted leading-relaxed">JDA, MahaRERA &amp; statutory revenue clearances on every parcel.</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-line p-6 shadow-card flex flex-col justify-between">
                    <div className="font-display text-4xl sm:text-5xl font-bold text-canopy mb-2">
                      10K+
                    </div>
                    <div>
                      <h4 className="font-display text-base font-bold text-ink mb-1">Happy Plot Owners</h4>
                      <p className="text-xs text-muted leading-relaxed">Families who built their homes and wealth with Riyasat Infra.</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-line p-6 shadow-card flex flex-col justify-between">
                    <div className="font-display text-4xl sm:text-5xl font-bold text-sprout mb-2">
                      Future+
                    </div>
                    <div>
                      <h4 className="font-display text-base font-bold text-ink mb-1">Upcoming Townships</h4>
                      <p className="text-xs text-muted leading-relaxed">Next-generation plotted communities underway in Panvel &amp; Navi Mumbai.</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Section 4: Our 8 Promises on Dark Canopy */}
      <Section tone="canopy" className="py-20 sm:py-28 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sprout/15 via-transparent to-transparent" />
        <Container className="relative z-10">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-sprout mb-3 block">
                GUARANTEE OF INTEGRITY
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                The 8 Promises We Live By
              </h2>
              <p className="font-sans text-base sm:text-lg text-white/80 leading-relaxed">
                These are non-negotiable standards codified into every client interaction.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promises.map((promise, idx) => (
              <Reveal key={promise.number} delay={idx * 0.05}>
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-sprout/50 transition-colors">
                  <span className="font-mono text-xs font-bold text-sprout uppercase tracking-wider block mb-2">
                    Promise {promise.number}
                  </span>
                  <p className="font-display text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                    {promise.statement}
                  </p>
                  {promise.detail && (
                    <p className="font-sans text-sm text-white/75 leading-relaxed">
                      {promise.detail}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-16 pt-10 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-1">
                  Ready to consult with an advisor?
                </h3>
                <p className="font-sans text-sm text-white/80">
                  Direct conversation with Rohit Kumawat and the advisory team.
                </p>
              </div>
              <WhatsAppButton
                message={waMessages.consultation()}
                variant="primary"
                source="about_page_footer"
                label="Connect on WhatsApp"
                className="bg-sprout text-ink hover:bg-sprout/90 font-bold px-8 py-4 shadow-sm"
              />
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
