import React from 'react';

export const Logo1 = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20 25L50 85L80 25" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="50" cy="50" r="4" fill="currentColor"/>
  </svg>
);

export const Logo2 = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="120" height="120" rx="60" fill="hsl(var(--primary) / 0.1)"/>
    <path d="M35 40L60 90L85 40" stroke="hsl(var(--primary))" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M60 90C45 70 30 50 40 30C50 10 70 10 80 30C90 50 75 70 60 90Z" stroke="hsl(var(--secondary))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="hsl(var(--secondary) / 0.2)"/>
  </svg>
);

export const Logo3 = ({ className = "h-8" }: { className?: string }) => (
  <svg viewBox="0 0 300 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="currentColor" fontFamily="Outfit, sans-serif" fontWeight="300" fontSize="36" letterSpacing="0.4em">
      VEXORA
    </text>
  </svg>
);
