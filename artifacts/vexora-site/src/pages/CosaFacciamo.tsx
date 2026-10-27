import { FadeIn, FadeInItem } from "@/components/FadeIn";
import { ArrowRight, Code, MonitorSmartphone, PenTool, Search } from "lucide-react";
import { StyleDirectionArtwork } from "@/components/StyleDirectionArtwork";
import { Link } from "wouter";
import { PageHero } from "@/components/PageHero";
import { useLanguage } from "@/components/LanguageContext";

export default function CosaFacciamo() {
  const { text } = useLanguage();
  const services = [
    {
      icon: <MonitorSmartphone className="w-6 h-6" />,
      title: text("Siti web", "Websites"),
      desc: text("Realizziamo siti rapidi ed eleganti, dai più semplici a quelli con più sezioni. Curiamo ogni elemento per garantire una buona esperienza su computer, tablet e smartphone.", "We create fast, elegant websites, from simple pages to multi-section experiences. Every detail is considered for a seamless experience on desktop, tablet and mobile.")
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      title: text("Design e immagine", "Design and identity"),
      desc: text("Trasformiamo la tua identità in un linguaggio visivo chiaro. Scegliamo colori, font e impostazione grafica per raccontare chi sei in modo coerente e riconoscibile.", "We translate your identity into a clear visual language. Carefully chosen colors, typography and layouts tell your story with consistency and character.")
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: text("Vendite e prenotazioni", "Sales and bookings"),
      desc: text("Costruiamo sistemi di e-commerce e prenotazione semplici da usare per il cliente e comodi da gestire per te. L'obiettivo è trasformare le visite in prenotazioni e acquisti.", "We build easy-to-use e-commerce and booking tools that are simple for customers and practical for you to manage, turning visits into bookings and purchases.")
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: text("Visibilità (SEO)", "Visibility (SEO)"),
      desc: text("Facciamo in modo che il tuo sito si trovi facilmente su Google. Lavoriamo su codice e contenuti per migliorare il posizionamento online e raggiungere le persone giuste.", "We help people find your website on Google by improving its content and technical foundations, so you can reach the right audience.")
    }
  ];

  return (
    <div className="w-full bg-background min-h-screen pt-28 pb-14 md:pt-40 md:pb-20 relative">
      <main className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        <FadeIn direction="up">
          <PageHero
            label={text("Cosa facciamo", "What we do")}
            title={text("Soluzioni digitali costruite intorno alla tua attività.", "Digital solutions shaped around your business.")}
            description={text("Dal design allo sviluppo: servizi chiari per portare online la tua identità in modo solido e riconoscibile, con strumenti pensati per accompagnare la tua crescita.", "From design to development, we bring your identity online with clarity and purpose, using tools built to support your growth.")}
          />
          <header className="mb-16 md:mb-24 md:w-3/4">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-primary" />
              <span className="text-primary tracking-[0.2em] uppercase text-xs font-sans font-medium">{text("Le nostre competenze", "What we do best")}</span>
            </div>
            <h1 className="text-[clamp(2.25rem,10vw,3.5rem)] md:text-7xl font-serif font-light tracking-tight mb-7 md:mb-10 leading-[1.06] break-words">
              {text("Tutto il necessario,", "Everything you need,")} <br/>
              <span className="italic text-muted-foreground">{text("curato nei dettagli.", "considered in every detail.")}</span>
            </h1>
            <p className="text-lg md:text-2xl text-foreground/70 font-sans font-light leading-relaxed max-w-3xl">
              {text("Offriamo un servizio completo: progettazione, sviluppo e ottimizzazione per dare alla tua attività una presenza online che funziona davvero e rende più chiaro il tuo messaggio.", "We offer a complete service — design, development and optimisation — to build an online presence that works and communicates your message clearly.")}
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
              <span className="eyebrow">{text("Direzioni di partenza", "Starting points")}</span>
              <h2 className="mt-5 text-4xl font-serif font-light tracking-tight md:text-5xl">
                {text("Due ispirazioni,", "Two directions,")} <span className="italic text-primary theme-accent-outline">{text("il tuo stile.", "your style.")}</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {text("Per iniziare, possiamo orientarci su due linguaggi visivi diversi. Sono riferimenti generici, non stili ufficiali né pacchetti rigidi.", "To get started, we can explore two different visual languages. They are flexible references, not official styles or fixed packages.")}
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
            <FadeIn direction="right" delay={0.12}>
              <article className="h-full overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_20px_60px_hsl(var(--foreground)/.05)]">
                <StyleDirectionArtwork variant="technical" />
                <div className="p-7 md:p-9">
                  <span className="eyebrow">{text("Tecnico e modulare", "Technical and modular")}</span>
                  <h3 className="mt-3 text-3xl font-serif font-light">{text("Ordine, funzione, chiarezza.", "Order, function, clarity.")}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {text("Griglie precise, contrasti netti e componenti modulari: una direzione che mette in primo piano ciò che il sito fa e come si usa.", "Precise grids, clear contrast and modular components put the focus on what the website does and how to use it.")}
                  </p>
                </div>
              </article>
            </FadeIn>
            <FadeIn direction="left" delay={0.24}>
              <article className="h-full overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_20px_60px_hsl(var(--foreground)/.05)]">
                <StyleDirectionArtwork variant="visual" />
                <div className="p-7 md:p-9">
                  <span className="eyebrow">{text("Visuale e narrativo", "Visual and expressive")}</span>
                  <h3 className="mt-3 text-3xl font-serif font-light">{text("Atmosfera, racconto, identità.", "Atmosphere, story, identity.")}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {text("Tipografia protagonista, spazi più ampi e forme morbide: una direzione che valorizza il carattere e la storia del brand.", "Expressive typography, generous space and soft forms bring out your brand's character and story.")}
                  </p>
                </div>
              </article>
            </FadeIn>
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
            {text("Sono basi predefinite per chi non ha ancora preferenze. Possiamo cambiarle o combinarle liberamente in base alla tua attività, al pubblico e alle tue esigenze.", "These are starting points for anyone without a set preference. We can adapt or combine them to suit your business, audience and needs.")}
          </p>
        </section>

        <FadeIn direction="up" delay={0.4} className="mt-20 md:mt-40 mb-14 md:mb-20 flex justify-center">
          <Link href="/contatti">
            <div className="group cursor-pointer flex flex-col items-center">
              <span className="text-lg font-serif font-light text-foreground group-hover:text-primary transition-colors mb-2">
                {text("Parlaci del tuo progetto", "Tell us about your project")}
              </span>
              <div className="w-12 h-[1px] bg-foreground group-hover:w-24 group-hover:bg-primary transition-all duration-500" />
            </div>
          </Link>
        </FadeIn>
      </main>
    </div>
  );
}
