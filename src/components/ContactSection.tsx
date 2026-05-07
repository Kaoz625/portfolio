// <!-- Oshun pours gold, Elegba opens the way -->
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SERVICES = ['Premium Websites', 'Mobile Apps', 'AI Pipelines', 'Agent Systems', 'Brand Identity', 'Full-Stack Development']

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32 overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Oshun radial glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(200,144,10,0.08) 0%, transparent 65%),' +
            'radial-gradient(ellipse 40% 30% at 50% 50%, rgba(200,144,10,0.04) 0%, transparent 50%)',
        }}
      />

      {/* Grain overlay */}
      <div className="absolute inset-0 pointer-events-none grain-overlay" />

      {/* Rotating ring */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: '600px',
          height: '600px',
          border: '1px solid rgba(200,144,10,0.06)',
          top: '50%',
          left: '50%',
          animationName: 'spin-ring',
          animationDuration: '30s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: '900px',
          height: '900px',
          border: '1px solid rgba(200,144,10,0.03)',
          top: '50%',
          left: '50%',
          animationName: 'spin-ring',
          animationDuration: '50s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDirection: 'reverse',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center" ref={ref}>
        {/* Eyebrow */}
        <motion.p
          className="text-xs cinzel tracking-[0.4em] mb-6"
          style={{ color: 'var(--oshun-s)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          READY TO BUILD?
        </motion.p>

        {/* Main headline */}
        <motion.h2
          className="cinzel font-black leading-none mb-6"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 6.5rem)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span style={{ color: 'var(--text)' }}>LET&apos;S BUILD</span>
          <br />
          <span className="text-gold">SOMETHING</span>
          <br />
          <span style={{ color: 'var(--text)' }}>LEGENDARY.</span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          className="text-base leading-relaxed mb-8 mx-auto"
          style={{ color: 'var(--muted)', maxWidth: 480 }}
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Whether you need a premium website, an autonomous AI system, or a complete digital transformation —
          the conversation starts here.
        </motion.p>

        {/* Services chips */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {SERVICES.map(s => (
            <span
              key={s}
              className="text-xs px-3 py-1.5 rounded-full border"
              style={{
                color: 'var(--oshun-s)',
                borderColor: 'rgba(200,144,10,0.2)',
                background: 'rgba(200,144,10,0.05)',
              }}
            >
              {s}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <a
            href="mailto:techsupport@nyctailblazers.com"
            className="px-10 py-4 rounded-xl text-sm cinzel tracking-widest font-bold transition-all duration-300 animate-pulse-glow"
            style={{
              background: 'linear-gradient(135deg, var(--oshun-p), var(--oshun-s))',
              color: '#080808',
            }}
          >
            SEND AN EMAIL →
          </a>
          <a
            href="https://nyctailblazers.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 rounded-xl text-sm cinzel tracking-widest transition-all duration-300"
            style={{
              background: 'var(--surface)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,144,10,0.3)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
          >
            VISIT NYC TAILBLAZERS
          </a>
        </motion.div>

        {/* Bottom location tag */}
        <motion.p
          className="mt-12 text-xs cinzel tracking-[0.3em]"
          style={{ color: 'var(--muted)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          BROOKLYN, NEW YORK · BUILDING SINCE 2023
        </motion.p>
      </div>
    </section>
  )
}
