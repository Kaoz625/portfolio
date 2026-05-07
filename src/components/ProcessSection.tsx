// <!-- Ochosi hunts the path, Elegba opens every door -->
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STEPS = [
  {
    number: '01',
    title: 'DISCOVER',
    orisha: '--elegba-s',
    orishaP: '--elegba-p',
    icon: '◎',
    description: 'Deep dive into your goals, audience, and competitive landscape. We map out the full system before a single line of code is written.',
  },
  {
    number: '02',
    title: 'DESIGN',
    orisha: '--oshun-s',
    orishaP: '--oshun-p',
    icon: '◈',
    description: 'Cinematic visuals built on your brand\'s DNA. Every pixel has a purpose — Orisha color system, motion design, and hierarchy that converts.',
  },
  {
    number: '03',
    title: 'BUILD',
    orisha: '--oggun-s',
    orishaP: '--oggun-p',
    icon: '⬡',
    description: 'Fast, clean code. React + Vite + TypeScript. Deployed in days, not months. AI pipelines that run 24/7 and scale without babysitting.',
  },
  {
    number: '04',
    title: 'LAUNCH',
    orisha: '--orunmila-s',
    orishaP: '--orunmila-p',
    icon: '◆',
    description: 'SEO-ready, performance-tested, monitored. Custom domain + two-URL delivery standard. Supported past go-live until you\'re confident.',
  },
]

export default function ProcessSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative py-24 px-6 overflow-hidden" style={{ background: 'var(--surface)' }}>
      {/* Top diagonal cut from bg */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: 60, background: 'var(--bg)', clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 100%)' }}
      />

      {/* Background pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs cinzel tracking-[0.4em] mb-3" style={{ color: 'var(--oshun-s)' }}>
            HOW IT WORKS
          </p>
          <h2
            className="cinzel font-black leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--text)' }}
          >
            THE <span className="text-gold">PROCESS</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
          {/* Connecting line (desktop only) */}
          <div
            className="hidden md:block absolute top-12 left-0 right-0 pointer-events-none"
            style={{ height: 1 }}
          >
            <svg width="100%" height="2" className="connector-line">
              <line
                x1="12.5%" y1="1" x2="87.5%" y2="1"
                stroke="rgba(200,144,10,0.25)"
                strokeWidth="1"
                strokeDasharray="6 4"
              />
            </svg>
          </div>

          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative flex flex-col items-center text-center px-4 pb-8 pt-0"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.15, duration: 0.6 }}
            >
              {/* Step orb */}
              <div
                className="relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center mb-6 border"
                style={{
                  background: `radial-gradient(circle, color-mix(in srgb, var(${step.orishaP}) 20%, var(--surface)), var(--surface))`,
                  borderColor: `var(${step.orishaP})`,
                  boxShadow: `0 0 30px color-mix(in srgb, var(${step.orishaP}) 25%, transparent)`,
                }}
              >
                <span className="text-2xl leading-none mb-0.5" style={{ color: `var(${step.orisha})` }}>
                  {step.icon}
                </span>
                <span
                  className="cinzel font-black text-xs tracking-widest"
                  style={{ color: `var(${step.orisha})` }}
                >
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <h3
                className="cinzel font-black text-lg tracking-widest mb-3"
                style={{ color: `var(${step.orisha})` }}
              >
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)', maxWidth: 200 }}>
                {step.description}
              </p>

              {/* Mobile connector */}
              {i < STEPS.length - 1 && (
                <div
                  className="md:hidden mt-6 w-px"
                  style={{
                    height: 32,
                    background: 'linear-gradient(to bottom, var(--oshun-p), transparent)',
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <a
            href="#contact"
            className="inline-block px-10 py-4 cinzel text-sm font-bold tracking-widest rounded-lg transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, var(--oshun-p), var(--oshun-s))',
              color: '#080808',
              boxShadow: '0 0 30px rgba(200,144,10,0.3)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 60px rgba(200,144,10,0.5)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(200,144,10,0.3)' }}
          >
            START YOUR PROJECT →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
