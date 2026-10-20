import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/FadeIn";
import { Logo1 } from "@/components/Logos";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, MonitorSmartphone, Play, RefreshCw, Search } from "lucide-react";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedGoal, setSelectedGoal] = useState("new-site");
  const reducedMotion = useReducedMotion();
  const goals = [
    {
      id: "new-site",
      label: "Creare un sito",
      icon: <MonitorSmartphone className="h-5 w-5" aria-hidden="true" />,
      title: "Una presenza digitale chiara, da zero.",
      description: "Progettiamo un sito su misura per raccontare la tua attività e renderla semplice da scoprire da qualsiasi dispositivo.",
      contactMessage: "Vorrei creare un nuovo sito per la mia attività.",
    },
    {
      id: "restyling",
      label: "Rinnovare il sito",
      icon: <RefreshCw className="h-5 w-5" aria-hidden="true" />,
      title: "Facciamo evolvere quello che hai già.",
      description: "Rivediamo struttura, grafica e contenuti per rendere il sito più attuale e più semplice da usare.",
      contactMessage: "Vorrei rinnovare il sito che ho già.",
    },
    {
      id: "visibility",
      label: "Aumentare la visibilità",
      icon: <Search className="h-5 w-5" aria-hidden="true" />,
      title: "Fatti trovare dalle persone giuste.",
      description: "Miglioriamo contenuti e basi SEO per aiutare le persone a capire cosa offri e come contattarti.",
      contactMessage: "Vorrei migliorare la visibilità online della mia attività.",
    },
  ];
  const activeGoal = goals.find((goal) => goal.id === selectedGoal) ?? goals[0];

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
                VEROXA
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
                all'<span className="italic text-primary/90">identità digitale</span><br />
                della tua attività.
              </h2>
              
              <p className="mt-10 text-xl md:text-2xl text-muted-foreground max-w-2xl font-sans font-light leading-relaxed">
                Creiamo siti web per negozi, ristoranti e botteghe. Uniamo estetica e tecnica per mostrare online la stessa cura che metti ogni giorno nel tuo lavoro, con un'esperienza chiara per chi ti scopre.
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
                <span className="eyebrow">Dove nasce Veroxa</span>
                <h2 className="mt-5 text-4xl md:text-6xl font-light leading-tight">Ogni progetto nasce da un <span className="italic text-primary">incontro.</span></h2>
                {/* Logo mark decorativo */}
                <div className="mt-10 opacity-20">
                  <Logo1 className="w-16 h-16 text-primary" animated={false} />
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-20 right-0 text-[18rem] leading-none font-serif text-primary/10 select-none">X</div>
                <p className="relative text-lg md:text-xl leading-relaxed text-foreground/75 max-w-2xl">La X di Veroxa è il punto in cui due strade si incontrano. Da un lato ci sono le idee e il desiderio di raccontare ciò che rende speciale ogni attività. Dall'altro ci sono tecnologia e sviluppo, che trasformano quelle idee in qualcosa di concreto e visibile.</p>
                <div className="relative grid sm:grid-cols-2 gap-4 mt-12">
                  <div className="rounded-2xl border border-primary/20 bg-background/70 p-6">
                    <span className="eyebrow">01</span>
                    <h3 className="mt-3 text-2xl font-serif">Idee e creatività</h3>
                    <p className="mt-2 text-sm text-muted-foreground font-light">La storia e lo stile della tua attività, tradotti in una presenza riconoscibile.</p>
                  </div>
                  <div className="rounded-2xl border border-primary/20 bg-background/70 p-6">
                    <span className="eyebrow">02</span>
                    <h3 className="mt-3 text-2xl font-serif">Tecnologia e sviluppo</h3>
                    <p className="mt-2 text-sm text-muted-foreground font-light">Gli strumenti tecnici che danno forma al sito e lo rendono semplice da usare.</p>
                  </div>
                </div>
                <p className="mt-12 text-2xl md:text-3xl font-serif leading-snug">Veroxa nasce proprio lì: dove creatività e tecnologia si uniscono per costruire siti semplici, veloci e riconoscibili. Ogni scelta dà valore alla tua attività e rende più naturale il rapporto con i tuoi clienti.</p>
                <p className="mt-8 text-muted-foreground leading-relaxed">La X è il simbolo del nostro modo di lavorare: unire identità, tecnica, estetica e funzionalità per ottenere un risultato che funzioni davvero.</p>
              </div>
            </FadeIn>
          </div>
        </section>
        <section id="service-selector" className="relative overflow-hidden bg-secondary/20 px-6 py-24 md:px-12 md:py-32">
          <div className="absolute -right-32 top-12 h-80 w-80 rounded-full bg-primary/10 blur-[100px]" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl">
            <FadeIn className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
              <div>
                <span className="eyebrow">Un primo passo, insieme</span>
                <h2 className="mt-5 text-4xl font-light leading-tight md:text-6xl">
                  Che cosa vuoi <span className="italic text-primary">migliorare?</span>
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  Scegli il tuo obiettivo: ti mostriamo da dove partire e puoi mandarci la tua idea già pronta nel messaggio.
                </p>
              </div>

              <div className="rounded-[2rem] border border-border/70 bg-background/90 p-6 shadow-[0_24px_70px_rgba(21,39,58,.08)] md:p-9">
                <p className="mb-5 text-xs font-medium uppercase tracking-[.16em] text-muted-foreground">Seleziona un obiettivo</p>
                <div className="grid gap-3 sm:grid-cols-3" role="group" aria-label="Scegli il tuo obiettivo digitale">
                  {goals.map((goal) => (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => setSelectedGoal(goal.id)}
                      aria-pressed={selectedGoal === goal.id}
                      data-testid={`button-goal-${goal.id}`}
                      className={`flex min-h-28 flex-col items-start justify-between gap-4 rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        selectedGoal === goal.id
                          ? "border-primary bg-primary/10 text-foreground shadow-sm"
                          : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                      }`}
                    >
                      <span className="text-primary">{goal.icon}</span>
                      <span className="text-sm font-medium leading-snug">{goal.label}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-7 border-t border-border pt-7" aria-live="polite" data-testid="text-goal-recommendation">
                  <span className="text-xs uppercase tracking-[.16em] text-primary">Da dove partire</span>
                  <h3 className="mt-3 text-2xl font-serif font-light md:text-3xl">{activeGoal.title}</h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{activeGoal.description}</p>
                  <Link
                    href={`/contatti?interesse=${encodeURIComponent(activeGoal.contactMessage)}`}
                    data-testid="link-goal-contact"
                    className="mt-6 inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-4 text-sm font-medium uppercase tracking-[.1em] text-background transition-colors hover:bg-primary"
                  >
                    Raccontaci la tua idea <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.12} className="mt-24 grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
              <div>
                <span className="eyebrow">Domande rapide</span>
                <h2 className="mt-5 text-3xl font-light leading-tight md:text-5xl">
                  Le cose importanti, <span className="italic text-primary">senza giri.</span>
                </h2>
                <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
                  Apri una domanda per trovare subito le informazioni che ti servono.
                </p>
              </div>
              <div className="divide-y divide-border border-y border-border">
                {[
                  {
                    id: "mobile",
                    question: "Il sito sarà facile da usare anche da smartphone?",
                    answer: "Sì. Progettiamo e verifichiamo ogni pagina anche su schermi piccoli, così contenuti e navigazione restano chiari da telefono.",
                  },
                  {
                    id: "existing-site",
                    question: "Posso rinnovare un sito che esiste già?",
                    answer: "Certo. Possiamo partire da ciò che funziona, capire cosa va migliorato e ridisegnare l'esperienza intorno alle esigenze attuali.",
                  },
                  {
                    id: "estimate",
                    question: "Come si definiscono tempi e costi?",
                    answer: "Dipendono dalle pagine e dalle funzionalità richieste. Dopo aver ascoltato la tua idea, prepariamo una proposta chiara e personalizzata.",
                  },
                ].map((item) => (
                  <details key={item.id} className="group py-5" data-testid={`faq-item-${item.id}`}>
                    <summary
                      className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-serif font-light marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      data-testid={`faq-question-${item.id}`}
                    >
                      <span>{item.question}</span>
                      <ChevronDown className="faq-chevron h-5 w-5 shrink-0 text-primary transition-transform duration-200" aria-hidden="true" />
                    </summary>
                    <p className="max-w-2xl pt-4 pr-8 leading-relaxed text-muted-foreground">{item.answer}</p>
                  </details>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
        <section className="px-6 md:px-12 py-20 md:py-28 bg-[#e9f0ef]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[.7fr_1.3fr] gap-10 lg:gap-16 items-center">
            <FadeIn>
              <span className="eyebrow">Veroxa, in movimento</span>
              <h2 className="mt-5 text-4xl md:text-6xl font-light leading-tight">Un’idea prende forma, <span className="italic text-primary">in 30 secondi.</span></h2>
              <p className="mt-6 text-lg text-foreground/70 leading-relaxed">Un breve film sul nostro modo di unire identità, design e tecnologia. Premi play e guarda il mondo Veroxa da vicino.</p>
              <div className="mt-7 inline-flex items-center gap-3 text-xs tracking-[.16em] uppercase text-foreground/55">
                <Play className="w-4 h-4 text-primary" aria-hidden="true" /> Film di presentazione · 00:30
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="vexora-film-frame aspect-video rounded-[1.5rem] md:rounded-[2rem] shadow-[0_28px_80px_rgba(21,39,58,.16)]">
                <iframe
                  src="/veroxa-film/"
                  title="Film di presentazione di Veroxa, studio digitale"
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  allow="autoplay; fullscreen; picture-in-picture"
                  data-testid="iframe-veroxa-film"
                />
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
    </div>
  );
}
