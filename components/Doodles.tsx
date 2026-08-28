// Small hand-drawn 2D accents, recreated from the reference site's own SVG
// paths (viewBox/path data match the source exactly). Each takes className
// for sizing/color (uses currentColor) and is purely decorative (aria-hidden).

export function DoodleUnderline({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className={className} aria-hidden="true">
      <path d="M3 4c18-3 40-3 58 0" />
      <path d="M9 9c14-2.5 32-2.5 46 0" />
    </svg>
  );
}

export function DoodleArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M34 33 C 25 24, 15 21, 9 9" />
      <path d="M8 21 L 7 7 L 21 11" />
    </svg>
  );
}

export function DoodleStar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 3c1 6 3 12 6 15s9 5 15 6c-6 1-12 3-15 6s-5 9-6 15c-1-6-3-12-6-15s-9-5-15-6c6-1 12-3 15-6s5-9 6-15Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DoodleCircle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <path
        d="M50 6c22 0 42 4 42 24s2 46-20 60S12 96 8 66 8 12 30 8 50 6 50 6Z"
        stroke="currentColor"
        strokeWidth="4"
      />
    </svg>
  );
}

export function DoodleScribble({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M2 20c8-14 16-16 22-4s10 16 18 4 14-18 20-6 10 18 18 6 14-18 20-8 10 16 18 4"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Full-width, thin hand-drawn curved line used as a section divider. */
export function DoodleWaveDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 130"
      fill="none"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path d="M-10 120C420 10 1030 4 1450 80" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function DoodleHeart({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 36" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M20 33C8 24 2 17 2 10.5 2 5 6 2 11 2c4 0 7 2.5 9 6 2-3.5 5-6 9-6 5 0 9 3 9 8.5 0 6.5-6 13.5-18 22.5Z" />
    </svg>
  );
}

export function DoodleCheck({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 32" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 17c4 5 8 9 10 11 6-9 15-19 24-25" />
    </svg>
  );
}

export function DoodleZigzag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M2 17 L18 4 L34 17 L50 4 L66 17 L82 4 L98 17" />
    </svg>
  );
}

/** A pair of hand-drawn brackets that flank/highlight a word or phrase. */
export function DoodleBracketLeft({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 60" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className={className} aria-hidden="true">
      <path d="M17 3C8 3 4 9 4 30s4 27 13 27" />
    </svg>
  );
}

export function DoodleBracketRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 60" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className={className} aria-hidden="true">
      <path d="M3 3c9 0 13 6 13 27s-4 27-13 27" />
    </svg>
  );
}

/** A small loose cluster of hand-drawn dots. */
export function DoodleDots({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 24" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="6" cy="12" r="4" />
      <circle cx="26" cy="6" r="3.5" />
      <circle cx="45" cy="16" r="4.5" />
      <circle cx="68" cy="8" r="3" />
    </svg>
  );
}

/** A loose hand-drawn spiral, used as a whimsical filler accent. */
export function DoodleSwirl({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className={className} aria-hidden="true">
      <path d="M20 20c6 0 10-4 10-9s-4-8-8-8-7 3-7 7 3 6 6 6 5-2 5-5-2-4-4-4" />
    </svg>
  );
}
