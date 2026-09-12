import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllNodes, getPropertiesByNode } from '@/lib/properties';
import { PropertyGrid } from '@/components/property/PropertyGrid';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Reveal } from '@/components/shared/Reveal';
import { ShieldCheck, ArrowRight, CheckCircle2, MapPin } from 'lucide-react';

type Props = {
  params: Promise<{ node: string }>;
};

export async function generateStaticParams() {
  const nodes = getAllNodes();
  return nodes.map((node) => ({
    node: node.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const nodes = getAllNodes();
  const node = nodes.find((n) => n.slug === resolvedParams.node);

  if (!node) {
    return { title: 'Not Found | PlotInNaviMumbai.com' };
  }

  return {
    title: `Plots in ${node.name}, Navi Mumbai | PlotInNaviMumbai.com`,
    description: `Independent guidance on ${node.name} land and plots. Verify documents, check prices, and request a family tour before you buy.`,
  };
}

export default async function NodeLandingPage({ params }: Props) {
  const resolvedParams = await params;
  const nodes = getAllNodes();
  const node = nodes.find((n) => n.slug === resolvedParams.node);

  if (!node) {
    notFound();
  }

  const properties = getPropertiesByNode(node.slug);

  return (
    <main className="min-h-screen">
      {/* Hero Section - Royal Midnight Navy */}
      <Section tone="canopy" grid={true} className="pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-white/10 text-white relative">
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Properties', href: '/properties' },
              { label: node.name },
            ]}
            className="text-white/70 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white/40"
          />
          <div className="flex flex-col gap-4 max-w-3xl mt-6">
            <div className="mb-1">
              <Eyebrow className="text-sprout font-semibold">CORRIDOR SPOTLIGHT</Eyebrow>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase">
              Plots in {node.name}
            </h1>
            {node.description && (
              <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-[56ch]">
                {node.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 mt-3">
              <span className="font-mono text-xs text-ink bg-sprout px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
                {properties.length} {properties.length === 1 ? 'Development' : 'Developments'} Available
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-white/80 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sprout" /> 100% Title Clear & MahaRERA Sanctioned
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Property Grid on Soft Panel */}
      <Section tone="panel" className="py-16 sm:py-24 border-b border-line">
        <Container>
          {properties.length === 0 ? (
            <div className="text-center py-20 bg-[#FCFAF6] rounded-2xl border border-line p-8 max-w-md mx-auto shadow-sm">
              <p className="font-display text-xl text-ink font-semibold mb-2">No Active Townships</p>
              <p className="font-sans text-sm text-muted-foreground mb-6">
                We are currently reviewing revenue records for upcoming developments in {node.name}.
              </p>
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-canopy hover:text-sprout"
              >
                View all corridors <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between pb-4 border-b border-line">
                <h2 className="font-display text-xl font-bold uppercase tracking-tight text-ink">
                  Available Sanctioned Townships
                </h2>
                <span className="font-mono text-xs text-muted">
                  Showing {properties.length} projects
                </span>
              </div>
              <PropertyGrid properties={properties} />
            </div>
          )}
        </Container>
      </Section>

      {/* Corridor Guidance Callout on Warm Sand */}
      <Section tone="sand" className="py-16 sm:py-24 border-b border-line">
        <Container>
          <Reveal>
            <div className="max-w-4xl mx-auto bg-[#FCFAF6] border border-line rounded-2xl p-8 sm:p-12 shadow-card">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-sprout">
                  CORRIDOR ADVISORY
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                  Why Consider {node.name} for Plotted Land?
                </h3>
                <p className="font-sans text-base text-ink/80 leading-relaxed">
                  {node.name} stands out due to planned infrastructure, wide arterial access roads, and seamless proximity to the Mumbai Trans Harbour Link (Atal Setu) and Navi Mumbai International Airport.
                </p>
                <div className="pt-4 border-t border-line flex flex-wrap gap-4 text-xs font-mono uppercase tracking-wider text-muted">
                  <span className="flex items-center gap-1 text-ink font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-canopy" /> CIDCO / NAINA Planning Horizon
                  </span>
                  <span className="flex items-center gap-1 text-ink font-semibold">
                    <MapPin className="w-4 h-4 text-canopy" /> Direct Highway Transit
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* CTA on Canopy */}
      <Section tone="canopy" className="py-20 sm:py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sprout/15 via-transparent to-transparent" />
        <Container className="relative z-10 text-center max-w-2xl mx-auto">
          <Reveal>
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-sprout mb-3 block">
                TERRITORY ADVISORY
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-4">
                Need Specific Sector Insights in {node.name}?
              </h2>
              <p className="font-sans text-base text-white/80 leading-relaxed mb-8">
                Speak with our local territory specialists to review sanctioned town planning maps and recent circle rate revisions.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-sprout text-ink font-bold font-mono text-xs uppercase tracking-wider rounded-[var(--radius)] hover:bg-sprout/90 transition-all shadow-sm"
              >
                Consult {node.name} Specialist
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
