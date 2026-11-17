'use client';

import React, { useState, useMemo, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  CalendarDays,
  Clock,
  Users,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Upload,
  AlertCircle,
  FileText,
  CheckCircle2,
  X,
  Copy,
  Lock,
  Sparkles,
  AlertTriangle,
  Loader2,
  Check,
} from 'lucide-react';

import { CONFIG, type IdType } from '@/lib/config';
import {
  formatCurrency,
  formatTime,
  formatDate,
  calculatePrice,
  getAvailableStartTimes,
  getMaxDuration,
  getTodayIST,
  generateReference,
  getIdTypeLabel,
  addMinutes,
  cn,
} from '@/lib/utils';

import ProgressBar from '@/components/booking/ProgressBar';
import HoldTimer from '@/components/booking/HoldTimer';
import PricePreview from '@/components/booking/PricePreview';

// --- Form Validation Types ---
interface GuestFormErrors {
  fullName?: string;
  mobile?: string;
  email?: string;
  attestedAge18?: string;
}

interface IdUploadErrors {
  idNumber?: string;
  file?: string;
}

function BookingFlowContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldReduceMotion = useReducedMotion();

  // Read initial values from URL search params
  const [today, setToday] = useState<string>('2026-11-18');
  const initialParamDate = searchParams.get('date');
  const initialTime = searchParams.get('startTime') || '10:00';
  const initialDuration = Math.min(
    Math.max(Number(searchParams.get('duration')) || 2, CONFIG.MIN_HOURS),
    CONFIG.MAX_HOURS
  );
  const initialGuests = Math.min(
    Math.max(Number(searchParams.get('guests')) || 1, 1),
    CONFIG.MAX_GUESTS
  );

  // Step state: 1 to 5
  const [step, setStep] = useState<number>(1);
  const [prevStep, setPrevStep] = useState<number>(1);

  // Slot selection state (Step 1)
  const [date, setDate] = useState<string>(initialParamDate || '2026-11-18');

  useEffect(() => {
    const currentToday = getTodayIST();
    setToday(currentToday);
    if (!initialParamDate) {
      setDate(currentToday);
    }
  }, [initialParamDate]);

  const [startTime, setStartTime] = useState<string>(initialTime);
  const [duration, setDuration] = useState<number>(initialDuration);
  const [guests, setGuests] = useState<number>(initialGuests);

  // Guest details state (Step 2)
  const [fullName, setFullName] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [attestedAge18, setAttestedAge18] = useState<boolean>(false);
  const [guestErrors, setGuestErrors] = useState<GuestFormErrors>({});

  // ID Upload state (Step 3)
  const [idType, setIdType] = useState<IdType>('aadhaar');
  const [idNumber, setIdNumber] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [idErrors, setIdErrors] = useState<IdUploadErrors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Payment & Confirmation state (Step 4 & 5)
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [bookingReference, setBookingReference] = useState<string>('');
  const [copiedRef, setCopiedRef] = useState<boolean>(false);

  // Hold Timer state
  const [holdTimerActive, setHoldTimerActive] = useState<boolean>(false);
  const [holdExpired, setHoldExpired] = useState<boolean>(false);
  const [timerSessionKey, setTimerSessionKey] = useState<number>(0);

  // Calculation helpers
  const availableTimes = useMemo(() => getAvailableStartTimes(), []);
  const maxDuration = useMemo(() => getMaxDuration(startTime), [startTime]);
  const endTime = useMemo(() => addMinutes(startTime, duration * 60), [startTime, duration]);
  const price = useMemo(
    () => calculatePrice(duration, CONFIG.RATE_PER_HOUR_INR, CONFIG.TAX_PERCENT),
    [duration]
  );

  // Adjust duration if start time changes to avoid exceeding operating hours
  useEffect(() => {
    if (duration > maxDuration) {
      setDuration(Math.max(CONFIG.MIN_HOURS, maxDuration));
    }
  }, [maxDuration, duration]);

  // Navigate between steps with directional animation tracking
  const goToStep = (newStep: number) => {
    setPrevStep(step);
    setStep(newStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 1: Hold Slot & proceed
  const handleHoldSlot = () => {
    setHoldTimerActive(true);
    setHoldExpired(false);
    goToStep(2);
  };

  // Step 2: Validate guest details
  const validateGuestDetails = (): boolean => {
    const errors: GuestFormErrors = {};
    if (!fullName.trim()) {
      errors.fullName = 'Please enter your full legal name';
    } else if (fullName.trim().length < 3) {
      errors.fullName = 'Full name must be at least 3 characters';
    }

    const cleanMobile = mobile.replace(/[^0-9]/g, '');
    if (!cleanMobile) {
      errors.mobile = 'Mobile number is required for booking confirmation';
    } else if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      errors.mobile = 'Please enter a valid 10-digit Indian mobile number';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = 'Email address is required for check-in access code';
    } else if (!emailPattern.test(email.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    if (!attestedAge18) {
      errors.attestedAge18 = 'You must confirm that you are 18 years or older to proceed';
    }

    setGuestErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinueToId = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateGuestDetails()) {
      goToStep(3);
    }
  };

  // Step 3: Handle File Drop & Selection
  const handleFileChange = (file: File | undefined) => {
    if (!file) return;

    // Check size (5MB)
    const maxBytes = CONFIG.MAX_FILE_SIZE_MB * 1024 * 1024;
    if (file.size > maxBytes) {
      setIdErrors((prev) => ({
        ...prev,
        file: `File size exceeds ${CONFIG.MAX_FILE_SIZE_MB}MB. Please choose a smaller file.`,
      }));
      return;
    }

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setIdErrors((prev) => ({
        ...prev,
        file: 'Only JPG, PNG, or PDF documents are accepted.',
      }));
      return;
    }

    setSelectedFile(file);
    setIdErrors((prev) => ({ ...prev, file: undefined }));
  };

  const validateIdStep = (): boolean => {
    const errors: IdUploadErrors = {};

    if (idType !== 'aadhaar' && !idNumber.trim()) {
      errors.idNumber = `Please enter your ${getIdTypeLabel(idType)} number`;
    }

    if (!selectedFile) {
      errors.file = 'Please upload a photo or scan of your government ID';
    }

    setIdErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateIdStep()) {
      goToStep(4);
    }
  };

  // Step 4: Process Mock Payment
  const handleProcessPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      const ref = generateReference();
      setBookingReference(ref);
      setIsProcessingPayment(false);
      setHoldTimerActive(false);
      goToStep(5);
    }, 2000);
  };

  // Hold expiration handler
  const handleTimerExpire = () => {
    if (step >= 2 && step <= 4) {
      setHoldExpired(true);
    }
  };

  const handleStartOver = () => {
    setHoldExpired(false);
    setHoldTimerActive(false);
    setTimerSessionKey((prev) => prev + 1);
    setSelectedFile(null);
    setIdNumber('');
    goToStep(1);
  };

  const handleCopyReference = () => {
    if (bookingReference) {
      navigator.clipboard.writeText(bookingReference);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2500);
    }
  };

  // Slide animation variants
  const slideVariants = {
    initial: (direction: number) => ({
      x: shouldReduceMotion ? 0 : direction > 0 ? 40 : -40,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
    },
    exit: (direction: number) => ({
      x: shouldReduceMotion ? 0 : direction > 0 ? -40 : 40,
      opacity: 0,
      transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  const slideDirection = step >= prevStep ? 1 : -1;

  return (
    <div className="min-h-screen bg-warm-white py-8 md:py-14 text-charcoal">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Booking Flow Header */}
        <div className="mb-8 text-center">
          <span className="text-xs uppercase tracking-widest font-semibold text-sage-dark bg-sage/10 px-3 py-1 rounded-full">
            Private Studio Reservation
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mt-3">
            {step === 5 ? 'Booking Confirmed' : 'Book Your Cozy Retreat'}
          </h1>
          <p className="text-charcoal-light text-sm sm:text-base mt-2 max-w-lg mx-auto">
            {step === 5
              ? 'Thank you for choosing CozyMoments. Your private stay is locked in.'
              : 'Discreet, seamless, and completely private hourly studio in Kalwa, Thane.'}
          </p>
        </div>

        {/* Multi-step Progress Bar */}
        <div className="mb-10">
          <ProgressBar currentStep={step} />
        </div>

        {/* Hold Timer banner for steps 2 to 4 */}
        {holdTimerActive && step >= 2 && step <= 4 && (
          <div className="mb-8 flex items-center justify-between bg-cream border border-beige p-3.5 sm:p-4 rounded-2xl shadow-xs">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-sage animate-ping" />
              <span className="text-xs sm:text-sm font-medium text-charcoal">
                Slot held exclusively for you
              </span>
            </div>
            <HoldTimer
              key={timerSessionKey}
              startMinutes={CONFIG.HOLD_DURATION_MINUTES}
              onExpire={handleTimerExpire}
            />
          </div>
        )}

        {/* Main Step Content Area */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={slideDirection}>
            {/* STEP 1: Slot Selection */}
            {step === 1 && (
              <motion.div
                key="step-1"
                custom={slideDirection}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left: Slot Config Form */}
                <div className="lg:col-span-7 bg-cream rounded-3xl border border-beige/80 p-6 sm:p-8 shadow-sm">
                  <div className="mb-6">
                    <h2 className="font-serif text-2xl font-bold text-charcoal">
                      Select Date & Time
                    </h2>
                    <p className="text-sm text-charcoal-light mt-1">
                      Choose when you would like to begin your private reservation.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Date Picker */}
                    <div>
                      <label
                        htmlFor="slot-date"
                        className="flex items-center gap-2 text-sm font-semibold text-charcoal mb-2"
                      >
                        <CalendarDays className="w-4 h-4 text-sage" />
                        Reservation Date
                      </label>
                      <input
                        type="date"
                        id="slot-date"
                        value={date}
                        min={today}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-charcoal/15 bg-warm-white text-charcoal focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none text-base font-medium transition-all"
                      />
                      <p className="text-xs text-warm-gray mt-1.5">
                        Selected date: {formatDate(date)}
                      </p>
                    </div>

                    {/* Start Time Selector */}
                    <div>
                      <label className="flex items-center justify-between text-sm font-semibold text-charcoal mb-2">
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-sage" />
                          Start Time
                        </span>
                        <span className="text-xs font-normal text-charcoal-light">
                          Operating hours: {formatTime(CONFIG.OPERATING_START)} – {formatTime(CONFIG.OPERATING_END)}
                        </span>
                      </label>

                      {/* Time Pills Grid */}
                      <div
                        role="radiogroup"
                        aria-label="Available Start Times"
                        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-56 overflow-y-auto p-1 border border-charcoal/10 rounded-2xl bg-warm-white/70"
                      >
                        {availableTimes.map((time) => {
                          const isSelected = startTime === time;
                          return (
                            <button
                              key={time}
                              type="button"
                              role="radio"
                              aria-checked={isSelected}
                              onClick={() => setStartTime(time)}
                              className={cn(
                                'py-2 px-2.5 rounded-xl text-xs font-medium text-center transition-all',
                                isSelected
                                  ? 'bg-sage text-warm-white font-semibold shadow-sm ring-2 ring-sage/30 scale-[1.02]'
                                  : 'bg-warm-white hover:bg-beige text-charcoal border border-charcoal/10 hover:border-sage/40'
                              )}
                            >
                              {formatTime(time)}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Duration Selection */}
                    <div>
                      <label className="flex items-center justify-between text-sm font-semibold text-charcoal mb-2">
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-sage" />
                          Duration (Hours)
                        </span>
                        <span className="text-xs text-warm-gray">
                          Max available: {maxDuration} hrs today
                        </span>
                      </label>

                      <div className="flex items-center gap-4 bg-warm-white p-3 rounded-2xl border border-charcoal/15">
                        <button
                          type="button"
                          onClick={() => setDuration((prev) => Math.max(CONFIG.MIN_HOURS, prev - 1))}
                          disabled={duration <= CONFIG.MIN_HOURS}
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-beige/60 hover:bg-beige text-charcoal font-bold text-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                          aria-label="Decrease duration"
                        >
                          -
                        </button>

                        <div className="flex-1 text-center">
                          <span className="text-xl font-bold font-serif text-charcoal">
                            {duration} {duration === 1 ? 'Hour' : 'Hours'}
                          </span>
                          <p className="text-xs text-warm-gray">
                            {formatTime(startTime)} to {formatTime(endTime)}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setDuration((prev) => Math.min(maxDuration, prev + 1))}
                          disabled={duration >= maxDuration}
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-beige/60 hover:bg-beige text-charcoal font-bold text-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                          aria-label="Increase duration"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Guests Count Selector */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-charcoal mb-2">
                        <Users className="w-4 h-4 text-sage" />
                        Number of Guests
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[1, 2].map((count) => {
                          const isSelected = guests === count;
                          return (
                            <button
                              key={count}
                              type="button"
                              onClick={() => setGuests(count)}
                              className={cn(
                                'py-3 px-4 rounded-xl text-sm font-medium border flex items-center justify-center gap-2 transition-all',
                                isSelected
                                  ? 'bg-sage text-warm-white border-sage shadow-xs'
                                  : 'bg-warm-white text-charcoal border-charcoal/15 hover:bg-beige'
                              )}
                            >
                              <Users className="w-4 h-4" />
                              <span>
                                {count} {count === 1 ? 'Guest (Solo)' : 'Guests (Couple)'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-xs text-warm-gray mt-1.5">
                        CozyMoments is designed exclusively for up to 2 guests to maintain ultimate quiet & privacy.
                      </p>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4 border-t border-charcoal/10">
                      <button
                        type="button"
                        onClick={handleHoldSlot}
                        className="w-full py-4 px-6 rounded-full bg-sage hover:bg-sage-dark active:scale-[0.99] text-warm-white font-semibold text-base transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                      >
                        <span>Hold This Slot</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <p className="text-center text-xs text-charcoal-muted mt-2.5 flex items-center justify-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-sage" />
                        Your slot will be held for 10 minutes while you complete the booking
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Sticky Price Preview */}
                <div className="lg:col-span-5">
                  <PricePreview
                    duration={duration}
                    date={date}
                    startTime={startTime}
                    guests={guests}
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 2: Guest Details */}
            {step === 2 && (
              <motion.div
                key="step-2"
                custom={slideDirection}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                <div className="lg:col-span-7 bg-cream rounded-3xl border border-beige/80 p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-charcoal/10 mb-6">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-charcoal">
                        Guest Information
                      </h2>
                      <p className="text-sm text-charcoal-light mt-1">
                        Please provide your contact details for entry PIN and receipt.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => goToStep(1)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-light hover:text-charcoal px-3 py-1.5 rounded-full border border-charcoal/15 bg-warm-white"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back
                    </button>
                  </div>

                  <form onSubmit={handleContinueToId} noValidate className="space-y-5">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="full-name" className="block text-sm font-semibold text-charcoal mb-1.5">
                        Full Name (as per Govt ID) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="full-name"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (guestErrors.fullName) setGuestErrors((p) => ({ ...p, fullName: undefined }));
                        }}
                        placeholder="e.g. Rahul Sharma"
                        className={cn(
                          'w-full px-4 py-3 rounded-xl border bg-warm-white text-charcoal outline-none transition-all',
                          guestErrors.fullName
                            ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                            : 'border-charcoal/15 focus:border-sage focus:ring-2 focus:ring-sage/20'
                        )}
                      />
                      {guestErrors.fullName && (
                        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {guestErrors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Mobile & Email Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Mobile */}
                      <div>
                        <label htmlFor="mobile" className="block text-sm font-semibold text-charcoal mb-1.5">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-charcoal-light font-medium select-none">
                            +91
                          </span>
                          <input
                            type="tel"
                            id="mobile"
                            maxLength={10}
                            value={mobile}
                            onChange={(e) => {
                              const val = e.target.value.replace(/[^0-9]/g, '');
                              setMobile(val);
                              if (guestErrors.mobile) setGuestErrors((p) => ({ ...p, mobile: undefined }));
                            }}
                            placeholder="9876543210"
                            className={cn(
                              'w-full pl-12 pr-4 py-3 rounded-xl border bg-warm-white text-charcoal outline-none transition-all',
                              guestErrors.mobile
                                ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                                : 'border-charcoal/15 focus:border-sage focus:ring-2 focus:ring-sage/20'
                            )}
                          />
                        </div>
                        {guestErrors.mobile ? (
                          <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {guestErrors.mobile}
                          </p>
                        ) : (
                          <p className="text-[11px] text-warm-gray mt-1">
                            Passcode & entry PIN sent here
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-charcoal mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (guestErrors.email) setGuestErrors((p) => ({ ...p, email: undefined }));
                          }}
                          placeholder="rahul@example.com"
                          className={cn(
                            'w-full px-4 py-3 rounded-xl border bg-warm-white text-charcoal outline-none transition-all',
                            guestErrors.email
                              ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                              : 'border-charcoal/15 focus:border-sage focus:ring-2 focus:ring-sage/20'
                          )}
                        />
                        {guestErrors.email ? (
                          <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {guestErrors.email}
                          </p>
                        ) : (
                          <p className="text-[11px] text-warm-gray mt-1">
                            Booking invoice & confirmation
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Number of Guests review/adjust */}
                    <div>
                      <label htmlFor="guest-count-select" className="block text-sm font-semibold text-charcoal mb-1.5">
                        Number of Guests
                      </label>
                      <select
                        id="guest-count-select"
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-charcoal/15 bg-warm-white text-charcoal focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all"
                      >
                        <option value={1}>1 Guest (Solo stay)</option>
                        <option value={2}>2 Guests (Max occupancy)</option>
                      </select>
                    </div>

                    {/* Special Requests */}
                    <div>
                      <label htmlFor="special-requests" className="block text-sm font-semibold text-charcoal mb-1.5">
                        Special Requests <span className="text-xs font-normal text-warm-gray">(Optional)</span>
                      </label>
                      <textarea
                        id="special-requests"
                        rows={3}
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Any specific preference (e.g., extra towel, quiet check-in, AC preset temperature)?"
                        className="w-full px-4 py-3 rounded-xl border border-charcoal/15 bg-warm-white text-charcoal focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none resize-none transition-all text-sm"
                      />
                    </div>

                    {/* Age Attestation Checkbox */}
                    <div className="pt-2">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={attestedAge18}
                          onChange={(e) => {
                            setAttestedAge18(e.target.checked);
                            if (guestErrors.attestedAge18) {
                              setGuestErrors((p) => ({ ...p, attestedAge18: undefined }));
                            }
                          }}
                          className="mt-1 w-4 h-4 rounded text-sage border-charcoal/30 focus:ring-sage accent-sage cursor-pointer"
                        />
                        <span className="text-xs sm:text-sm text-charcoal leading-snug">
                          I confirm that I am 18 years of age or older and agree that guests under 18 are not permitted without parent/legal guardian supervision.{' '}
                          <span className="text-red-500">*</span>
                        </span>
                      </label>
                      {guestErrors.attestedAge18 && (
                        <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 ml-7">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          {guestErrors.attestedAge18}
                        </p>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="pt-4 border-t border-charcoal/10 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="button"
                        onClick={() => goToStep(1)}
                        className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-charcoal/20 text-charcoal font-medium text-sm hover:bg-beige transition-colors order-2 sm:order-1 cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-sage hover:bg-sage-dark text-warm-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 order-1 sm:order-2 cursor-pointer"
                      >
                        <span>Continue to ID Upload</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>

                {/* Right: Sticky Price Preview */}
                <div className="lg:col-span-5">
                  <PricePreview
                    duration={duration}
                    date={date}
                    startTime={startTime}
                    guests={guests}
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 3: ID Upload */}
            {step === 3 && (
              <motion.div
                key="step-3"
                custom={slideDirection}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                <div className="lg:col-span-7 bg-cream rounded-3xl border border-beige/80 p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-charcoal/10 mb-6">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-charcoal">
                        Government ID Verification
                      </h2>
                      <p className="text-sm text-charcoal-light mt-1">
                        Mandatory verification for guest safety and local hospitality compliance.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => goToStep(2)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-light hover:text-charcoal px-3 py-1.5 rounded-full border border-charcoal/15 bg-warm-white"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back
                    </button>
                  </div>

                  <form onSubmit={handleContinueToPayment} noValidate className="space-y-6">
                    {/* ID Type Dropdown */}
                    <div>
                      <label htmlFor="id-type-select" className="block text-sm font-semibold text-charcoal mb-1.5">
                        Select Government ID Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="id-type-select"
                        value={idType}
                        onChange={(e) => {
                          setIdType(e.target.value as IdType);
                          setIdNumber('');
                          setIdErrors((prev) => ({ ...prev, idNumber: undefined }));
                        }}
                        className="w-full px-4 py-3 rounded-xl border border-charcoal/15 bg-warm-white text-charcoal focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all text-sm font-medium"
                      >
                        <option value="aadhaar">Aadhaar Card (Photo ID verification)</option>
                        <option value="passport">Passport</option>
                        <option value="driving_licence">Driving Licence</option>
                        <option value="voter_id">Voter ID</option>
                      </select>
                    </div>

                    {/* Aadhaar Info Box OR ID Number Input */}
                    {idType === 'aadhaar' ? (
                      <div className="bg-sage-lightest rounded-2xl border border-sage/30 p-4 text-xs sm:text-sm text-charcoal-light flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-sage shrink-0 mt-0.5" />
                        <div className="leading-relaxed">
                          <strong className="text-charcoal block font-semibold mb-0.5">
                            UIDAI Privacy Protection
                          </strong>
                          As per UIDAI guidelines, we do not collect or store your Aadhaar number.
                          Please upload a clear photo of your Aadhaar card for visual identity verification only.
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label htmlFor="id-number" className="block text-sm font-semibold text-charcoal mb-1.5">
                          {getIdTypeLabel(idType)} Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="id-number"
                          value={idNumber}
                          onChange={(e) => {
                            setIdNumber(e.target.value);
                            if (idErrors.idNumber) setIdErrors((p) => ({ ...p, idNumber: undefined }));
                          }}
                          placeholder={`Enter your ${getIdTypeLabel(idType)} number`}
                          className={cn(
                            'w-full px-4 py-3 rounded-xl border bg-warm-white text-charcoal outline-none transition-all uppercase',
                            idErrors.idNumber
                              ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                              : 'border-charcoal/15 focus:border-sage focus:ring-2 focus:ring-sage/20'
                          )}
                        />
                        {idErrors.idNumber && (
                          <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {idErrors.idNumber}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Drag and Drop File Upload Area */}
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-1.5">
                        Upload ID Document <span className="text-red-500">*</span>
                      </label>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleFileChange(e.target.files?.[0])}
                        className="hidden"
                        id="id-file-input"
                      />

                      {!selectedFile ? (
                        <div
                          onDragOver={(e) => {
                            e.preventDefault();
                            setIsDragging(true);
                          }}
                          onDragLeave={() => setIsDragging(false)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setIsDragging(false);
                            handleFileChange(e.dataTransfer.files?.[0]);
                          }}
                          onClick={() => fileInputRef.current?.click()}
                          className={cn(
                            'border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all bg-warm-white/70',
                            isDragging
                              ? 'border-sage bg-sage/5 scale-[1.01]'
                              : 'border-charcoal/20 hover:border-sage hover:bg-beige/30',
                            idErrors.file && 'border-red-400 bg-red-50/20'
                          )}
                        >
                          <div className="w-12 h-12 rounded-full bg-sage/15 text-sage-dark mx-auto flex items-center justify-center mb-3">
                            <Upload className="w-5 h-5" />
                          </div>
                          <p className="text-sm font-semibold text-charcoal">
                            Drag and drop your ID document here, or{' '}
                            <span className="text-sage font-bold underline">browse files</span>
                          </p>
                          <p className="text-xs text-charcoal-muted mt-1.5">
                            Supports JPG, PNG, PDF up to {CONFIG.MAX_FILE_SIZE_MB}MB
                          </p>
                          <p className="text-[11px] text-warm-gray mt-2 italic">
                            Upload a clear, well-lit photo of your ID document. The name on your ID must match the name you provided above.
                          </p>
                        </div>
                      ) : (
                        <div className="bg-warm-white border border-beige/90 rounded-2xl p-4 flex items-center justify-between shadow-xs">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="p-2.5 rounded-xl bg-sage/15 text-sage-dark shrink-0">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div className="overflow-hidden">
                              <p className="text-sm font-semibold text-charcoal truncate">
                                {selectedFile.name}
                              </p>
                              <p className="text-xs text-warm-gray">
                                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for verification
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="text-xs text-sage hover:text-sage-dark font-medium underline px-2 py-1"
                            >
                              Change
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedFile(null)}
                              className="p-1 rounded-full text-warm-gray hover:text-red-500 hover:bg-red-50 transition-colors"
                              aria-label="Remove uploaded file"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}

                      {idErrors.file && (
                        <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          {idErrors.file}
                        </p>
                      )}
                    </div>

                    {/* Privacy Reassurance */}
                    <div className="rounded-xl bg-warm-white p-3.5 border border-beige flex items-center gap-2 text-xs text-charcoal-muted">
                      <Lock className="w-4 h-4 text-sage shrink-0" />
                      <span>
                        All IDs are encrypted in transit and purged automatically after {CONFIG.ID_RETENTION_DAYS} days.
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-4 border-t border-charcoal/10 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="button"
                        onClick={() => goToStep(2)}
                        className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-charcoal/20 text-charcoal font-medium text-sm hover:bg-beige transition-colors order-2 sm:order-1 cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-sage hover:bg-sage-dark text-warm-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 order-1 sm:order-2 cursor-pointer"
                      >
                        <span>Continue to Payment</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>

                {/* Right: Sticky Price Preview */}
                <div className="lg:col-span-5">
                  <PricePreview
                    duration={duration}
                    date={date}
                    startTime={startTime}
                    guests={guests}
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 4: Payment (Test Mode) */}
            {step === 4 && (
              <motion.div
                key="step-4"
                custom={slideDirection}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                <div className="lg:col-span-7 bg-cream rounded-3xl border border-beige/80 p-6 sm:p-8 shadow-sm">
                  {/* Test Mode Banner */}
                  <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold">
                        ⚠️ TEST MODE — No real payment will be processed
                      </p>
                      <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                        This booking flow is in sandbox preview. Clicking the payment button will instantly simulate payment confirmation and generate your booking reference.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b border-charcoal/10 mb-6">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-charcoal">
                        Review & Confirm
                      </h2>
                      <p className="text-sm text-charcoal-light mt-1">
                        Please review your reservation details before completing your order.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => goToStep(3)}
                      disabled={isProcessingPayment}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-light hover:text-charcoal px-3 py-1.5 rounded-full border border-charcoal/15 bg-warm-white disabled:opacity-40"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back
                    </button>
                  </div>

                  {/* Summary of booking details */}
                  <div className="space-y-4 mb-6">
                    <div className="bg-warm-white rounded-2xl p-4 sm:p-5 border border-beige/80 space-y-3">
                      <div className="flex justify-between items-center text-sm border-b border-charcoal/10 pb-2.5">
                        <span className="text-charcoal-light">Reservation Date</span>
                        <span className="font-semibold text-charcoal">{formatDate(date)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-b border-charcoal/10 pb-2.5">
                        <span className="text-charcoal-light">Reserved Time Slot</span>
                        <span className="font-semibold text-charcoal">
                          {formatTime(startTime)} – {formatTime(endTime)} ({duration} hrs)
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-b border-charcoal/10 pb-2.5">
                        <span className="text-charcoal-light">Guest Name</span>
                        <span className="font-semibold text-charcoal">{fullName}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-b border-charcoal/10 pb-2.5">
                        <span className="text-charcoal-light">Mobile & Email</span>
                        <span className="font-semibold text-charcoal">
                          +91 {mobile} • {email}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-b border-charcoal/10 pb-2.5">
                        <span className="text-charcoal-light">Verified ID Type</span>
                        <span className="font-semibold text-charcoal">
                          {getIdTypeLabel(idType)} {selectedFile ? `(${selectedFile.name})` : ''}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-charcoal-light">Number of Guests</span>
                        <span className="font-semibold text-charcoal">
                          {guests} {guests === 1 ? 'Guest' : 'Guests'}
                        </span>
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="bg-warm-white rounded-2xl p-4 sm:p-5 border border-beige/80 space-y-2 text-sm">
                      <div className="flex justify-between text-charcoal-light">
                        <span>Hourly Studio Fee ({duration} hrs × {formatCurrency(price.ratePerHour)})</span>
                        <span className="text-charcoal font-medium">{formatCurrency(price.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-charcoal-light">
                        <span>Taxes & GST ({price.taxPercent}%)</span>
                        <span className="text-charcoal font-medium">{formatCurrency(price.taxAmount)}</span>
                      </div>
                      <div className="flex justify-between text-charcoal-light">
                        <span>Cleanliness & Sanitization Fee</span>
                        <span className="text-sage-dark font-medium">Included</span>
                      </div>
                      <div className="pt-3 border-t border-charcoal/10 flex justify-between items-baseline">
                        <span className="font-semibold text-base text-charcoal">Total Amount Due</span>
                        <span className="text-2xl font-serif font-bold text-sage-dark">
                          {formatCurrency(price.total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Button & CTA */}
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={handleProcessPayment}
                      disabled={isProcessingPayment}
                      className="w-full py-4 px-6 rounded-full bg-sage hover:bg-sage-dark disabled:bg-sage/70 text-warm-white font-semibold text-base transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isProcessingPayment ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Processing Test Payment...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Pay {formatCurrency(price.total)} (Test Mode)</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-xs text-charcoal-muted">
                      <ShieldCheck className="w-4 h-4 text-sage" />
                      <span>End-to-end encrypted • Instant booking verification</span>
                    </div>
                  </div>
                </div>

                {/* Right: Sticky Price Preview */}
                <div className="lg:col-span-5">
                  <PricePreview
                    duration={duration}
                    date={date}
                    startTime={startTime}
                    guests={guests}
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 5: Confirmation */}
            {step === 5 && (
              <motion.div
                key="step-5"
                variants={{
                  initial: { opacity: 0, scale: 0.95 },
                  animate: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
                }}
                initial="initial"
                animate="animate"
                className="max-w-2xl mx-auto bg-cream rounded-3xl border border-beige/80 p-6 sm:p-10 shadow-lg text-center"
              >
                {/* Animated checkmark icon */}
                <motion.div
                  initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                    delay: 0.1,
                  }}
                  className="w-20 h-20 rounded-full bg-sage text-warm-white mx-auto flex items-center justify-center shadow-md mb-6"
                >
                  <Check className="w-10 h-10 stroke-[3]" />
                </motion.div>

                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-2">
                  Booking Confirmed!
                </h2>
                <p className="text-charcoal-light text-base max-w-md mx-auto mb-6">
                  Your private studio reservation has been successfully placed. You will receive a confirmation shortly.
                </p>

                {/* Reference Number Box */}
                <div className="bg-warm-white rounded-2xl border border-beige/90 p-4 sm:p-5 max-w-md mx-auto mb-8 shadow-xs flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-xs uppercase tracking-wider font-semibold text-charcoal-light">
                      Booking Reference
                    </span>
                    <p className="font-mono text-xl sm:text-2xl font-bold text-charcoal tracking-wider mt-0.5">
                      {bookingReference}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyReference}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-beige/60 hover:bg-beige text-charcoal transition-colors cursor-pointer"
                    aria-label="Copy booking reference"
                  >
                    {copiedRef ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-sage" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Summary Table */}
                <div className="bg-warm-white rounded-2xl border border-beige/90 p-5 max-w-md mx-auto mb-8 text-left text-sm space-y-3">
                  <div className="flex justify-between items-center border-b border-charcoal/10 pb-2">
                    <span className="text-charcoal-light">Date</span>
                    <span className="font-semibold text-charcoal">{formatDate(date)}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-charcoal/10 pb-2">
                    <span className="text-charcoal-light">Time Window</span>
                    <span className="font-semibold text-charcoal">
                      {formatTime(startTime)} – {formatTime(endTime)} ({duration} hrs)
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-charcoal/10 pb-2">
                    <span className="text-charcoal-light">Guests</span>
                    <span className="font-semibold text-charcoal">
                      {guests} {guests === 1 ? 'Guest' : 'Guests'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-charcoal/10 pb-2">
                    <span className="text-charcoal-light">Primary Guest</span>
                    <span className="font-semibold text-charcoal">{fullName}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 font-semibold">
                    <span className="text-charcoal">Total Amount Paid</span>
                    <span className="text-sage-dark text-lg font-bold">
                      {formatCurrency(price.total)}
                    </span>
                  </div>
                </div>

                {/* Check-in note */}
                <p className="text-xs text-warm-gray mb-8 max-w-md mx-auto">
                  Keyless door code and exact tower details will be sent to <strong>+91 {mobile}</strong> 1 hour before check-in.
                </p>

                {/* Two Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                  <Link
                    href={`/booking/${bookingReference}`}
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-sage hover:bg-sage-dark text-warm-white font-semibold text-sm transition-all shadow-md text-center"
                  >
                    View Booking Status
                  </Link>

                  <button
                    type="button"
                    onClick={handleStartOver}
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-full border border-charcoal/20 text-charcoal font-semibold text-sm hover:bg-beige transition-colors text-center cursor-pointer"
                  >
                    Book Another
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Hold Expired Modal Overlay */}
      {holdExpired && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/60 backdrop-blur-sm p-4"
        >
          <div className="bg-cream rounded-3xl border border-beige max-w-md w-full p-6 sm:p-8 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center mb-4">
              <Clock className="w-7 h-7" />
            </div>

            <h3 id="modal-title" className="font-serif text-2xl font-bold text-charcoal mb-2">
              Your Hold Has Expired
            </h3>

            <p className="text-sm text-charcoal-light leading-relaxed mb-6">
              To ensure fair availability for all guests, slots are held for 10 minutes.
              Your hold has timed out. Please start over to secure your time slot.
            </p>

            <button
              type="button"
              onClick={handleStartOver}
              className="w-full py-3.5 px-6 rounded-full bg-sage hover:bg-sage-dark text-warm-white font-semibold text-sm transition-all shadow-md cursor-pointer"
            >
              Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-warm-white flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-sage mx-auto mb-2" />
            <p className="text-sm text-charcoal-light font-medium">Loading booking flow...</p>
          </div>
        </div>
      }
    >
      <BookingFlowContent />
    </Suspense>
  );
}
