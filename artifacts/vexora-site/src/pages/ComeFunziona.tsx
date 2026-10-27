import { FadeIn, FadeInItem } from "@/components/FadeIn";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { useLanguage } from "@/components/LanguageContext";

export default function ComeFunziona() {
  const { text } = useLanguage();
  const steps = [
    {
      num: "01",
      title: text("Ascolto e direzione", "Listening and direction"),
      subtitle: text("Il punto di partenza", "Where it begins"),
      desc: text("Tutto nasce da una conversazione. Ascoltiamo la storia della tua attività, i tuoi obiettivi e il tuo stile. Raccogliamo foto, testi e riferimenti, poi definiamo insieme la direzione. Al termine avrai una strategia chiara per iniziare il lavoro.", "It all starts with a conversation. We listen to your story, goals and style, then gather images, copy and references. Together, we set a direction and a clear strategy for the work ahead.")
    },
    {
      num: "02",
      title: text("Progetto e sviluppo", "Design and development"),
      subtitle: text("Il lavoro concreto", "Making it real"),
      desc: text("Disegniamo l'interfaccia scegliendo caratteri, proporzioni e dettagli. Una volta approvato il design, lo trasformiamo in codice pulito, veloce e adattato a ogni schermo.", "We shape the interface through typography, proportions and details. Once the design is approved, we turn it into clean, fast code that works on every screen.")
    },
    {
      num: "03",
      title: text("Lancio e supporto", "Launch and support"),
      subtitle: text("Online e oltre", "Online and beyond"),
      desc: text("Dopo i test finali, il tuo nuovo sito viene pubblicato. Ti guidiamo nei primi passi e ti insegniamo a gestire i contenuti in autonomia, restando disponibili per assistenza e aggiornamenti.", "After final testing, your new website goes live. We guide you through the first steps and show you how to manage your content, while staying available for support and updates.")
    }
  ];

  return (
    <div className="w-full bg-background min-h-screen pt-28 pb-14 md:pt-40 md:pb-20 relative">
      <main className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        <FadeIn direction="up">
          <PageHero
            align="center"
            label={text("Come lavoriamo", "How we work")}
            title={text("Dall'idea al sito, un passo alla volta.", "From idea to website, one step at a time.")}
            description={text("Un metodo chiaro e condiviso, senza tecnicismi: ti accompagniamo dall'inizio alla pubblicazione, con un confronto costante.", "A clear, collaborative process without the jargon. We guide you from the first idea to launch, keeping you involved at every step.")}
          />
          <header className="mb-16 md:mb-32 text-center flex flex-col items-center">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-primary tracking-[0.2em] uppercase text-xs font-sans font-medium">{text("Come funziona", "How it works")}</span>
            </div>
            <h1 className="text-[clamp(2.25rem,10vw,3.5rem)] md:text-7xl font-serif font-light tracking-tight mb-7 md:mb-10 leading-[1.06] max-w-4xl break-words">
              {text("Un percorso semplice,", "A simple process,")} <br/>
              <span className="italic text-muted-foreground">{text("passo dopo passo.", "step by step.")}</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 font-sans font-light leading-relaxed max-w-2xl">
              {text("Lavoriamo in modo trasparente e collaborativo. Ti seguiamo dall'idea iniziale alla pubblicazione, con una visione chiara dei passaggi.", "We work transparently and collaboratively, guiding you from the first idea to launch with a clear view of every step.")}
            </p>
          </header>
        </FadeIn>

        <div className="relative mb-16 md:mb-32">
          {/* Linea connettiva */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-border -translate-x-1/2" />
          
          <FadeIn staggerChildren={true} direction="none" className="space-y-16 md:space-y-24 lg:space-y-40">
            {steps.map((step, i) => (
              <FadeInItem key={i} className={`relative flex flex-col lg:flex-row gap-10 lg:gap-20 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`flex-1 flex flex-col ${i % 2 !== 0 ? 'lg:items-start lg:text-left' : 'lg:items-end lg:text-right'} items-center text-center w-full`}>
                  <div className="mb-6">
                    <span className="text-sm font-sans tracking-[0.2em] text-primary uppercase">{step.subtitle}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif font-light mb-5 md:mb-8">{step.title}</h3>
                  <p className="text-lg text-muted-foreground font-sans font-light leading-relaxed max-w-md">
                    {step.desc}
                  </p>
                </div>
                
                <div className="flex-none relative z-10 shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-card border border-border flex items-center justify-center shadow-lg group hover:border-primary transition-colors duration-500">
                    <span className="text-3xl md:text-4xl font-serif text-foreground group-hover:text-primary transition-colors duration-500">
                      {step.num}
                    </span>
                  </div>
                </div>

                <div className="flex-1 w-full" /> {/* Spacer per l'altro lato */}
              </FadeInItem>
            ))}
          </FadeIn>
        </div>

        <FadeIn direction="up" delay={0.2} className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/30 via-accent/20 to-primary/10 rounded-[3rem] blur-xl opacity-50" />
          <div className="relative bg-card border border-border p-6 sm:p-9 md:p-20 rounded-[1.75rem] md:rounded-[3rem] text-center max-w-4xl mx-auto shadow-sm">
            <h3 className="text-3xl md:text-5xl font-serif font-light mb-6">{text("Iniziamo insieme", "Let's get started")}</h3>
            <p className="text-muted-foreground font-sans font-light text-base md:text-xl mb-8 md:mb-12 max-w-2xl mx-auto">
              {text("Scrivici per una prima consulenza. Vedremo insieme come valorizzare la tua attività e trasformare le tue idee in una direzione concreta.", "Get in touch for an initial consultation. Together, we'll find ways to bring out what makes your business special and turn your ideas into a clear direction.")}
            </p>
            <Link href="/contatti">
              <div className="inline-flex group relative px-10 py-5 bg-foreground text-background rounded-full cursor-pointer overflow-hidden items-center justify-center gap-3">
                <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                <span className="relative z-10 text-sm tracking-[0.1em] uppercase font-sans font-medium">{text("Contattaci ora", "Get in touch")}</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </FadeIn>

      </main>
    </div>
  );
}
