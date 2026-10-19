import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useSceneTimer } from '@/lib/video';

const EASE = [0.2, 0.78, 0.2, 1] as const;
const ROOT = import.meta.env.BASE_URL;
const FRAME_LABELS = ['DESKTOP', 'TABLET', 'SMARTPHONE'];

export function Scene02() {
  const [view, setView] = useState(0);
  const events = useMemo(() => [
    { time: 1050, callback: () => setView(1) },
    { time: 1970, callback: () => setView(2) },
  ], []);
  useSceneTimer(events);

  return (
    <motion.section className="film-stage" initial={{ opacity: 0, x: '4%', scale: 1.08, rotateY: -5, clipPath: 'inset(0 0 0 12%)' }} animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0, clipPath: 'inset(0 0 0 0%)' }} exit={{ opacity: 0, rotateY: -14, x: '-3%', scale: 1.08, clipPath: 'inset(0 100% 0 0)' }}
      transition={{ duration: 0.42, ease: EASE }} style={{ background: '#f5f8f9', color: '#10213a' }}>
      <motion.img src={`${ROOT}images/digital-interface.jpg`} alt="" className="film-photo absolute inset-0"
        initial={{ scale: 1.15 }} animate={{ scale: 1.02 }} transition={{ duration: 2.75, ease: EASE }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg,#eff4f5 0%,rgba(244,248,249,.98) 28%,rgba(240,246,248,.82) 52%,rgba(8,24,46,.2) 100%)' }} />
      <motion.div className="absolute" style={{ left: '7%', top: '17%', width: '33%' }}
        initial={{ opacity: 0, x: -22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.42, delay: 0.1, ease: EASE }}>
        <div className="film-kicker" style={{ color: '#287da6' }}>01 / PROGETTAZIONE WEB</div>
        <h2 className="film-copy m-0" style={{ fontSize: '9.6vmin', marginTop: '3.2vmin' }}>SITI<br /><i style={{ color: '#287da6' }}>WEB.</i></h2>
        <div className="film-support" style={{ marginTop: '2.5vmin', maxWidth: '9ch', color: '#38556e' }}>Rapidi.<br />Chiari. Responsive.</div>
        <div className="film-hairline" style={{ width: '15vmin', color: '#287da6', marginTop: '3.7vmin' }} />
      </motion.div>

      <motion.div
        className="absolute overflow-hidden"
        style={{ left: '28%', top: '17%', width: '66%', height: '67%', borderRadius: '1.1vmin', background: '#f5f8f9', boxShadow: '0 2.6vmin 7vmin rgba(8,24,46,.29)', border: '1px solid rgba(238,250,252,.78)', transformOrigin: 'center' }}
        initial={{ opacity: 0, scale: 0.94, x: '4%' }}
        animate={{ opacity: 1, scale: [0.94, 1.035, 1], x: 0, rotateY: view === 1 ? -3 : view === 2 ? 4 : 0, rotateX: view === 2 ? 2 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <motion.img src={`${ROOT}images/digital-responsive.jpg`} alt="" className="film-photo absolute inset-0"
          initial={{ scale: 1.23 }} animate={{ scale: view === 2 ? [1.23, 1.12, 1.2] : [1.23, 1.07, 1.02] }} transition={{ duration: 2.8, times: [0, 0.52, 1], ease: EASE }}
          style={{ objectPosition: 'center' }} />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-[1.5vmin]" style={{ height: '5.2vmin', background: 'rgba(249,252,252,.93)', borderBottom: '1px solid rgba(16,33,58,.12)' }}>
          <div className="flex gap-[.65vmin]"><i className="h-[.65vmin] w-[.65vmin] rounded-full bg-[#c8dce4]" /><i className="h-[.65vmin] w-[.65vmin] rounded-full bg-[#c8dce4]" /><i className="h-[.65vmin] w-[.65vmin] rounded-full bg-[#c8dce4]" /></div>
          <span className="film-micro" style={{ color: '#537184', fontSize: '1.4vmin', whiteSpace: 'nowrap' }}>IL TUO PROGETTO, ONLINE</span>
          <span style={{ width: '3vmin', height: 1, background: '#83b9c9' }} />
        </div>
        <motion.div className="absolute" style={{ left: '4%', bottom: '5%', color: '#f5f8f9', background: 'rgba(8,24,46,.72)', padding: '.75vmin 1.1vmin', borderRadius: '.3vmin' }}
          key={view} initial={{ opacity: 0, y: 7, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.24 }}>
          <span className="film-micro" style={{ fontSize: '1.45vmin' }}>{FRAME_LABELS[view]}</span>
        </motion.div>
      </motion.div>
      <motion.div className="absolute" style={{ top: '82%', left: '7%', display: 'flex', alignItems: 'center', gap: '1.1vmin' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
        {FRAME_LABELS.map((label, index) => (
          <motion.span key={label} className="film-micro" animate={{ opacity: view === index ? 1 : 0.47, scale: view === index ? 1.05 : 1 }}
            style={{ color: view === index ? '#287da6' : 'rgba(36,66,88,.62)', fontSize: '1.55vmin' }}>
            {label}{index < FRAME_LABELS.length - 1 && <span style={{ paddingLeft: '1.1vmin', color: '#a2bdc7' }}>/</span>}
          </motion.span>
        ))}
      </motion.div>
    </motion.section>
  );
}
