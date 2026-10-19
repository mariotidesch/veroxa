import { motion } from 'framer-motion';

const EASE = [0.18, 0.82, 0.2, 1] as const;
const ROOT = import.meta.env.BASE_URL;

export function Scene04() {
  return (
    <motion.section className="film-stage" initial={{ opacity: 0, scale: 1.1, rotateY: -12, clipPath: 'inset(0 0 0 18%)' }}
      animate={{ opacity: 1, scale: 1, rotateY: 0, clipPath: 'inset(0 0 0 0%)' }}
      exit={{ opacity: 0, scale: 1.14, x: '4%', rotateY: 6, clipPath: 'inset(0 100% 0 0)' }}
      transition={{ duration: 0.42, ease: EASE }} style={{ background: '#08182e', color: '#f5f8f9' }}>
      <motion.img src={`${ROOT}images/digital-commerce.jpg`} alt="" className="film-photo absolute"
        style={{ left: '30%', top: '12%', width: '66%', height: '76%', objectPosition: 'center', boxShadow: '-2vmin 2vmin 8vmin rgba(0,0,0,.3)' }}
        initial={{ scale: 1.22, x: '6%', rotateZ: 1.5 }} animate={{ scale: [1.22, 1.08, 1.02, 1.12], x: ['6%', '1%', 0, '2%'], rotateZ: [1.5, 0, 0, -1.2] }}
        transition={{ duration: 2.4, times: [0, 0.48, 0.77, 1], ease: EASE }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg,#08182e 0%,rgba(8,24,46,.96) 24%,rgba(8,24,46,.74) 43%,rgba(8,24,46,0) 72%)' }} />
      <div className="absolute" style={{ left: '7.5%', top: '23%', width: '37%', zIndex: 2 }}>
        <motion.div className="film-micro" style={{ color: '#a9deca' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08 }}>
          IL TUO CATALOGO, ONLINE
        </motion.div>
        <motion.h2 className="film-copy m-0" style={{ fontSize: '9.6vmin', marginTop: '3vmin' }}
          initial={{ opacity: 0, x: -23 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.42, delay: 0.12, ease: EASE }}>
          E-COMMERCE
        </motion.h2>
        <motion.div style={{ width: '13vmin', height: 1, marginTop: '2.7vmin', background: '#cce8f2', transformOrigin: 'left' }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.45, duration: 0.32 }} />
        <motion.p className="film-support m-0" style={{ maxWidth: '13ch', marginTop: '2.2vmin', color: 'rgba(245,248,249,.83)' }}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52, duration: 0.34 }}>
          Vendi online, in modo semplice.
        </motion.p>
      </div>
      <motion.div className="absolute film-glass" style={{ right: '9%', bottom: '10%', minWidth: '23%', padding: '1.5vmin 2vmin', display: 'flex', alignItems: 'center', gap: '1.4vmin' }}
        initial={{ opacity: 0, y: '24%' }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72, duration: 0.35, ease: EASE }}>
        <span style={{ width: '2.2vmin', height: '2.2vmin', background: '#a9deca', borderRadius: '50%' }} />
        <span className="film-micro" style={{ color: '#f4f8f7', fontSize: '1.6vmin' }}>UN PERCORSO D’ACQUISTO CHIARO</span>
      </motion.div>
      <motion.div className="absolute" style={{ right: '7%', top: '13%', height: '1px', width: '21%', background: 'rgba(204,232,242,.8)', transformOrigin: 'right' }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.32, delay: 0.32 }} />
    </motion.section>
  );
}
