import { FadeIn } from "@/components/FadeIn";
import { Logo1 } from "@/components/Logos";

export function PageHero({ label, title, description, align = "left" }: { label: string; title: string; description: string; align?: "left" | "center" }) {
  return (
    <FadeIn direction={align === "center" ? "up" : "right"} className={`relative mb-16 overflow-hidden rounded-[1.5rem] border border-border bg-secondary/20 px-5 py-10 sm:px-7 sm:py-14 md:mb-32 md:rounded-[2rem] md:px-16 md:py-20 ${align === "center" ? "text-center" : ""}`}>
      <div className="pointer-events-none absolute right-6 top-1/2 hidden h-28 w-28 -translate-y-1/2 select-none text-foreground/[.06] lg:right-16 lg:block lg:h-64 lg:w-64" aria-hidden="true">
        <Logo1 className="h-full w-full" animated={false} />
      </div>
      <div className={`relative max-w-3xl ${align === "center" ? "mx-auto" : ""}`}>
        <span className="eyebrow">{label}</span>
        <h1 className="mt-5 text-[clamp(2.25rem,10vw,3.5rem)] font-serif font-light leading-[1.04] break-words md:mt-6 md:text-6xl lg:text-7xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base font-light leading-relaxed text-foreground/70 sm:text-lg md:mt-7 md:text-lg lg:text-xl">{description}</p>
        <div className={`mt-7 flex items-center gap-3 text-[10px] uppercase tracking-[.16em] text-primary sm:text-xs sm:tracking-[.2em] md:mt-10 ${align === "center" ? "justify-center" : ""}`}><span className="h-8 w-px shrink-0 bg-primary" /> Scorri per scoprire</div>
      </div>
    </FadeIn>
  );
}