import { site } from '@/content/site';
import type { Property } from '@/types';
import type { FAQItem } from '@/content/faqs';
import type { InsightArticle } from '@/content/insights';
import type { BlogArticle } from '@/content/blog';

export function realEstateAgentSchema() {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: site.name,
    url: site.url,
    description: site.description,
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Ulwe, Navi Mumbai' },
      { '@type': 'AdministrativeArea', name: 'Kharghar, Navi Mumbai' },
      { '@type': 'AdministrativeArea', name: 'Panvel, Navi Mumbai' },
      { '@type': 'AdministrativeArea', name: 'Taloja, Navi Mumbai' },
      { '@type': 'AdministrativeArea', name: 'Dronagiri, Navi Mumbai' },
    ],
  };

  if (site.phone) {
    schema.telephone = site.phone;
  }

  if (site.address.city) {
    schema.address = {
      '@type': 'PostalAddress',
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    };
  }

  return schema;
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    description: site.description,
  };
}

export function realEstateListingSchema(property: Property) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.name,
    description: property.tagline,
    url: `${site.url}/properties/${property.node}/${property.slug}`,
  };

  if (property.images && property.images.length > 0) {
    schema.image = property.images.map((img) => img.src);
  }

  // Include offers only if a real price exists (per master spec §11.3)
  if (property.priceFrom && property.priceFrom > 0) {
    schema.offers = {
      '@type': 'Offer',
      price: property.priceFrom,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    };
  }

  return schema;
}

export function breadcrumbListSchema(items: { label: string; href?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      ...(item.href ? { item: `${site.url}${item.href}` } : {}),
    })),
  };
}

export function faqPageSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function articleSchema(article: InsightArticle | BlogArticle) {
  const description = 'excerpt' in article ? article.excerpt : article.description;
  const isBlog = 'heroImage' in article;
  const path = isBlog ? `/blog/${article.slug}` : `/insights/${article.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    datePublished: article.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${site.url}${path}`,
    },
  };
}
