// <!-- Orunmila holds the wisdom, Obatala brings clarity -->
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const SKILLS = [
  { label: 'React / Vite', orisha: '--oshun-s' },
  { label: 'TypeScript', orisha: '--yemoja-s' },
  { label: 'Python', orisha: '--orunmila-s' },
  { label: 'Tailwind CSS', orisha: '--oya-s' },
  { label: 'Framer Motion', orisha: '--oya-s' },
  { label: 'Claude API', orisha: '--oshun-s' },
  { label: 'Node.js', orisha: '--oggun-s' },
  { label: 'Cloudflare', orisha: '--ochosi-s' },
  { label: 'Supabase', orisha: '--orunmila-s' },
  { label: 'Playwright', orisha: '--elegba-s' },
  { label: 'Framer Motion', orisha: '--oya-s' },
  { label: 'SQLite / RAG', orisha: '--orunmila-s' },
  { label: 'GitHub Pages', orisha: '--yemoja-s' },
  { label: 'Electron', orisha: '--ochosi-s' },
  { label: 'AI Pipelines', orisha: '--oshun-s' },
  { label: 'LLM Orchestration', orisha: '--oya-s' },
]

const COUNTERS = [
  { end: 17, suffix: '+', label: 'Sites Launched' },
  { end: 8,  suffix: '',  label: 'Apps Built' },
  { end: 8,  suffix: '',  label: 'AI Pipelines' },
  { end: 49, suffix: '',  label: 'Active AI Agents' },
]

function Counter({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1200
    const step = Math.ceil(duration / end)
    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= end) clearInterval(timer)
    }, step)
    return () => clearInterval(timer)
  }, [inView, end])

  return (
    <div ref={ref} className="text-center">
      <div
        className="cinzel font-black text-4xl md:text-5xl text-gold leading-none mb-1"
      >
        {count}{suffix}
      </div>
      <div className="text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
        {label}
      </div>
    </div>
  )
}

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-24 px-6 overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Subtle grain overlay */}
      <div className="absolute inset-0 pointer-events-none grain-overlay" />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 80% 50%, rgba(45,138,78,0.05) 0%, transparent 60%),' +
            'radial-gradient(ellipse 50% 40% at 10% 80%, rgba(200,144,10,0.04) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left — bio + skills */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs cinzel tracking-[0.4em] mb-3" style={{ color: 'var(--oshun-s)' }}>
              ABOUT
            </p>
            <h2
              className="cinzel font-black leading-none mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--text)' }}
            >
              BUILT IN
              <br />
              <span className="text-green-metal">BROOKLYN.</span>
              <br />
              POWERED BY AI.
            </h2>

            <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted)', maxWidth: 480 }}>
              I&apos;m Markus Usche — full-stack developer, AI systems engineer, and founder of
              NYC Tailblazers. I build digital products that look like they cost a million dollars
              and work like they were built by a team of ten.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted)', maxWidth: 480 }}>
              From cinematic client websites to autonomous AI pipelines with 49+ agents running 24/7 —
              I design, build, and ship end-to-end. No middlemen. NYC energy in every pixel.
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {[...new Set(SKILLS.map(s => s.label))].slice(0, 14).map((label, i) => {
                const skill = SKILLS.find(s => s.label === label)!
                return (
                  <motion.span
                    key={label}
                    className="text-xs px-3 py-1.5 rounded-full border"
                    style={{
                      color: `var(${skill.orisha})`,
                      borderColor: `color-mix(in srgb, var(${skill.orisha}) 30%, transparent)`,
                      background: `color-mix(in srgb, var(${skill.orisha}) 8%, transparent)`,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.04, duration: 0.3 }}
                  >
                    {label}
                  </motion.span>
                )
              })}
            </div>
          </motion.div>

          {/* Right — animated counters */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-8 justify-center"
          >
            {/* Counter grid */}
            <div
              className="grid grid-cols-2 gap-px rounded-2xl overflow-hidden border"
              style={{ borderColor: 'var(--border)' }}
            >
              {COUNTERS.map(c => (
                <div key={c.label} className="py-10 px-6" style={{ background: 'var(--surface)' }}>
                  <Counter {...c} />
                </div>
              ))}
            </div>

            {/* Quote block */}
            <div
              className="rounded-2xl p-6 border-l-4"
              style={{
                background: 'var(--surface)',
                borderLeftColor: 'var(--oshun-p)',
              }}
            >
              <p className="text-sm leading-relaxed italic" style={{ color: 'var(--muted)' }}>
                &ldquo;The goal isn&apos;t just a website. It&apos;s a system — one that works while you sleep,
                converts while you focus, and scales without you lifting a finger.&rdquo;
              </p>
              <p className="text-xs cinzel tracking-widest mt-3" style={{ color: 'var(--oshun-s)' }}>
                — MARKUS USCHE, NYC TAILBLAZERS
              </p>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm cinzel tracking-widest font-semibold transition-all duration-200 group"
              style={{ color: 'var(--oshun-s)' }}
            >
              WORK WITH ME
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
