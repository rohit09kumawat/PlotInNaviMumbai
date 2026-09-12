import { Property } from '@/types';

interface PropertyFitProps {
  fit?: Property['fit'];
}

export function PropertyFit({ fit }: PropertyFitProps) {
  if (!fit || fit.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {fit.map((item, index) => (
        <div key={index} className="flex flex-col gap-1 border border-line rounded-[8px] p-4 bg-white">
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-canopy">
            {item.profile}
          </span>
          <span className="text-ink text-sm">
            {item.note}
          </span>
        </div>
      ))}
    </div>
  );
}
