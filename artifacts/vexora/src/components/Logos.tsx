import { motion } from 'framer-motion';

// Logo 1: Primary mark (Welcome screen / identity)
export const Logo1 = ({ className = "w-16 h-16", animated = true }: { className?: string, animated?: boolean }) => {
  const transition = { duration: 2, ease: "easeInOut" as const };
  const pathProps = animated ? {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition
  } : {
    initial: { pathLength: 1, opacity: 1 },
    animate: { pathLength: 1, opacity: 1 }
  };

  return (
    <motion.svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <motion.path 
        d="M20 20 L50 85 L80 20" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        {...pathProps}
      />
      <motion.path 
        d="M35 30 L50 65 L65 30" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        transition={{ ...transition, delay: 0.2 }}
        {...pathProps}
      />
      <motion.circle 
        cx="50" 
        cy="50" 
        r="40" 
        stroke="currentColor" 
        strokeWidth="0.5" 
        {...pathProps}
        transition={{ ...transition, delay: 0.4 }}
      />
    </motion.svg>
  );
};

// Logo 2: Graphic emblem (used inside pages)
export const Logo2 = ({ className = "w-24 h-24" }: { className?: string }) => {
  return (
    <motion.svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      whileHover={{ rotate: 90 }}
      transition={{ duration: 0.8, ease: "anticipate" }}
    >
      <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
      <path d="M50 10 L90 50 L50 90 L10 50 Z" stroke="currentColor" strokeWidth="1" />
      <path d="M50 20 L80 50 L50 80 L20 50 Z" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="15" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" />
    </motion.svg>
  );
};

// Logo 3: Typographic mark (Footer)
export const Logo3 = ({ className = "h-12" }: { className?: string }) => {
  return (
    <motion.svg 
      viewBox="0 0 300 80" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      initial="rest"
      whileHover="hover"
    >
      <text 
        x="50%" 
        y="50%" 
        dominantBaseline="middle" 
        textAnchor="middle" 
        fill="currentColor" 
        fontFamily="Playfair Display, serif" 
        fontWeight="400" 
        fontSize="48" 
        letterSpacing="0.2em"
      >
        VEXORA
      </text>
      <motion.path 
        d="M 50 70 L 250 70"
        stroke="currentColor"
        strokeWidth="1"
        variants={{
          rest: { pathLength: 0, opacity: 0 },
          hover: { pathLength: 1, opacity: 1 }
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </motion.svg>
  );
};