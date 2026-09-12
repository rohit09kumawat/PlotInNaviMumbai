import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendWhatsAppMessage } from '@/lib/whatsapp-server';

// Validation schema for Contact Form
const contactFormApiSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name is required (at least 2 characters)')
    .max(60, 'Name cannot exceed 60 characters'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address'),
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
  message: z
    .string()
    .trim()
    .min(5, 'Message is required (at least 5 characters)')
    .max(1000, 'Message cannot exceed 1000 characters'),
  lookingFor: z.string().optional(),
  preferredContact: z.enum(['whatsapp', 'call', 'video-call', 'in-person']).default('whatsapp'),
  website: z.string().optional(), // Honeypot field
});

// Simple in-memory rate limiting map: IP -> timestamp[]
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 5 * 60 * 1000; // 5 minutes
  const maxRequests = 8;

  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= maxRequests) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();

    // 1. Zod Validation
    const validation = contactFormApiSchema.safeParse(rawBody);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const fieldName = issue.path.join('.');
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      });

      return NextResponse.json(
        {
          ok: false,
          error: 'Validation failed. Please check the required fields.',
          fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // 2. Honeypot check: If bot filled the hidden website input, return fake success
    if (data.website && data.website.trim().length > 0) {
      return NextResponse.json({
        ok: true,
        message: 'Thank you for your submission.',
      });
    }

    // 3. IP Rate Limiting Check
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    if (ip !== 'unknown' && isRateLimited(ip)) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Too many requests received from your IP. Please try again in a few minutes.',
        },
        { status: 429 }
      );
    }

    // 4. Dispatch directly to WhatsApp via Server API (Zero Database storage)
    const result = await sendWhatsAppMessage({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      lookingFor: data.lookingFor,
      preferredContact: data.preferredContact,
      formType: 'contact',
    });

    if (!result.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: result.message,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: result.message,
        deliveryMethod: result.deliveryMethod,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error('[API /contact Error]:', err);
    return NextResponse.json(
      {
        ok: false,
        error: 'An unexpected error occurred while sending your message. Please try again.',
      },
      { status: 500 }
    );
  }
}
