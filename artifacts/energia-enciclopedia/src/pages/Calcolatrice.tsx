import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowLeft, Zap, Smartphone, Gamepad2, WashingMachine, Car, Thermometer } from "lucide-react";

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
};

export default function Calcolatrice() {
  const [, setLocation] = useLocation();
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(activities.map((a) => [a.id, 1]))
  );

  const totalKwh = activities.reduce(
    (sum, a) => sum + (quantities[a.id] ?? 0) * a.kwh,
    0
  );

  const comps = comparisons(totalKwh);

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: "linear-gradient(135deg, #0c1445 0%, #1e3a6e 50%, #0f2d52 100%)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-4 px-5 py-4" style={{ background: "rgba(0,0,0,0.35)" }}>
        <button
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          data-testid="back-button"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Torna al Panorama</span>
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
            Calcolatrice Energetica
          </h1>
        </div>
        <div className="w-32" />
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

        <p className="text-white/30 text-xs text-center mt-4 mb-6">
          Valori medi indicativi a scopo didattico
        </p>
      </div>
    </div>
  );
}
