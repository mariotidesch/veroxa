import { FadeIn } from "@/components/FadeIn";
import { Logo1 } from "@/components/Logos";
import cafeImg from "@assets/generated_images/modern-cafe.jpg";
import boutiqueImg from "@assets/generated_images/artisan-boutique.jpg";
import { PageHero } from "@/components/PageHero";
import { useLanguage } from "@/components/LanguageContext";

export default function ChiSiamo() {
  const { text } = useLanguage();
  return (
    <div className="w-full bg-background min-h-screen pt-28 pb-14 md:pt-40 md:pb-20 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-secondary/30 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      
      <main className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <PageHero
          label={text("Chi siamo", "About us")}
          title={text("Dietro ogni sito c'è una storia da raccontare.", "Behind every website is a story worth telling.")}
          description={text("Creatività, tecnica e cura per dare una presenza online alle attività che hanno qualcosa di speciale da comunicare, mantenendo il loro carattere.", "Creativity, craft and care help businesses with something special to say build an online presence that stays true to who they are.")}
        />

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16 md:mb-32">
          <FadeIn delay={0.2} direction="right" className="space-y-6 md:space-y-8 text-lg md:text-xl text-foreground/80 font-sans font-light leading-relaxed">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-[1px] bg-primary" />
              <span className="text-primary tracking-[0.2em] uppercase text-xs font-sans font-medium">{text("Chi siamo", "About us")}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-light tracking-tight mb-10 leading-[1.1]">
              {text("La qualità del locale,", "The character of your place,")} <br/>
              <span className="italic text-muted-foreground">{text("portata online.", "brought online.")}</span>
            </h1>
            <p>
              {text("Veroxa nasce da un'osservazione semplice: molte attività straordinarie — ristoranti, botteghe storiche, boutique — faticavano a trasmettere la propria qualità sul web. Il loro valore, evidente dal vivo, spesso non emergeva online.", "Veroxa grew from a simple observation: many remarkable businesses — restaurants, independent shops and boutiques — struggled to convey their quality online. Their value was clear in person, but often got lost on the web.")}
            </p>
            <p>
              {text("Costretti a usare modelli standard o template generici, questi luoghi perdevano la propria identità e il calore che li rende unici. Per questo crediamo che ogni sito debba partire dall'ascolto.", "Standard templates often stripped these businesses of their identity and the warmth that makes them unique. That is why we believe every website should begin by listening.")}
            </p>
            <p>
              {text("Abbiamo fondato questo studio per colmare questa distanza. Il sito non deve essere un semplice biglietto da visita, ma un'estensione dello spazio fisico, capace di trasmettere la qualità del tuo lavoro prima del primo contatto.", "We founded this studio to close that gap. A website should be more than a digital business card: it should extend your space and communicate the quality of your work before the first conversation.")}
            </p>
            {/* Piccolo logo decorativo */}
            <div className="pt-6 flex items-center gap-4 opacity-40">
              <Logo1 className="w-10 h-10 text-primary" animated={false} />
              <span className="text-xs tracking-[0.2em] uppercase font-sans text-muted-foreground">{text("Studio Veroxa", "Veroxa Studio")}</span>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.4} direction="left" className="relative">
            <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
              <img 
                src={cafeImg} 
                alt={text("Un locale che ispira il nostro lavoro", "A space that inspires our work")} 
                className="w-full h-full object-cover"
              />
            </div>
              <div className="absolute -bottom-8 -left-5 sm:-left-8 md:-bottom-12 md:-left-12 w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-card rounded-full flex items-center justify-center shadow-xl border border-border">
              <Logo1 className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-primary" animated={false} />
            </div>
          </FadeIn>
        </section>

        {/* Seconda immagine + citazione */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center mb-16 md:mb-32">
          <FadeIn direction="right" delay={0.1}>
            <div className="w-full aspect-[16/9] rounded-[2rem] overflow-hidden shadow-lg">
              <img
                src={boutiqueImg}
                alt={text("Boutique artigianale", "Independent boutique")}
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
          <FadeIn direction="left" delay={0.25} className="space-y-6">
            <span className="eyebrow">{text("La nostra visione", "Our vision")}</span>
            <h2 className="text-3xl md:text-4xl font-serif font-light leading-snug">
              {text("Non facciamo siti.", "We don't just make websites.")}<br />
              <span className="italic text-primary">{text("Costruiamo spazi digitali.", "We create digital spaces.")}</span>
            </h2>
            <p className="text-lg font-sans font-light text-foreground/70 leading-relaxed">
              {text("Ogni progetto parte dall'attenzione ai dettagli: dal carattere tipografico agli spazi tra gli elementi, fino al codice che rende il sito veloce e solido. Sono scelte che definiscono il modo in cui viene percepito il tuo brand.", "Every project starts with attention to detail: from typography and spacing to the code that keeps your website fast and reliable. These choices shape how people experience your brand.")}
            </p>
            <p className="text-lg font-sans font-light text-foreground/70 leading-relaxed">
              {text("Il risultato è una struttura discreta che lascia emergere la vera protagonista: la tua identità. Così il tuo lavoro può parlare con chiarezza.", "The result is a thoughtful structure that lets the real protagonist stand out: your identity. Your work can speak clearly.")}
            </p>
          </FadeIn>
        </section>

        <FadeIn direction="up" delay={0.2}>
          <section className="bg-footer-background text-footer-foreground rounded-[1.75rem] md:rounded-[3rem] p-6 sm:p-9 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-8 right-10 opacity-10">
              <Logo1 className="w-24 h-24 text-footer-foreground" animated={false} />
            </div>
            <div className="relative z-10 max-w-3xl">
              <span className="text-footer-foreground/50 tracking-[0.2em] uppercase text-xs font-sans font-medium block mb-6">{text("Il nostro impegno", "Our commitment")}</span>
              <h2 className="text-3xl md:text-5xl font-serif font-light mb-8 leading-[1.2]">
                {text("Ogni dettaglio conta.", "Every detail matters.")}<br />
                <span className="italic text-primary">{text("Sempre.", "Always.")}</span>
              </h2>
              <p className="text-lg md:text-xl font-sans font-light text-footer-foreground/80 leading-relaxed mb-8">
                {text("Ci occupiamo di ogni aspetto del progetto, dal primo appuntamento alla pubblicazione online. Anche i dettagli più piccoli contribuiscono alla qualità dell'insieme.", "We take care of every part of the project, from the first conversation to launch. Even the smallest details contribute to the quality of the whole.")}
              </p>
              <p className="text-lg md:text-xl font-sans font-light text-footer-foreground/80 leading-relaxed">
                {text("Il tuo sito deve funzionare bene, essere bello da guardare e comunicare chi sei con chiarezza. Trasformiamo la tua visione in uno spazio digitale ordinato e personale.", "Your website should work smoothly, look beautiful and communicate who you are with clarity. We turn your vision into a considered, personal digital space.")}
              </p>
            </div>
          </section>
        </FadeIn>
      </main>
    </div>
  );
}
