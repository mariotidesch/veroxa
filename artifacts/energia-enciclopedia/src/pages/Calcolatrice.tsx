import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { Home, Zap, Smartphone, Gamepad2, WashingMachine, Car, Thermometer, RefreshCw } from "lucide-react";

type Activity = {
  id: string;
  icon: React.ElementType;
  label: string;
  unit: string;
  kwh: number;
  color: string;
  bgColor: string;
  description: string;
  fact: string;
};

const activities: Activity[] = [
  {
    id: "iphone",
    icon: Smartphone,
    label: "Ricarica iPhone",
    unit: "ricariche",
    kwh: 0.015,
    color: "#6366f1",
    bgColor: "#eef2ff",
    description: "Ricarica completa batteria iPhone (≈ 15 Wh)",
    fact: "Un pannello solare da 300W la carica in soli 3 minuti!",
  },
  {
    id: "ps5",
    icon: Gamepad2,
    label: "PS5 in gioco",
    unit: "ore",
    kwh: 0.2,
    color: "#0ea5e9",
    bgColor: "#f0f9ff",
    description: "1 ora di gioco su PlayStation 5 (≈ 200 W)",
    fact: "Una PS5 consuma quanto 4 lampadine LED accese insieme.",
  },
  {
    id: "lavatrice",
    icon: WashingMachine,
    label: "Ciclo lavatrice",
    unit: "lavaggi",
    kwh: 1.0,
    color: "#10b981",
    bgColor: "#f0fdf4",
    description: "Un ciclo standard a 60°C (≈ 1 kWh)",
    fact: "Lavare a 30°C consuma il 60% in meno di energia!",
  },
  {
    id: "auto",
    icon: Car,
    label: "Auto elettrica",
    unit: "× 100 km",
    kwh: 18,
    color: "#f59e0b",
    bgColor: "#fffbeb",
    description: "100 km con auto elettrica media (≈ 18 kWh/100 km)",
    fact: "Un'auto elettrica è 3× più efficiente di una a benzina.",
  },
  {
    id: "casa",
    icon: Thermometer,
    label: "Riscaldamento casa",
    unit: "giorni",
    kwh: 40,
    color: "#ef4444",
    bgColor: "#fff1f2",
    description: "Riscaldare una casa media per 1 giorno (≈ 40 kWh)",
    fact: "Un buon isolamento termico riduce questo valore del 50%!",
  },
];

type EnergySource = {
  id: string;
  label: string;
  color: string;
  bg: string;
  icon: string;
  convert: (kwh: number) => { amount: string; unit: string; detail: string };
};

const energySources: EnergySource[] = [
  {
    id: "solare",
    label: "Solare",
    color: "#f59e0b",
    bg: "#fffbeb",
    icon: "☀",
    convert: (kwh) => {
      const panels = kwh / 1.5; // 300W panel × 5h sun = 1.5 kWh/day
      if (panels < 1) {
        const minutes = (kwh / 0.3) * 60;
        return {
          amount: minutes.toFixed(0),
          unit: "minuti di sole",
          detail: "su 1 pannello solare da 300W",
        };
      }
      return {
        amount: panels.toFixed(1),
        unit: panels < 2 ? "pannello solare" : "pannelli solari",
        detail: "da 300W per un'intera giornata di sole (5 h)",
      };
    },
  },
  {
    id: "eolica",
    label: "Eolica",
    color: "#22d3ee",
    bg: "#ecfeff",
    icon: "⌀",
    convert: (kwh) => {
      const hours = kwh / 2; // 2 kW turbine
      if (hours < 1) {
        return {
          amount: (hours * 60).toFixed(0),
          unit: "minuti di vento",
          detail: "su una turbina eolica da 2 kW a pieno regime",
        };
      }
      return {
        amount: hours.toFixed(1),
        unit: hours < 2 ? "ora di turbina" : "ore di turbina",
        detail: "eolica da 2 kW girando a piena potenza",
      };
    },
  },
  {
    id: "nucleare",
    label: "Nucleare",
    color: "#22c55e",
    bg: "#f0fdf4",
    icon: "⚛",
    convert: (kwh) => {
      // 1 kg uranio arricchito → ~45 000 kWh in reattore
      const grams = (kwh / 45000) * 1000;
      if (grams < 0.001) {
        return {
          amount: (grams * 1000000).toExponential(1),
          unit: "microgrammi di uranio",
          detail: "arricchito in un reattore nucleare",
        };
      }
      if (grams < 1) {
        return {
          amount: (grams * 1000).toFixed(2),
          unit: "milligrammi di uranio",
          detail: "arricchito in un reattore nucleare (1 kg → 45 000 kWh)",
        };
      }
      return {
        amount: grams.toFixed(4),
        unit: "grammi di uranio",
        detail: "arricchito in un reattore nucleare (1 kg → 45 000 kWh)",
      };
    },
  },
  {
    id: "idroelettrica",
    label: "Idroelettrica",
    color: "#3b82f6",
    bg: "#eff6ff",
    icon: "~",
    convert: (kwh) => {
      // 1 m³ water dropping 100m, η=85% → 0.2316 kWh
      const m3 = kwh / 0.2316;
      if (m3 < 1) {
        return {
          amount: (m3 * 1000).toFixed(0),
          unit: "litri d'acqua",
          detail: "in caduta da 100 m (diga idroelettrica, η 85%)",
        };
      }
      return {
        amount: m3.toFixed(1),
        unit: m3 < 2 ? "metro cubo d'acqua" : "metri cubi d'acqua",
        detail: "in caduta da 100 m (diga idroelettrica, η 85%)",
      };
    },
  },
  {
    id: "geotermica",
    label: "Geotermica",
    color: "#ef4444",
    bg: "#fff1f2",
    icon: "▲",
    convert: (kwh) => {
      // Geothermal efficiency ~15% → thermal energy needed = kwh / 0.15
      const thermal = kwh / 0.15;
      return {
        amount: thermal.toFixed(1),
        unit: "kWh termici",
        detail: "di vapore geotermico a 150°C (efficienza ~15%)",
      };
    },
  },
  {
    id: "chimica",
    label: "Chimica (petrolio)",
    color: "#a855f7",
    bg: "#faf5ff",
    icon: "◈",
    convert: (kwh) => {
      // 1 L petrol = 8.9 kWh_LHV, gen efficiency 35% → 3.1 kWh_e
      const liters = kwh / 3.1;
      if (liters < 1) {
        return {
          amount: (liters * 1000).toFixed(0),
          unit: "ml di petrolio",
          detail: "bruciato in un generatore (η 35%)",
        };
      }
      return {
        amount: liters.toFixed(2),
        unit: "litri di petrolio",
        detail: "bruciato in un generatore elettrico (η 35%)",
      };
    },
  },
  {
    id: "termica",
    label: "Termica (carbone)",
    color: "#78716c",
    bg: "#fafaf9",
    icon: "◆",
    convert: (kwh) => {
      // 1 kg coal = 7.5 kWh_t, η 38% → 2.85 kWh_e
      const kg = kwh / 2.85;
      if (kg < 1) {
        return {
          amount: (kg * 1000).toFixed(0),
          unit: "grammi di carbone",
          detail: "bruciato in una centrale termoelettrica (η 38%)",
        };
      }
      return {
        amount: kg.toFixed(2),
        unit: "kg di carbone",
        detail: "bruciato in una centrale termoelettrica (η 38%)",
      };
    },
  },
  {
    id: "meccanica",
    label: "Meccanica (pedalata)",
    color: "#60a5fa",
    bg: "#eff6ff",
    icon: "O",
    convert: (kwh) => {
      // Human cyclist: 200 W sustained
      const hours = kwh / 0.2;
      if (hours < 1) {
        return {
          amount: (hours * 60).toFixed(0),
          unit: "minuti di pedalata",
          detail: "di un ciclista adulto a ritmo sostenuto (200 W)",
        };
      }
      return {
        amount: hours.toFixed(1),
        unit: hours < 2 ? "ora di pedalata" : "ore di pedalata",
        detail: "di un ciclista adulto a ritmo sostenuto (200 W)",
      };
    },
  },
];

function formatKwh(kwh: number): string {
  if (kwh < 1) return `${(kwh * 1000).toFixed(0)} Wh`;
  if (kwh < 1000) return `${kwh.toFixed(1)} kWh`;
  return `${(kwh / 1000).toFixed(2)} MWh`;
}

function comparisons(kwh: number): string[] {
  const results: string[] = [];
  const iphones = kwh / 0.015;
  const ps5hours = kwh / 0.2;
  const washes = kwh / 1.0;
  const bulbHours = kwh / 0.01;

  if (iphones >= 1 && iphones < 10000)
    results.push(`${Math.round(iphones).toLocaleString("it-IT")} ricariche iPhone`);
  if (ps5hours >= 1 && ps5hours < 5000)
    results.push(`${Math.round(ps5hours).toLocaleString("it-IT")} ore di PS5`);
  if (washes >= 1 && washes < 1000)
    results.push(`${Math.round(washes).toLocaleString("it-IT")} lavaggi in lavatrice`);
  if (bulbHours >= 1 && bulbHours < 100000)
    results.push(`${Math.round(bulbHours).toLocaleString("it-IT")} ore di lampadina LED`);

  return results.slice(0, 3);
}

export default function Calcolatrice() {
  const [, setLocation] = useLocation();
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(activities.map((a) => [a.id, 1]))
  );
  const [selectedSource, setSelectedSource] = useState<string>("solare");

  const totalKwh = activities.reduce(
    (sum, a) => sum + (quantities[a.id] ?? 0) * a.kwh,
    0
  );

  const comps = comparisons(totalKwh);
  const activeSource = energySources.find((s) => s.id === selectedSource)!;
  const converted = totalKwh > 0 ? activeSource.convert(totalKwh) : null;

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: "linear-gradient(135deg, #0c1445 0%, #1e3a6e 50%, #0f2d52 100%)" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-4 px-5 py-4"
        style={{ background: "rgba(0,0,0,0.45)", borderBottom: "1px solid rgba(250,204,21,0.25)" }}
      >
        <button
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 text-white/85 hover:text-white transition-colors px-3 py-1.5 rounded-full"
          style={{ background: "rgba(167,139,250,0.18)", border: "1px solid rgba(167,139,250,0.5)" }}
          data-testid="button-home"
        >
          <Home size={18} />
          <span className="text-sm font-bold">Home</span>
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
            Calcolatrice Energetica
          </h1>
        </div>
        <div className="w-24" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-2xl mx-auto w-full">
        <p className="text-white/60 text-sm text-center mb-6">
          Quanta energia usi ogni giorno? Regola le quantità e scoprilo!
        </p>

        {/* Activity cards */}
        <div className="flex flex-col gap-4">
          {activities.map((act) => {
            const qty = quantities[act.id] ?? 1;
            const kwh = qty * act.kwh;
            const Icon = act.icon;

            return (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl overflow-hidden shadow-lg"
                style={{ background: act.bgColor }}
                data-testid={`card-${act.id}`}
              >
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: act.color }}
                    >
                      <Icon size={20} color="white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-800 text-sm">{act.label}</div>
                      <div className="text-gray-500 text-xs truncate">{act.description}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-black text-lg" style={{ color: act.color }}>
                        {formatKwh(kwh)}
                      </div>
                    </div>
                  </div>

                  {/* Quantity control */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantities(q => ({ ...q, [act.id]: Math.max(0, (q[act.id] ?? 1) - 1) }))}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 transition-transform active:scale-95"
                      style={{ backgroundColor: act.color }}
                      data-testid={`minus-${act.id}`}
                    >
                      −
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={act.id === "casa" ? 30 : act.id === "auto" ? 20 : 50}
                      value={qty}
                      onChange={(e) => setQuantities(q => ({ ...q, [act.id]: Number(e.target.value) }))}
                      className="flex-1 accent-current h-2 rounded-full"
                      style={{ accentColor: act.color }}
                      data-testid={`slider-${act.id}`}
                    />
                    <button
                      onClick={() => {
                        const max = act.id === "casa" ? 30 : act.id === "auto" ? 20 : 50;
                        setQuantities(q => ({ ...q, [act.id]: Math.min(max, (q[act.id] ?? 1) + 1) }));
                      }}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 transition-transform active:scale-95"
                      style={{ backgroundColor: act.color }}
                      data-testid={`plus-${act.id}`}
                    >
                      +
                    </button>
                    <span className="text-sm font-bold text-gray-700 w-20 text-right flex-shrink-0">
                      {qty} {act.unit}
                    </span>
                  </div>

                  {/* Fun fact */}
                  <div className="mt-2 text-xs text-gray-500 italic">{act.fact}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Total */}
        <motion.div
          layout
          className="mt-6 rounded-2xl p-5 shadow-xl text-white"
          style={{ background: "linear-gradient(135deg, #1e3a6e, #0c1445)", border: "1px solid rgba(255,255,255,0.15)" }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Zap size={24} className="text-yellow-400" />
            <span className="text-lg font-bold">Totale consumo</span>
          </div>
          <div className="text-4xl font-black text-yellow-400 mb-1">{formatKwh(totalKwh)}</div>
          <div className="text-white/50 text-xs mb-3">
            = {(totalKwh * 1000).toFixed(0)} Wh = {(totalKwh * 3600000).toExponential(2)} J
          </div>

          {comps.length > 0 && (
            <div className="border-t border-white/10 pt-3 mt-3">
              <p className="text-white/60 text-xs mb-2 font-medium uppercase tracking-wide">Equivale a…</p>
              <ul className="space-y-1">
                {comps.map((c, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-white/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>

        {/* ── Energy Source Converter ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-5 rounded-2xl p-5 shadow-xl text-white"
          style={{ background: "linear-gradient(135deg, #1a1040, #0e1e3a)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <RefreshCw size={20} className="text-purple-400" />
            <span className="text-base font-bold">Convertitore di fonti energetiche</span>
          </div>
          <p className="text-white/50 text-xs mb-4">
            Scegli un tipo di energia e scopri quanta ne servirebbe per produrre il totale del tuo consumo.
          </p>

          {/* Source selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
            {energySources.map((src) => {
              const isActive = selectedSource === src.id;
              return (
                <button
                  key={src.id}
                  onClick={() => setSelectedSource(src.id)}
                  className="rounded-xl px-2 py-2.5 text-xs font-bold text-center transition-all duration-200 border"
                  style={{
                    background: isActive ? src.color + "33" : "rgba(255,255,255,0.04)",
                    borderColor: isActive ? src.color : "rgba(255,255,255,0.1)",
                    color: isActive ? src.color : "rgba(255,255,255,0.55)",
                    boxShadow: isActive ? `0 0 12px ${src.color}44` : "none",
                  }}
                  data-testid={`source-${src.id}`}
                >
                  {src.label}
                </button>
              );
            })}
          </div>

          {/* Result */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSource + "-" + totalKwh.toFixed(3)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl p-4"
              style={{ background: activeSource.color + "18", border: `1px solid ${activeSource.color}44` }}
            >
              {totalKwh === 0 ? (
                <p className="text-white/40 text-sm text-center">
                  Regola almeno un'attività sopra per vedere il risultato.
                </p>
              ) : (
                <>
                  <p className="text-white/60 text-xs mb-1 uppercase tracking-wide font-semibold">
                    Per produrre {formatKwh(totalKwh)} con energia {activeSource.label.toLowerCase()} servono:
                  </p>
                  <div className="flex items-end gap-2 mt-2 flex-wrap">
                    <span
                      className="text-4xl font-black"
                      style={{ color: activeSource.color }}
                    >
                      {converted?.amount}
                    </span>
                    <span className="text-lg font-bold text-white/80 mb-0.5">{converted?.unit}</span>
                  </div>
                  <p className="text-white/45 text-xs mt-2 italic">{converted?.detail}</p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <p className="text-white/30 text-xs text-center mt-4 mb-6">
          Valori medi indicativi a scopo didattico
        </p>
      </div>
    </div>
  );
}
