import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, FadeInItem } from "@/components/FadeIn";
import { Logo1, Logo2 } from "@/components/Logos";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

import cafeImg from "@assets/generated_images/modern-cafe.jpg";
import boutiqueImg from "@assets/generated_images/artisan-boutique.jpg";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // 3 seconds choreographed welcome screen
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-background min-h-screen">
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
            
            <div className="flex flex-col items-center gap-10 relative z-10">
              <Logo1 className="w-20 h-20 text-foreground" animated={true} />
              <motion.h1 
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
                className="text-3xl md:text-4xl tracking-[0.3em] font-serif font-light text-foreground ml-3"
              >
                VEXORA
              </motion.h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="w-full relative">
        {/* HERO */}
        <section className="min-h-[100dvh] flex flex-col justify-center px-6 md:px-12 pt-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-accent/30 rounded-full blur-[120px] opacity-60" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-secondary/40 rounded-full blur-[100px] opacity-60" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10 pt-20">
            <FadeIn delay={0.5} className="flex flex-col md:w-3/4">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-primary" />
                <span className="text-primary tracking-[0.2em] uppercase text-xs font-sans font-medium">L'Atelier Digitale</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif font-light tracking-tight text-foreground leading-[1.05]">
                Diamo forma <br />
                all'<span className="italic text-primary/90">anima digitale</span><br />
                della tua impresa.
              </h2>
              
              <p className="mt-10 text-xl md:text-2xl text-muted-foreground max-w-2xl font-sans font-light leading-relaxed">
                Progettiamo architetture web per botteghe, ristoranti e realtà artigianali. Un'unione perfetta tra eleganza visiva e precisione tecnica, per riflettere online la cura che metti nel tuo lavoro.
              </p>
              
              <div className="mt-16 flex flex-col sm:flex-row gap-6">
                <Link href="/contatti">
                  <div className="group relative px-8 py-5 bg-foreground text-background rounded-full cursor-pointer overflow-hidden flex items-center justify-center gap-3">
                    <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                    <span className="relative z-10 text-sm tracking-[0.1em] uppercase font-sans font-medium">Inizia il progetto</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
                <Link href="/recensioni">
                  <div className="group px-8 py-5 border border-border bg-transparent rounded-full cursor-pointer flex items-center justify-center hover:bg-muted/50 transition-colors">
                    <span className="text-sm tracking-[0.1em] uppercase font-sans font-medium text-foreground">Esplora i lavori</span>
                  </div>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* COSA FA VEXORA */}
        <section className="py-32 px-6 md:px-12 bg-white relative">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="right">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-primary tracking-[0.2em] text-xs uppercase font-sans font-medium">La nostra vocazione</span>
                <div className="w-12 h-[1px] bg-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight leading-[1.1] mb-10">
                Oltre la superficie.<br/>
                <span className="italic text-muted-foreground">Spazi digitali che respirano.</span>
              </h2>
              <div className="space-y-8 text-lg text-foreground/70 font-sans font-light leading-relaxed">
                <p>
                  Comprendiamo profondamente che ogni attività locale — dalla boutique ricercata all'osteria storica — possiede un carattere inconfondibile, forgiato in anni di dedizione.
                </p>
                <p>
                  In Vexora, traduciamo quell'identità in un'esperienza digitale su misura. Sviluppiamo piattaforme agili, luminose e curate in ogni minimo dettaglio, concepite per incantare lo sguardo e convertire i visitatori in clienti fidelizzati. Non costruiamo semplici siti, ma vere e proprie estensioni del vostro spazio fisico.
                </p>
              </div>
            </FadeIn>
            <FadeIn direction="left" delay={0.2} className="relative flex justify-center w-full h-[500px] md:h-[600px] mt-12 lg:mt-0">
              <div className="absolute top-0 right-0 w-[80%] h-[80%] rounded-3xl overflow-hidden shadow-2xl">
                <img src={boutiqueImg} alt="Dettaglio artigianale" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-foreground/10 mix-blend-overlay" />
              </div>
              <div className="absolute bottom-0 left-0 w-[60%] h-[50%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img src={cafeImg} alt="Atmosfera locale" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-sm group transition-all duration-700 hover:backdrop-blur-none">
                  <Logo2 className="w-24 h-24 md:w-32 md:h-32 text-white drop-shadow-lg group-hover:opacity-0 transition-opacity duration-700" />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* COME E' NATA */}
        <section className="py-32 px-6 md:px-12 bg-foreground text-background relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <FadeIn direction="up">
              <span className="text-background/50 tracking-[0.2em] text-xs uppercase font-sans font-medium mb-6 block">Le nostre origini</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight leading-[1.1] mb-12">
                L'arte dell'ospitalità,<br/>
                <span className="italic text-primary/80">estesa al digitale.</span>
              </h2>
              <div className="space-y-8 text-xl md:text-2xl text-background/80 font-sans font-light leading-relaxed">
                <p>
                  Vexora ha preso forma da una constatazione: troppe eccellenze locali faticavano a trasmettere la propria qualità attraverso il web, finendo per adottare soluzioni anonime e standardizzate.
                </p>
                <p>
                  Abbiamo fondato questo studio con un mandato preciso: elevare la presenza digitale delle imprese italiane, portando online la stessa dedizione, cura e attenzione ai dettagli che caratterizzano il vostro lavoro quotidiano.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* COME FUNZIONA */}
        <section className="py-32 px-6 md:px-12 bg-background relative">
          <div className="max-w-7xl mx-auto">
            <FadeIn direction="up">
              <div className="flex flex-col items-center text-center mb-24">
                <span className="text-primary tracking-[0.2em] text-xs uppercase font-sans font-medium mb-6 block">Il metodo Vexora</span>
                <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight leading-tight">
                  Una procedura sartoriale
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[1px] bg-border" />
              
              <FadeIn staggerChildren={true} direction="none" className="grid grid-cols-1 md:grid-cols-3 gap-16 col-span-3">
                {[
                  {
                    step: "01",
                    title: "Ascolto & Visione",
                    desc: "Iniziamo con un incontro conoscitivo. Ascoltiamo la vostra storia, studiamo il vostro posizionamento e definiamo con chiarezza gli obiettivi del progetto, per assicurare una direzione stilistica impeccabile."
                  },
                  {
                    step: "02",
                    title: "Sartoria Digitale",
                    desc: "I nostri designer e sviluppatori modellano l'infrastruttura. Ogni componente, dalla selezione tipografica alle micro-interazioni, viene cesellato per offrire un'esperienza utente fluida e appagante."
                  },
                  {
                    step: "03",
                    title: "Varo & Affiancamento",
                    desc: "Pubblichiamo la piattaforma e vi guidiamo nei primi passi. Rimaniamo al vostro fianco per monitorare le prestazioni e assicurare che il vostro spazio digitale continui a prosperare nel tempo."
                  }
                ].map((item, i) => (
                  <FadeInItem key={i} className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="w-24 h-24 rounded-full bg-white border border-border flex items-center justify-center mb-10 shadow-sm relative group overflow-hidden">
                      <div className="absolute inset-0 bg-secondary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                      <span className="text-2xl font-serif font-light text-foreground relative z-10 group-hover:text-secondary-foreground transition-colors">{item.step}</span>
                    </div>
                    <h4 className="text-2xl font-serif font-medium mb-4">{item.title}</h4>
                    <p className="text-muted-foreground font-sans font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </FadeInItem>
                ))}
              </FadeIn>
            </div>
            
            <FadeIn delay={0.4} direction="up" className="mt-32 flex justify-center">
              <Link href="/contatti">
                <div className="group cursor-pointer flex flex-col items-center">
                  <span className="text-lg font-serif font-light text-foreground group-hover:text-primary transition-colors mb-2">
                    Prenota una consulenza dedicata
                  </span>
                  <div className="w-12 h-[1px] bg-foreground group-hover:w-24 group-hover:bg-primary transition-all duration-500" />
                </div>
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>
    </div>
  );
}