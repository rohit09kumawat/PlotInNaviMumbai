'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { WhatsAppButton } from '@/components/whatsapp/WhatsAppButton';
import { waMessages } from '@/lib/whatsapp';
import { getAllNodes } from '@/lib/properties';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const nodes = getAllNodes();

  const slideshowImages = [
    {
      src: '/atal-setu.jpg',
      alt: 'Atal Setu (MTHL) bridge connecting Mumbai and Navi Mumbai at sunset',
    },
    {
      src: '/navi-mumbai-airport.jpg',
      alt: 'Navi Mumbai International Airport terminal building design',
    },
    {
      src: '/navi-mumbai-infra.jpg',
      alt: 'Modern urban infrastructure and new metro line in Navi Mumbai',
    },
    {
      src: '/riyasat-township.png',
      alt: 'Riyasat Township land development project',
    },
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 6000); // transition every 6 seconds
    return () => clearInterval(timer);
  }, [shouldReduceMotion, slideshowImages.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-ink text-white">
      {/* Cinematic Background Slideshow */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden" aria-hidden="true">
        {slideshowImages.map((img, idx) => (
          <motion.div
            key={img.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: idx === currentIndex ? 1 : 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={idx === 0}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        ))}
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-ink/75 z-10" />
      </div>

      <Container className="relative z-20 w-full pt-20">
        <div className="max-w-3xl">
          {/* Copy Column */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full"
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="mb-6">
              <Eyebrow className="text-sprout font-semibold">NAVI MUMBAI · PLOTS & LAND</Eyebrow>
            </motion.div>

            {/* H1 Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-[clamp(2.25rem,6vw,4rem)] font-bold text-white tracking-tight leading-[1.15] mb-6 text-balance uppercase"
            >
              Build your dream home on your own land in, <span className="text-sprout">Navi Mumbai</span>
            </motion.h1>

            {/* Lead Paragraph */}
            <motion.p
              variants={itemVariants}
              className="font-sans text-[clamp(1.0625rem,1.6vw,1.25rem)] text-white/90 leading-[1.6] max-w-[54ch] mb-8 text-balance"
            >
              Even when it costs us the sale. That&apos;s the whole idea here — straight guidance on land across Ulwe, Kharghar, Panvel, Taloja and Dronagiri, so you can decide at your own pace.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8"
            >
              <WhatsAppButton
                message={waMessages.general()}
                variant="primary"
                source="home_hero"
                label="Talk to us on WhatsApp"
                className="h-12 px-7 text-base font-medium bg-sprout hover:bg-sprout/90 text-ink border-none shadow-sm transition-colors"
              />
              <Link
                href="#how-we-guide"
                className="inline-flex items-center justify-center font-sans font-medium text-[0.9375rem] text-white border border-white/20 bg-white/10 hover:bg-white/20 h-12 px-6 rounded-[var(--radius)] transition-colors gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout"
              >
                <span>See how we work</span>
                <ArrowRight className="w-4 h-4 text-white/60" />
              </Link>
            </motion.div>

            {/* Verification Mono Statement */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 pt-4 border-t border-white/10 max-w-xl text-white/70"
            >
              <ShieldCheck className="w-4 h-4 text-sprout shrink-0" />
              <span className="font-mono text-xs uppercase tracking-wider">
                WE CHECK THE PAPERWORK BEFORE WE SHOW YOU ANYTHING
              </span>
            </motion.div>

            {/* Node Direct Links */}
            <motion.div variants={itemVariants} className="mt-8 pt-6 border-t border-white/10">
              <p className="font-mono text-[0.6875rem] uppercase tracking-widest text-white/60 mb-3">
                Explore Available Nodes
              </p>
              <div className="flex flex-wrap gap-2">
                {nodes.map((node) => (
                  <Link
                    key={node.slug}
                    href={`/properties/${node.slug}`}
                    className="font-mono text-xs text-white/95 bg-white/10 border border-white/10 px-3 py-1.5 rounded-[var(--radius-sm)] hover:border-sprout hover:text-sprout transition-colors"
                  >
                    {node.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
