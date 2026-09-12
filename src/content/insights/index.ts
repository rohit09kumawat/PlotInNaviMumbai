export interface InsightArticle {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  readingTime: string;
  published: boolean;
  content: string[];
}

export const insights: InsightArticle[] = [
  {
    slug: 'essential-documents-buying-plot-maharashtra',
    title: 'Essential Documents to Check Before Buying Land in Maharashtra',
    description:
      'A practical step-by-step checklist of title deeds, 7/12 extract, NA orders, and encumbrance certificates required for safe land purchases.',
    date: '2026-08-01',
    author: 'PlotInNaviMumbai.com Editorial Team',
    tags: ['Documentation', 'Legal', 'Due Diligence'],
    readingTime: '5 min read',
    published: true,
    content: [
      'Buying a plot of land in Maharashtra requires a thorough review of statutory revenue documents before transferring any earnest money.',
      '1. 7/12 Extract (Saat Baara): The foundational record of rights. Ensure the seller’s name is recorded in Mutation Register (Ferfar) entry without unverified claims.',
      '2. Non-Agricultural (NA) Order: Agricultural land cannot be used for residential construction without an official NA order issued by the Collector or competent authority.',
      '3. Search Report & Title Certificate: An independent advocate must conduct a 30-year search at the sub-registrar office to ensure no undisclosed mortgages or legal suits exist.',
      '4. Zone Certificate & Town Planning Sanction: Confirm that the plot falls within the residential or commercial zone under the MMRDA or CIDCO development plan.',
    ],
  },
  {
    slug: 'na-plots-vs-gaothan-land-navi-mumbai',
    title: 'NA Plots vs Gaothan Land: Understanding the Differences',
    description:
      'Why clearance classification matters for building sanctions, home loans, and long-term security in Navi Mumbai.',
    date: '2026-07-20',
    author: 'PlotInNaviMumbai.com Editorial Team',
    tags: ['Zoning', 'NA Plots', 'Navi Mumbai'],
    readingTime: '4 min read',
    published: true,
    content: [
      'Buyers in Navi Mumbai frequently encounter two terms: Sanctioned NA Plots and Gaothan Extension / 12.5% CIDCO allotment plots.',
      'Sanctioned Collector NA plots have undergone formal land conversion, demarcation, and road layout approval. These parcels are typically eligible for clear bank financing.',
      'Gaothan plots originate from traditional village settlement boundaries. While some hold valid Gaothan expansion certificates, title documentation must be checked meticulously for co-parcener claims.',
      'Before taking a decision, always verify the exact sanction order and survey demarcation boundaries with a licensed surveyor.',
    ],
  },
  {
    slug: 'navi-mumbai-infrastructure-corridors-guide',
    title: 'Navi Mumbai Infrastructure Corridors: Ulwe, Kharghar, Panvel',
    description:
      'How the Atal Setu (MTHL), Navi Mumbai International Airport, and Metro networks influence connectivity across key nodes.',
    date: '2026-07-10',
    author: 'PlotInNaviMumbai.com Editorial Team',
    tags: ['Infrastructure', 'Connectivity', 'Market Guide'],
    readingTime: '6 min read',
    published: true,
    content: [
      'Navi Mumbai’s growth is anchored by major regional infrastructure projects transforming transit times to Mumbai and Pune.',
      'Ulwe benefits directly from the Atal Setu (MTHL) sea link connection and immediate proximity to the upcoming Navi Mumbai International Airport (NMIA).',
      'Kharghar remains the prime cultural and educational node, supported by Metro Line 1, the Golf Course, and scenic hill backdrops.',
      'Panvel and New Panvel serve as the primary multi-modal junction connecting suburban rail, national highways, and the airport expressway.',
    ],
  },
];

export function getAllInsights(): InsightArticle[] {
  return insights.filter((item) => item.published);
}

export function getInsightBySlug(slug: string): InsightArticle | undefined {
  return insights.find((item) => item.slug === slug && item.published);
}
