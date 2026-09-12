import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/types';
import { cn, formatINR } from '@/lib/utils';
import { StatusPill } from '@/components/shared/StatusPill';
import { nodes } from '@/content/nodes';

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export function PropertyCard({ property, className }: PropertyCardProps) {
  const isSoldOut = property.availability === 'sold-out';
  const isFewRemaining = property.availability === 'few-remaining';

  // Format node name
  const node = nodes.find((n) => n.slug === property.node);
  const nodeName = node ? node.name.toUpperCase() : property.node.toUpperCase();
  const locationEyebrow = property.location.sector
    ? `${nodeName} · ${property.location.sector.toUpperCase()}`
    : nodeName;

  // Format price
  let priceString = 'Price on request';
  if (property.priceFrom) {
    if (property.priceTo && property.priceTo !== property.priceFrom) {
      priceString = `${formatINR(property.priceFrom)} – ${formatINR(property.priceTo)}`;
    } else {
      priceString = formatINR(property.priceFrom);
    }
  }

  // Format size
  const sizes = property.plotSizes.map((s) => s.sqft);
  const minSize = Math.min(...sizes);
  const maxSize = Math.max(...sizes);
  const sizeString = minSize === maxSize
    ? `${minSize} sq ft`
    : `${minSize}–${maxSize} sq ft`;

  // The Record Strip
  const reraStatus = property.verification.rera.status === 'verified'
    ? 'RERA VERIFIED'
    : (property.verification.rera.status === 'applicable' ? 'RERA APPLICABLE' : 'RERA NA');
  
  const checkedDate = new Date(property.verification.lastCheckedISO).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short'
  }).toUpperCase(); // e.g. 04 AUG

  return (
    <Link
      href={`/properties/${property.node}/${property.slug}`}
      className={cn(
        "group flex flex-col bg-white border border-line rounded-[8px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] outline-none focus-visible:ring-2 focus-visible:ring-sprout focus-visible:ring-offset-2",
        isSoldOut && "opacity-60",
        className
      )}
    >
      {/* Image Area */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-[7px] border-b border-line bg-panel">
        {property.images[0] && (
          <Image
            src={property.images[0].src}
            alt={property.images[0].alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-400 group-hover:scale-[1.03]"
          />
        )}
        
        {/* Availability Pills */}
        {isFewRemaining && (
          <div className="absolute top-3 left-3 z-10">
            <StatusPill status="few-remaining" label="Few Remaining" className="bg-white/90 backdrop-blur-sm" />
          </div>
        )}
        {isSoldOut && (
          <div className="absolute top-3 left-3 z-10">
            <StatusPill status="sold-out" label="Sold Out" className="bg-white/90 backdrop-blur-sm text-ink" />
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-5">
        <div className="font-mono text-[0.6875rem] font-medium tracking-[0.12em] text-muted mb-2">
          {locationEyebrow}
        </div>
        <h3 className="font-display text-lg font-medium text-ink mb-1.5 line-clamp-1">
          {property.name}
        </h3>
        <p className="text-sm text-muted line-clamp-2 mb-6 flex-1">
          {property.tagline}
        </p>

        {/* Price & Size */}
        <div className="flex items-end justify-between font-mono text-[0.875rem] font-medium text-ink pt-4 border-t border-line/50">
          <div>{priceString}</div>
          <div className="text-muted text-[0.8125rem]">{sizeString}</div>
        </div>
      </div>

      {/* The Record Strip */}
      <div className="flex items-center px-5 py-3 border-t border-line bg-panel/30 rounded-b-[7px]">
        <div className="font-mono text-[0.6875rem] font-medium tracking-[0.12em] text-muted w-full truncate">
          <span className={property.verification.rera.status === 'verified' ? 'text-canopy' : ''}>
            {reraStatus}
          </span>
          <span className="mx-2">·</span>
          <span>CHECKED {checkedDate}</span>
        </div>
      </div>
    </Link>
  );
}
