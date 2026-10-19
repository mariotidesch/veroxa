import { FadeIn, FadeInItem } from "@/components/FadeIn";
import { PageHero } from "@/components/PageHero";
import { ArrowDown, ArrowRight, Monitor, Smartphone } from "lucide-react";
import { Link } from "wouter";

const concepts = [
  {
    id: "fioreria",
    category: "Bottega · Concept",
    title: "La fioreria di quartiere",
    beforeTitle: "Un biglietto, soltanto",
    beforeText: "Orari e contatti dispersi. La bellezza della bottega resta fuori dallo schermo.",
    afterTitle: "Un invito a entrare",
    afterText: "Un’identità delicata, un catalogo stagionale e indicazioni sempre a portata di mano.",
    image: "/veroxa-film/images/digital-identity.jpg",
    imageAlt: "Composizione grafica per il concept di una fioreria"
  },
  {
    id: "ristorante",
    category: "Ristorazione · Concept",
    title: "Osteria Sera",
    beforeTitle: "Il menu in una foto",
    beforeText: "Una pagina difficile da leggere, soprattutto da telefono. Prenotare richiede un passaggio in più.",
    afterTitle: "La tavola è pronta",
    afterText: "Menu leggibile, atmosfera riconoscibile e prenotazione a un solo tocco.",
    image: "/veroxa-film/images/digital-responsive.jpg",
    imageAlt: "Proposta responsive di un sito per ristorante su più schermi"
  },
  {
    id: "atelier",
    category: "Atelier · Concept",
    title: "Studio Forma",
    beforeTitle: "Prodotti senza vetrina",
    beforeText: "Una selezione artigianale raccontata senza ordine e senza un modo semplice per acquistare.",
    afterTitle: "Una vetrina aperta",
    afterText: "Una selezione curata e un percorso d’acquisto chiaro, dal desktop al telefono.",
    image: "/veroxa-film/images/digital-commerce.jpg",
    imageAlt: "Concept di vetrina e-commerce per un atelier"
  }
];

function BeforePanel({ title, text }: { title: string; text: string }) {
  return (
    <div className="h-full min-h-[210px] bg-[#f1f0ea] p-6 md:p-8 flex flex-col justify-between border border-foreground/[.06]">
      <div className="demo-browser-dots flex items-center justify-between">
        <span className="text-[9px] tracking-[.16em] uppercase text-foreground/35">Presenza online</span>
      </div>
      <div className="py-7">
        <div className="w-9 h-[2px] bg-foreground/20 mb-5" />
        <h4 className="font-serif text-2xl md:text-3xl font-light text-foreground/65">{title}</h4>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-foreground/50">{text}</p>
      </div>
      <span className="text-[10px] tracking-[.16em] uppercase text-foreground/40">Esempio illustrativo · prima</span>
    </div>
  );
}

export default function Progetti() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <PageHero
            label="Galleria · Concept dimostrativi"
            title="Il prima. Il dopo. La storia che li unisce."
            description="Qui raccoglieremo i siti realizzati per attività reali. Per ora trovi tre concept dimostrativi: esempi visivi, non progetti di clienti."
          />
        </FadeIn>

        <FadeIn className="my-12 md:my-16 rounded-2xl bg-secondary/35 border border-primary/10 p-5 md:p-7 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Una galleria pronta a crescere</p>
            <p className="mt-1 text-sm text-muted-foreground">Sostituiremo questi concept con immagini autentiche del prima e dopo, con il consenso di ogni attività.</p>
          </div>
          <span className="shrink-0 text-xs tracking-[.14em] uppercase text-primary">Portfolio in aggiornamento</span>
        </FadeIn>

        <div className="space-y-12 md:space-y-16">
          {concepts.map((concept, index) => (
            <FadeInItem key={concept.id}>
              <article className="overflow-hidden rounded-[1.75rem] border border-border bg-background shadow-[0_18px_55px_rgba(26,48,68,.06)]" data-testid={`card-concept-${concept.id}`}>
                <div className="p-6 md:px-9 md:py-7 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <span className="eyebrow">{concept.category}</span>
                    <h2 className="mt-3 text-3xl md:text-4xl font-light">{concept.title}</h2>
                  </div>
                  <span className="text-xs tracking-[.15em] uppercase text-muted-foreground">Concept {String(index + 1).padStart(2, "0")} / 03</span>
                </div>
                <div className="grid md:grid-cols-2 border-y border-border">
                  <div className="min-h-[250px]">
                    <BeforePanel title={concept.beforeTitle} text={concept.beforeText} />
                  </div>
                  <div className="relative min-h-[250px] overflow-hidden bg-[#16243a]">
                    <img
                      src={concept.image}
                      alt={concept.imageAlt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                      loading="lazy"
                      data-testid={`img-concept-${concept.id}`}
                    />
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur rounded-full px-3 py-2 text-[10px] uppercase tracking-[.14em] text-foreground/75">Esempio illustrativo · dopo</div>
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <span className="w-9 h-9 rounded-full bg-background/90 backdrop-blur flex items-center justify-center" aria-label="Anteprima desktop"><Monitor className="w-4 h-4 text-foreground/70" /></span>
                      <span className="w-9 h-9 rounded-full bg-background/90 backdrop-blur flex items-center justify-center" aria-label="Anteprima mobile"><Smartphone className="w-4 h-4 text-foreground/70" /></span>
                    </div>
                  </div>
                </div>
                <div className="px-6 md:px-9 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-sm leading-relaxed text-muted-foreground max-w-2xl">{concept.afterText}</p>
                  <span className="inline-flex items-center gap-2 text-xs tracking-[.12em] uppercase text-primary shrink-0"><ArrowDown className="w-3.5 h-3.5" /> Identità, resa digitale</span>
                </div>
              </article>
            </FadeInItem>
          ))}
        </div>

        <FadeIn className="mt-24 md:mt-32 bg-[#e9f0ef] rounded-[2rem] px-7 py-12 md:p-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="eyebrow">Il prossimo progetto può essere il tuo</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-light leading-tight">La tua attività merita una vetrina <span className="italic text-primary">tutta sua.</span></h2>
          </div>
          <Link href="/contatti" className="group inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-4 text-sm text-background hover:bg-primary transition-colors shrink-0" data-testid="link-contact-projects">
            Raccontaci la tua idea <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeIn>
      </div>
    </main>
  );
}
