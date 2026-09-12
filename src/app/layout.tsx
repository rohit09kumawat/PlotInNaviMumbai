import type { Metadata } from 'next';
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StickyContactBar } from '@/components/layout/StickyContactBar';
import { WhatsAppFloat } from '@/components/whatsapp/WhatsAppFloat';
import { JsonLd } from '@/components/seo/JsonLd';
import { realEstateAgentSchema, websiteSchema } from '@/lib/jsonld';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
});

const plexSans = IBM_Plex_Sans({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plex-sans',
});

const plexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plex-mono',
});

import { site } from '@/content/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: 'Plots in Navi Mumbai — Honest Property Guidance | PlotInNaviMumbai.com',
  description:
    'Independent advice on residential and commercial plots across Ulwe, Kharghar, Panvel, Taloja and Dronagiri. We check the documents before we recommend.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <JsonLd data={[realEstateAgentSchema(), websiteSchema()]} />
      </head>
      <body className={`${bricolage.variable} ${plexSans.variable} ${plexMono.variable} antialiased min-h-screen flex flex-col`}>
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-paper focus:text-ink focus:outline-2 focus:outline-sprout"
        >
          Skip to content
        </a>

        <Header />

        <div id="main-content" className="flex-1">
          {children}
        </div>

        <Footer />
        <StickyContactBar />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
