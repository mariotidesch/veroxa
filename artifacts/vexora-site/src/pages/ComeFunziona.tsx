import { FadeIn, FadeInItem } from "@/components/FadeIn";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";

export default function ComeFunziona() {
  const steps = [
    {
      num: "01",
      title: "Ascolto e direzione",
      subtitle: "Il punto di partenza",
      desc: "Tutto nasce da una conversazione. Ascoltiamo la storia della tua attività, i tuoi obiettivi e studiamo il tuo stile. Raccogliamo i materiali utili — foto, testi, riferimenti — e definiamo insieme la direzione. Al termine di questa fase avrai una strategia chiara e una visione precisa del risultato, con basi solide per iniziare il lavoro."
    },
    {
      num: "02",
      title: "Progetto e sviluppo",
      subtitle: "Il lavoro concreto",
      desc: "Disegniamo l'interfaccia scegliendo con cura i caratteri, le proporzioni e i dettagli che danno vita alla pagina. Una volta approvato il design, lo trasformiamo in codice pulito, veloce e adattato a ogni schermo. Ogni sezione viene curata per garantire fluidità su computer, tablet e smartphone, mantenendo il progetto ordinato anche mentre cresce."
    },
    {
      num: "03",
      title: "Lancio e supporto",
      subtitle: "Online e oltre",
      desc: "Dopo i test finali, il tuo nuovo sito viene pubblicato. Il nostro lavoro non si ferma qui: ti guidiamo nei primi passi, ti insegniamo a gestire i contenuti in autonomia — come menu o cataloghi — e rimaniamo disponibili per assistenza, aggiornamenti o nuovi sviluppi nel tempo, così puoi affrontare il percorso con maggiore sicurezza."
    }
  ];

  return (
    <div className="w-full bg-background min-h-screen pt-40 pb-20 relative">
      <main className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn direction="up">
          <PageHero
            align="center"
            label="Come lavoriamo"
            title="Dall'idea al sito, un passo alla volta."
            description="Un metodo chiaro e condiviso, senza tecnicismi: ti accompagniamo dall'inizio fino alla pubblicazione, con un confronto costante in ogni fase."
          />
          <header className="mb-32 text-center flex flex-col items-center">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-primary tracking-[0.2em] uppercase text-xs font-sans font-medium">Come Funziona</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight mb-10 leading-[1.1] max-w-4xl">
              Un percorso semplice, <br/>
              <span className="italic text-muted-foreground">passo dopo passo.</span>
            </h1>
            <p className="text-xl text-foreground/70 font-sans font-light leading-relaxed max-w-2xl">
              Lavoriamo in modo trasparente e collaborativo. Senza complicazioni tecniche, ti seguiamo dall'idea iniziale fino alla pubblicazione, lasciandoti sempre una visione chiara dei passaggi e delle decisioni.
            </p>
          </header>
        </FadeIn>

        <div className="relative mb-32">
          {/* Linea connettiva */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-border -translate-x-1/2" />
          
          <FadeIn staggerChildren={true} direction="none" className="space-y-24 lg:space-y-40">
            {steps.map((step, i) => (
              <FadeInItem key={i} className={`relative flex flex-col lg:flex-row gap-10 lg:gap-20 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`flex-1 flex flex-col ${i % 2 !== 0 ? 'lg:items-start lg:text-left' : 'lg:items-end lg:text-right'} items-center text-center w-full`}>
                  <div className="mb-6">
                    <span className="text-sm font-sans tracking-[0.2em] text-primary uppercase">{step.subtitle}</span>
                  </div>
                  <h3 className="text-4xl font-serif font-light mb-8">{step.title}</h3>
                  <p className="text-lg text-muted-foreground font-sans font-light leading-relaxed max-w-md">
                    {step.desc}
                  </p>
                </div>
                
                <div className="flex-none relative z-10 shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white border border-border flex items-center justify-center shadow-lg group hover:border-primary transition-colors duration-500">
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
          <div className="relative bg-white border border-border p-12 md:p-20 rounded-[3rem] text-center max-w-4xl mx-auto shadow-sm">
            <h3 className="text-3xl md:text-5xl font-serif font-light mb-6">Iniziamo insieme</h3>
            <p className="text-muted-foreground font-sans font-light text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Scrivici per una prima consulenza. Vedremo insieme come valorizzare la tua attività nel mondo digitale e come trasformare le tue idee in una direzione concreta.
            </p>
            <Link href="/contatti">
              <div className="inline-flex group relative px-10 py-5 bg-foreground text-background rounded-full cursor-pointer overflow-hidden items-center justify-center gap-3">
                <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                <span className="relative z-10 text-sm tracking-[0.1em] uppercase font-sans font-medium">Contattaci ora</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </FadeIn>

      </main>
    </div>
  );
}
