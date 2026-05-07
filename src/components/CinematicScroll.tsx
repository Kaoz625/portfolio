// <!-- Oya turns the wheel — every scroll reveals a new world -->
import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ORISHA_COLORS, type Project } from '../data/projects'

interface CinematicScrollProps {
  projects: Project[]
  sectionTitle: string
  sectionLabel: string
}

function CinematicCard({ project, direction }: { project: Project; direction: number }) {
  const colors = ORISHA_COLORS[project.orisha]
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      {/* Full-screen card */}
      <motion.div
        key={project.id}
        className="absolute inset-0 flex items-center"
        initial={{ opacity: 0, x: direction > 0 ? '8%' : '-8%', scale: 0.97 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: direction > 0 ? '-8%' : '8%', scale: 0.97 }}
        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Full-bleed screenshot background */}
        {project.screenshot ? (
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[8s] ease-linear"
            style={{
              backgroundImage: `url(${project.screenshot})`,
              transform: 'scale(1.04)',
            }}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 70% 60% at 65% 50%, ${colors.glow} 0%, transparent 70%), var(--bg)`,
            }}
          />
        )}

        {/* Dark cinematic overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: project.screenshot
              ? 'linear-gradient(105deg, rgba(8,8,8,0.96) 0%, rgba(8,8,8,0.85) 40%, rgba(8,8,8,0.3) 70%, rgba(8,8,8,0.15) 100%)'
              : `linear-gradient(135deg, rgba(8,8,8,0.98) 0%, rgba(8,8,8,0.7) 60%, ${colors.glow} 100%)`,
          }}
        />

        {/* Color accent line — left edge */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{ background: `linear-gradient(to bottom, transparent, ${colors.primary}, transparent)` }}
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16">
          <div className="max-w-xl">
            {/* Category + orisha label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <span
                className="text-[10px] cinzel tracking-[0.5em] px-3 py-1 rounded-full border"
                style={{
                  color: colors.secondary,
                  borderColor: `${colors.primary}60`,
                  background: `${colors.primary}12`,
                }}
              >
                {project.category.toUpperCase()}
              </span>
            </motion.div>

            {/* Project number + title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h2
                className="cinzel font-black leading-none mb-4"
                style={{
                  fontSize: 'clamp(3rem, 7vw, 6rem)',
                  color: 'var(--text)',
                  textShadow: `0 0 80px ${colors.glow}`,
                }}
              >
                {project.title}
              </h2>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-lg md:text-xl mb-6 leading-relaxed"
              style={{ color: colors.secondary, fontWeight: 300 }}
            >
              {project.tagline}
            </motion.p>

            {/* Description — shown on expand or hover */}
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 0.75, height: 'auto' }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="text-sm leading-relaxed mb-8 max-w-md"
              style={{ color: 'var(--muted)' }}
            >
              {project.description.slice(0, 160)}…
            </motion.p>

            {/* Tech pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {project.tech.slice(0, 5).map(t => (
                <span
                  key={t}
                  className="text-[10px] px-3 py-1 rounded-full"
                  style={{
                    background: `${colors.primary}18`,
                    color: colors.secondary,
                    border: `1px solid ${colors.primary}35`,
                  }}
                >
                  {t}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 cinzel text-xs font-bold tracking-widest rounded-lg transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    color: '#080808',
                    boxShadow: `0 0 24px ${colors.glow}`,
                  }}
                >
                  {project.ctaLabel ?? 'VIEW LIVE →'}
                </a>
              )}
              <button
                onClick={() => setExpanded(true)}
                className="px-8 py-3 cinzel text-xs font-bold tracking-widest rounded-lg border transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: `${colors.primary}50`,
                  color: colors.secondary,
                  background: `${colors.primary}08`,
                }}
              >
                EXPAND ↗
              </button>
            </motion.div>
          </div>
        </div>

        {/* Right side: large screenshot preview (desktop) */}
        {project.screenshot && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="hidden lg:block absolute right-0 top-0 bottom-0 w-2/5 overflow-hidden"
            style={{ clipPath: 'polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-top"
              style={{ backgroundImage: `url(${project.screenshot})` }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to right, rgba(8,8,8,0.9) 0%, rgba(8,8,8,0.2) 40%, rgba(8,8,8,0) 100%)',
              }}
            />
          </motion.div>
        )}

        {/* Orisha glow dot — top right */}
        <div
          className="absolute top-8 right-8 w-3 h-3 rounded-full"
          style={{
            background: colors.secondary,
            boxShadow: `0 0 20px ${colors.glow}, 0 0 40px ${colors.glow}`,
          }}
        />
      </motion.div>

      {/* Expanded modal */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 modal-backdrop"
            style={{ background: 'rgba(8,8,8,0.92)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
          >
            <motion.div
              className="relative max-w-2xl w-full rounded-2xl p-8 border"
              style={{
                background: 'var(--surface)',
                borderColor: colors.primary + '40',
                boxShadow: `0 0 80px ${colors.glow}`,
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-xs cinzel tracking-widest"
                style={{ color: 'var(--muted)' }}
                onClick={() => setExpanded(false)}
              >
                ✕ CLOSE
              </button>
              <p className="text-[10px] cinzel tracking-[0.5em] mb-2" style={{ color: colors.secondary }}>
                {project.category.toUpperCase()}
              </p>
              <h3 className="cinzel font-black text-3xl mb-4" style={{ color: 'var(--text)' }}>
                {project.title}
              </h3>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map(t => (
                  <span
                    key={t}
                    className="text-[10px] px-3 py-1 rounded-full"
                    style={{ background: `${colors.primary}18`, color: colors.secondary, border: `1px solid ${colors.primary}35` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 cinzel text-xs font-bold tracking-widest rounded-lg"
                  style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`, color: '#080808' }}
                >
                  VISIT SITE →
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function CinematicScroll({ projects, sectionTitle, sectionLabel }: CinematicScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const prevIndexRef = useRef(0)

  const onScroll = useCallback(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const scrolled = -rect.top
    const totalScrollable = rect.height - window.innerHeight
    if (totalScrollable <= 0) return
    const rawIndex = (scrolled / totalScrollable) * (projects.length - 1)
    const clamped = Math.max(0, Math.min(projects.length - 1, Math.round(rawIndex)))
    if (clamped !== prevIndexRef.current) {
      setDirection(clamped > prevIndexRef.current ? 1 : -1)
      prevIndexRef.current = clamped
      setActiveIndex(clamped)
    }
  }, [projects.length])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  return (
    <div
      ref={containerRef}
      style={{ height: `${projects.length * 110}vh` }}
      className="relative"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>
        {/* Section label — top */}
        <div className="absolute top-6 left-8 z-20 flex items-center gap-4">
          <span className="text-[10px] cinzel tracking-[0.5em]" style={{ color: 'var(--muted)' }}>
            {sectionLabel}
          </span>
          <span className="text-[10px] cinzel tracking-[0.3em] text-gold">
            {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait" custom={direction}>
          <CinematicCard
            key={activeIndex}
            project={projects[activeIndex]}
            direction={direction}
          />
        </AnimatePresence>

        {/* Vertical progress dots — right edge */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          {projects.map((p, i) => {
            const colors = ORISHA_COLORS[p.orisha]
            return (
              <div
                key={p.id}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeIndex ? 8 : 4,
                  height: i === activeIndex ? 8 : 4,
                  background: i === activeIndex ? colors.secondary : 'var(--border)',
                  boxShadow: i === activeIndex ? `0 0 10px ${colors.glow}` : 'none',
                }}
              />
            )
          })}
        </div>

        {/* Section title — bottom left */}
        <div className="absolute bottom-8 left-8 z-20">
          <p className="cinzel font-black text-5xl md:text-7xl leading-none"
            style={{ color: 'rgba(255,255,255,0.04)', userSelect: 'none' }}>
            {sectionTitle}
          </p>
        </div>

        {/* Scroll hint — bottom center */}
        {activeIndex < projects.length - 1 && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <span className="text-[9px] cinzel tracking-widest" style={{ color: 'var(--muted)' }}>
              SCROLL
            </span>
            <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, var(--muted), transparent)' }} />
          </motion.div>
        )}
      </div>
    </div>
  )
}
