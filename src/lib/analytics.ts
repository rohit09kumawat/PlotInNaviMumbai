export type AnalyticsEvent =
  | 'whatsapp_click'
  | 'phone_click'
  | 'tour_request_submitted'
  | 'site_visit_request_submitted'
  | 'consultation_submitted'
  | 'contact_form_submitted'
  | 'property_enquiry_submitted'
  | 'property_view'
  | 'property_filter_used'
  | 'brochure_download'
  | 'scroll_depth';

export function track(event: AnalyticsEvent, props?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  // Never track sensitive information (phone numbers, full names, etc.)
  if (process.env.NODE_ENV === 'development') {
    console.debug(`[Analytics Event] ${event}`, props ?? {});
  }

  // Hook for Plausible or custom cookieless analytics if configured
  const win = window as unknown as { plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void };
  if (typeof win.plausible === 'function') {
    win.plausible(event, { props });
  }
}
