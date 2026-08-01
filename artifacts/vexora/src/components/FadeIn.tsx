import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

export function FadeIn({ 
  children, 
  delay = 0, 
  direction = "up", 
  className = "",
  staggerChildren = false
}: { 
  children: ReactNode; 
  delay?: number; 
  direction?: "up" | "down" | "left" | "right" | "scale" | "none";
  className?: string;
  staggerChildren?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const directions = {
    up: { y: 60, x: 0, opacity: 0, scale: 1 },
    down: { y: -60, x: 0, opacity: 0, scale: 1 },
    left: { x: 60, y: 0, opacity: 0, scale: 1 },
    right: { x: -60, y: 0, opacity: 0, scale: 1 },
    scale: { x: 0, y: 0, opacity: 0, scale: 0.9 },
    none: { x: 0, y: 0, opacity: 0, scale: 1 }
  };

  const initial = directions[direction];
  
  if (staggerChildren) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
              delayChildren: delay
            }
          }
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInItem({ 
  children, 
  className = "",
  direction = "up"
}: { 
  children: ReactNode; 
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "scale";
}) {
  const directions = {
    up: { y: 40, x: 0, opacity: 0, scale: 1 },
    down: { y: -40, x: 0, opacity: 0, scale: 1 },
    left: { x: 40, y: 0, opacity: 0, scale: 1 },
    right: { x: -40, y: 0, opacity: 0, scale: 1 },
    scale: { x: 0, y: 0, opacity: 0, scale: 0.95 },
  };

  return (
    <motion.div
      variants={{
          hidden: directions[direction],
          visible: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}