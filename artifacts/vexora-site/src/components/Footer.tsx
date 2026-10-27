import { Logo3 } from "@/components/Logos";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { openCookiePreferences } from "@/components/CookieConsent";
import { useLanguage } from "@/components/LanguageContext";

export function Footer() {
  const { text } = useLanguage();
  return (
    <footer id="site-footer" className="bg-footer-background text-footer-foreground py-14 px-6 md:py-20 md:px-12 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-t-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 relative z-10">
        <div className="md:col-span-5 flex flex-col gap-7 md:gap-10">
          <Link href="/">
            <div className="cursor-pointer w-fit">
              <Logo3 className="h-10 md:h-12 text-footer-foreground origin-left scale-100" />
            </div>
          </Link>
          <p className="text-footer-foreground/70 max-w-sm font-sans font-light text-lg leading-relaxed">
            {text("Siamo l'atelier digitale che affianca negozi, ristoranti e botteghe nel costruire una presenza online solida, elegante e inconfondibile. Diamo alle idee una forma capace di parlare alle persone giuste.", "We are a digital atelier helping shops, restaurants and independent businesses build a distinctive, elegant online presence. We give ideas a shape that speaks to the right people.")}
          </p>
          <a
            href="mailto:info.veroxa@gmail.com"
            className="text-footer-foreground/80 font-sans font-light text-lg hover:text-primary transition-colors w-fit"
          >
            info.veroxa@gmail.com
          </a>
        </div>
        
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-16 md:justify-items-end">
          <div className="flex flex-col gap-4 md:gap-6">
            <span className="font-medium text-footer-foreground/40 tracking-[0.2em] text-xs uppercase font-sans">{text("Navigazione", "Navigation")}</span>
            <Link href="/chi-siamo"><span className="text-xl font-serif hover:text-primary transition-colors font-light cursor-pointer">{text("Chi siamo", "About us")}</span></Link>
            <Link href="/cosa-facciamo"><span className="text-xl font-serif hover:text-primary transition-colors font-light cursor-pointer">{text("Cosa facciamo", "What we do")}</span></Link>
            <Link href="/come-funziona"><span className="text-xl font-serif hover:text-primary transition-colors font-light cursor-pointer">{text("Come funziona", "How it works")}</span></Link>
            <Link href="/contatti"><span className="text-xl font-serif hover:text-primary transition-colors font-light cursor-pointer">{text("Contatti", "Contact")}</span></Link>
          </div>
          <div className="flex flex-col gap-4 md:gap-6">
            <span className="font-medium text-footer-foreground/40 tracking-[0.2em] text-xs uppercase font-sans">{text("Il progetto", "The project")}</span>
            <p className="text-footer-foreground/60 font-sans font-light leading-relaxed max-w-xs text-sm">
              {text("Veroxa nasce per dare a negozi, ristoranti e botteghe una presenza online che rispecchi chi sono. Un progetto chiaro e pensato per essere utile ogni giorno.", "Veroxa helps shops, restaurants and independent businesses build an online presence that reflects who they are — clear, thoughtful and useful every day.")}
            </p>
            <Link href="/contatti">
              <span className="text-xl font-serif hover:text-primary transition-colors font-light cursor-pointer flex items-center gap-2 group">
                {text("Inizia ora", "Get started")}
                <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
              </span>
            </Link>
            <button
              type="button"
              onClick={openCookiePreferences}
              className="w-fit text-left text-sm text-footer-foreground/60 underline decoration-footer-foreground/20 underline-offset-4 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              data-testid="button-footer-cookie-preferences"
            >
              {text("Preferenze cookie", "Cookie preferences")}
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-14 md:mt-20 pt-6 md:pt-8 border-t border-footer-foreground/15 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-center md:text-left text-xs font-sans text-footer-foreground/40 tracking-wider">
        <p>&copy; {new Date().getFullYear()} Veroxa Studio. {text("Tutti i diritti riservati.", "All rights reserved.")}</p>
        <p>{text("Progettato con dedizione in Italia.", "Thoughtfully designed in Italy.")}</p>
      </div>
    </footer>
  );
}
