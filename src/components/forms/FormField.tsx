import * as React from 'react';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  error,
  required,
  hint,
  htmlFor,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={htmlFor}
          className="font-sans text-sm font-medium text-ink flex items-center gap-1"
        >
          {label}
          {required && <span className="text-amber" aria-hidden="true">*</span>}
        </label>
        {hint && <span className="text-xs text-muted font-sans">{hint}</span>}
      </div>

      {children}

      {error && (
        <p className="text-xs text-amber font-sans mt-0.5" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
