import { motion } from 'framer-motion';

const EASE = [0.18, 0.82, 0.2, 1] as const;
const ROOT = import.meta.env.BASE_URL;

export function Scene06() {
  return (
    <motion.section className="film-stage" initial={{ opacity: 0, scale: 0.9, x: '-4%' }} animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, x: '-6%' }} transition={{ duration: 0.42, ease: EASE }}
      style={{ background: '#08182e', color: '#f5f8f9' }}>
      <motion.img src={`${ROOT}images/digital-search.jpg`} alt="" className="film-photo absolute inset-0"
        initial={{ scale: 1.22, x: '4%' }} animate={{ scale: [1.22, 1.08, 1.02], x: ['4%', '1%', 0] }}
        transition={{ duration: 2.65, times: [0, 0.57, 1], ease: EASE }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg,rgba(8,24,46,.95) 0%,rgba(8,24,46,.8) 41%,rgba(8,24,46,.27) 77%,rgba(8,24,46,.18) 100%)' }} />
      <div className="absolute" style={{ left: '8%', top: '22%', width: '43%' }}>
        <motion.div className="film-kicker" style={{ color: '#a9deca' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08 }}>STRUTTURA PER FARSI TROVARE</motion.div>
        <motion.h2 className="film-copy m-0" style={{ fontSize: '14.2vmin', marginTop: '1.5vmin', letterSpacing: '-.075em' }}
          initial={{ opacity: 0, y: 16, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.44, delay: 0.13, ease: EASE }}>SEO.</motion.h2>
        <motion.div style={{ width: '34vmin', height: 1, background: '#cce8f2', transformOrigin: 'left', marginTop: '2.4vmin' }}
          initial={{ scaleX: 0 }} animate={{ scaleX: [0, 1, 0.77] }} transition={{ duration: 1.3, times: [0, 0.45, 1], delay: 0.42, ease: EASE }} />
        <motion.p className="film-support m-0" style={{ marginTop: '2.2vmin', maxWidth: '18ch', color: 'rgba(245,248,249,.83)' }}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32, delay: 0.57 }}>
          Codice e contenuti<br />per farsi trovare.
        </motion.p>
      </div>
      <motion.div className="absolute film-glass" style={{ right: '9%', top: '29%', width: '30%', padding: '2vmin 2.5vmin', display: 'flex', alignItems: 'center', gap: '1.6vmin', borderRadius: '999px' }}
        initial={{ opacity: 0, scale: 0.93, x: '6%' }} animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.47, delay: 0.3, ease: EASE }}>
        <span style={{ width: '1.45vmin', height: '1.45vmin', borderRadius: '50%', background: '#a9deca' }} />
        <span style={{ color: 'rgba(245,248,249,.82)', fontSize: '2.2vmin', letterSpacing: '-.01em' }}>la tua attività online</span>
        <span style={{ color: '#cce8f2', marginLeft: 'auto', fontSize: '2.5vmin' }}>↗</span>
      </motion.div>
      <motion.div className="absolute film-micro" style={{ right: '11%', top: '43%', display: 'flex', gap: '1.5vmin', color: 'rgba(245,248,249,.74)', fontSize: '1.55vmin' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.82, duration: 0.25 }}>
        <span>STRUTTURA</span><span style={{ color: '#a9deca' }}>/</span><span>TITOLI</span><span style={{ color: '#a9deca' }}>/</span><span>CONTENUTI</span>
      </motion.div>
      <motion.div className="absolute" style={{ left: '8%', bottom: '10%', width: '73%', height: 1, background: 'rgba(204,232,242,.5)', transformOrigin: 'left' }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.45, delay: 0.54, ease: EASE }} />
    </motion.section>
  );
}
