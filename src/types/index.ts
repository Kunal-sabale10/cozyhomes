export type BookingStatus = 'hold' | 'pending_payment' | 'confirmed' | 'cancelled' | 'completed' | 'no_show';
export type PaymentStatus = 'created' | 'paid' | 'failed' | 'refunded' | 'partially_refunded';
export type IdType = 'aadhaar' | 'passport' | 'driving_licence' | 'voter_id';
export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export interface Studio {
  name: string;
  ratePerHourInr: number;
  maxGuests: number;
  minHours: number;
  maxHours: number;
  operatingStart: string;
  operatingEnd: string;
  bufferMinutes: number;
  taxPercent: number;
  cancellationPolicyText: string;
  advanceDepositInr: number;
  paymentModes: string[];
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface BookingSlot {
  date: string;
  startTime: string;
  duration: number;
  guestsCount: number;
}

export interface PriceBreakdown {
  ratePerHour: number;
  duration: number;
  subtotal: number;
  taxPercent: number;
  taxAmount: number;
  total: number;
}

export interface GuestDetails {
  fullName: string;
  email: string;
  mobile: string;
  guestsCount: number;
  specialRequests?: string;
  attestedAge18: boolean;
}

export interface GuestIdUpload {
  idType: IdType;
  idNumber?: string;
  documentFile: File;
}

export interface Booking {
  id: string;
  reference: string;
  status: BookingStatus;
  slotDate: string;
  slotStartTime: string;
  slotEndTime: string;
  durationHours: number;
  guestsCount: number;
  amountInr: number;
  taxInr: number;
  totalInr: number;
  createdAt: string;
}

export interface Amenity {
  icon: string;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
  isDemo: boolean;
}
