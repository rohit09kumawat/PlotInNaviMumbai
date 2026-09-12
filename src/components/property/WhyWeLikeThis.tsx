import { Property } from '@/types';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { Check } from 'lucide-react';

interface WhyWeLikeThisProps {
  whyWeLikeThis?: Property['whyWeLikeThis'];
}

export function WhyWeLikeThis({ whyWeLikeThis }: WhyWeLikeThisProps) {
  if (!whyWeLikeThis || (whyWeLikeThis.points.length === 0 && whyWeLikeThis.suitsWho.length === 0)) {
    return null;
  }

  return (
    <div className="bg-sand rounded-[8px] p-6 sm:p-8">
      <Eyebrow className="mb-6">Why We Like This</Eyebrow>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {whyWeLikeThis.points.length > 0 && (
          <div className="flex-1">
            <ul className="space-y-4">
              {whyWeLikeThis.points.map((point, index) => (
                <li key={index} className="flex gap-3 text-ink">
                  <Check className="w-5 h-5 text-moss shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {whyWeLikeThis.suitsWho.length > 0 && (
          <div className="flex-1">
            <h4 className="font-mono text-[0.6875rem] font-medium tracking-[0.12em] uppercase text-moss mb-4">
              THIS MAY SUIT
            </h4>
            <ul className="space-y-3">
              {whyWeLikeThis.suitsWho.map((person, index) => (
                <li key={index} className="text-ink">
                  {person}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
