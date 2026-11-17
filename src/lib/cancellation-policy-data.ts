/**
 * Single source of truth for CozyMoments Cancellation & Refund Policy.
 * Owner-facing placeholders and confirmation notes are kept as code comments.
 */

// [to confirm: owner review of cancellation tiers, cutoff hours, and refund percentages]
// - More than [X] hours before: [X]% refund (baseline: More than 24 hours: 100% refund)
// - [Y] to [X] hours before: [Y]% refund (baseline: 12 to 24 hours: 50% refund)
// - Less than [Y] hours before: no refund (baseline: Less than 12 hours: No refund)
// - [to confirm: bank processing working days, baseline 5-7 working days]
// - [to confirm: customer rescheduling cutoff hours, baseline 12 hours]

export interface RefundTier {
  timeBeforeSlot: string;
  refund: string;
  notes: string;
  isFullRefund?: boolean;
}

export const CANCELLATION_POLICY_DATA = {
  lastUpdated: 'November 17, 2026',
  rescheduleCutoffHours: 12,
  refundWorkingDays: '5 to 7',
  
  tiers: [
    {
      timeBeforeSlot: 'More than 24 hours before',
      refund: '100% refund',
      notes: 'Full refund to original payment method. Zero cancellation fee.',
      isFullRefund: true,
    },
    {
      timeBeforeSlot: '12 to 24 hours before',
      refund: '50% refund',
      notes: 'Partial refund. Covers slot reservation and buffer hold.',
      isFullRefund: false,
    },
    {
      timeBeforeSlot: 'Less than 12 hours before',
      refund: 'No refund',
      notes: 'Non-refundable due to reserved exclusive allocation.',
      isFullRefund: false,
    },
    {
      timeBeforeSlot: 'No-show (failure to check in)',
      refund: 'No refund',
      notes: 'Full booking fee forfeited if guest does not arrive or notify.',
      isFullRefund: false,
    },
  ] as RefundTier[],
};
