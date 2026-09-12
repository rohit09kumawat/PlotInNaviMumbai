'use client';

import * as React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { track } from '@/lib/analytics';
import { site } from '@/content/site';

interface WhatsAppButtonProps {
  message?: string;
  variant?: 'primary' | 'outline' | 'float' | 'secondary';
  source?: string;
  label?: string;
  className?: string;
  iconClassName?: string;
  showIcon?: boolean;
}

export function WhatsAppButton({
  message = 'Hi PlotInNaviMumbai.com, I would like to understand more about available plots in Navi Mumbai.',
  variant = 'primary',
  source = 'general',
  label = 'Talk to us on WhatsApp',
  className,
  iconClassName,
  showIcon = true,
}: WhatsAppButtonProps) {
  const hasWhatsApp = Boolean(site.whatsapp && site.whatsapp.trim().length > 0);
  const href = hasWhatsApp
    ? buildWhatsAppUrl({ message, number: site.whatsapp })
    : site.phone
      ? `tel:${site.phone.replace(/\s+/g, '')}`
      : '/contact';

  const handleClick = () => {
    if (hasWhatsApp) {
      track('whatsapp_click', { source });
    } else {
      track('phone_click', { source });
    }
  };

  const baseStyles =
    'inline-flex items-center justify-center font-sans font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout focus-visible:ring-offset-2';

  const variants = {
    primary:
      'bg-canopy text-white px-5 py-3 rounded-[var(--radius)] hover:bg-moss text-[0.9375rem] gap-2.5 shadow-sm',
    outline:
      'border border-canopy text-canopy bg-transparent px-5 py-3 rounded-[var(--radius)] hover:bg-panel text-[0.9375rem] gap-2.5',
    secondary:
      'bg-paper text-ink border border-line px-5 py-3 rounded-[var(--radius)] hover:bg-panel text-[0.9375rem] gap-2.5',
    float:
      'w-14 h-14 bg-canopy text-white rounded-full shadow-[var(--shadow-float)] hover:bg-moss hover:scale-105 transition-transform duration-200',
  };

  return (
    <a
      href={href}
      target={hasWhatsApp ? '_blank' : undefined}
      rel={hasWhatsApp ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      className={cn(baseStyles, variants[variant], className)}
      aria-label={label}
    >
      {showIcon && (
        hasWhatsApp ? (
          <MessageCircle className={cn('w-4 h-4 shrink-0', iconClassName)} />
        ) : (
          <Phone className={cn('w-4 h-4 shrink-0', iconClassName)} />
        )
      )}
      {variant !== 'float' && <span>{hasWhatsApp ? label : (site.phone ? `Call ${site.phone}` : 'Contact us')}</span>}
    </a>
  );
}
