import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Prose } from '@/components/shared/Prose';
import { AlertCircle } from 'lucide-react';
import { legalDisclaimer } from '@/content/services';

export const metadata: Metadata = {
  title: 'Terms of Service | PlotInNaviMumbai.com',
  description: 'Terms and advisory disclaimer governing use of the PlotInNaviMumbai.com website.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <Section tone="paper" className="pt-28 pb-14 sm:pt-36 sm:pb-20 border-b border-line">
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Terms' },
            ]}
          />
          <div className="max-w-3xl mt-6">
            <div className="mb-4">
              <Eyebrow>TERMS & ADVISORY CONDITIONS</Eyebrow>
            </div>
            <h1 className="font-display text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold text-ink tracking-tight leading-[1.12] mb-6 uppercase">
              Terms of Service
            </h1>
            <p className="font-sans text-lg sm:text-xl text-ink/85 leading-relaxed max-w-[56ch]">
              Please review the advisory scope, document verification terms, and legal boundaries of our practice.
            </p>
          </div>
        </Container>
      </Section>

      {/* Review Notice */}
      <Section tone="sand" className="py-6 border-b border-line">
        <Container>
          <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-line text-xs sm:text-sm text-ink/80 font-sans max-w-3xl mx-auto shadow-xs">
            <AlertCircle className="w-5 h-5 text-canopy shrink-0" />
            <span>Note: This document is subject to formal review by the firm&apos;s legal advisor before final launch.</span>
          </div>
        </Container>
      </Section>

      {/* Content */}
      <Section tone="panel" className="py-16 sm:py-24">
        <Container>
          <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-2xl border border-line shadow-card">
            <Prose>
              <h2>1. Nature of Our Practice</h2>
              <p>
                PlotInNaviMumbai.com operates as an independent property advisory practice specializing in residential, commercial, and investment land parcels across Navi Mumbai. We are not a transactional open marketplace or classifieds portal.
              </p>

              <h2>2. Non-Legal Nature of Our Advisory</h2>
              <blockquote>
                {legalDisclaimer}
              </blockquote>
              <p>
                All documentation shared on this platform (including 7/12 extracts, NA sanction orders, and layout maps) is provided for informational and due-diligence review purposes. Formal legal title certificates and registration paperwork must always be vetted by your advocate prior to final financial settlement.
              </p>

              <h2>3. Accuracy of Listings and Pricing</h2>
              <p>
                While we inspect land parcels and documentation status thoroughly, land availability, pricing quotes, and statutory approvals are subject to change by landowners, CIDCO, MMRDA, or local municipal authorities. We confirm and re-verify all parameters immediately prior to each scheduled site visit.
              </p>

              <h2>4. No Guaranteed Returns or Financial Forecasts</h2>
              <p>
                Nothing on this website or in our advisory consultations constitutes a guarantee of investment returns, future appreciation rates, or speculative financial projections. Land decisions carry inherent market and liquidity risks.
              </p>

              <h2>5. Site Visits and Tours</h2>
              <p>
                Our Family Property Tours are arranged on a complimentary basis to allow prospective buyers to view physical ground conditions without obligation. Visitors participate in site inspections at their own discretion.
              </p>
            </Prose>
          </div>
        </Container>
      </Section>
    </main>
  );
}
