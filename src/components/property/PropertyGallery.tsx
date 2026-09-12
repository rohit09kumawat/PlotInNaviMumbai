'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Property } from '@/types';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { ShieldCheck, CheckCircle2, Play } from 'lucide-react';
import { TownshipDroneModal } from './TownshipDroneModal';
import { site } from '@/content/site';

interface PropertyGalleryProps {
  images: Property['images'];
  name: string;
  node?: string;
  landmark?: string;
  droneVideoId?: string;
  droneVideoUrl?: string;
  instagramReelUrl?: string;
}

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function PropertyGallery({
  images,
  name,
  node = 'panvel',
  landmark,
  droneVideoId,
  droneVideoUrl,
  instagramReelUrl,
}: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const instaUrl = instagramReelUrl || site.social.instagram || 'https://www.instagram.com/realestate.nestora';

  if (!images || images.length === 0) return null;

  const currentImage = images[activeIndex] || images[0];

  return (
    <div className="flex flex-col gap-5">
      {/* Main Active Image + Side Instagram Drone Video Action Card */}
      <div className={cn(
        "grid gap-5 items-stretch",
        instaUrl ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1"
      )}>
        
        {/* Main Image Preview */}
        <div className={cn(
          "flex flex-col gap-2",
          instaUrl ? "lg:col-span-8" : "w-full"
        )}>
          <Dialog>
            <DialogTrigger render={
              <button className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-panel rounded-2xl overflow-hidden group outline-none focus-visible:ring-2 focus-visible:ring-sprout focus-visible:ring-offset-2 border border-line shadow-xs text-left cursor-pointer">
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt || name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300" />
                
                {/* Image Caption if provided */}
                {currentImage.caption && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-ink/85 backdrop-blur-md text-sprout font-mono text-xs font-bold uppercase tracking-wider border border-white/10">
                    {currentImage.caption}
                  </div>
                )}

                {/* Click to Zoom Pill */}
                <div className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded bg-ink/80 backdrop-blur-sm text-white text-xs font-mono opacity-80 group-hover:opacity-100 transition-opacity">
                  Click to Expand
                </div>
              </button>
            } />
            <DialogContent className="max-w-[92vw] w-full max-h-[92vh] p-0 overflow-hidden bg-transparent border-none shadow-none">
              <DialogTitle className="sr-only">Image for {name}</DialogTitle>
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9]">
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt || name}
                  fill
                  className="object-contain"
                  sizes="92vw"
                />
              </div>
              {currentImage.caption && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-ink/90 text-white px-5 py-2.5 rounded-lg text-sm backdrop-blur-md max-w-[90%] text-center border border-white/10">
                  {currentImage.caption}
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>

        {/* Side Drone Video & Verification Card */}
        {instaUrl && (
          <div className="lg:col-span-4 flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-br from-[#1b251e] to-ink border border-white/15 text-white shadow-card relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-sprout font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <ShieldCheck className="w-4 h-4 text-sprout" />
                <span>Real Site Visuals</span>
              </div>

              <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight mb-2">
                Watch Drone Video on Instagram
              </h3>
              
              <p className="font-sans text-xs text-white/80 leading-relaxed mb-6">
                Watch real aerial drone walkthroughs, plot demarcations, 40ft internal roads, and Sahyadri mountain surroundings on our official Instagram reels.
              </p>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-white/90">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sprout shrink-0" />
                  <span>Real on-ground footage only</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/90">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sprout shrink-0" />
                  <span>Fresh updates & construction progress</span>
                </div>
              </div>
            </div>

            {/* Drone Video Modal Action */}
            <div className="relative z-10 pt-4 border-t border-white/10">
              <TownshipDroneModal
                propertyName={name}
                node={node}
                landmark={landmark}
                droneVideoId={droneVideoId}
                droneVideoUrl={droneVideoUrl}
                instagramReelUrl={instagramReelUrl}
                previewImage={currentImage.src}
              >
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 hover:scale-[1.01] transition-all duration-200 shadow-md group cursor-pointer"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>Watch Drone Video Reel</span>
                  <Play className="w-3.5 h-3.5 fill-white group-hover:scale-110 transition-transform" />
                </button>
              </TownshipDroneModal>
              <p className="text-center font-mono text-[0.6875rem] text-white/50 mt-2">
                Actual On-Ground Drone Footage
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Only show thumbnails if more than 1 image exists */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative w-24 h-16 sm:w-32 sm:h-20 shrink-0 rounded-lg overflow-hidden snap-start outline-none focus-visible:ring-2 focus-visible:ring-sprout transition-all cursor-pointer",
                activeIndex === index ? "ring-2 ring-canopy ring-offset-2 opacity-100" : "opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={image.src}
                alt={image.alt || `Photo ${index + 1}`}
                fill
                sizes="(max-width: 640px) 96px, 128px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
