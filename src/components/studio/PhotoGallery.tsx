'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Sparkles } from 'lucide-react';

export interface StudioPhoto {
  id: number;
  title: string;
  category: string;
  caption: string;
  alt: string;
  src: string;
}

export const STUDIO_PHOTOS: StudioPhoto[] = [
  {
    id: 1,
    title: 'Main living and rest sanctuary',
    category: 'Studio suite',
    caption: 'Spacious studio lounge with plush neutral seating, natural ambient lighting, and warm wood flooring.',
    alt: 'Studio living and rest space with neutral fabric sofa, coffee table, and architectural coffered ceiling',
    src: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=85',
  },
  {
    id: 2,
    title: 'Private bed nook',
    category: 'Rest area',
    caption: 'Quiet sleeping area with clean linens, hypoallergenic pillows, and warm bedside reading illumination.',
    alt: 'Comfortable studio bed nook dressed with neutral bedspread, pillows, and soft bedside reading lamp',
    src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    title: 'Dedicated work and focus desk',
    category: 'Workstation',
    caption: 'Ergonomic wooden workstation with dedicated task lighting, multi-pin power adapters, and Wi-Fi.',
    alt: 'Dedicated studio workstation featuring wooden desk, task lighting, and laptop workspace setup',
    src: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    title: 'Refreshment counter',
    category: 'Kitchenette',
    caption: 'Beverage station with electric kettle, assorted teas, coffee essentials, and clean glassware.',
    alt: 'Studio beverage counter with electric kettle, glassware, and tea coffee station on clean countertop',
    src: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 5,
    title: 'Private en-suite bathroom',
    category: 'En-suite',
    caption: 'Private tiled bathroom with hot shower, vanity basin, and fresh laundered towels.',
    alt: 'Clean private en-suite bathroom with tiled walls, modern wash basin, and hot water shower fixture',
    src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
  },
];

interface PhotoGalleryProps {
  photos?: StudioPhoto[];
}

export default function PhotoGallery({ photos = STUDIO_PHOTOS }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // If none are ready, hide the section
  if (!photos || photos.length === 0) {
    return null;
  }

  const isBento = photos.length >= 4;
  const currentPhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));
  }, [photos.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
  }, [photos.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    if (selectedIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedIndex, handleClose, handlePrev, handleNext]);

  return (
    <section aria-labelledby="gallery-heading" className="w-full">
      {/* Gallery Section Header — sentence case and standardized pill style */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand/30 border border-sand text-espresso text-xs font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5 text-sage" />
          <span>Studio gallery</span>
        </div>
        <h2 id="gallery-heading" className="font-serif text-2xl sm:text-3xl font-bold text-charcoal leading-snug">
          Visual walkthrough
        </h2>
        <p className="text-sm text-umber mt-1.5 max-w-xl leading-relaxed">
          Explore our private Kalwa sanctuary, designed for calm work, restful pauses, and complete discretion.
        </p>
      </div>

      {/* Grid Rendering */}
      {isBento ? (
        /* Bento Grid (4 to 6 photos) */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">
          {photos.map((photo, index) => {
            // Bento sizing classes
            let spanClass = 'lg:col-span-6 aspect-[16/10]';
            if (index === 0) {
              spanClass = 'sm:col-span-2 lg:col-span-8 lg:row-span-2 aspect-[16/10] sm:aspect-auto min-h-[300px] lg:min-h-[460px]';
            } else if (index === 1 || index === 2) {
              spanClass = 'lg:col-span-4 aspect-[4/3] min-h-[220px]';
            } else {
              spanClass = 'lg:col-span-6 aspect-[16/9] min-h-[220px]';
            }

            return (
              <button
                key={photo.id}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`group relative overflow-hidden rounded-2xl border border-sand bg-espresso text-left transition-all duration-300 hover:shadow-xl hover:border-sage-deep cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage-deep ${spanClass}`}
                aria-label={`View larger photograph: ${photo.title}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={
                    index === 0
                      ? '(min-width: 1024px) 66vw, 100vw'
                      : '(min-width: 1024px) 33vw, 50vw'
                  }
                  className="object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Top zoom indicator */}
                <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-ivory/90 backdrop-blur-xs text-charcoal flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm">
                  <ZoomIn className="w-4 h-4 text-charcoal" />
                </div>

                {/* Bottom caption overlay */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-ivory">
                  <span className="text-[11px] font-medium text-sand-light block mb-0.5">
                    {photo.category}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-ivory drop-shadow-xs">
                    {photo.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        /* Fallback 2-Column Grid (Fewer than 4 photos) */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className="group relative overflow-hidden rounded-2xl border border-sand bg-espresso aspect-[16/10] text-left transition-all duration-300 hover:shadow-xl hover:border-sage-deep cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage-deep"
              aria-label={`View larger photograph: ${photo.title}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-ivory">
                <span className="text-[11px] font-medium text-sand-light block mb-0.5">
                  {photo.category}
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-ivory">
                  {photo.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Dialog Overlay */}
      <AnimatePresence>
        {currentPhoto && selectedIndex !== null && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-photo-title"
            aria-describedby="lightbox-photo-caption"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.2 }}
              onClick={handleClose}
              className="fixed inset-0 bg-espresso/80 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Lightbox Container */}
            <motion.div
              initial={{
                opacity: 0,
                scale: shouldReduceMotion ? 1 : 0.95,
              }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: shouldReduceMotion ? 1 : 0.95,
              }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.25 }}
              className="relative w-full max-w-4xl bg-ivory rounded-3xl shadow-2xl overflow-hidden border border-sand z-10 text-charcoal flex flex-col"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close enlarged photograph"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-ivory/90 hover:bg-sand/40 border border-sand text-charcoal flex items-center justify-center transition-colors shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Navigation Controls */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous photograph"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-ivory/90 hover:bg-sand/40 border border-sand text-charcoal flex items-center justify-center transition-colors shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next photograph"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-ivory/90 hover:bg-sand/40 border border-sand text-charcoal flex items-center justify-center transition-colors shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* High-Resolution Photo Display */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-espresso">
                <Image
                  src={currentPhoto.src}
                  alt={currentPhoto.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 900px, 100vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Caption and Information Bar */}
              <div className="p-5 sm:p-6 bg-ivory border-t border-sand flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-medium text-umber block mb-0.5">
                    {photoCategory(currentPhoto.category)} · {selectedIndex + 1} of {photos.length}
                  </span>
                  <h3 id="lightbox-photo-title" className="font-serif text-xl font-bold text-charcoal">
                    {currentPhoto.title}
                  </h3>
                  <p id="lightbox-photo-caption" className="text-xs sm:text-sm text-umber mt-1 max-w-xl">
                    {currentPhoto.caption}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <span className="text-xs text-umber hidden sm:inline">Use ← → keys to browse</span>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 rounded-full bg-sand/30 hover:bg-sand/50 text-charcoal text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
                  >
                    Close preview
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

function photoCategory(cat: string) {
  return cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
}
