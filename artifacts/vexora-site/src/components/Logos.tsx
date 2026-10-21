import { motion } from 'framer-motion';

type LogoProps = { className?: string; animated?: boolean };

// A precise, interlocking X: one continuous stroke and a deliberate over-under break.
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
      <motion.g
        fill="currentColor"
        initial={animated ? { opacity: 0, scale: .94 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: .48, ease: "easeOut" as const }}
      >
        <path d="M24 20h13l39 60H63L24 20Z" />
        <path d="M63 20h13L54 48l-8-8 17-20Z" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinejoin="miter" />
        <path d="M37 80H24l22-28 8 8-17 20Z" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinejoin="miter" />
      </motion.g>
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

// Horizontal lockup: the X mark and its name share a single typographic voice.
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
