"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

type NavCategory = { name: string; slug: string };

const pillColors = ["bg-yellow", "bg-accent-soft", "bg-green-soft", "bg-blue-soft"] as const;

export default function Navbar({ categories }: { categories: NavCategory[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b-[1.6px] border-border bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-[1.6px] border-ink bg-yellow text-sm font-bold text-ink">
            {siteConfig.shortName.slice(0, 1)}
          </span>
          <span className="text-lg font-bold tracking-tight text-ink">{siteConfig.name}</span>
        </Link>

        <div className="flex items-center gap-5">
          <Link href="/resources" className="hidden text-sm font-medium text-ink-soft hover:text-ink sm:inline">
            Resources
          </Link>
          <Link href="/about" className="hidden text-sm font-medium text-ink-soft hover:text-ink sm:inline">
            About
          </Link>

          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="flex items-center gap-2 border-[1.6px] border-ink bg-surface px-4 py-2 text-sm font-bold text-ink"
            >
              Categories
              <ChevronDown size={15} className={`transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 z-50 mt-2 w-[min(90vw,22rem)] border-[1.6px] border-ink bg-surface p-3 shadow-[4px_4px_0_var(--ink)]"
                >
                  <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                    {categories.map((c, i) => (
                      <Link
                        key={c.slug}
                        href={`/category/${c.slug}`}
                        onClick={() => setOpen(false)}
                        className={`font-mono-label px-3 py-2 text-xs text-ink transition-transform hover:-translate-y-0.5 ${pillColors[i % pillColors.length]}`}
                      >
                        {c.name.toUpperCase()}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-4 border-t-[1.6px] border-border pt-2 sm:hidden">
                    <Link href="/resources" onClick={() => setOpen(false)} className="text-sm font-medium text-ink-soft hover:text-ink">
                      Resources
                    </Link>
                    <Link href="/about" onClick={() => setOpen(false)} className="text-sm font-medium text-ink-soft hover:text-ink">
                      About
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
