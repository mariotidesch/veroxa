import { FadeIn } from "@/components/FadeIn";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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

    const subject = `Richiesta di contatto Veroxa — ${name}`;
    const bodyLines = [
      `Nome: ${name}`,
      company ? `Attività: ${company}` : null,
      `Email: ${email}`,
      "",
      "Messaggio:",
      message,
    ].filter((line): line is string => line !== null);

    window.location.href = `mailto:info.veroxa@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
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
        <PageHero label="Contatti" title="Parliamo del tuo progetto." description="Raccontaci la tua idea: ascoltiamo obiettivi e desideri per trovare insieme la strada giusta." />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          <div className="lg:col-span-5">
            <FadeIn direction="right">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-primary" />
                <span className="text-primary tracking-[0.2em] uppercase text-xs font-sans font-medium">Contatti</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-light tracking-tight mb-8 leading-[1.1]">
                Iniziamo a<br/>
                costruire<br/>
                <span className="italic text-muted-foreground">qualcosa di tuo.</span>
              </h1>
              <p className="text-xl text-foreground/70 font-sans font-light leading-relaxed mb-16">
                Siamo disponibili per ascoltare le tue idee e trasformarle in una presenza online solida, bella e professionale. Il confronto ci aiuta a costruire una proposta adatta a te.
              </p>

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
                      Abbiamo preparato la richiesta con i dati inseriti. Controllate i dettagli e confermate l'invio per completare il contatto.
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
                      Inserite un indirizzo email valido per poter ricevere una risposta.
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