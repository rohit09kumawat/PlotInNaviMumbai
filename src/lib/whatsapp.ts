import { site } from '@/content/site';
import type { Property, Node } from '@/types';

export function buildWhatsAppUrl({
  message,
  number = site.whatsapp,
}: {
  message: string;
  number?: string;
}): string {
  // number is E.164 WITHOUT '+' — e.g. '919876543210'
  const cleanNumber = (number || '').replace(/\D/g, '');
  if (!cleanNumber) {
    return '#';
  }
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export const waMessages = {
  general: () =>
    `Hi PlotInNaviMumbai.com, I found your website and I'd like to understand which plots might suit my requirement.`,

  consultation: () =>
    `Hi PlotInNaviMumbai.com, I'd like to book a free consultation. Please guide me on choosing the right plot.`,

  property: (p: Property) => {
    const nodeCapitalized = p.node.charAt(0).toUpperCase() + p.node.slice(1);
    const sectorPart = p.location.sector ? `${p.location.sector}, ` : '';
    return `Hi PlotInNaviMumbai.com, I'm interested in ${p.name} (${sectorPart}${nodeCapitalized}). Could you share more details and the current documentation status?`;
  },

  tour: () =>
    `Hi PlotInNaviMumbai.com, I'd like to arrange a Family Property Tour. Please let me know the available dates.`,

  node: (n: Node) =>
    `Hi PlotInNaviMumbai.com, I'm looking at plots in ${n.name}. Could you tell me what's currently available?`,
};
