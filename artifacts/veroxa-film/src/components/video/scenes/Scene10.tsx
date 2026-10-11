import { motion } from 'framer-motion';

const EASE = [0.18, 0.82, 0.2, 1] as const;

export function Scene10() {
  return (
    <motion.section className="film-stage" initial={{ opacity: 0, scale: 1.08, rotateX: -5 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, scale: 1.025 }} transition={{ duration: 0.5, ease: EASE }}
      style={{ background: '#08182e', color: '#f5f8f9' }}>
      <motion.div className="absolute" style={{ inset: 0, background: 'radial-gradient(ellipse at 24% 50%,rgba(40,125,166,.2),transparent 42%),linear-gradient(90deg,#08182e 0%,#0d213b 100%)' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} />
      <motion.div className="absolute rounded-full overflow-hidden" style={{ left: '24%', top: '49%', width: '37vmin', height: '37vmin', x: '-50%', y: '-50%', background: '#cce8f2', boxShadow: '0 0 0 1px rgba(204,232,242,.82),0 2.5vmin 7vmin rgba(0,0,0,.26)', display: 'grid', placeItems: 'center' }}
        initial={{ scale: 0.2, rotate: -14, opacity: 0 }} animate={{ scale: [0.2, 1.06, 1], rotate: [ -14, 1.2, 0 ], opacity: 1 }}
        transition={{ duration: 0.78, delay: 0.12, ease: EASE }}>
        <motion.svg viewBox="0 0 100 100" fill="none" aria-label="Monogramma V circolare VEROXA" role="img"
          style={{ width: '68%', height: '68%', overflow: 'visible', transformOrigin: 'center' }}
          initial={{ opacity: 0, scale: 0.68, rotate: -12 }} animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.56, delay: 0.4, ease: EASE }}>
          <circle cx="50" cy="50" r="45" stroke="#163452" strokeWidth="2.2" />
          <path d="M32 35L50 65L68 35" stroke="#163452" strokeWidth="4.6" strokeLinecap="square" strokeLinejoin="miter" />
        </motion.svg>
      </motion.div>
      <motion.div className="absolute rounded-full" style={{ left: '24%', top: '49%', width: '44vmin', height: '44vmin', x: '-50%', y: '-50%', border: '1px solid rgba(204,232,242,.54)', transformOrigin: 'center' }}
        initial={{ scale: 0.42, opacity: 0 }} animate={{ scale: [0.42, 1.02, 1.09], opacity: [0, 0.68, 0.31] }}
        transition={{ duration: 1.08, delay: 0.08, times: [0, 0.58, 1], ease: EASE }} />

      <motion.div className="absolute" style={{ left: '47%', top: '22%', width: 1, height: '52%', background: 'linear-gradient(transparent,rgba(204,232,242,.56),transparent)', transformOrigin: 'center' }}
        initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ duration: 0.54, delay: 0.34, ease: EASE }} />
      <motion.div className="absolute" style={{ left: '54%', top: '32%', width: '38%' }}
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.52, delay: 0.34, ease: EASE }}>
        <div className="film-kicker" style={{ color: '#a9deca' }}>SOLUZIONI DIGITALI</div>
        <h1 className="film-copy m-0" style={{ fontSize: '9.6vmin', marginTop: '2vmin', letterSpacing: '.015em' }}>VEROXA</h1>
        <motion.div style={{ height: 1, width: '18vmin', background: '#cce8f2', transformOrigin: 'left', marginTop: '2.3vmin' }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.38, delay: 0.78 }} />
        <motion.p className="film-support m-0" style={{ color: 'rgba(245,248,249,.88)', maxWidth: '18ch', marginTop: '2.2vmin' }}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42, delay: 0.92 }}>
          Soluzioni digitali costruite intorno alla tua attività.
        </motion.p>
        <motion.div className="film-micro" style={{ color: 'rgba(204,232,242,.64)', marginTop: '4.5vmin', fontSize: '1.7vmin' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 1.28 }}>
          SITI WEB · DESIGN · E-COMMERCE · SEO
        </motion.div>
      </motion.div>
      <motion.div className="absolute" style={{ left: '8%', bottom: '9%', width: '84%', height: 1, background: 'rgba(204,232,242,.44)', transformOrigin: 'left' }}
        initial={{ scaleX: 0 }} animate={{ scaleX: [0, 1, 1, 0.12] }} transition={{ duration: 2.1, times: [0, 0.32, 0.78, 1], delay: 0.2, ease: EASE }} />
      <motion.div className="absolute film-micro" style={{ right: '8%', bottom: '6%', color: 'rgba(245,248,249,.56)', fontSize: '1.45vmin' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 2.4 }}>
        VEROXA
      </motion.div>
    </motion.section>
  );
}
