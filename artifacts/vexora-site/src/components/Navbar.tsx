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
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [location] = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    try {
      window.localStorage.removeItem("veroxa-theme");
    } catch {
      // Il tema predefinito resta chiaro anche senza accesso allo storage.
    }
  }, []);

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
               className="fixed left-3 right-3 top-[5.25rem] z-50 mx-auto max-w-5xl overflow-hidden rounded-[1.35rem] border border-border/80 bg-background/98 text-foreground shadow-[0_24px_70px_hsl(var(--foreground)/.15)] backdrop-blur-xl sm:left-6 sm:right-6 md:top-24"
            >
               <div className="flex items-center justify-between border-b border-border/70 px-5 py-4 sm:px-7">
                 <div>
                   <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">Esplora Veroxa</p>
                   <p className="mt-1 text-xs text-muted-foreground">Un progetto digitale, fatto intorno a te.</p>
                 </div>
                 <button ref={closeButtonRef} type="button" onClick={() => setIsOpen(false)} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Chiudi menu" data-testid="button-close-menu">
                   <X className="h-4 w-4" aria-hidden="true" />
                 </button>
               </div>
               <nav aria-label="Navigazione principale" className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-2 sm:p-5 lg:grid-cols-5">
                 {links.map((link, index) => (
                   <Link
                     key={link.href}
                     href={link.href}
                     onClick={() => setIsOpen(false)}
                     aria-current={location === link.href ? "page" : undefined}
                     className={`group flex min-h-14 items-center justify-between rounded-xl border px-4 py-3 transition-[background-color,border-color,color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${location === link.href ? "border-primary/40 bg-primary/[0.08] text-primary" : "border-transparent text-foreground/75 hover:translate-y-[-1px] hover:border-border hover:bg-secondary hover:text-foreground"}`}
                     data-testid={`link-menu-${link.href === "/" ? "home" : link.href.slice(1)}`}
                   >
                     <span className="text-sm font-medium">{link.label}</span>
                     <span className={`font-mono text-[10px] tracking-wider ${location === link.href ? "text-primary/80" : "text-muted-foreground/60 group-hover:text-primary"}`}>0{index + 1}</span>
                   </Link>
                 ))}
               </nav>
               <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 bg-secondary/35 px-5 py-4 sm:px-7">
                 <button
                   type="button"
                   onClick={() => setTheme((current) => current === "dark" ? "light" : "dark")}
                   aria-label={theme === "dark" ? "Attiva il tema chiaro" : "Attiva il tema scuro"}
                   aria-pressed={theme === "dark"}
                   className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm text-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                   data-testid="button-toggle-theme"
                 >
                   {theme === "dark" ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
                   <span>{theme === "dark" ? "Tema chiaro" : "Tema scuro"}</span>
                 </button>
                 <button
                   type="button"
                   onClick={openCookiePreferences}
                   className="rounded-full px-3 py-2 text-xs text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
