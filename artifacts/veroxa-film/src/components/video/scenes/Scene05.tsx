import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useSceneTimer } from '@/lib/video';

const EASE = [0.18, 0.82, 0.2, 1] as const;
const ROOT = import.meta.env.BASE_URL;
const DAYS = ['L', 'M', 'M', 'G', 'V', 'S', 'D'];
const CELLS = Array.from({ length: 28 }, (_, index) => index);

export function Scene05() {
  const [selection, setSelection] = useState(10);
  const events = useMemo(() => [
    { time: 780, callback: () => setSelection(16) },
    { time: 1500, callback: () => setSelection(21) },
  ], []);
  useSceneTimer(events);

  return (
    <motion.section className="film-stage" initial={{ opacity: 0, scale: 1.12, rotateY: 12, clipPath: 'circle(120% at 82% 48%)' }} animate={{ opacity: 1, scale: 1, rotateY: 0, clipPath: 'circle(120% at 82% 48%)' }}
      exit={{ opacity: 0, scale: 1.08, rotateX: 8, clipPath: 'circle(0% at 82% 48%)' }} transition={{ duration: 0.42, ease: EASE }}
      style={{ background: '#08182e', color: '#f5f8f9' }}>
      <motion.img src={`${ROOT}images/digital-booking.jpg`} alt="" className="film-photo absolute inset-0"
        initial={{ scale: 1.16, x: '3%' }} animate={{ scale: [1.16, 1.07, 1.02, 1.1], x: ['3%', '1%', 0, '-1%'] }} transition={{ duration: 2.8, times: [0, 0.48, 0.78, 1], ease: EASE }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg,#08182e 0%,rgba(8,24,46,.93) 34%,rgba(8,24,46,.36) 71%,rgba(8,24,46,.1))' }} />
      <div className="absolute" style={{ top: '19%', left: '7.5%', width: '37%' }}>
        <motion.div className="film-micro" style={{ color: '#a9deca' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08 }}>IL TEMPO, IN ORDINE</motion.div>
        <motion.h2 className="film-copy m-0" style={{ fontSize: '6.4vmin', marginTop: '3vmin', whiteSpace: 'nowrap' }}
          initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.42, delay: 0.12, ease: EASE }}>
          PRENOTAZIONI.
        </motion.h2>
        <motion.p className="film-support m-0" style={{ maxWidth: '15ch', color: 'rgba(245,248,249,.82)', marginTop: '2.3vmin' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.32, delay: 0.62 }}>
          Semplici da usare.<br />Comode da gestire.
        </motion.p>
        <motion.div style={{ width: '14vmin', height: 1, background: '#a9deca', marginTop: '3.2vmin', transformOrigin: 'left' }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.33, delay: 0.72 }} />
      </div>

      <motion.div className="absolute film-glass" style={{ right: '9%', top: '15%', width: '36%', height: '70%', padding: '3vmin', borderColor: 'rgba(212,240,242,.5)', background: 'rgba(8,24,46,.67)', backdropFilter: 'blur(8px)' }}
        initial={{ opacity: 0, y: '9%', rotate: 2.4, scale: 0.96 }} animate={{ opacity: 1, y: 0, rotate: selection === 10 ? 0 : selection === 16 ? -0.8 : 0.7, scale: selection === 21 ? 1.025 : 1 }} transition={{ duration: 0.55, delay: 0.18, ease: EASE }}>
        <div className="flex items-center justify-between">
          <span className="film-micro" style={{ color: '#eff7f5' }}>SCEGLI UN MOMENTO</span>
          <span style={{ color: '#a9deca', fontSize: '2.7vmin' }}>⌄</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '1vmin', marginTop: '3.1vmin' }}>
          {DAYS.map((day, index) => <span key={`${day}${index}`} className="film-micro" style={{ textAlign: 'center', color: 'rgba(231,243,244,.57)', fontSize: '1.75vmin' }}>{day}</span>)}
        </div>
        <motion.div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '1vmin', marginTop: '1.35vmin' }}>
          {CELLS.map((cell) => (
            <motion.span key={cell} animate={{ opacity: selection === cell ? 1 : 0.64, scale: selection === cell ? 1.08 : 1 }}
              transition={{ duration: 0.22 }}
              style={{ height: '4.4vmin', display: 'grid', placeItems: 'center', borderRadius: '.35vmin', font: '600 1.65vmin var(--font-body)', color: selection === cell ? '#08182e' : 'rgba(236,246,247,.8)', background: selection === cell ? '#a9deca' : 'rgba(255,255,255,.04)', border: '1px solid rgba(204,232,242,.11)' }}>
              {cell + 1}
            </motion.span>
          ))}
        </motion.div>
        <motion.div className="absolute" style={{ bottom: '9%', left: '8%', right: '8%', height: '1px', background: '#a9deca', transformOrigin: 'left' }}
          initial={{ scaleX: 0 }} animate={{ scaleX: [0, 0.32, 0.72] }} transition={{ duration: 1.65, times: [0, 0.35, 1], ease: EASE }} />
      </motion.div>
    </motion.section>
  );
}
