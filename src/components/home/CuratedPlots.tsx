import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { PropertyCard } from '@/components/property/PropertyCard';
import { Reveal } from '@/components/shared/Reveal';
import { getFeaturedProperties } from '@/lib/properties';
import { ArrowRight } from 'lucide-react';

export function CuratedPlots() {
  const properties = getFeaturedProperties(3);

  return (
    <Section tone="panel" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <SectionHeading
              eyebrow="CURATED PORTFOLIO"
              title="A few plots we've verified recently."
              lead="Every plot shown here has undergone our initial title and zoning review."
              className="max-w-xl"
            />
            <Link
              href="/properties"
              className="hidden sm:inline-flex items-center gap-2 font-sans text-sm font-medium text-moss hover:text-ink transition-colors underline underline-offset-4 decoration-moss/40 hover:decoration-ink shrink-0 mb-2"
            >
              <span>Explore all available plots</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {properties.map((property, idx) => (
            <Reveal key={property.slug} delay={idx * 0.08}>
              <PropertyCard property={property} />
            </Reveal>
          ))}
        </div>

        <div className="sm:hidden text-center mt-6">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 font-sans text-sm font-medium text-moss hover:text-ink underline underline-offset-4 decoration-moss/40"
          >
            <span>Explore all available plots</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
