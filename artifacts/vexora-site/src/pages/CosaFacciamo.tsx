import { FadeIn, FadeInItem } from "@/components/FadeIn";
import { ArrowRight, Code, MonitorSmartphone, PenTool, Search } from "lucide-react";
import boutiqueImg from "@assets/generated_images/artisan-boutique.jpg";
import restaurantImg from "@assets/generated_images/elegant-restaurant.jpg";
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
    <div className="w-full bg-background min-h-screen pt-40 pb-20 relative">
      <main className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn direction="up">
          <PageHero
            label="Cosa facciamo"
            title="Soluzioni digitali costruite intorno alla tua attività."
            description="Dal design allo sviluppo: servizi chiari per portare online la tua identità in modo solido e riconoscibile, con strumenti pensati per accompagnare la tua crescita."
          />
          <header className="mb-24 md:w-3/4">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-primary" />
              <span className="text-primary tracking-[0.2em] uppercase text-xs font-sans font-medium">Le nostre competenze</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight mb-10 leading-[1.1]">
              Tutto il necessario, <br/>
              <span className="italic text-muted-foreground">curato nei dettagli.</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 font-sans font-light leading-relaxed max-w-3xl">
              Offriamo un servizio completo: progettazione, sviluppo e ottimizzazione per dare alla tua attività una presenza online che funziona davvero e rende più chiaro il tuo messaggio.
            </p>
          </header>
        </FadeIn>

        <FadeIn staggerChildren={true} direction="none" className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-32">
          {services.map((srv, i) => (
            <FadeInItem key={i} className="bg-white border border-border p-12 rounded-[2rem] hover:shadow-lg transition-all duration-500 group">
              <div className="w-14 h-14 rounded-full bg-secondary/30 flex items-center justify-center mb-8 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                {srv.icon}
              </div>
              <h3 className="text-2xl font-serif font-medium mb-4 text-foreground">{srv.title}</h3>
              <p className="text-muted-foreground font-sans font-light leading-relaxed">
                {srv.desc}
              </p>
            </FadeInItem>
          ))}
        </FadeIn>

        <section className="mb-32">
          <FadeIn direction="up">
            <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight mb-16 text-center">
              Diamo spazio alla <span className="italic text-primary">bellezza</span>.
            </h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <FadeIn direction="right" delay={0.2}>
              <div className="relative group overflow-hidden rounded-[2rem]">
                <div className="aspect-[4/3] w-full">
                  <img src={boutiqueImg} alt="Boutique" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent flex flex-col justify-end p-10">
                  <h4 className="text-white text-3xl font-serif mb-2">Boutique & Atelier</h4>
                  <p className="text-white/80 font-sans font-light">Esposizioni digitali per artigiani e moda, con uno spazio ordinato per valorizzare i prodotti.</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="left" delay={0.4}>
              <div className="relative group overflow-hidden rounded-[2rem] lg:translate-y-12">
                <div className="aspect-[4/3] w-full">
                  <img src={restaurantImg} alt="Ristorazione" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent flex flex-col justify-end p-10">
                  <h4 className="text-white text-3xl font-serif mb-2">Ristorazione d'Eccellenza</h4>
                  <p className="text-white/80 font-sans font-light">Menu eleganti e sistemi di prenotazione integrati, per rendere più semplice ogni scelta.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <FadeIn direction="up" delay={0.4} className="mt-40 mb-20 flex justify-center">
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
