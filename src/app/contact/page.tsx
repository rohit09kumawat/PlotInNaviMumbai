import { Metadata } from 'next';
import { MessageCircle, Phone, MapPin, Navigation, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Reveal } from '@/components/shared/Reveal';
import { site } from '@/content/site';
import TownshipMapWrapper from '@/components/property/TownshipMapWrapper';
import { ConsultationForm } from '@/components/forms/ConsultationForm';

export const metadata: Metadata = {
  title: 'How to Contact | PlotInNaviMumbai.com',
  description: 'Connect with us on WhatsApp, direct call, or visit our Navi Mumbai and Mumbai offices.',
};

export default function ContactPage() {
  const phoneVal = site.phone || '+91 74248 45316';
  const whatsappVal = site.whatsapp || '917424845316';

  const mainPhoneUrl = `tel:${phoneVal.replace(/\s+/g, '')}`;
  const mainWaUrl = `https://wa.me/${whatsappVal.replace(/[^0-9]/g, '')}?text=Hi%20PlotInNaviMumbai.com%2C%20I%20would%20like%20to%20connect%20regarding%20Navi%20Mumbai%20plots.`;

  // Office Map Links
  const naviMumbaiMapUrl = "https://www.google.com/maps/search/?api=1&query=Riyasat+Infra+Centre+Point+Kolkhe+Panvel";
  const lowerParelMapUrl = "https://www.google.com/maps/search/?api=1&query=One+Lodha+Place+Lower+Parel+West+Mumbai";

  return (
    <main className="min-h-screen">
      {/* Page Title & Hero - Royal Midnight Navy */}
      <Section tone="canopy" grid={true} className="pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-white/10 text-white relative">
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Contact Us' },
            ]}
            className="text-white/70 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white/40"
          />
          <div className="max-w-3xl mt-6">
            <div className="mb-4">
              <Eyebrow className="text-sprout font-semibold">DIRECT CHANNELS</Eyebrow>
            </div>
            <h1 className="font-display text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold tracking-tight text-white uppercase leading-[1.12] mb-6">
              Connect Directly with Our Advisory Team
            </h1>
            <p className="font-sans text-lg sm:text-xl text-white/85 leading-relaxed max-w-[56ch] mb-8">
              No automated call centers or junior telemarketers. You speak directly with experienced territory advisors who check the revenue records.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/15 text-xs font-mono uppercase tracking-wider text-white/80">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-sprout font-bold">
                <Clock className="w-3.5 h-3.5 text-sprout" /> Mon – Sun: 9:30 AM – 7:30 PM
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-white font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-sprout" /> 100% Spam-Free Privacy
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact Options Grid */}
      <Section tone="panel" className="py-16 sm:py-24 border-b border-line">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            {/* WhatsApp */}
            <Reveal delay={0.05}>
              <a
                href={mainWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-7 rounded-2xl bg-[#FCFAF6] border border-line shadow-card hover:border-sprout/80 transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-canopy text-sprout flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-sprout block mb-1">
                    FASTEST RESPONSE
                  </span>
                  <h3 className="font-display text-xl font-bold text-ink mb-2">
                    WhatsApp Chat
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-ink/75 leading-relaxed">
                    Share requirements, receive plot layout PDFs, 7/12 extracts, and location coordinates instantly.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 pt-6 mt-6 border-t border-line font-mono text-xs font-bold uppercase tracking-wider text-canopy group-hover:text-sprout transition-colors">
                  <span>Chat on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>
            </Reveal>

            {/* Direct Phone Call */}
            <Reveal delay={0.1}>
              <a
                href={mainPhoneUrl}
                className="group p-7 rounded-2xl bg-[#FCFAF6] border border-line shadow-card hover:border-sprout/80 transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-canopy text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-sprout" />
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-sprout block mb-1">
                    DIRECT LINE
                  </span>
                  <h3 className="font-display text-xl font-bold text-ink mb-2">
                    Voice Call
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-ink/75 leading-relaxed">
                    Speak directly with an advisor regarding zoning permissions, pricing trends, and registry timelines.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 pt-6 mt-6 border-t border-line font-mono text-xs font-bold uppercase tracking-wider text-canopy group-hover:text-sprout transition-colors">
                  <span>{phoneVal}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>
            </Reveal>

            {/* Navi Mumbai Office */}
            <Reveal delay={0.15}>
              <a
                href={naviMumbaiMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-7 rounded-2xl bg-[#FCFAF6] border border-line shadow-card hover:border-sprout/80 transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-canopy text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-sprout" />
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-sprout block mb-1">
                    HEAD OFFICE
                  </span>
                  <h3 className="font-display text-xl font-bold text-ink mb-2">
                    Navi Mumbai Hub
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-ink/75 leading-relaxed">
                    Centre Point, Kolkhe, Mumbai-Pune Highway, Panvel. View master blueprints & survey maps.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 pt-6 mt-6 border-t border-line font-mono text-xs font-bold uppercase tracking-wider text-canopy group-hover:text-sprout transition-colors">
                  <span>Get Directions</span>
                  <Navigation className="w-3.5 h-3.5" />
                </div>
              </a>
            </Reveal>

            {/* Mumbai Experience Office */}
            <Reveal delay={0.2}>
              <a
                href={lowerParelMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-7 rounded-2xl bg-[#FCFAF6] border border-line shadow-card hover:border-sprout/80 transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-canopy text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-sprout" />
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-sprout block mb-1">
                    MUMBAI HQ
                  </span>
                  <h3 className="font-display text-xl font-bold text-ink mb-2">
                    Lower Parel Hub
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-ink/75 leading-relaxed">
                    One Lodha Place, Lower Parel West. Dedicated boardroom consultations for South Mumbai buyers.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 pt-6 mt-6 border-t border-line font-mono text-xs font-bold uppercase tracking-wider text-canopy group-hover:text-sprout transition-colors">
                  <span>Get Directions</span>
                  <Navigation className="w-3.5 h-3.5" />
                </div>
              </a>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Direct Consultation & Message Form Section */}
      <Section tone="sand" className="py-20 sm:py-28 border-b border-line">
        <Container>
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <div className="text-center mb-10">
                <span className="font-mono text-xs font-bold text-sprout uppercase tracking-widest block mb-2">
                  REQUEST A CALLBACK
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-3">
                  Leave a message or request a consultation
                </h2>
                <p className="font-sans text-base text-ink/80 leading-relaxed">
                  Share your preferred property requirement below and our senior advisor will contact you within 2 business hours.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="border border-line rounded-2xl bg-[#FCFAF6] p-7 sm:p-10 shadow-card">
                <ConsultationForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Interactive Corridor & Office Map Container */}
      <Section tone="panel" className="py-20 sm:py-28 border-b border-line">
        <Container>
          <Reveal>
            <div className="max-w-3xl mb-12 text-center mx-auto">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-sprout block mb-2">
                STRATEGIC CONNECTIVITY
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-ink tracking-tight mb-4">
                Explore Our Office Hubs & Development Corridors
              </h2>
              <p className="font-sans text-base text-ink/80 leading-relaxed">
                Both our advisory experience centers are strategically situated along high-speed corridors — minutes from the Atal Setu connector and Old Mumbai-Pune Expressway.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="p-3 sm:p-4 bg-[#FCFAF6] rounded-2xl border border-line shadow-card max-w-5xl mx-auto overflow-hidden">
              <div className="h-[400px] sm:h-[480px] w-full rounded-xl overflow-hidden">
                <TownshipMapWrapper />
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Bottom Guarantee Banner */}
      <Section tone="canopy" className="py-20 sm:py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sprout/15 via-transparent to-transparent" />
        <Container className="relative z-10 text-center max-w-2xl mx-auto">
          <Reveal>
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-sprout mb-3 block">
                OUR ZERO-SPAM POLICY
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-4">
                Your Contact Information Stays Strictly Confidential
              </h2>
              <p className="font-sans text-base text-white/80 leading-relaxed mb-8">
                We never distribute numbers to telecallers, bulk SMS aggregators, or unauthorized third parties. When you connect with us, you speak solely with our core advisory team.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={mainWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-sprout text-ink font-bold font-mono text-xs uppercase tracking-wider rounded-[var(--radius)] hover:bg-sprout/90 transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" /> Message on WhatsApp
                </a>
                <a
                  href={mainPhoneUrl}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold font-mono text-xs uppercase tracking-wider rounded-[var(--radius)] border border-white/20 transition-all"
                >
                  <Phone className="w-4 h-4 text-sprout" /> Call {phoneVal}
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
