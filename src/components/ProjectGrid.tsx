// <!-- Ochosi hunts, Oshun blesses the work -->
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { PROJECTS, ORISHA_COLORS, type Project, type ProjectCategory } from '../data/projects'
import { track } from '../lib/posthog'

const TABS: { label: string; value: 'all' | ProjectCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Websites', value: 'website' },
  { label: 'Apps', value: 'app' },
  { label: 'Pipelines', value: 'pipeline' },
  { label: 'Tools', value: 'tool' },
]

const SECTION_LABELS: Record<ProjectCategory, string> = {
  website: 'Client Websites',
  app: 'Apps & Games',
  pipeline: 'AI Pipelines',
  tool: 'Tools & Research',
}

export default function ProjectGrid() {
  const [filter, setFilter] = useState<'all' | ProjectCategory>('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return PROJECTS.filter(p =>
      (filter === 'all' || p.category === filter) &&
      (!q || p.title.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q) || p.tech.some(t => t.toLowerCase().includes(q)))
    )
  }, [filter, search])

  const counts = useMemo(() => ({
    all: PROJECTS.length,
    website: PROJECTS.filter(p => p.category === 'website').length,
    app: PROJECTS.filter(p => p.category === 'app').length,
    pipeline: PROJECTS.filter(p => p.category === 'pipeline').length,
    tool: PROJECTS.filter(p => p.category === 'tool').length,
  }), [])

  function handleCardClick(p: Project) {
    track('project_modal_open', { project_id: p.id })
    setSelected(p)
  }

  // Group by category when showing all
  const groups = useMemo(() => {
    if (filter !== 'all') return null
    const order: ProjectCategory[] = ['website', 'app', 'pipeline', 'tool']
    return order.map(cat => ({
      cat,
      projects: filtered.filter(p => p.category === cat),
    })).filter(g => g.projects.length > 0)
  }, [filter, filtered])

  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="cinzel text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--text)' }}>
          THE WORK
        </h2>
        <p className="text-sm tracking-widest" style={{ color: 'var(--muted)' }}>
          {PROJECTS.length} PROJECTS — WEBSITES · APPS · AI · TOOLS
        </p>
      </motion.div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, stack, or type..."
          className="w-full max-w-lg mx-auto block px-4 py-3 rounded-lg text-sm outline-none transition-all"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
          }}
          onFocus={e => (e.currentTarget.style.borderColor = 'var(--oshun-p)')}
          onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
        />
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {TABS.map(tab => (
          <button
            key={tab.value}
            onClick={() => { setFilter(tab.value); track('filter_tab', { tab: tab.value }) }}
            className="px-4 py-2 rounded-lg text-xs cinzel tracking-widest font-semibold transition-all duration-200 flex items-center gap-2"
            style={{
              background: filter === tab.value ? 'var(--oshun-p)' : 'var(--surface)',
              color: filter === tab.value ? '#080808' : 'var(--muted)',
              border: filter === tab.value ? '1px solid var(--oshun-p)' : '1px solid var(--border)',
            }}
          >
            {tab.label.toUpperCase()}
            <span
              className="text-xs rounded-full px-1.5 py-0.5 font-mono"
              style={{
                background: filter === tab.value ? 'rgba(0,0,0,0.25)' : 'var(--surface2)',
                color: filter === tab.value ? '#080808' : 'var(--muted)',
              }}
            >
              {counts[tab.value]}
            </span>
          </button>
        ))}
      </div>

      {/* Results count */}
      {search && (
        <p className="text-center text-xs mb-6" style={{ color: 'var(--muted)' }}>
          {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
        </p>
      )}

      {/* Grid — grouped when All, flat otherwise */}
      {groups ? (
        <div className="space-y-16">
          {groups.map(({ cat, projects }) => (
            <div key={cat} id={cat === 'pipeline' ? 'pipelines' : cat + 's'}>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="cinzel text-lg font-bold tracking-widest" style={{ color: 'var(--oshun-s)' }}>
                  {SECTION_LABELS[cat].toUpperCase()}
                </h3>
                <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
                <span className="text-xs cinzel" style={{ color: 'var(--muted)' }}>{projects.length}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((p, i) => (
                  <ProjectCard key={p.id} project={p} onClick={handleCardClick} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} onClick={handleCardClick} index={i} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16" style={{ color: 'var(--muted)' }}>
              <div className="text-4xl mb-3">🔍</div>
              <p className="cinzel text-sm tracking-widest">NO MATCHES — TRY A DIFFERENT SEARCH</p>
            </div>
          )}
        </div>
      )}

      {/* Project Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const colors = ORISHA_COLORS[project.orisha]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 relative"
        style={{ background: 'var(--surface)', border: `1px solid ${colors.primary}` }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)` }} />

        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors"
          style={{ background: 'var(--surface2)', color: 'var(--muted)' }}>✕</button>

        {/* Header */}
        <div className="mb-4 pr-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs cinzel tracking-widest px-2 py-0.5 rounded"
              style={{ background: colors.glow, color: colors.secondary, border: `1px solid ${colors.primary}` }}>
              {project.category.toUpperCase()}
            </span>
            {project.featured && <span className="text-xs cinzel tracking-widest px-2 py-0.5 rounded"
              style={{ background: colors.primary, color: '#fff' }}>FEATURED</span>}
          </div>
          <h2 className="cinzel text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>{project.title}</h2>
          <p className="text-sm" style={{ color: colors.secondary }}>{project.tagline}</p>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--muted)' }}>{project.description}</p>

        {/* Flow steps */}
        {project.flowSteps && (
          <div className="mb-5">
            <div className="text-xs cinzel tracking-widest mb-3" style={{ color: 'var(--muted)' }}>HOW IT WORKS</div>
            <div className="flex flex-wrap gap-2">
              {project.flowSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border)' }}>
                  <span>{step.icon}</span>
                  <span style={{ color: 'var(--text)' }}>{step.label}</span>
                  {i < (project.flowSteps?.length ?? 0) - 1 && <span style={{ color: 'var(--muted)' }}>→</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech stack */}
        <div className="mb-5">
          <div className="text-xs cinzel tracking-widest mb-2" style={{ color: 'var(--muted)' }}>TECH STACK</div>
          <div className="flex flex-wrap gap-2">
            {project.tech.map(t => (
              <span key={t} className="text-xs px-2 py-1 rounded"
                style={{ background: 'var(--surface2)', color: 'var(--muted)', border: '1px solid var(--border)' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex gap-3 flex-wrap">
          {project.liveUrl && project.liveUrl !== '#' && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg text-sm cinzel tracking-widest font-semibold transition-all"
              style={{ background: `linear-gradient(135deg,${colors.primary},${colors.secondary})`, color: '#080808' }}>
              VIEW LIVE →
            </a>
          )}
          <a href={`mailto:techsupport@nyctailblazers.com?subject=Inquiry%20about%20${encodeURIComponent(project.title)}`}
            className="px-5 py-2.5 rounded-lg text-sm cinzel tracking-widest transition-all"
            style={{ background: 'var(--surface2)', color: 'var(--text)', border: '1px solid var(--border)' }}>
            REQUEST SIMILAR
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}
