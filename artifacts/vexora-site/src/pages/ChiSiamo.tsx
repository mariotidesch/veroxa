import { FadeIn } from "@/components/FadeIn";
import { Logo1, Logo2 } from "@/components/Logos";
import cafeImg from "@assets/generated_images/modern-cafe.jpg";
import boutiqueImg from "@assets/generated_images/artisan-boutique.jpg";
import { PageHero } from "@/components/PageHero";

export default function ChiSiamo() {
  return (
    <div className="w-full bg-background min-h-screen pt-40 pb-20 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-secondary/30 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      
      <main className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <PageHero
          label="Chi siamo"
          title="Dietro ogni sito c'è una storia da raccontare."
            description="Creatività, tecnica e cura per dare una presenza online alle attività che hanno qualcosa di speciale da comunicare, mantenendo il loro carattere."
        />

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
          <FadeIn delay={0.2} direction="right" className="space-y-8 text-lg md:text-xl text-foreground/80 font-sans font-light leading-relaxed">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-[1px] bg-primary" />
              <span className="text-primary tracking-[0.2em] uppercase text-xs font-sans font-medium">Chi Siamo</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-light tracking-tight mb-10 leading-[1.1]">
              La qualità del locale, <br/>
              <span className="italic text-muted-foreground">portata online.</span>
            </h1>
            <p>
              Veroxa nasce da un'osservazione semplice: molte attività straordinarie — ristoranti, botteghe storiche, boutique — faticavano a trasmettere la propria qualità sul web. Il loro valore, evidente dal vivo, spesso non emergeva online.
            </p>
            <p>
              Costretti a usare modelli standard o template generici, questi luoghi perdevano la propria identità e il calore che li rende unici. Per questo crediamo che ogni sito debba partire dall'ascolto.
            </p>
            <p>
              Abbiamo fondato questo studio per colmare questa distanza. Il sito non deve essere un semplice biglietto da visita, ma un'estensione dello spazio fisico, capace di trasmettere la qualità del tuo lavoro prima del primo contatto.
            </p>
            {/* Piccolo logo decorativo */}
            <div className="pt-6 flex items-center gap-4 opacity-40">
              <Logo1 className="w-10 h-10 text-primary" animated={false} />
              <span className="text-xs tracking-[0.2em] uppercase font-sans text-muted-foreground">Veroxa Studio</span>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.4} direction="left" className="relative">
            <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
              <img 
                src={cafeImg} 
                alt="Un locale che ispira il nostro lavoro" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-card rounded-full flex items-center justify-center shadow-xl border border-border">
              <Logo2 className="w-24 h-24 text-primary" />
            </div>
          </FadeIn>
        </section>

        {/* Seconda immagine + citazione */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <FadeIn direction="right" delay={0.1}>
            <div className="w-full aspect-[16/9] rounded-[2rem] overflow-hidden shadow-lg">
              <img
                src={boutiqueImg}
                alt="Boutique artigianale"
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
          <FadeIn direction="left" delay={0.25} className="space-y-6">
            <span className="eyebrow">La nostra visione</span>
            <h2 className="text-3xl md:text-4xl font-serif font-light leading-snug">
              Non facciamo siti.<br />
              <span className="italic text-primary">Costruiamo spazi digitali.</span>
            </h2>
            <p className="text-lg font-sans font-light text-foreground/70 leading-relaxed">
              Ogni progetto parte dall'attenzione ai dettagli: dal carattere tipografico agli spazi tra gli elementi, fino al codice che rende il sito veloce e solido. Sono scelte che definiscono il modo in cui viene percepito il tuo brand.
            </p>
            <p className="text-lg font-sans font-light text-foreground/70 leading-relaxed">
              Il risultato è una struttura discreta che lascia emergere la vera protagonista: la tua identità. Così il tuo lavoro può parlare con chiarezza.
            </p>
          </FadeIn>
        </section>

        <FadeIn direction="up" delay={0.2}>
          <section className="bg-footer-background text-footer-foreground rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-8 right-10 opacity-10">
              <Logo1 className="w-24 h-24 text-footer-foreground" animated={false} />
            </div>
            <div className="relative z-10 max-w-3xl">
              <span className="text-footer-foreground/50 tracking-[0.2em] uppercase text-xs font-sans font-medium block mb-6">Il nostro impegno</span>
              <h2 className="text-3xl md:text-5xl font-serif font-light mb-8 leading-[1.2]">
                Ogni dettaglio conta.<br />
                <span className="italic text-primary">Sempre.</span>
              </h2>
              <p className="text-lg md:text-xl font-sans font-light text-footer-foreground/80 leading-relaxed mb-8">
                Ci occupiamo di ogni aspetto del progetto, dal primo appuntamento alla pubblicazione online. Anche i dettagli più piccoli contribuiscono alla qualità dell'insieme.
              </p>
              <p className="text-lg md:text-xl font-sans font-light text-footer-foreground/80 leading-relaxed">
                Il tuo sito deve funzionare bene, essere bello da guardare e comunicare chi sei con chiarezza. Trasformiamo la tua visione in uno spazio digitale ordinato e personale.
              </p>
            </div>
          </section>
        </FadeIn>
      </main>
    </div>
  );
}
