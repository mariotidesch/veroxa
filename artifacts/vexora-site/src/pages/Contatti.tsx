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
import { PageHero } from "@/components/PageHero";
import { useLanguage } from "@/components/LanguageContext";

const serviceOptions = [
  { value: "Sito web", icon: <MonitorSmartphone className="h-4 w-4" />, it: "Sito web", en: "Website" },
  { value: "Landing page", icon: <MonitorSmartphone className="h-4 w-4" />, it: "Landing page / pagina singola", en: "Landing page / single page" },
  { value: "E-commerce e prenotazioni", icon: <ShoppingBag className="h-4 w-4" />, it: "E-commerce / prenotazioni", en: "E-commerce / bookings" },
  { value: "Restyling", icon: <RefreshCw className="h-4 w-4" />, it: "Restyling", en: "Redesign" },
  { value: "Identità visiva", icon: <Palette className="h-4 w-4" />, it: "Identità visiva", en: "Visual identity" },
  { value: "SEO e visibilità", icon: <Search className="h-4 w-4" />, it: "SEO / visibilità", en: "SEO / visibility" },
  { value: "Consulenza", icon: <CircleHelp className="h-4 w-4" />, it: "Vorrei un consiglio", en: "I'd like some advice" },
  { value: "Altro", icon: <CircleHelp className="h-4 w-4" />, it: "Altro / da definire", en: "Other / not sure yet" },
];

const styleOptions = [
  { value: "Direzione tecnica e modulare", it: "Tecnico e modulare", en: "Technical and modular" },
  { value: "Direzione visuale e narrativa", it: "Visuale e narrativo", en: "Visual and expressive" },
  { value: "Preferisco una direzione diversa", it: "Ho già un'altra idea", en: "I have another idea" },
  { value: "Vorrei un consiglio sullo stile", it: "Vorrei un consiglio", en: "I'd like some advice" },
];

export default function Contatti() {
  const { language, text } = useLanguage();
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
      selectedServices.length ? `${text("Servizi di interesse", "Services of interest")}: ${selectedServices.join(", ")}` : "",
      projectStyle ? `${text("Direzione visiva", "Visual direction")}: ${projectStyle}` : "",
      industry ? `${text("Settore", "Industry")}: ${industry}` : "",
      currentWebsite ? `${text("Sito attuale", "Current website")}: ${currentWebsite}` : "",
      projectTiming ? `${text("Tempistiche", "Timeline")}: ${projectTiming}` : "",
      contactMethod ? `${text("Preferenza di contatto", "Preferred contact method")}: ${contactMethod === "phone" ? text("Telefono", "Phone") : contactMethod === "email" ? "Email" : text("Indifferente", "No preference")}` : "",
      contactMethod === "phone" && phone ? `${text("Telefono", "Phone")}: ${phone}` : "",
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
        throw new Error(result.message ?? text("Non è stato possibile inviare la richiesta.", "We couldn't send your request."));
      }

      setIsSuccess(true);
      form.reset();
      setSelectedServices([]);
      setContactMethod("");
      if (successTimer.current) clearTimeout(successTimer.current);
      successTimer.current = setTimeout(() => setIsSuccess(false), 8000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : text("Non è stato possibile inviare la richiesta.", "We couldn't send your request."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-background min-h-screen pt-28 pb-14 md:pt-40 md:pb-20 relative overflow-hidden">
      {/* Soft abstract background blobs */}
      <div className="ambient-blur absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-secondary/30 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      <div className="ambient-blur absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-accent/30 rounded-full blur-[100px] opacity-50 pointer-events-none" />
      
      <main className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 relative z-10">
        <PageHero label={text("Contatti", "Contact")} title={text("Parliamo del tuo progetto.", "Let's talk about your project.")} description={text("Raccontaci la tua idea: ascoltiamo obiettivi e desideri per trovare insieme la strada giusta.", "Tell us your idea. We'll listen to your goals and help find the right direction together.")} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-24">
          
          <div className="lg:col-span-5">
            <FadeIn direction="right">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-primary" />
                <span className="text-primary tracking-[0.2em] uppercase text-xs font-sans font-medium">{text("Contatti", "Contact")}</span>
              </div>
              <h1 className="text-[clamp(2.25rem,10vw,3.5rem)] md:text-6xl font-serif font-light tracking-tight mb-6 md:mb-8 leading-[1.06] break-words">
                {text("Iniziamo a", "Let's start")}<br/>
                {text("costruire", "building")}<br/>
                <span className="italic text-muted-foreground">{text("qualcosa di tuo.", "something of your own.")}</span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 font-sans font-light leading-relaxed mb-10 md:mb-16">
                {text("Siamo disponibili per ascoltare le tue idee e trasformarle in una presenza online solida, bella e professionale. Il confronto ci aiuta a costruire una proposta adatta a te.", "We're here to hear your ideas and turn them into a polished, professional online presence. A conversation helps us shape a proposal that fits you.")}
              </p>

              <div className="rounded-[1.5rem] border border-primary/20 bg-card/75 p-5 sm:p-6 md:rounded-[1.75rem] md:p-8">
                <span className="eyebrow">{text("Bastano poche informazioni", "Just a few details")}</span>
                <p className="mt-4 text-xl font-serif font-light leading-snug">
                  {text("Non devi avere già tutto deciso.", "You don't need to have everything figured out.")}
                </p>
                <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                  {[text("Obiettivo", "Goal"), text("Servizi", "Services"), text("Tempistiche", "Timeline")].map((step, index) => (
                    <div key={step} className="rounded-xl bg-secondary/60 px-2 py-3">
                      <span className="block text-xs font-medium text-primary">0{index + 1}</span>
                      <span className="mt-1 block text-[11px] leading-tight text-muted-foreground">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-7 flex items-center gap-3 border-t border-border pt-5 text-sm text-muted-foreground">
                  <Logo1 className="h-8 w-8 shrink-0 text-primary" animated={false} />
                  <span>{text("Se hai dubbi, scegli “Vorrei un consiglio” e partiamo da lì.", "Not sure? Choose “I'd like some advice” and we'll take it from there.")}</span>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-7">
            <FadeIn direction="up" delay={0.2}>
              <div className="relative rounded-[1.5rem] border border-primary/15 bg-card p-4 sm:p-6 md:rounded-[2.5rem] md:p-12 shadow-[0_18px_55px_hsl(var(--foreground)/.06)]">
                <div className="mb-7 flex items-start justify-between gap-3 sm:mb-9 sm:gap-5">
                  <div>
                    <span className="eyebrow">{text("Da dove partiamo", "Let's start here")}</span>
                    <h3 className="mt-3 text-2xl sm:text-3xl font-serif font-light text-foreground">{text("Raccontaci il tuo progetto", "Tell us about your project")}</h3>
                  </div>
                  <span className="hidden rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-medium text-primary sm:inline-flex">
                     {text("Proposta su misura", "A tailored proposal")}
                  </span>
                </div>
                
                {isSuccess ? (
                  <div
                    className="success-enter bg-secondary/20 border border-secondary/30 p-10 rounded-[2rem] flex flex-col items-center text-center py-16"
                  >
                    <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mb-6 shadow-sm text-primary">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-serif font-medium mb-4">{text("Richiesta inviata", "Request sent")}</h4>
                    <p className="font-sans font-light text-foreground/70 text-lg max-w-md">
                      {text("Abbiamo ricevuto la tua richiesta e ti ricontatteremo appena possibile.", "We've received your request and will get back to you as soon as possible.")}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <fieldset className="space-y-4">
                      <legend className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">
                        {text("Quali servizi ti interessano?", "Which services are you interested in?")} <span className="normal-case tracking-normal">{text("(Facoltativo · puoi scegliere più opzioni)", "(Optional · choose as many as you like)")}</span>
                      </legend>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
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
                                <span className="flex-1 leading-snug">{language === "en" ? service.en : service.it}</span>
                                {checked && <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </fieldset>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <div className="space-y-3">
                        <label htmlFor="name" className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">{text("Nome e Cognome", "Full name")}</label>
                        <input 
                          type="text" 
                          id="name"
                          name="name"
                          required
                          data-testid="input-contact-name"
                          className="w-full bg-background/50 border-b-2 border-border px-0 py-3 focus:outline-none focus:border-primary transition-colors font-serif text-lg bg-transparent"
                          placeholder={text("Mario Rossi", "Jane Smith")}
                        />
                      </div>
                      <div className="space-y-3">
                         <label htmlFor="company" className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">{text("La tua attività", "Your business")} <span className="normal-case tracking-normal">{text("(Facoltativo)", "(Optional)")}</span></label>
                        <input 
                          type="text" 
                          id="company"
                          name="company"
                          data-testid="input-contact-company"
                          className="w-full bg-background/50 border-b-2 border-border px-0 py-3 focus:outline-none focus:border-primary transition-colors font-serif text-lg bg-transparent"
                           placeholder={text("Nome dell'impresa", "Business name")}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                      <div className="space-y-3">
                        <label htmlFor="industry" className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">{text("Settore", "Industry")} <span className="normal-case tracking-normal">{text("(Facoltativo)", "(Optional)")}</span></label>
                        <select
                          id="industry"
                          name="industry"
                          defaultValue=""
                          data-testid="select-project-industry"
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">{text("Scegli se vuoi", "Choose if you like")}</option>
                          <option value="Commercio">{text("Commercio", "Retail")}</option>
                          <option value="Ristorazione e ospitalità">{text("Ristorazione e ospitalità", "Food and hospitality")}</option>
                          <option value="Professionisti e servizi">{text("Professionisti e servizi", "Professional services")}</option>
                          <option value="Artigianato e produzione">{text("Artigianato e produzione", "Craft and manufacturing")}</option>
                          <option value="Altro">{text("Altro", "Other")}</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label htmlFor="currentWebsite" className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">{text("Sito attuale", "Current website")} <span className="normal-case tracking-normal">{text("(Facoltativo)", "(Optional)")}</span></label>
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
                        <label htmlFor="projectStyle" className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">{text("Direzione visiva", "Visual direction")} <span className="normal-case tracking-normal">{text("(Facoltativo)", "(Optional)")}</span></label>
                      <select
                        id="projectStyle"
                        name="projectStyle"
                        defaultValue=""
                        data-testid="select-project-style"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">{text("Non ho ancora una preferenza", "I don't have a preference yet")}</option>
                        {styleOptions.map((option) => (
                          <option key={option.value} value={option.value}>{language === "en" ? option.en : option.it}</option>
                        ))}
                      </select>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                         {text("Sono solo punti di partenza: possiamo adattarli o cambiare direzione in base alle tue esigenze.", "These are just starting points. We can adapt them or take a different direction to suit your needs.")}
                      </p>
                    </div>

                    <div className="space-y-3">
                        <label htmlFor="email" className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">{text("Indirizzo email", "Email address")}</label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        required
                        data-testid="input-contact-email"
                        className="w-full bg-background/50 border-b-2 border-border px-0 py-3 focus:outline-none focus:border-primary transition-colors font-serif text-lg bg-transparent"
                        placeholder={text("mario@esempio.it", "jane@example.com")}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                      <div className="space-y-3">
                        <label htmlFor="projectTiming" className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">{text("Quando vorresti iniziare?", "When would you like to start?")} <span className="normal-case tracking-normal">{text("(Facoltativo)", "(Optional)")}</span></label>
                        <select
                          id="projectTiming"
                          name="projectTiming"
                          defaultValue=""
                          data-testid="select-project-timing"
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="" disabled>{text("Seleziona una tempistica", "Choose a timeline")}</option>
                          <option value="Appena possibile">{text("Appena possibile", "As soon as possible")}</option>
                          <option value="Entro 1–3 mesi">{text("Entro 1–3 mesi", "Within 1–3 months")}</option>
                          <option value="Sto valutando">{text("Sto ancora valutando", "I'm still considering it")}</option>
                        </select>
                      </div>
                      <fieldset className="space-y-3">
                        <legend className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">{text("Come preferisci essere ricontattato?", "How should we contact you?")} <span className="normal-case tracking-normal">{text("(Facoltativo)", "(Optional)")}</span></legend>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { value: "email", label: "Email", icon: <Mail className="h-4 w-4 text-primary" aria-hidden="true" /> },
                            { value: "phone", label: text("Telefono", "Phone"), icon: <Phone className="h-4 w-4 text-primary" aria-hidden="true" /> },
                            { value: "any", label: text("Indifferente", "No preference"), icon: null },
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
                        <label htmlFor="phone" className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">{text("Numero di telefono", "Phone number")} <span className="normal-case tracking-normal">{text("(Facoltativo)", "(Optional)")}</span></label>
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
                        <label htmlFor="message" className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground">{text("Il tuo progetto", "Your project")}</label>
                      <textarea 
                        id="message"
                        name="message"
                        required
                        rows={4}
                        defaultValue={initialMessage}
                        data-testid="input-project-message"
                        className="w-full rounded-2xl border border-border bg-background/60 px-4 py-4 font-serif text-lg text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                        placeholder={text("Descrivi brevemente le tue esigenze...", "Briefly describe what you need...")}
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      data-testid="button-submit-contact"
                      className="w-full group relative px-8 py-5 bg-foreground text-background rounded-full overflow-hidden flex items-center justify-center gap-3 mt-10 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                       <span className="relative z-10 text-sm tracking-[0.1em] uppercase font-sans font-medium">{isSubmitting ? text("Invio in corso...", "Sending...") : text("Invia richiesta", "Send request")}</span>
                      <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    </button>
                    {submitError && (
                      <p role="alert" className="text-sm text-red-600 text-center font-sans mt-4">
                        {submitError}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground text-center font-sans mt-6">
                      {text("La richiesta verrà inviata direttamente a info.veroxa@gmail.com.", "Your request will be sent directly to info.veroxa@gmail.com.")}
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