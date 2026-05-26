import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Home, BookOpen, GraduationCap, Compass, Calculator, Sparkles } from "lucide-react";
import { energies } from "@/data/energie";

export default function Informazioni() {
  const [, setLocation] = useLocation();

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: "linear-gradient(135deg, #1a0b3a 0%, #2d1b69 50%, #1a0b3a 100%)" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-4 px-5 py-4"
        style={{ background: "rgba(0,0,0,0.45)", borderBottom: "1px solid rgba(167,139,250,0.25)" }}
      >
        <button
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors px-3 py-1.5 rounded-full"
          style={{ background: "rgba(167,139,250,0.18)", border: "1px solid rgba(167,139,250,0.45)" }}
          data-testid="button-home"
        >
          <Home size={18} />
          <span className="text-sm font-bold">Home</span>
        </button>
        <div className="flex-1 text-center flex items-center justify-center gap-3">
          <BookOpen size={24} className="text-purple-300" />
          <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
            Informazioni
          </h1>
        </div>
        <div className="w-24" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-8 max-w-3xl mx-auto w-full">
        {/* Project intro */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-6 mb-6 text-white shadow-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(167,139,250,0.18), rgba(124,58,237,0.12))",
            border: "1px solid rgba(167,139,250,0.35)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles size={26} className="text-purple-300" />
            <h2 className="text-2xl font-black">EnergiApp</h2>
          </div>
          <p className="text-white/85 leading-relaxed mb-3">
            <strong>EnergiApp</strong> è un viaggio interattivo nel mondo dell'energia. Esplora un
            panorama animato con 9 tipi di energia, ognuna spiegata in modo semplice ma completo:
            come funziona, vantaggi e svantaggi, esempi reali, curiosità, dati e un po' di storia.
          </p>
          <p className="text-white/85 leading-relaxed">
            La <strong>Calcolatrice Energetica</strong> permette inoltre di scoprire quanta energia
            consumi nella vita di tutti i giorni e di convertirla in fonti diverse (solare, eolica,
            nucleare, idroelettrica e altre).
          </p>
        </motion.section>

        {/* School & class */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl p-6 mb-6 text-white shadow-xl"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div className="flex items-center gap-4 mb-4">
            <img
              src="https://www.musicasenzafrontiere.com/wp-content/uploads/2024/12/logo-istituto-san-leone-magno.png"
              alt="Istituto San Leone Magno"
              className="h-14 w-auto object-contain"
            />
            <div>
              <h3 className="text-lg font-black leading-tight">Istituto San Leone Magno</h3>
              <p className="text-white/60 text-sm">Roma</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <div className="rounded-xl p-3" style={{ background: "rgba(0,0,0,0.25)" }}>
              <div className="flex items-center gap-2 text-purple-300 text-xs font-bold uppercase tracking-wide mb-1">
                <GraduationCap size={14} /> Autore
              </div>
              <div className="text-white font-bold">Mario Tedeschi</div>
            </div>
            <div className="rounded-xl p-3" style={{ background: "rgba(0,0,0,0.25)" }}>
              <div className="flex items-center gap-2 text-purple-300 text-xs font-bold uppercase tracking-wide mb-1">
                <GraduationCap size={14} /> Classe
              </div>
              <div className="text-white font-bold">3A</div>
            </div>
          </div>
        </motion.section>

        {/* What you can do */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl p-6 mb-6 text-white shadow-xl"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <h3 className="text-lg font-black mb-4">Cosa puoi fare</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setLocation("/panorama")}
              className="rounded-2xl p-4 text-left transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, rgba(251,191,36,0.18), rgba(245,158,11,0.08))",
                border: "1px solid rgba(251,191,36,0.45)",
              }}
              data-testid="link-panorama"
            >
              <div className="flex items-center gap-2 mb-1">
                <Compass size={18} className="text-amber-300" />
                <span className="font-black text-amber-300">Esplora il panorama</span>
              </div>
              <p className="text-white/70 text-xs leading-snug">
                Clicca sui 9 puntini sui macchinari per scoprire ogni tipo di energia.
              </p>
            </button>
            <button
              onClick={() => setLocation("/calcolatrice")}
              className="rounded-2xl p-4 text-left transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, rgba(96,165,250,0.18), rgba(37,99,235,0.08))",
                border: "1px solid rgba(96,165,250,0.45)",
              }}
              data-testid="link-calcolatrice"
            >
              <div className="flex items-center gap-2 mb-1">
                <Calculator size={18} className="text-blue-300" />
                <span className="font-black text-blue-300">Calcolatrice energetica</span>
              </div>
              <p className="text-white/70 text-xs leading-snug">
                Scopri quanti kWh consumi ogni giorno e converti il totale in fonti diverse.
              </p>
            </button>
          </div>
        </motion.section>

        {/* Energy index */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl p-6 mb-6 text-white shadow-xl"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <h3 className="text-lg font-black mb-4">Le 9 energie</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {energies.map((e) => (
              <div
                key={e.id}
                className="flex items-start gap-3 rounded-xl p-3"
                style={{ background: `${e.color}14`, border: `1px solid ${e.color}33` }}
              >
                <div
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ background: e.color, boxShadow: `0 0 8px ${e.color}` }}
                />
                <div className="min-w-0">
                  <div className="font-bold text-sm" style={{ color: e.color }}>
                    {e.name}
                  </div>
                  <div className="text-white/65 text-xs leading-snug">{e.description}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Credits */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl p-6 text-white shadow-xl"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <h3 className="text-lg font-black mb-3">Note</h3>
          <ul className="space-y-2 text-white/75 text-sm leading-relaxed">
            <li>• Tutti i contenuti sono pensati per uso didattico nella scuola secondaria.</li>
            <li>• I dati numerici sono valori medi indicativi, non misure precise.</li>
            <li>• Le animazioni e gli effetti sono pensati per rendere lo studio più coinvolgente.</li>
          </ul>
          <p className="text-white/40 text-xs italic mt-4 text-center">
            © {new Date().getFullYear()} · Progetto scolastico Classe 3A · Istituto San Leone Magno, Roma
          </p>
        </motion.section>
      </div>
    </div>
  );
}
