import { FadeIn } from "@/components/FadeIn";

export function PageHero({ label, title, description, align = "left" }: { label: string; title: string; description: string; align?: "left" | "center" }) {
  return (
    <FadeIn direction={align === "center" ? "up" : "right"} className={`relative mb-24 md:mb-32 overflow-hidden rounded-[2rem] border border-border bg-secondary/20 px-7 py-16 md:px-16 md:py-20 ${align === "center" ? "text-center" : ""}`}>
      <div className="absolute right-10 top-1/2 -translate-y-1/2 text-[11rem] md:text-[16rem] leading-none font-serif text-primary/10 select-none">X</div>
      <div className={`relative max-w-3xl ${align === "center" ? "mx-auto" : ""}`}>
        <span className="eyebrow">{label}</span>
        <h1 className="mt-6 text-5xl md:text-7xl font-serif font-light leading-[1.05]">{title}</h1>
        <p className="mt-7 max-w-2xl text-lg md:text-xl font-light leading-relaxed text-foreground/70">{description}</p>
        <div className={`mt-10 flex items-center gap-3 text-xs uppercase tracking-[.2em] text-primary ${align === "center" ? "justify-center" : ""}`}><span className="h-8 w-px bg-primary" /> Scorri per scoprire</div>
      </div>
    </FadeIn>
  );
}