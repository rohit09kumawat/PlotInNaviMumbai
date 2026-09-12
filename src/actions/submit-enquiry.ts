'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { sendWhatsAppMessage } from '@/lib/whatsapp-server';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { site } from '@/content/site';

// In-memory rate limiting store: IP -> timestamps[]
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 5 * 60 * 1000; // 5 minutes
  const limit = 8;

  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((time) => now - time < windowMs);

  if (validTimestamps.length >= limit) {
    return false;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true;
}

const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your full name (at least 2 characters)')
    .max(60, 'Name cannot exceed 60 characters'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a valid phone number')
    .refine((val) => {
      const clean = val.replace(/[^\d+]/g, '');
      return (
        /^[6-9]\d{9}$/.test(clean) ||
        /^0[6-9]\d{9}$/.test(clean) ||
        /^91[6-9]\d{9}$/.test(clean) ||
        /^\+[1-9]\d{6,14}$/.test(clean) ||
        /^\d{7,15}$/.test(clean)
      );
    }, 'Enter a valid 10-digit mobile number or international number with country code'),
  preferredContact: z.enum(['whatsapp', 'call', 'video-call', 'in-person'], {
    error: 'Please select a preferred contact method',
  }).default('whatsapp'),
  lookingFor: z.string().optional(),
  preferredLocation: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().max(1000, 'Message cannot exceed 1000 characters').optional(),
  formType: z.enum(['consultation', 'tour', 'property-enquiry', 'contact', 'site-visit']).default('contact'),
  propertySlug: z.string().optional(),
  propertyName: z.string().optional(),
  preferredProject: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  website: z.string().optional(), // Honeypot field
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export type EnquiryResult = {
  ok: boolean;
  message?: string;
  whatsappUrl?: string;
  errors?: Record<string, string>;
};

/**
 * Server action for form submissions.
 * Sends data directly to WhatsApp via WhatsApp Server Service.
 * Does NOT store any information in a database.
 */
export async function submitEnquiry(rawData: unknown): Promise<EnquiryResult> {
  try {
    // 1. Zod Validation
    const validation = enquirySchema.safeParse(rawData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((err) => {
        const path = err.path.join('.');
        if (!fieldErrors[path]) {
          fieldErrors[path] = err.message;
        }
      });
      return { ok: false, errors: fieldErrors };
    }

    const data = validation.data;

    // 2. Honeypot check
    if (data.website && data.website.trim().length > 0) {
      return {
        ok: true,
        message: 'Thank you. We have received your message.',
      };
    }

    // 3. IP Rate Limiting Check
    let clientIp = 'unknown';
    try {
      const headerList = await headers();
      clientIp =
        headerList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        headerList.get('x-real-ip') ||
        'unknown';
    } catch {
      // Fail open if headers cannot be read
    }

    if (clientIp !== 'unknown' && !checkRateLimit(clientIp)) {
      return {
        ok: false,
        message: 'Too many requests received. Please connect with us directly on WhatsApp.',
        whatsappUrl: buildWhatsAppUrl({
          message: 'Hi PlotInNaviMumbai.com, I would like to enquire about plots in Navi Mumbai.',
          number: site.whatsapp,
        }),
      };
    }

    // 4. Dispatch directly to WhatsApp (No Database Storage)
    const result = await sendWhatsAppMessage({
      name: data.name,
      email: data.email || undefined,
      phone: data.phone,
      message: data.message || undefined,
      lookingFor: data.lookingFor || data.propertyName,
      preferredContact: data.preferredContact,
      preferredProject: data.preferredProject,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      formType: data.formType,
    });

    return {
      ok: result.ok,
      message: result.message,
      whatsappUrl: result.whatsappUrl,
    };
  } catch (err) {
    console.error('[Submit Enquiry Error]:', err);
    return {
      ok: false,
      message: 'An error occurred while processing your request. Please connect directly via WhatsApp.',
      whatsappUrl: buildWhatsAppUrl({
        message: 'Hi PlotInNaviMumbai.com, I would like to enquire about land in Navi Mumbai.',
        number: site.whatsapp,
      }),
    };
  }
}
