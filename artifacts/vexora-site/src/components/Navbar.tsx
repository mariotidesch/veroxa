import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Languages, Moon, Sun, X } from "lucide-react";
import { Logo3 } from "./Logos";
import { openCookiePreferences } from "./CookieConsent";
import { useLanguage } from "./LanguageContext";

type NavbarProps = {
  onOpenAssistant: () => void;
};

export function Navbar({ onOpenAssistant }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [location] = useLocation();
  const { language, toggleLanguage, text } = useLanguage();
  const links = [
    { href: "/", label: text("Home", "Home") },
    { href: "/chi-siamo", label: text("Chi siamo", "About us") },
    { href: "/cosa-facciamo", label: text("Cosa facciamo", "What we do") },
    { href: "/come-funziona", label: text("Come funziona", "How it works") },
    { href: "/contatti", label: text("Contatti", "Contact") },
  ];
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
        <Link href="/" aria-label={text("Veroxa, torna alla home", "Veroxa, return to home")} className="flex items-center">
          <Logo3 className="h-9 text-foreground sm:h-10" />
        </Link>
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? text("Chiudi menu", "Close menu") : text("Apri menu", "Open menu")}
          aria-expanded={isOpen}
          aria-controls="site-nav-menu"
          className="flex h-12 items-center gap-3 rounded-full border border-border/70 bg-background/85 px-5 text-xs font-medium uppercase tracking-[0.16em] shadow-sm backdrop-blur-md transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          data-testid="button-menu"
        >
          <span>{isOpen ? text("Chiudi", "Close") : "Menu"}</span>
          {isOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <span className="flex w-4 flex-col gap-[5px]" aria-hidden="true"><i className="h-px w-4 bg-current" /><i className="h-px w-3 bg-current" /></span>}
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            <button
              type="button"
              aria-label={text("Chiudi menu", "Close menu")}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 cursor-default bg-foreground/10 backdrop-blur-[2px]"
              data-testid="button-dismiss-menu"
            />
            <motion.div
              ref={menuRef}
              id="site-nav-menu"
              role="dialog"
              aria-modal="true"
              aria-label={text("Menu di navigazione", "Navigation menu")}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
               className="fixed left-3 right-3 top-[5.25rem] z-50 mx-auto max-w-5xl overflow-hidden rounded-[1.35rem] border border-border/80 bg-background/98 text-foreground shadow-[0_24px_70px_hsl(var(--foreground)/.15)] backdrop-blur-xl sm:left-6 sm:right-6 md:top-24"
            >
               <div className="flex items-center justify-between border-b border-border/70 px-5 py-4 sm:px-7">
                 <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">{text("Esplora Veroxa", "Explore Veroxa")}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{text("Un progetto digitale, fatto intorno a te.", "A digital experience shaped around you.")}</p>
                 </div>
                  <button ref={closeButtonRef} type="button" onClick={() => setIsOpen(false)} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={text("Chiudi menu", "Close menu")} data-testid="button-close-menu">
                   <X className="h-4 w-4" aria-hidden="true" />
                 </button>
               </div>
                 <nav aria-label={text("Navigazione principale", "Main navigation")} className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-2 sm:p-5 lg:grid-cols-3">
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
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      onOpenAssistant();
                    }}
                    className="group flex min-h-14 items-center justify-between rounded-xl border border-transparent px-4 py-3 text-left text-foreground/75 transition-[background-color,border-color,color,transform] duration-200 hover:translate-y-[-1px] hover:border-border hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    data-testid="button-menu-ai-assistant"
                  >
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <Bot className="h-4 w-4 text-primary" aria-hidden="true" />
                      {text("Assistente AI", "AI assistant")}
                    </span>
                    <span className="font-mono text-[10px] tracking-wider text-muted-foreground/60 group-hover:text-primary">06</span>
                  </button>
               </nav>
               <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 bg-secondary/35 px-5 py-4 sm:px-7">
                 <button
                   type="button"
                   onClick={() => setTheme((current) => current === "dark" ? "light" : "dark")}
                   aria-label={theme === "dark" ? text("Attiva il tema chiaro", "Enable light theme") : text("Attiva il tema scuro", "Enable dark theme")}
                   aria-pressed={theme === "dark"}
                   className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm text-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                   data-testid="button-toggle-theme"
                 >
                   {theme === "dark" ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
                    <span>{theme === "dark" ? text("Tema chiaro", "Light theme") : text("Tema scuro", "Dark theme")}</span>
                 </button>
                  <button
                    type="button"
                    onClick={toggleLanguage}
                    aria-label={language === "it" ? "Passa alla lingua inglese" : "Switch to Italian"}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm text-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    data-testid="button-toggle-language"
                  >
                    <Languages className="h-4 w-4" aria-hidden="true" />
                    <span>{language === "it" ? "English" : "Italiano"}</span>
                  </button>
                 <button
                   type="button"
                   onClick={openCookiePreferences}
                   className="rounded-full px-3 py-2 text-xs text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                   data-testid="button-menu-cookie-preferences"
                 >
                    {text("Preferenze cookie", "Cookie preferences")}
                 </button>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
