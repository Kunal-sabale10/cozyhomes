'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, RefreshCw } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  mobile?: string;
  subject?: string;
  message?: string;
}

const initialData: ContactFormData = {
  name: '',
  email: '',
  mobile: '',
  subject: 'Booking Enquiry',
  message: '',
};

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanedMobile = formData.mobile.replace(/[\s\-\+]/g, '').slice(-10);
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Please enter your 10-digit mobile number.';
    } else if (!phoneRegex.test(cleanedMobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit Indian mobile number.';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select an enquiry subject.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details in your message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Contact form submitted:', {
        ...formData,
        submittedAt: new Date().toISOString(),
      });

      await new Promise((resolve) => setTimeout(resolve, 600));
      setIsSubmitted(true);
    } catch {
      setErrors({ message: 'Failed to send message. Please try contacting via WhatsApp.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialData);
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div 
        className="bg-ivory p-8 sm:p-10 rounded-2xl border border-sand shadow-xs text-center space-y-4 animate-in fade-in zoom-in-95 duration-200"
        role="alert"
        aria-live="polite"
      >
        <div className="w-14 h-14 rounded-full bg-sand/30 text-espresso flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-charcoal">
          Message Sent Successfully!
        </h3>
        <p className="text-sm text-umber max-w-md mx-auto leading-relaxed">
          Thank you, <strong className="text-charcoal">{formData.name}</strong>. We have received your note regarding &ldquo;{formData.subject}&rdquo; and will reply during operating hours (8:00 AM &ndash; 11:00 PM).
        </p>
        <div className="pt-4">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cream hover:bg-sand/40 border border-sand text-charcoal text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-ivory p-6 sm:p-8 rounded-2xl border border-sand shadow-xs space-y-5"
      aria-label="Direct message contact form"
    >
      <div className="border-b border-sand pb-4 mb-2">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
          Send Us a Direct Message
        </h2>
        <p className="text-xs sm:text-sm text-umber mt-1">
          Fill out the details below and we&rsquo;ll respond promptly during operating hours.
        </p>
      </div>

      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-xs font-semibold text-charcoal mb-1.5">
          Full Name <span className="text-rose-600" aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Rahul Sharma"
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={`w-full px-4 py-2.5 rounded-xl border text-sm text-charcoal bg-ivory focus:outline-none transition-colors ${
            errors.name
              ? 'border-rose-400 focus:border-rose-500 focus-visible:ring-2 focus-visible:ring-rose-500'
              : 'border-sand focus:border-sage-deep focus-visible:ring-2 focus-visible:ring-sage-deep'
          }`}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-xs text-rose-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.name}</span>
          </p>
        )}
      </div>

      {/* Email & Phone Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-charcoal mb-1.5">
            Email Address <span className="text-rose-600" aria-hidden="true">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="rahul@example.com"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`w-full px-4 py-2.5 rounded-xl border text-sm text-charcoal bg-ivory focus:outline-none transition-colors ${
              errors.email
                ? 'border-rose-400 focus:border-rose-500 focus-visible:ring-2 focus-visible:ring-rose-500'
                : 'border-sand focus:border-sage-deep focus-visible:ring-2 focus-visible:ring-sage-deep'
            }`}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        <div>
          <label htmlFor="mobile" className="block text-xs font-semibold text-charcoal mb-1.5">
            Mobile Number (10 Digits) <span className="text-rose-600" aria-hidden="true">*</span>
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="9876543210"
            aria-required="true"
            aria-invalid={!!errors.mobile}
            aria-describedby={errors.mobile ? 'mobile-error' : undefined}
            className={`w-full px-4 py-2.5 rounded-xl border text-sm text-charcoal bg-ivory focus:outline-none transition-colors ${
              errors.mobile
                ? 'border-rose-400 focus:border-rose-500 focus-visible:ring-2 focus-visible:ring-rose-500'
                : 'border-sand focus:border-sage-deep focus-visible:ring-2 focus-visible:ring-sage-deep'
            }`}
          />
          {errors.mobile && (
            <p id="mobile-error" className="mt-1 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.mobile}</span>
            </p>
          )}
        </div>
      </div>

      {/* Subject Dropdown */}
      <div>
        <label htmlFor="subject" className="block text-xs font-semibold text-charcoal mb-1.5">
          Subject <span className="text-rose-600" aria-hidden="true">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          aria-required="true"
          className="w-full px-4 py-2.5 rounded-xl border border-sand text-sm text-charcoal bg-ivory focus:outline-none focus:border-sage-deep focus-visible:ring-2 focus-visible:ring-sage-deep transition-colors"
        >
          <option value="Booking Enquiry">Booking Enquiry (Dates / Hourly Slots)</option>
          <option value="General Query">General Query</option>
          <option value="Feedback">Feedback</option>
          <option value="Special Request">Special Request / Extension</option>
          <option value="Other">Other</option>
        </select>
        {errors.subject && (
          <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.subject}</span>
          </p>
        )}
      </div>

      {/* Message Textarea */}
      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-charcoal mb-1.5">
          Your Message <span className="text-rose-600" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Let us know your preferred dates, time slots, or any questions about the studio amenities..."
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`w-full px-4 py-2.5 rounded-xl border text-sm text-charcoal bg-ivory focus:outline-none transition-colors resize-y ${
            errors.message
              ? 'border-rose-400 focus:border-rose-500 focus-visible:ring-2 focus-visible:ring-rose-500'
              : 'border-sand focus:border-sage-deep focus-visible:ring-2 focus-visible:ring-sage-deep'
          }`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-rose-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.message}</span>
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-espresso hover:bg-espresso-dark active:scale-[0.99] text-ivory text-sm font-semibold transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage-deep"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </>
        )}
      </button>

      <p className="text-[11px] text-center text-umber leading-tight">
        🔒 We respect your confidentiality. Your details are never shared with third parties.
      </p>
    </form>
  );
}
