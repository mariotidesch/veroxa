import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import {
  Home, Zap, Plus, Trash2, RefreshCw,
  Smartphone, Laptop, Tv, Gamepad2, Lightbulb, WashingMachine,
  Refrigerator, Microwave, Car, Thermometer, ShowerHead, Wind, Pencil,
  type LucideIcon,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Catalogo apparecchi: potenza (kW) usata mentre l'apparecchio è
// in funzione, e consumo tipico giornaliero (kWh/giorno) basato su
// un uso medio reale.
// ─────────────────────────────────────────────────────────────
type Device = {
  id: string;
  label: string;
  Icon: LucideIcon;
  color: string;
  kwhPerHour: number;   // consumo quando è acceso (kW)
  kwhPerDay: number;    // consumo medio in una giornata di uso tipico
  hint: string;         // breve descrizione
};

const CATALOG: Device[] = [
  { id: "iphone",      label: "Ricarica smartphone", Icon: Smartphone,    color: "#6366f1", kwhPerHour: 0.015, kwhPerDay: 0.015, hint: "≈ 15 Wh per una ricarica completa" },
  { id: "laptop",      label: "Laptop / PC portatile", Icon: Laptop,      color: "#0ea5e9", kwhPerHour: 0.05,  kwhPerDay: 0.4,   hint: "≈ 50 W in uso, ~8 h al giorno" },
  { id: "tv",          label: "Televisore LED",      Icon: Tv,            color: "#8b5cf6", kwhPerHour: 0.1,   kwhPerDay: 0.4,   hint: "≈ 100 W, ~4 h al giorno" },
  { id: "ps5",         label: "PlayStation 5",       Icon: Gamepad2,      color: "#3b82f6", kwhPerHour: 0.2,   kwhPerDay: 0.4,   hint: "≈ 200 W in gioco, ~2 h al giorno" },
  { id: "lampada",     label: "Lampadina LED",       Icon: Lightbulb,     color: "#facc15", kwhPerHour: 0.01,  kwhPerDay: 0.05,  hint: "≈ 10 W, ~5 h al giorno" },
  { id: "lavatrice",   label: "Lavatrice",           Icon: WashingMachine,color: "#10b981", kwhPerHour: 1.0,   kwhPerDay: 1.0,   hint: "≈ 1 kWh per un ciclo a 60 °C" },
  { id: "frigorifero", label: "Frigorifero",         Icon: Refrigerator,  color: "#22d3ee", kwhPerHour: 0.04,  kwhPerDay: 1.0,   hint: "Sempre acceso, ~1 kWh al giorno" },
  { id: "microonde",   label: "Forno a microonde",   Icon: Microwave,     color: "#a855f7", kwhPerHour: 1.0,   kwhPerDay: 0.15,  hint: "≈ 1 kW in uso, pochi minuti al giorno" },
  { id: "auto",        label: "Auto elettrica",      Icon: Car,           color: "#f59e0b", kwhPerHour: 11,    kwhPerDay: 5,     hint: "≈ 11 kW in ricarica, ~30 km al giorno" },
  { id: "riscaldamento", label: "Riscaldamento casa", Icon: Thermometer,  color: "#ef4444", kwhPerHour: 2.0,   kwhPerDay: 40,    hint: "≈ 2 kW continui, ~40 kWh al giorno in inverno" },
  { id: "scaldabagno", label: "Scaldabagno elettrico", Icon: ShowerHead,  color: "#f97316", kwhPerHour: 1.5,   kwhPerDay: 4,     hint: "≈ 1,5 kW, ~2-3 h equivalenti al giorno" },
  { id: "asciugacapelli", label: "Asciugacapelli",   Icon: Wind,          color: "#ec4899", kwhPerHour: 2.0,   kwhPerDay: 0.2,   hint: "≈ 2 kW, ~6 minuti al giorno" },
];

const CUSTOM: Device = {
  id: "custom",
  label: "Personalizzato",
  Icon: Pencil,
  color: "#94a3b8",
  kwhPerHour: 0.1,
  kwhPerDay: 0.5,
  hint: "Inserisci tu il nome e la potenza in Watt",
};

type Period = "ora" | "giorno";

type Entry = {
  uid: string;
  deviceId: string;
  customName?: string;
  customWatt?: number;  // potenza in Watt per "personalizzato"
  period: Period;
  count: number;
};

// ─────────────────────────────────────────────────────────────
// Convertitore di fonti energetiche (riusato dalla versione vecchia)
// ─────────────────────────────────────────────────────────────
type EnergySource = {
  id: string;
  label: string;
  color: string;
  convert: (kwh: number) => { amount: string; unit: string; detail: string };
};

const energySources: EnergySource[] = [
  { id: "solare", label: "Solare", color: "#f59e0b",
    convert: (kwh) => {
      const panels = kwh / 1.5;
      if (panels < 1) return { amount: ((kwh / 0.3) * 60).toFixed(0), unit: "minuti di sole", detail: "su 1 pannello solare da 300 W" };
      return { amount: panels.toFixed(1), unit: panels < 2 ? "pannello solare" : "pannelli solari", detail: "da 300 W per un'intera giornata di sole (5 h)" };
    } },
  { id: "eolica", label: "Eolica", color: "#22d3ee",
    convert: (kwh) => {
      const hours = kwh / 2;
      if (hours < 1) return { amount: (hours * 60).toFixed(0), unit: "minuti di vento", detail: "su una turbina eolica da 2 kW a pieno regime" };
      return { amount: hours.toFixed(1), unit: hours < 2 ? "ora di turbina" : "ore di turbina", detail: "eolica da 2 kW a piena potenza" };
    } },
  { id: "nucleare", label: "Nucleare", color: "#22c55e",
    convert: (kwh) => {
      const grams = (kwh / 45000) * 1000;
      if (grams < 0.001) return { amount: (grams * 1000000).toExponential(1), unit: "microgrammi di uranio", detail: "arricchito in un reattore nucleare" };
      if (grams < 1) return { amount: (grams * 1000).toFixed(2), unit: "milligrammi di uranio", detail: "arricchito (1 kg → 45 000 kWh)" };
      return { amount: grams.toFixed(4), unit: "grammi di uranio", detail: "arricchito (1 kg → 45 000 kWh)" };
    } },
  { id: "idroelettrica", label: "Idroelettrica", color: "#3b82f6",
    convert: (kwh) => {
      const m3 = kwh / 0.2316;
      if (m3 < 1) return { amount: (m3 * 1000).toFixed(0), unit: "litri d'acqua", detail: "in caduta da 100 m (η 85%)" };
      return { amount: m3.toFixed(1), unit: m3 < 2 ? "metro cubo d'acqua" : "metri cubi d'acqua", detail: "in caduta da 100 m (η 85%)" };
    } },
  { id: "geotermica", label: "Geotermica", color: "#ef4444",
    convert: (kwh) => {
      const thermal = kwh / 0.15;
      return { amount: thermal.toFixed(1), unit: "kWh termici", detail: "di vapore a 150 °C (efficienza ~15%)" };
    } },
  { id: "chimica", label: "Chimica (petrolio)", color: "#a855f7",
    convert: (kwh) => {
      const liters = kwh / 3.1;
      if (liters < 1) return { amount: (liters * 1000).toFixed(0), unit: "ml di petrolio", detail: "bruciato in un generatore (η 35%)" };
      return { amount: liters.toFixed(2), unit: "litri di petrolio", detail: "bruciato in un generatore (η 35%)" };
    } },
  { id: "termica", label: "Termica (carbone)", color: "#78716c",
    convert: (kwh) => {
      const kg = kwh / 2.85;
      if (kg < 1) return { amount: (kg * 1000).toFixed(0), unit: "grammi di carbone", detail: "in centrale termoelettrica (η 38%)" };
      return { amount: kg.toFixed(2), unit: "kg di carbone", detail: "in centrale termoelettrica (η 38%)" };
    } },
  { id: "meccanica", label: "Meccanica (pedalata)", color: "#60a5fa",
    convert: (kwh) => {
      const hours = kwh / 0.2;
      if (hours < 1) return { amount: (hours * 60).toFixed(0), unit: "minuti di pedalata", detail: "di un ciclista a 200 W" };
      return { amount: hours.toFixed(1), unit: hours < 2 ? "ora di pedalata" : "ore di pedalata", detail: "di un ciclista a 200 W" };
    } },
];

function formatKwh(kwh: number): string {
  if (kwh === 0) return "0 Wh";
  if (kwh < 1) return `${(kwh * 1000).toFixed(0)} Wh`;
  if (kwh < 1000) return `${kwh.toFixed(2)} kWh`;
  return `${(kwh / 1000).toFixed(2)} MWh`;
}

function comparisons(kwh: number): string[] {
  const r: string[] = [];
  const iphones = kwh / 0.015;
  const ps5hours = kwh / 0.2;
  const washes = kwh / 1.0;
  const bulbHours = kwh / 0.01;
  if (iphones >= 1 && iphones < 100000) r.push(`${Math.round(iphones).toLocaleString("it-IT")} ricariche di smartphone`);
  if (ps5hours >= 1 && ps5hours < 10000) r.push(`${Math.round(ps5hours).toLocaleString("it-IT")} ore di PlayStation 5`);
  if (washes >= 1 && washes < 5000) r.push(`${Math.round(washes).toLocaleString("it-IT")} lavaggi in lavatrice`);
  if (bulbHours >= 1 && bulbHours < 500000) r.push(`${Math.round(bulbHours).toLocaleString("it-IT")} ore di lampadina LED`);
  return r.slice(0, 3);
}

function deviceOf(id: string): Device {
  return CATALOG.find((d) => d.id === id) ?? CUSTOM;
}

function kwhOfEntry(e: Entry): number {
  const dev = deviceOf(e.deviceId);
  if (dev.id === "custom") {
    // potenza personalizzata in Watt: stessa potenza usata sia in ora che in giorno (× ore se "ora", × 24 h se "giorno" ipotizzando uso continuo)
    const kw = (e.customWatt ?? 0) / 1000;
    if (e.period === "ora") return kw * e.count;
    return kw * 24 * e.count; // 1 giorno = 24 h di uso continuo (semplificazione)
  }
  const perUnit = e.period === "ora" ? dev.kwhPerHour : dev.kwhPerDay;
  return perUnit * e.count;
}

// ─────────────────────────────────────────────────────────────
let uidCounter = 0;
const newUid = () => `e${Date.now().toString(36)}-${uidCounter++}`;

export default function Calcolatrice() {
  const [, setLocation] = useLocation();

  const [entries, setEntries] = useState<Entry[]>([
    { uid: newUid(), deviceId: "tv", period: "giorno", count: 1 },
    { uid: newUid(), deviceId: "lampada", period: "giorno", count: 5 },
  ]);
  const [draft, setDraft] = useState<Entry>({
    uid: "draft",
    deviceId: "iphone",
    period: "giorno",
    count: 1,
    customName: "",
    customWatt: 100,
  });
  const [selectedSource, setSelectedSource] = useState<string>("solare");

  const totalKwh = useMemo(
    () => entries.reduce((s, e) => s + kwhOfEntry(e), 0),
    [entries]
  );

  const comps = comparisons(totalKwh);
  const activeSource = energySources.find((s) => s.id === selectedSource)!;
  const converted = totalKwh > 0 ? activeSource.convert(totalKwh) : null;

  const addEntry = () => {
    const dev = deviceOf(draft.deviceId);
    if (dev.id === "custom") {
      if (!draft.customName?.trim() || !draft.customWatt || draft.customWatt <= 0) return;
    }
    setEntries((prev) => [
      ...prev,
      {
        uid: newUid(),
        deviceId: draft.deviceId,
        period: draft.period,
        count: Math.max(1, draft.count),
        customName: draft.customName?.trim() || undefined,
        customWatt: draft.customWatt,
      },
    ]);
  };

  const removeEntry = (uid: string) =>
    setEntries((prev) => prev.filter((e) => e.uid !== uid));

  const updateEntry = (uid: string, patch: Partial<Entry>) =>
    setEntries((prev) => prev.map((e) => (e.uid === uid ? { ...e, ...patch } : e)));

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

      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-3xl mx-auto w-full">
        <p className="text-white/65 text-sm text-center mb-6">
          Scegli un apparecchio, indica se l'uso è per <strong>1 ora</strong> o per{" "}
          <strong>1 giorno</strong>, e quante volte si ripete. Aggiungi tutte le voci che vuoi
          e scopri quanta energia consumi in totale.
        </p>

        {/* ── Form per aggiungere una nuova voce ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-5 mb-6 shadow-xl text-white"
          style={{
            background: "linear-gradient(135deg, rgba(96,165,250,0.15), rgba(37,99,235,0.08))",
            border: "1px solid rgba(96,165,250,0.35)",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Plus size={20} className="text-blue-300" />
            <span className="font-bold text-base">Aggiungi un consumo</span>
          </div>

          {/* Riga 1: dispositivo */}
          <label className="block text-xs font-bold text-white/65 mb-1 uppercase tracking-wide">
            Apparecchio o tecnologia
          </label>
          <select
            value={draft.deviceId}
            onChange={(e) => setDraft({ ...draft, deviceId: e.target.value })}
            data-testid="select-device"
            className="w-full rounded-xl px-3 py-2 text-sm font-semibold text-white mb-3 outline-none"
            style={{ background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            {CATALOG.map((d) => (
              <option key={d.id} value={d.id} style={{ background: "#0c1445" }}>
                {d.label}
              </option>
            ))}
            <option value="custom" style={{ background: "#0c1445" }}>
              ✎ Personalizzato (scrivi tu)
            </option>
          </select>

          {/* Riga 1bis: campi custom */}
          {draft.deviceId === "custom" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                value={draft.customName ?? ""}
                onChange={(e) => setDraft({ ...draft, customName: e.target.value })}
                placeholder="Nome (es. Stampante, Aspirapolvere…)"
                data-testid="input-custom-name"
                className="rounded-xl px-3 py-2 text-sm text-white outline-none"
                style={{ background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.15)" }}
              />
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={draft.customWatt ?? ""}
                  onChange={(e) => setDraft({ ...draft, customWatt: Number(e.target.value) || 0 })}
                  placeholder="Potenza"
                  data-testid="input-custom-watt"
                  className="flex-1 rounded-xl px-3 py-2 text-sm text-white outline-none"
                  style={{ background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.15)" }}
                />
                <span className="text-white/70 font-bold text-sm">Watt</span>
              </div>
            </div>
          )}

          {/* Hint card */}
          {draft.deviceId !== "custom" && (
            <div
              className="rounded-xl p-3 mb-3 text-xs"
              style={{
                background: `${deviceOf(draft.deviceId).color}18`,
                border: `1px solid ${deviceOf(draft.deviceId).color}44`,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                {(() => {
                  const D = deviceOf(draft.deviceId);
                  return <D.Icon size={16} style={{ color: D.color }} />;
                })()}
                <span className="font-bold" style={{ color: deviceOf(draft.deviceId).color }}>
                  {deviceOf(draft.deviceId).hint}
                </span>
              </div>
              <div className="text-white/70">
                In 1 ora: <strong>{formatKwh(deviceOf(draft.deviceId).kwhPerHour)}</strong>
                {" · "}
                In 1 giorno: <strong>{formatKwh(deviceOf(draft.deviceId).kwhPerDay)}</strong>
              </div>
            </div>
          )}

          {/* Riga 2: periodo + numero */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-white/65 mb-1 uppercase tracking-wide">
                Periodo di utilizzo
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["ora", "giorno"] as Period[]).map((p) => {
                  const active = draft.period === p;
                  return (
                    <button
                      key={p}
                      onClick={() => setDraft({ ...draft, period: p })}
                      data-testid={`period-${p}`}
                      className="rounded-xl px-3 py-2 text-sm font-bold transition-all"
                      style={{
                        background: active ? "rgba(96,165,250,0.35)" : "rgba(0,0,0,0.35)",
                        border: `1px solid ${active ? "#60a5fa" : "rgba(255,255,255,0.12)"}`,
                        color: active ? "#bfdbfe" : "rgba(255,255,255,0.6)",
                      }}
                    >
                      1 {p}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-white/65 mb-1 uppercase tracking-wide">
                Quante volte si ripete
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDraft({ ...draft, count: Math.max(1, draft.count - 1) })}
                  className="w-9 h-9 rounded-full bg-blue-500/80 text-white font-bold text-lg active:scale-95"
                  data-testid="draft-minus"
                >−</button>
                <input
                  type="number"
                  min={1}
                  value={draft.count}
                  onChange={(e) => setDraft({ ...draft, count: Math.max(1, Number(e.target.value) || 1) })}
                  data-testid="input-count"
                  className="flex-1 rounded-xl px-3 py-2 text-center text-sm font-bold text-white outline-none"
                  style={{ background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.15)" }}
                />
                <button
                  onClick={() => setDraft({ ...draft, count: draft.count + 1 })}
                  className="w-9 h-9 rounded-full bg-blue-500/80 text-white font-bold text-lg active:scale-95"
                  data-testid="draft-plus"
                >+</button>
                <span className="text-white/70 text-xs font-semibold w-12 text-right">
                  {draft.period === "ora" ? (draft.count === 1 ? "ora" : "ore") : (draft.count === 1 ? "giorno" : "giorni")}
                </span>
              </div>
            </div>
          </div>

          {/* Preview kWh */}
          <div className="mt-4 flex items-center justify-between rounded-xl px-4 py-3"
               style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(96,165,250,0.25)" }}>
            <span className="text-white/70 text-xs">
              {draft.deviceId === "custom"
                ? draft.customName || "Personalizzato"
                : deviceOf(draft.deviceId).label}{" "}
              × {draft.count} {draft.period === "ora" ? (draft.count === 1 ? "ora" : "ore") : (draft.count === 1 ? "giorno" : "giorni")}
            </span>
            <span className="text-lg font-black text-blue-300">{formatKwh(kwhOfEntry(draft))}</span>
          </div>

          <button
            onClick={addEntry}
            data-testid="button-add-entry"
            className="mt-4 w-full rounded-xl py-3 font-black text-sm tracking-wide transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #60a5fa, #2563eb)",
              color: "white",
              boxShadow: "0 0 25px rgba(96,165,250,0.4)",
            }}
          >
            + Aggiungi alla lista
          </button>
        </motion.div>

        {/* ── Lista delle voci aggiunte ── */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-white font-black text-base">I tuoi consumi</h2>
          {entries.length > 0 && (
            <button
              onClick={() => setEntries([])}
              data-testid="button-clear"
              className="text-xs font-semibold text-white/55 hover:text-white/90"
            >
              Svuota tutto
            </button>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {entries.length === 0 && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl p-6 text-center text-white/55 text-sm"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.15)" }}
              >
                Nessun consumo aggiunto. Usa il modulo qui sopra per iniziare.
              </motion.div>
            )}
            {entries.map((e) => {
              const dev = deviceOf(e.deviceId);
              const name = dev.id === "custom" ? (e.customName ?? "Personalizzato") : dev.label;
              const Icon = dev.Icon;
              const kwh = kwhOfEntry(e);
              return (
                <motion.div
                  key={e.uid}
                  layout
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  className="rounded-2xl p-4 text-white shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${dev.color}22, rgba(0,0,0,0.25))`,
                    border: `1px solid ${dev.color}55`,
                  }}
                  data-testid={`entry-${e.uid}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: dev.color }}
                    >
                      <Icon size={20} color="white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold truncate">{name}</div>
                      <div className="text-white/60 text-xs">
                        {e.count} {e.period === "ora" ? (e.count === 1 ? "ora" : "ore") : (e.count === 1 ? "giorno" : "giorni")}
                        {dev.id === "custom" && e.customWatt ? ` · ${e.customWatt} W` : ""}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-lg font-black" style={{ color: dev.color }}>
                        {formatKwh(kwh)}
                      </div>
                    </div>
                    <button
                      onClick={() => removeEntry(e.uid)}
                      className="ml-2 w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-rose-300 hover:bg-rose-500/15 transition-colors"
                      data-testid={`remove-${e.uid}`}
                      aria-label="Rimuovi"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Quick adjust count */}
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => updateEntry(e.uid, { count: Math.max(1, e.count - 1) })}
                      className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white"
                      style={{ background: dev.color }}
                    >−</button>
                    <input
                      type="range"
                      min={1}
                      max={e.period === "ora" ? 24 : 365}
                      value={e.count}
                      onChange={(ev) => updateEntry(e.uid, { count: Math.max(1, Number(ev.target.value)) })}
                      className="flex-1 h-2"
                      style={{ accentColor: dev.color }}
                    />
                    <button
                      onClick={() => updateEntry(e.uid, { count: e.count + 1 })}
                      className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white"
                      style={{ background: dev.color }}
                    >+</button>
                    <button
                      onClick={() =>
                        updateEntry(e.uid, { period: e.period === "ora" ? "giorno" : "ora" })
                      }
                      className="text-xs font-bold px-3 py-1 rounded-full text-white/85"
                      style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.18)" }}
                      data-testid={`toggle-period-${e.uid}`}
                    >
                      ⇄ 1 {e.period === "ora" ? "giorno" : "ora"}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ── Totale ── */}
        <motion.div
          layout
          className="mt-6 rounded-2xl p-5 shadow-xl text-white"
          style={{
            background: "linear-gradient(135deg, #1e3a6e, #0c1445)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Zap size={24} className="text-yellow-400" />
            <span className="text-lg font-bold">Totale consumo</span>
          </div>
          <div className="text-4xl font-black text-yellow-400 mb-1">{formatKwh(totalKwh)}</div>
          <div className="text-white/50 text-xs mb-3">
            = {(totalKwh * 1000).toFixed(0)} Wh = {totalKwh > 0 ? (totalKwh * 3600000).toExponential(2) : "0"} J
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

        {/* ── Convertitore di fonti energetiche ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-5 rounded-2xl p-5 shadow-xl text-white"
          style={{
            background: "linear-gradient(135deg, #1a1040, #0e1e3a)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <RefreshCw size={20} className="text-purple-400" />
            <span className="text-base font-bold">Convertitore di fonti energetiche</span>
          </div>
          <p className="text-white/50 text-xs mb-4">
            Scegli un tipo di energia e scopri quanta ne servirebbe per produrre il totale del tuo consumo.
          </p>

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
                  Aggiungi almeno una voce per vedere la conversione.
                </p>
              ) : (
                <>
                  <p className="text-white/60 text-xs mb-1 uppercase tracking-wide font-semibold">
                    Per produrre {formatKwh(totalKwh)} con energia {activeSource.label.toLowerCase()} servono:
                  </p>
                  <div className="flex items-end gap-2 mt-2 flex-wrap">
                    <span className="text-4xl font-black" style={{ color: activeSource.color }}>
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
