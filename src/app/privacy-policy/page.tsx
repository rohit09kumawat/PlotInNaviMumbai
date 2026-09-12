import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Prose } from '@/components/shared/Prose';
import { AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | PlotInNaviMumbai.com',
  description: 'How PlotInNaviMumbai.com handles your contact details and enquiry data.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <Section tone="paper" className="pt-28 pb-14 sm:pt-36 sm:pb-20 border-b border-line">
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Privacy Policy' },
            ]}
          />
          <div className="max-w-3xl mt-6">
            <div className="mb-4">
              <Eyebrow>DATA PROTECTION & PRIVACY</Eyebrow>
            </div>
            <h1 className="font-display text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold text-ink tracking-tight leading-[1.12] mb-6 uppercase">
              Privacy Policy
            </h1>
            <p className="font-sans text-lg sm:text-xl text-ink/85 leading-relaxed max-w-[56ch]">
              We respect your privacy and handle all property enquiry details with strict confidentiality.
            </p>
          </div>
        </Container>
      </Section>

      {/* Review Notice */}
      <Section tone="sand" className="py-6 border-b border-line">
        <Container>
          <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-line text-xs sm:text-sm text-ink/80 font-sans max-w-3xl mx-auto shadow-xs">
            <AlertCircle className="w-5 h-5 text-canopy shrink-0" />
            <span>Note: This policy is subject to formal legal review by the firm&apos;s legal counsel before final production launch.</span>
          </div>
        </Container>
      </Section>

      {/* Content */}
      <Section tone="panel" className="py-16 sm:py-24">
        <Container>
          <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-2xl border border-line shadow-card">
            <Prose>
              <h2>1. Information We Collect</h2>
              <p>
                When you submit a consultation request, tour booking, or property enquiry, we collect only the information you voluntarily provide: your name, phone number (WhatsApp number), preferred mode of contact, and notes regarding your plot requirements.
              </p>

              <h2>2. How We Use Your Information</h2>
              <p>
                Your contact details are used exclusively to respond to your specific enquiry, share verified documentation for requested plots, and coordinate site tours. We will never sell, rent, or distribute your phone number or information to third-party marketing networks or external telemarketers.
              </p>

              <h2>3. Direct WhatsApp Communication</h2>
              <p>
                When you choose to connect via WhatsApp, communication takes place through end-to-end encrypted messaging channels subject to WhatsApp&apos;s standard terms of service. You may request to cease communication at any time simply by letting us know.
              </p>

              <h2>4. Analytics and Tracking</h2>
              <p>
                We operate privacy-friendly, cookieless analytics to measure aggregated site usage (such as popular nodes and filter preferences). We do not use intrusive cross-site tracking cookies or store personal identity markers in browser storage.
              </p>

              <h2>5. Contact for Privacy Inquiries</h2>
              <p>
                If you have any questions regarding how your data is handled or wish to have your details removed from our records, please reach out to us at <a href="/contact">our contact page</a>.
              </p>
            </Prose>
          </div>
        </Container>
      </Section>
    </main>
  );
}
