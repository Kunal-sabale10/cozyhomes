/** All configurable values for CozyMoments. Items marked CONFIG need owner confirmation. */
export const CONFIG = {
  SITE_NAME: 'CozyMoments',
  SITE_TAGLINE: 'Your Home Away From Home',
  SITE_TAGLINE_HINDI: 'Humare ghar ko apna ghar samjho',
  SITE_SUBLINE: 'Because Privacy Matters',
  SITE_URL: 'https://cozymoments.in',
  LOCATION: 'Kalwa, Thane, Maharashtra, India',
  LOCATION_SHORT: 'Kalwa, Thane',

  // Pricing
  RATE_PER_HOUR_INR: 300,
  MAX_GUESTS: 2,
  MIN_HOURS: 1,
  MAX_HOURS: 12,

  // Operating hours
  OPERATING_START: '08:00', // CONFIG: Owner-editable
  OPERATING_END: '23:00',   // CONFIG: Owner-editable
  BUFFER_MINUTES: 30,       // CONFIG: Owner-editable cleaning buffer
  SLOT_INTERVAL_MINUTES: 30,

  // Hold & booking
  HOLD_DURATION_MINUTES: 10,

  // Tax — CONFIG: Owner to confirm GST status
  TAX_PERCENT: 0,

  // Deposit — CONFIG: Owner to confirm deposit amount
  ADVANCE_DEPOSIT_INR: 0,

  // Accepted ID types — CONFIG: Owner to confirm
  ACCEPTED_ID_TYPES: ['aadhaar', 'passport', 'driving_licence', 'voter_id'] as const,

  // ID retention — CONFIG: Owner to confirm period
  ID_RETENTION_DAYS: 90,

  // Payment modes in data model
  PAYMENT_MODE: 'full' as const, // 'full' | 'advance_deposit' | 'pay_at_property'

  // Contact — CONFIG: Owner to provide
  WHATSAPP_NUMBER: '+919876543210',
  CONTACT_EMAIL: 'hello@cozymoments.in',
  CONTACT_PHONE: '+919876543210',

  // Timezone
  TIMEZONE: 'Asia/Kolkata',

  // Map
  MAP_LAT: 19.2094,
  MAP_LNG: 73.0356,

  // Upload limits
  MAX_FILE_SIZE_MB: 5,
  ACCEPTED_FILE_TYPES: ['image/jpeg', 'image/png', 'application/pdf'] as const,
} as const;

export type IdType = (typeof CONFIG.ACCEPTED_ID_TYPES)[number];
export type PaymentMode = 'full' | 'advance_deposit' | 'pay_at_property';
