import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";
import { Logo1, Logo2 } from "@/components/Logos";
import { Link } from "wouter";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-background min-h-screen">
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center gap-6"
            >
              <Logo1 className="w-16 h-16 text-primary" />
              <h1 className="text-4xl tracking-widest font-light text-foreground">VEXORA</h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="w-full">
        {/* HERO */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 relative overflow-hidden">
          {/* Subtle background abstract shape */}
          <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-secondary/30 rounded-full blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-accent/40 rounded-full blur-3xl opacity-50 pointer-events-none" />

          <FadeIn className="flex flex-col items-center text-center z-10" delay={0.5}>
            <span className="text-primary tracking-widest uppercase text-sm mb-6 font-medium">Studio Digitale</span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground max-w-5xl leading-[1.1]">
              Diamo forma alla tua identità online.
            </h2>
            <p className="mt-8 text-xl text-muted-foreground max-w-2xl font-serif font-light leading-relaxed">
              Costruiamo e perfezioniamo siti web per negozi, ristoranti e attività locali, unendo estetica raffinata e risultati tangibili.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-6">
              <Link href="/contatti">
                <span className="px-8 py-4 bg-foreground text-background rounded-full hover:bg-primary transition-colors cursor-pointer text-sm tracking-wide font-medium">
                  Inizia il tuo progetto
                </span>
              </Link>
              <Link href="/recensioni">
                <span className="px-8 py-4 border border-border bg-background rounded-full hover:bg-muted transition-colors cursor-pointer text-sm tracking-wide font-medium">
                  Scopri le recensioni
                </span>
              </Link>
            </div>
          </FadeIn>
        </section>

        {/* COSA FA VEXORA */}
        <section className="py-32 px-6 bg-white relative">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="right">
              <h3 className="text-sm tracking-widest text-primary uppercase font-medium mb-4">Cosa fa Vexora</h3>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-8">
                Non ci limitiamo a creare siti web. Creiamo spazi digitali che respirano.
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground font-serif font-light leading-relaxed">
                <p>
                  Comprendiamo che ogni attività locale — che sia una boutique artigianale, un ristorante ricercato o un negozio storico — possiede un'anima unica.
                </p>
                <p>
                  Vexora traduce quell'anima in un'esperienza digitale. Sviluppiamo piattaforme veloci, eleganti e ottimizzate, progettate non solo per farsi guardare, ma per convertire i visitatori in clienti fedeli.
                </p>
              </div>
            </FadeIn>
            <FadeIn direction="left" delay={0.2} className="relative flex justify-center lg:justify-end">
              <div className="w-full max-w-md aspect-square bg-muted rounded-3xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/40 to-transparent mix-blend-multiply" />
                <div className="absolute inset-0 flex items-center justify-center text-primary/10">
                  <Logo2 className="w-48 h-48 group-hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* COME E' NATA */}
        <section className="py-32 px-6 bg-foreground text-background">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn direction="up">
              <h3 className="text-sm tracking-widest text-primary uppercase font-medium mb-4">Come è nata</h3>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-12">
                Nata dalla passione per i dettagli
              </h2>
              <p className="text-xl text-background/70 font-serif font-light leading-relaxed mb-8 text-left md:text-center">
                Vexora nasce dall'osservazione di una mancanza. Molte realtà locali eccellenti non riuscivano a trasmettere la propria qualità attraverso il web, accontentandosi di soluzioni standardizzate e poco rappresentative.
              </p>
              <p className="text-xl text-background/70 font-serif font-light leading-relaxed text-left md:text-center">
                Abbiamo fondato questo studio con un obiettivo chiaro: portare il livello di cura, dedizione e professionalità del tuo lavoro fisico all'interno del mondo digitale, creando soluzioni sartoriali per ogni cliente.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* COME FUNZIONA */}
        <section className="py-32 px-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <FadeIn direction="up">
              <div className="text-center mb-20">
                <h3 className="text-sm tracking-widest text-primary uppercase font-medium mb-4">Il nostro metodo</h3>
                <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">
                  Come funziona
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connector line */}
              <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-border" />
              
              {[
                {
                  step: "01",
                  title: "Incontro & Visione",
                  desc: "Ascoltiamo la tua storia. Analizziamo le tue necessità e definiamo insieme gli obiettivi del progetto per garantire un risultato allineato alla tua identità."
                },
                {
                  step: "02",
                  title: "Progettazione & Sviluppo",
                  desc: "I nostri designer e sviluppatori danno vita al progetto. Curiamo ogni dettaglio, dalla tipografia all'esperienza utente, garantendo prestazioni eccellenti."
                },
                {
                  step: "03",
                  title: "Lancio & Supporto",
                  desc: "Pubblichiamo il sito e ti accompagniamo nelle fasi successive. Rimaniamo al tuo fianco per assicurarci che la tua presenza online continui a crescere."
                }
              ].map((item, i) => (
                <FadeIn key={i} delay={0.1 * i} direction="up" className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-background border border-border flex items-center justify-center mb-8 shadow-sm">
                    <span className="text-2xl font-light text-primary">{item.step}</span>
                  </div>
                  <h4 className="text-2xl font-medium mb-4">{item.title}</h4>
                  <p className="text-muted-foreground font-serif font-light leading-relaxed">
                    {item.desc}
                  </p>
                </FadeIn>
              ))}
            </div>
            
            <FadeIn delay={0.4} direction="up" className="mt-24 text-center">
              <Link href="/contatti">
                <span className="inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors font-medium border-b border-primary hover:border-foreground pb-1 cursor-pointer">
                  Prenota una consulenza gratuita
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>
    </div>
  );
}
