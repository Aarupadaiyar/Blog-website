"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { DoodleStar, DoodleCircle, DoodleArrow, DoodleZigzag, DoodleDots, DoodleUnderline } from "./Doodles";

export default function HeroIntro() {
  return (
    <section className="relative overflow-hidden pt-16 pb-14 sm:pt-24 sm:pb-20">
      <DoodleCircle className="pointer-events-none absolute -right-4 top-2 h-28 w-28 text-blue opacity-70 sm:h-40 sm:w-40" />
      <DoodleStar className="pointer-events-none absolute right-24 top-20 h-6 w-6 text-blue opacity-80 sm:right-40" />
      <DoodleZigzag className="pointer-events-none absolute right-6 bottom-4 h-4 w-24 text-green opacity-70 sm:right-16" />
      <DoodleDots className="pointer-events-none absolute left-1/2 top-6 hidden h-5 w-16 text-yellow opacity-80 sm:block" />

      <div className="relative flex items-start gap-3">
        <motion.p
          initial={{ opacity: 0, y: 8, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 0.5 }}
          className="font-hand text-3xl text-accent-deep"
        >
          hi, this is
        </motion.p>
        <DoodleArrow className="mt-2 h-10 w-14 -rotate-6 text-accent" />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.08 }}
        className="relative mt-2 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl md:text-6xl"
      >
        {siteConfig.tagline}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.16 }}
        className="relative mt-5 flex flex-wrap items-center gap-4"
      >
        <span className="inline-flex items-center gap-2 border-[1.6px] border-ink bg-yellow px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-ink" />
          <span className="font-mono-label text-xs text-ink">NEW NOTES, WRITTEN REGULARLY</span>
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.22 }}
        className="relative mt-6 max-w-xl text-lg leading-relaxed text-ink-soft"
      >
        {siteConfig.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative mt-8 flex flex-col items-start"
      >
        <Link href="#latest" className="btn-sharp btn-sharp-fill">
          Read the latest →
        </Link>
        <DoodleUnderline className="mt-1 h-3 w-28 text-accent" />
      </motion.div>
    </section>
  );
}
