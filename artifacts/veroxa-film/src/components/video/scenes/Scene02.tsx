import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;
const WINDOW = `${import.meta.env.BASE_URL}images/atelier-window.jpg`;

export function Scene02() {
  return (
    <motion.section className="film-stage" initial={{ opacity: 0.9, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }} exit={{ scale: 1.12, rotate: -1.2, opacity: 0 }} transition={{ duration: 0.42, ease: EASE }} style={{ background: '#f8fbfc' }}>
      <div className="absolute inset-0 film-grid" />
      <motion.div className="absolute inset-0" style={{ background: 'linear-gradient(112deg,#e2f1f4 0 21%,#f9fbfb 21% 62%,#c8e7ee 62% 100%)', clipPath: 'polygon(0 0,100% 0,100% 100%,0 100%)' }}
        initial={{ clipPath: 'polygon(0 0,17% 0,0 100%,0 100%)' }} animate={{ clipPath: 'polygon(0 0,100% 0,81% 100%,0 100%)' }} transition={{ duration: 0.85, ease: EASE }} />

      <motion.div className="absolute overflow-hidden" style={{ left: '59%', top: '15%', height: '71%', width: '32%', transformOrigin: 'left center', boxShadow: '0 3vmin 7vmin rgba(7,22,47,.20)' }}
        initial={{ scaleX: 0.14, rotate: -4, opacity: 0.6 }} animate={{ scaleX: 1, rotate: -2, opacity: 1 }} transition={{ duration: 0.78, delay: 0.12, ease: EASE }}>
        <motion.img src={WINDOW} alt="" className="film-photo" style={{ objectPosition: '56% center' }} initial={{ scale: 1.2 }} animate={{ scale: [1.2, 1.08, 1.03] }} transition={{ duration: 4.3, ease: EASE }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(7,22,47,.04),rgba(7,22,47,.4))' }} />
      </motion.div>

      <motion.svg className="absolute" style={{ left: '48%', top: '12%', width: '28%', height: '76%', overflow: 'visible' }} viewBox="0 0 360 660" fill="none">
        <motion.path d="M35 62L181 586L326 62M80 62L181 422L280 62" stroke="#174e74" strokeWidth="2.3" strokeOpacity=".54"
          initial={{ pathLength: 0, opacity: .4 }} animate={{ pathLength: [0, 1], opacity: [.2, .78] }} transition={{ duration: 1.18, delay: .36, ease: EASE }} />
      </motion.svg>

      <motion.div className="absolute" style={{ left: '7%', top: '8%', color: '#287da6' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .1 }}>
        <span className="film-kicker">02 / DALL’IDEA AL PROGETTO</span>
      </motion.div>

      <div className="absolute" style={{ left: '7%', top: '27%', width: '51%', color: '#0b2341' }}>
        <div className="film-copy" style={{ fontSize: '9.2vmin', lineHeight: 1.08 }}>
          <motion.div initial={{ opacity: 0, x: -35, skewX: -3 }} animate={{ opacity: 1, x: 0, skewX: 0 }} transition={{ duration: .65, delay: .22, ease: EASE }}>IL DIGITALE</motion.div>
          <motion.div style={{ color: '#287da6', fontStyle: 'italic' }} initial={{ opacity: 0, x: -25, skewX: 3 }} animate={{ opacity: 1, x: 0, skewX: 0 }} transition={{ duration: .65, delay: 1.06, ease: EASE }}>PRENDE FORMA.</motion.div>
        </div>
        <motion.p className="film-small m-0" style={{ marginTop: '2.8vmin', color: '#4b667b' }}
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .54, delay: 2.26, ease: EASE }}>
          Identità. Design. Sviluppo.
        </motion.p>
      </div>

      <motion.div className="absolute" style={{ left: '7%', bottom: '11%', width: '43%', height: 1, background: '#287da6', transformOrigin: 'left' }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: .65, delay: 1.75, ease: EASE }} />
      <motion.div className="absolute rounded-full" style={{ left: '48.5%', bottom: '10.45%', width: '1.1vmin', height: '1.1vmin', background: '#80ae92', boxShadow: '0 0 22px rgba(80,145,119,.55)' }}
        initial={{ scale: 0 }} animate={{ scale: [0, 1.5, 1] }} transition={{ duration: .48, delay: 4.18, ease: EASE }} />
      <motion.div className="absolute" style={{ right: '7%', bottom: '8%', color: '#287da6', fontSize: '1.9vmin', letterSpacing: '.18em', fontWeight: 700 }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .62 }}>
        VEROXA <span style={{ opacity: .45 }}>/</span> IDENTITÀ DIGITALE
      </motion.div>
    </motion.section>
  );
}
