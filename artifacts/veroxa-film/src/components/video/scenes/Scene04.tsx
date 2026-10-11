import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSceneTimer } from '@/lib/video';

const EASE = [0.22, 1, 0.36, 1] as const;
const WINDOW = `${import.meta.env.BASE_URL}images/atelier-window.jpg`;
const TABLE = `${import.meta.env.BASE_URL}images/trattoria-table.jpg`;
const WORDS = [
  { word: 'ASCOLTO.', caption: '01   /   La tua storia' },
  { word: 'PROGETTO.', caption: '02   /   Il sito prende vita' },
  { word: 'LANCIO.', caption: '03   /   Online, insieme' },
];

export function Scene04() {
  const [word, setWord] = useState(0);
  const [caption, setCaption] = useState(-1);
  useSceneTimer([
    { time: 900, callback: () => setCaption(0) },
    { time: 1230, callback: () => { setWord(1); setCaption(1); } },
    { time: 2320, callback: () => { setWord(2); setCaption(2); } },
  ]);

  return (
    <motion.section className="film-stage" initial={{ opacity: 0, scale: 1.035 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.08 }} transition={{ duration: .42, ease: EASE }} style={{ background: '#d9edf0' }}>
      <motion.div className="absolute" style={{ inset: 0, background: 'linear-gradient(122deg,#d5ebef 0 45%,#c2e1e7 45% 69%,#eaf3e9 69% 100%)' }}
        initial={{ clipPath: 'polygon(0 0,0 0,0 100%,0 100%)' }} animate={{ clipPath: 'polygon(0 0,100% 0,100% 100%,0 100%)' }} transition={{ duration: .58, ease: EASE }} />
      <motion.div className="absolute" style={{ left: '5%', top: '14%', width: '23%', height: '67%', overflow: 'hidden', boxShadow: '0 1.4vmin 4vmin rgba(7,22,47,.14)' }}
        initial={{ clipPath: 'inset(0 100% 0 0)', rotate: -5 }} animate={{ clipPath: 'inset(0 0 0 0)', rotate: -3 }} transition={{ duration: .7, delay: .08, ease: EASE }}>
        <img src={WINDOW} alt="" className="film-photo" style={{ objectPosition: '62% center' }} />
      </motion.div>
      <motion.div className="absolute overflow-hidden" style={{ left: '33%', bottom: '9%', width: '32%', height: '28%', boxShadow: '0 1vmin 3vmin rgba(7,22,47,.15)' }}
        initial={{ scaleX: .08, opacity: 0, rotate: 2 }} animate={{ scaleX: 1, opacity: 1, rotate: 1.2 }} transition={{ duration: .58, delay: .92, ease: EASE }}>
        <img src={TABLE} alt="" className="film-photo" style={{ objectPosition: '50% 54%' }} />
      </motion.div>
      <motion.div className="absolute overflow-hidden" style={{ right: '8%', top: '10%', width: '21%', height: '34%', boxShadow: '0 1.2vmin 3.2vmin rgba(7,22,47,.18)' }}
        initial={{ clipPath: 'inset(100% 0 0 0)', rotate: 4 }} animate={{ clipPath: 'inset(0 0 0 0)', rotate: 2 }} transition={{ duration: .62, delay: 2.03, ease: EASE }}>
        <img src={TABLE} alt="" className="film-photo" style={{ objectPosition: '72% 55%' }} />
      </motion.div>
      <motion.div className="absolute" style={{ left: '24%', top: '39%', width: '63%', height: '1.5px', background: 'rgba(32,119,158,.74)', transformOrigin: 'left', zIndex: 2 }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: .76, delay: .2, ease: EASE }} />
      <motion.div className="absolute" style={{ left: '26%', top: '38.65%', width: '1.2vmin', height: '1.2vmin', borderRadius: 99, background: '#287da6', boxShadow: '0 0 1.8vmin rgba(40,125,166,.44)', zIndex: 3 }}
        initial={{ scale: 1 }} animate={{ scale: [1, 1.4, 1] }} transition={{ duration: .4, delay: .15 }} />

      <motion.div className="absolute" style={{ left: '30%', top: '14%', width: '54%', height: '33%', color: '#10213a', zIndex: 4 }}
        initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: .52, delay: .15, ease: EASE }}>
        <div className="film-micro" style={{ color: '#287da6', marginBottom: '2.1vmin' }}>UN PERCORSO, INSIEME</div>
        <AnimatePresence mode="sync">
          <motion.div key={word} className="film-copy" style={{ fontSize: '12.9vmin', whiteSpace: 'nowrap' }}
            initial={{ opacity: 0, y: 34, scale: .92, filter: 'blur(9px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -28, scale: 1.04, filter: 'blur(7px)' }}
            transition={{ duration: .39, ease: EASE }}>
            {WORDS[word].word}
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="sync">
          {caption >= 0 && <motion.div key={`cap-${caption}`} className="film-micro" style={{ marginTop: '1.45vmin', color: '#366780', fontSize: '1.9vmin' }}
            initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} transition={{ duration: .25 }}>
            {WORDS[caption].caption}
          </motion.div>}
        </AnimatePresence>
      </motion.div>

      <motion.div className="absolute film-small" style={{ left: '33%', bottom: '11%', width: '44%', color: '#173653', zIndex: 4 }}
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .48, delay: 3.22, ease: EASE }}>
        Un percorso semplice. Sempre al tuo fianco.
      </motion.div>
      <motion.div className="absolute" style={{ right: '8%', bottom: '8%', font: '700 1.9vmin var(--font-body)', letterSpacing: '.18em', color: '#287da6' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }}>VEROXA / DAL PRIMO INCONTRO AL LANCIO</motion.div>
      <motion.div className="absolute" style={{ right: '-3%', top: '9%', height: '92%', width: '19%', background: '#08172e', transformOrigin: 'right', clipPath: 'polygon(100% 0,100% 100%,0 100%)' }}
        initial={{ x: '100%' }} animate={{ x: ['100%', '100%', '-4%'] }} transition={{ duration: 1.3, times: [0, .72, 1], delay: 3.45, ease: EASE }} />
      <motion.div className="absolute rounded-full" style={{ left: '26%', top: '39%', width: '1.2vmin', height: '1.2vmin', background: '#edf8f3', boxShadow: '0 0 1.8vmin rgba(236,248,245,.82)', zIndex: 8, transformOrigin: 'center' }}
        initial={{ scale: 0, x: '0vw', y: '0vh', opacity: 1 }}
        animate={{ scale: [0, 1], x: ['0vw', '23.4vw'], y: ['0vh', '2.4vh'], opacity: [1, .08] }}
        transition={{ duration: .64, delay: 4.19, ease: EASE }} />
    </motion.section>
  );
}
