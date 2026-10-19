import { Logo3 } from "@/components/Logos";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-20 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-t-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
        <div className="md:col-span-5 flex flex-col gap-10">
          <Link href="/">
            <div className="cursor-pointer w-fit">
              <Logo3 className="h-10 md:h-12 text-background origin-left scale-100" />
            </div>
          </Link>
          <p className="text-background/70 max-w-sm font-sans font-light text-lg leading-relaxed">
            Siamo l'atelier digitale che affianca negozi, ristoranti e botteghe nel costruire una presenza online solida, elegante e inconfondibile. Diamo alle idee una forma capace di parlare alle persone giuste.
          </p>
          <a
            href="mailto:info.veroxa@gmail.com"
            className="text-background/80 font-sans font-light text-lg hover:text-primary transition-colors w-fit"
          >
            info.veroxa@gmail.com
          </a>
        </div>
        
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-16 md:justify-items-end">
          <div className="flex flex-col gap-6">
            <span className="font-medium text-background/40 tracking-[0.2em] text-xs uppercase font-sans">Navigazione</span>
            <Link href="/chi-siamo"><span className="text-xl font-serif hover:text-primary transition-colors font-light cursor-pointer">Chi Siamo</span></Link>
            <Link href="/cosa-facciamo"><span className="text-xl font-serif hover:text-primary transition-colors font-light cursor-pointer">Cosa Facciamo</span></Link>
            <Link href="/come-funziona"><span className="text-xl font-serif hover:text-primary transition-colors font-light cursor-pointer">Come Funziona</span></Link>
            <Link href="/progetti"><span className="text-xl font-serif hover:text-primary transition-colors font-light cursor-pointer">Galleria</span></Link>
            <Link href="/contatti"><span className="text-xl font-serif hover:text-primary transition-colors font-light cursor-pointer">Contatti</span></Link>
          </div>
          <div className="flex flex-col gap-6">
            <span className="font-medium text-background/40 tracking-[0.2em] text-xs uppercase font-sans">Il progetto</span>
            <p className="text-background/60 font-sans font-light leading-relaxed max-w-xs text-sm">
              Veroxa nasce per dare a negozi, ristoranti e botteghe una presenza online che rispecchi chi sono. Un progetto chiaro e pensato per essere utile ogni giorno.
            </p>
            <Link href="/contatti">
              <span className="text-xl font-serif hover:text-primary transition-colors font-light cursor-pointer flex items-center gap-2 group">
                Inizia ora
                <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
              </span>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-background/15 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-background/40 tracking-wider">
        <p>&copy; {new Date().getFullYear()} Veroxa Studio. Tutti i diritti riservati.</p>
        <p>Progettato con dedizione in Italia.</p>
      </div>
    </footer>
  );
}
