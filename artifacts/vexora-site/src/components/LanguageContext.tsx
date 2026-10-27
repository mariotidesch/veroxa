import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type SiteLanguage = "it" | "en";

type LanguageContextValue = {
  language: SiteLanguage;
  toggleLanguage: () => void;
  text: (italian: string, english: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const LANGUAGE_STORAGE_KEY = "veroxa-language";

function getInitialLanguage(): SiteLanguage {
  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === "en" ? "en" : "it";
  } catch {
    return "it";
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<SiteLanguage>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // La lingua scelta resta attiva per la sessione corrente.
    }
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    toggleLanguage: () => setLanguage((current) => current === "it" ? "en" : "it"),
    text: (italian, english) => language === "en" ? english : italian,
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
