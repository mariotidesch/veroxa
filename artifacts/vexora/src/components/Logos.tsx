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
    <motion.svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      whileHover={{ scale: 1.05, rotate: 5 }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
    >
      {/* Outer elegant diamond structure */}
      <motion.path 
        d="M50 10 L85 30 L50 90 L15 30 Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        {...pathProps}
      />
      {/* Inner facets */}
      <motion.path 
        d="M50 10 L50 90" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinejoin="miter"
        transition={{ ...transition, delay: 0.2 }}
        {...pathProps}
      />
      <motion.path 
        d="M15 30 L85 30" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinejoin="miter"
        transition={{ ...transition, delay: 0.3 }}
        {...pathProps}
      />
      {/* Central intricate V shape */}
      <motion.path 
        d="M30 45 L50 75 L70 45" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round"
        strokeLinejoin="round"
        transition={{ ...transition, delay: 0.5 }}
        {...pathProps}
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
      whileHover={{ rotate: 180 }}
      transition={{ duration: 1.5, ease: "anticipate" as const }}
    >
      {/* Concentric circles of the seal */}
      <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="1" strokeDasharray="1 5" />
      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" />
      
      {/* Decorative compass/radial elements */}
      <path d="M50 2 L50 10 M50 90 L50 98 M2 50 L10 50 M90 50 L98 50" stroke="currentColor" strokeWidth="1" />
      <path d="M16 16 L22 22 M84 84 L78 78 M16 84 L22 78 M84 16 L78 22" stroke="currentColor" strokeWidth="0.5" />
      
      {/* Inner geometric structure */}
      <path d="M50 20 L80 50 L50 80 L20 50 Z" stroke="currentColor" strokeWidth="1" />
      <path d="M50 20 L50 80 M20 50 L80 50" stroke="currentColor" strokeWidth="0.5" />
      
      {/* Core V */}
      <path d="M35 35 L50 65 L65 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Inner decorative dots */}
      <circle cx="50" cy="30" r="1.5" fill="currentColor" />
      <circle cx="30" cy="50" r="1.5" fill="currentColor" />
      <circle cx="70" cy="50" r="1.5" fill="currentColor" />
      <circle cx="50" cy="70" r="1.5" fill="currentColor" />
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
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
        {/* V */}
        <path d="M 30 25 L 45 55 L 60 25" />
        {/* E */}
        <path d="M 90 25 L 70 25 L 70 55 L 90 55 M 70 40 L 85 40" />
        {/* X */}
        <path d="M 100 25 L 125 55 M 125 25 L 100 55" />
        {/* O */}
        <path d="M 150 55 C 135 55 135 25 150 25 C 165 25 165 55 150 55 Z" />
        {/* R */}
        <path d="M 175 55 L 175 25 C 200 25 200 40 185 40 L 175 40 M 185 40 L 200 55" />
        {/* A */}
        <path d="M 210 55 L 225 25 L 240 55 M 216 45 L 234 45" />
      </g>
      
      <motion.path 
        d="M 30 70 L 240 70"
        stroke="currentColor"
        strokeWidth="1"
        variants={{
          rest: { pathLength: 0, opacity: 0 },
          hover: { pathLength: 1, opacity: 1 }
        }}
        transition={{ duration: 0.6, ease: "easeInOut" as const }}
      />
    </motion.svg>
  );
};
