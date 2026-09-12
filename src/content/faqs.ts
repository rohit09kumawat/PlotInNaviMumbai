export interface FAQItem {
  id: string;
  category: 'Getting started' | 'Site visits' | 'Documentation' | 'NRI buyers';
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  // Getting started
  {
    id: 'faq-1',
    category: 'Getting started',
    question: 'How is PlotInNaviMumbai.com different from a regular broker or property portal?',
    answer:
      'We are an independent advisory practice rather than a portal or transactional broker. We do not list hundreds of unverified plots. We curate a small, deeply researched portfolio across Navi Mumbai nodes, verify title documentation before presenting options, and tell you plainly when a plot is not right for your goals.',
  },
  {
    id: 'faq-2',
    category: 'Getting started',
    question: 'Do you charge a fee for initial consultations or property searches?',
    answer:
      'No. Initial requirement analysis, discussions, and guidance consultations are completely free. If you choose to acquire a property through our advisory, our compensation structure is fully transparent and agreed upon upfront before any transaction.',
  },
  {
    id: 'faq-3',
    category: 'Getting started',
    question: 'Which areas in Navi Mumbai do you cover?',
    answer:
      'We specialize in key growth corridors of Navi Mumbai: Ulwe, Kharghar, Panvel, New Panvel, Taloja, Dronagiri, and Kalamboli. Each node has distinct growth drivers, zoning regulations, and timeline dynamics.',
  },

  // Site visits
  {
    id: 'faq-4',
    category: 'Site visits',
    question: 'What happens during a Family Property Tour?',
    answer:
      'We dedicate a half-day to visit 2–3 shortlisted plots that match your specific requirement. We walk the physical boundaries, inspect access road widths, review neighborhood infrastructure, and answer questions. There is zero sales pressure and no expectation to sign or book anything on site.',
  },
  {
    id: 'faq-5',
    category: 'Site visits',
    question: 'Can I bring my own architect or surveyor along for the site visit?',
    answer:
      'Absolutely. We welcome and encourage you to bring your own technical advisors, architect, or family elders to review the physical land conditions and orientation.',
  },

  // Documentation
  {
    id: 'faq-6',
    category: 'Documentation',
    question: 'What is a 7/12 Extract (Saat Baara) and why is it crucial?',
    answer:
      'The 7/12 extract is a record of rights maintained by the revenue department of Maharashtra. It details land ownership, survey numbers, cultivable area, encumbrances, and any pending disputes or agricultural status. We verify this along with the title chain for every parcel.',
  },
  {
    id: 'faq-7',
    category: 'Documentation',
    question: 'What is the difference between NA plots and Gaothan land?',
    answer:
      'Non-Agricultural (NA) plots have received official government sanction converting agricultural land for residential or commercial use. Gaothan lands are village settlement areas with distinct development and transfer rules. We clarify the exact legal classification for each plot so there are no surprises during construction approvals.',
  },
  {
    id: 'faq-8',
    category: 'Documentation',
    question: 'Do you provide legal title opinions directly?',
    answer:
      'We are property advisors, not a law firm. For title clearance certificates, search reports, and final registration agreements, we coordinate directly with qualified, independent advocates in Maharashtra.',
  },

  // NRI buyers
  {
    id: 'faq-9',
    category: 'NRI buyers',
    question: 'Can NRIs purchase residential and commercial plots in Navi Mumbai?',
    answer:
      'Yes, under RBI and FEMA regulations, Non-Resident Indians (NRIs) and Overseas Citizens of India (OCIs) can purchase residential and commercial immovable property in India using standard banking channels (NRE/NRO/FCNR accounts). Agricultural land or farmhouses require special permissions.',
  },
  {
    id: 'faq-10',
    category: 'NRI buyers',
    question: 'How do you handle site inspections and documentation for overseas buyers?',
    answer:
      'We provide high-definition video walkthroughs, live virtual inspections, satellite boundary overlays, and digital copies of verified title deeds. When you proceed, documentation can be executed via registered Special Power of Attorney (PoA) or scheduled for your visit to India.',
  },
];
