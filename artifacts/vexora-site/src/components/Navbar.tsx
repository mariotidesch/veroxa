import { Link, useLocation } from "wouter";
import { Contrast, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo1 } from "./Logos";

// Animated hamburger icon: due linee div che reagiscono all'hover
function HamburgerIcon({ hovered }: { hovered: boolean }) {
  return (
    <span className="flex flex-col gap-[5px] items-start" aria-hidden="true">
      <motion.span
        className="block h-[1.5px] bg-current rounded-full origin-left"
        animate={{ width: hovered ? "14px" : "18px" }}
        transition={{ duration: 0.22, ease: "easeInOut" as const }}
        style={{ width: "18px" }}
      />
      <motion.span
        className="block h-[1.5px] bg-current rounded-full origin-right"
        animate={{ width: hovered ? "14px" : "18px", marginLeft: hovered ? "4px" : "0px" }}
        transition={{ duration: 0.22, ease: "easeInOut" as const }}
        style={{ width: "18px" }}
      />
    </span>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const [isMonochrome, setIsMonochrome] = useState(() => {
    try {
      return window.localStorage.getItem("veroxa-color-mode") === "mono";
    } catch {
      return false;
    }
  });
  const [location] = useLocation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.dataset.colorMode = isMonochrome ? "mono" : "color";
    try {
      window.localStorage.setItem("veroxa-color-mode", isMonochrome ? "mono" : "color");
    } catch {
      // The current choice still works for this session when storage is unavailable.
    }
  }, [isMonochrome]);

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
    { href: "/", label: "Torna alla home", subtitle: "Pagina principale" },
    { href: "/chi-siamo", label: "Chi Siamo", subtitle: "Le nostre radici" },
    { href: "/cosa-facciamo", label: "Cosa Facciamo", subtitle: "I nostri servizi" },
    { href: "/come-funziona", label: "Come Funziona", subtitle: "Il nostro metodo" },
    { href: "/contatti", label: "Contatti", subtitle: "Iniziamo un progetto" }
  ];

  return (
    <>
      <header id="site-header" className="fixed top-0 left-0 w-full z-40 p-4 md:p-7 flex justify-end items-center gap-3 text-foreground">
        <button
          type="button"
          onClick={() => setIsMonochrome((current) => !current)}
          aria-label={isMonochrome ? "Torna alla visualizzazione a colori" : "Attiva la visualizzazione in bianco e nero"}
          aria-pressed={isMonochrome}
          title={isMonochrome ? "Torna ai colori" : "Passa al bianco e nero"}
          data-testid="button-toggle-color-mode"
          className="flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-3 text-xs font-medium tracking-wide text-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Contrast className="h-4 w-4" aria-hidden="true" />
          <span>{isMonochrome ? "B/N attivo" : "A colori"}</span>
        </button>

        {/* Pulsante menu con animazione linee */}
        <button
          ref={menuButtonRef}
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
          aria-label="Apri menu"
          aria-expanded={isOpen}
        >
          <motion.span
            animate={{ opacity: btnHovered ? 1 : 0, x: btnHovered ? 0 : 6 }}
            transition={{ duration: 0.22, ease: "easeOut" as const }}
            className="text-xs tracking-[0.18em] uppercase font-sans hidden sm:block text-foreground/70"
          >
            Menu
          </motion.span>

          <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" as const }}
            className="relative w-12 h-12 rounded-full border border-border/60 bg-background/70 backdrop-blur-sm flex items-center justify-center shadow-sm group-hover:border-primary/50 group-hover:bg-white transition-colors duration-300"
          >
            {/* Cerchio che si riempie al hover */}
            <motion.div
              animate={{ scale: btnHovered ? 1 : 0, opacity: btnHovered ? 1 : 0 }}
              transition={{ duration: 0.25, ease: "easeOut" as const }}
              className="absolute inset-0 rounded-full bg-primary/8 pointer-events-none"
            />
            <HamburgerIcon hovered={btnHovered} />
          </motion.div>
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={overlayRef}
            id="site-nav-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Menu di navigazione"
            initial={{ clipPath: "circle(0% at calc(100% - 3.5rem) 3.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3.5rem) 3.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3.5rem) 3.5rem)" }}
            transition={{ type: "tween", ease: [0.76, 0, 0.24, 1] as const, duration: 0.35 }}
            className="fixed inset-0 z-50 bg-background/97 backdrop-blur-2xl text-foreground flex flex-col"
          >
            {/* Logo in alto a sinistra nel menu */}
            <div className="absolute top-0 left-0 p-6 md:p-8 opacity-30">
              <Logo1 className="w-8 h-8 text-foreground" animated={false} />
            </div>

            {/* Pulsante chiudi */}
            <div className="absolute top-0 right-0 p-6 md:p-8">
              <motion.button
                ref={closeButtonRef}
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.18, ease: "easeOut" as const }}
                className="w-12 h-12 rounded-full border border-border/60 bg-white/60 backdrop-blur-sm flex items-center justify-center hover:border-primary/50 hover:bg-white transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Chiudi menu"
              >
                <X className="w-4 h-4 text-foreground" />
              </motion.button>
            </div>

            {/* Voci di navigazione */}
            <nav className="flex-1 flex flex-col justify-center px-8 sm:px-12 md:px-24 max-w-7xl mx-auto w-full gap-6">
              {links.map((link, i) => (
                <div key={link.href} className="overflow-hidden border-b border-border/40 pb-4">
                  <motion.div
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] as const, delay: i * 0.04 }}
                  >
                    <Link href={link.href} onClick={() => setIsOpen(false)}>
                      <div className="group flex items-end gap-5 sm:gap-8 cursor-pointer py-2">
                        <span className="text-xs font-sans tracking-[0.2em] text-foreground/30 mb-1 md:mb-2 shrink-0">
                          0{i + 1}
                        </span>
                        <span className={`text-4xl sm:text-5xl md:text-7xl font-serif font-light tracking-tight group-hover:text-primary transition-colors duration-200 ${location === link.href ? "text-primary" : "text-foreground"}`}>
                          {link.label}
                        </span>
                        <motion.span
                          animate={{ opacity: 0, x: -8 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          className="text-sm font-serif italic text-foreground/40 mb-1 md:mb-2 hidden md:block"
                        >
                          {link.subtitle}
                        </motion.span>
                      </div>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>

            {/* Piede del menu */}
            <div className="p-8 sm:p-12 md:px-24 flex justify-end items-center text-sm font-sans text-muted-foreground border-t border-border/40">
              <Link href="/contatti" onClick={() => setIsOpen(false)}>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2, ease: "easeOut" as const }}
                  className="flex items-center gap-3 text-primary hover:text-foreground transition-colors font-medium text-sm tracking-[0.1em] uppercase"
                >
                  <span>Inizia un progetto</span>
                  <span className="text-lg leading-none">→</span>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
