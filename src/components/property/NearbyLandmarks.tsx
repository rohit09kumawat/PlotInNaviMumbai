import { Property } from '@/types';
import { Eyebrow } from '@/components/shared/Eyebrow';

interface NearbyLandmarksProps {
  nearby: Property['nearby'];
}

export function NearbyLandmarks({ nearby }: NearbyLandmarksProps) {
  if (!nearby || nearby.length === 0) {
    return null;
  }

  // Group by type
  const grouped = nearby.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, typeof nearby>);

  const typeLabels: Record<string, string> = {
    transport: 'Transport',
    education: 'Education',
    health: 'Health',
    retail: 'Retail',
    civic: 'Civic & Leisure'
  };

  return (
    <div className="pt-8">
      <Eyebrow className="mb-6">Nearby Landmarks</Eyebrow>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
        {Object.entries(grouped).map(([type, items]) => (
          <div key={type}>
            <h4 className="font-mono text-xs font-medium uppercase tracking-wider text-muted mb-3">
              {typeLabels[type] || type}
            </h4>
            <ul className="space-y-3">
              {items.map((item, index) => (
                <li key={index} className="flex justify-between items-start gap-4">
                  <span className="text-ink text-sm">{item.name}</span>
                  <span className="font-mono text-xs text-muted shrink-0 whitespace-nowrap">
                    {item.distanceKm} km
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
