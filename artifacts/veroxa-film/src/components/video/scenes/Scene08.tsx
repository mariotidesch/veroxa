import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useSceneTimer } from '@/lib/video';

const EASE = [0.18, 0.82, 0.2, 1] as const;
const ROOT = import.meta.env.BASE_URL;
const STEPS = [
  { title: 'PROGETTAZIONE', marker: '01', note: 'Un’immagine coerente.' },
  { title: 'SVILUPPO', marker: '02', note: 'Un sito che prende forma.' },
  { title: 'OTTIMIZZAZIONE', marker: '03', note: 'Pronto per farsi trovare.' },
];

export function Scene08() {
  const [active, setActive] = useState(0);
  const [handoff, setHandoff] = useState(false);
  const events = useMemo(() => [
     { time: 700, callback: () => setActive(1) },
     { time: 1380, callback: () => setActive(2) },
     { time: 2150, callback: () => setHandoff(true) },
  ], []);
  useSceneTimer(events);

  return (
    <motion.section className="film-stage" initial={{ opacity: 0, rotateX: 8, scale: 1.08, clipPath: 'inset(0 0 12% 0)' }} animate={{ opacity: 1, rotateX: 0, scale: handoff ? 1.045 : 1, rotateY: handoff ? -2 : 0, clipPath: 'inset(0 0 0 0)' }}
      exit={{ opacity: 0, scale: 1.12, rotateY: 8, clipPath: 'inset(0 100% 0 0)' }} transition={{ duration: 0.44, ease: EASE }}
      style={{ background: '#08182e', color: '#f5f8f9' }}>
      <motion.img src={`${ROOT}images/digital-code.jpg`} alt="" className="film-photo absolute inset-0"
         initial={{ scale: 1.25 }} animate={{ scale: handoff ? 1.17 : [1.25, 1.1, 1.03], x: handoff ? '-1%' : 0 }}
         transition={{ duration: handoff ? 0.32 : 2.12, times: [0, 0.65, 1], ease: EASE }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg,rgba(8,24,46,.93) 0%,rgba(8,24,46,.74) 50%,rgba(8,24,46,.24) 100%)' }} />
      <div className="absolute" style={{ left: '8%', top: '14%', right: '8%' }}>
        <motion.div className="film-kicker" style={{ color: '#a9deca' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.09 }}>
          DAL PROGETTO ALL’ONLINE
        </motion.div>
        <h2 className="film-copy m-0" style={{ fontSize: '7.3vmin', marginTop: '2vmin', maxWidth: '12ch' }}>
          UN SERVIZIO<br /><i style={{ color: '#cce8f2' }}>COMPLETO.</i>
        </h2>
        <motion.div className="film-support" style={{ marginTop: '2.5vmin', color: 'rgba(245,248,249,.87)', minHeight: '4.1vmin' }}
          key={active} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.22 }}>
          {STEPS[active].note}
        </motion.div>
      </div>

      <div className="absolute" style={{ right: '7.5%', bottom: '16%', width: '61%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {STEPS.map((step, index) => (
          <motion.div key={step.marker} className="relative" style={{ minWidth: index === 1 ? '37%' : '25%' }}>
            <div style={{ height: 1, position: 'absolute', top: '-1.55vmin', left: 0, width: index === 2 ? '54%' : '90%', transformOrigin: 'left', background: index <= active ? '#a9deca' : 'rgba(204,232,242,.36)' }}>
              <motion.span style={{ display: 'block', width: '1.15vmin', height: '1.15vmin', borderRadius: '50%', background: index <= active ? '#a9deca' : '#cce8f2', marginTop: '-.5vmin', marginLeft: '90%' }}
                animate={{ x: index < active ? '0.7vmin' : 0, scale: index === active ? [1, 1.55, 1] : 0.75, opacity: index <= active ? 1 : 0.46 }}
                transition={{ duration: 0.42 }} />
            </div>
            <motion.span className="film-micro" animate={{ opacity: index === active ? 1 : 0.58, scale: index === active ? 1.04 : 1 }}
              style={{ fontSize: '1.8vmin', whiteSpace: 'nowrap', color: index === active ? '#cce8f2' : 'rgba(245,248,249,.61)' }}>
              <span style={{ color: '#a9deca', marginRight: '.7vmin' }}>{step.marker}</span>{step.title}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
