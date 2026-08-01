import { motion } from 'framer-motion';

// Logo 1: Primary mark (Welcome screen / identity)
export const Logo1 = ({ className = "w-16 h-16", animated = true }: { className?: string, animated?: boolean }) => {
  const drawAnimation = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 }
  };
  
  const staticAnimation = {
    initial: { pathLength: 1, opacity: 1 },
    animate: { pathLength: 1, opacity: 1 }
  };
  
  const animationProps = animated ? drawAnimation : staticAnimation;
  const baseTransition = { duration: 1.5, ease: "easeInOut" as const };

  return (
    <motion.svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4, ease: "easeOut" as const }}
    >
      <motion.circle 
        cx="50" cy="50" r="45" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        {...animationProps}
        transition={baseTransition}
      />
      <motion.path 
        d="M 32 35 L 50 65 L 68 35" 
        stroke="currentColor" 
        strokeWidth="3.5" 
        strokeLinecap="square"
        strokeLinejoin="miter"
        {...animationProps}
        transition={{ ...baseTransition, delay: 0.2 }}
      />
    </motion.svg>
  );
};

// Logo 2: Elaborate Wordmark (Inside pages / How it Works / Contacts)
export const Logo2 = ({ className = "h-12" }: { className?: string }) => {
  return (
    <motion.svg 
      viewBox="0 0 320 80" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      initial="rest"
      whileHover="hover"
    >
      {/* Mark on the left (Scaled down Logo 1) */}
      <g transform="translate(15, 20) scale(0.4)">
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="3" />
        <path d="M 32 35 L 50 65 L 68 35" stroke="currentColor" strokeWidth="7" strokeLinecap="square" strokeLinejoin="miter" />
      </g>
      
      {/* Pure SVG path letters for VEROXA */}
      <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
        {/* V */}
        <path d="M 70 25 L 85 55 L 100 25" />
        {/* E */}
        <path d="M 135 25 L 115 25 L 115 55 L 135 55 M 115 40 L 130 40" />
        {/* R */}
        <path d="M 150 55 L 150 25 L 165 25 C 180 25 180 40 165 40 L 150 40 M 160 40 L 176 55" />
        {/* O */}
        <path d="M 188 40 A 15 15 0 1 0 218 40 A 15 15 0 1 0 188 40" />
        {/* X */}
        <path d="M 230 25 L 255 55 M 255 25 L 230 55" />
        {/* A */}
        <path d="M 270 55 L 285 25 L 300 55 M 275 45 L 295 45" />
      </g>

      {/* Decorative Line on Hover */}
      <motion.path 
        d="M 70 65 L 300 65"
        stroke="currentColor"
        strokeWidth="1.5"
        variants={{
          rest: { pathLength: 0, opacity: 0 },
          hover: { pathLength: 1, opacity: 1 }
        }}
        transition={{ duration: 0.6, ease: "easeInOut" as const }}
      />
    </motion.svg>
  );
};

// Logo 3: Complex Seal/Emblem (Footer)
export const Logo3 = ({ className = "w-16 h-16" }: { className?: string }) => {
  return (
    <motion.svg 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      initial="rest"
      whileHover="hover"
    >
      {/* Outer rotating dashed ring */}
      <motion.circle 
        cx="60" cy="60" r="55" 
        stroke="currentColor" 
        strokeWidth="1" 
        strokeDasharray="2 4" 
        variants={{
          rest: { rotate: 0 },
          hover: { rotate: 360 }
        }}
        transition={{ duration: 4, ease: "linear" as const, repeat: Infinity }}
        style={{ originX: "50%", originY: "50%" }}
      />

      {/* Intermediate static ring */}
      <circle cx="60" cy="60" r="48" stroke="currentColor" strokeWidth="0.5" />
      
      {/* Decorative Diamonds at cardinal points */}
      <path d="M 60 8 L 64 12 L 60 16 L 56 12 Z" fill="currentColor" />
      <path d="M 112 60 L 108 56 L 104 60 L 108 64 Z" fill="currentColor" />
      <path d="M 60 112 L 64 108 L 60 104 L 56 108 Z" fill="currentColor" />
      <path d="M 8 60 L 12 56 L 16 60 L 12 64 Z" fill="currentColor" />

      {/* Simulated Text Arches (decorative dashes forming curves) */}
      <path d="M 33.2 33.2 A 38 38 0 0 1 86.8 33.2" stroke="currentColor" strokeWidth="3" strokeDasharray="1 5" strokeLinecap="round" opacity="0.5" />
      <path d="M 33.2 86.8 A 38 38 0 0 0 86.8 86.8" stroke="currentColor" strokeWidth="3" strokeDasharray="1 5" strokeLinecap="round" opacity="0.5" />
      
      {/* Inner ring */}
      <circle cx="60" cy="60" r="28" stroke="currentColor" strokeWidth="0.5" />

      {/* Core stylized V monogram */}
      <path d="M 48 48 L 60 72 L 72 48" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
      <path d="M 54 48 L 60 60 L 66 48" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter" opacity="0.6" />
    </motion.svg>
  );
};
