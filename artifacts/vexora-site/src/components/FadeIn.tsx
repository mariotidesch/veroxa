import { useEffect, useRef, useState, type ReactNode } from "react";

function shouldShowImmediately() {
  return typeof window === "undefined"
    || window.matchMedia("(max-width: 767px)").matches
    || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(shouldShowImmediately);

  useEffect(() => {
    if (shouldShowImmediately() || !ref.current || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "-10%" });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

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
  const { ref, visible } = useReveal();
  const offsets = {
    up: "translate3d(0, 24px, 0)",
    down: "translate3d(0, -24px, 0)",
    left: "translate3d(24px, 0, 0)",
    right: "translate3d(-24px, 0, 0)",
    scale: "scale(.96)",
    none: "none",
  };
  return (
    <div
      ref={ref}
      data-reveal
      data-reveal-visible={visible}
      data-reveal-direction={direction}
      data-stagger={staggerChildren || undefined}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : offsets[direction],
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
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
  const { ref, visible } = useReveal();
  const offsets = {
    up: "translate3d(0, 20px, 0)",
    down: "translate3d(0, -20px, 0)",
    left: "translate3d(20px, 0, 0)",
    right: "translate3d(-20px, 0, 0)",
    scale: "scale(.97)",
  };
  return (
    <div
      ref={ref}
      data-reveal
      data-reveal-item
      data-reveal-visible={visible}
      data-reveal-direction={direction}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : offsets[direction],
      }}
    >
      {children}
    </div>
  );
}