import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number to Indian Rupee short format.
 * e.g., 4200000 -> ₹42L, 12000000 -> ₹1.2Cr
 */
export function formatINR(amount: number): string {
  if (amount === 0) return '₹0';
  if (amount < 100000) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  }

  let formatted = '';
  if (amount >= 10000000) {
    // Crores
    const cr = amount / 10000000;
    formatted = `${cr % 1 === 0 ? cr : cr.toFixed(2)}Cr`;
  } else {
    // Lakhs
    const lk = amount / 100000;
    formatted = `${lk % 1 === 0 ? lk : lk.toFixed(2)}L`;
  }

  return `₹${formatted}`;
}
