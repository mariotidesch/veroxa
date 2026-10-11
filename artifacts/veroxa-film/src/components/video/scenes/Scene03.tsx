import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;
const WINDOW = `${import.meta.env.BASE_URL}images/atelier-window.jpg`;
const TABLE = `${import.meta.env.BASE_URL}images/trattoria-table.jpg`;

export function Scene03() {
  return (
    <motion.section className="film-stage" initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} exit={{ scale: 1.08, opacity: 0, filter: 'blur(8px)' }} transition={{ duration: .48, ease: EASE }} style={{ background: '#fbfcfd' }}>
      <motion.div className="absolute" style={{ inset: '0 0 0 40%', background: 'linear-gradient(115deg,#eff8fa,#d7ebef 54%,#e8f4ee)' }}
        initial={{ clipPath: 'inset(0 0 0 55%)' }} animate={{ clipPath: 'inset(0 0 0 0)' }} transition={{ duration: .84, ease: EASE }} />
      <div className="absolute inset-0 film-grid" style={{ opacity: .45 }} />

      <motion.div className="absolute" style={{ left: '42%', top: '14%', width: '53%', height: '73%', background: '#fff', padding: '1.2vmin', boxShadow: '0 2.4vmin 7vmin rgba(17,54,82,.17)', transformOrigin: 'center' }}
        initial={{ scale: 1.34, x: '9%', y: '4%', rotate: 1.4 }} animate={{ scale: 1, x: 0, y: 0, rotate: 0 }} transition={{ duration: 1.08, ease: EASE }}>
        <div className="absolute" style={{ top: '1.2vmin', left: '1.2vmin', right: '1.2vmin', height: '5.5vmin', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2.5vmin', borderBottom: '1px solid #dfe8ec', zIndex: 2, background: 'rgba(255,255,255,.94)' }}>
          <span style={{ font: '600 1.8vmin var(--font-body)', letterSpacing: '.15em', color: '#163452' }}>ATELIER / MODA</span>
          <span style={{ font: '500 1.55vmin var(--font-body)', color: '#6e8798' }}>FATTO CON CURA&nbsp;&nbsp;&nbsp; · &nbsp;&nbsp;&nbsp;UNICO, COME TE</span>
        </div>
        <div className="absolute overflow-hidden" style={{ left: '1.2vmin', right: '1.2vmin', top: '6.7vmin', bottom: '1.2vmin' }}>
          <motion.img src={WINDOW} alt="" className="film-photo" style={{ objectPosition: '54% 50%' }} initial={{ scale: 1.18 }} animate={{ scale: [1.18, 1.06, 1.09] }} transition={{ duration: 5.15, times: [0, .56, 1], ease: EASE }} />
          <div className="absolute" style={{ inset: '0 0 0 52%', background: 'linear-gradient(90deg,rgba(9,31,52,0),rgba(9,31,52,.43))' }} />
          <motion.div className="absolute" style={{ right: '8%', top: '18%', width: '39%', color: '#fff' }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .74, ease: EASE }}>
            <div className="film-micro" style={{ color: 'rgba(255,255,255,.8)' }}>ABITI CHE RESTANO</div>
            <div className="film-copy" style={{ fontSize: '5.1vmin', marginTop: '1.4vmin' }}>La bellezza<br /><i>dei gesti.</i></div>
            <div style={{ marginTop: '1.6vmin', width: '7vmin', height: 1, background: '#d6ece2' }} />
          </motion.div>
          <div className="absolute film-micro" style={{ left: '3%', bottom: '4%', color: 'rgba(255,255,255,.9)', zIndex: 1 }}>DESKTOP / 01</div>
        </div>
      </motion.div>

      <div className="absolute" style={{ left: '6.5%', top: '14%', width: '34%', color: '#10213a', zIndex: 4 }}>
        <motion.div className="film-kicker" style={{ color: '#287da6', marginBottom: '3vmin' }}
          initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .45, delay: .18 }}>LA TUA VETRINA, OVUNQUE</motion.div>
        <div className="film-copy" style={{ fontSize: '7.5vmin', lineHeight: 1.03 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .5, ease: EASE }}>Il tuo lavoro,</motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .62, delay: 1.3, ease: EASE }}><i style={{ color: '#287da6' }}>visto come merita.</i></motion.div>
        </div>
        <motion.p className="film-small m-0" style={{ marginTop: '2.6vmin', color: '#566c7e', maxWidth: '29ch' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .55, delay: 2.28 }}>
          Siti veloci. Chiari. Riconoscibili.
        </motion.p>
        <motion.div className="film-micro" style={{ marginTop: '5vmin', color: '#287da6' }}
          initial={{ width: 0, opacity: 0 }} animate={{ width: '21vmin', opacity: 1 }} transition={{ duration: .62, delay: 2.34, ease: EASE }}>
          <span style={{ display: 'block', borderTop: '1px solid #83adbf', paddingTop: '1vmin', whiteSpace: 'nowrap' }}>IDEATO PER TE <span style={{ opacity: .48 }}>/</span> NON PER TUTTI</span>
        </motion.div>
      </div>

      <motion.div className="absolute overflow-hidden" style={{ right: '6.7%', bottom: '5.5%', width: '17.2%', height: '41%', border: '.65vmin solid #112b49', borderRadius: '2.9vmin', background: '#fafdfe', boxShadow: '0 1.5vmin 3.6vmin rgba(5,31,57,.27)', zIndex: 5, padding: '.45vmin' }}
        initial={{ opacity: 0, x: '15%', rotate: 6, scale: .8 }} animate={{ opacity: 1, x: 0, rotate: -3, scale: 1 }} transition={{ duration: .74, delay: 2.35, ease: EASE }}>
        <div className="absolute" style={{ left: '38%', top: '.42vmin', width: '24%', height: '.35vmin', background: '#173553', borderRadius: '1vmin', zIndex: 3 }} />
        <div className="absolute film-micro" style={{ left: '12%', top: '10%', color: '#17456c', fontSize: '1.65vmin', zIndex: 3 }}>CUCINA / MENU</div>
        <img src={TABLE} alt="" className="film-photo" style={{ borderRadius: '2vmin', objectPosition: '60% 50%' }} />
        <div className="absolute" style={{ left: '12%', right: '12%', bottom: '13%', color: 'white' }}>
          <div className="film-copy" style={{ fontSize: '3.2vmin' }}>Una tavola<br /><i>di casa.</i></div>
        </div>
        <motion.div className="absolute film-micro" style={{ left: '13%', bottom: '6%', color: '#d5eee4', fontSize: '1.5vmin' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.35 }}>MOBILE / 02</motion.div>
      </motion.div>

      <motion.div className="absolute rounded-full" style={{ left: '48.5%', top: '89.5%', width: '1.1vmin', height: '1.1vmin', background: '#83ad92', boxShadow: '0 0 2vmin rgba(110,164,142,.6)', zIndex: 8 }}
        initial={{ scale: 1 }} animate={{ x: ['0vw', '0vw', '12vw'], y: ['0vh', '0vh', '-64vh'], scale: [1, 1, .75], opacity: [1, 1, 0] }}
        transition={{ duration: .72, times: [0, .14, 1], ease: EASE }} />
      <motion.div className="absolute" style={{ left: '55%', bottom: '14%', height: '1px', width: '16%', transformOrigin: 'left', background: '#5c93aa', zIndex: 6 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: [0, 1, 1, 3], x: ['0vw', '0vw', '0vw', '-29vw'], y: ['0vh', '0vh', '0vh', '-47vh'] }}
        transition={{ duration: 1.8, delay: 3.55, times: [0, .25, .55, 1], ease: EASE }} />
    </motion.section>
  );
}
