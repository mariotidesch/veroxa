import { FadeIn, FadeInItem } from "@/components/FadeIn";
import { ArrowRight, Code, MonitorSmartphone, PenTool, Search } from "lucide-react";
import { StyleDirectionArtwork } from "@/components/StyleDirectionArtwork";
import { Link } from "wouter";
import { PageHero } from "@/components/PageHero";

export default function CosaFacciamo() {
  const services = [
    {
      icon: <MonitorSmartphone className="w-6 h-6" />,
      title: "Siti Web",
      desc: "Realizziamo siti rapidi ed eleganti, dai più semplici a quelli con più sezioni. Curiamo ogni elemento per garantire una buona esperienza su computer, tablet e smartphone."
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "Design e Immagine",
      desc: "Trasformiamo la tua identità in un linguaggio visivo chiaro. Scegliamo colori, font e impostazione grafica per raccontare chi sei in modo coerente e riconoscibile."
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Vendite e Prenotazioni",
      desc: "Costruiamo sistemi di e-commerce e prenotazione semplici da usare per il cliente e comodi da gestire per te. L'obiettivo è trasformare le visite in prenotazioni e acquisti."
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Visibilità (SEO)",
      desc: "Facciamo in modo che il tuo sito si trovi facilmente su Google. Lavoriamo su codice e contenuti per migliorare il posizionamento online e raggiungere le persone giuste."
    }
  ];

  return (
    <div className="w-full bg-background min-h-screen pt-28 pb-14 md:pt-40 md:pb-20 relative">
      <main className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        <FadeIn direction="up">
          <PageHero
            label="Cosa facciamo"
            title="Soluzioni digitali costruite intorno alla tua attività."
            description="Dal design allo sviluppo: servizi chiari per portare online la tua identità in modo solido e riconoscibile, con strumenti pensati per accompagnare la tua crescita."
          />
          <header className="mb-16 md:mb-24 md:w-3/4">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-primary" />
              <span className="text-primary tracking-[0.2em] uppercase text-xs font-sans font-medium">Le nostre competenze</span>
            </div>
            <h1 className="text-[clamp(2.25rem,10vw,3.5rem)] md:text-7xl font-serif font-light tracking-tight mb-7 md:mb-10 leading-[1.06] break-words">
              Tutto il necessario, <br/>
              <span className="italic text-muted-foreground">curato nei dettagli.</span>
            </h1>
            <p className="text-lg md:text-2xl text-foreground/70 font-sans font-light leading-relaxed max-w-3xl">
              Offriamo un servizio completo: progettazione, sviluppo e ottimizzazione per dare alla tua attività una presenza online che funziona davvero e rende più chiaro il tuo messaggio.
            </p>
          </header>
        </FadeIn>

        <FadeIn staggerChildren={true} direction="none" className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 mb-16 md:mb-32">
          {services.map((srv, i) => (
            <FadeInItem key={i} className="bg-card border border-border p-6 sm:p-8 md:p-12 rounded-[1.5rem] md:rounded-[2rem] hover:shadow-lg transition-all duration-500 group">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-secondary/30 flex items-center justify-center mb-5 md:mb-8 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                {srv.icon}
              </div>
              <h3 className="text-2xl font-serif font-medium mb-4 text-foreground">{srv.title}</h3>
              <p className="text-muted-foreground font-sans font-light leading-relaxed">
                {srv.desc}
              </p>
            </FadeInItem>
          ))}
        </FadeIn>

        <section className="mb-16 md:mb-32">
          <FadeIn direction="up">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <span className="eyebrow">Direzioni di partenza</span>
              <h2 className="mt-5 text-4xl font-serif font-light tracking-tight md:text-5xl">
                Due ispirazioni, <span className="italic text-primary theme-accent-outline">il tuo stile.</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Per iniziare, possiamo orientarci su due linguaggi visivi diversi. Sono riferimenti generici, non stili ufficiali né pacchetti rigidi.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
            <FadeIn direction="right" delay={0.12}>
              <article className="h-full overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_20px_60px_hsl(var(--foreground)/.05)]">
                <StyleDirectionArtwork variant="technical" />
                <div className="p-7 md:p-9">
                  <span className="eyebrow">Tecnico e modulare</span>
                  <h3 className="mt-3 text-3xl font-serif font-light">Ordine, funzione, chiarezza.</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    Griglie precise, contrasti netti e componenti modulari: una direzione che mette in primo piano ciò che il sito fa e come si usa.
                  </p>
                </div>
              </article>
            </FadeIn>
            <FadeIn direction="left" delay={0.24}>
              <article className="h-full overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_20px_60px_hsl(var(--foreground)/.05)]">
                <StyleDirectionArtwork variant="visual" />
                <div className="p-7 md:p-9">
                  <span className="eyebrow">Visuale e narrativo</span>
                  <h3 className="mt-3 text-3xl font-serif font-light">Atmosfera, racconto, identità.</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    Tipografia protagonista, spazi più ampi e forme morbide: una direzione che valorizza il carattere e la storia del brand.
                  </p>
                </div>
              </article>
            </FadeIn>
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
            Sono basi predefinite per chi non ha ancora preferenze. Possiamo cambiarle o combinarle liberamente in base alla tua attività, al pubblico e alle tue esigenze.
          </p>
        </section>

        <FadeIn direction="up" delay={0.4} className="mt-20 md:mt-40 mb-14 md:mb-20 flex justify-center">
          <Link href="/contatti">
            <div className="group cursor-pointer flex flex-col items-center">
              <span className="text-lg font-serif font-light text-foreground group-hover:text-primary transition-colors mb-2">
                Parlaci del tuo progetto
              </span>
              <div className="w-12 h-[1px] bg-foreground group-hover:w-24 group-hover:bg-primary transition-all duration-500" />
            </div>
          </Link>
        </FadeIn>
      </main>
    </div>
  );
}
