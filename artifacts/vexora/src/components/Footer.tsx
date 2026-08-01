import { Logo3 } from "@/components/Logos";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="flex flex-col gap-6">
          <Logo3 className="h-10 md:h-12 text-background origin-left scale-100" />
          <p className="text-muted-foreground max-w-sm font-serif font-light text-lg">
            Siamo al fianco di negozi, ristoranti e attività locali per costruire una presenza digitale solida e professionale.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-12 md:gap-24">
          <div className="flex flex-col gap-4">
            <span className="font-medium text-white/50 tracking-wider text-sm uppercase">Menu</span>
            <Link href="/"><span className="hover:text-primary transition-colors font-light cursor-pointer">Home</span></Link>
            <Link href="/recensioni"><span className="hover:text-primary transition-colors font-light cursor-pointer">Recensioni</span></Link>
            <Link href="/contatti"><span className="hover:text-primary transition-colors font-light cursor-pointer">Contatti</span></Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-medium text-white/50 tracking-wider text-sm uppercase">Social</span>
            <a href="#" className="hover:text-primary transition-colors font-light">Instagram</a>
            <a href="#" className="hover:text-primary transition-colors font-light">LinkedIn</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
        <p>&copy; {new Date().getFullYear()} Vexora Studio. Tutti i diritti riservati.</p>
        <p>P.IVA 01234567890</p>
      </div>
    </footer>
  );
}
