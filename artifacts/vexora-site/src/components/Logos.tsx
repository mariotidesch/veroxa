import { motion } from 'framer-motion';

type LogoProps = { className?: string; animated?: boolean };

// A faceted aperture mark: three precise planes meeting around a quiet center.
export const Logo1 = ({ className = "w-16 h-16", animated = true }: LogoProps) => {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
       aria-label="Simbolo Veroxa"
      initial={false}
      whileHover={animated ? { scale: 1.045, rotate: -2 } : undefined}
      transition={{ duration: 0.24, ease: "easeOut" as const }}
    >
      <motion.path
        d="M50 8 84 28v36L50 84 16 64V28L50 8Z"
        stroke="currentColor"
        strokeWidth="2"
        initial={animated ? { opacity: 0, scale: .94 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: .52, ease: "easeOut" as const }}
      />
      <motion.path
        d="m50 8 18 30-18 14-18-14L50 8Z"
        fill="currentColor"
        initial={animated ? { opacity: 0, y: -3 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .48, delay: .08, ease: "easeOut" as const }}
      />
      <motion.path
        d="m16 28 18 10v24L16 64V28Z"
        fill="hsl(var(--primary))"
        initial={animated ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: .42, delay: .12, ease: "easeOut" as const }}
      />
      <path d="m34 62 16-10 16 10-16 22-16-22Z" fill="currentColor" opacity=".72" />
      <path d="m68 38 16-10v36L68 62V38Z" fill="currentColor" opacity=".48" />
    </motion.svg>
  );
};

// Wordmark: one considered typographic voice, with no isolated letter-symbol.
export const Logo2 = ({ className = "" }: { className?: string }) => (
  <motion.span
    className={`relative inline-flex items-baseline whitespace-nowrap font-sans font-semibold tracking-[0.16em] leading-none ${className}`}
    role="img"
    aria-label="Veroxa"
    initial="rest"
    whileHover="hover"
  >
    <span>VEROXA</span>
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
