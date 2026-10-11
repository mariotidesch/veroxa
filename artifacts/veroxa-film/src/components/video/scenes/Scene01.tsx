import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;
const WINDOW = `${import.meta.env.BASE_URL}images/atelier-window.jpg`;
const HANDS = `${import.meta.env.BASE_URL}images/atelier-hands.jpg`;
const INTERIOR = `${import.meta.env.BASE_URL}images/atelier-interior.jpg`;

export function Scene01() {
  return (
    <motion.section
      className="film-stage"
      initial={{ opacity: 0, scale: 1.025 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ scale: 1.09, opacity: 0, filter: 'blur(9px)' }}
      transition={{ duration: 0.52, ease: EASE }}
      style={{ background: '#07162f' }}
    >
      <motion.img
        className="film-photo"
        src={WINDOW}
        alt=""
        initial={{ scale: 1.22, x: '-1.2%' }}
        animate={{ scale: [1.22, 1.13, 1.08, 1.015], x: ['-1.2%', '0%', '1%', '2.5%'] }}
        transition={{ duration: 4.8, times: [0, 0.34, 0.7, 1], ease: EASE }}
        style={{ objectPosition: '54% center', filter: 'saturate(.84) contrast(1.12)' }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg,rgba(5,16,34,.80) 0%,rgba(5,16,34,.3) 42%,rgba(5,16,34,.01) 82%),linear-gradient(0deg,rgba(5,16,34,.8),transparent 58%)' }} />
      <motion.img
        className="film-photo absolute inset-0"
        src={HANDS}
        alt=""
        initial={{ opacity: 1, scale: 1.11 }}
        animate={{ opacity: [1, 1, 0, 0], scale: [1.11, 1.08, 1.03, 1.03] }}
        transition={{ duration: 0.48, times: [0, 0.16, 0.7, 1], ease: EASE }}
        style={{ objectPosition: '52% 48%', filter: 'saturate(.8) contrast(1.09)' }}
      />
      <motion.img
        className="film-photo absolute inset-0"
        src={INTERIOR}
        alt=""
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [1.1, 1.08, 1.01, 1] }}
        transition={{ duration: 1.18, delay: 1.35, times: [0, 0.08, 0.77, 1], ease: EASE }}
        style={{ objectPosition: '51% center', filter: 'saturate(.84) contrast(1.06)' }}
      />

      <motion.div
        className="absolute"
        style={{ top: '11%', left: '61%', width: '18%', height: '72%', border: '1px solid rgba(246,240,220,.56)', transformOrigin: '50% 100%' }}
        initial={{ scaleY: 0.05, opacity: 0 }}
        animate={{ scaleY: 1, opacity: [0, 0.75, 0.58], rotateY: [0, -3, 0] }}
        transition={{ duration: 0.78, delay: 0.24, ease: EASE }}
      />
      <motion.div className="absolute" style={{ top: '11%', left: '70%', height: '72%', width: 1, background: 'rgba(255,241,211,.7)' }}
        initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 0.7 }} transition={{ duration: 0.35, delay: 0.58, ease: EASE }} />

      <motion.div className="absolute" style={{ left: '6.2%', top: '7%', color: 'rgba(255,255,255,.72)' }}
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.13 }}>
        <div className="film-kicker">VEROXA <span style={{ opacity: .45, padding: '0 .5em' }}>/</span> ATELIER DIGITALE</div>
      </motion.div>

      <div className="absolute" style={{ left: '6%', bottom: '12%', width: '51%', color: '#fafaf5' }}>
        <motion.div
          initial={{ clipPath: 'inset(100% 0 0 0)', y: 16 }}
          animate={{ clipPath: 'inset(0% 0 0 0)', y: 0 }}
          transition={{ duration: 0.72, delay: 0.46, ease: EASE }}
        >
          <h1 className="film-copy m-0" style={{ fontSize: '10.1vmin', maxWidth: '11ch' }}>
            QUI, C’È <span style={{ color: '#d5ebdf', fontStyle: 'italic' }}>UNA STORIA.</span>
          </h1>
        </motion.div>
        <motion.p className="film-small m-0" style={{ marginTop: '2.4vmin', color: 'rgba(250,250,245,.82)' }}
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.58, delay: 2.73, ease: EASE }}>
          Una presenza digitale che le somiglia.
        </motion.p>
      </div>
      <motion.div className="absolute" style={{ right: '5.7%', bottom: '10%', color: 'rgba(255,255,255,.72)' }}
        initial={{ opacity: 0 }} animate={{ opacity: [0, 0.75, 0.3, 0.85] }} transition={{ duration: 3.2, delay: 0.2 }}>
        <span className="film-micro">Una storia, da scoprire</span>
      </motion.div>
      <motion.div className="absolute" style={{ right: '13%', top: '12%', height: '1px', width: '10%', background: 'rgba(235,245,247,.7)', transformOrigin: 'right' }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.52, delay: 0.84, ease: EASE }} />
    </motion.section>
  );
}
