export type EnergyType = {
  id: string;
  name: string;
  color: string;
  icon: string;
  description: string;
  howItWorks: string;
  prosCons: { pros: string[]; cons: string[] };
  examples: string[];
  everydayUses: string[];
};

export const energies: EnergyType[] = [
  {
    id: "nucleare",
    name: "Energia Nucleare",
    color: "hsl(142, 71%, 45%)", // toxic green / bright green
    icon: "Atom",
    description: "L'energia liberata durante le trasformazioni dei nuclei atomici.",
    howItWorks: "Funziona principalmente attraverso la fissione nucleare: un nucleo pesante (come l'uranio) viene diviso in nuclei più leggeri, rilasciando un'enorme quantità di energia sotto forma di calore, usato per produrre vapore e azionare turbine.",
    prosCons: {
      pros: ["Alta densità energetica", "Basse emissioni di gas serra (CO2)"],
      cons: ["Produzione di scorie radioattive difficili da smaltire", "Rischi legati alla sicurezza e incidenti"]
    },
    examples: ["Centrale di Chernobyl", "Centrale di Fukushima", "Reattori di nuova generazione"],
    everydayUses: ["Produzione di elettricità su larga scala per reti nazionali", "Propulsione per sottomarini e navi spaziali"]
  },
  {
    id: "elettrica",
    name: "Energia Elettrica",
    color: "hsl(48, 96%, 53%)", // yellow
    icon: "Zap",
    description: "L'energia associata al movimento delle cariche elettriche (elettroni).",
    howItWorks: "Generata nelle centrali elettriche (tramite varie fonti primarie), viene trasportata attraverso reti ad alta tensione e trasformata a bassa tensione per arrivare in modo sicuro nelle nostre case, in corrente alternata o continua.",
    prosCons: {
      pros: ["Facile da trasportare a grandi distanze", "Estremamente versatile e pulita nel punto di utilizzo"],
      cons: ["Difficile da immagazzinare in grandi quantità", "Se prodotta da fonti fossili, genera inquinamento alla fonte"]
    },
    examples: ["Fulmini in natura", "Rete elettrica nazionale", "Corrente alternata (AC) e continua (DC)"],
    everydayUses: ["Illuminazione delle città", "Elettrodomestici", "Ricarica di dispositivi elettronici come smartphone e PC"]
  },
  {
    id: "meccanica",
    name: "Energia Meccanica",
    color: "hsl(210, 100%, 50%)", // blue
    icon: "Cog",
    description: "La somma di energia cinetica (di movimento) ed energia potenziale (di posizione) di un sistema.",
    howItWorks: "Segue la legge di conservazione dell'energia: l'energia potenziale può trasformarsi in energia cinetica e viceversa, ma la quantità totale nel sistema rimane costante se non ci sono dispersioni per attrito.",
    prosCons: {
      pros: ["Molto intuitiva e sfruttabile direttamente", "Alla base di quasi tutte le tecnologie di trasporto e produzione"],
      cons: ["Soggetta a perdite per attrito e resistenza dell'aria (calore)"]
    },
    examples: ["Un pendolo in oscillazione", "Le montagne russe", "L'acqua che cade da una cascata"],
    everydayUses: ["Guidare una bicicletta", "Motori delle automobili", "Ascensori e macchinari industriali"]
  },
  {
    id: "termica",
    name: "Energia Termica",
    color: "hsl(15, 100%, 50%)", // orange/red
    icon: "Flame",
    description: "L'energia cinetica legata al movimento microscopico di atomi e molecole (calore).",
    howItWorks: "Il calore si trasmette sempre da un corpo più caldo a uno più freddo tramite tre meccanismi: conduzione (nei solidi), convezione (nei fluidi) e irraggiamento (attraverso lo spazio vuoto, tramite onde elettromagnetiche).",
    prosCons: {
      pros: ["Indispensabile per la sopravvivenza umana", "Può essere generata in moltissimi modi"],
      cons: ["Dispersione facile e difficile da contenere", "Bassa efficienza nella conversione in energia meccanica"]
    },
    examples: ["Il vapore usato nelle centrali elettriche", "L'acqua che bolle", "Il fuoco"],
    everydayUses: ["Riscaldamento domestico (termosifoni)", "Cucinare il cibo", "Motori a combustione interna"]
  },
  {
    id: "chimica",
    name: "Energia Chimica",
    color: "hsl(280, 70%, 50%)", // purple
    icon: "FlaskConical",
    description: "L'energia immagazzinata nei legami chimici tra gli atomi.",
    howItWorks: "Viene rilasciata o assorbita durante le reazioni chimiche. Quando i legami si rompono e si formano nuovi composti più stabili, l'energia in eccesso viene liberata, spesso sotto forma di calore o elettricità.",
    prosCons: {
      pros: ["Eccellente per immagazzinare energia nel tempo", "Alta densità energetica nei combustibili fossili"],
      cons: ["La combustione produce inquinanti e gas serra", "Le batterie hanno una vita limitata e problemi di smaltimento"]
    },
    examples: ["La fotosintesi clorofilliana e la respirazione cellulare", "Esplosivi come la dinamite"],
    everydayUses: ["Batterie e accumulatori di auto e smartphone", "Il metabolismo umano che brucia calorie", "Carburanti per trasporti"]
  },
  {
    id: "eolica",
    name: "Energia Eolica",
    color: "hsl(180, 80%, 70%)", // cyan / wind
    icon: "Wind",
    description: "L'energia cinetica del vento convertita in energia elettrica o meccanica.",
    howItWorks: "Il vento fa girare le grandi pale aerodinamiche di una turbina. Il movimento rotatorio viene trasferito a un generatore che produce corrente elettrica, inviata poi alla rete.",
    prosCons: {
      pros: ["Fonte 100% rinnovabile e inesauribile", "Nessuna emissione inquinante durante il funzionamento"],
      cons: ["Dipendenza totale dalla presenza del vento (intermittenza)", "Impatto paesaggistico e rumore, rischio per l'avifauna"]
    },
    examples: ["Parchi eolici offshore (in mare aperto)", "Parchi onshore (su colline e pianure)", "I vecchi mulini a vento"],
    everydayUses: ["Alimentazione della rete elettrica nazionale", "Pompaggio di acqua in zone rurali (storico)"]
  },
  {
    id: "idroelettrica",
    name: "Energia Idroelettrica",
    color: "hsl(220, 90%, 55%)", // deep blue / water
    icon: "Droplets",
    description: "L'energia elettrica prodotta sfruttando l'energia potenziale e cinetica dell'acqua.",
    howItWorks: "Grandi dighe bloccano fiumi creando laghi artificiali. L'acqua, fatta cadere da una certa altezza in condotte forzate, acquista grande velocità e aziona enormi turbine collegate ad alternatori per produrre elettricità.",
    prosCons: {
      pros: ["Rinnovabile e molto efficiente", "Gli invasi possono fungere da riserva d'acqua per l'agricoltura"],
      cons: ["Forte impatto sugli ecosistemi fluviali", "Rischio idrogeologico se mal progettata, dipendenza dalla piovosità"]
    },
    examples: ["La Diga delle Tre Gole in Cina", "La Diga di Hoover", "Mini-idroelettrico fluviale"],
    everydayUses: ["Fornitura di energia stabile su larga scala", "Regolazione dei picchi di domanda elettrica"]
  },
  {
    id: "solare",
    name: "Energia Solare",
    color: "hsl(35, 100%, 55%)", // bright orange
    icon: "Sun",
    description: "L'energia radiante emessa dal Sole, indispensabile per la vita sulla Terra.",
    howItWorks: "Il sole produce energia tramite fusione nucleare. Sulla Terra la catturiamo con pannelli fotovoltaici (che trasformano la luce direttamente in elettricità) o solari termici (che usano il calore per scaldare l'acqua).",
    prosCons: {
      pros: ["Rinnovabile, pulita e inesauribile", "Permette la produzione decentralizzata (sui tetti di casa)"],
      cons: ["Discontinua (non produce di notte)", "Richiede grandi superfici per produrre molta energia"]
    },
    examples: ["Parchi solari nei deserti", "Energia solare usata nei satelliti nello spazio", "Tetti fotovoltaici"],
    everydayUses: ["Acqua calda sanitaria", "Autoconsumo elettrico domestico", "Alimentazione di dispositivi portatili"]
  },
  {
    id: "geotermica",
    name: "Energia Geotermica",
    color: "hsl(0, 80%, 40%)", // dark red / magma
    icon: "Mountain",
    description: "L'energia generata dal calore interno della Terra.",
    howItWorks: "L'acqua piovana filtra nel terreno e, incontrando rocce calde nel sottosuolo, si trasforma in vapore. Questo vapore può fuoriuscire naturalmente (geyser) o essere estratto con pozzi per azionare turbine e produrre elettricità.",
    prosCons: {
      pros: ["Sempre disponibile 24 ore su 24", "Bassissime emissioni e minimo uso del suolo"],
      cons: ["Sfruttabile solo in aree geologicamente adatte", "Possibile emissione di gas tossici dal sottosuolo"]
    },
    examples: ["Centrali in Islanda", "Geotermia in Toscana (Larderello)", "Geyser e sorgenti termali"],
    everydayUses: ["Riscaldamento domestico (teleriscaldamento)", "Terme e bagni caldi", "Produzione continua di elettricità"]
  }
];
