// <!-- Ochosi marks the best work, Oya reveals the motion -->
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PROJECTS, ORISHA_COLORS, type Project } from '../data/projects'

const FEATURED_IDS = ['nyctailblazers', 'openclaw', 'llm-brains', 'popspot']

const TILE_CONFIG: Record<string, { colSpan: string; rowSpan: string }> = {
  nyctailblazers: { colSpan: 'md:col-span-2', rowSpan: '' },
  openclaw:       { colSpan: '',              rowSpan: 'md:row-span-2' },
  'llm-brains':  { colSpan: '',              rowSpan: '' },
  popspot:        { colSpan: '',              rowSpan: '' },
}

function BentoTile({ project, colSpan, rowSpan }: { project: Project; colSpan: string; rowSpan: string }) {
  const colors = ORISHA_COLORS[project.orisha]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl group cursor-pointer ${colSpan} ${rowSpan}`}
      style={{
        minHeight: rowSpan ? 420 : 220,
        border: `1px solid ${colors.glow}`,
        background: 'var(--surface)',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.015 }}
    >
      {/* Screenshot bg */}
      {project.screenshot && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${project.screenshot})` }}
        />
      )}

      {/* Always-on dark gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: project.screenshot
            ? 'linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.5) 50%, rgba(8,8,8,0.15) 100%)'
            : `radial-gradient(ellipse at 30% 30%, ${colors.glow} 0%, transparent 70%), var(--surface)`,
        }}
      />

      {/* Hover overlay: extra info */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-start p-6 gap-2"
        style={{ background: `linear-gradient(135deg, ${colors.glow}, rgba(8,8,8,0.85))` }}
      >
        <p className="text-xs leading-relaxed max-w-xs" style={{ color: 'rgba(240,240,240,0.85)' }}>
          {project.description.slice(0, 120)}…
        </p>
        <div className="flex flex-wrap gap-1 mt-2">
          {project.tech.slice(0, 4).map(t => (
            <span
              key={t}
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.1)', color: colors.secondary }}
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
            className="mt-3 text-xs cinzel tracking-widest px-4 py-2 rounded-lg font-semibold transition-all"
            style={{ background: colors.primary, color: '#080808' }}
            onClick={e => e.stopPropagation()}
          >
            {project.ctaLabel ?? 'VIEW →'}
          </a>
        )}
      </div>

      {/* Always-on bottom label */}
      <div className="absolute bottom-0 left-0 right-0 p-5 group-hover:opacity-0 transition-opacity duration-300">
        <div
          className="text-[10px] cinzel tracking-widest mb-1"
          style={{ color: colors.secondary }}
        >
          {project.category.toUpperCase()}
        </div>
        <h3 className="cinzel font-bold text-base leading-tight" style={{ color: 'var(--text)' }}>
          {project.title}
        </h3>
        <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{project.tagline}</p>
      </div>

      {/* Orisha accent dot */}
      <div
        className="absolute top-4 right-4 w-2 h-2 rounded-full"
        style={{ background: colors.secondary, boxShadow: `0 0 8px ${colors.glow}` }}
      />
    </motion.div>
  )
}

export default function FeaturedWork() {
  const featured = FEATURED_IDS
    .map(id => PROJECTS.find(p => p.id === id))
    .filter(Boolean) as Project[]

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-24 px-6" style={{ background: 'var(--surface)' }}>
      {/* Diagonal top cut */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: 60, background: 'var(--bg)', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          ref={ref}
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs cinzel tracking-[0.4em] mb-3" style={{ color: 'var(--oshun-s)' }}>
            SELECTED WORK
          </p>
          <h2
            className="cinzel font-black leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--text)' }}
          >
            FEATURED
            <br />
            <span className="text-gold">PROJECTS</span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {featured.map(p => (
            <BentoTile
              key={p.id}
              project={p}
              colSpan={TILE_CONFIG[p.id]?.colSpan ?? ''}
              rowSpan={TILE_CONFIG[p.id]?.rowSpan ?? ''}
            />
          ))}
        </div>

        {/* View all link */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <a
            href="#projects"
            className="cinzel text-xs tracking-widest border-b pb-0.5 transition-colors duration-200"
            style={{ color: 'var(--oshun-s)', borderColor: 'var(--oshun-p)' }}
          >
            VIEW ALL {PROJECTS.length} PROJECTS →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
