export type VerificationStatus = 'verified' | 'under-review' | 'applicable' | 'not-applicable';
export type PropertyType = 'residential-plot' | 'commercial-plot' | 'na-plot' | 'farmhouse-plot';
export type Availability = 'available' | 'few-remaining' | 'sold-out';

export interface Node {
  slug: string;
  name: string;
  description?: string;
}

export interface Property {
  slug: string;                  // 'sector-19-residential-plots'
  node: string;                  // 'ulwe' — must match a Node.slug
  name: string;
  tagline: string;               // one honest line, max 90 chars
  type: PropertyType;
  availability: Availability;

  plotSizes: { label: string; sqft: number; sqm?: number }[];
  priceFrom?: number;            // INR, absolute. undefined => "Price on request"
  priceTo?: number;
  priceNote?: string;            // 'Excluding registration and stamp duty'

  location: {
    sector?: string;
    landmark: string;
    lat?: number;
    lng?: number;
    mapEmbedUrl?: string;
  };

  overview: string[];            // 2–4 plain paragraphs
  highlights: string[];          // 3–6 short factual points
  amenities: string[];
  nearby: { name: string; distanceKm: number; type: 'transport'|'education'|'health'|'retail'|'civic' }[];
  connectivity: string[];

  verification: {
    rera:  { status: VerificationStatus; reference?: string };
    mmrda: { status: VerificationStatus; reference?: string };
    documents: VerificationStatus;
    lastCheckedISO: string;      // '2026-08-04'
  };

  whyWeLikeThis?: { points: string[]; suitsWho: string[] };  // honest, no returns promised
  fit?: { profile: string; note: string }[];                 // 'First-time buyer' -> why

  images: { src: string; alt: string; caption?: string }[];
  droneVideoId?: string;
  droneVideoUrl?: string;
  instagramReelUrl?: string;
  brochureUrl?: string;
  masterPlanUrl?: string;
  notes?: string[];

  seo: { title: string; description: string };
  isSample?: boolean;            // MUST be absent/false in production
  published: boolean;
}
