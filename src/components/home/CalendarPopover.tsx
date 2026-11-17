'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarPopoverProps {
  value: string; // YYYY-MM-DD
  onChange: (dateStr: string) => void;
  minDate: string; // YYYY-MM-DD
  id?: string;
}

export default function CalendarPopover({ value, onChange, minDate, id }: CalendarPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse initial year and month from value or fallback to current
  const parseDateParts = (str: string) => {
    if (!str) return { year: 2026, month: 10, day: 18 };
    const [y, m, d] = str.split('-').map(Number);
    return { year: y, month: m - 1, day: d };
  };

  const initial = parseDateParts(value);
  const [viewYear, setViewYear] = useState(initial.year);
  const [viewMonth, setViewMonth] = useState(initial.month); // 0-indexed

  // Dismiss on click outside or Escape
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Days in current month view
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  // Navigation handlers
  function handlePrevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  }

  function handleNextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  }

  // Format date helper: YYYY-MM-DD
  function toDateString(year: number, month: number, day: number) {
    const m = (month + 1).toString().padStart(2, '0');
    const d = day.toString().padStart(2, '0');
    return `${year}-${m}-${d}`;
  }

  // Check if date is in the past
  function isPastDate(year: number, month: number, day: number) {
    const dateStr = toDateString(year, month, day);
    return dateStr < minDate;
  }

  // Mock a couple of fully booked dates for realism
  function isFullyBooked(year: number, month: number, day: number) {
    // E.g. day 25 of this month is completely booked
    const dateStr = toDateString(year, month, day);
    const bookedDays = ['2026-11-22', '2026-11-29'];
    return bookedDays.includes(dateStr);
  }

  function handleSelectDay(day: number) {
    const selected = toDateString(viewYear, viewMonth, day);
    onChange(selected);
    setIsOpen(false);
  }

  // Format display string
  const formatDisplay = (dateStr: string) => {
    if (!dateStr) return 'Select date';
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger Button */}
      <button
        id={id}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-sand bg-warm-white text-charcoal text-sm hover:border-espresso/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-espresso focus-visible:ring-offset-1 transition-all"
      >
        <span className="flex items-center gap-2 font-medium">
          <CalendarIcon className="w-4 h-4 text-espresso shrink-0" />
          <span>{formatDisplay(value)}</span>
        </span>
        <span className="text-[11px] font-semibold text-espresso bg-sand/30 px-2 py-0.5 rounded-md uppercase tracking-wider">
          Change
        </span>
      </button>

      {/* Calendar Popover */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Choose booking date"
          className="absolute z-50 top-full left-0 mt-2 w-full sm:w-80 p-4 rounded-2xl bg-ivory border border-sand shadow-2xl animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-sand/40">
            <span className="font-serif font-bold text-espresso text-base">
              {monthNames[viewMonth]} {viewYear}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                aria-label="Previous month"
                className="p-1.5 rounded-lg hover:bg-sand/30 text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-espresso"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                aria-label="Next month"
                className="p-1.5 rounded-lg hover:bg-sand/30 text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-espresso"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-charcoal-muted mb-2">
            {daysOfWeek.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Blank leading days */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`blank-${i}`} className="h-8" />
            ))}

            {/* Day buttons */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = toDateString(viewYear, viewMonth, day);
              const isSelected = dateStr === value;
              const past = isPastDate(viewYear, viewMonth, day);
              const fullyBooked = isFullyBooked(viewYear, viewMonth, day);
              const isDisabled = past || fullyBooked;

              return (
                <button
                  key={day}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleSelectDay(day)}
                  aria-label={`${day} ${monthNames[viewMonth]} ${viewYear}${fullyBooked ? ' (Fully booked)' : ''}`}
                  className={`h-8 w-8 mx-auto rounded-full text-xs font-medium flex flex-col items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-espresso ${
                    isSelected
                      ? 'bg-espresso text-ivory font-bold shadow-sm'
                      : isDisabled
                      ? 'text-charcoal-muted/30 cursor-not-allowed line-through'
                      : 'text-charcoal hover:bg-sand/40 active:scale-90'
                  }`}
                >
                  <span>{day}</span>
                  {fullyBooked && !past && (
                    <span className="w-1 h-1 rounded-full bg-red-400 -mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Calendar Legend */}
          <div className="mt-4 pt-3 border-t border-sand/40 flex items-center justify-between text-[10px] text-charcoal-muted">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-espresso inline-block" /> Selected
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-400 inline-block" /> Booked
            </span>
            <span className="flex items-center gap-1.5 text-charcoal-muted/60">
              <span className="line-through">Past</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
