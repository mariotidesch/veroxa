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
  funFacts: string[];
  dataPoints: { label: string; value: string }[];
  history: string;
};

export const energies: EnergyType[] = [
  {
    id: "nucleare",
    name: "Energia Nucleare",
    color: "hsl(142, 71%, 45%)",
    icon: "Atom",
    description:
      "L'energia liberata durante le trasformazioni dei nuclei atomici. Una piccolissima quantità di materia, secondo la celebre formula di Einstein E = mc², può trasformarsi in un'enorme quantità di energia.",
    howItWorks:
      "Funziona principalmente attraverso la fissione nucleare: un nucleo pesante come l'uranio-235 viene colpito da un neutrone e si spezza in due nuclei più leggeri, rilasciando altri neutroni e un'enorme quantità di energia sotto forma di calore. Questo calore trasforma l'acqua in vapore che muove turbine collegate ad alternatori. La reazione viene tenuta sotto controllo da barre di controllo in boro o cadmio che assorbono i neutroni in eccesso.",
    prosCons: {
      pros: [
        "Alta densità energetica (1 kg di uranio = 2.700.000 kg di carbone)",
        "Basse emissioni di gas serra (CO₂)",
        "Funziona 24 ore su 24 indipendentemente dal meteo",
        "Occupa pochissimo terreno rispetto a solare ed eolico",
      ],
      cons: [
        "Produzione di scorie radioattive pericolose per migliaia di anni",
        "Rischi legati alla sicurezza e a possibili incidenti gravi",
        "Costi di costruzione e smantellamento molto elevati",
        "L'uranio è una risorsa non rinnovabile",
      ],
    },
    examples: [
      "Centrale di Chernobyl (Ucraina, incidente 1986)",
      "Centrale di Fukushima (Giappone, incidente 2011)",
      "Reattori di nuova generazione (EPR, SMR)",
      "ITER in Francia: esperimento sulla fusione nucleare",
    ],
    everydayUses: [
      "Produzione di elettricità su larga scala per reti nazionali",
      "Propulsione di sottomarini e portaerei militari",
      "Sonde spaziali con generatori radioisotopici (Voyager, Curiosity)",
      "Medicina nucleare: radioterapia per i tumori",
    ],
    funFacts: [
      "In Italia il nucleare è stato abbandonato dopo i referendum del 1987 e 2011.",
      "La Francia produce circa il 70% della sua elettricità con il nucleare.",
      "Il combustibile esaurito di una centrale resta radioattivo per oltre 100.000 anni.",
      "La fusione nucleare, che alimenta il Sole, è la grande sfida del futuro: pulita e quasi illimitata.",
    ],
    dataPoints: [
      { label: "Centrali nel mondo", value: "≈ 440" },
      { label: "Quota elettricità mondiale", value: "≈ 10%" },
      { label: "Vita media di una centrale", value: "40–60 anni" },
      { label: "Emissioni CO₂", value: "≈ 12 g/kWh" },
    ],
    history:
      "Scoperta nel 1938 con la fissione dell'uranio (Hahn e Meitner). La prima reazione a catena controllata fu realizzata da Enrico Fermi a Chicago nel 1942. La prima centrale civile entrò in funzione in URSS nel 1954.",
  },
  {
    id: "elettrica",
    name: "Energia Elettrica",
    color: "hsl(48, 96%, 53%)",
    icon: "Zap",
    description:
      "L'energia associata al movimento ordinato delle cariche elettriche, soprattutto gli elettroni, all'interno di un materiale conduttore. È la forma di energia più versatile e diffusa nel mondo moderno.",
    howItWorks:
      "Viene prodotta nelle centrali elettriche tramite generatori che trasformano energia meccanica in elettrica grazie al principio dell'induzione elettromagnetica (Faraday, 1831). La corrente viaggia ad alta tensione lungo gli elettrodotti per ridurre le perdite, poi le cabine di trasformazione la abbassano fino ai 230 V che arrivano nelle nostre case. Esiste in due forme: corrente alternata (AC) e corrente continua (DC).",
    prosCons: {
      pros: [
        "Facile da trasportare a grandi distanze",
        "Estremamente versatile: si converte in luce, calore, movimento",
        "Pulita nel punto di utilizzo",
        "Si può misurare e controllare con altissima precisione",
      ],
      cons: [
        "Difficile da immagazzinare in grandi quantità",
        "Se prodotta da fonti fossili genera molto inquinamento",
        "Le linee ad alta tensione hanno impatto paesaggistico",
        "Pericolosa in caso di contatto diretto",
      ],
    },
    examples: [
      "Fulmini in natura (fino a 100 milioni di Volt)",
      "Rete elettrica nazionale italiana (Terna)",
      "Corrente alternata a 50 Hz nelle case europee",
      "Pile e batterie ricaricabili",
    ],
    everydayUses: [
      "Illuminazione di case, strade e città",
      "Elettrodomestici (frigorifero, lavatrice, forno)",
      "Ricarica di smartphone, computer e auto elettriche",
      "Apparecchiature mediche (TAC, risonanze, defibrillatori)",
      "Computer, internet e tutti i servizi digitali",
    ],
    funFacts: [
      "Un fulmine può raggiungere temperature di 30.000 °C, cinque volte la superficie del Sole.",
      "Il cuore umano funziona grazie a piccolissimi impulsi elettrici.",
      "Edison sosteneva la corrente continua, Tesla quella alternata: vinse Tesla.",
      "Un blackout di un'ora nella sola Roma fa perdere milioni di euro all'economia.",
    ],
    dataPoints: [
      { label: "Tensione casa (Italia)", value: "230 V" },
      { label: "Frequenza rete EU", value: "50 Hz" },
      { label: "Consumo medio famiglia IT", value: "≈ 2.700 kWh/anno" },
      { label: "Velocità della corrente", value: "≈ 300.000 km/s" },
    ],
    history:
      "Volta inventa la pila nel 1800. Ørsted scopre il legame tra elettricità e magnetismo nel 1820. Faraday costruisce il primo generatore nel 1831. Edison illumina New York nel 1882, Tesla porta la corrente alternata pochi anni dopo.",
  },
  {
    id: "meccanica",
    name: "Energia Meccanica",
    color: "hsl(210, 100%, 50%)",
    icon: "Cog",
    description:
      "La somma dell'energia cinetica (legata al movimento) e dell'energia potenziale (legata alla posizione) di un sistema. È la forma di energia più direttamente percepibile dai nostri sensi.",
    howItWorks:
      "Segue il principio di conservazione dell'energia meccanica: in assenza di attrito la somma di energia cinetica (½mv²) ed energia potenziale (mgh) resta costante. L'energia potenziale si può trasformare in cinetica e viceversa, come in un pendolo o sulle montagne russe. Nei sistemi reali una parte si trasforma sempre in calore per attrito.",
    prosCons: {
      pros: [
        "Molto intuitiva e sfruttabile direttamente",
        "Alla base di quasi tutti i trasporti e i macchinari",
        "Si può misurare facilmente con strumenti semplici",
        "Trasformabile in elettricità tramite generatori",
      ],
      cons: [
        "Soggetta a perdite per attrito e resistenza dell'aria",
        "Difficile da immagazzinare per lungo tempo",
        "Richiede sistemi meccanici complessi (ingranaggi, cuscinetti)",
      ],
    },
    examples: [
      "Un pendolo in oscillazione",
      "Le montagne russe (potenziale ↔ cinetica)",
      "L'acqua che cade da una cascata",
      "Una freccia tesa nell'arco (potenziale elastica)",
      "Una palla da biliardo in movimento",
    ],
    everydayUses: [
      "Guidare una bicicletta o un'automobile",
      "Motori a combustione e motori elettrici",
      "Ascensori, gru e montacarichi",
      "Macchinari industriali e robot",
      "Orologi meccanici a molla",
    ],
    funFacts: [
      "Galileo studiò il pendolo nel Duomo di Pisa osservando una lampada oscillare.",
      "Un'auto a 100 km/h ha 16 volte l'energia cinetica della stessa auto a 25 km/h.",
      "L'energia cinetica della Terra che orbita attorno al Sole è ≈ 2,7 × 10³³ J.",
      "Una caduta da 1 metro per un essere umano libera circa 700 J.",
    ],
    dataPoints: [
      { label: "Formula energia cinetica", value: "½ · m · v²" },
      { label: "Formula energia potenziale", value: "m · g · h" },
      { label: "Accelerazione di gravità", value: "9,81 m/s²" },
      { label: "Unità di misura", value: "Joule (J)" },
    ],
    history:
      "Studiata già da Galileo e Newton nel XVII secolo. Il principio di conservazione dell'energia meccanica fu formalizzato nell'Ottocento da scienziati come Helmholtz e Joule, ponendo le basi di tutta la fisica moderna.",
  },
  {
    id: "termica",
    name: "Energia Termica",
    color: "hsl(15, 100%, 50%)",
    icon: "Flame",
    description:
      "L'energia cinetica legata al movimento disordinato di atomi e molecole. Più le particelle si muovono velocemente, più alta è la temperatura del corpo. Quello che percepiamo come 'caldo' è quindi un fenomeno microscopico.",
    howItWorks:
      "Il calore si trasmette sempre da un corpo più caldo a uno più freddo, mai il contrario (secondo principio della termodinamica). Avviene per tre meccanismi: conduzione (contatto diretto tra solidi), convezione (movimento di fluidi caldi che salgono e freddi che scendono), irraggiamento (onde elettromagnetiche che viaggiano anche nel vuoto, come il calore del Sole).",
    prosCons: {
      pros: [
        "Indispensabile per la sopravvivenza umana",
        "Può essere generata in moltissimi modi",
        "Facilmente convertibile in energia meccanica ed elettrica",
        "Si può accumulare in materiali ad alta capacità termica",
      ],
      cons: [
        "Si disperde molto facilmente nell'ambiente",
        "Bassa efficienza nella conversione in altre forme (limite di Carnot)",
        "Spesso prodotta bruciando combustibili fossili inquinanti",
        "Difficile da trasportare a lunga distanza",
      ],
    },
    examples: [
      "Il vapore usato nelle centrali termoelettriche",
      "L'acqua che bolle a 100 °C",
      "Il fuoco di un caminetto",
      "Il calore del Sole che ci raggiunge",
      "Il magma sotto la crosta terrestre",
    ],
    everydayUses: [
      "Riscaldamento domestico (termosifoni, caldaie)",
      "Cottura dei cibi (fornelli, forno, microonde)",
      "Motori a combustione interna delle auto",
      "Asciugacapelli, ferro da stiro, scaldabagno",
      "Impianti di teleriscaldamento urbano",
    ],
    funFacts: [
      "Lo zero assoluto è -273,15 °C: a quella temperatura le particelle smettono di muoversi.",
      "Il termometro fu inventato da Galileo nel 1592.",
      "Il Sole produce energia termica con una potenza di ≈ 3,8 × 10²⁶ Watt.",
      "Un essere umano emette in media 100 W di calore, come una vecchia lampadina.",
    ],
    dataPoints: [
      { label: "Unità di misura", value: "Joule (J) o caloria (cal)" },
      { label: "1 caloria", value: "= 4,186 J" },
      { label: "Zero assoluto", value: "0 K = -273,15 °C" },
      { label: "Acqua bolle (livello mare)", value: "100 °C" },
    ],
    history:
      "Sadi Carnot nel 1824 pose le basi della termodinamica. Joule dimostrò sperimentalmente l'equivalenza tra calore e lavoro meccanico. Clausius e Kelvin formalizzarono i due principi che reggono ancora oggi tutta la fisica del calore.",
  },
  {
    id: "chimica",
    name: "Energia Chimica",
    color: "hsl(280, 70%, 50%)",
    icon: "FlaskConical",
    description:
      "L'energia immagazzinata nei legami chimici tra gli atomi di una molecola. Quando i legami si rompono e se ne formano di nuovi (reazione chimica), questa energia può essere liberata o assorbita.",
    howItWorks:
      "Durante una reazione chimica gli atomi si riorganizzano formando composti più stabili. Se i nuovi legami hanno meno energia dei vecchi, l'eccesso viene liberato come calore, luce o elettricità (reazione esotermica). Se invece serve energia per formarli, viene assorbita dall'ambiente (reazione endotermica). Esempi: la combustione libera calore, la fotosintesi assorbe luce.",
    prosCons: {
      pros: [
        "Eccellente per immagazzinare energia per lunghi periodi",
        "Alta densità energetica nei combustibili fossili e nelle batterie",
        "Facilmente trasportabile (benzina, gasolio, idrogeno)",
        "Base di tutta la biologia (respirazione, digestione)",
      ],
      cons: [
        "La combustione produce CO₂ e gas inquinanti",
        "Le batterie contengono metalli rari e tossici",
        "Smaltimento difficile delle batterie esauste",
        "I combustibili fossili sono risorse non rinnovabili",
      ],
    },
    examples: [
      "La fotosintesi clorofilliana (luce → glucosio)",
      "La respirazione cellulare (glucosio → ATP)",
      "Esplosivi come dinamite e TNT",
      "Combustione di benzina, gas e legna",
      "Batterie al litio degli smartphone",
    ],
    everydayUses: [
      "Batterie di auto, smartphone e laptop",
      "Carburanti per auto, aerei e navi",
      "Digestione del cibo nel nostro corpo",
      "Fiammiferi, candele e accendini",
      "Celle a combustibile a idrogeno",
    ],
    funFacts: [
      "1 grammo di grasso fornisce 9 kcal, più del doppio dello zucchero (4 kcal).",
      "Una batteria al litio moderna immagazzina ≈ 250 Wh per kg.",
      "L'idrogeno è il combustibile più ricco di energia per unità di massa.",
      "Le batterie furono inventate da Alessandro Volta nel 1800 (la pila voltaica).",
    ],
    dataPoints: [
      { label: "Benzina", value: "≈ 32 MJ/L" },
      { label: "Batteria al litio", value: "≈ 0,9 MJ/kg" },
      { label: "Idrogeno", value: "≈ 142 MJ/kg" },
      { label: "Cioccolato fondente", value: "≈ 2,2 MJ per 100 g" },
    ],
    history:
      "Lavoisier nel '700 scoprì che la combustione è una reazione con l'ossigeno. Volta inventò la prima pila nel 1800. Le batterie ricaricabili al piombo arrivarono nel 1859 e quelle al litio negli anni '80, rivoluzionando l'elettronica portatile.",
  },
  {
    id: "eolica",
    name: "Energia Eolica",
    color: "hsl(180, 80%, 70%)",
    icon: "Wind",
    description:
      "L'energia cinetica del vento convertita in energia elettrica o meccanica. È in realtà una forma indiretta di energia solare: il Sole riscalda l'atmosfera in modo non uniforme e questo genera le differenze di pressione che fanno muovere l'aria.",
    howItWorks:
      "Il vento fa girare le grandi pale aerodinamiche di una turbina (lunghe fino a 100 metri). La rotazione del rotore viene trasmessa, tramite un moltiplicatore di giri, a un generatore elettrico che produce corrente alternata. L'elettricità viene poi inviata in rete tramite trasformatori. Le turbine moderne si orientano automaticamente nella direzione del vento.",
    prosCons: {
      pros: [
        "Fonte 100% rinnovabile e inesauribile",
        "Nessuna emissione inquinante durante il funzionamento",
        "Tempi di costruzione brevi rispetto ad altre centrali",
        "Una volta installata, costo del 'combustibile' = zero",
      ],
      cons: [
        "Dipende dalla presenza del vento (intermittenza)",
        "Impatto paesaggistico e sonoro",
        "Pericolo per uccelli e pipistrelli",
        "Servono spazi molto ampi per grandi quantità di energia",
      ],
    },
    examples: [
      "Parchi eolici offshore in mare aperto",
      "Parchi onshore su colline e pianure",
      "Vecchi mulini a vento (Olanda)",
      "Microeolico domestico sui tetti",
      "Hornsea (Regno Unito): il più grande parco offshore del mondo",
    ],
    everydayUses: [
      "Alimentazione della rete elettrica nazionale",
      "Pompaggio di acqua nelle zone rurali",
      "Macinazione del grano (uso storico)",
      "Ricarica delle batterie nelle barche a vela",
    ],
    funFacts: [
      "Una sola pala di una turbina moderna può essere più lunga di un campo da calcio.",
      "L'Italia ha oltre 5.700 turbine eoliche installate, soprattutto in Puglia e Sicilia.",
      "La Danimarca produce più del 50% della sua elettricità dal vento.",
      "Una grande turbina può alimentare circa 1.500 famiglie per un anno.",
    ],
    dataPoints: [
      { label: "Altezza turbina moderna", value: "fino a 260 m" },
      { label: "Potenza singola turbina", value: "2–15 MW" },
      { label: "Vento minimo per funzionare", value: "≈ 3 m/s" },
      { label: "Quota mondiale (2024)", value: "≈ 8% elettricità" },
    ],
    history:
      "I primi mulini a vento risalgono al IX secolo in Persia. Nel 1887 Charles Brown costruì la prima turbina eolica per produrre elettricità. Il boom dell'eolico moderno inizia negli anni '80 in Danimarca e cresce fortissimo nel XXI secolo.",
  },
  {
    id: "idroelettrica",
    name: "Energia Idroelettrica",
    color: "hsl(220, 90%, 55%)",
    icon: "Droplets",
    description:
      "L'energia elettrica prodotta sfruttando l'energia potenziale e cinetica dell'acqua in movimento. È la prima fonte rinnovabile sfruttata su larga scala dall'uomo e ancora oggi la più importante a livello mondiale.",
    howItWorks:
      "Grandi dighe bloccano fiumi creando laghi artificiali (bacini di accumulo). L'acqua, attraverso condotte forzate, cade da una grande altezza acquistando velocità e aziona enormi turbine (Pelton, Francis o Kaplan a seconda del salto e della portata). Le turbine sono collegate ad alternatori che producono elettricità. Esiste anche l'idroelettrico di pompaggio: di notte si pompa acqua in alto, di giorno la si fa cadere per produrre.",
    prosCons: {
      pros: [
        "Rinnovabile e molto efficiente (fino al 90%)",
        "Funziona 24 ore su 24 in modo programmabile",
        "Gli invasi servono come riserva d'acqua e contro le alluvioni",
        "Lunga durata degli impianti (oltre 100 anni)",
      ],
      cons: [
        "Forte impatto sugli ecosistemi fluviali",
        "Allagamento di vasti territori (spesso con sfollamento popolazioni)",
        "Dipende dalla piovosità (problemi in caso di siccità)",
        "Rischio idrogeologico in caso di rottura della diga",
      ],
    },
    examples: [
      "Diga delle Tre Gole in Cina (22.500 MW, la più grande del mondo)",
      "Diga di Hoover negli Stati Uniti",
      "Diga di Itaipu (Brasile/Paraguay)",
      "Diga del Vajont (Italia, tragedia del 1963)",
      "Mini-idroelettrico fluviale di montagna",
    ],
    everydayUses: [
      "Fornitura di energia stabile e programmabile su larga scala",
      "Regolazione dei picchi di domanda elettrica",
      "Irrigazione dei campi tramite gli invasi",
      "Riserva idrica per acquedotti cittadini",
    ],
    funFacts: [
      "L'Italia è stata pioniera dell'idroelettrico nelle Alpi a fine '800.",
      "Quasi il 16% dell'elettricità mondiale viene dall'acqua.",
      "Una diga alta 100 m con grande portata può alimentare una città intera.",
      "Il Vajont è ancora studiato come uno dei peggiori disastri della storia.",
    ],
    dataPoints: [
      { label: "Quota elettricità mondiale", value: "≈ 16%" },
      { label: "Efficienza media", value: "85–90%" },
      { label: "Quota in Italia", value: "≈ 16%" },
      { label: "Diga più grande", value: "Tre Gole — 22.500 MW" },
    ],
    history:
      "I primi impianti idroelettrici risalgono al 1882 (Appleton, USA). In Italia il boom è di inizio '900 sulle Alpi. La tragedia del Vajont nel 1963 (2.000 morti) cambiò per sempre il modo di progettare le dighe nel mondo.",
  },
  {
    id: "solare",
    name: "Energia Solare",
    color: "hsl(35, 100%, 55%)",
    icon: "Sun",
    description:
      "L'energia radiante emessa dal Sole sotto forma di onde elettromagnetiche. È indispensabile per la vita sulla Terra e rappresenta la fonte primaria di quasi tutte le altre energie rinnovabili (vento, acqua, biomasse).",
    howItWorks:
      "Il Sole produce energia tramite fusione nucleare: ogni secondo trasforma 4 milioni di tonnellate di idrogeno in elio liberando enormi quantità di luce e calore. Sulla Terra catturiamo questa energia con due tecnologie principali: pannelli fotovoltaici, in cui la luce libera elettroni nel silicio producendo corrente, e pannelli solari termici, che usano il calore del Sole per scaldare l'acqua.",
    prosCons: {
      pros: [
        "Rinnovabile, pulita e inesauribile per altri 5 miliardi di anni",
        "Permette la produzione decentralizzata sui tetti",
        "Nessun rumore né parti in movimento",
        "Costi crollati di oltre il 90% negli ultimi 15 anni",
      ],
      cons: [
        "Discontinua: non produce di notte e poco con nuvole",
        "Richiede grandi superfici per produrre molta energia",
        "Pannelli da smaltire a fine vita (25–30 anni)",
        "Richiede sistemi di accumulo (batterie) per uso costante",
      ],
    },
    examples: [
      "Parchi solari nei deserti (Sahara, Atacama)",
      "Pannelli sui satelliti e sulla Stazione Spaziale Internazionale",
      "Tetti fotovoltaici domestici",
      "Solare termodinamico a specchi (Spagna)",
      "Calcolatrici solari e cartelli stradali",
    ],
    everydayUses: [
      "Acqua calda sanitaria con pannelli solari termici",
      "Autoconsumo elettrico domestico",
      "Alimentazione di smartphone, lampade e zaini fotovoltaici",
      "Pompe di calore alimentate dal fotovoltaico",
      "Auto solari sperimentali",
    ],
    funFacts: [
      "In 1 ora il Sole invia sulla Terra più energia di quanta ne consumi l'umanità in 1 anno.",
      "I primi pannelli fotovoltaici furono inventati nel 1954 nei Bell Labs.",
      "L'Italia ha oltre 1,5 milioni di impianti fotovoltaici installati.",
      "Il record di efficienza in laboratorio supera il 47% (celle multigiunzione).",
    ],
    dataPoints: [
      { label: "Potenza Sole sulla Terra", value: "≈ 1.000 W/m²" },
      { label: "Efficienza pannello commerciale", value: "20–22%" },
      { label: "Quota mondiale (2024)", value: "≈ 6% elettricità" },
      { label: "Durata pannelli", value: "25–30 anni" },
    ],
    history:
      "Effetto fotovoltaico scoperto da Becquerel nel 1839. Prima cella commerciale nel 1954. Esplosione del mercato negli anni 2000 con il crollo dei prezzi del silicio. Oggi il solare è la fonte di energia che cresce più velocemente nel mondo.",
  },
  {
    id: "geotermica",
    name: "Energia Geotermica",
    color: "hsl(0, 80%, 40%)",
    icon: "Mountain",
    description:
      "L'energia generata dal calore interno della Terra. Il nostro pianeta è ancora caldissimo all'interno (oltre 6.000 °C nel nucleo) a causa del decadimento radioattivo e del calore residuo della sua formazione di 4,5 miliardi di anni fa.",
    howItWorks:
      "L'acqua piovana filtra nel sottosuolo e, incontrando rocce calde a profondità tra 1 e 5 km, si trasforma in vapore. Questo vapore può fuoriuscire naturalmente (geyser, soffioni) o essere estratto con pozzi profondi. Il vapore aziona turbine collegate a generatori elettrici. Per il riscaldamento domestico bastano pochi metri di profondità grazie alle pompe di calore geotermiche.",
    prosCons: {
      pros: [
        "Sempre disponibile 24 ore su 24, 365 giorni l'anno",
        "Bassissime emissioni e minimo uso del suolo",
        "Indipendente dal meteo",
        "Costi bassissimi una volta costruita la centrale",
      ],
      cons: [
        "Sfruttabile solo in aree geologicamente adatte",
        "Possibile emissione di gas naturali (CO₂, idrogeno solforato)",
        "Costi iniziali di esplorazione molto alti",
        "Rischio di piccoli terremoti indotti dalle perforazioni",
      ],
    },
    examples: [
      "Centrali in Islanda (oltre 25% elettricità nazionale)",
      "Larderello in Toscana, prima centrale geotermica del mondo",
      "Geyser di Yellowstone (USA)",
      "Sorgenti termali di Saturnia (Italia)",
      "Centrale di Olkaria in Kenya",
    ],
    everydayUses: [
      "Riscaldamento domestico (pompe di calore)",
      "Teleriscaldamento di intere città (Ferrara, Reykjavík)",
      "Stabilimenti termali e SPA",
      "Coltivazione in serre riscaldate",
      "Allevamento ittico in acque calde",
    ],
    funFacts: [
      "Larderello, in Toscana, è dal 1904 la prima centrale geotermica della storia.",
      "L'Islanda riscalda quasi tutte le case con la geotermia.",
      "Il geyser Old Faithful di Yellowstone erutta ogni ≈ 90 minuti.",
      "Bastano 2 metri di profondità per avere temperatura costante tutto l'anno.",
    ],
    dataPoints: [
      { label: "Temperatura nucleo Terra", value: "≈ 6.000 °C" },
      { label: "Capacità mondiale", value: "≈ 16 GW" },
      { label: "Italia (Toscana)", value: "≈ 6 TWh/anno" },
      { label: "Profondità pozzi", value: "1 – 5 km" },
    ],
    history:
      "Sfruttata fin dall'antichità per le terme romane. Nel 1904 a Larderello (Toscana) il principe Piero Ginori Conti accese 5 lampadine col vapore geotermico, inaugurando la geotermia moderna. Oggi è una delle rinnovabili più stabili al mondo.",
  },
];
