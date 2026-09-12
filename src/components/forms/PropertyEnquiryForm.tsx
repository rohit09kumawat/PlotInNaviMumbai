'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from './FormField';
import { submitEnquiry } from '@/actions/submit-enquiry';
import { MessageCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { track } from '@/lib/analytics';
import type { Property } from '@/types';

const propertyEnquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your full name')
    .max(60, 'Name cannot exceed 60 characters'),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a valid phone number')
    .refine((val) => {
      const clean = val.replace(/[\s-]/g, '');
      return /^[6-9]\d{9}$/.test(clean) || /^0[6-9]\d{9}$/.test(clean) || /^91[6-9]\d{9}$/.test(clean) || /^\+[1-9]\d{6,14}$/.test(clean);
    }, 'Enter a valid 10-digit mobile number or international number'),
  preferredContact: z.enum(['whatsapp', 'call', 'video-call', 'in-person']),
  message: z.string().max(800, 'Message cannot exceed 800 characters').optional(),
  propertySlug: z.string(),
  propertyName: z.string(),
  website: z.string().optional(),
});

type FormData = z.infer<typeof propertyEnquirySchema>;

export function PropertyEnquiryForm({
  property,
  className,
}: {
  property: Property;
  className?: string;
}) {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [whatsappUrl, setWhatsappUrl] = React.useState<string | null>(null);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(propertyEnquirySchema),
    defaultValues: {
      name: '',
      phone: '',
      preferredContact: 'whatsapp',
      message: '',
      propertySlug: property.slug,
      propertyName: property.name,
      website: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    const result = await submitEnquiry({
      ...data,
      formType: 'property-enquiry',
    });

    if (result.ok) {
      setIsSubmitted(true);
      if (result.whatsappUrl) {
        setWhatsappUrl(result.whatsappUrl);
      }
      track('property_enquiry_submitted', { property: property.slug });
    } else {
      setServerError(result.message || 'Unable to submit enquiry. Please contact us on WhatsApp.');
    }
  };

  if (isSubmitted) {
    return (
      <div className={`p-6 bg-panel rounded-[var(--radius)] border border-line flex flex-col items-center text-center ${className || ''}`}>
        <div className="w-10 h-10 rounded-full bg-canopy/10 text-canopy flex items-center justify-center mb-3">
          <CheckCircle2 className="w-5 h-5 text-canopy" />
        </div>
        <h4 className="font-display text-lg font-medium text-ink mb-1">
          Enquiry Received
        </h4>
        <p className="text-muted text-sm max-w-sm mb-4 leading-normal">
          We will share the documentation and answer your questions about {property.name} shortly.
        </p>

        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('whatsapp_click', { source: `property_enquiry_prompt_${property.slug}` })}
            className="inline-flex items-center justify-center gap-2 bg-canopy hover:bg-moss text-white px-5 py-2.5 rounded-[var(--radius)] text-xs font-medium transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Continue on WhatsApp
          </a>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-4 bg-white p-5 rounded-[var(--radius)] border border-line ${className || ''}`}
      noValidate
    >
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        {...register('website')}
        aria-hidden="true"
      />
      <input type="hidden" {...register('propertySlug')} />
      <input type="hidden" {...register('propertyName')} />

      <FormField label="Full Name" required error={errors.name?.message} htmlFor="prop-name">
        <input
          id="prop-name"
          type="text"
          placeholder="Your name"
          {...register('name')}
          className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-line bg-paper text-ink text-sm placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout transition-all"
        />
      </FormField>

      <FormField label="WhatsApp Number" required error={errors.phone?.message} htmlFor="prop-phone">
        <input
          id="prop-phone"
          type="tel"
          placeholder="10-digit mobile number"
          {...register('phone')}
          className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-line bg-paper text-ink text-sm placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout transition-all"
        />
      </FormField>

      <FormField label="Preferred Contact" required error={errors.preferredContact?.message} htmlFor="prop-contact">
        <select
          id="prop-contact"
          {...register('preferredContact')}
          className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-line bg-paper text-ink text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout transition-all"
        >
          <option value="whatsapp">WhatsApp Message</option>
          <option value="call">Phone Call</option>
          <option value="video-call">Video Call</option>
          <option value="in-person">Meet in Person</option>
        </select>
      </FormField>

      <FormField label="Questions or specific requirements" hint="Optional" error={errors.message?.message} htmlFor="prop-msg">
        <textarea
          id="prop-msg"
          rows={3}
          placeholder="Any specific questions about title documents, boundaries, or visit timing?"
          {...register('message')}
          className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-line bg-paper text-ink text-sm placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout transition-all resize-none"
        />
      </FormField>

      {serverError && (
        <div className="p-2.5 bg-amber/10 border border-amber/30 rounded-[var(--radius-sm)] text-xs text-amber">
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-11 bg-canopy hover:bg-moss text-white rounded-[var(--radius)] font-medium text-sm transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending enquiry...</span>
          </>
        ) : (
          <span>Request Details for this Plot</span>
        )}
      </button>
    </form>
  );
}
