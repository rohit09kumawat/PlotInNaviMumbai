export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  propertyType?: string;
  dateISO: string;
  verifiedPurchase: boolean;
  avatarUrl?: string;
}

// Ships as an empty array per Deviation D4 (No fabricated reviews)
export const testimonials: Testimonial[] = [];
