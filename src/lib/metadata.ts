import type { Metadata } from 'next';
import { site } from '@/content/site';

interface MetadataParams {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path = '',
  image = '/opengraph-image',
  noIndex = false,
}: MetadataParams): Metadata {
  const siteUrl = site.url.replace(/\/+$/, '');
  const canonical = path ? `${siteUrl}${path.startsWith('/') ? path : `/${path}`}` : siteUrl;

  // Format title: if home, keep descriptive; otherwise append brand
  const formattedTitle =
    path === '' || path === '/'
      ? title
      : title.includes(site.name)
        ? title
        : `${title} | ${site.name}`;

  return {
    title: formattedTitle,
    description: description.slice(0, 160),
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical,
    },
    openGraph: {
      title: formattedTitle,
      description: description.slice(0, 160),
      url: canonical,
      siteName: site.name,
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: formattedTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: formattedTitle,
      description: description.slice(0, 160),
      images: [image],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
}
