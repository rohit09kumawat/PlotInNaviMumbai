'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Video, ExternalLink, ShieldCheck } from 'lucide-react';
import { site } from '@/content/site';

interface DroneVideoSectionProps {
  videoId?: string;
  videoUrl?: string;
  title?: string;
  subtitle?: string;
  badgeText?: string;
  emptyPlaceholderTitle?: string;
  emptyPlaceholderSubtitle?: string;
}

// Helper to extract YouTube Video ID from any URL format
export function extractYouTubeId(urlOrId?: string): string | null {
  if (!urlOrId) return null;
  const trimmed = urlOrId.trim();
  
  // If it's already an 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Handle youtu.be/<id>
  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];

  // Handle youtube.com/watch?v=<id>
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];

  // Handle youtube.com/embed/<id>
  const embedMatch = trimmed.match(/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  // Handle youtube.com/shorts/<id>
  const shortsMatch = trimmed.match(/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) return shortsMatch[1];

  return null;
}

export function DroneVideoSection({
  videoId,
  videoUrl,
  title = 'Township Aerial Drone Video Tour',
  subtitle = 'Watch actual on-ground drone walkthrough and infrastructure progress from our YouTube channel.',
  badgeText = 'Actual Site Drone Coverage',
  emptyPlaceholderTitle = 'YouTube Video Link Ready',
  emptyPlaceholderSubtitle = 'Aap apna YouTube video link ya ID yahan paste kar sakte hain aur video automatically play hone lagega.',
}: DroneVideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const activeId = extractYouTubeId(videoId || videoUrl);
  const channelUrl = site.social.youtube || 'https://youtube.com';

  return (
    <div className="bg-ink text-white rounded-2xl overflow-hidden border border-white/10 shadow-card">
      <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-sprout font-mono text-xs font-bold uppercase tracking-wider mb-1.5">
            <Video className="w-4 h-4" />
            <span>{badgeText}</span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
            {title}
          </h3>
          <p className="font-sans text-xs sm:text-sm text-white/75 mt-1 max-w-2xl">
            {subtitle}
          </p>
        </div>

        <a
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-sprout hover:text-white transition-colors shrink-0 self-start sm:self-auto py-2 px-4 rounded-lg bg-white/5 border border-white/10"
        >
          <span>Visit YouTube Channel</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="relative aspect-video w-full bg-black">
        {activeId ? (
          isPlaying ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center group cursor-pointer bg-neutral-900 overflow-hidden" onClick={() => setIsPlaying(true)}>
              {/* YouTube HQ Thumbnail */}
              <Image
                src={`https://img.youtube.com/vi/${activeId}/maxresdefault.jpg`}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 1000px"
                className="object-cover opacity-80 group-hover:opacity-95 transition-opacity duration-300"
                unoptimized
              />
              <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/10 transition-colors" />

              {/* Play Button */}
              <button
                type="button"
                className="relative z-10 w-20 h-20 rounded-full bg-sprout text-ink flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300"
                aria-label="Play Drone Video"
              >
                <Play className="w-8 h-8 fill-ink ml-1" />
              </button>

              <div className="absolute bottom-4 left-4 z-10 px-3 py-1.5 rounded bg-ink/80 backdrop-blur-sm border border-white/10 text-xs font-mono text-white/90">
                Click to play YouTube Drone Walkthrough
              </div>
            </div>
          )
        ) : (
          /* Placeholder when YouTube ID is pending */
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-canopy/40">
            <div className="w-16 h-16 rounded-2xl bg-white/10 text-sprout flex items-center justify-center mb-4">
              <Video className="w-8 h-8" />
            </div>
            <h4 className="font-display text-lg sm:text-xl font-bold text-white mb-2">
              {emptyPlaceholderTitle}
            </h4>
            <p className="font-sans text-xs sm:text-sm text-white/70 max-w-md mb-6">
              {emptyPlaceholderSubtitle}
            </p>
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider bg-sprout text-ink px-5 py-2.5 rounded hover:bg-white transition-colors"
            >
              <span>Watch on @realestate.nestora</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>

      <div className="p-4 bg-white/5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-white/60">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-sprout" />
          <span>Real Site Footage · Demarcated NA Townships</span>
        </div>
        <span>Navi Mumbai & Panvel Growth Corridors</span>
      </div>
    </div>
  );
}
