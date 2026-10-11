import { motion } from 'framer-motion';

const EASE = [0.2, 0.78, 0.2, 1] as const;
const ROOT = import.meta.env.BASE_URL;

export function Scene01() {
  return (
    <motion.section
      className="film-stage"
      initial={{ opacity: 0, scale: 1.08, x: '-3%' }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 1.12, x: '4%' }}
      transition={{ duration: 0.46, ease: EASE }}
      style={{ background: '#08182e', color: '#f5f8f9' }}
    >
      <motion.img
        className="film-photo absolute inset-0"
        src={`${ROOT}images/digital-world.jpg`}
        alt=""
        initial={{ scale: 1.18, x: '-2%' }}
        animate={{ scale: [1.18, 1.13, 1.08, 1.03], x: ['-2%', 0, '1%', '2%'] }}
        transition={{ duration: 3.2, times: [0, 0.24, 0.65, 1], ease: EASE }}
      />
      <motion.img className="film-photo absolute inset-0" src={`${ROOT}images/digital-interface.jpg`} alt=""
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: [0, 0, 0.82, 0, 0, 0.78, 0], scale: [1.1, 1.08, 1.03, 1.03, 1.08, 1.04, 1] }}
        transition={{ duration: 3.35, times: [0, 0.12, 0.2, 0.33, 0.48, 0.57, 0.67], ease: EASE }}
      />
      <motion.img className="film-photo absolute inset-0" src={`${ROOT}images/digital-code.jpg`} alt=""
        initial={{ opacity: 0, scale: 1.12 }}
        animate={{ opacity: [0, 0, 0, 0.88, 0, 0, 0], scale: [1.12, 1.1, 1.08, 1.04, 1.02, 1, 1] }}
        transition={{ duration: 3.35, times: [0, 0.23, 0.35, 0.42, 0.54, 0.68, 0.77], ease: EASE }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg,rgba(4,14,30,.89) 0%,rgba(4,14,30,.65) 38%,rgba(4,14,30,.12) 77%),linear-gradient(0deg,rgba(4,14,30,.67),transparent 74%)' }} />
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(198,226,237,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(198,226,237,.09) 1px,transparent 1px)', backgroundSize: '8vmin 8vmin', maskImage: 'linear-gradient(110deg,black,transparent 75%)' }} />

      <motion.div className="absolute" style={{ top: '7.5%', left: '7%', color: 'rgba(245,248,249,.72)' }}
        initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.38, delay: 0.1 }}>
        <div className="film-kicker">VEROXA <span style={{ opacity: 0.4, padding: '0 .6em' }}>/</span> SOLUZIONI DIGITALI</div>
      </motion.div>

      <div className="absolute" style={{ left: '7%', top: '31%', color: '#f8faf9', width: '64%' }}>
        <h1 className="film-copy m-0" style={{ fontSize: '10.6vmin', overflow: 'hidden' }}>
          <motion.span className="block" initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.42, delay: 0.22, ease: EASE }}>
            IL TUO MONDO.
          </motion.span>
          <motion.span className="block" initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.46, delay: 0.72, ease: EASE }}>
            <i style={{ color: '#cce8f2' }}>ONLINE.</i>
          </motion.span>
        </h1>
      </div>
      <motion.div className="absolute" style={{ left: '7.2%', top: '69%', display: 'flex', alignItems: 'center', gap: '1.3vmin' }}
        initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.74, duration: 0.4 }}>
        <span style={{ width: '4.5vmin', height: 1, background: '#a9deca' }} />
        <span className="film-micro" style={{ color: 'rgba(245,248,249,.72)' }}>Un progetto digitale, tuo.</span>
      </motion.div>

      <motion.div className="absolute film-micro" style={{ right: '7%', bottom: '9%', color: 'rgba(245,248,249,.7)' }}
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.36, delay: 1.16 }}>
        DALL’IDEA ALLA PRESENZA ONLINE
      </motion.div>
      <motion.div className="absolute" style={{ right: '7%', top: '17%', width: '19%', height: '1px', background: 'rgba(204,232,242,.8)', transformOrigin: 'right' }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.35, delay: 0.48, ease: EASE }} />
    </motion.section>
  );
}
