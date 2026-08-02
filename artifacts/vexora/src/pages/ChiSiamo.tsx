import { FadeIn, FadeInItem } from "@/components/FadeIn";
import { Logo2 } from "@/components/Logos";
import cafeImg from "@assets/generated_images/modern-cafe.jpg";

export default function ChiSiamo() {
  return (
    <div className="w-full bg-background min-h-screen pt-40 pb-20 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-secondary/30 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      
      <main className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <FadeIn direction="up">
          <header className="mb-24 md:w-3/4">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-primary" />
              <span className="text-primary tracking-[0.2em] uppercase text-xs font-sans font-medium">Chi Siamo</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight mb-10 leading-[1.1]">
              L'arte dell'ospitalità, <br/>
              <span className="italic text-muted-foreground">estesa al digitale.</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 font-sans font-light leading-relaxed max-w-3xl">
              Siamo nati con un mandato preciso: elevare la presenza online delle eccellenze artigianali italiane, restituendo al web la grazia e l'eleganza che meritano.
            </p>
          </header>
        </FadeIn>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
          <FadeIn delay={0.2} direction="right" className="space-y-8 text-lg md:text-xl text-foreground/80 font-sans font-light leading-relaxed">
            <p>
              Vexora ha preso forma da una constatazione molto semplice e al contempo preoccupante: troppe realtà straordinarie sul territorio — ristoranti di ricerca, botteghe storiche, boutique raffinate — faticavano a trasmettere la propria qualità attraverso i canali digitali.
            </p>
            <p>
              Spesso costretti ad adottare soluzioni standardizzate o template anonimi, questi luoghi perdevano online tutta la loro identità, appiattendo il calore umano e l'esperienza sensoriale che li contraddistingue nel mondo reale.
            </p>
            <p>
              Abbiamo fondato questo studio per costruire un ponte tra l'artigianalità fisica e il design digitale. Crediamo che il sito web di un'attività non debba essere un semplice biglietto da visita, ma una vera e propria estensione del locale stesso: uno spazio luminoso, accogliente, disegnato su misura, capace di far respirare la stessa aria che si prova varcando la vostra soglia.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.4} direction="left" className="relative">
            <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
              <img 
                src={cafeImg} 
                alt="La nostra visione" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-xl border border-border">
              <Logo2 className="w-24 h-24 text-primary" />
            </div>
          </FadeIn>
        </section>

        <FadeIn direction="up" delay={0.2}>
          <section className="bg-foreground text-background rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative z-10 max-w-3xl">
              <span className="text-background/50 tracking-[0.2em] uppercase text-xs font-sans font-medium block mb-6">La nostra visione</span>
              <h2 className="text-3xl md:text-5xl font-serif font-light mb-8 leading-[1.2]">
                Non costruiamo semplici siti.<br />
                <span className="italic text-primary">Disegniamo spazi.</span>
              </h2>
              <p className="text-lg md:text-xl font-sans font-light text-background/80 leading-relaxed mb-8">
                Dietro ogni nostro progetto c'è una maniacale attenzione ai dettagli: dalla scelta tipografica più adatta a comunicare il vostro tono di voce, alla calibrazione del respiro tra gli elementi (il white-space), fino alla stesura di un codice performante e solido.
              </p>
              <p className="text-lg md:text-xl font-sans font-light text-background/80 leading-relaxed">
                Il risultato è un'architettura invisibile che lascia emergere la vera protagonista: la vostra identità.
              </p>
            </div>
          </section>
        </FadeIn>
      </main>
    </div>
  );
}
