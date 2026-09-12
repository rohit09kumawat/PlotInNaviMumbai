import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Reveal } from '@/components/shared/Reveal';
import { WhatsAppButton } from '@/components/whatsapp/WhatsAppButton';
import { waMessages } from '@/lib/whatsapp';
import { 
  ArrowRight, 
  CheckCircle2, 
  Plane, 
  Train, 
  Car, 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  Trees, 
  Award,
  Zap
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Why Invest in Navi Mumbai — 10-Year Growth Projection & Megaprojects | PlotInNaviMumbai.com',
  description:
    'Comprehensive 2026–2036 investment analysis: Navi Mumbai International Airport (NMIA), Atal Setu, NAINA town planning, and why plotted land is projected to grow 250%–350% over the next decade.',
};

// 10-Year Growth Phases (2026 - 2036)
const GROWTH_TIMELINE = [
  {
    phase: 'Phase 1 · 2025 – 2028',
    title: 'The Transit Commissioning Wave',
    highlight: '+40% to +60% Baseline Growth',
    badge: 'Immediate Catalyst',
    desc: 'Commercial flights commence at Navi Mumbai International Airport (NMIA Phase 1, 20M passengers/year). Full maturation of the 21.8 km Atal Setu (MTHL) sea bridge and direct link to Ulwe Coastal Highway. Commute from South Mumbai drops permanently to 20 minutes.',
    milestones: [
      'NMIA Phase 1 commercial operations begin (runway & terminal ready)',
      'Ulwe-Chirle freeway connector brings direct expressway access to Panvel',
      'Navi Mumbai Metro Line 1 expansion linking Belapur to Pendhar and Taloja'
    ]
  },
  {
    phase: 'Phase 2 · 2028 – 2032',
    title: 'Commercial & High-Income Job Influx',
    highlight: '+70% to +110% Accelerated Surge',
    badge: 'Employment Engine',
    desc: 'Kharghar Corporate Park (BKC-2, 140 hectares) and the Aerotropolis commercial hubs go live. Over 4 to 5 Lakh corporate, fintech, aerospace, and data center jobs are created, creating unprecedented demand for private villas and plotted homes.',
    milestones: [
      'Kharghar BKC-2 attracts Fortune 500 headquarters & BFSI financial campuses',
      'India’s largest Hyperscale Data Center corridor (Airoli-Rabale-Panvel) scales up',
      'Aerotropolis 1,160-hectare logistics and 5-star hospitality hub operational'
    ]
  },
  {
    phase: 'Phase 3 · 2032 – 2036',
    title: 'Mature Megacity & Extreme Land Scarcity',
    highlight: '2.5x to 3.5x Cumulative Appreciation',
    badge: 'Scarcity Premium',
    desc: 'Completion of the 126 km Virar-Alibaug Multi-Modal Corridor. Freehold and sanctioned NA land inventory across core Panvel, Ulwe, and Kharghar corridors reaches near-total depletion. Plotted developments become ultra-scarce legacy assets like Bandra and South Mumbai today.',
    milestones: [
      'Virar-Alibaug 14-lane multi-modal corridor unifies the entire MMR industrial ring',
      'Core node land supply exhaustion creates generational capital appreciation',
      'Navi Mumbai establishes itself as western India’s premier planned metropolitan center'
    ]
  }
];

// Why Land Beats Apartments
const LAND_VS_APARTMENT = [
  {
    title: 'Finite Physical Soil vs Infinite Vertical FSI',
    land: 'Only a fixed number of ground plots exist in Panvel & Navi Mumbai. Once bought, no more land can ever be manufactured.',
    apartment: 'Developers continuously add 40 to 60 floors on existing towers, multiplying supply and diluting appreciation.',
    benefit: 'Strict Scarcity Value'
  },
  {
    title: 'Zero Structural Depreciation',
    land: 'Land does not rust, leak, or age. It gains value unconditionally as neighborhood roads, metro lines, and airports develop around it.',
    apartment: 'Concrete buildings depreciate after 20–25 years, accumulating high monthly maintenance and structural repair levies.',
    benefit: '100% Perpetual Wealth'
  },
  {
    title: '100% Undivided Freehold Ownership',
    land: 'You own the soil, the subsoil, and the air rights. Total freedom to build a private family villa, garden estate, or hold for institutional exit.',
    apartment: 'You own only a fraction of undivided share of land (UDS) and are bound by society committee bylaws and redevelopment politics.',
    benefit: 'Total Family Autonomy'
  },
  {
    title: 'Historical 15-Year Appreciation Track Record',
    land: 'Collector NA plots in early Kharghar and Panvel delivered 4.8x – 6.2x returns over the past 15 years.',
    apartment: 'Multi-story apartments in the identical sectors delivered 2.1x – 2.4x returns over the same duration.',
    benefit: '2.5x Superior ROI'
  }
];

// 4 Economic Super-Pillars
const FOUR_PILLARS = [
  {
    icon: Plane,
    title: 'The Aerotropolis (NMIA)',
    subtitle: '1,160 Hectares Mega Aero-City',
    image: '/navi-mumbai-airport.jpg',
    desc: 'Not merely an airstrip, but India’s first greenfield aerotropolis. Features integrated logistics parks, luxury 5-star hotel clusters, international convention centers, and direct metro connections.',
    stat: '90 Million',
    statLabel: 'Ultimate annual passenger capacity'
  },
  {
    icon: Car,
    title: 'Atal Setu Sea Bridge (MTHL)',
    subtitle: '21.8 km 6-Lane Maritime Freeway',
    image: '/atal-setu.jpg',
    desc: 'India’s longest sea bridge cuts travel time from South Mumbai (Sewri) to Navi Mumbai (Chirle/Ulwe) from 2.5 hours down to just 20 minutes, permanently merging Mumbai’s financial core with Navi Mumbai land.',
    stat: '20 Minutes',
    statLabel: 'Drive time to South Mumbai CBD'
  },
  {
    icon: Building2,
    title: 'Kharghar Corporate Park (BKC-2)',
    subtitle: '140 Hectares Next-Gen Financial District',
    image: '/kharghar-corporate-park.jpg',
    desc: 'Planned by CIDCO and MMRDA as an upgraded version of Bandra-Kurla Complex. Complete with smart-grid commercial towers, an 18-hole international golf course, and a 200-acre central park.',
    stat: '140 Hectares',
    statLabel: 'Dedicated corporate & financial zone'
  },
  {
    icon: Train,
    title: 'Navi Mumbai Elevated Metro',
    subtitle: 'High-Speed Rapid Transit Grid',
    image: '/navi-mumbai-metro.jpg',
    desc: 'High-speed mass transit spine linking Belapur to Pendhar, Taloja, and the upcoming Airport line. Drives unprecedented residential appreciation across connected plotted sectors.',
    stat: 'Line 1 & 2',
    statLabel: 'Active & expanding metro connectivity'
  }
];

// Visual Infrastructure Showcase Gallery
const INFRASTRUCTURE_GALLERY = [
  {
    title: 'Navi Mumbai International Airport (NMIA)',
    tag: 'Aviation & Aerotropolis',
    image: '/navi-mumbai-airport.jpg',
    caption: 'Phase 1 passenger terminal & calibrated runway ready to handle 20M passengers annually.'
  },
  {
    title: 'Atal Setu Trans Harbour Link (MTHL)',
    tag: '21.8 km Sea Bridge',
    image: '/atal-setu.jpg',
    caption: 'Connecting Sewri to Chirle/Ulwe in 20 minutes with direct 6-lane high-speed expressway access.'
  },
  {
    title: 'Kharghar Corporate Park (BKC-2)',
    tag: '140-Hectare Business Hub',
    image: '/kharghar-corporate-park.jpg',
    caption: 'Grade-A corporate towers, green boulevards, fountains, and financial headquarters.'
  },
  {
    title: 'Navi Mumbai Elevated Metro Viaduct',
    tag: 'Rapid Urban Transit',
    image: '/navi-mumbai-metro.jpg',
    caption: 'Air-conditioned transit connecting Belapur, Kharghar, Pendhar, and Taloja across green hills.'
  },
  {
    title: 'Planned Gated Plotted Townships (Panvel)',
    tag: 'Collector NA Land Assets',
    image: '/panvel-gated-township.jpg',
    caption: 'Demarcated clear-title residential villa plots with wide asphalt boulevards and mountain views.'
  },
  {
    title: 'CIDCO Planned Sector Highway Grid',
    tag: 'Master-Planned Zoning',
    image: '/navi-mumbai-infra.jpg',
    caption: 'Engineered drainage, underground electrical conduits, and separated commercial/residential sectors.'
  }
];

// Strategic Node Evaluation Matrix
const NODE_MATRIX = [
  {
    name: 'Panvel & Surrounds',
    rating: '5 / 5 · Highest Long-Term ROI',
    tag: 'Gated Villa Townships & Green Living',
    idealFor: 'Families wanting luxury plotted townships with private clubhouses, nature views, and direct 10-minute airport proximity.',
    drivers: 'NMIA Airport boundary, Old Mumbai-Pune Expressway, Navi Mumbai Panvel Coastal Highway, and rapid royal-themed township development.',
    tenYearOutlook: '+280% to +350% capital growth expected by 2036.'
  },
  {
    name: 'Ulwe & Chirle Gateway',
    rating: '5 / 5 · Fastest Cash-Flow & Velocity',
    tag: 'Direct Atal Setu Bridge Exit',
    idealFor: 'Investors seeking direct transit parity with South Mumbai, high rental absorption, and near-term commercial resale.',
    drivers: 'Direct landing interchange of Atal Setu (MTHL), Bamandongri & Kharkopar railway stations, and coastal road linkage.',
    tenYearOutlook: '+220% to +280% capital growth expected by 2036.'
  },
  {
    name: 'Kharghar & Taloja',
    rating: '4.5 / 5 · Immediate Livability',
    tag: 'Metro Connected Institutional Hub',
    idealFor: 'End-users requiring top-tier educational institutions, hospitals, metro stations, and established social infrastructure.',
    drivers: 'Operational Metro Line 1, Central Park, Golf Course, Corporate Park (BKC-2), and direct highway connectivity.',
    tenYearOutlook: '+180% to +240% capital growth expected by 2036.'
  },
  {
    name: 'Dronagiri & JNPT Corridor',
    rating: '4 / 5 · Port & Industrial Logistics',
    tag: 'Commercial & Coastal Port Hub',
    idealFor: 'Investors seeking commercial plots, warehousing assets, and long-term appreciation driven by international maritime trade.',
    drivers: 'JNPT SEZ, Direct sea route connection, Uran railway line, and Coastal Highway expansion.',
    tenYearOutlook: '+160% to +220% capital growth expected by 2036.'
  }
];

// Fascinating Knowledge Insights (Things Visitors Learn)
const FASCINATING_KNOWLEDGE = [
  {
    icon: Trees,
    title: 'The Dutch Holding-Pond Engineering: Zero Flood Waterlogging',
    desc: 'Unlike Mumbai which floods every monsoon, Navi Mumbai was engineered by Dutch water management experts using high-tide holding ponds, check gates, and natural canals. Rainwater drains out into the creek automatically without inundating residential sectors.'
  },
  {
    icon: Sparkles,
    title: '40%+ Mandatory Open Green & Hill Buffer Zones',
    desc: 'CIDCO’s master plan legally restricts development on more than 40% of the land area. The Kharghar Hills, Parsik Hill range, and Karnala Bird Sanctuary create a natural air-purification buffer, giving Navi Mumbai 45% cleaner AQI than Mumbai.'
  },
  {
    icon: ShieldCheck,
    title: 'Strict Revenue Demarcation: No Slum Encroachment Risk',
    desc: 'Every sanctioned NA plotted township is governed by strict cadastral survey numbers, Collector NA orders, and town planning layouts. Unlike organic cities, you receive clean, undisputed ownership backed by revenue records.'
  },
  {
    icon: Zap,
    title: 'Global Data Center Capital of South Asia',
    desc: 'Due to robust power infrastructure and undersea internet cable landings, Navi Mumbai hosts over 65% of India’s new data centers. Global giants including NTT, AWS, Microsoft, and Yotta are investing over ₹1.2 Lakh Crore in this single belt.'
  }
];

export default function WhyNaviMumbaiPage() {
  return (
    <main className="min-h-screen">
      {/* Cinematic Hero Section */}
      <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-32 bg-ink text-white overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 select-none overflow-hidden">
          <Image
            src="/atal-setu.jpg"
            alt="Atal Setu Trans Harbour Link connecting Navi Mumbai at dusk"
            fill
            priority
            className="object-cover opacity-30 scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/65" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sprout/15 via-transparent to-transparent" />
        </div>

        <Container className="relative z-10">
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Why Navi Mumbai' },
              ]}
              className="text-white/70 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white/40"
            />
          </div>

          <div className="max-w-4xl">
            <div className="mb-4">
              <Eyebrow className="text-sprout font-semibold">2026–2036 INVESTMENT INTELLIGENCE &amp; GROWTH DISCOVERY</Eyebrow>
            </div>
            <h1 className="font-display text-[clamp(2.25rem,5.5vw,3.875rem)] font-bold text-white tracking-tight leading-[1.12] mb-6 uppercase">
              The Epicentre of India&apos;s Trillion-Dollar Infrastructure Corridor
            </h1>
            <p className="font-sans text-lg sm:text-xl text-white/85 leading-relaxed max-w-[62ch] mb-10">
              Why the Panvel-NAINA-Airport triangle is entering the steepest wealth creation and capital appreciation cycle in Western India over the next 10 years.
            </p>

            {/* 4 Super Metrics Ribbon */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-left shadow-2xl">
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-sprout">₹2.5L+ Cr</div>
                <div className="text-xs text-white/80 font-sans mt-1">Total regional mega-infrastructure budget</div>
              </div>
              <div className="border-l border-white/15 pl-4">
                <div className="font-display text-2xl sm:text-3xl font-bold text-sprout">250%–350%</div>
                <div className="text-xs text-white/80 font-sans mt-1">10-Year plotted land appreciation forecast</div>
              </div>
              <div className="border-t sm:border-t-0 border-white/15 pt-3 sm:pt-0 sm:border-l sm:pl-4">
                <div className="font-display text-2xl sm:text-3xl font-bold text-sprout">5,00,000+</div>
                <div className="text-xs text-white/80 font-sans mt-1">High-skilled aerospace, BFSI &amp; IT jobs</div>
              </div>
              <div className="border-t sm:border-t-0 border-white/15 pt-3 sm:pt-0 border-l border-white/15 pl-4">
                <div className="font-display text-2xl sm:text-3xl font-bold text-sprout">20 Mins</div>
                <div className="text-xs text-white/80 font-sans mt-1">Direct to South Mumbai via Atal Setu</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 1: 10-YEAR GROWTH ROADMAP (2026 - 2036) */}
      <Section tone="paper" className="py-20 sm:py-28 border-b border-line bg-[#FCFAF6]">
        <Container>
          <Reveal>
            <div className="max-w-3xl mb-14">
              <div className="mb-3">
                <Eyebrow className="text-canopy font-semibold">10-YEAR CAPITAL APPRECIATION FORECAST</Eyebrow>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-ink tracking-tight mb-4">
                Navi Mumbai’s 10-Year Growth Trajectory (2026 – 2036)
              </h2>
              <p className="font-sans text-base sm:text-lg text-ink/80 leading-relaxed">
                Land appreciation does not happen in a straight line; it surges in three distinct exponential waves as transit projects transition from construction to commercial utilization.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {GROWTH_TIMELINE.map((stage, idx) => (
              <Reveal key={stage.phase} delay={idx * 0.08}>
                <div className="bg-white rounded-2xl border border-line p-7 sm:p-8 shadow-card flex flex-col justify-between h-full hover:border-canopy transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="font-mono text-xs font-bold text-canopy bg-sprout/20 border border-sprout/40 px-3 py-1 rounded-full uppercase tracking-wider">
                        {stage.phase}
                      </span>
                      <span className="font-mono text-[0.6875rem] font-bold text-ink bg-panel px-2.5 py-1 rounded border border-line">
                        {stage.badge}
                      </span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold text-ink mb-2 leading-snug">
                      {stage.title}
                    </h3>

                    <div className="font-mono text-sm font-bold text-sprout bg-ink px-3 py-1.5 rounded-lg inline-block mb-4">
                      {stage.highlight}
                    </div>

                    <p className="font-sans text-sm text-ink/80 leading-relaxed mb-6">
                      {stage.desc}
                    </p>

                    <div className="space-y-2.5 pt-4 border-t border-line">
                      <span className="font-mono text-[0.625rem] font-bold text-muted uppercase tracking-widest block mb-2">
                        KEY CATALYSTS
                      </span>
                      {stage.milestones.map((milestone, mIdx) => (
                        <div key={mIdx} className="flex items-start gap-2 text-xs text-ink/85 font-sans leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-canopy shrink-0 mt-0.5" />
                          <span>{milestone}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-line/60 font-mono text-[0.6875rem] text-muted flex items-center justify-between">
                    <span>Wave 0{idx + 1} of 03</span>
                    <span className="text-canopy font-bold">Compound Alpha</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* SECTION 2: WHY PLOTTED LAND BEATS APARTMENTS (NEW KNOWLEDGE) */}
      <Section tone="panel" className="py-20 sm:py-28 border-b border-line">
        <Container>
          <Reveal>
            <div className="max-w-3xl mb-14">
              <div className="mb-3">
                <Eyebrow className="text-canopy font-semibold">THE ASSET CLASS REALITY</Eyebrow>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-ink tracking-tight mb-4">
                The Mathematics of Land vs. High-Rise Apartments
              </h2>
              <p className="font-sans text-base sm:text-lg text-ink/80 leading-relaxed">
                Most homebuyers default to buying 2 BHK or 3 BHK apartments without realizing that high-rises suffer structural depreciation. Here is why plotted developments produce 2.5x higher wealth.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {LAND_VS_APARTMENT.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 0.06}>
                <div className="bg-[#FCFAF6] rounded-2xl border border-line p-7 sm:p-8 shadow-card flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display text-lg sm:text-xl font-bold text-ink leading-snug">
                        {item.title}
                      </h3>
                      <span className="font-mono text-[0.6875rem] font-bold text-canopy bg-sprout/20 border border-sprout/40 px-2.5 py-1 rounded-full shrink-0">
                        {item.benefit}
                      </span>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div className="p-4 rounded-xl bg-white border border-sprout/40 shadow-2xs">
                        <span className="font-mono text-[0.6875rem] font-bold text-canopy uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-canopy" /> Plotted Land (Clear-Title NA)
                        </span>
                        <p className="font-sans text-xs sm:text-sm text-ink/85 leading-relaxed">
                          {item.land}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-panel/60 border border-line">
                        <span className="font-mono text-[0.6875rem] font-bold text-muted uppercase tracking-wider block mb-1">
                          Standard Multi-Story Apartment
                        </span>
                        <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed">
                          {item.apartment}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* SECTION 3: 4 ECONOMIC ENGINES RESHAPING NAVI MUMBAI */}
      <Section tone="sand" className="py-20 sm:py-28 border-b border-line">
        <Container>
          <Reveal>
            <div className="max-w-3xl mb-14">
              <div className="mb-3">
                <Eyebrow className="text-canopy font-semibold">INFRASTRUCTURE PILLARS</Eyebrow>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-ink tracking-tight mb-4">
                The Four Economic Engines Powering the Region
              </h2>
              <p className="font-sans text-base sm:text-lg text-ink/80 leading-relaxed">
                Land values are mathematically tied to public capital expenditure. Over ₹2,50,000 Crore is actively transforming Navi Mumbai into India’s most modern twin city.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FOUR_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.title} delay={idx * 0.05}>
                  <div className="bg-white rounded-2xl border border-line overflow-hidden shadow-card flex flex-col justify-between h-full hover:border-canopy transition-all duration-300 group">
                    <div>
                      {/* Photographic Header */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-panel">
                        <Image
                          src={pillar.image}
                          alt={pillar.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 1024px) 100vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
                        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                          <span className="font-mono text-[0.625rem] font-bold text-sprout uppercase tracking-wider bg-ink/85 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                            {pillar.subtitle}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 sm:p-6">
                        <div className="flex items-center gap-2.5 mb-2.5">
                          <div className="w-8 h-8 rounded-lg bg-panel border border-line flex items-center justify-center text-canopy shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <h3 className="font-display text-lg font-bold text-ink leading-snug">
                            {pillar.title}
                          </h3>
                        </div>
                        <p className="font-sans text-xs text-ink/75 leading-relaxed mb-4">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 pt-0 border-t border-line/60 mt-auto">
                      <div className="font-display text-xl font-bold text-canopy pt-3">
                        {pillar.stat}
                      </div>
                      <div className="font-sans text-[0.6875rem] text-muted">
                        {pillar.statLabel}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* SECTION 4: FASCINATING KNOWLEDGE (THINGS VISITORS WILL LOVE TO LEARN) */}
      <Section tone="paper" className="py-20 sm:py-28 border-b border-line bg-[#FCFAF6]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="mb-3">
                  <Eyebrow className="text-canopy font-semibold">PLANNING GENIUS</Eyebrow>
                </div>
                <h2 className="font-display text-2xl sm:text-4xl font-bold text-ink tracking-tight mb-6">
                  What Makes Navi Mumbai Truly Exceptional
                </h2>
                <p className="font-sans text-base text-ink/80 leading-relaxed mb-8">
                  While most Indian cities developed organically without foresight, Navi Mumbai was conceived by master architects Charles Correa, Shirish Patel, and Pravina Mehta. Here are four hidden planning truths that guarantee high livability.
                </p>

                <div className="p-6 rounded-2xl bg-white border border-line shadow-card space-y-3">
                  <div className="flex items-center gap-3">
                    <Award className="w-6 h-6 text-canopy shrink-0" />
                    <div>
                      <h4 className="font-display text-base font-bold text-ink">Zero Waterlogging Guarantee</h4>
                      <p className="text-xs text-muted">Dutch tidal holding ponds prevent monsoon flooding.</p>
                    </div>
                  </div>
                  <div className="border-t border-line/60 pt-3 flex items-center gap-3">
                    <Trees className="w-6 h-6 text-canopy shrink-0" />
                    <div>
                      <h4 className="font-display text-base font-bold text-ink">45% Better AQI than Mumbai</h4>
                      <p className="text-xs text-muted">Protected green buffer zones and sea breezes.</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {FASCINATING_KNOWLEDGE.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={item.title} delay={idx * 0.06}>
                      <div className="bg-white rounded-2xl border border-line p-6 shadow-card flex flex-col justify-between h-full">
                        <div>
                          <div className="w-10 h-10 rounded-xl bg-sprout/20 flex items-center justify-center text-canopy mb-4">
                            <Icon className="w-5 h-5" />
                          </div>
                          <h3 className="font-display text-base font-bold text-ink mb-2 leading-snug">
                            {item.title}
                          </h3>
                          <p className="font-sans text-xs text-ink/80 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* SECTION 5: STRATEGIC NODE EVALUATION MATRIX */}
      <Section tone="panel" className="py-20 sm:py-28 border-b border-line">
        <Container>
          <Reveal>
            <div className="max-w-3xl mb-14">
              <div className="mb-3">
                <Eyebrow className="text-canopy font-semibold">CORRIDOR COMPARISON MATRIX</Eyebrow>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-ink tracking-tight mb-4">
                Which Navi Mumbai Node Matches Your Land Goals?
              </h2>
              <p className="font-sans text-base sm:text-lg text-ink/80 leading-relaxed">
                Different sectors serve different investor objectives — from luxury gated family villas in Panvel to high-turnover appreciation in Ulwe.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NODE_MATRIX.map((node, idx) => (
              <Reveal key={node.name} delay={idx * 0.06}>
                <div className="bg-[#FCFAF6] border border-line rounded-2xl p-7 shadow-card flex flex-col justify-between h-full">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <h3 className="font-display text-xl font-bold text-ink">{node.name}</h3>
                      <span className="font-mono text-[0.6875rem] font-bold text-canopy bg-sprout/20 border border-sprout/40 px-2.5 py-1 rounded-full">
                        {node.tag}
                      </span>
                    </div>

                    <div className="font-mono text-xs font-semibold text-canopy mb-4">
                      {node.rating}
                    </div>

                    <div className="space-y-3 pt-2 text-sm text-ink/85 font-sans leading-relaxed">
                      <div>
                        <strong className="text-ink font-semibold block text-xs font-mono uppercase tracking-wider text-muted mb-0.5">
                          Ideal Investor Fit:
                        </strong>
                        <p className="text-xs sm:text-sm text-ink/80">{node.idealFor}</p>
                      </div>

                      <div className="pt-2 border-t border-line/60">
                        <strong className="text-ink font-semibold block text-xs font-mono uppercase tracking-wider text-muted mb-0.5">
                          Key Drivers:
                        </strong>
                        <p className="text-xs sm:text-sm text-ink/80">{node.drivers}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-line bg-white/70 rounded-xl p-3.5 border border-line/80">
                    <span className="font-mono text-[0.625rem] font-bold text-sprout uppercase tracking-widest block mb-0.5">
                      10-YEAR CAPITAL OUTLOOK
                    </span>
                    <span className="font-sans text-xs font-semibold text-canopy">
                      {node.tenYearOutlook}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* SECTION: VISUAL INFRASTRUCTURE SHOWCASE GALLERY */}
      <Section tone="paper" className="py-20 sm:py-28 border-b border-line bg-[#FCFAF6]">
        <Container>
          <Reveal>
            <div className="max-w-3xl mb-14">
              <div className="mb-3">
                <Eyebrow className="text-canopy font-semibold">THE GROUND REALITY IN PICTURES</Eyebrow>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-ink tracking-tight mb-4">
                Navi Mumbai Infrastructure Showcase
              </h2>
              <p className="font-sans text-base sm:text-lg text-ink/80 leading-relaxed">
                Explore the engineering marvels and master-planned plotted developments turning Navi Mumbai into India&apos;s most sought-after land wealth corridor.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INFRASTRUCTURE_GALLERY.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 0.06}>
                <div className="bg-white rounded-2xl border border-line overflow-hidden shadow-card group hover:border-canopy transition-all duration-300 flex flex-col h-full">
                  <div className="relative aspect-[16/10] overflow-hidden bg-panel">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute top-3 left-3">
                      <span className="font-mono text-[0.625rem] font-bold text-sprout uppercase tracking-wider bg-ink/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-display text-lg font-bold text-ink mb-2 leading-snug group-hover:text-canopy transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-ink/75 leading-relaxed">
                        {item.caption}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-line/60 flex items-center justify-between text-xs font-mono text-muted">
                      <span className="text-canopy font-bold">Verified Infrastructure</span>
                      <span className="text-ink/60">Active Asset</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* SECTION 6: FREQUENT VISITOR QUESTIONS ON GROWTH (Q&A) */}
      <Section tone="sand" className="py-20 sm:py-28 border-b border-line">
        <Container>
          <Reveal>
            <div className="max-w-3xl mb-12">
              <div className="mb-3">
                <Eyebrow className="text-canopy font-semibold">INVESTOR CLARITY &amp; ANSWERS</Eyebrow>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-ink tracking-tight mb-4">
                Navi Mumbai Growth Questions, Answered Plainly
              </h2>
              <p className="font-sans text-base text-ink/80 leading-relaxed">
                Straight, data-backed answers to the most common questions asked by plot buyers evaluating Navi Mumbai for the next decade.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
            <div className="bg-white rounded-2xl border border-line p-6 sm:p-7 shadow-card">
              <h3 className="font-display text-lg font-bold text-ink mb-2">
                Will airport operations really trigger a doubling of land prices?
              </h3>
              <p className="font-sans text-sm text-ink/80 leading-relaxed">
                Historically in Bengaluru (Devanahalli) and Hyderabad (Shamshabad), land within 15 km of the new international airport appreciated 3.5x to 5x within 6 years of commercial flights commencing. Panvel and Ulwe land prices are following an identical trajectory due to extreme geographical supply constraints.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-line p-6 sm:p-7 shadow-card">
              <h3 className="font-display text-lg font-bold text-ink mb-2">
                Why is Panvel preferred over older nodes like Vashi or Nerul?
              </h3>
              <p className="font-sans text-sm text-ink/80 leading-relaxed">
                Older nodes like Vashi and Nerul are fully built out with high-rises and have zero available land for private villa townships. Panvel offers the unique confluence of fresh air, mountain backdrops, massive land expanses, and direct 10-minute access to NMIA.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-line p-6 sm:p-7 shadow-card">
              <h3 className="font-display text-lg font-bold text-ink mb-2">
                How does NAINA town planning protect private plot owners?
              </h3>
              <p className="font-sans text-sm text-ink/80 leading-relaxed">
                Under the NAINA Town Planning Scheme (TPS), 40% of land is surrendered for public highways, parks, and schools, while 60% is returned to developers as sanitized, 100% legal residential plots with finalized survey demarcation and guaranteed road widths.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-line p-6 sm:p-7 shadow-card">
              <h3 className="font-display text-lg font-bold text-ink mb-2">
                Can I exit or resell my plot easily after 5 to 7 years?
              </h3>
              <p className="font-sans text-sm text-ink/80 leading-relaxed">
                Yes. Gated plotted communities with active MahaRERA registrations and clear Collector NA sanctions have the highest secondary market liquidity because end-users can immediately secure home loans from nationalized banks (SBI, HDFC, ICICI).
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* SECTION 7: CALL TO ACTION - CONNECT DIRECTLY */}
      <Section tone="canopy" className="py-20 sm:py-28 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-sprout/15 via-transparent to-transparent" />
        <Container className="relative z-10">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-sprout mb-3 block">
                UNBIASED DUE DILIGENCE &amp; ADVISORY
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
                Want to Position Your Family in Navi Mumbai’s Growth Corridor?
              </h2>
              <p className="font-sans text-base sm:text-lg text-white/80 leading-relaxed mb-8 max-w-[54ch] mx-auto">
                Consult directly with Rohit Kumawat and our land advisory team. We review verified survey numbers, discuss upcoming TPS phases, and guide your site visits with zero sales pressure.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/properties"
                  className="inline-flex items-center justify-center font-sans font-bold text-[0.9375rem] bg-sprout text-ink hover:bg-sprout/90 h-12 px-8 rounded-xl transition-colors gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout w-full sm:w-auto shadow-sm"
                >
                  <span>Explore Verified Townships Portfolio</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <WhatsAppButton
                  message={waMessages.consultation()}
                  variant="secondary"
                  source="why_navi_mumbai_footer"
                  label="Discuss 10-Year Growth on WhatsApp"
                  className="w-full sm:w-auto text-white border-white/20 bg-white/10 hover:bg-white/20 h-12 px-6 rounded-xl"
                />
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
