import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { useEffect } from 'react';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

import Home from '@/pages/Home';
import Recensioni from '@/pages/Recensioni';
import Contatti from '@/pages/Contatti';

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
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <div className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/recensioni" component={Recensioni} />
          <Route path="/contatti" component={Contatti} />
          <Route>
            <div className="min-h-screen flex items-center justify-center">
              <h1 className="text-2xl text-muted-foreground font-light">Pagina non trovata</h1>
            </div>
          </Route>
        </Switch>
      </div>
      <Footer />
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
