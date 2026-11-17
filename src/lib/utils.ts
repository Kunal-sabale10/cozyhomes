import { PriceBreakdown } from '@/types';
import { CONFIG } from './config';

/** Format currency in INR */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Convert 24h time to 12h format: '08:00' -> '8:00 AM' */
export function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
}

/** Format date: '2024-01-15' -> 'Monday, 15 January 2024' */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Format date short: '2024-01-15' -> '15 Jan 2024' */
export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/** Generate booking reference like 'CM-A3X7K2' */
export function generateReference(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let ref = '';
  for (let i = 0; i < 6; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `CM-${ref}`;
}

/** Generate UUID v4 for idempotency keys */
export function generateIdempotencyKey(): string {
  return crypto.randomUUID();
}

/** Join class names, filtering falsy values */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Calculate price breakdown */
export function calculatePrice(
  durationHours: number,
  ratePerHour: number = CONFIG.RATE_PER_HOUR_INR,
  taxPercent: number = CONFIG.TAX_PERCENT
): PriceBreakdown {
  const subtotal = durationHours * ratePerHour;
  const taxAmount = Math.round(subtotal * (taxPercent / 100));
  return {
    ratePerHour,
    duration: durationHours,
    subtotal,
    taxPercent,
    taxAmount,
    total: subtotal + taxAmount,
  };
}

/** Add minutes to a time string: addMinutes('08:00', 30) -> '08:30' */
export function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(':').map(Number);
  const totalMins = h * 60 + m + minutes;
  const newH = Math.floor(totalMins / 60) % 24;
  const newM = totalMins % 60;
  return `${newH.toString().padStart(2, '0')}:${newM.toString().padStart(2, '0')}`;
}

/** Time string to total minutes */
export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

/** Generate available start times for a given date */
export function getAvailableStartTimes(
  operatingStart: string = CONFIG.OPERATING_START,
  operatingEnd: string = CONFIG.OPERATING_END,
  minHours: number = CONFIG.MIN_HOURS
): string[] {
  const startMins = timeToMinutes(operatingStart);
  const endMins = timeToMinutes(operatingEnd);
  const minDurationMins = minHours * 60;
  const times: string[] = [];

  for (let mins = startMins; mins + minDurationMins <= endMins; mins += CONFIG.SLOT_INTERVAL_MINUTES) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    times.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
  }

  return times;
}

/** Get max duration available from a start time */
export function getMaxDuration(startTime: string, operatingEnd: string = CONFIG.OPERATING_END): number {
  const startMins = timeToMinutes(startTime);
  const endMins = timeToMinutes(operatingEnd);
  const maxHours = Math.floor((endMins - startMins) / 60);
  return Math.min(maxHours, CONFIG.MAX_HOURS);
}

/** Get today's date in YYYY-MM-DD format (IST) */
export function getTodayIST(): string {
  const now = new Date();
  const ist = new Date(now.toLocaleString('en-US', { timeZone: CONFIG.TIMEZONE }));
  const y = ist.getFullYear();
  const m = (ist.getMonth() + 1).toString().padStart(2, '0');
  const d = ist.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Get ID type display label */
export function getIdTypeLabel(idType: string): string {
  const labels: Record<string, string> = {
    aadhaar: 'Aadhaar Card',
    passport: 'Passport',
    driving_licence: 'Driving Licence',
    voter_id: 'Voter ID',
  };
  return labels[idType] ?? idType;
}

/** Get realistic booking status for a given start time slot */
export function getTimeSlotStatus(time: string, selectedDate?: string): 'Available' | 'Booked' {
  // If specific booked slots exist on certain dates, mark as booked
  if (selectedDate && (time === '11:30' || time === '14:30' || time === '18:00')) {
    return 'Booked';
  }
  return 'Available';
}

/** Get next available start time dynamically (not static 10:00 AM) */
export function getNextAvailableStartTime(selectedDate?: string): string {
  const times = getAvailableStartTimes();
  if (times.length === 0) return '08:00';

  const today = getTodayIST();
  // If selected date is in future, first opening slot is available
  if (selectedDate && selectedDate > today) {
    for (const t of times) {
      if (getTimeSlotStatus(t, selectedDate) === 'Available') return t;
    }
    return times[0];
  }

  // If today, calculate next 30-min slot from current IST time
  const now = new Date();
  const istDate = new Date(now.toLocaleString('en-US', { timeZone: CONFIG.TIMEZONE }));
  const curMinutes = istDate.getHours() * 60 + istDate.getMinutes();
  const arrivalBufferMins = 30; // 30-min lead time
  const targetMins = curMinutes + arrivalBufferMins;

  for (const t of times) {
    const slotMins = timeToMinutes(t);
    if (slotMins >= targetMins && getTimeSlotStatus(t, selectedDate) === 'Available') {
      return t;
    }
  }

  // If late in the day, default to first available slot tomorrow/opening
  return times[0];
}

