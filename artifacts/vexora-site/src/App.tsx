import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { lazy, Suspense, useEffect, useState } from 'react';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { LanguageProvider, useLanguage } from '@/components/LanguageContext';

import Home from '@/pages/Home';

const ChiSiamo = lazy(() => import('@/pages/ChiSiamo'));
const CosaFacciamo = lazy(() => import('@/pages/CosaFacciamo'));
const ComeFunziona = lazy(() => import('@/pages/ComeFunziona'));
const Contatti = lazy(() => import('@/pages/Contatti'));
const AIChatPanel = lazy(() => import('@/components/AIChatPanel'));

const queryClient = new QueryClient();

// Scroll to top on route change
function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function Router() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantLoaded, setAssistantLoaded] = useState(false);
  const [location] = useLocation();
  const { text } = useLanguage();

  useEffect(() => {
    const page = location === "/chi-siamo"
      ? {
          title: text("Chi siamo | Veroxa", "About us | Veroxa"),
          description: text("Scopri la visione e il metodo dello studio digitale Veroxa.", "Discover the vision and approach behind Veroxa digital studio."),
        }
      : location === "/cosa-facciamo"
        ? {
            title: text("Cosa facciamo | Veroxa", "What we do | Veroxa"),
            description: text("Siti web, design, e-commerce e SEO su misura per la tua attività.", "Custom websites, design, e-commerce and SEO for your business."),
          }
        : location === "/come-funziona"
          ? {
              title: text("Come funziona | Veroxa", "How it works | Veroxa"),
              description: text("Scopri il percorso Veroxa, dall'ascolto iniziale alla pubblicazione del sito.", "Discover the Veroxa process, from the first conversation to launch."),
            }
          : location === "/contatti"
            ? {
                title: text("Contatti | Veroxa", "Contact | Veroxa"),
                description: text("Raccontaci il tuo progetto digitale e richiedi una proposta su misura.", "Tell us about your digital project and request a tailored proposal."),
              }
            : location === "/"
              ? {
                  title: text("Veroxa | Studio Digitale per Attività Locali", "Veroxa | Digital Studio for Independent Businesses"),
                  description: text("Costruiamo e perfezioniamo siti web per negozi, ristoranti e attività locali, unendo estetica raffinata e risultati tangibili.", "We build and refine websites for independent businesses, bringing thoughtful design and practical results together."),
                }
              : {
                  title: text("Pagina non trovata | Veroxa", "Page not found | Veroxa"),
                  description: text("La pagina richiesta non è stata trovata.", "The page you requested could not be found."),
                };

    document.title = page.title;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute("content", page.description);
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute("content", page.title);
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute("content", page.description);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.setAttribute("content", page.title);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.setAttribute("content", page.description);
  }, [location, text]);

  const openAssistant = () => {
    setAssistantLoaded(true);
    setAssistantOpen(true);
  };

  const closeAssistant = () => {
    setAssistantOpen(false);
    window.requestAnimationFrame(() => {
      document.querySelector<HTMLButtonElement>('[data-testid="button-menu"]')?.focus();
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar onOpenAssistant={openAssistant} />
        <div id="page-content" className="flex-1">
          <Suspense
            fallback={
              <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
                <span className="h-1 w-12 animate-pulse rounded-full bg-primary" aria-hidden="true" />
                <span className="sr-only">{text("Caricamento pagina", "Loading page")}</span>
              </div>
            }
          >
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/chi-siamo" component={ChiSiamo} />
              <Route path="/cosa-facciamo" component={CosaFacciamo} />
              <Route path="/come-funziona" component={ComeFunziona} />
              <Route path="/contatti" component={Contatti} />
              <Route>
                <div className="min-h-screen flex items-center justify-center">
                  <h1 className="text-2xl text-muted-foreground font-light">{text("Pagina non trovata", "Page not found")}</h1>
                </div>
              </Route>
            </Switch>
          </Suspense>
      </div>
      <Footer />
      <CookieConsent />
      {assistantLoaded && (
        <Suspense fallback={null}>
          <AIChatPanel
            open={assistantOpen}
            onClose={closeAssistant}
          />
        </Suspense>
      )}
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  );
}

export default App;
