import { Property } from '@/types';

export const riyasatBliss: Property = {
  slug: 'riyasat-bliss',
  node: 'panvel',
  name: 'Riyasat Bliss',
  tagline: 'Premium residential NA plots featuring a signature Shiva waterfall statue.',
  type: 'na-plot',
  availability: 'available',

  plotSizes: [
    { label: 'Standard Plot', sqft: 1100, sqm: 102.2 },
    { label: 'Large Plotted Estate', sqft: 2500, sqm: 232.3 }
  ],
  priceNote: 'Price on request',

  location: {
    sector: 'Mohape',
    landmark: 'Near Mumbai-Pune Expressway',
    lat: 18.9190676,
    lng: 73.1827376,
  },

  overview: [
    'Riyasat Bliss is a premium residential plotted township spanning approximately 24 acres in Mohape near Panvel. Positioned near the Mumbai-Pune Expressway, the project offers fully developed, Vastu-compliant residential NA plots.',
    'Known for its majestic Shiva statue backed by a cascading water feature, the gated community integrates underground utilities, sports amenities, and high-end security systems for custom villa builders.'
  ],
  highlights: [
    'MahaRERA Registered Project (P52000079379)',
    'Signature Shiva statue & cascading waterfall',
    '24-acre gated community layout',
    'Underground utility infrastructure setup'
  ],
  amenities: [
    'Clubhouse & Swimming Pool',
    'Majestic Shiva Statue & Waterfall',
    'Indoor & Outdoor Gymnasiums',
    'Box Cricket Pitch & Basketball Court',
    'Gated security with CCTV and boom barriers'
  ],
  nearby: [
    { name: 'Amity University', distanceKm: 5, type: 'education' },
    { name: 'Panvel Railway Station', distanceKm: 10, type: 'transport' },
    { name: 'Karnala Bird Sanctuary', distanceKm: 18, type: 'civic' }
  ],
  connectivity: [
    'Strategic proximity to the Mumbai-Pune Expressway',
    'Easy access to the upcoming Navi Mumbai International Airport',
    '10 minutes to Amity University campus',
    '10 km to Panvel Railway Station'
  ],

  verification: {
    rera: { status: 'verified', reference: 'P52000079379' },
    mmrda: { status: 'not-applicable' },
    documents: 'verified',
    lastCheckedISO: '2026-08-15'
  },

  whyWeLikeThis: {
    points: [
      'Verified MahaRERA registration (P52000079379) ensuring compliance.',
      'Unique lifestyle landmarks like the Shiva statue and clubhouse.',
      'Underground cabling preventing visual clutter in the development.'
    ],
    suitsWho: [
      'Families seeking a peaceful, gated plotted community near academic hubs.',
      'Investors looking for land with premium lifestyle amenities in the Panvel corridor.'
    ]
  },

  fit: [
    { profile: 'Villa Buyer', note: 'Ready utilities and gated security make it ideal for a second home or villa.' },
    { profile: 'Gated Community Investor', note: 'High interest in plotted developments with premium aesthetic features.' }
  ],

  images: [
    { 
      src: 'https://cdn.prod.website-files.com/67b6bb5106e0b321737746fb/67ff6abb3323a65b70e3ba9b_thumbnail-2.jpg', 
      alt: 'Official grand entrance gate of Riyasat Bliss' 
    }
  ],
  instagramReelUrl: 'https://www.instagram.com/realestate.nestora?igsh=M2lsMTdvMG1rcTN5&igsi=M2lsMTdvMG1rcTN5',
  droneVideoId: '', // Paste YouTube video ID (e.g. 'dQw4w9WgXcQ') or link for this township
  droneVideoUrl: '',

  seo: {
    title: 'Riyasat Bliss Residential NA Plots, Panvel',
    description: 'Riyasat Bliss in Mohape, Panvel. Verified NA residential plots. MahaRERA P52000079379. Features Shiva statue, clubhouse, 24/7 security, premium amenities.'
  },

  published: true
};
