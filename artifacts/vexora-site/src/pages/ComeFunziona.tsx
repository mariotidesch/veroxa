import { FadeIn, FadeInItem } from "@/components/FadeIn";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";

export default function ComeFunziona() {
  const steps = [
    {
      num: "01",
      title: "Ascolto & Visione",
      subtitle: "La comprensione profonda",
      desc: "Tutto inizia con un dialogo. Ascoltiamo la storia della vostra attività, le vostre ambizioni e studiamo l'estetica del vostro brand. Raccogliamo i materiali (fotografie, testi, ispirazioni) e definiamo insieme gli obiettivi. Il risultato di questa fase è una direzione chiara, un moodboard visivo e una strategia ben delineata."
    },
    {
      num: "02",
      title: "Sartoria Digitale",
      subtitle: "L'artigianato in codice",
      desc: "I nostri designer delineano l'interfaccia, scegliendo meticolosamente la tipografia, le proporzioni e le micro-interazioni che daranno vita alla pagina. Una volta approvato il design, i nostri sviluppatori lo traducono in codice pulito, veloce e reattivo. Ogni componente viene cesellato a mano, garantendo fluidità su computer, tablet e smartphone."
    },
    {
      num: "03",
      title: "Varo & Affiancamento",
      subtitle: "Il debutto online",
      desc: "Dopo rigorosi test di qualità e prestazioni, il vostro nuovo spazio digitale viene pubblicato. Ma il nostro compito non finisce qui: vi guidiamo nei primi passi, vi insegniamo a gestire in autonomia i contenuti (come menu o cataloghi) e rimaniamo a disposizione per supporto, manutenzione o future evoluzioni del progetto."
    }
  ];

  return (
    <div className="w-full bg-background min-h-screen pt-40 pb-20 relative">
      <main className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn direction="up">
          <header className="mb-32 text-center flex flex-col items-center">
            <PageHero align="center" label="Il Metodo Vexora" title="Dall’idea al sito, un passaggio alla volta." description="Un flusso di lavoro trasparente e collaborativo, dall’intuizione iniziale alla pubblicazione." />
            <div className="flex items-center gap-4 mb-8">
              <span className="text-primary tracking-[0.2em] uppercase text-xs font-sans font-medium">Il Metodo Vexora</span>
            <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight mb-10 leading-[1.1] max-w-4xl">
              Una procedura sartoriale, <br/>
              <span className="italic text-muted-foreground">passo dopo passo.</span>
            </h1>
            <p className="text-xl text-foreground/70 font-sans font-light leading-relaxed max-w-2xl">
              Crediamo in un flusso di lavoro trasparente e collaborativo. Senza complicazioni tecniche, vi accompagniamo dall'idea iniziale fino alla pubblicazione.
            </p>
            </div>
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
            <h3 className="text-3xl md:text-5xl font-serif font-light mb-6">Iniziamo il viaggio</h3>
            <p className="text-muted-foreground font-sans font-light text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Contattateci per una consulenza su misura. Scopriremo insieme come valorizzare l'identità del vostro brand nel mondo digitale.
            </p>
            <Link href="/contatti">
              <div className="inline-flex group relative px-10 py-5 bg-foreground text-background rounded-full cursor-pointer overflow-hidden items-center justify-center gap-3">
                <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                <span className="relative z-10 text-sm tracking-[0.1em] uppercase font-sans font-medium">Contattateci ora</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </FadeIn>

      </main>
    </div>
  );
}
