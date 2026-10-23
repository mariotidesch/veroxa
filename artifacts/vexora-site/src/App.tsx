import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { lazy, Suspense, useEffect, useState } from 'react';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';

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
                <span className="sr-only">Caricamento pagina</span>
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
                  <h1 className="text-2xl text-muted-foreground font-light">Pagina non trovata</h1>
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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
