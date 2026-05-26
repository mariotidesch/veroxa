import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Atom, Zap, Cog, Flame, FlaskConical, Wind, Droplets, Sun, Mountain } from "lucide-react";
import { EnergyType } from "@/data/energie";

import nucleareImg     from "@assets/energy_crops/nucleare.jpg";
import elettricaImg    from "@assets/energy_crops/elettrica.jpg";
import termicaImg      from "@assets/energy_crops/termica.jpg";
import eolicaImg       from "@assets/energy_crops/eolica.jpg";
import idroelettricaImg from "@assets/energy_crops/idroelettrica.jpg";
import solareImg       from "@assets/energy_crops/solare.jpg";
import meccanicaImg    from "@assets/energy_crops/meccanica.jpg";
import chimicaImg      from "@assets/energy_crops/chimica.jpg";
import geotermicaImg   from "@assets/energy_crops/geotermica.jpg";

const CROP_IMG: Record<string, string> = {
  nucleare: nucleareImg,
  elettrica: elettricaImg,
  termica: termicaImg,
  eolica: eolicaImg,
  idroelettrica: idroelettricaImg,
  solare: solareImg,
  meccanica: meccanicaImg,
  chimica: chimicaImg,
  geotermica: geotermicaImg,
};

interface EnergyPanelProps {
  energy: EnergyType | null;
  onClose: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  Atom, Zap, Cog, Flame, FlaskConical, Wind, Droplets, Sun, Mountain
};

export default function EnergyPanel({ energy, onClose }: EnergyPanelProps) {
  return (
    <AnimatePresence>
      {energy && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%", opacity: 0, scale: 0.95 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: "100%", opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl shadow-2xl z-50 overflow-y-auto border-l border-white/20 dark:border-white/10"
          >
            <div
              className="h-48 w-full relative flex items-end p-6 overflow-hidden"
              style={{ backgroundColor: energy.color }}
            >
              {/* Realistic photo of the machinery from the video — covers for 2.5s then fades out */}
              <motion.div
                key={energy.id}
                initial={{ opacity: 1, scale: 1.08 }}
                animate={{ opacity: [1, 1, 0], scale: [1.08, 1, 1] }}
                transition={{ duration: 3, times: [0, 0.83, 1], ease: "easeOut" }}
                className="absolute inset-0"
              >
                <img
                  src={CROP_IMG[energy.id]}
                  alt={energy.name}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                {/* Subtle bottom gradient so the title remains readable while the photo is on */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)",
                  }}
                />
              </motion.div>

              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors"
                aria-label="Chiudi"
              >
                <X size={24} />
              </button>

              <div className="relative z-10 flex items-center gap-4 text-white">
                {iconMap[energy.icon] && React.createElement(iconMap[energy.icon], { size: 48, className: "drop-shadow-md" })}
                <h2 className="text-4xl font-black tracking-tight drop-shadow-md">{energy.name}</h2>
              </div>
            </div>

            <div className="p-8 space-y-8">
              <section>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                  <span className="w-8 h-1 rounded-full" style={{ backgroundColor: energy.color }}></span>
                  Cos'è?
                </h3>
                <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                  {energy.description}
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                  <span className="w-8 h-1 rounded-full" style={{ backgroundColor: energy.color }}></span>
                  Come funziona?
                </h3>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {energy.howItWorks}
                </p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-emerald-50 dark:bg-emerald-950/30 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
                  <h4 className="font-bold text-emerald-800 dark:text-emerald-400 mb-3">Vantaggi</h4>
                  <ul className="space-y-2">
                    {energy.prosCons.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-emerald-700 dark:text-emerald-300 text-sm">
                        <span className="mt-1 font-bold">•</span> {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-rose-50 dark:bg-rose-950/30 p-5 rounded-2xl border border-rose-100 dark:border-rose-900/50">
                  <h4 className="font-bold text-rose-800 dark:text-rose-400 mb-3">Svantaggi</h4>
                  <ul className="space-y-2">
                    {energy.prosCons.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-rose-700 dark:text-rose-300 text-sm">
                        <span className="mt-1 font-bold">•</span> {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <section>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                  <span className="w-8 h-1 rounded-full" style={{ backgroundColor: energy.color }}></span>
                  Esempi
                </h3>
                <ul className="space-y-2">
                  {energy.examples.map((ex, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: energy.color }}></div>
                      {ex}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                  <span className="w-8 h-1 rounded-full" style={{ backgroundColor: energy.color }}></span>
                  Usi nella vita quotidiana
                </h3>
                <ul className="space-y-2">
                  {energy.everydayUses.map((use, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: energy.color }}></div>
                      {use}
                    </li>
                  ))}
                </ul>
              </section>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
