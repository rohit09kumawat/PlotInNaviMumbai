'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from './FormField';
import { CheckCircle2, Loader2, Send, ShieldCheck, RefreshCw } from 'lucide-react';
import { track } from '@/lib/analytics';

const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your full name (at least 2 characters)')
    .max(60, 'Name cannot exceed 60 characters'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email address')
    .email('Please enter a valid email address (e.g. name@example.com)'),
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
  lookingFor: z.string().min(1, 'Please select what you are looking for'),
  preferredContact: z.enum(['whatsapp', 'call', 'video-call', 'in-person']),
  message: z
    .string()
    .trim()
    .min(5, 'Please enter your message or query (at least 5 characters)')
    .max(1000, 'Message cannot exceed 1000 characters'),
  website: z.string().optional(),
});

type FormData = z.infer<typeof contactFormSchema>;

export function ConsultationForm({ className }: { className?: string }) {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      lookingFor: 'Residential NA Plot (Panvel / Ulwe / Kharghar)',
      preferredContact: 'whatsapp',
      message: '',
      website: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormData) => {
    setServerError(null);

    try {
      // POST to the server-side /api/contact endpoint (dispatches directly via WhatsApp API in background)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.ok) {
        setIsSubmitted(true);
        setSuccessMessage(
          result.message ||
            'Your message has been sent directly to our advisory WhatsApp. Our senior territory advisor will review your query and connect with you shortly.'
        );
        track('contact_form_submitted', { preferredContact: data.preferredContact });
        reset();
      } else {
        setServerError(
          result.error ||
            result.message ||
            'Failed to send message via WhatsApp. Please check your information and try again.'
        );
      }
    } catch (err: unknown) {
      console.error('[Form Submit Error]:', err);
      setServerError(
        'A network error occurred while submitting your message. Please check your connection and try again.'
      );
    }
  };

  if (isSubmitted) {
    return (
      <div className={`p-8 sm:p-10 bg-white rounded-[var(--radius-lg)] border border-emerald-500/30 shadow-card flex flex-col items-center text-center ${className || ''}`}>
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-5 ring-8 ring-emerald-500/5">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[0.6875rem] font-bold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          Message Sent Directly to WhatsApp
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-3">
          Thank You! Your Enquiry Was Received
        </h3>

        <p className="font-sans text-muted text-base max-w-lg mb-8 leading-relaxed">
          {successMessage}
        </p>

        <div className="pt-6 border-t border-line w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted">
          <span>✓ Direct WhatsApp Notification Delivered</span>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-panel hover:bg-sand/40 text-ink font-semibold transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Submit Another Query</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-5 bg-white p-6 sm:p-8 rounded-[var(--radius-lg)] border border-line ${className || ''}`}
      noValidate
    >
      {/* Honeypot field to trap spam bots */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        {...register('website')}
        aria-hidden="true"
      />

      {/* Row 1: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Full Name" required error={errors.name?.message} htmlFor="contact-name">
          <input
            id="contact-name"
            type="text"
            placeholder="e.g. Ramesh Patil"
            {...register('name')}
            className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-line bg-paper text-ink text-sm placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout transition-all"
          />
        </FormField>

        <FormField label="Email Address" required error={errors.email?.message} htmlFor="contact-email">
          <input
            id="contact-email"
            type="email"
            placeholder="e.g. ramesh@example.com"
            {...register('email')}
            className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-line bg-paper text-ink text-sm placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout transition-all"
          />
        </FormField>
      </div>

      {/* Row 2: WhatsApp Number & Preferred Contact Mode */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          label="WhatsApp Mobile Number"
          required
          hint="10 digits"
          error={errors.phone?.message}
          htmlFor="contact-phone"
        >
          <input
            id="contact-phone"
            type="tel"
            placeholder="e.g. 9876543210"
            {...register('phone')}
            className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-line bg-paper text-ink text-sm placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout transition-all"
          />
        </FormField>

        <FormField label="Preferred Contact Mode" required error={errors.preferredContact?.message} htmlFor="contact-pref">
          <select
            id="contact-pref"
            {...register('preferredContact')}
            className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-line bg-paper text-ink text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout transition-all cursor-pointer"
          >
            <option value="whatsapp">WhatsApp Message</option>
            <option value="call">Phone Call</option>
            <option value="video-call">Video Call Consultation</option>
            <option value="in-person">In-Person at Office / Site</option>
          </select>
        </FormField>
      </div>

      {/* Row 3: Requirement / Looking For */}
      <FormField label="Looking For" required error={errors.lookingFor?.message} htmlFor="contact-looking">
        <select
          id="contact-looking"
          {...register('lookingFor')}
          className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-line bg-paper text-ink text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout transition-all cursor-pointer"
        >
          <option value="Residential NA Plot (Panvel / Ulwe / Kharghar)">Residential NA Plot (Panvel / Ulwe / Kharghar)</option>
          <option value="Commercial / Mixed-Use Plot">Commercial / Mixed-Use Plot</option>
          <option value="Township Villa Plot">Township Villa Plot</option>
          <option value="Long-term NAINA Corridor Investment">Long-term NAINA Corridor Investment</option>
          <option value="Title Due Diligence & 7/12 Verification">Title Due Diligence & 7/12 Verification</option>
          <option value="Other / General Advisory">Other / General Advisory</option>
        </select>
      </FormField>

      {/* Row 4: Message / Requirement details */}
      <FormField label="Message / Requirement Details" required error={errors.message?.message} htmlFor="contact-message">
        <textarea
          id="contact-message"
          rows={4}
          placeholder="Share any specific locations, plot size preferences, budget range, or questions..."
          {...register('message')}
          className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-line bg-paper text-ink text-sm placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout transition-all resize-none"
        />
      </FormField>

      {/* Error Alert Box */}
      {serverError && (
        <div className="p-4 bg-amber/10 border border-amber/30 rounded-[var(--radius-sm)] text-xs text-amber">
          <p className="font-semibold">{serverError}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 bg-canopy hover:bg-moss text-white rounded-[var(--radius)] font-medium text-[0.9375rem] transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed shadow-xs"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-sprout" />
            <span>Sending directly to WhatsApp...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4 text-sprout" />
            <span>Send Message Directly to WhatsApp</span>
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-[0.75rem] font-mono text-muted text-center pt-1">
        <span>🔒 Zero Database Storage · 100% Privacy Protected · Direct WhatsApp Dispatch</span>
      </div>
    </form>
  );
}
