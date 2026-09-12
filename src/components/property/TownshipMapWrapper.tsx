'use client';

import dynamic from 'next/dynamic';

const TownshipMap = dynamic(() => import('./TownshipMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[450px] bg-[#FAF5ED] flex items-center justify-center font-mono text-xs text-[#5C6F80] uppercase animate-pulse">
      Loading Interactive Map...
    </div>
  ),
});

export default function TownshipMapWrapper() {
  return <TownshipMap />;
}
