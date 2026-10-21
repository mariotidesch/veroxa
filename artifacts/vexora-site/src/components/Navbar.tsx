import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun, X } from "lucide-react";
import { Logo3 } from "./Logos";
import { openCookiePreferences } from "./CookieConsent";

const links = [
  { href: "/", label: "Home" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/cosa-facciamo", label: "Cosa facciamo" },
  { href: "/come-funziona", label: "Come funziona" },
  { href: "/contatti", label: "Contatti" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    try {
      return window.localStorage.getItem("veroxa-theme") === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  });
  const [location] = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      window.localStorage.setItem("veroxa-theme", theme);
    } catch {
      // Mantiene la scelta per la sessione corrente.
    }
  }, [theme]);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }
      if (event.key !== "Tab" || !menuRef.current) return;
      const items = menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || !menuRef.current.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !menuRef.current.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <header id="site-header" className="fixed left-0 top-0 z-40 flex w-full items-center justify-between p-4 text-foreground md:p-7">
        <Link href="/" aria-label="Veroxa, torna alla home" className="flex items-center">
          <Logo3 className="h-9 text-foreground sm:h-10" />
        </Link>
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
          aria-expanded={isOpen}
          aria-controls="site-nav-menu"
          className="flex h-12 items-center gap-3 rounded-full border border-border/70 bg-background/85 px-5 text-xs font-medium uppercase tracking-[0.16em] shadow-sm backdrop-blur-md transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          data-testid="button-menu"
        >
          <span>{isOpen ? "Chiudi" : "Menu"}</span>
          {isOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <span className="flex w-4 flex-col gap-[5px]" aria-hidden="true"><i className="h-px w-4 bg-current" /><i className="h-px w-3 bg-current" /></span>}
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            <button
              type="button"
              aria-label="Chiudi menu"
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 cursor-default bg-foreground/10 backdrop-blur-[2px]"
              data-testid="button-dismiss-menu"
            />
            <motion.div
              ref={menuRef}
              id="site-nav-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu di navigazione"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="fixed left-3 right-3 top-[5.25rem] z-50 mx-auto max-w-5xl rounded-2xl border border-border/80 bg-background/98 p-5 text-foreground shadow-[0_24px_70px_hsl(var(--foreground)/.15)] backdrop-blur-xl sm:left-6 sm:right-6 sm:p-7 md:top-24"
            >
              <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-b border-border/70 pb-5">
                <nav aria-label="Navigazione principale" className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-2 sm:gap-x-3">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      aria-current={location === link.href ? "page" : undefined}
                      className={`rounded-full px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:px-4 ${location === link.href ? "bg-primary/10 text-primary" : "text-foreground/75 hover:bg-secondary hover:text-foreground"}`}
                      data-testid={`link-menu-${link.href === "/" ? "home" : link.href.slice(1)}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <button
                  type="button"
                  onClick={() => setTheme((current) => current === "dark" ? "light" : "dark")}
                  aria-label={theme === "dark" ? "Attiva il tema chiaro" : "Attiva il tema scuro"}
                  aria-pressed={theme === "dark"}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm text-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  data-testid="button-toggle-theme"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
                  <span>{theme === "dark" ? "Tema chiaro" : "Tema scuro"}</span>
                </button>
                <button ref={closeButtonRef} type="button" onClick={() => setIsOpen(false)} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Chiudi menu" data-testid="button-close-menu">
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
                <p className="text-xs tracking-wide text-muted-foreground">Un progetto digitale, fatto intorno a te.</p>
                <button
                  type="button"
                  onClick={openCookiePreferences}
                  className="rounded-full px-3 py-2 text-xs text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  data-testid="button-menu-cookie-preferences"
                >
                  Preferenze cookie
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
