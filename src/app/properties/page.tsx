import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { properties } from '@/content/properties';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Reveal } from '@/components/shared/Reveal';
import TownshipMapWrapper from '@/components/property/TownshipMapWrapper';
import { DroneVideoSection } from '@/components/property/DroneVideoSection';
import { TownshipDroneModal } from '@/components/property/TownshipDroneModal';
import { ShieldCheck, MapPin, CheckCircle2, ArrowRight, Phone, MessageCircle, Navigation, Tag, Play } from 'lucide-react';
import { site } from '@/content/site';

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: '100% Legal Townships Portfolio | Fixed Rates | PlotInNaviMumbai.com',
  description: '100% legal, clear-title residential and commercial plotted townships in Navi Mumbai & Panvel with strictly fixed, transparent rates. MahaRERA registered.',
};

export default function PropertiesPage() {
  const phoneVal = site.phone || '+91 74248 45316';
  const whatsappVal = site.whatsapp || '917424845316';

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 bg-ink text-white overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0 select-none opacity-20">
          <Image
            src="/riyasat-township.png"
            alt="Riyasat Township layout blueprint"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/80 to-ink" />
        </div>

        <Container className="relative z-10">
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Property Portfolio' },
              ]}
              className="text-white/70 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white/40"
            />
          </div>

          <div className="max-w-3xl">
            <div className="mb-4">
              <Eyebrow className="text-sprout font-semibold">VERIFIED PLOTTED DEVELOPMENTS</Eyebrow>
            </div>
            <h1 className="font-display text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold text-white tracking-tight leading-[1.12] mb-6 uppercase">
              100% Legal Plotted Townships Portfolio
            </h1>
            <p className="font-sans text-lg sm:text-xl text-white/85 leading-relaxed max-w-[56ch] mb-8">
              We exclusively sell 100% legal, clear-title, and MahaRERA-sanctioned residential and commercial NA plotted developments across Navi Mumbai and Panvel — with transparent, strictly fixed rates. Zero disputed plots, zero hidden charges, zero bargaining games.
            </p>

            {/* Verification Credentials Pill Row */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/15 text-xs font-mono uppercase tracking-wider text-white/90">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sprout/20 border border-sprout/40 text-sprout font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-sprout" /> 100% Legal Projects Only
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-white font-bold">
                <Tag className="w-3.5 h-3.5 text-sprout" /> Strictly Fixed Rates
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-white">
                <CheckCircle2 className="w-3.5 h-3.5 text-sprout" /> 100% Clear Title NA
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-white">
                <MapPin className="w-3.5 h-3.5 text-sprout" /> MahaRERA Sanctioned
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Townships List Section */}
      <Section tone="panel" className="py-16 sm:py-24 border-b border-line">
        <Container>
          <div className="flex flex-col gap-16 sm:gap-24">
            {properties.map((property, idx) => {
              // Format plot size
              const sizes = property.plotSizes.map((s) => s.sqft);
              const minSize = Math.min(...sizes);
              const maxSize = Math.max(...sizes);
              const sizeString = minSize === maxSize
                ? `${minSize} sq ft`
                : `${minSize} – ${maxSize} sq ft`;

              // Format location
              const locationString = `${property.location.sector ? property.location.sector + ', ' : ''}${property.location.landmark}`;

              // Format project type display
              const typeString = property.type === 'na-plot'
                ? 'NA Plotted Development'
                : property.type === 'residential-plot'
                ? 'Residential Plotted Township'
                : property.type === 'commercial-plot'
                ? 'Commercial Plotted Development'
                : 'Plotted Development';

              return (
                <Reveal key={property.slug} delay={idx * 0.05}>
                  <div className="bg-white border border-line rounded-2xl overflow-hidden shadow-card hover:border-sprout/80 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* Left Column: Image with Badge Overlay */}
                    <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto min-h-[280px] lg:min-h-full overflow-hidden bg-panel">
                      {property.images[0] && (
                        <Image
                          src={property.images[0].src}
                          alt={property.images[0].alt}
                          fill
                          priority={idx === 0}
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                        />
                      )}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <span className="bg-ink/90 backdrop-blur-md text-sprout font-mono text-[0.6875rem] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-sm border border-white/10">
                          {property.node.toUpperCase()} NODE
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4 flex items-center gap-2">
                        <TownshipDroneModal
                          propertyName={property.name}
                          node={property.node}
                          landmark={property.location.landmark}
                          droneVideoId={property.droneVideoId}
                          droneVideoUrl={property.droneVideoUrl}
                          instagramReelUrl={property.instagramReelUrl}
                          previewImage={property.images[0]?.src}
                        >
                          <button
                            type="button"
                            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-[0.6875rem] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md hover:opacity-95 hover:scale-[1.02] transition-all cursor-pointer"
                          >
                            <InstagramIcon className="w-3 h-3" />
                            <span>Drone Reel</span>
                          </button>
                        </TownshipDroneModal>
                      </div>
                    </div>

                    {/* Right Column: Information & Details Grid */}
                    <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <span className="font-mono text-xs font-bold uppercase tracking-widest text-sprout">
                            {typeString}
                          </span>
                          <span className="font-mono text-xs text-muted">
                            Plot sizes from {minSize} sq ft
                          </span>
                        </div>

                        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink uppercase tracking-tight mb-4">
                          {property.name}
                        </h2>

                        <p className="font-sans text-sm text-ink/80 leading-relaxed mb-6">
                          {property.tagline}
                        </p>

                        {/* Details Specifications Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-panel border border-line/70 mb-6 text-left">
                          <div>
                            <div className="font-mono text-[0.625rem] font-bold tracking-wider text-muted uppercase">
                              Location
                            </div>
                            <div className="text-sm font-sans text-ink font-medium mt-0.5">
                              {locationString}
                            </div>
                          </div>

                          <div>
                            <div className="font-mono text-[0.625rem] font-bold tracking-wider text-muted uppercase">
                              Plot Dimensions
                            </div>
                            <div className="text-sm font-sans text-ink font-medium mt-0.5">
                              {sizeString}
                            </div>
                          </div>

                          <div className="sm:col-span-2 pt-2 border-t border-line/60">
                            <div className="font-mono text-[0.625rem] font-bold tracking-wider text-muted uppercase">
                              Township Highlights
                            </div>
                            <div className="text-xs sm:text-sm font-sans text-ink/90 mt-0.5 line-clamp-2">
                              {property.highlights.join(' · ')}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Action Footer */}
                      <div className="pt-4 border-t border-line flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <TownshipDroneModal
                            propertyName={property.name}
                            node={property.node}
                            landmark={property.location.landmark}
                            droneVideoId={property.droneVideoId}
                            droneVideoUrl={property.droneVideoUrl}
                            instagramReelUrl={property.instagramReelUrl}
                            previewImage={property.images[0]?.src}
                          >
                            <button
                              type="button"
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#833ab4]/10 hover:bg-[#833ab4]/20 text-[#833ab4] font-mono text-xs font-bold uppercase tracking-wider transition-colors border border-[#833ab4]/20 cursor-pointer"
                            >
                              <InstagramIcon className="w-3.5 h-3.5" />
                              <span>Watch Drone Reel</span>
                              <Play className="w-3 h-3 ml-0.5 fill-[#833ab4]" />
                            </button>
                          </TownshipDroneModal>
                          <span className="font-mono text-xs text-muted hidden sm:inline">
                            · 4 Real Photos
                          </span>
                        </div>
                        <Link
                          href={`/properties/${property.node}/${property.slug}`}
                          className="inline-flex items-center justify-center gap-2 font-mono text-xs font-bold uppercase tracking-wider bg-canopy hover:bg-moss text-white px-6 py-3 rounded-[var(--radius)] transition-colors group shadow-xs"
                        >
                          <span>Explore Layout & Documents</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Mumbai 3.0 (Third Mumbai) Mega Video Documentary Section */}
      <Section tone="canopy" className="py-20 sm:py-28 border-b border-line text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sprout/15 via-transparent to-transparent pointer-events-none" />
        <Container className="relative z-10">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="mb-3">
                <Eyebrow className="text-sprout font-bold tracking-widest">MUMBAI 3.0 · SPECIAL DOCUMENTARY</Eyebrow>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-white uppercase tracking-tight mb-4">
                Mumbai 3.0 (Third Mumbai) Megaprojects & Plotted Corridors
              </h2>
              <p className="text-sm sm:text-base font-sans text-white/80 leading-relaxed max-w-2xl mx-auto">
                Exclusive ground-level video breakdown of the Navi Mumbai International Airport (NMIA), Atal Setu connectivity, NAINA master planning, and why plotted land along this corridor is poised for historic 10-year appreciation.
              </p>
            </div>
          </Reveal>

          <div className="max-w-5xl mx-auto">
            <DroneVideoSection
              videoId={site.mumbai3VideoId || site.featuredDroneVideoId}
              videoUrl={site.mumbai3VideoUrl || site.featuredDroneVideoUrl}
              title="Mumbai 3.0 (Third Mumbai) Ground-Zero Walkthrough"
              subtitle="Special video analysis by Rohit Kumawat & PlotInNaviMumbai.com advisory team."
              badgeText="Mumbai 3.0 Ground-Zero Video"
              emptyPlaceholderTitle="Mumbai 3.0 Special Video Coming Soon"
              emptyPlaceholderSubtitle="Rohit Kumawat dwara banaya ja raha Mumbai 3.0, Atal Setu aur Panvel plotted townships ka video tour jald hi yahan live stream hoga."
            />
          </div>
        </Container>
      </Section>

      {/* Interactive Map Section */}
      <Section tone="sand" className="py-16 sm:py-24 border-b border-line">
        <Container>
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="mb-2">
                <Eyebrow>GEOGRAPHIC OVERVIEW</Eyebrow>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink uppercase tracking-tight mb-4">
                Explore Townships on Interactive Map
              </h2>
              <p className="text-sm sm:text-base font-sans text-ink/80 leading-relaxed">
                Visualize all our gated plotted developments and premium villa projects across the Panvel, Atal Setu, and Airport growth corridors.
              </p>
            </div>
          </Reveal>

          <div className="w-full h-[480px] rounded-2xl overflow-hidden border border-line shadow-card bg-paper">
            <TownshipMapWrapper />
          </div>
        </Container>
      </Section>

      {/* Offices Section */}
      <Section tone="paper" className="py-16 sm:py-24 border-b border-line">
        <Container>
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="mb-2">
                <Eyebrow>EXPERIENCE CENTERS</Eyebrow>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink uppercase tracking-tight mb-3">
                Riyasat Infra Advisory Offices
              </h2>
              <p className="font-sans text-sm text-muted">
                Visit our physical offices for one-on-one document verification and plot planning.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Navi Mumbai Office */}
            <div className="bg-panel border border-line rounded-2xl p-7 sm:p-9 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-ink uppercase tracking-tight">
                    Navi Mumbai Office
                  </h3>
                  <span className="font-mono text-[0.625rem] font-bold text-canopy bg-paper px-2.5 py-1 rounded border border-line">
                    HEAD OFFICE
                  </span>
                </div>
                <div className="font-mono text-[0.6875rem] font-semibold tracking-wider text-muted uppercase mb-1">
                  Address & Coordinates
                </div>
                <p className="text-sm text-ink font-medium leading-relaxed mb-8">
                  2nd Floor, Centre Point, Situated at S.No. 34-A, Kolkhe, Mumbai-Pune Highway, Phalaspe Phata, Panvel, Dist. Raigad, Navi Mumbai – 410221
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-line/60">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Riyasat+Infra+Centre+Point+Kolkhe+Panvel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-line rounded-[var(--radius)] font-mono text-xs font-bold uppercase tracking-wider text-ink bg-white hover:bg-canopy hover:text-white transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-sprout" />
                  <span>Google Maps</span>
                </a>
                <a
                  href={`https://wa.me/${whatsappVal.replace(/[^0-9]/g, '')}?text=Hi%2C%20I%20would%20like%20to%20visit%20the%20Navi%20Mumbai%20Office.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-sprout text-ink hover:bg-sprout/90 rounded-[var(--radius)] font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Lower Parel Office */}
            <div className="bg-panel border border-line rounded-2xl p-7 sm:p-9 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-ink uppercase tracking-tight">
                    Lower Parel, Mumbai Office
                  </h3>
                  <span className="font-mono text-[0.625rem] font-bold text-canopy bg-paper px-2.5 py-1 rounded border border-line">
                    MUMBAI REGIONAL
                  </span>
                </div>
                <div className="font-mono text-[0.6875rem] font-semibold tracking-wider text-muted uppercase mb-1">
                  Address & Coordinates
                </div>
                <p className="text-sm text-ink font-medium leading-relaxed mb-8">
                  Unit No. 1004/1005, 10th Floor, One Lodha Place, Senapati Bapat Marg, Lower Parel West, Mumbai – 400013
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-line/60">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=One+Lodha+Place+Lower+Parel+West+Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-line rounded-[var(--radius)] font-mono text-xs font-bold uppercase tracking-wider text-ink bg-white hover:bg-canopy hover:text-white transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-sprout" />
                  <span>Google Maps</span>
                </a>
                <a
                  href={`https://wa.me/${whatsappVal.replace(/[^0-9]/g, '')}?text=Hi%2C%20I%20would%20like%20to%20visit%20the%20Lower%20Parel%20Office.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-sprout text-ink hover:bg-sprout/90 rounded-[var(--radius)] font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Bottom Dark Canopy CTA */}
      <Section tone="canopy" className="py-20 sm:py-28 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sprout/15 via-transparent to-transparent" />
        <Container className="relative z-10 text-center max-w-2xl mx-auto">
          <Reveal>
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-sprout mb-3 block">
                SITE INSPECTION & TOUR
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-4">
                Arrange a Private Family Site Tour
              </h2>
              <p className="font-sans text-base text-white/80 leading-relaxed mb-8">
                Walk through the actual plot layout, check boundary pegs, verify access roads, and inspect all amenities at your own pace with zero sales pressure.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/book-site-visit"
                  className="inline-flex items-center justify-center font-sans font-medium text-[0.9375rem] bg-sprout text-ink hover:bg-sprout/90 h-12 px-8 rounded-[var(--radius)] transition-colors gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout w-full sm:w-auto shadow-sm"
                >
                  <span>Book Free Site Visit</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`tel:${phoneVal.replace(/\s+/g, '')}`}
                  className="inline-flex items-center justify-center font-sans font-medium text-[0.9375rem] text-white border border-white/20 bg-white/10 hover:bg-white/20 h-12 px-6 rounded-[var(--radius)] transition-colors gap-2 w-full sm:w-auto"
                >
                  <Phone className="w-4 h-4 text-sprout" />
                  <span>Call Advisory Team</span>
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
