"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet';
import { nodes } from '@/content/nodes';

const BUDGET_RANGES = [
  { label: 'Under ₹50L', min: 0, max: 5000000 },
  { label: '₹50L - ₹1Cr', min: 5000000, max: 10000000 },
  { label: '₹1Cr - ₹2Cr', min: 10000000, max: 20000000 },
  { label: 'Above ₹2Cr', min: 20000000, max: 999999999 },
];

const SIZE_RANGES = [
  { label: 'Under 1,000 sqft', min: 0, max: 1000 },
  { label: '1,000 - 2,000 sqft', min: 1000, max: 2000 },
  { label: '2,000 - 5,000 sqft', min: 2000, max: 5000 },
  { label: 'Above 5,000 sqft', min: 5000, max: 999999 },
];

export function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [node, setNode] = useState(searchParams.get('node') || 'all');
  const [type, setType] = useState(searchParams.get('type') || 'all');
  const [budget, setBudget] = useState(searchParams.get('budget') || 'all');
  const [size, setSize] = useState(searchParams.get('size') || 'all');
  const [verifiedOnly, setVerifiedOnly] = useState(searchParams.get('verifiedOnly') === 'true');
  const [isOpen, setIsOpen] = useState(false);

  // Apply filters to URL
  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    if (node !== 'all') params.set('node', node);
    if (type !== 'all') params.set('type', type);
    if (budget !== 'all') params.set('budget', budget);
    if (size !== 'all') params.set('size', size);
    if (verifiedOnly) params.set('verifiedOnly', 'true');

    router.push(`/properties?${params.toString()}`);
  }, [query, node, type, budget, size, verifiedOnly, router]);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query !== (searchParams.get('query') || '')) {
        applyFilters();
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [query, applyFilters, searchParams]);

  // Update on other filter changes
  const handleSelectChange = () => {
    // Need a slight delay to allow state to settle before applying
    setTimeout(applyFilters, 0);
  };

  const clearAll = () => {
    setQuery('');
    setNode('all');
    setType('all');
    setBudget('all');
    setSize('all');
    setVerifiedOnly(false);
    router.push('/properties');
  };

  const activeCount = [
    node !== 'all',
    type !== 'all',
    budget !== 'all',
    size !== 'all',
    verifiedOnly,
    !!query
  ].filter(Boolean).length;

  const FilterContent = (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-sm font-medium uppercase tracking-wider text-ink">Filters</h3>
        {activeCount > 0 && (
          <button 
            onClick={clearAll}
            className="text-sm text-canopy hover:text-moss underline decoration-canopy/30 hover:decoration-moss/50 underline-offset-4"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="filter-node" className="text-sm font-medium text-ink">Location (Node)</label>
        <select 
          id="filter-node"
          value={node} 
          onChange={(e) => { setNode(e.target.value); handleSelectChange(); }}
          className="w-full h-10 px-3 border border-line rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sprout"
        >
          <option value="all">All Nodes</option>
          {nodes.map(n => <option key={n.slug} value={n.slug}>{n.name}</option>)}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="filter-type" className="text-sm font-medium text-ink">Plot Type</label>
        <select 
          id="filter-type"
          value={type} 
          onChange={(e) => { setType(e.target.value); handleSelectChange(); }}
          className="w-full h-10 px-3 border border-line rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sprout"
        >
          <option value="all">All Types</option>
          <option value="residential-plot">Residential Plot</option>
          <option value="commercial-plot">Commercial Plot</option>
          <option value="na-plot">NA Plot</option>
          <option value="farmhouse-plot">Farmhouse Plot</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="filter-budget" className="text-sm font-medium text-ink">Budget</label>
        <select 
          id="filter-budget"
          value={budget} 
          onChange={(e) => { setBudget(e.target.value); handleSelectChange(); }}
          className="w-full h-10 px-3 border border-line rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sprout"
        >
          <option value="all">Any Budget</option>
          {BUDGET_RANGES.map((r, i) => <option key={i} value={i.toString()}>{r.label}</option>)}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="filter-size" className="text-sm font-medium text-ink">Plot Size</label>
        <select 
          id="filter-size"
          value={size} 
          onChange={(e) => { setSize(e.target.value); handleSelectChange(); }}
          className="w-full h-10 px-3 border border-line rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sprout"
        >
          <option value="all">Any Size</option>
          {SIZE_RANGES.map((r, i) => <option key={i} value={i.toString()}>{r.label}</option>)}
        </select>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <div className="relative flex items-center">
          <input 
            type="checkbox"
            id="filter-verified"
            checked={verifiedOnly}
            onChange={(e) => { setVerifiedOnly(e.target.checked); handleSelectChange(); }}
            className="peer w-5 h-5 appearance-none border border-line rounded-sm checked:bg-canopy checked:border-canopy cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sprout focus-visible:ring-offset-1"
          />
          <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 left-1 top-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <label htmlFor="filter-verified" className="text-sm font-medium text-ink cursor-pointer">
          Show RERA Verified only
        </label>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full">
      {/* Search Input (Top) */}
      <div className="relative w-full mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
        <input
          type="text"
          placeholder="Search by name, sector or landmark..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-14 pl-12 pr-4 bg-white border border-line rounded-[8px] text-base focus:outline-none focus:border-canopy focus:ring-1 focus:ring-canopy transition-shadow"
        />
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-ink rounded-full"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger render={
            <Button variant="outline" className="w-full flex items-center justify-center gap-2 h-12 border-line">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              {activeCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-canopy text-white text-[0.625rem] font-bold ml-1">
                  {activeCount}
                </span>
              )}
            </Button>
          } />
          <SheetContent side="bottom" className="h-[85vh] rounded-t-[16px] bg-paper">
            <SheetHeader className="mb-4 text-left">
              <SheetTitle>Filter Properties</SheetTitle>
            </SheetHeader>
            <div className="overflow-y-auto pb-20">
              {FilterContent}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-paper border-t border-line">
              <Button onClick={() => setIsOpen(false)} className="w-full h-12 bg-canopy text-white hover:bg-moss">
                View Results
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sticky Rail */}
      <div className="hidden lg:block lg:sticky lg:top-24 bg-white border border-line p-6 rounded-[8px]">
        {FilterContent}
      </div>
    </div>
  );
}
