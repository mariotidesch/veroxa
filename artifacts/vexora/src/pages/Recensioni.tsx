import { FadeIn } from "@/components/FadeIn";
import { Link } from "wouter";

// the actual URLs from the Replit workspace will be used
import cafeImg from "@assets/generated_images/modern-cafe.jpg";
import boutiqueImg from "@assets/generated_images/artisan-boutique.jpg";
import restaurantImg from "@assets/generated_images/elegant-restaurant.jpg";

export default function Recensioni() {
  const reviews = [
    {
      id: 1,
      client: "Boutique d'Autore",
      type: "Negozio di abbigliamento",
      quote: "Vexora ha saputo catturare l'essenza della nostra boutique. Il nuovo sito è elegante, veloce e ci ha permesso di raddoppiare le prenotazioni per le consulenze di stile in negozio.",
      author: "Elena M.",
      image: boutiqueImg,
      empty: false
    },
    {
      id: 2,
      client: "Osteria Moderna",
      type: "Ristorante",
      quote: "Un lavoro eccezionale. Il menu digitale e il sistema di prenotazione integrato hanno semplificato enormemente la nostra gestione quotidiana. Professionali e sempre disponibili.",
      author: "Marco T.",
      image: restaurantImg,
      empty: false
    },
    {
      id: 3,
      client: "Caffè della Piazza",
      type: "Caffetteria",
      quote: "Il sito rispecchia perfettamente l'atmosfera luminosa e accogliente del nostro locale. I clienti ci trovano molto più facilmente e abbiamo ricevuto tantissimi complimenti per il design.",
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
    <div className="w-full bg-background min-h-screen pt-32 pb-20">
      <main className="max-w-7xl mx-auto px-6">
        <FadeIn direction="up">
          <header className="mb-24 md:w-2/3">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
              Le voci di chi ci ha scelto.
            </h1>
            <p className="text-xl text-muted-foreground font-serif font-light leading-relaxed">
              La fiducia dei nostri clienti è il nostro risultato più grande. Scopri come abbiamo aiutato attività locali a trasformare la loro presenza digitale in un vantaggio competitivo.
            </p>
          </header>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <FadeIn key={review.id} delay={i * 0.1} direction="up" className="h-full">
              {review.empty ? (
                <div className="h-full min-h-[400px] border border-dashed border-border/60 bg-muted/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center group cursor-default">
                  <div className="w-12 h-12 rounded-full bg-secondary/30 text-secondary-foreground flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-muted-foreground mb-2">Spazio riservato</h4>
                  <p className="text-sm text-muted-foreground/60 font-serif">
                    Il prossimo successo potrebbe essere il tuo.
                  </p>
                </div>
              ) : (
                <div className="h-full border border-border bg-card rounded-3xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-48 w-full relative overflow-hidden bg-muted">
                    <img 
                      src={review.image} 
                      alt={`Interno di ${review.client}`} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="mb-6 flex-1">
                      <div className="flex gap-1 mb-4 text-primary">
                        {[...Array(5)].map((_, idx) => (
                          <svg key={idx} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-foreground font-serif font-light leading-relaxed italic">
                        "{review.quote}"
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">{review.client}</h4>
                      <p className="text-sm text-muted-foreground flex justify-between items-center mt-1">
                        <span>{review.type}</span>
                        <span className="text-primary font-medium">{review.author}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </FadeIn>
          ))}
        </div>
        
        <FadeIn direction="up" delay={0.4} className="mt-24 text-center">
          <div className="inline-block p-12 rounded-3xl bg-secondary/20 w-full max-w-3xl">
            <h3 className="text-2xl md:text-3xl font-light mb-4">Pronto a trasformare la tua attività?</h3>
            <p className="text-muted-foreground font-serif mb-8 max-w-lg mx-auto">
              Contattaci per una consulenza senza impegno e scopriamo insieme come valorizzare il tuo brand.
            </p>
            <Link href="/contatti">
              <span className="px-8 py-4 bg-foreground text-background rounded-full hover:bg-primary transition-colors cursor-pointer text-sm tracking-wide font-medium inline-block">
                Contattaci ora
              </span>
            </Link>
          </div>
        </FadeIn>
      </main>
    </div>
  );
}
