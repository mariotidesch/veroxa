import { FadeIn, FadeInItem } from "@/components/FadeIn";
import { Link } from "wouter";
import { ArrowRight, Quote } from "lucide-react";

import cafeImg from "@assets/generated_images/modern-cafe.jpg";
import boutiqueImg from "@assets/generated_images/artisan-boutique.jpg";
import restaurantImg from "@assets/generated_images/elegant-restaurant.jpg";

export default function Recensioni() {
  const reviews = [
    {
      id: 1,
      client: "Boutique d'Autore",
      type: "Boutique Sartoriale",
      quote: "Vexora ha saputo catturare l'essenza della nostra boutique. Il nuovo sito è di un'eleganza rara, fluido nella navigazione, e ci ha permesso di incrementare sensibilmente le prenotazioni per le consulenze sartoriali su appuntamento.",
      author: "Elena M.",
      image: boutiqueImg,
      empty: false
    },
    {
      id: 2,
      client: "Osteria Moderna",
      type: "Ristorazione d'Eccellenza",
      quote: "Un intervento straordinario. Il menu digitale e il sistema di prenotazione integrato hanno raffinato la nostra gestione quotidiana. Uno studio di professionisti impeccabili e costantemente presenti.",
      author: "Marco T.",
      image: restaurantImg,
      empty: false
    },
    {
      id: 3,
      client: "Caffè della Piazza",
      type: "Caffetteria Urbana",
      quote: "La piattaforma rispecchia fedelmente l'atmosfera luminosa e accogliente del nostro salotto urbano. I clienti ci raggiungono con maggiore facilità e riceviamo continui apprezzamenti per l'estetica del sito.",
      author: "Sofia L.",
      image: cafeImg,
      empty: false
    },
    {
      id: 4,
      empty: true
    },
    {
      id: 5,
      empty: true
    }
  ];

  return (
    <div className="w-full bg-background min-h-screen pt-40 pb-32">
      <main className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn direction="up">
          <header className="mb-24 md:w-3/4">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-primary" />
              <span className="text-primary tracking-[0.2em] uppercase text-xs font-sans font-medium">Testimonianze</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight mb-10 leading-[1.1]">
              Le voci di chi <br/>
              <span className="italic text-muted-foreground">si è affidato a noi.</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 font-sans font-light leading-relaxed max-w-3xl">
              La soddisfazione dei nostri clienti è il traguardo più prestigioso. Scoprite come abbiamo collaborato con eccellenze locali per trasformare la loro vetrina digitale in un autentico vantaggio competitivo.
            </p>
          </header>
        </FadeIn>

        <FadeIn staggerChildren={true} direction="none" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <FadeInItem key={review.id} className="h-full">
              {review.empty ? (
                <div className="h-full min-h-[500px] border border-border bg-white rounded-3xl p-10 flex flex-col items-center justify-center text-center group cursor-default relative overflow-hidden">
                  {/* Subtle diagonal lines pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 group-hover:opacity-60 transition-opacity duration-700" />
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-primary transition-all duration-500 bg-background">
                      <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    </div>
                    <h4 className="text-xl font-serif font-medium text-foreground mb-3">Spazio riservato</h4>
                    <p className="text-sm text-muted-foreground font-sans font-light max-w-[200px]">
                      La prossima narrazione di successo potrebbe essere la vostra.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-full border border-border bg-white rounded-3xl overflow-hidden flex flex-col shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-500 group">
                  <div className="h-64 w-full relative overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-foreground/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                    <img 
                      src={review.image} 
                      alt={`Progetto per ${review.client}`} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-10 flex flex-col flex-1 relative bg-white">
                    <div className="absolute -top-6 right-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg z-20">
                      <Quote className="w-5 h-5 text-primary" />
                    </div>
                    <div className="mb-8 flex-1 pt-4">
                      <p className="text-foreground font-serif font-light leading-relaxed text-lg">
                        "{review.quote}"
                      </p>
                    </div>
                    <div className="pt-6 border-t border-border/50">
                      <h4 className="font-serif font-medium text-xl">{review.client}</h4>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs tracking-wider uppercase font-sans text-muted-foreground">{review.type}</span>
                        <span className="text-primary font-sans font-medium text-sm">{review.author}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </FadeInItem>
          ))}
        </FadeIn>
        
        <FadeIn direction="up" delay={0.4} className="mt-32 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/30 via-accent/20 to-primary/10 rounded-[3rem] blur-xl opacity-50" />
          <div className="relative bg-white border border-border p-12 md:p-20 rounded-[3rem] text-center max-w-4xl mx-auto shadow-sm">
            <h3 className="text-3xl md:text-5xl font-serif font-light mb-6">Pronti a trasformare la vostra attività?</h3>
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