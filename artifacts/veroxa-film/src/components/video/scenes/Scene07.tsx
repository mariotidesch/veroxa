import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useSceneTimer } from '@/lib/video';

const EASE = [0.18, 0.82, 0.2, 1] as const;
const ROOT = import.meta.env.BASE_URL;
const FORMATS = ['DESKTOP', 'TABLET', 'SMARTPHONE'];

export function Scene07() {
  const [active, setActive] = useState(0);
  const events = useMemo(() => [
    { time: 600, callback: () => setActive(1) },
    { time: 1320, callback: () => setActive(2) },
    { time: 2060, callback: () => setActive(0) },
  ], []);
  useSceneTimer(events);

  return (
    <motion.section className="film-stage" initial={{ opacity: 0, y: '3%', scale: 1.08, rotateX: 5, clipPath: 'inset(10% 0 0 0)' }} animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0, clipPath: 'inset(0 0 0 0)' }} exit={{ opacity: 0, scale: 1.1, y: '-2%', rotateY: 7, clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.42, ease: EASE }} style={{ background: '#08182e', color: '#10213a' }}>
      <motion.img src={`${ROOT}images/digital-responsive.jpg`} alt="" className="film-photo absolute inset-0"
        initial={{ scale: 1.2 }} animate={{ scale: [1.2, 1.08, 1.02, 1.15], x: ['1%', '-1%', 0, '1%'] }}
        transition={{ duration: 2.75, times: [0, 0.43, 0.74, 1], ease: EASE }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg,rgba(8,24,46,.91) 0%,rgba(8,24,46,.78) 38%,rgba(8,24,46,.15) 71%,rgba(8,24,46,.06)),linear-gradient(0deg,rgba(8,24,46,.6),transparent 40%)' }} />
      <motion.div className="absolute" style={{ left: '8%', top: '20%', width: '43%' }}
        initial={{ opacity: 0, x: -22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.38, delay: 0.08 }}>
        <div className="film-kicker" style={{ color: '#a9deca' }}>LA STESSA ESPERIENZA, OGNI SCHERMO</div>
        <h2 className="film-copy m-0" style={{ marginTop: '3vmin', fontSize: '8.6vmin', maxWidth: '10ch' }}>
          UN SOLO<br /><i style={{ color: '#cce8f2' }}>SITO.</i>
        </h2>
        <motion.p className="film-support m-0" style={{ color: 'rgba(245,248,249,.84)', marginTop: '2.4vmin' }}
          key={active} initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.21 }}>
          Adattato a ogni schermo.
        </motion.p>
      </motion.div>

      <motion.div className="absolute" style={{ right: '10%', bottom: '10%', display: 'flex', alignItems: 'center', gap: '1.45vmin', padding: '1.35vmin 1.6vmin', background: 'rgba(8,24,46,.82)', border: '1px solid rgba(221,241,244,.22)', backdropFilter: 'blur(6px)' }}
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.3 }}>
        {FORMATS.map((format, index) => (
          <span key={format} className="film-micro" style={{ color: active === index ? '#cce8f2' : 'rgba(245,248,249,.46)', fontSize: '1.65vmin', whiteSpace: 'nowrap' }}>
            <span style={{ color: active === index ? '#a9deca' : 'rgba(245,248,249,.28)', marginRight: '.65vmin' }}>0{index + 1}</span>
            {format}
          </span>
        ))}
      </motion.div>
      <motion.div className="absolute" style={{ left: '8%', bottom: '12%', height: 1, background: 'rgba(204,232,242,.72)', transformOrigin: 'left', width: '24%' }}
        animate={{ scaleX: [0.34, 0.68, 1, 0.34], x: active === 1 ? '7%' : active === 2 ? '14%' : 0 }}
        transition={{ duration: 2.55, times: [0, 0.24, 0.51, 1], ease: EASE }} />
    </motion.section>
  );
}
