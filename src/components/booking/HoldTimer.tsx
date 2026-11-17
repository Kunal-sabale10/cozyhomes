'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HoldTimerProps {
  onExpire: () => void;
  startMinutes?: number;
  className?: string;
}

export default function HoldTimer({
  onExpire,
  startMinutes = 10,
  className,
}: HoldTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState<number>(startMinutes * 60);
  const onExpireRef = useRef(onExpire);
  const hasExpiredRef = useRef(false);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    setSecondsLeft(startMinutes * 60);
    hasExpiredRef.current = false;
  }, [startMinutes]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (!hasExpiredRef.current) {
        hasExpiredRef.current = true;
        onExpireRef.current();
      }
      return;
    }

    const intervalId = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(intervalId);
          if (!hasExpiredRef.current) {
            hasExpiredRef.current = true;
            onExpireRef.current();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;

  const isCritical = secondsLeft <= 60 && secondsLeft > 0;
  const isWarning = secondsLeft <= 120 && secondsLeft > 60;

  return (
    <div
      role="timer"
      aria-live="polite"
      aria-label={`Time remaining to complete booking: ${formattedTime}`}
      className={cn(
        'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors',
        isCritical
          ? 'bg-red-50 text-red-600 border-red-200 animate-pulse'
          : isWarning
          ? 'bg-amber-50 text-amber-600 border-amber-200'
          : 'bg-warm-white text-charcoal border-beige/80',
        className
      )}
    >
      <Clock
        className={cn(
          'w-3.5 h-3.5',
          isCritical
            ? 'text-red-500'
            : isWarning
            ? 'text-amber-500'
            : 'text-sage'
        )}
      />
      <span>
        Slot held for{' '}
        <span className="font-semibold font-mono tracking-tight">
          {formattedTime}
        </span>
      </span>
    </div>
  );
}
