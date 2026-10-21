type StyleDirectionArtworkProps = {
  variant: "technical" | "visual";
};

export function StyleDirectionArtwork({ variant }: StyleDirectionArtworkProps) {
  if (variant === "technical") {
    return (
      <div className="style-art style-art--technical" aria-hidden="true">
        <svg viewBox="0 0 720 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="technical-panel" x1="66" y1="47" x2="590" y2="355" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--art-panel-a)" />
              <stop offset="1" stopColor="var(--art-panel-b)" />
            </linearGradient>
            <pattern id="technical-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M24 0H0V24" stroke="var(--art-grid)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect x="25" y="24" width="670" height="352" rx="30" fill="url(#technical-panel)" />
          <rect x="25" y="24" width="670" height="352" rx="30" fill="url(#technical-grid)" />
          <path d="M25 85H695" stroke="var(--art-line)" />
          <circle cx="58" cy="55" r="5" fill="var(--art-accent)" />
          <circle cx="77" cy="55" r="5" fill="var(--art-line)" />
          <circle cx="96" cy="55" r="5" fill="var(--art-line)" />
          <rect x="58" y="114" width="212" height="222" rx="17" fill="var(--art-panel-a)" stroke="var(--art-line)" />
          <path d="M83 153H191M83 176H164M83 199H218M83 222H179" stroke="var(--art-code)" strokeWidth="7" strokeLinecap="round" />
          <path d="M101 265L125 287L101 309M145 310H184" stroke="var(--art-accent)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="294" y="114" width="369" height="98" rx="17" fill="var(--art-panel-a)" stroke="var(--art-line)" />
          <rect x="318" y="137" width="102" height="51" rx="11" fill="var(--art-accent-soft)" />
          <path d="M443 147H619M443 169H570M443 188H602" stroke="var(--art-line)" strokeWidth="6" strokeLinecap="round" />
          <rect x="294" y="231" width="174" height="105" rx="17" fill="var(--art-accent-soft)" />
          <rect x="489" y="231" width="174" height="105" rx="17" fill="var(--art-panel-a)" stroke="var(--art-line)" />
          <path d="M319 306L350 276L374 291L415 252M513 305H626M513 282H600M513 258H581" stroke="var(--art-accent)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="638" cy="106" r="16" fill="var(--art-accent)" />
        </svg>
      </div>
    );
  }

  return (
    <div className="style-art style-art--visual" aria-hidden="true">
      <svg viewBox="0 0 720 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="visual-wash" x1="91" y1="54" x2="628" y2="355" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--art-panel-a)" />
            <stop offset="1" stopColor="var(--art-panel-b)" />
          </linearGradient>
            <linearGradient id="visual-orbit" x1="419" y1="83" x2="588" y2="294" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--art-accent)" />
            <stop offset="1" stopColor="var(--art-accent-soft)" />
          </linearGradient>
        </defs>
        <rect x="25" y="24" width="670" height="352" rx="30" fill="url(#visual-wash)" />
        <circle cx="548" cy="154" r="112" fill="url(#visual-orbit)" opacity=".88" />
        <circle cx="548" cy="154" r="81" stroke="var(--art-line)" strokeWidth="1.5" />
        <circle cx="548" cy="154" r="49" stroke="var(--art-line)" strokeWidth="1.5" />
        <path d="M423 262C470 196 521 318 650 220" stroke="var(--art-ink)" strokeWidth="3" strokeLinecap="round" />
        <path d="M83 112H232M83 128H184" stroke="var(--art-line)" strokeWidth="5" strokeLinecap="round" />
        <path d="M82 177C103 151 124 203 145 177C166 151 187 203 208 177" stroke="var(--art-accent)" strokeWidth="9" strokeLinecap="round" />
        <rect x="82" y="223" width="172" height="111" rx="56" fill="var(--art-ink)" />
        <path d="M117 278H219" stroke="var(--art-panel-a)" strokeWidth="2" strokeLinecap="round" opacity=".7" />
        <circle cx="321" cy="299" r="39" fill="var(--art-accent-soft)" />
        <circle cx="321" cy="299" r="18" fill="var(--art-panel-a)" />
        <path d="M393 111L419 85L446 111M419 85V151" stroke="var(--art-accent)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="615" cy="290" r="9" fill="var(--art-ink)" />
      </svg>
    </div>
  );
}
