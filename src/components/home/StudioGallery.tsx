'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Maximize2, X, Sparkles } from 'lucide-react';

interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  category: string;
  span: string;
}

const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'studio-main',
    src: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
    title: 'The Studio Sanctuary',
    category: 'Full Room View',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 'studio-workspace',
    src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    title: 'Quiet Work & Study Desk',
    category: 'Work Area',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'studio-kitchenette',
    src: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    title: 'Essential Kitchenette',
    category: 'Amenities',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'studio-bathroom',
    src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    title: 'Private Ensuite Bathroom',
    category: 'Sanitized Ensuite',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'studio-reading-nook',
    src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    title: 'Restful Seating Nook',
    category: 'Comfort',
    span: 'md:col-span-1 md:row-span-1',
  },
];

export default function StudioGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Escape key listener for lightbox modal
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelectedPhoto(null);
    }
    if (selectedPhoto) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPhoto]);

  return (
    <section className="py-20 md:py-28 bg-warm-white" aria-labelledby="gallery-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand/30 text-espresso text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Visuals</span>
            </div>
            <h2 id="gallery-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso tracking-tight">
              A Glimpse Into Your Space
            </h2>
          </div>
          <p className="text-sm text-charcoal-muted max-w-md">
            Styled with warm minimalist tones, natural light, and everything you need for undisturbed privacy.
            <span className="block text-[11px] text-sand-dark font-medium mt-1">
              * Curated photography placeholders until host photos are updated.
            </span>
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[240px] md:auto-rows-[260px]">
          {galleryPhotos.map((photo) => (
            <motion.button
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.015 }}
              transition={{ duration: 0.2 }}
              className={`relative rounded-2xl overflow-hidden group shadow-sm border border-sand/60 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-espresso focus-visible:ring-offset-2 ${photo.span}`}
              aria-label={`View photo of ${photo.title}`}
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Gradient Backdrop on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-dark/85 via-espresso/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-sand-light block mb-0.5">
                    {photo.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-ivory">
                    {photo.title}
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-ivory/20 backdrop-blur-md flex items-center justify-center text-ivory group-hover:bg-espresso group-hover:text-ivory transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-dark/80 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selectedPhoto.title}
          >
            <motion.div
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-ivory rounded-2xl overflow-hidden shadow-2xl border border-sand"
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex items-center justify-between bg-ivory border-t border-sand/40">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
                    {selectedPhoto.category}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-espresso mt-0.5">
                    {selectedPhoto.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="p-2 rounded-full hover:bg-sand/30 text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-espresso transition-colors"
                  aria-label="Close photo preview"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
