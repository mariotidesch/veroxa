import { FadeIn } from "@/components/FadeIn";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo2 } from "@/components/Logos";
import { motion } from "framer-motion";

export default function Contatti() {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const company = String(data.get("company") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = `Richiesta dal sito Vexora — ${name}`;
    const bodyLines = [
      `Nome: ${name}`,
      company ? `Attività: ${company}` : null,
      `Email: ${email}`,
      "",
      message,
    ].filter((line): line is string => line !== null);

    window.location.href = `mailto:info@vexora.it?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 8000);
  };

  return (
    <div className="w-full bg-background min-h-screen pt-32 pb-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl opacity-60 pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      
      <main className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          <FadeIn direction="right">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8 leading-tight">
              Iniziamo un <br/>
              <span className="text-primary italic font-serif">nuovo progetto</span> <br/>
              insieme.
            </h1>
            <p className="text-xl text-muted-foreground font-serif font-light leading-relaxed mb-12">
              Siamo qui per ascoltare le tue idee e trasformarle in una realtà digitale solida e professionale. Compila il modulo o utilizza i nostri recapiti diretti.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1">Email</h4>
                  <a href="mailto:info@vexora.it" className="text-muted-foreground hover:text-primary transition-colors font-serif">
                    info@vexora.it
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/50 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1">Telefono</h4>
                  <a href="tel:+390212345678" className="text-muted-foreground hover:text-primary transition-colors font-serif">
                    +39 02 1234 5678
                  </a>
                  <p className="text-sm text-muted-foreground/60 mt-1">Lun - Ven, 9:00 - 18:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1">Sede</h4>
                  <p className="text-muted-foreground font-serif">
                    Via dell'Innovazione 42<br />
                    20100 Milano, Italia
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-muted-foreground/20">
              <Logo2 className="w-24 h-24" />
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2} className="bg-card border border-border p-8 md:p-12 rounded-3xl shadow-sm">
            <h3 className="text-2xl font-medium mb-8">Inviaci un messaggio</h3>
            
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-secondary/30 text-secondary-foreground p-8 rounded-2xl flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-xl font-medium mb-2">Messaggio pronto!</h4>
                <p className="font-serif text-secondary-foreground/80">
                  Si è aperto il tuo programma di posta con la richiesta già compilata: controlla e premi Invia. Grazie per averci contattato.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">Nome completo</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      required
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-serif"
                      placeholder="Mario Rossi"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium text-foreground">Attività (Opzionale)</label>
                    <input 
                      type="text" 
                      id="company"
                      name="company"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-serif"
                      placeholder="La tua attività"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    required
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-serif"
                    placeholder="mario@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">Messaggio</label>
                  <textarea 
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-serif resize-none"
                    placeholder="Raccontaci del tuo progetto..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-foreground text-background rounded-xl py-4 font-medium tracking-wide hover:bg-primary transition-colors flex items-center justify-center gap-2"
                >
                  Invia richiesta
                </button>
                <p className="text-xs text-muted-foreground text-center font-serif mt-4">
                  Inviando questo modulo accetti il trattamento dei dati personali.
                </p>
              </form>
            )}
          </FadeIn>
        </div>
      </main>
    </div>
  );
}
