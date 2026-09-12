'use client';

import * as React from 'react';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { track } from '@/lib/analytics';
import { site } from '@/content/site';

export function WhatsAppFloat() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled > 25% of the page
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const scrollDepth = window.scrollY / scrollHeight;
      setIsVisible(scrollDepth > 0.25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hasWhatsApp = Boolean(site.whatsapp && site.whatsapp.trim().length > 0);
  const href = hasWhatsApp
    ? buildWhatsAppUrl({
        message: 'Hi PlotInNaviMumbai.com, I would like to connect with an advisor regarding land and plots in Navi Mumbai.',
        number: site.whatsapp,
      })
    : site.phone
      ? `tel:${site.phone.replace(/\s+/g, '')}`
      : '/contact';

  const handleClick = () => {
    track('whatsapp_click', { source: 'float' });
  };

  return (
    <a
      href={href}
      target={hasWhatsApp ? '_blank' : undefined}
      rel={hasWhatsApp ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      className={cn(
        'hidden md:flex fixed bottom-8 right-8 z-40 w-14 h-14 bg-canopy text-white rounded-full items-center justify-center shadow-[var(--shadow-float)] transition-all duration-300 hover:scale-105 hover:bg-moss focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout focus-visible:ring-offset-2',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
      )}
      aria-label="Talk to us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
