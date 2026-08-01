import { Logo3 } from "@/components/Logos";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-t-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 relative z-10">
        <div className="md:col-span-5 flex flex-col gap-10">
          <Link href="/">
            <div className="cursor-pointer w-fit">
              <Logo3 className="h-10 md:h-12 text-background origin-left scale-100" />
            </div>
          </Link>
          <p className="text-background/70 max-w-sm font-sans font-light text-lg leading-relaxed">
            Siamo l'atelier digitale che affianca negozi, ristoranti e botteghe nel costruire una presenza online solida, elegante e inconfondibile.
          </p>
          <div className="flex flex-col gap-2 font-sans font-light text-background/80 mt-4">
            <a href="mailto:m.mariotedeschi@gmail.com" className="hover:text-primary transition-colors flex items-center gap-2 group w-fit">
              m.mariotedeschi@gmail.com
              <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
            </a>
            <a href="tel:+393313830350" className="hover:text-primary transition-colors w-fit">
              +39 331 383 0350
            </a>
          </div>
        </div>
        
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-16 md:justify-items-end">
          <div className="flex flex-col gap-6">
            <span className="font-medium text-background/40 tracking-[0.2em] text-xs uppercase font-sans">Navigazione</span>
            <Link href="/chi-siamo"><span className="text-xl font-serif hover:text-primary transition-colors font-light cursor-pointer">Chi Siamo</span></Link>
            <Link href="/cosa-facciamo"><span className="text-xl font-serif hover:text-primary transition-colors font-light cursor-pointer">Cosa Facciamo</span></Link>
            <Link href="/come-funziona"><span className="text-xl font-serif hover:text-primary transition-colors font-light cursor-pointer">Come Funziona</span></Link>
            <Link href="/contatti"><span className="text-xl font-serif hover:text-primary transition-colors font-light cursor-pointer">Contatti</span></Link>
          </div>
          <div className="flex flex-col gap-6">
            <span className="font-medium text-background/40 tracking-[0.2em] text-xs uppercase font-sans">Connessioni</span>
            <a href="#" className="text-xl font-serif hover:text-primary transition-colors font-light flex items-center gap-2 group">
              Instagram
              <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
            </a>
            <a href="#" className="text-xl font-serif hover:text-primary transition-colors font-light flex items-center gap-2 group">
              LinkedIn
              <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-32 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-background/40 tracking-wider">
        <p>&copy; {new Date().getFullYear()} Veroxa Studio. Tutti i diritti riservati.</p>
        <p>Progettato con dedizione in Italia.</p>
      </div>
    </footer>
  );
}
