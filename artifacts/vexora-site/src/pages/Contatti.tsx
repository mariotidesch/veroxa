import { FadeIn } from "@/components/FadeIn";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  CircleHelp,
  Mail,
  MonitorSmartphone,
  Palette,
  Phone,
  RefreshCw,
  Search,
  ShoppingBag,
} from "lucide-react";
import { Logo1 } from "@/components/Logos";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";

const serviceOptions = [
  { value: "Sito web", icon: <MonitorSmartphone className="h-4 w-4" />, label: "Sito web" },
  { value: "Landing page", icon: <MonitorSmartphone className="h-4 w-4" />, label: "Landing page / pagina singola" },
  { value: "E-commerce e prenotazioni", icon: <ShoppingBag className="h-4 w-4" />, label: "E-commerce / prenotazioni" },
  { value: "Restyling", icon: <RefreshCw className="h-4 w-4" />, label: "Restyling" },
  { value: "Identità visiva", icon: <Palette className="h-4 w-4" />, label: "Identità visiva" },
  { value: "SEO e visibilità", icon: <Search className="h-4 w-4" />, label: "SEO / visibilità" },
  { value: "Consulenza", icon: <CircleHelp className="h-4 w-4" />, label: "Vorrei un consiglio" },
  { value: "Altro", icon: <CircleHelp className="h-4 w-4" />, label: "Altro / da definire" },
];

const styleOptions = [
  { value: "Direzione tecnica e modulare (ispirazione Replit)", label: "Tecnica e modulare · ispirazione Replit" },
  { value: "Direzione visuale e narrativa (ispirazione Lovable)", label: "Visuale e narrativa · ispirazione Lovable" },
  { value: "Preferisco una direzione diversa", label: "Ho già un'altra idea" },
  { value: "Vorrei un consiglio sullo stile", label: "Vorrei un consiglio" },
];

export default function Contatti() {
  const initialMessage = new URLSearchParams(window.location.search).get("interesse") ?? "";
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [contactMethod, setContactMethod] = useState<"" | "email" | "phone" | "any">("");
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (successTimer.current) clearTimeout(successTimer.current);
    };
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const company = String(data.get("company") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const projectTiming = String(data.get("projectTiming") ?? "");
    const projectStyle = String(data.get("projectStyle") ?? "");
    const industry = String(data.get("industry") ?? "");
    const currentWebsite = String(data.get("currentWebsite") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const extraDetails = [
      selectedServices.length ? `Servizi di interesse: ${selectedServices.join(", ")}` : "",
      projectStyle ? `Direzione visiva: ${projectStyle}` : "",
      industry ? `Settore: ${industry}` : "",
      currentWebsite ? `Sito attuale: ${currentWebsite}` : "",
      projectTiming ? `Tempistiche: ${projectTiming}` : "",
      contactMethod ? `Preferenza di contatto: ${contactMethod === "phone" ? "Telefono" : contactMethod === "email" ? "Email" : "Indifferente"}` : "",
      contactMethod === "phone" && phone ? `Telefono: ${phone}` : "",
    ].filter(Boolean);
    const completeMessage = [message.trim(), ...extraDetails].filter(Boolean).join("\n\n");

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, email, message: completeMessage }),
      });

      const result = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(result.message ?? "Non è stato possibile inviare la richiesta.");
      }

      setIsSuccess(true);
      form.reset();
      setSelectedServices([]);
      setContactMethod("");
      if (successTimer.current) clearTimeout(successTimer.current);
      successTimer.current = setTimeout(() => setIsSuccess(false), 8000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Non è stato possibile inviare la richiesta.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-background min-h-screen pt-40 pb-20 relative overflow-hidden">
      {/* Soft abstract background blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-secondary/30 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-accent/30 rounded-full blur-[100px] opacity-50 pointer-events-none" />
      
      <main className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <PageHero label="Contatti" title="Parliamo del tuo progetto." description="Raccontaci la tua idea: ascoltiamo obiettivi e desideri per trovare insieme la strada giusta." />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          <div className="lg:col-span-5">
            <FadeIn direction="right">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-primary" />
                <span className="text-primary tracking-[0.2em] uppercase text-xs font-sans font-medium">Contatti</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-light tracking-tight mb-8 leading-[1.1]">
                Iniziamo a<br/>
                costruire<br/>
                <span className="italic text-muted-foreground">qualcosa di tuo.</span>
              </h1>
              <p className="text-xl text-foreground/70 font-sans font-light leading-relaxed mb-16">
                Siamo disponibili per ascoltare le tue idee e trasformarle in una presenza online solida, bella e professionale. Il confronto ci aiuta a costruire una proposta adatta a te.
              </p>

              <div className="rounded-[1.75rem] border border-primary/20 bg-card/75 p-6 md:p-8">
                <span className="eyebrow">Bastano poche informazioni</span>
                <p className="mt-4 text-xl font-serif font-light leading-snug">
                  Non devi avere già tutto deciso.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                  {["Obiettivo", "Servizi", "Tempistiche"].map((step, index) => (
                    <div key={step} className="rounded-xl bg-secondary/60 px-2 py-3">
                      <span className="block text-xs font-medium text-primary">0{index + 1}</span>
                      <span className="mt-1 block text-[11px] leading-tight text-muted-foreground">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-7 flex items-center gap-3 border-t border-border pt-5 text-sm text-muted-foreground">
                  <Logo1 className="h-8 w-8 shrink-0 text-primary" animated={false} />
                  <span>Se hai dubbi, scegli “Vorrei un consiglio” e partiamo da lì.</span>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-7">
            <FadeIn direction="up" delay={0.2}>
              <div className="relative rounded-[2.5rem] border border-primary/15 bg-card p-7 shadow-[0_18px_55px_hsl(var(--foreground)/.06)] md:p-12">
                <div className="mb-9 flex items-start justify-between gap-5">
                  <div>
                    <span className="eyebrow">Da dove partiamo</span>
                    <h3 className="mt-3 text-3xl font-serif font-light text-foreground">Raccontaci il tuo progetto</h3>
                  </div>
                  <span className="hidden rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-medium text-primary sm:inline-flex">
                    Proposta su misura
                  </span>
                </div>
                
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-secondary/20 border border-secondary/30 p-10 rounded-[2rem] flex flex-col items-center text-center py-16"
                  >
                    <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mb-6 shadow-sm text-primary">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-serif font-medium mb-4">Richiesta inviata</h4>
                    <p className="font-sans font-light text-foreground/70 text-lg max-w-md">
                      Abbiamo ricevuto la tua richiesta e ti ricontatteremo appena possibile.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <fieldset className="space-y-4">
                      <legend className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">
                        Quali servizi ti interessano? <span className="normal-case tracking-normal">(Facoltativo · puoi scegliere più opzioni)</span>
                      </legend>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {serviceOptions.map((service, index) => {
                          const checked = selectedServices.includes(service.value);
                          const id = `service-option-${index}`;
                          return (
                            <div key={service.value} className="relative">
                              <input
                                id={id}
                                type="checkbox"
                                name="services"
                                value={service.value}
                                checked={checked}
                                onChange={(event) => {
                                  setSelectedServices((current) =>
                                    event.target.checked
                                      ? [...current, service.value]
                                      : current.filter((value) => value !== service.value),
                                  );
                                }}
                                className="peer sr-only"
                                data-testid={`input-service-${index}`}
                              />
                              <label
                                htmlFor={id}
                                className={`flex min-h-[58px] cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-primary ${
                                  checked
                                    ? "border-primary bg-primary/10 text-foreground"
                                    : "border-border bg-background/60 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                                }`}
                              >
                                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${checked ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"}`}>
                                  {service.icon}
                                </span>
                                <span className="flex-1 leading-snug">{service.label}</span>
                                {checked && <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </fieldset>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label htmlFor="name" className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">Nome e Cognome</label>
                        <input 
                          type="text" 
                          id="name"
                          name="name"
                          required
                          data-testid="input-contact-name"
                          className="w-full bg-background/50 border-b-2 border-border px-0 py-3 focus:outline-none focus:border-primary transition-colors font-serif text-lg bg-transparent"
                          placeholder="Mario Rossi"
                        />
                      </div>
                      <div className="space-y-3">
                         <label htmlFor="company" className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">La vostra attività <span className="normal-case tracking-normal">(Facoltativo)</span></label>
                        <input 
                          type="text" 
                          id="company"
                          name="company"
                          data-testid="input-contact-company"
                          className="w-full bg-background/50 border-b-2 border-border px-0 py-3 focus:outline-none focus:border-primary transition-colors font-serif text-lg bg-transparent"
                          placeholder="Nome dell'impresa"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                      <div className="space-y-3">
                        <label htmlFor="industry" className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">Settore <span className="normal-case tracking-normal">(Facoltativo)</span></label>
                        <select
                          id="industry"
                          name="industry"
                          defaultValue=""
                          data-testid="select-project-industry"
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Scegli se vuoi</option>
                          <option value="Commercio">Commercio</option>
                          <option value="Ristorazione e ospitalità">Ristorazione e ospitalità</option>
                          <option value="Professionisti e servizi">Professionisti e servizi</option>
                          <option value="Artigianato e produzione">Artigianato e produzione</option>
                          <option value="Altro">Altro</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label htmlFor="currentWebsite" className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">Sito attuale <span className="normal-case tracking-normal">(Facoltativo)</span></label>
                        <input
                          type="text"
                          id="currentWebsite"
                          name="currentWebsite"
                          autoComplete="url"
                          data-testid="input-current-website"
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="projectStyle" className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">Direzione visiva <span className="normal-case tracking-normal">(Facoltativo)</span></label>
                      <select
                        id="projectStyle"
                        name="projectStyle"
                        defaultValue=""
                        data-testid="select-project-style"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Non ho ancora una preferenza</option>
                        {styleOptions.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        Sono solo punti di partenza: possiamo adattarli o cambiare direzione in base alle tue esigenze.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="email" className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">Indirizzo Email</label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        required
                        data-testid="input-contact-email"
                        className="w-full bg-background/50 border-b-2 border-border px-0 py-3 focus:outline-none focus:border-primary transition-colors font-serif text-lg bg-transparent"
                        placeholder="mario@esempio.it"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                      <div className="space-y-3">
                        <label htmlFor="projectTiming" className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">Quando vorresti iniziare? <span className="normal-case tracking-normal">(Facoltativo)</span></label>
                        <select
                          id="projectTiming"
                          name="projectTiming"
                          defaultValue=""
                          data-testid="select-project-timing"
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="" disabled>Seleziona una tempistica</option>
                          <option value="Appena possibile">Appena possibile</option>
                          <option value="Entro 1–3 mesi">Entro 1–3 mesi</option>
                          <option value="Sto valutando">Sto ancora valutando</option>
                        </select>
                      </div>
                      <fieldset className="space-y-3">
                        <legend className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">Come preferisci essere ricontattato? <span className="normal-case tracking-normal">(Facoltativo)</span></legend>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { value: "email", label: "Email", icon: <Mail className="h-4 w-4 text-primary" aria-hidden="true" /> },
                            { value: "phone", label: "Telefono", icon: <Phone className="h-4 w-4 text-primary" aria-hidden="true" /> },
                            { value: "any", label: "Indifferente", icon: null },
                          ].map((method) => (
                            <button
                              key={method.value}
                              type="button"
                              onClick={() => setContactMethod(method.value as "email" | "phone" | "any")}
                              aria-pressed={contactMethod === method.value}
                              data-testid={`button-contact-${method.value}`}
                              className={`inline-flex min-h-12 items-center justify-center gap-1.5 rounded-xl border px-2 py-3 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:text-sm ${
                                contactMethod === method.value ? "border-primary bg-primary/10 text-foreground" : "border-border bg-background text-muted-foreground hover:border-primary/50"
                              }`}
                            >
                              {method.icon}{method.label}
                            </button>
                          ))}
                        </div>
                      </fieldset>
                    </div>

                    {contactMethod === "phone" && (
                      <div className="space-y-3">
                        <label htmlFor="phone" className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">Numero di telefono <span className="normal-case tracking-normal">(Facoltativo)</span></label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          autoComplete="tel"
                          data-testid="input-contact-phone"
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 font-serif text-lg text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                          placeholder="+39 333 123 4567"
                        />
                      </div>
                    )}

                    <div className="space-y-3">
                        <label htmlFor="message" className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">Il tuo progetto</label>
                      <textarea 
                        id="message"
                        name="message"
                        required
                        rows={4}
                        defaultValue={initialMessage}
                        data-testid="input-project-message"
                        className="w-full rounded-2xl border border-border bg-background/60 px-4 py-4 font-serif text-lg text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                        placeholder="Descrivete brevemente le vostre esigenze..."
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      data-testid="button-submit-contact"
                      className="w-full group relative px-8 py-5 bg-foreground text-background rounded-full overflow-hidden flex items-center justify-center gap-3 mt-10 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                      <span className="relative z-10 text-sm tracking-[0.1em] uppercase font-sans font-medium">{isSubmitting ? "Invio in corso..." : "Invia richiesta"}</span>
                      <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    </button>
                    {submitError && (
                      <p role="alert" className="text-sm text-red-600 text-center font-sans mt-4">
                        {submitError}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground text-center font-sans mt-6">
                      La richiesta verrà inviata direttamente a info.veroxa@gmail.com.
                    </p>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </main>
    </div>
  );
}