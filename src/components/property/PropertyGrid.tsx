import { Property } from '@/types';
import { PropertyCard } from './PropertyCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

interface PropertyGridProps {
  properties: Property[];
  emptyStateTitle?: string;
  emptyStateMessage?: string;
}

export function PropertyGrid({ 
  properties, 
  emptyStateTitle = 'No plots found',
  emptyStateMessage = "We couldn't find any plots matching your current filters. Try adjusting your criteria or contact us directly to discuss your requirements."
}: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <EmptyState
        title={emptyStateTitle}
        description={emptyStateMessage}
        action={
          <div className="flex flex-wrap gap-3 mt-4">
            <Link href="/contact" className={buttonVariants({ variant: 'default' })}>
              Talk to us
            </Link>
            <Link href="/properties" className={buttonVariants({ variant: 'outline' })}>
              Clear filters
            </Link>
          </div>
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.slug} property={property} />
      ))}
    </div>
  );
}
