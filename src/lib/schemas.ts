import { z } from 'zod';

export const verificationStatusSchema = z.enum(['verified', 'under-review', 'applicable', 'not-applicable']);
export const propertyTypeSchema = z.enum(['residential-plot', 'commercial-plot', 'na-plot', 'farmhouse-plot']);
export const availabilitySchema = z.enum(['available', 'few-remaining', 'sold-out']);

export const nodeSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(2).max(50),
  description: z.string().optional(),
});

export const propertySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  node: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(3).max(80),
  tagline: z.string().max(90),
  type: propertyTypeSchema,
  availability: availabilitySchema,

  plotSizes: z.array(z.object({
    label: z.string(),
    sqft: z.number(),
    sqm: z.number().optional(),
  })),
  priceFrom: z.number().optional(),
  priceTo: z.number().optional(),
  priceNote: z.string().optional(),

  location: z.object({
    sector: z.string().optional(),
    landmark: z.string(),
    lat: z.number().optional(),
    lng: z.number().optional(),
    mapEmbedUrl: z.string().optional(),
  }),

  overview: z.array(z.string()),
  highlights: z.array(z.string()),
  amenities: z.array(z.string()),
  nearby: z.array(z.object({
    name: z.string(),
    distanceKm: z.number(),
    type: z.enum(['transport', 'education', 'health', 'retail', 'civic']),
  })),
  connectivity: z.array(z.string()),

  verification: z.object({
    rera:  z.object({ status: verificationStatusSchema, reference: z.string().optional() }),
    mmrda: z.object({ status: verificationStatusSchema, reference: z.string().optional() }),
    documents: verificationStatusSchema,
    lastCheckedISO: z.string().date(),
  }),

  whyWeLikeThis: z.object({
    points: z.array(z.string()),
    suitsWho: z.array(z.string()),
  }).optional(),
  
  fit: z.array(z.object({
    profile: z.string(),
    note: z.string(),
  })).optional(),

  images: z.array(z.object({
    src: z.string(),
    alt: z.string(),
    caption: z.string().optional(),
  })),
  
  brochureUrl: z.string().optional(),
  masterPlanUrl: z.string().optional(),
  notes: z.array(z.string()).optional(),

  seo: z.object({ title: z.string().max(60), description: z.string().min(70).max(160) }),
  isSample: z.boolean().optional(),
  published: z.boolean(),
});
