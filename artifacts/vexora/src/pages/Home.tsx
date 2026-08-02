import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";
import { Logo1 } from "@/components/Logos";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Apertura breve, con animazione ancora leggibile
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, reducedMotion ? 0 : 1450);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-background min-h-screen flex flex-col">
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] as const }}
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
            
            <div className="flex flex-col items-center gap-10 relative z-10">
              <Logo1 className="w-24 h-24 text-foreground" animated={!reducedMotion} />
              <motion.h1 
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.45, delay: 0.35, ease: "easeOut" as const }}
                className="text-3xl md:text-4xl tracking-[0.3em] font-serif font-light text-foreground ml-3"
              >
                VEXORA
              </motion.h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="w-full relative flex-1 flex flex-col">
        {/* HERO */}
        <section className="flex-1 flex flex-col justify-center px-6 md:px-12 pt-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none -z-10">
            <div className="x-visual x-grid" />
            <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-accent/30 rounded-full blur-[120px] opacity-60" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-secondary/40 rounded-full blur-[100px] opacity-60" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10 py-20">
            <FadeIn delay={0.5} className="flex flex-col md:w-3/4">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-primary" />
                <span className="text-primary tracking-[0.2em] uppercase text-xs font-sans font-medium">L'Atelier Digitale</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-serif font-light tracking-tight text-foreground leading-[1.05]">
                Diamo forma <br />
                all'<span className="italic text-primary/90">anima digitale</span><br />
                della tua impresa.
              </h2>
              
              <p className="mt-10 text-xl md:text-2xl text-muted-foreground max-w-2xl font-sans font-light leading-relaxed">
                Progettiamo architetture web per botteghe, ristoranti e realtà artigianali. Un'unione perfetta tra eleganza visiva e precisione tecnica, per riflettere online la cura che metti nel tuo lavoro.
              </p>
              
              <div className="mt-16 flex flex-col sm:flex-row gap-6">
                <Link href="/contatti">
                  <div className="group relative px-8 py-5 bg-foreground text-background rounded-full cursor-pointer overflow-hidden flex items-center justify-center gap-3 w-fit">
                    <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                    <span className="relative z-10 text-sm tracking-[0.1em] uppercase font-sans font-medium">Inizia il progetto</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
        <section className="relative px-6 md:px-12 py-28 md:py-40 bg-secondary/20 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="grid lg:grid-cols-[.7fr_1.3fr] gap-14 items-start">
              <div>
                <span className="eyebrow">Dove nasce Vexora</span>
                <h2 className="mt-5 text-4xl md:text-6xl font-light leading-tight">Ogni progetto nasce da un <span className="italic text-primary">incontro.</span></h2>
              </div>
              <div className="relative">
                <div className="absolute -top-20 right-0 text-[18rem] leading-none font-serif text-primary/10 select-none">X</div>
                <p className="relative text-lg md:text-xl leading-relaxed text-foreground/75 max-w-2xl">La X di Vexora rappresenta il punto in cui due strade si incrociano. Da una parte ci sono le idee, la creatività e la volontà di raccontare ciò che rende unica ogni attività. Dall’altra ci sono la tecnologia, lo sviluppo e gli strumenti che permettono a quelle idee di diventare qualcosa di concreto.</p>
                <div className="relative grid sm:grid-cols-2 gap-4 mt-12">
                  <div className="rounded-2xl border border-primary/20 bg-background/70 p-6"><span className="eyebrow">01</span><h3 className="mt-3 text-2xl font-serif">Idee e creatività</h3></div>
                  <div className="rounded-2xl border border-primary/20 bg-background/70 p-6"><span className="eyebrow">02</span><h3 className="mt-3 text-2xl font-serif">Tecnologia e sviluppo</h3></div>
                </div>
                <p className="mt-12 text-2xl md:text-3xl font-serif leading-snug">Vexora nasce esattamente lì: nel punto in cui creatività e tecnologia si incontrano per costruire esperienze digitali semplici, veloci ed efficaci.</p>
                <p className="mt-8 text-muted-foreground leading-relaxed">La X è il simbolo del nostro modo di lavorare: mettere in relazione identità e innovazione, estetica e funzionalità, obiettivi commerciali ed esperienza dell’utente.</p>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
    </div>
  );
}
