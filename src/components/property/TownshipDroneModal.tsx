'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { extractYouTubeId } from './DroneVideoSection';
import { Play, Video, ExternalLink, ShieldCheck, MessageCircle, Calendar, Sparkles } from 'lucide-react';
import { site } from '@/content/site';

interface TownshipDroneModalProps {
  propertyName: string;
  node: string;
  landmark?: string;
  droneVideoId?: string;
  droneVideoUrl?: string;
  instagramReelUrl?: string;
  previewImage?: string;
  children: React.ReactNode;
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function TownshipDroneModal({
  propertyName,
  node,
  landmark,
  droneVideoId,
  droneVideoUrl,
  instagramReelUrl,
  previewImage = '/riyasat-township.png',
  children,
}: TownshipDroneModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeId = extractYouTubeId(droneVideoId || droneVideoUrl);
  const instaUrl = instagramReelUrl || site.social.instagram || 'https://www.instagram.com/realestate.nestora';
  
  const waNumber = site.whatsapp || '917424845316';
  const waVideoUrl = `https://wa.me/${waNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hi PlotInNaviMumbai.com, I would like to receive the actual drone video walkthrough and layout footage for ${propertyName} (${node.toUpperCase()}).`
  )}`;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger nativeButton={false} render={<div>{children}</div>} />
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-ink text-white border border-white/15 rounded-2xl shadow-2xl">
        <DialogTitle className="sr-only">
          {propertyName} Drone Video Tour
        </DialogTitle>

        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-ink via-canopy to-ink border-b border-white/10 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sprout font-mono text-[0.6875rem] font-bold uppercase tracking-wider mb-0.5">
              <Video className="w-3.5 h-3.5" />
              <span>{node.toUpperCase()} · ACTUAL SITE DRONE FOOTAGE</span>
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-white uppercase tracking-tight">
              {propertyName}
            </h3>
            {landmark && (
              <p className="font-sans text-xs text-white/70">
                Near {landmark}
              </p>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-2 pr-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-mono text-sprout font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% On-Ground Demarcated
            </span>
          </div>
        </div>

        {/* Video Player Area */}
        <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
          {activeId ? (
            /* YouTube Direct Embed (Autoplay on open) */
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeId}?autoplay=1&rel=0&modestbranding=1`}
              title={`${propertyName} Drone Video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            /* Rich Township Drone Reel Preview Card */
            <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black">
              {/* Background preview image with blur */}
              {previewImage && (
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-30 blur-[2px] scale-105" 
                  style={{ backgroundImage: `url(${previewImage})` }}
                />
              )}
              <div className="absolute inset-0 bg-ink/70" />

              <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-sprout/20 border border-sprout/40 text-sprout flex items-center justify-center mb-4 shadow-lg">
                  <Play className="w-8 h-8 fill-sprout ml-1" />
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sprout text-[0.6875rem] font-mono font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3 h-3" />
                  Township Drone Reel & 4K Tour
                </div>

                <h4 className="font-display text-xl sm:text-2xl font-bold text-white mb-2 uppercase tracking-tight">
                  {propertyName} On-Ground Drone Reel
                </h4>

                <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed mb-6 max-w-md">
                  Watch actual aerial views of {propertyName} showing internal concrete roads, boundary demarcations, mountain backdrop, and plot layout.
                </p>

                {/* Direct Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  {instaUrl && (
                    <a
                      href={instaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-mono text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-opacity shadow-md"
                    >
                      <InstagramIcon className="w-4 h-4" />
                      <span>Watch Reel on Instagram</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <a
                    href={waVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sprout text-ink font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Request 4K Video on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-ink/95 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-white/70 font-sans">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Ready for on-site verification & physical site tour</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/book-site-visit"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors border border-white/10"
            >
              <Calendar className="w-3.5 h-3.5 text-sprout" />
              <span>Book Free Site Visit</span>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
