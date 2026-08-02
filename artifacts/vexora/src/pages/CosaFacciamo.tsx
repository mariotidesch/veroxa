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
      title: "Architetture Digitali",
      desc: "Progettiamo siti web eleganti e fulminei. Dai landing page essenziali a strutture complesse multi-pagina, curiamo ogni pixel per un'esperienza visiva senza compromessi su ogni dispositivo."
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "Direzione Artistica",
      desc: "Traduciamo la vostra essenza in un linguaggio visivo coerente. Selezioniamo palette cromatiche, font e composizioni grafiche capaci di raccontare la vostra unicità."
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "E-commerce & Prenotazioni",
      desc: "Sviluppiamo sistemi di vendita e booking invisibili all'utente ma potenti per chi li gestisce. Trasformiamo le visite in tavoli prenotati o prodotti venduti in modo fluido."
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Ottimizzazione (SEO)",
      desc: "Facciamo in modo che la bellezza sia anche trovabile. Strutturiamo il codice e i contenuti seguendo le migliori pratiche per favorire la visibilità sui motori di ricerca."
    }
  ];

  return (
    <div className="w-full bg-background min-h-screen pt-40 pb-20 relative">
      <main className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn direction="up">
          <header className="mb-24 md:w-3/4">
            <PageHero label="Le nostre competenze" title="Soluzioni digitali costruite intorno alla tua attività." description="Dalla direzione artistica allo sviluppo: strumenti chiari per trasformare la tua identità in una presenza online concreta." />
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-primary" />
              <span className="text-primary tracking-[0.2em] uppercase text-xs font-sans font-medium">Le nostre competenze</span>
            <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight mb-10 leading-[1.1]">
              Oltre la superficie. <br/>
              <span className="italic text-muted-foreground">Spazi digitali che respirano.</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 font-sans font-light leading-relaxed max-w-3xl">
              Offriamo un servizio completo e sartoriale. Sviluppiamo piattaforme agili, luminose e curate in ogni minimo dettaglio per convertire l'estetica in vantaggio competitivo.
            </p>
            </div>
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
                  <p className="text-white/80 font-sans font-light">Esposizioni digitali per artigiani e moda.</p>
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
                  <p className="text-white/80 font-sans font-light">Menu eleganti e sistemi di prenotazione integrati.</p>
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
