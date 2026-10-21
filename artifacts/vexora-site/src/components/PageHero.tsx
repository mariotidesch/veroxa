import { FadeIn } from "@/components/FadeIn";
import { Logo1 } from "@/components/Logos";

export function PageHero({ label, title, description, align = "left" }: { label: string; title: string; description: string; align?: "left" | "center" }) {
  return (
    <FadeIn direction={align === "center" ? "up" : "right"} className={`relative mb-24 md:mb-32 overflow-hidden rounded-[2rem] border border-border bg-secondary/20 px-7 py-16 md:px-16 md:py-20 ${align === "center" ? "text-center" : ""}`}>
      <div className="absolute right-10 top-1/2 h-40 w-40 -translate-y-1/2 text-foreground/[.06] select-none md:right-16 md:h-64 md:w-64" aria-hidden="true">
        <Logo1 className="h-full w-full" animated={false} />
      </div>
      <div className={`relative max-w-3xl ${align === "center" ? "mx-auto" : ""}`}>
        <span className="eyebrow">{label}</span>
        <h1 className="mt-6 text-5xl md:text-7xl font-serif font-light leading-[1.05]">{title}</h1>
        <p className="mt-7 max-w-2xl text-lg md:text-xl font-light leading-relaxed text-foreground/70">{description}</p>
        <div className={`mt-10 flex items-center gap-3 text-xs uppercase tracking-[.2em] text-primary ${align === "center" ? "justify-center" : ""}`}><span className="h-8 w-px bg-primary" /> Scorri per scoprire</div>
      </div>
    </FadeIn>
  );
}