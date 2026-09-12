import Link from 'next/link';
import { Property } from '@/types';
import { formatINR } from '@/lib/utils';
import { WhatsAppButton } from '@/components/whatsapp/WhatsAppButton';
import { waMessages } from '@/lib/whatsapp';
import { site } from '@/content/site';
import { Phone } from 'lucide-react';

interface PropertyEnquiryPanelProps {
  property: Property;
  className?: string;
}

export function PropertyEnquiryPanel({ property, className }: PropertyEnquiryPanelProps) {
  // Format price
  let priceString = 'Price on request';
  if (property.priceFrom) {
    if (property.priceTo && property.priceTo !== property.priceFrom) {
      priceString = `${formatINR(property.priceFrom)} – ${formatINR(property.priceTo)}`;
    } else {
      priceString = formatINR(property.priceFrom);
    }
  }

  const phoneLink = site.phone ? `tel:${site.phone.replace(/\s+/g, '')}` : '/contact';

  return (
    <div className={`flex flex-col border border-line rounded-[var(--radius)] bg-white p-6 md:sticky md:top-24 ${className || ''}`}>
      <div className="mb-6 pb-6 border-b border-line">
        <h3 className="font-display text-2xl font-medium text-ink mb-2">
          {priceString}
        </h3>
        {property.priceNote && (
          <p className="text-sm text-muted">{property.priceNote}</p>
        )}
      </div>

      <div className="mb-8">
        <h4 className="font-mono text-xs font-medium uppercase tracking-wider text-muted mb-3">
          Available Plot Sizes
        </h4>
        <ul className="space-y-2">
          {property.plotSizes.map((size, idx) => (
            <li key={idx} className="flex justify-between text-sm text-ink">
              <span>{size.label}</span>
              <span className="font-mono text-muted">{size.sqft.toLocaleString('en-IN')} sq ft</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <WhatsAppButton
          message={waMessages.property(property)}
          variant="primary"
          source={`property-${property.slug}`}
          label="Ask about this plot"
          className="w-full h-12"
        />

        <a
          href={phoneLink}
          className="inline-flex items-center justify-center font-sans font-medium transition-colors border border-line bg-white hover:bg-panel text-ink h-12 px-5 py-3 rounded-[var(--radius)] text-[0.9375rem] gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout focus-visible:ring-offset-2"
        >
          <Phone className="w-4 h-4 shrink-0" />
          <span>{site.phone ? `Call ${site.phone}` : 'Call us directly'}</span>
        </a>

        <div className="mt-2 text-center">
          <Link
            href="/book-site-visit"
            className="text-sm font-medium text-moss hover:text-ink underline underline-offset-4 decoration-moss/40 hover:decoration-ink transition-colors"
          >
            Book a Site Visit
          </Link>
        </div>
      </div>
    </div>
  );
}
