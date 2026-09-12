import { Property } from '@/types';
import { properties } from '@/content/properties';
import { nodes } from '@/content/nodes';

export function getAllProperties(): Property[] {
  return properties
    .filter((p) => p.published || (process.env.NODE_ENV !== 'production' && p.isSample))
    .sort((a, b) => {
      // Sort by node first, then by name
      if (a.node < b.node) return -1;
      if (a.node > b.node) return 1;
      return a.name.localeCompare(b.name);
    });
}

export function getPropertyBySlug(node: string, slug: string): Property | null {
  const property = properties.find((p) => p.node === node && p.slug === slug && (p.published || (process.env.NODE_ENV !== 'production' && p.isSample)));
  return property || null;
}

export function getPropertiesByNode(node: string): Property[] {
  return getAllProperties().filter((p) => p.node === node);
}

export function getFeaturedProperties(limit: number = 3): Property[] {
  // Simple heuristic for featured: available plots, sorted by highest price.
  // In a real app with more fields, you might have a dedicated 'featured' boolean.
  return getAllProperties()
    .filter((p) => p.availability !== 'sold-out')
    .sort((a, b) => (b.priceFrom || 0) - (a.priceFrom || 0))
    .slice(0, limit);
}

export function getAllNodes() {
  return nodes;
}

export interface PropertyFilters {
  node?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  minSqft?: number;
  maxSqft?: number;
  availability?: string;
  reraVerifiedOnly?: boolean;
  query?: string;
}

// Pure function for client-side filtering
export function filterProperties(all: Property[], filters: PropertyFilters): Property[] {
  return all.filter((p) => {
    // 1. Node filter
    if (filters.node && filters.node !== 'all' && p.node !== filters.node) return false;
    
    // 2. Type filter
    if (filters.type && filters.type !== 'all' && p.type !== filters.type) return false;

    // 3. Price filter (if a plot has no priceFrom, we assume it doesn't match a strict price filter, or we could include it. Let's exclude it to be safe.)
    if (filters.minPrice !== undefined) {
      if (!p.priceFrom || p.priceFrom < filters.minPrice) return false;
    }
    if (filters.maxPrice !== undefined) {
      if (!p.priceFrom || p.priceFrom > filters.maxPrice) return false;
    }

    // 4. Size filter (check if ANY plot size fits the range)
    if (filters.minSqft !== undefined || filters.maxSqft !== undefined) {
      const min = filters.minSqft ?? 0;
      const max = filters.maxSqft ?? Infinity;
      const hasMatchingSize = p.plotSizes.some(size => size.sqft >= min && size.sqft <= max);
      if (!hasMatchingSize) return false;
    }

    // 5. Availability filter
    if (filters.availability && filters.availability !== 'all' && p.availability !== filters.availability) return false;

    // 6. RERA Verified Only
    if (filters.reraVerifiedOnly && p.verification.rera.status !== 'verified') return false;

    // 7. Text Query (matches name, landmark, sector, or node)
    if (filters.query) {
      const q = filters.query.toLowerCase();
      const searchableText = [
        p.name,
        p.location.landmark,
        p.location.sector || '',
        p.node
      ].join(' ').toLowerCase();

      if (!searchableText.includes(q)) return false;
    }

    return true;
  });
}
