export const site = {
  name: 'PlotInNaviMumbai.com',
  legalName: 'Riyasat Infra & Advisory',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://plotinnavimumbai.com',
  tagline: 'Honest guidance on land in Navi Mumbai',
  description: 'Independent advice on residential and commercial plots across Ulwe, Kharghar, Panvel, Taloja and Dronagiri. We check the documents before we recommend.',
  phone: process.env.NEXT_PUBLIC_PHONE ?? '+91 74248 45316',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '917424845316',  // E.164, no '+'
  email: 'kumawatrohit228@gmail.com',
  address: {
    street: '2nd Floor, Centre Point, Situated at S.No. 34-A, Kolkhe, Mumbai-Pune Highway, Phalaspe Phata',
    locality: 'Panvel, Dist. Raigad',
    city: 'Navi Mumbai',
    region: 'Maharashtra',
    postalCode: '410221',
    country: 'IN'
  },
  // Mumbai 3.0 (Third Mumbai) Documentary & Vision Video
  mumbai3VideoUrl: '', // Paste your YouTube video URL (e.g. 'https://www.youtube.com/watch?v=...') here
  mumbai3VideoId: '',  // Or paste YouTube video ID directly (e.g. 'dQw4w9WgXcQ')
  featuredDroneVideoUrl: 'https://youtube.com/@realestate.nestora?si=J3FNDE-Lh__xPZCC',
  featuredDroneVideoId: '', // Paste your YouTube video ID (e.g., 'dQw4w9WgXcQ') or full YouTube URL here
  social: {
    instagram: 'https://www.instagram.com/realestate.nestora?igsh=M2lsMTdvMG1rcTN5&igsi=M2lsMTdvMG1rcTN5',
    linkedin: 'https://www.linkedin.com/in/rohit-kumawat-939756367?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    facebook: 'https://www.facebook.com',
    youtube: 'https://youtube.com/@realestate.nestora?si=J3FNDE-Lh__xPZCC'
  },
  nav: [
    { label: 'Home',                 href: '/' },
    { label: 'Why Navi Mumbai',      href: '/why-navi-mumbai' },
    { label: 'Property Portfolio',   href: '/properties' },
    { label: 'Blog & Q&A',           href: '/blog' },
    { label: 'How to Contact',       href: '/contact' },
    { label: 'About',                href: '/about' },
  ],
} as const;
