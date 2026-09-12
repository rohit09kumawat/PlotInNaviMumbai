export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  whoItsFor: string;
  whatHappens: string[];
  whatIsNotIncluded: string[];
}

export const legalDisclaimer =
  "We are not a law firm and we do not provide legal advice. For documentation, title verification and registration, we coordinate with qualified advocates and licensed professionals, and we'll tell you clearly which parts are their work and which are ours.";

export const services: ServiceItem[] = [
  {
    id: 'search-shortlisting',
    title: 'Plot Search & Unbiased Shortlisting',
    subtitle: 'Finding plots that match your actual timeline, budget, and purpose.',
    whoItsFor: 'Buyers looking for clear-title land who want to avoid broker sales pressure and inflated quotes.',
    whatHappens: [
      'We sit down to understand what you need the land for (immediate build, 5-year hold, or family inheritance).',
      'We scan our verified inventory and local network across Ulwe, Kharghar, Panvel, Taloja, and Dronagiri.',
      'We present a curated shortlist of 2 to 4 plots with transparent historical pricing and documentation status.',
    ],
    whatIsNotIncluded: [
      'Pushing unsold inventory that does not match your specific criteria.',
      'Hidden fees or markups on land prices.',
    ],
  },
  {
    id: 'document-coordination',
    title: 'Document & Verification Coordination',
    subtitle: 'Navigating 7/12 extracts, title chains, and authority clearances with legal experts.',
    whoItsFor: 'Anyone wanting clarity on whether a plot has clean ownership, clear access, and valid municipal sanctions.',
    whatHappens: [
      'Collection and indexing of title deeds, 7/12 extract, non-agricultural (NA) orders, and zone master plans.',
      'Handover to independent, qualified advocates for comprehensive title search and encumbrance verification.',
      'A plain-English summary of what has been verified and what remains pending before you pay any token.',
    ],
    whatIsNotIncluded: [
      'Direct legal advice from our staff (all legal title opinions are issued by qualified advocates).',
      'Blanket guarantees on future zoning or regulation changes.',
    ],
  },
  {
    id: 'family-property-tour',
    title: 'Family Property Tour & Site Walk',
    subtitle: 'Inspect boundaries, access roads, and surroundings in person with your family.',
    whoItsFor: 'Families who want to see the real surroundings, ground levels, and neighborhood without a sales rush.',
    whatHappens: [
      'We arrange a guided chauffeured or convoy tour across your shortlisted plots.',
      'We walk the physical plot boundaries and verify access road widths on ground.',
      'We highlight upcoming infrastructure (metro lines, coastal road alignments, airport proximity) objectively.',
    ],
    whatIsNotIncluded: [
      'Pressure to commit or pay a booking deposit on site.',
      'Rushed multi-project group marketing buses.',
    ],
  },
  {
    id: 'nri-advisory',
    title: 'NRI Land Guidance & Local Representation',
    subtitle: 'Remote due diligence, live video walks, and power-of-attorney coordination.',
    whoItsFor: 'Non-resident Indians and outstation buyers seeking honest local eyes on Navi Mumbai properties.',
    whatHappens: [
      'Virtual plot walkthroughs with 360-degree boundary inspection and surrounding video scans.',
      'Digital document repository sharing with direct coordinator calls.',
      'Assistance with banking channels (NRE/NRO accounts), FEMA compliance, and registration scheduling.',
    ],
    whatIsNotIncluded: [
      'Unsupervised execution without verified legal power of attorney.',
      'Guaranteed speculative currency or return forecasts.',
    ],
  },
];
