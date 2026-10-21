import { motion } from 'framer-motion';

type LogoProps = { className?: string; animated?: boolean };

// Circular stamp: the crossed ribbons make the X the primary brand symbol.
export const Logo1 = ({ className = "w-16 h-16", animated = true }: LogoProps) => {
  const lineInitial = animated ? 0 : 1;
  return (
    <motion.svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Simbolo X di Veroxa"
      initial={false}
      whileHover={animated ? { scale: 1.06, rotate: 2 } : undefined}
      transition={{ duration: 0.24, ease: "easeOut" as const }}
    >
      <motion.circle
        cx="50"
        cy="50"
        r="45"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={{ pathLength: lineInitial, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" as const }}
      />
      <motion.path
        d="M29 27L47 45L70 73"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="square"
        initial={{ pathLength: lineInitial, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" as const }}
      />
      <motion.path
        d="M71 27L53 45L30 73"
        stroke="hsl(var(--primary))"
        strokeWidth="5.5"
        strokeLinecap="square"
        initial={{ pathLength: lineInitial, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.22, ease: "easeOut" as const }}
      />
      <circle cx="50" cy="50" r="3.2" fill="currentColor" />
      <path d="M50 11V18M89 50H82M50 89V82M11 50H18" stroke="currentColor" strokeWidth="1.2" opacity=".55" />
    </motion.svg>
  );
};

// Wordmark: a typographic lockup with a distinct cyan X.
export const Logo2 = ({ className = "" }: { className?: string }) => (
  <motion.span
    className={`relative inline-flex items-baseline whitespace-nowrap font-sans font-semibold tracking-[0.16em] leading-none ${className}`}
    role="img"
    aria-label="Veroxa"
    initial="rest"
    whileHover="hover"
  >
    <span>VERO</span>
    <motion.span
      className="relative mx-[0.015em] text-primary"
      variants={{ rest: { scale: 1 }, hover: { scale: 1.1 } }}
      transition={{ duration: 0.18, ease: "easeOut" as const }}
    >
      X
    </motion.span>
    <span>A</span>
    <motion.span
      aria-hidden="true"
      className="absolute -bottom-1 left-0 h-px bg-primary"
      variants={{ rest: { width: "0%", opacity: 0 }, hover: { width: "100%", opacity: 1 } }}
      transition={{ duration: 0.24, ease: "easeOut" as const }}
    />
  </motion.span>
);

// Horizontal lockup: the circular symbol and written name can be used together.
export const Logo3 = ({ className = "h-10" }: { className?: string }) => (
  <motion.div
    className={`inline-flex h-10 items-center gap-2.5 text-lg leading-none ${className}`}
    role="img"
    aria-label="Veroxa"
    initial="rest"
    whileHover="hover"
  >
    <Logo1 className="h-full w-auto shrink-0" animated={false} />
    <Logo2 className="text-[0.88em]" />
  </motion.div>
);
