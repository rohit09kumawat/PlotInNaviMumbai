'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from './FormField';
import { submitEnquiry } from '@/actions/submit-enquiry';
import { MessageCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { track } from '@/lib/analytics';

const siteVisitFormSchema = z.object({
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
  preferredProject: z.string().min(1, 'Please select a preferred project'),
  preferredDate: z.string().min(1, 'Please select a preferred date'),
  preferredTime: z.string().min(1, 'Please select a preferred time window'),
  message: z.string().max(800, 'Notes cannot exceed 800 characters').optional(),
  website: z.string().optional(),
});

type FormData = z.infer<typeof siteVisitFormSchema>;

export function SiteVisitForm({ className }: { className?: string }) {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [whatsappUrl, setWhatsappUrl] = React.useState<string | null>(null);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(siteVisitFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      preferredContact: 'whatsapp',
      preferredProject: 'The Riyasat Sankalp',
      preferredDate: '',
      preferredTime: 'Morning (9:00 AM - 12:00 PM)',
      message: '',
      website: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    const result = await submitEnquiry({
      ...data,
      formType: 'site-visit',
    });

    if (result.ok) {
      setIsSubmitted(true);
      if (result.whatsappUrl) {
        setWhatsappUrl(result.whatsappUrl);
      }
      track('site_visit_request_submitted', { project: data.preferredProject });
    } else {
      setServerError(result.message || 'Unable to book site visit. Please message us directly on WhatsApp.');
    }
  };

  if (isSubmitted) {
    return (
      <div className={`p-8 bg-panel rounded-[var(--radius-lg)] border border-line flex flex-col items-center text-center ${className || ''}`}>
        <div className="w-12 h-12 rounded-full bg-canopy/10 text-canopy flex items-center justify-center mb-4">
          <CheckCircle2 className="w-6 h-6 text-canopy" />
        </div>
        <h3 className="font-display text-2xl font-medium text-ink mb-2">
          Site Visit Booked Successfully
        </h3>
        <p className="text-muted text-[0.9375rem] max-w-md mb-6 leading-relaxed">
          Thank you for choosing PlotInNaviMumbai.com. We have received your booking details and will contact you shortly to coordinate the visit.
        </p>

        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('whatsapp_click', { source: 'site_visit_success_prompt' })}
            className="inline-flex items-center justify-center gap-2 bg-canopy hover:bg-moss text-white px-6 py-3 rounded-[var(--radius)] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout"
          >
            <MessageCircle className="w-4 h-4" />
            Confirm immediately on WhatsApp
          </a>
        )}
      </div>
    );
  }

  // Get today's date formatted as YYYY-MM-DD for min date picker constraint
  const todayISO = new Date().toISOString().split('T')[0];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-5 bg-white p-6 sm:p-8 rounded-[var(--radius-lg)] border border-line ${className || ''}`}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Full Name" required error={errors.name?.message} htmlFor="visit-name">
          <input
            id="visit-name"
            type="text"
            placeholder="Your name"
            {...register('name')}
            className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-line bg-paper text-ink text-sm placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout transition-all"
          />
        </FormField>

        <FormField
          label="WhatsApp Mobile Number"
          required
          hint="10 digits"
          error={errors.phone?.message}
          htmlFor="visit-phone"
        >
          <input
            id="visit-phone"
            type="tel"
            placeholder="e.g. 9876543210"
            {...register('phone')}
            className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-line bg-paper text-ink text-sm placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout transition-all"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Preferred Contact" required error={errors.preferredContact?.message} htmlFor="visit-contact">
          <select
            id="visit-contact"
            {...register('preferredContact')}
            className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-line bg-paper text-ink text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout transition-all"
          >
            <option value="whatsapp">WhatsApp Message</option>
            <option value="call">Phone Call</option>
            <option value="video-call">Video Call</option>
            <option value="in-person">Meet in Person</option>
          </select>
        </FormField>

        <FormField label="Preferred Project" required error={errors.preferredProject?.message} htmlFor="visit-project">
          <select
            id="visit-project"
            {...register('preferredProject')}
            className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-line bg-paper text-ink text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout transition-all"
          >
            <option value="The Riyasat Sankalp">The Riyasat Sankalp (Nadhal, Panvel)</option>
            <option value="Sankalp Meadows">Sankalp Meadows (Nadhal, Panvel)</option>
            <option value="Riyasat Bliss">Riyasat Bliss (Mohape, Panvel)</option>
            <option value="General Plot Enquiry">General Plot / Other Node</option>
          </select>
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Preferred Date" required error={errors.preferredDate?.message} htmlFor="visit-date">
          <input
            id="visit-date"
            type="date"
            min={todayISO}
            {...register('preferredDate')}
            className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-line bg-paper text-ink text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout transition-all"
          />
        </FormField>

        <FormField label="Preferred Time Window" required error={errors.preferredTime?.message} htmlFor="visit-time">
          <select
            id="visit-time"
            {...register('preferredTime')}
            className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-line bg-paper text-ink text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout transition-all"
          >
            <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
            <option value="Afternoon (12:00 PM - 3:00 PM)">Afternoon (12:00 PM - 3:00 PM)</option>
            <option value="Evening (3:00 PM - 6:00 PM)">Evening (3:00 PM - 6:00 PM)</option>
          </select>
        </FormField>
      </div>

      <FormField label="Additional Message or Requirements" hint="Optional" error={errors.message?.message} htmlFor="visit-notes">
        <textarea
          id="visit-notes"
          rows={3}
          placeholder="Describe your requirements or specific plot sizes you are interested in..."
          {...register('message')}
          className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-line bg-paper text-ink text-sm placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout transition-all resize-y"
        />
      </FormField>

      {serverError && (
        <div className="p-3 bg-amber/10 border border-amber/30 rounded-[var(--radius-sm)] text-xs text-amber">
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 bg-canopy hover:bg-moss text-white rounded-[var(--radius)] font-medium text-[0.9375rem] transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Booking your site visit...</span>
          </>
        ) : (
          <span>Book Site Visit</span>
        )}
      </button>

      <p className="text-[0.8125rem] text-muted text-center leading-normal">
        Free unhurried visits. No token advances, no high-pressure sales pitches on site.
      </p>
    </form>
  );
}
