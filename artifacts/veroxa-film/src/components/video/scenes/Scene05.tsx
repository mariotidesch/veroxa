import { motion } from 'framer-motion';
import blueMark from '@assets/vexora-profilo-azzurro.png';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Scene05() {
  return (
    <motion.section className="film-stage" initial={{ opacity: .96 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .34 }} style={{ background: '#07162f', color: '#f5f8f8' }}>
      <motion.div className="absolute" style={{ left: '50%', top: '42%', width: '42vmin', height: '42vmin', borderRadius: '50%', background: '#cce8f2', boxShadow: '0 0 0 1px rgba(202,237,242,.9), 0 0 6vmin rgba(116,186,211,.24)', x: '-50%', y: '-50%' }}
        initial={{ scale: .12 }} animate={{ scale: [ .12, .9, 1, 1.04, .96, .24 ], opacity: [1,1,1,1,1,.84] }}
        transition={{ duration: 4.65, times: [0,.22,.39,.65,.82,1], ease: EASE }} />
      <motion.div className="absolute rounded-full" style={{ left: '50%', top: '42%', width: '51vmin', height: '51vmin', border: '1px solid rgba(178,224,239,.34)', x: '-50%', y: '-50%' }}
        initial={{ scale: .3, opacity: 0 }} animate={{ scale: [ .3, 1, 1.08, .2 ], opacity: [0,.75,.5,0] }} transition={{ duration: 4.65, times: [0,.3,.78,1], ease: EASE }} />
      <motion.div className="absolute overflow-hidden" style={{ left: '50%', top: '42%', width: '34vmin', height: '34vmin', borderRadius: '50%', x: '-50%', y: '-50%', boxShadow: '0 1vmin 3vmin rgba(0,0,0,.2)' }}
        initial={{ scale: .68, opacity: 0, rotate: -5 }} animate={{ scale: [ .68, 1, 1, .24 ], opacity: [0,1,1,.72], rotate: 0 }}
        transition={{ duration: 4.65, times: [0,.22,.83,1], ease: EASE }}>
        <img src={blueMark} alt="" className="film-photo" style={{ objectFit: 'cover' }} />
      </motion.div>
      <motion.div className="absolute" style={{ left: '50%', top: '42%', width: '39vmin', height: 1, background: 'rgba(236,249,248,.9)', x: '-50%', rotate: '-35deg', transformOrigin: 'center' }}
        initial={{ scaleX: 0, opacity: 1 }} animate={{ scaleX: [0,1,1,0], opacity: [1,.8,.3,0] }} transition={{ duration: 4.65, times: [0,.2,.82,1], ease: EASE }} />

      <motion.div className="absolute" style={{ left: '50%', top: '70%', x: '-50%', color: '#e9f2f5', textAlign: 'center' }}
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .62, delay: 1.58, ease: EASE }}>
        <div className="film-copy" style={{ fontSize: '3.8vmin', letterSpacing: '.22em' }}>VEROXA</div>
      </motion.div>
      <motion.div className="absolute" style={{ left: '50%', top: '76%', x: '-50%', color: '#e9f2f5', textAlign: 'center' }}
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .62, delay: 1.58, ease: EASE }}>
        <div className="film-small" style={{ fontSize: '3.15vmin' }}>Ogni attività merita<br />di farsi trovare.</div>
        <div className="film-micro" style={{ color: '#a6cee0', marginTop: '1.7vmin', fontSize: '1.9vmin' }}>VEROXA.IT</div>
      </motion.div>

      <motion.div className="absolute film-kicker" style={{ top: '8%', left: '50%', x: '-50%', color: 'rgba(210,236,244,.63)' }}
        initial={{ opacity: 0, letterSpacing: '.42em' }} animate={{ opacity: .85, letterSpacing: '.24em' }} transition={{ duration: .7, delay: .42, ease: EASE }}>
        L’ATELIER DIGITALE
      </motion.div>
      <motion.div className="absolute" style={{ left: '70%', top: '8%', height: '84%', width: '.34vmin', borderRadius: '1vmin', x: '-50%', background: 'linear-gradient(180deg,transparent,rgba(207,238,248,.98) 24%,rgba(250,252,247,.95) 52%,rgba(160,208,222,.7) 80%,transparent)', transformOrigin: 'center' }}
        initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: [0, 0, 1], opacity: [0, 0, .68] }} transition={{ duration: .78, delay: 3.87, times: [0,.34,1], ease: EASE }} />
    </motion.section>
  );
}
