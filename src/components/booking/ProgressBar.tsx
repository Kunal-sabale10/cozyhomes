'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  currentStep: number;
  className?: string;
}

const STEPS = [
  { id: 1, full: 'Select Slot', short: 'Slot' },
  { id: 2, full: 'Details', short: 'Details' },
  { id: 3, full: 'Upload ID', short: 'ID' },
  { id: 4, full: 'Payment', short: 'Pay' },
  { id: 5, full: 'Confirmed', short: 'Done' },
];

export default function ProgressBar({ currentStep, className }: ProgressBarProps) {
  return (
    <nav aria-label="Booking progress" className={cn('w-full max-w-2xl mx-auto py-2', className)}>
      <ol className="flex items-center justify-between relative">
        {STEPS.map((step, idx) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isFuture = step.id > currentStep;
          const isLast = idx === STEPS.length - 1;

          return (
            <li
              key={step.id}
              className="flex-1 relative flex flex-col items-center group"
              aria-current={isCurrent ? 'step' : undefined}
            >
              {/* Connecting line to next step */}
              {!isLast && (
                <div
                  aria-hidden="true"
                  className="absolute top-4 left-1/2 w-full h-[2px] -translate-y-1/2 z-0"
                >
                  <div
                    className={cn(
                      'h-full transition-all duration-500 ease-out',
                      step.id < currentStep ? 'bg-sage' : 'bg-charcoal/15'
                    )}
                  />
                </div>
              )}

              {/* Step indicator circle */}
              <div
                className={cn(
                  'relative z-10 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border-2',
                  isCompleted &&
                    'bg-sage border-sage text-warm-white shadow-xs',
                  isCurrent &&
                    'bg-sage border-sage text-warm-white shadow-md ring-4 ring-sage/20 scale-105',
                  isFuture &&
                    'bg-warm-white border-charcoal/20 text-warm-gray'
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[3] text-warm-white" aria-hidden="true" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>

              {/* Step label */}
              <div className="mt-2 text-center">
                {/* Mobile abbreviated label */}
                <span
                  className={cn(
                    'block sm:hidden text-[11px] font-medium transition-colors',
                    isCurrent && 'font-semibold text-charcoal',
                    isCompleted && 'text-sage-dark font-medium',
                    isFuture && 'text-warm-gray'
                  )}
                >
                  {step.short}
                </span>

                {/* Desktop full label */}
                <span
                  className={cn(
                    'hidden sm:block text-xs transition-colors whitespace-nowrap',
                    isCurrent && 'font-semibold text-charcoal',
                    isCompleted && 'text-sage-dark font-medium',
                    isFuture && 'text-warm-gray'
                  )}
                >
                  {step.full}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
