'use client';

import * as React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { track } from '@/lib/analytics';
import { site } from '@/content/site';

export function StickyContactBar() {
  const [isHidden, setIsHidden] = React.useState(false);

  React.useEffect(() => {
    // Hide bar when virtual keyboard might be open (inputs focused)
    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        setIsHidden(true);
      }
    };

    const handleBlur = () => {
      setIsHidden(false);
    };

    window.addEventListener('focusin', handleFocus);
    window.addEventListener('focusout', handleBlur);

    return () => {
      window.removeEventListener('focusin', handleFocus);
      window.removeEventListener('focusout', handleBlur);
    };
  }, []);

  if (isHidden) return null;

  const hasWhatsApp = Boolean(site.whatsapp && site.whatsapp.trim().length > 0);
  const waUrl = hasWhatsApp
    ? buildWhatsAppUrl({
        message: 'Hi PlotInNaviMumbai.com, I would like to connect regarding available land in Navi Mumbai.',
        number: site.whatsapp,
      })
    : site.phone
      ? `tel:${site.phone.replace(/\s+/g, '')}`
      : '/contact';

  const phoneUrl = site.phone ? `tel:${site.phone.replace(/\s+/g, '')}` : '/contact';

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-paper/95 backdrop-blur-md border-t border-line shadow-[var(--shadow-float)] transition-transform duration-300 transform"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 16px)' }}
    >
      <div className="grid grid-cols-2 gap-3 px-4 pt-3 pb-1">
        <a
          href={waUrl}
          target={hasWhatsApp ? '_blank' : undefined}
          rel={hasWhatsApp ? 'noopener noreferrer' : undefined}
          onClick={() => track('whatsapp_click', { source: 'mobile_sticky_bar' })}
          className="h-12 bg-canopy hover:bg-moss text-white rounded-[var(--radius)] flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="font-medium text-[0.9375rem]">WhatsApp</span>
        </a>
        <a
          href={phoneUrl}
          onClick={() => track('phone_click', { source: 'mobile_sticky_bar' })}
          className="h-12 border border-line bg-white hover:bg-panel text-ink rounded-[var(--radius)] flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout"
        >
          <Phone className="h-5 w-5" />
          <span className="font-medium text-[0.9375rem]">Call</span>
        </a>
      </div>
    </div>
  );
}
