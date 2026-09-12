import { propertySchema } from '@/lib/schemas';
import { Property } from '@/types';

import { riyasatSankalp } from './riyasat-sankalp';
import { riyasatSankalpExtension } from './riyasat-sankalp-extension';
import { riyasatBliss } from './riyasat-bliss';
import { riyasatMontera } from './riyasat-montera';
import { riyasatRoyalcrest } from './riyasat-royalcrest';

const rawProperties: Property[] = [
  riyasatSankalp,
  riyasatSankalpExtension,
  riyasatBliss,
  riyasatMontera,
  riyasatRoyalcrest
];

// Validate at module load to catch errors early.
// In production, malformed data will break the build.
rawProperties.forEach((p) => {
  const result = propertySchema.safeParse(p);
  if (!result.success) {
    console.error(`Validation failed for property: ${p.slug}`);
    console.error(result.error.issues);
    throw new Error(`Invalid property data: ${p.slug}`);
  }
});

export const properties = rawProperties;
