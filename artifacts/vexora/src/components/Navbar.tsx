import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo1 } from "./Logos";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (e.key === "Tab") {
        const root = overlayRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
          if (active === first || !root.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else if (active === last || !root.contains(active)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [isOpen]);

  const links = [
    { href: "/", label: "Home", subtitle: "L'atelier" },
    { href: "/recensioni", label: "Recensioni", subtitle: "Testimonianze" },
    { href: "/contatti", label: "Contatti", subtitle: "Parliamo" }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 p-8 flex justify-between items-center mix-blend-difference text-white">
        <Link href="/" className="flex items-center gap-3 group" aria-label="Home">
          <Logo1 className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity" animated={false} />
          <span className="text-sm tracking-[0.2em] uppercase opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 font-sans hidden sm:block">
            Vexora
          </span>
        </Link>
        <button 
          ref={menuButtonRef}
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3"
          aria-label="Menu"
          aria-expanded={isOpen}
        >
          <span className="text-sm tracking-[0.1em] uppercase opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 font-sans hidden sm:block">
            Menu
          </span>
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-colors">
            <Menu className="w-4 h-4" />
          </div>
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu di navigazione"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 3rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            transition={{ type: "tween", ease: [0.76, 0, 0.24, 1], duration: 0.8 }}
            className="fixed inset-0 z-50 bg-foreground text-background flex flex-col"
          >
            <div className="absolute top-0 right-0 p-8">
              <button 
                ref={closeButtonRef}
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:border-background/50 hover:bg-background/10 transition-colors"
                aria-label="Chiudi menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <nav className="flex-1 flex flex-col justify-center px-8 sm:px-12 md:px-24 max-w-7xl mx-auto w-full gap-8">
              {links.map((link, i) => (
                <div key={link.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: i * 0.1 }}
                  >
                    <Link href={link.href} onClick={() => setIsOpen(false)}>
                      <div className="group flex items-end gap-4 sm:gap-6 cursor-pointer">
                        <span className="text-sm font-sans tracking-widest text-background/40 mb-3 md:mb-5">
                          0{i + 1}
                        </span>
                        <span className={`text-4xl sm:text-5xl md:text-8xl font-serif font-light tracking-tight group-hover:text-primary transition-colors ${location === link.href ? "text-primary" : "text-background"}`}>
                          {link.label}
                        </span>
                        <span className="text-sm font-serif italic text-background/40 mb-3 md:mb-5 hidden md:block opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                          {link.subtitle}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
            
            <div className="p-8 sm:p-12 md:px-24 flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm font-sans text-background/40 border-t border-background/10 gap-4">
              <p>m.mariotedeschi@gmail.com</p>
              <p>+39 331 383 0350</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}