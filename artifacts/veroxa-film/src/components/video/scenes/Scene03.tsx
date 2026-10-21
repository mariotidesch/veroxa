import { motion } from 'framer-motion';

const EASE = [0.18, 0.82, 0.2, 1] as const;
const SWATCHES = ['#287da6', '#a9deca', '#edf2f0', '#142c4b'];

export function Scene03() {
  return (
    <motion.section className="film-stage" initial={{ opacity: 0, x: '3%', scale: 1.1, rotateY: 6, clipPath: 'inset(0 0 0 10%)' }} animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0, clipPath: 'inset(0 0 0 0%)' }}
      exit={{ opacity: 0, scale: 1.12, rotateY: -5, clipPath: 'inset(0 0 0 100%)' }} transition={{ duration: 0.43, ease: EASE }} style={{ background: '#eaf1f2', color: '#10213a' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg,#f4f7f6 0%,#eaf1f2 54%,#dbe9ed 100%)' }} />
      <motion.div className="absolute" style={{ right: '-8%', top: '-23%', width: '68%', height: '145%', borderRadius: '50%', border: '1px solid rgba(40,125,166,.18)', transformOrigin: 'center' }}
        initial={{ scale: 0.88, rotate: -18, opacity: 0 }} animate={{ scale: [0.88, 1.04, 1], rotate: [ -18, 5, 0 ], opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE }} />
      <motion.div className="absolute" style={{ right: '12%', top: '10%', width: '40%', height: '78%', background: '#f8faf9', border: '1px solid rgba(16,33,58,.09)', boxShadow: '0 2.8vmin 8vmin rgba(16,33,58,.1)', padding: '3.4vmin', transformOrigin: 'center' }}
        initial={{ opacity: 0, x: '7%', rotateY: 18, rotateZ: 2, scale: 0.94 }} animate={{ opacity: 1, x: 0, rotateY: [0, -2, 0], rotateZ: 0, scale: [1.02, 0.99, 1] }}
        transition={{ duration: 0.68, delay: 0.18, ease: EASE }}>
        <div className="film-micro" style={{ color: '#287da6', fontSize: '1.65vmin' }}>VEROXA / SISTEMA 01</div>
        <motion.div style={{ height: 1, background: 'rgba(16,33,58,.22)', marginTop: '2.8vmin', transformOrigin: 'left' }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.45, delay: 0.54 }} />
        <motion.svg viewBox="0 0 180 180" fill="none" aria-label="Studio grafico astratto con X intrecciata" role="img"
          style={{ position: 'absolute', width: '43%', height: '49%', left: '29%', top: '25%', overflow: 'visible' }}
          initial={{ opacity: 0, scale: 0.72, rotate: -12 }} animate={{ opacity: 1, scale: [0.72, 1.06, 1], rotate: 0 }}
          transition={{ duration: 0.62, delay: 0.46, ease: EASE }}>
          <circle cx="90" cy="90" r="75" stroke="#287da6" strokeWidth="1.5" opacity=".45" />
          <path d="M48 39L83 75L132 141" stroke="#142c4b" strokeWidth="11" strokeLinecap="square" />
          <path d="M132 39L97 75L48 141" stroke="#287da6" strokeWidth="11" strokeLinecap="square" />
          <circle cx="90" cy="90" r="5" fill="#a9deca" />
          <path d="M90 0V23M180 90H157M90 180V157M0 90H23" stroke="#142c4b" strokeWidth="2" opacity=".45" />
        </motion.svg>
        <div className="absolute" style={{ left: '9%', bottom: '8%', color: '#10213a', fontFamily: 'var(--font-display)', fontSize: '4.2vmin', letterSpacing: '-.04em' }}>
          Forma<br /><i style={{ color: '#287da6' }}>che resta.</i>
        </div>
        <div className="absolute" style={{ right: '9%', bottom: '10%', display: 'flex', gap: '.65vmin' }}>
          {SWATCHES.slice(0, 3).map((color, index) => (
            <motion.span key={color} style={{ display: 'block', width: '2.6vmin', height: '2.6vmin', background: color, borderRadius: index === 1 ? '50%' : '0' }}
              initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.28, delay: 0.9 + index * 0.1 }} />
          ))}
        </div>
      </motion.div>
      <motion.div className="absolute" style={{ left: '8%', top: '22%' }}
        initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.36, delay: 0.08 }}>
        <div className="film-kicker" style={{ color: '#287da6' }}>COERENZA VISIVA, DAL PRIMO SGUARDO</div>
        <h2 className="film-copy m-0" style={{ fontSize: '8.5vmin', marginTop: '3vmin' }}>DESIGN<br /><i style={{ color: '#287da6' }}>& IMMAGINE.</i></h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.4vmin', marginTop: '3.2vmin' }}>
          {SWATCHES.map((color, index) => (
            <motion.span key={color} className="block" style={{ width: '4.2vmin', height: '4.2vmin', background: color, border: '1px solid rgba(16,33,58,.14)' }}
              initial={{ opacity: 0, scale: 0.56, rotate: 12 }} animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.33, delay: 0.62 + index * 0.12, ease: EASE }} />
          ))}
          <span className="film-micro" style={{ color: 'rgba(16,33,58,.62)', marginLeft: '1.5vmin' }}>COLORI · FONT · LINGUAGGIO</span>
        </div>
      </motion.div>

      <motion.div className="absolute" style={{ right: '12%', bottom: '8%', width: '14%', height: 1, background: '#287da6', transformOrigin: 'right' }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.9, duration: 0.34 }} />
    </motion.section>
  );
}
