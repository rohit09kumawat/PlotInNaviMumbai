import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Reveal } from '@/components/shared/Reveal';
import { SiteVisitForm } from '@/components/forms/SiteVisitForm';
import { WhatsAppButton } from '@/components/whatsapp/WhatsAppButton';
import { waMessages } from '@/lib/whatsapp';
import { ShieldCheck, Users, MapPin, Clock, Check, X } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Book a Site Visit — PlotInNaviMumbai.com',
  description:
    'Arrange a free, unhurried property visit to Riyasat Infra projects in Navi Mumbai. Zero obligation, zero cost.',
};

export default function BookSiteVisitPage() {
  return (
    <main className="min-h-screen">
      {/* Header Banner - Royal Midnight Navy */}
      <Section tone="canopy" grid={true} className="pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-white/10 text-white relative">
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Book Site Visit' },
            ]}
            className="text-white/70 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white/40"
          />
          <div className="max-w-3xl mt-6">
            <div className="mb-4">
              <Eyebrow className="text-sprout font-semibold">SITE INSPECTION & TOUR</Eyebrow>
            </div>
            <h1 className="font-display text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold text-white tracking-tight leading-[1.12] mb-6 uppercase">
              See the ground reality before anyone talks about paperwork.
            </h1>
            <p className="font-sans text-lg sm:text-xl text-white/85 leading-relaxed max-w-[56ch] mb-8">
              Arrange an unhurried, dedicated walkthrough of any Riyasat Infra township. Inspect exact plot markers, internal road widths, and common amenity parcels at your own pace.
            </p>

            {/* Non-negotiable Trust Guarantee Banner */}
            <div className="inline-flex items-center gap-3 p-4 bg-white/10 rounded-xl border border-white/15 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-sprout shrink-0" />
              <span className="font-sans text-sm font-semibold text-white">
                Zero Cost · Zero Purchase Obligation · Dedicated Vehicle Coordination
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Section 1: What it is vs What it is NOT */}
      <Section tone="panel" className="py-20 sm:py-28 border-b border-line">
        <Container>
          <Reveal>
            <div className="max-w-3xl mb-12">
              <div className="mb-3">
                <Eyebrow>TRANSPARENCY STANDARD</Eyebrow>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-semibold text-ink tracking-tight mb-4">
                What this visit is — and what it is not
              </h2>
              <p className="font-sans text-base sm:text-lg text-ink/80 leading-relaxed">
                We believe property visits should be informative, relaxed family excursions rather than high-pressure sales pitches.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
            {/* What it IS */}
            <Reveal delay={0.05}>
              <div className="bg-[#FCFAF6] border border-line rounded-2xl p-7 sm:p-9 shadow-card flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-full bg-canopy text-sprout flex items-center justify-center">
                      <Check className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-ink">
                      What the Visit Is
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      'A dedicated, unhurried walkthrough of the specific township layout and demarcated plots.',
                      'An opportunity to inspect internal road widths, street lighting, compound walls, and water lines.',
                      'A review of exact physical boundary stones against the sanctioned layout drawing.',
                      'A chance to understand the surrounding micro-corridor, approach roads, and upcoming transit links.',
                      'A zero-cost, zero-obligation tour organized for you and your family.',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-ink/85 font-sans leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-canopy shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* What it is NOT */}
            <Reveal delay={0.1}>
              <div className="bg-[#FCFAF6] border border-line rounded-2xl p-7 sm:p-9 shadow-card flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-full bg-amber/15 text-amber flex items-center justify-center">
                      <X className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-ink">
                      What the Visit Is NOT
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      'A high-pressure sales pitch with "today-only pricing" or artificial countdowns.',
                      'A rushed tour grouped with strangers on a developer bus.',
                      'A visit where you will be asked for an on-spot booking cheque or token advance.',
                      'A scenario where your contact details are shared with external property brokers.',
                      'A generic drive-by where you cannot step onto the actual plot terrain.',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-muted font-sans leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Section 2: Practical Details */}
      <Section tone="sand" className="py-20 sm:py-28 border-b border-line">
        <Container>
          <Reveal>
            <div className="max-w-3xl mb-12">
              <div className="mb-3">
                <Eyebrow>LOGISTICS & PLANNING</Eyebrow>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-semibold text-ink tracking-tight mb-4">
                Three practical details for your visit
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal delay={0.05}>
              <div className="bg-[#FCFAF6] border border-line rounded-2xl p-7 shadow-card flex flex-col justify-between h-full">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-panel border border-line flex items-center justify-center text-canopy mb-5">
                    <Clock className="w-5 h-5 text-sprout" />
                  </div>
                  <span className="font-mono text-xs font-bold text-sprout uppercase tracking-widest block mb-2">
                    Timing
                  </span>
                  <h3 className="font-display text-xl font-bold text-ink mb-2">
                    Allow 60 to 90 Minutes
                  </h3>
                  <p className="font-sans text-sm text-ink/75 leading-relaxed">
                    We recommend planning 60–90 minutes per township. This gives adequate time to walk the layout, review boundaries, and discuss surrounding road connectivity.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="bg-[#FCFAF6] border border-line rounded-2xl p-7 shadow-card flex flex-col justify-between h-full">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-panel border border-line flex items-center justify-center text-canopy mb-5">
                    <Users className="w-5 h-5 text-sprout" />
                  </div>
                  <span className="font-mono text-xs font-bold text-sprout uppercase tracking-widest block mb-2">
                    Attendees
                  </span>
                  <h3 className="font-display text-xl font-bold text-ink mb-2">
                    Bring the Decision Makers
                  </h3>
                  <p className="font-sans text-sm text-ink/75 leading-relaxed">
                    Land is a family decision. We encourage you to bring family members, co-investors, or your architect so everyone can evaluate terrain, orientation, and access together.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="bg-[#FCFAF6] border border-line rounded-2xl p-7 shadow-card flex flex-col justify-between h-full">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-panel border border-line flex items-center justify-center text-canopy mb-5">
                    <MapPin className="w-5 h-5 text-sprout" />
                  </div>
                  <span className="font-mono text-xs font-bold text-sprout uppercase tracking-widest block mb-2">
                    Meeting Point
                  </span>
                  <h3 className="font-display text-xl font-bold text-ink mb-2">
                    Direct on Site or Office
                  </h3>
                  <p className="font-sans text-sm text-ink/75 leading-relaxed">
                    You can meet our advisor directly at the township gate, or meet at our Panvel Head Office (Centre Point) where we will escort you in a dedicated vehicle.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Section 3: Booking Form Section */}
      <Section tone="panel" className="py-20 sm:py-28 border-b border-line">
        <Container>
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <div className="text-center mb-10">
                <span className="font-mono text-xs font-bold text-sprout uppercase tracking-widest block mb-2">
                  SCHEDULE YOUR VISIT
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-3">
                  Select your preferred date & township
                </h2>
                <p className="font-sans text-base text-ink/80 leading-relaxed">
                  Fill in the details below and an advisor will confirm your private site visit slot within 2 business hours.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="border border-line rounded-2xl bg-[#FCFAF6] p-7 sm:p-10 shadow-card">
                <SiteVisitForm />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 text-center">
                <span className="font-sans text-xs text-muted block mb-3">
                  Prefer direct instant scheduling over WhatsApp?
                </span>
                <WhatsAppButton
                  message={waMessages.tour()}
                  variant="outline"
                  source="site_visit_page_whatsapp_alt"
                  label="Schedule Site Visit on WhatsApp"
                  className="font-mono text-xs uppercase tracking-wider font-bold"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}
