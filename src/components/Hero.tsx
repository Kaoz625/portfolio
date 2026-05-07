// <!-- Chango strikes, Oshun flows, Oya turns the wheel -->
import { motion } from 'framer-motion'
import { STATS } from '../data/projects'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* ── Deep background gradient ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(200,144,10,0.08) 0%, transparent 60%),' +
            'radial-gradient(ellipse 60% 40% at 20% 80%, rgba(45,138,78,0.06) 0%, transparent 50%),' +
            'radial-gradient(ellipse 50% 50% at 80% 70%, rgba(124,45,168,0.05) 0%, transparent 50%)',
        }}
      />

      {/* ── Floating orbs (Orisha light) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: '15%', left: '8%',  size: 3, color: 'var(--oshun-p)',   delay: '0s'   },
          { top: '25%', left: '90%', size: 2, color: 'var(--orunmila-s)',delay: '1.2s' },
          { top: '65%', left: '5%',  size: 2, color: 'var(--yemoja-s)',  delay: '0.7s' },
          { top: '75%', left: '85%', size: 3, color: 'var(--oya-s)',     delay: '2s'   },
          { top: '45%', left: '95%', size: 2, color: 'var(--chango-p)',  delay: '0.4s' },
        ].map((orb, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              top: orb.top, left: orb.left,
              width: orb.size * 4, height: orb.size * 4,
              background: orb.color,
              filter: `blur(${orb.size}px)`,
              opacity: 0.6,
              animationDelay: orb.delay,
            }}
          />
        ))}
      </div>

      {/* ── Chango lightning streak ── */}
      <svg
        className="absolute top-0 left-1/2 -translate-x-1/2 animate-lightning pointer-events-none"
        width="3" height="40vh" style={{ opacity: 0 }}
      >
        <line x1="1.5" y1="0" x2="1.5" y2="100%" stroke="var(--chango-s)" strokeWidth="2" />
      </svg>

      {/* ── Main content ── */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Eyebrow */}
        <motion.div variants={fadeUp} className="mb-6">
          <span
            className="cinzel text-xs tracking-[0.4em] px-4 py-2 rounded-full border"
            style={{ borderColor: 'rgba(200,144,10,0.3)', color: 'var(--oshun-s)', background: 'rgba(200,144,10,0.06)' }}
          >
            NYC TAILBLAZERS · MARKUS USCHE
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={fadeUp}
          className="cinzel font-black leading-none mb-6"
          style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', letterSpacing: '-0.02em' }}
        >
          <span className="text-gold">CINEMATIC</span>
          <br />
          <span style={{ color: 'var(--text)' }}>WEBSITES.</span>
          <br />
          <span className="text-green-metal">INTELLIGENT</span>
          <br />
          <span style={{ color: 'var(--text)' }}>SYSTEMS.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'var(--muted)', fontWeight: 300 }}
        >
          Full-stack developer, AI systems engineer &amp; Dog Walker/Trainer/Breeder. I build
          premium digital experiences and autonomous AI pipelines — the kind that look like they cost a million dollars
          and work like they were built by a team of ten.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center mb-16">
          <a
            href="#projects"
            className="px-8 py-4 cinzel text-sm font-bold tracking-widest rounded transition-all duration-300 animate-pulse-glow"
            style={{
              background: 'linear-gradient(135deg,var(--oshun-p),var(--oshun-s))',
              color: '#080808',
            }}
          >
            VIEW WORK
          </a>
          <a
            href="#contact"
            className="px-8 py-4 cinzel text-sm font-bold tracking-widest rounded border transition-all duration-300"
            style={{
              borderColor: 'rgba(200,144,10,0.4)',
              color: 'var(--oshun-s)',
              background: 'rgba(200,144,10,0.05)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(200,144,10,0.12)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(200,144,10,0.05)' }}
          >
            LET&apos;S TALK
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-xl overflow-hidden border"
          style={{ borderColor: 'var(--border)' }}
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="py-6 px-4 text-center"
              style={{ background: 'var(--surface)' }}
            >
              <div className="cinzel font-black text-3xl md:text-4xl text-gold mb-1">{s.value}</div>
              <div className="text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Oshun river wave divider ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ height: 80 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,40 Q180,10 360,40 Q540,70 720,40 Q900,10 1080,40 Q1260,70 1440,40 L1440,80 L0,80 Z"
            fill="var(--surface)"
            opacity="0.5"
          />
          <path
            d="M0,50 Q180,20 360,50 Q540,80 720,50 Q900,20 1080,50 Q1260,80 1440,50 L1440,80 L0,80 Z"
            fill="var(--surface)"
          />
        </svg>
      </div>
    </section>
  )
}
