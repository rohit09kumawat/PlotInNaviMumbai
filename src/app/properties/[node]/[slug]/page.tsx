import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllProperties, getPropertyBySlug } from '@/lib/properties';
import { nodes } from '@/content/nodes';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { PropertyGallery } from '@/components/property/PropertyGallery';
import { DroneVideoSection } from '@/components/property/DroneVideoSection';
import { VerificationRecord } from '@/components/property/VerificationRecord';
import { WhyWeLikeThis } from '@/components/property/WhyWeLikeThis';
import { PropertyFit } from '@/components/property/PropertyFit';
import { NearbyLandmarks } from '@/components/property/NearbyLandmarks';
import { PropertyEnquiryPanel } from '@/components/property/PropertyEnquiryPanel';
import { StatusPill } from '@/components/shared/StatusPill';
import { JsonLd } from '@/components/seo/JsonLd';
import { site } from '@/content/site';
import { realEstateListingSchema, breadcrumbListSchema } from '@/lib/jsonld';
import { ShieldCheck, CheckCircle2, ArrowRight, MapPin, Building, Sparkles } from 'lucide-react';

type Props = {
  params: Promise<{ node: string; slug: string }>;
};

export async function generateStaticParams() {
  const properties = getAllProperties();
  return properties.map((p) => ({
    node: p.node,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const property = getPropertyBySlug(resolvedParams.node, resolvedParams.slug);

  if (!property) {
    return { title: 'Not Found | PlotInNaviMumbai.com' };
  }

  return {
    title: property.seo.title,
    description: property.seo.description,
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const property = getPropertyBySlug(resolvedParams.node, resolvedParams.slug);

  if (!property) {
    notFound();
  }

  const node = nodes.find((n) => n.slug === property.node);
  const nodeName = node ? node.name : property.node;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Properties', href: '/properties' },
    { label: nodeName, href: `/properties/${property.node}` },
    { label: property.name },
  ];

  // Calculate size string
  const sizes = property.plotSizes.map((s) => s.sqft);
  const minSize = Math.min(...sizes);
  const maxSize = Math.max(...sizes);
  const sizeString = minSize === maxSize
    ? `${minSize} sq ft`
    : `${minSize} – ${maxSize} sq ft`;

  return (
    <main className="bg-paper min-h-screen">
      <JsonLd
        data={[
          realEstateListingSchema(property),
          breadcrumbListSchema(breadcrumbs),
        ]}
      />

      {/* Header Banner & Breadcrumbs */}
      <section className="pt-28 pb-6 sm:pt-36 border-b border-line bg-panel">
        <Container>
          <Breadcrumbs items={breadcrumbs} />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-6">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="font-mono text-[0.6875rem] font-bold tracking-wider uppercase text-sprout bg-ink px-2.5 py-1 rounded">
                  {nodeName} {property.location.sector ? `· ${property.location.sector}` : ''}
                </span>
                {property.verification.rera.reference && (
                  <span className="font-mono text-[0.6875rem] font-medium text-canopy bg-white border border-line px-2.5 py-1 rounded flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-sprout" /> MahaRERA: {property.verification.rera.reference}
                  </span>
                )}
                {property.availability === 'sold-out' && (
                  <StatusPill status="not-applicable" label="Sold Out" />
                )}
                {property.availability === 'few-remaining' && (
                  <StatusPill status="under-review" label="Few Remaining" />
                )}
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink uppercase tracking-tight mb-2">
                {property.name}
              </h1>
              <p className="text-base sm:text-lg text-ink/80 max-w-2xl">
                {property.tagline}
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-line shadow-xs shrink-0 text-left md:text-right">
              <div className="font-mono text-[0.625rem] font-bold text-muted uppercase tracking-wider">
                Plot Configuration
              </div>
              <div className="font-display text-lg font-bold text-ink">
                {sizeString}
              </div>
              <div className="font-mono text-xs text-canopy font-semibold">
                {property.priceNote || 'Price on Request'}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-10">
        {/* Gallery */}
        <div className="mb-10">
          <PropertyGallery 
            images={property.images} 
            name={property.name} 
            node={property.node}
            landmark={property.location.landmark}
            droneVideoId={property.droneVideoId}
            droneVideoUrl={property.droneVideoUrl}
            instagramReelUrl={property.instagramReelUrl} 
          />
        </div>

        {/* Mobile Enquiry Panel (shows before content on small screens) */}
        <div className="block md:hidden mb-10">
          <PropertyEnquiryPanel property={property} />
        </div>

        <div className="flex flex-col md:flex-row gap-10 lg:gap-14 items-start">
          {/* Main Content (Left Column) */}
          <div className="flex-1 w-full max-w-[760px] flex flex-col gap-10">
            {/* Overview Card */}
            <div className="bg-white rounded-2xl border border-line p-6 sm:p-8 shadow-xs">
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-ink mb-4 flex items-center gap-2">
                <Building className="w-5 h-5 text-canopy" />
                Project Overview
              </h2>
              <div className="space-y-4 font-sans text-base text-ink/85 leading-relaxed">
                {property.overview.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Highlights Card */}
            {property.highlights.length > 0 && (
              <div className="bg-white rounded-2xl border border-line p-6 sm:p-8 shadow-xs">
                <h2 className="font-display text-xl font-semibold text-ink mb-5 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-sprout" />
                  Key Project Highlights
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.highlights.map((item, idx) => (
                    <li key={idx} className="p-3.5 bg-panel rounded-lg border border-line/60 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-canopy shrink-0 mt-0.5" />
                      <span className="font-sans text-sm text-ink font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Aerial Drone Video Walkthrough */}
            <div className="w-full">
              <DroneVideoSection
                videoId={property.droneVideoId || site.featuredDroneVideoId}
                videoUrl={property.droneVideoUrl || site.featuredDroneVideoUrl}
                title={`${property.name} Aerial Drone Walkthrough`}
                subtitle={`Actual aerial view of ${property.name} site, demarcated plot boundaries, 40ft internal concrete roads, and scenic surroundings.`}
              />
            </div>

            {/* Why We Like This */}
            <div className="bg-white rounded-2xl border border-line p-6 sm:p-8 shadow-xs">
              <WhyWeLikeThis whyWeLikeThis={property.whyWeLikeThis} />
            </div>

            {/* Verification Record */}
            <div className="bg-white rounded-2xl border border-line p-6 sm:p-8 shadow-xs">
              <VerificationRecord verification={property.verification} />
            </div>

            {/* Property Fit */}
            {property.fit && property.fit.length > 0 && (
              <div className="bg-white rounded-2xl border border-line p-6 sm:p-8 shadow-xs">
                <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-muted mb-4">
                  Buyer Profile Suitability
                </h2>
                <PropertyFit fit={property.fit} />
              </div>
            )}

            {/* Amenities & Site Infrastructure */}
            {property.amenities.length > 0 && (
              <div className="bg-white rounded-2xl border border-line p-6 sm:p-8 shadow-xs">
                <h2 className="font-display text-xl font-semibold text-ink mb-4">
                  Site Amenities & Infrastructure
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.amenities.map((item, idx) => (
                    <div key={idx} className="p-3 bg-panel rounded-lg border border-line/60 flex items-start gap-2.5 text-ink">
                      <span className="text-canopy font-bold">✓</span>
                      <span className="text-sm font-sans font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nearby & Connectivity */}
            <div className="bg-white rounded-2xl border border-line p-6 sm:p-8 shadow-xs">
              <NearbyLandmarks nearby={property.nearby} />

              {property.connectivity.length > 0 && (
                <div className="pt-8 border-t border-line mt-8">
                  <h3 className="font-display text-lg font-semibold text-ink mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-sprout" />
                    Connectivity & Transit Links
                  </h3>
                  <ul className="space-y-3">
                    {property.connectivity.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-ink text-sm font-sans">
                        <span className="w-1.5 h-1.5 bg-canopy shrink-0 mt-2 rounded-full" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Important Notes */}
            {property.notes && property.notes.length > 0 && (
              <div className="bg-sand/60 rounded-2xl border border-line p-6 sm:p-8">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-ink mb-3">
                  Advisory Notes
                </h3>
                <ul className="space-y-3">
                  {property.notes.map((item, idx) => (
                    <li key={idx} className="text-sm text-ink/90 font-sans leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sticky Sidebar Enquiry (Desktop) */}
          <div className="hidden md:block w-full max-w-[340px] sticky top-28 shrink-0">
            <PropertyEnquiryPanel property={property} />
          </div>
        </div>
      </Container>

      {/* Dedicated Site Visit Banner */}
      <Section tone="canopy" className="py-20 text-white relative overflow-hidden mt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sprout/15 via-transparent to-transparent" />
        <Container className="relative z-10 text-center max-w-2xl mx-auto">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-sprout mb-3 block">
            VERIFY IN PERSON
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-4">
            Arrange a Dedicated Tour of {property.name}
          </h2>
          <p className="font-sans text-base text-white/80 leading-relaxed mb-8">
            Walk the actual perimeter, review physical road markers, and inspect common amenity parcels with zero sales pressure.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book-site-visit"
              className="inline-flex items-center justify-center font-sans font-medium text-[0.9375rem] bg-sprout text-ink hover:bg-sprout/90 h-12 px-8 rounded-[var(--radius)] transition-colors gap-2 shadow-sm w-full sm:w-auto"
            >
              <span>Book Site Visit for this Township</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/properties"
              className="inline-flex items-center justify-center font-sans font-medium text-[0.9375rem] text-white border border-white/20 bg-white/10 hover:bg-white/20 h-12 px-6 rounded-[var(--radius)] transition-colors w-full sm:w-auto"
            >
              View Other Townships
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
