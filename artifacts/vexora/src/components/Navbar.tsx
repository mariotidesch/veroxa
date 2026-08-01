import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/recensioni", label: "Recensioni" },
    { href: "/contatti", label: "Contatti" }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference text-white">
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 -m-2 hover:opacity-70 transition-opacity"
          aria-label="Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
            className="fixed inset-0 z-50 bg-background text-foreground flex flex-col"
          >
            <div className="p-6">
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 -m-2 hover:opacity-70 transition-opacity"
                aria-label="Chiudi menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex-1 flex flex-col items-center justify-center gap-8">
              {links.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                  <span className={`text-4xl md:text-6xl font-light tracking-tight hover:text-primary transition-colors ${location === link.href ? "text-primary" : ""}`}>
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
