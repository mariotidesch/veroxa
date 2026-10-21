import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

type CookieChoices = { necessary: true; statistics: boolean; marketing: boolean; savedAt: string };
const STORAGE_KEY = "veroxa-cookie-consent";

export function openCookiePreferences() {
  window.dispatchEvent(new CustomEvent("veroxa:open-cookie-preferences"));
}

function readChoice(): CookieChoices | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (!value) return null;
    const parsed = JSON.parse(value) as Partial<CookieChoices>;
    if (parsed.necessary !== true || typeof parsed.statistics !== "boolean" || typeof parsed.marketing !== "boolean") return null;
    return { necessary: true, statistics: parsed.statistics, marketing: parsed.marketing, savedAt: parsed.savedAt ?? "" };
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const [choice, setChoice] = useState<CookieChoices | null>(() => readChoice());
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [statistics, setStatistics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const openPreferences = () => {
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setStatistics(choice?.statistics ?? false);
    setMarketing(choice?.marketing ?? false);
    setPreferencesOpen(true);
  };

  useEffect(() => {
    const handleOpen = () => openPreferences();
    window.addEventListener("veroxa:open-cookie-preferences", handleOpen);
    return () => window.removeEventListener("veroxa:open-cookie-preferences", handleOpen);
  }, [choice]);

  useEffect(() => {
    if (!preferencesOpen) return;
    const dialog = dialogRef.current;
    const focusable = dialog?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled])');
    focusable?.[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreferencesOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const items = dialog.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled])');
      if (!items.length) return;
      if (event.shiftKey && document.activeElement === items[0]) {
        event.preventDefault();
        items[items.length - 1].focus();
      } else if (!event.shiftKey && document.activeElement === items[items.length - 1]) {
        event.preventDefault();
        items[0].focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      openerRef.current?.focus();
    };
  }, [preferencesOpen]);

  const saveChoice = (optional: { statistics: boolean; marketing: boolean }) => {
    const next: CookieChoices = { necessary: true, ...optional, savedAt: new Date().toISOString() };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Le preferenze restano applicate nell'interfaccia per la sessione corrente.
    }
    setChoice(next);
    setPreferencesOpen(false);
  };

  return (
    <>
      {!choice && (
        <aside
          aria-label="Preferenze cookie"
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-5xl rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-[0_20px_70px_hsl(var(--foreground)/.18)] sm:inset-x-6 sm:bottom-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-6"
          data-testid="banner-cookie"
        >
          <div className="max-w-2xl">
            <p className="font-serif text-xl">La tua privacy, prima di tutto.</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Usiamo solo i dati tecnici necessari al funzionamento del sito. Al momento non sono collegati cookie statistici o di marketing.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 sm:mt-0 sm:shrink-0">
            <button type="button" onClick={() => saveChoice({ statistics: true, marketing: true })} className="rounded-full bg-foreground px-4 py-2.5 text-sm text-background transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="button-cookie-accept-all">Accetta tutti</button>
            <button type="button" onClick={() => saveChoice({ statistics: false, marketing: false })} className="rounded-full border border-border px-4 py-2.5 text-sm transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="button-cookie-necessary">Solo necessari</button>
            <button type="button" onClick={openPreferences} className="rounded-full px-3 py-2.5 text-sm text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="button-cookie-preferences">Preferenze</button>
          </div>
        </aside>
      )}
      {choice && (
        <button
          type="button"
          onClick={openPreferences}
          className="sr-only focus:not-sr-only focus:fixed focus:bottom-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-card focus:px-4 focus:py-3 focus:text-foreground focus:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          data-testid="button-reopen-cookie-preferences"
        >
          Apri preferenze cookie
        </button>
      )}
      {preferencesOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-foreground/35 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setPreferencesOpen(false); }}>
          <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="cookie-dialog-title" className="relative w-full max-w-xl rounded-3xl border border-border bg-background p-6 text-foreground shadow-[0_24px_90px_hsl(var(--foreground)/.24)] sm:p-8" data-testid="dialog-cookie-preferences">
            <button type="button" onClick={() => setPreferencesOpen(false)} aria-label="Chiudi preferenze cookie" className="absolute right-5 top-5 rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="button-close-cookie-preferences"><X className="h-4 w-4" /></button>
            <p className="eyebrow">Trasparenza</p>
            <h2 id="cookie-dialog-title" className="mt-3 pr-10 font-serif text-3xl font-light">Preferenze cookie</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              I cookie necessari sono sempre attivi per le funzioni essenziali. In questa versione del sito non vengono caricati cookie statistici o di marketing e non sono collegati servizi di tracciamento.
            </p>
            <div className="mt-6 divide-y divide-border border-y border-border">
              <label className="flex items-start justify-between gap-5 py-4">
                <span><span className="block text-sm font-medium">Necessari</span><span className="mt-1 block text-xs text-muted-foreground">Sempre attivi: consentono il funzionamento di base.</span></span>
                <input type="checkbox" checked disabled aria-label="Cookie necessari sempre attivi" className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]" />
              </label>
              <label className="flex items-start justify-between gap-5 py-4">
                <span><span className="block text-sm font-medium">Statistiche</span><span className="mt-1 block text-xs text-muted-foreground">Al momento non vengono caricati strumenti statistici.</span></span>
                <input type="checkbox" checked={statistics} onChange={(event) => setStatistics(event.target.checked)} aria-label="Consenti cookie statistici" className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]" data-testid="toggle-cookie-statistics" />
              </label>
              <label className="flex items-start justify-between gap-5 py-4">
                <span><span className="block text-sm font-medium">Marketing</span><span className="mt-1 block text-xs text-muted-foreground">Al momento non vengono caricati strumenti marketing.</span></span>
                <input type="checkbox" checked={marketing} onChange={(event) => setMarketing(event.target.checked)} aria-label="Consenti cookie di marketing" className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]" data-testid="toggle-cookie-marketing" />
              </label>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">La scelta viene salvata su questo dispositivo. Le opzioni facoltative non attivano servizi finché non saranno effettivamente collegati.</p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => saveChoice({ statistics: false, marketing: false })} className="rounded-full border border-border px-5 py-3 text-sm hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="button-save-necessary">Solo necessari</button>
              <button type="button" onClick={() => saveChoice({ statistics, marketing })} className="rounded-full bg-foreground px-5 py-3 text-sm text-background hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="button-save-cookie-preferences">Salva la scelta</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
