import type { MetadataRoute } from 'next';
import { getAllProperties, getAllNodes } from '@/lib/properties';
import { getAllBlogArticles } from '@/content/blog';
import { site } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = site.url.replace(/\/+$/, '');
  const currentDate = new Date().toISOString().split('T')[0];

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: currentDate, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/properties`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/why-navi-mumbai`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/blog`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/about`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/services`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/book-site-visit`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/stories-of-trust`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/faq`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/privacy-policy`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Dynamic node routes
  const nodeRoutes: MetadataRoute.Sitemap = getAllNodes().map((node) => ({
    url: `${baseUrl}/properties/${node.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Dynamic property routes
  const propertyRoutes: MetadataRoute.Sitemap = getAllProperties().map((property) => ({
    url: `${baseUrl}/properties/${property.node}/${property.slug}`,
    lastModified: property.verification?.lastCheckedISO || currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Dynamic blog routes
  const blogRoutes: MetadataRoute.Sitemap = getAllBlogArticles().map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: article.lastUpdated || article.date,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...staticRoutes, ...nodeRoutes, ...propertyRoutes, ...blogRoutes];
}
