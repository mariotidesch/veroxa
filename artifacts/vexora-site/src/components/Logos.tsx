import { motion } from 'framer-motion';

type LogoProps = { className?: string; animated?: boolean };

// Interlocking diagonal ribbons form a compact, immediately legible X mark.
export const Logo1 = ({ className = "w-16 h-16", animated = true }: LogoProps) => {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Simbolo X di Veroxa"
      initial={false}
      whileHover={animated ? { scale: 1.045, rotate: -2 } : undefined}
      transition={{ duration: 0.24, ease: "easeOut" as const }}
    >
      <motion.path
        d="M20 17H39L80 83H61L20 17Z"
        fill="currentColor"
        initial={animated ? { opacity: 0, x: -4 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.52, ease: "easeOut" as const }}
      />
      <motion.path
        d="M80 17H61L20 83H39L80 17Z"
        fill="hsl(var(--primary))"
        initial={animated ? { opacity: 0, x: 4 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.52, delay: 0.1, ease: "easeOut" as const }}
      />
      <path d="M12 17V12H25M75 12H88V25M88 75V88H75M25 88H12V75" stroke="currentColor" strokeWidth="1.4" opacity=".48" />
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
