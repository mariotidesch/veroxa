import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useSceneTimer } from '@/lib/video';

const EASE = [0.18, 0.82, 0.2, 1] as const;
const ROOT = import.meta.env.BASE_URL;
const SERVICE_FRAMES = [
  { label: 'SITI WEB', image: `${ROOT}images/digital-responsive.jpg`, position: '44% center' },
  { label: 'DESIGN', image: `${ROOT}images/digital-identity.jpg`, position: '62% center' },
  { label: 'E-COMMERCE', image: `${ROOT}images/digital-commerce.jpg`, position: 'center' },
  { label: 'SEO', image: `${ROOT}images/digital-search.jpg`, position: '72% center' },
];

export function Scene09() {
  const [view, setView] = useState(0);
  const [frame, setFrame] = useState(-1);
  const events = useMemo(() => [
    { time: 680, callback: () => setView(1) },
    { time: 1190, callback: () => setView(2) },
    { time: 1590, callback: () => setFrame(0) },
    { time: 1890, callback: () => setFrame(1) },
    { time: 2190, callback: () => setFrame(2) },
    { time: 2490, callback: () => setFrame(3) },
  ], []);
  useSceneTimer(events);

  return (
    <motion.section className="film-stage" initial={{ opacity: 0, scale: 1.14, rotateY: -6, clipPath: 'inset(0 0 0 12%)' }} animate={{ opacity: 1, scale: 1, rotateY: 0, clipPath: 'inset(0 0 0 0)' }}
      exit={{ opacity: 0, scale: 0.84, rotateY: 7, clipPath: 'inset(8% 8% 8% 8%)' }} transition={{ duration: 0.4, ease: EASE }}
      style={{ background: '#08182e', color: '#f5f8f9' }}>
      <motion.img src={`${ROOT}images/digital-interface.jpg`} alt="" className="film-photo absolute inset-0"
        initial={{ scale: 1.18 }} animate={{ scale: [1.18, 1.08, 1.02, 1.13], x: ['1%', '0%', '-1%', '1%'] }} transition={{ duration: 2.8, times: [0, 0.5, 0.77, 1], ease: EASE }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(100deg,rgba(8,24,46,.9),rgba(8,24,46,.78) 52%,rgba(8,24,46,.46))' }} />
      <motion.div className="absolute film-micro" style={{ left: '8%', top: '10%', color: '#a9deca' }}
        initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28, delay: 0.08 }}>
        DAL TUO LATO. DA OGNI LATO.
      </motion.div>

      <div className="absolute" style={{ left: '8%', right: '8%', top: '22%', height: '49%', perspective: '1100px' }}>
        <motion.div className="absolute overflow-hidden film-glass" style={{ left: '0%', top: '4%', width: '56%', height: '92%', transformOrigin: 'right center', borderColor: 'rgba(204,232,242,.42)' }}
          animate={{ rotateY: view >= 1 ? -9 : 0, x: view >= 1 ? '-4%' : 0, opacity: view === 2 ? 0.62 : 1 }}
          transition={{ duration: 0.34, ease: EASE }}>
          <img src={`${ROOT}images/digital-responsive.jpg`} alt="" className="film-photo" style={{ objectPosition: '28% center', transform: 'scale(1.12)' }} />
          <div className="absolute" style={{ left: '5%', bottom: '7%', color: '#f5f8f9', background: 'rgba(8,24,46,.74)', padding: '.7vmin 1vmin' }}>
            <span className="film-micro" style={{ fontSize: '1.55vmin' }}>PER CHI VISITA</span>
          </div>
        </motion.div>
        <motion.div className="absolute overflow-hidden film-glass" style={{ right: '0%', top: '4%', width: '42%', height: '92%', transformOrigin: 'left center', borderColor: 'rgba(204,232,242,.42)' }}
          animate={{ rotateY: view === 0 ? 10 : 0, x: view === 0 ? '4%' : 0, opacity: view === 0 ? 0.76 : 1 }}
          transition={{ duration: 0.34, ease: EASE }}>
          <img src={`${ROOT}images/digital-booking.jpg`} alt="" className="film-photo" style={{ objectPosition: '48% center', transform: 'scale(1.08)' }} />
          <div className="absolute" style={{ left: '5%', bottom: '7%', color: '#08182e', background: 'rgba(204,232,242,.9)', padding: '.7vmin 1vmin' }}>
            <span className="film-micro" style={{ fontSize: '1.55vmin' }}>PER CHI GESTISCE</span>
          </div>
        </motion.div>
      </div>

      <motion.div className="absolute" style={{ left: '8%', bottom: '12%', display: 'flex', alignItems: 'center', gap: '1.1vmin' }}
        key={frame} initial={{ opacity: 0, x: -9 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.17 }}>
        <span style={{ width: '4vmin', height: 1, background: '#a9deca' }} />
        <span className="film-micro" style={{ color: 'rgba(245,248,249,.9)', fontSize: '1.8vmin' }}>
          {frame < 0 ? 'PER CHI VISITA. PER CHI GESTISCE.' : SERVICE_FRAMES[frame].label}
        </span>
      </motion.div>

      <div className="absolute" style={{ right: '8%', bottom: '9.3%', display: 'flex', width: '26%', height: '19%', gap: '.7vmin' }}>
        {SERVICE_FRAMES.map((service, index) => (
          <motion.div key={service.label} className="relative overflow-hidden"
            animate={{ scale: frame === index ? 1.1 : 0.9, y: frame === index ? '-7%' : 0, opacity: frame < 0 || frame === index ? 1 : 0.42, rotateY: frame === index ? 0 : -3 }}
            transition={{ duration: 0.2, ease: EASE }}
            style={{ flex: '1 1 0', minWidth: 0, border: `1px solid ${frame === index ? '#cce8f2' : 'rgba(204,232,242,.28)'}`, transformOrigin: 'center' }}>
            <img src={service.image} alt="" className="film-photo" style={{ objectPosition: service.position }} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
