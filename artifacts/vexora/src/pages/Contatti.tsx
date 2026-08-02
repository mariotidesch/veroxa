import { FadeIn } from "@/components/FadeIn";
import { useEffect, useRef, useState } from "react";
import { Mail, Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import { Logo2 } from "@/components/Logos";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";

export default function Contatti() {
  const [isSuccess, setIsSuccess] = useState(false);
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (successTimer.current) clearTimeout(successTimer.current);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const company = String(data.get("company") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = `Richiesta di contatto Vexora — ${name}`;
    const bodyLines = [
      `Nome: ${name}`,
      company ? `Attività: ${company}` : null,
      `Email: ${email}`,
      "",
      "Messaggio:",
      message,
    ].filter((line): line is string => line !== null);

    window.location.href = `mailto:m.mariotedeschi@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    setIsSuccess(true);
    if (successTimer.current) clearTimeout(successTimer.current);
    successTimer.current = setTimeout(() => setIsSuccess(false), 8000);
  };

  return (
    <div className="w-full bg-background min-h-screen pt-40 pb-20 relative overflow-hidden">
      {/* Soft abstract background blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-secondary/30 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-accent/30 rounded-full blur-[100px] opacity-50 pointer-events-none" />
      
      <main className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <PageHero label="Contatti" title="Il prossimo incrocio può essere il tuo progetto." description="Raccontaci la tua idea: ascoltiamo intuizioni, obiettivi e ambizioni per costruire insieme la direzione giusta." />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          <div className="lg:col-span-5">
            <FadeIn direction="right">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-primary" />
                <span className="text-primary tracking-[0.2em] uppercase text-xs font-sans font-medium">Contatti</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-light tracking-tight mb-8 leading-[1.1]">
                Diamo inizio <br/>
                a una nuova <br/>
                <span className="italic text-muted-foreground">narrazione digitale.</span>
              </h1>
              <p className="text-xl text-foreground/70 font-sans font-light leading-relaxed mb-16">
                Siamo a vostra completa disposizione per ascoltare le vostre intuizioni e trasformarle in una presenza online solida, elegante e professionale. 
              </p>

              <div className="space-y-10">
                <div className="group flex items-start gap-6 cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-white border border-border flex items-center justify-center shrink-0 group-hover:border-primary transition-colors shadow-sm">
                    <Mail className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="pt-1">
                    <h4 className="font-sans font-medium text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">Posta Elettronica</h4>
                    <a href="mailto:m.mariotedeschi@gmail.com" className="text-xl font-serif text-foreground hover:text-primary transition-colors">
                      m.mariotedeschi@gmail.com
                    </a>
                  </div>
                </div>

                <div className="group flex items-start gap-6 cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-white border border-border flex items-center justify-center shrink-0 group-hover:border-primary transition-colors shadow-sm">
                    <Phone className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="pt-1">
                    <h4 className="font-sans font-medium text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">Recapito Telefonico</h4>
                    <a href="tel:+393313830350" className="text-xl font-serif text-foreground hover:text-primary transition-colors block">
                      +39 331 383 0350
                    </a>
                    <p className="text-sm font-sans font-light text-muted-foreground mt-2">Lun - Ven, 9:00 - 18:00</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-24 opacity-20 hidden lg:block">
                <Logo2 className="w-32 h-32" />
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-7">
            <FadeIn direction="up" delay={0.2}>
              <div className="bg-white border border-border p-10 md:p-16 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">
                <h3 className="text-3xl font-serif font-light mb-10 text-foreground">Inviateci un messaggio</h3>
                
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-secondary/20 border border-secondary/30 p-10 rounded-[2rem] flex flex-col items-center text-center py-16"
                  >
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm text-primary">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-serif font-medium mb-4">La bozza è pronta</h4>
                    <p className="font-sans font-light text-foreground/70 text-lg max-w-md">
                      Abbiamo aperto il vostro programma di posta con la richiesta precompilata. Controllate e premete invio. Grazie per averci contattato.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label htmlFor="name" className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">Nome e Cognome</label>
                        <input 
                          type="text" 
                          id="name"
                          name="name"
                          required
                          className="w-full bg-background/50 border-b-2 border-border px-0 py-3 focus:outline-none focus:border-primary transition-colors font-serif text-lg bg-transparent"
                          placeholder="Mario Rossi"
                        />
                      </div>
                      <div className="space-y-3">
                        <label htmlFor="company" className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">La vostra Attività</label>
                        <input 
                          type="text" 
                          id="company"
                          name="company"
                          className="w-full bg-background/50 border-b-2 border-border px-0 py-3 focus:outline-none focus:border-primary transition-colors font-serif text-lg bg-transparent"
                          placeholder="Nome dell'impresa"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="email" className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">Indirizzo Email</label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        required
                        className="w-full bg-background/50 border-b-2 border-border px-0 py-3 focus:outline-none focus:border-primary transition-colors font-serif text-lg bg-transparent"
                        placeholder="mario@esempio.it"
                      />
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="message" className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">Il vostro progetto</label>
                      <textarea 
                        id="message"
                        name="message"
                        required
                        rows={4}
                        className="w-full bg-background/50 border-b-2 border-border px-0 py-3 focus:outline-none focus:border-primary transition-colors font-serif text-lg bg-transparent resize-none"
                        placeholder="Descrivete brevemente le vostre esigenze..."
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full group relative px-8 py-5 bg-foreground text-background rounded-full overflow-hidden flex items-center justify-center gap-3 mt-10"
                    >
                      <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                      <span className="relative z-10 text-sm tracking-[0.1em] uppercase font-sans font-medium">Invia richiesta</span>
                      <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-xs text-muted-foreground text-center font-sans mt-6">
                      L'invio di questo modulo è gestito tramite il vostro client di posta predefinito.
                    </p>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </main>
    </div>
  );
}