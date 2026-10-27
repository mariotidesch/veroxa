import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "./LanguageContext";

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
  const { text } = useLanguage();
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
          aria-label={text("Preferenze cookie", "Cookie preferences")}
          className="fixed inset-x-2 bottom-[max(.5rem,env(safe-area-inset-bottom))] z-[60] mx-auto max-w-5xl rounded-2xl border border-border bg-card p-3 text-card-foreground shadow-[0_20px_70px_hsl(var(--foreground)/.18)] sm:inset-x-6 sm:bottom-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-6"
          data-testid="banner-cookie"
        >
          <div className="max-w-2xl">
            <p className="font-serif text-base sm:text-xl">{text("La tua privacy, prima di tutto.", "Your privacy comes first.")}</p>
            <p className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm sm:leading-relaxed">
              {text("Usiamo solo i cookie tecnici necessari; non sono attivi cookie statistici o di marketing. Se usi l’assistente AI, i messaggi vengono elaborati da un servizio AI per generare la risposta: evita dati sensibili.", "We use only essential technical cookies; analytics and marketing cookies are not active. If you use the AI assistant, your messages are processed by an AI service to generate a reply. Please don't share sensitive information.")}
            </p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-0 sm:flex sm:shrink-0">
            <button type="button" onClick={() => saveChoice({ statistics: true, marketing: true })} className="min-h-11 rounded-full bg-foreground px-3 py-2 text-xs text-background transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:px-4 sm:py-2.5 sm:text-sm" data-testid="button-cookie-accept-all">{text("Accetta tutti", "Accept all")}</button>
            <button type="button" onClick={() => saveChoice({ statistics: false, marketing: false })} className="min-h-11 rounded-full border border-border px-3 py-2 text-xs transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:px-4 sm:py-2.5 sm:text-sm" data-testid="button-cookie-necessary">{text("Solo necessari", "Necessary only")}</button>
            <button type="button" onClick={openPreferences} className="col-span-2 min-h-10 rounded-full px-3 py-2 text-xs text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:col-span-1 sm:min-h-0 sm:py-2.5 sm:text-sm" data-testid="button-cookie-preferences">{text("Preferenze", "Preferences")}</button>
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
          {text("Apri preferenze cookie", "Open cookie preferences")}
        </button>
      )}
      {preferencesOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-foreground/35 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setPreferencesOpen(false); }}>
          <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="cookie-dialog-title" className="relative w-full max-w-xl rounded-3xl border border-border bg-background p-6 text-foreground shadow-[0_24px_90px_hsl(var(--foreground)/.24)] sm:p-8" data-testid="dialog-cookie-preferences">
            <button type="button" onClick={() => setPreferencesOpen(false)} aria-label={text("Chiudi preferenze cookie", "Close cookie preferences")} className="absolute right-5 top-5 rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="button-close-cookie-preferences"><X className="h-4 w-4" /></button>
            <p className="eyebrow">{text("Trasparenza", "Transparency")}</p>
            <h2 id="cookie-dialog-title" className="mt-3 pr-10 font-serif text-3xl font-light">{text("Preferenze cookie", "Cookie preferences")}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {text("I cookie necessari sono sempre attivi per le funzioni essenziali. In questa versione non vengono caricati cookie statistici o di marketing né servizi di tracciamento. Se usi l’assistente AI, i messaggi inviati vengono elaborati dal servizio AI per generare la risposta; il sito non salva la cronologia oltre la sessione del browser. Evita di inserire dati personali o sensibili.", "Essential cookies are always active for core features. This version does not load analytics or marketing cookies or tracking services. If you use the AI assistant, your messages are processed by an AI service to generate a reply; the website does not save chat history beyond your browser session. Avoid sharing personal or sensitive information.")}
            </p>
            <div className="mt-6 divide-y divide-border border-y border-border">
              <label className="flex items-start justify-between gap-5 py-4">
                <span><span className="block text-sm font-medium">{text("Necessari", "Essential")}</span><span className="mt-1 block text-xs text-muted-foreground">{text("Sempre attivi: consentono il funzionamento di base.", "Always active: required for core functionality.")}</span></span>
                <input type="checkbox" checked disabled aria-label={text("Cookie necessari sempre attivi", "Essential cookies always active")} className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]" />
              </label>
              <label className="flex items-start justify-between gap-5 py-4">
                <span><span className="block text-sm font-medium">{text("Statistiche", "Analytics")}</span><span className="mt-1 block text-xs text-muted-foreground">{text("Al momento non vengono caricati strumenti statistici.", "Analytics tools are not currently loaded.")}</span></span>
                <input type="checkbox" checked={statistics} onChange={(event) => setStatistics(event.target.checked)} aria-label={text("Consenti cookie statistici", "Allow analytics cookies")} className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]" data-testid="toggle-cookie-statistics" />
              </label>
              <label className="flex items-start justify-between gap-5 py-4">
                <span><span className="block text-sm font-medium">Marketing</span><span className="mt-1 block text-xs text-muted-foreground">{text("Al momento non vengono caricati strumenti marketing.", "Marketing tools are not currently loaded.")}</span></span>
                <input type="checkbox" checked={marketing} onChange={(event) => setMarketing(event.target.checked)} aria-label={text("Consenti cookie di marketing", "Allow marketing cookies")} className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]" data-testid="toggle-cookie-marketing" />
              </label>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{text("La scelta viene salvata su questo dispositivo. Le opzioni facoltative non attivano servizi finché non saranno effettivamente collegati.", "Your choice is saved on this device. Optional settings won't activate any services until they are actually connected.")}</p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => saveChoice({ statistics: false, marketing: false })} className="rounded-full border border-border px-5 py-3 text-sm hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="button-save-necessary">{text("Solo necessari", "Necessary only")}</button>
              <button type="button" onClick={() => saveChoice({ statistics, marketing })} className="rounded-full bg-foreground px-5 py-3 text-sm text-background hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="button-save-cookie-preferences">{text("Salva la scelta", "Save preferences")}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
