import { motion } from 'framer-motion';

const EASE = [0.18, 0.82, 0.2, 1] as const;
const ROOT = import.meta.env.BASE_URL;
const SWATCHES = ['#287da6', '#a9deca', '#edf2f0', '#142c4b'];

export function Scene03() {
  return (
    <motion.section className="film-stage" initial={{ opacity: 0, x: '7%', scale: 0.98 }} animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 1.08 }} transition={{ duration: 0.43, ease: EASE }} style={{ background: '#08182e', color: '#f4f7f7' }}>
      <motion.img src={`${ROOT}images/digital-identity.jpg`} alt="" className="film-photo absolute inset-0"
        initial={{ scale: 1.14 }} animate={{ scale: [1.14, 1.05, 1.02] }} transition={{ duration: 3.2, times: [0, 0.72, 1], ease: EASE }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg,rgba(8,24,46,.96) 0%,rgba(8,24,46,.84) 35%,rgba(8,24,46,.23) 70%,rgba(8,24,46,.08))' }} />
      <motion.div className="absolute" style={{ left: '8%', top: '22%' }}
        initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.36, delay: 0.08 }}>
        <div className="film-kicker" style={{ color: '#cce8f2' }}>COERENZA VISIVA, DAL PRIMO SGUARDO</div>
        <h2 className="film-copy m-0" style={{ fontSize: '8.5vmin', marginTop: '3vmin' }}>DESIGN<br /><i style={{ color: '#a9deca' }}>& IMMAGINE.</i></h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.4vmin', marginTop: '3.2vmin' }}>
          {SWATCHES.map((color, index) => (
            <motion.span key={color} className="block" style={{ width: '4.2vmin', height: '4.2vmin', background: color, border: '1px solid rgba(246,250,249,.22)' }}
              initial={{ opacity: 0, scale: 0.56, rotate: 12 }} animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.33, delay: 0.62 + index * 0.12, ease: EASE }} />
          ))}
          <span className="film-micro" style={{ color: 'rgba(245,248,249,.75)', marginLeft: '1.5vmin' }}>COLORI · FONT · LINGUAGGIO</span>
        </div>
      </motion.div>

      <motion.div className="absolute film-glass" style={{ top: '19%', right: '8%', width: '34%', height: '64%', padding: '3.2vmin', transformOrigin: 'center', color: '#10213a' }}
        initial={{ opacity: 0, x: '13%', rotateY: 18, rotateZ: 2 }} animate={{ opacity: 1, x: 0, rotateY: 0, rotateZ: 0 }}
        transition={{ duration: 0.7, delay: 0.24, ease: EASE }}>
        <div className="film-micro" style={{ color: '#287da6' }}>SISTEMA VISIVO / 01</div>
        <motion.div style={{ height: 1, background: '#287da6', marginTop: '2.8vmin', transformOrigin: 'left' }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.65 }} />
        <div className="film-copy" style={{ color: '#f6f8f7', fontSize: '5.1vmin', lineHeight: 1.05, marginTop: '4.4vmin' }}>
          La tua<br /><i style={{ color: '#cce8f2' }}>identità.</i>
        </div>
        <div style={{ width: '100%', height: '16%', marginTop: '3.8vmin', display: 'grid', gridTemplateColumns: '1.4fr .65fr .8fr', gap: '.7vmin', transform: 'translateX(1.8vmin)' }}>
          <span style={{ background: '#287da6' }} /><span style={{ background: '#a9deca' }} /><span style={{ background: '#edf2f0' }} />
        </div>
        <motion.div className="film-micro" style={{ color: '#a9deca', marginTop: '2.4vmin' }}
          initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.34, duration: 0.32 }}>
          RICONOSCIBILE. COERENTE.
        </motion.div>
      </motion.div>
      <motion.div className="absolute" style={{ right: '8%', bottom: '10%', width: '12%', height: 1, background: '#cce8f2', transformOrigin: 'right' }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.9, duration: 0.34 }} />
    </motion.section>
  );
}
