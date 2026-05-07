// <!-- Oshun blesses the work, Orunmila guides the hand -->
import { motion } from 'framer-motion'
import type { Project } from '../data/projects'
import { ORISHA_COLORS } from '../data/projects'
import { useAttention } from '../hooks/useAttention'
import { track } from '../lib/posthog'

const CATEGORY_LABELS: Record<string, string> = {
  website: 'WEBSITE',
  app: 'APP',
  pipeline: 'PIPELINE',
  tool: 'TOOL',
}

const CATEGORY_ICONS: Record<string, string> = {
  website: '🌐',
  app: '📱',
  pipeline: '⚡',
  tool: '🔧',
}

interface Props {
  project: Project
  onClick: (p: Project) => void
  index: number
}

export default function ProjectCard({ project, onClick, index }: Props) {
  const ref = useAttention(project.id)
  const colors = ORISHA_COLORS[project.orisha]

  function handleClick() {
    track('project_card_click', { project_id: project.id, category: project.category })
    onClick(project)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      onClick={handleClick}
      className="card-hover cursor-pointer rounded-xl overflow-hidden group relative"
      style={{
        background: 'var(--surface)',
        border: `1px solid ${colors.glow.replace('0.35', '0.15')}`,
      }}
      whileHover={{ borderColor: colors.primary }}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && handleClick()}
      aria-label={`View ${project.title}`}
    >
      {/* Orisha glow accent — top edge */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300 group-hover:opacity-100 opacity-50"
        style={{ background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)` }}
      />

      {/* Screenshot / placeholder */}
      <div
        className="relative overflow-hidden"
        style={{ height: 180, background: `linear-gradient(135deg, var(--surface2), ${colors.glow})` }}
      >
        {project.screenshot ? (
          <img
            src={project.screenshot}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-2 opacity-60 group-hover:opacity-100 transition-opacity">
                {CATEGORY_ICONS[project.category]}
              </div>
              <div
                className="cinzel text-xs tracking-widest font-semibold"
                style={{ color: colors.secondary }}
              >
                {project.title.toUpperCase()}
              </div>
            </div>
          </div>
        )}

        {/* Featured badge */}
        {project.featured && (
          <div
            className="absolute top-3 right-3 px-2 py-0.5 rounded text-xs cinzel font-bold tracking-wider"
            style={{ background: colors.primary, color: '#fff' }}
          >
            FEATURED
          </div>
        )}

        {/* Category badge */}
        <div
          className="absolute top-3 left-3 px-2 py-0.5 rounded text-xs cinzel tracking-wider"
          style={{ background: 'rgba(0,0,0,0.7)', color: colors.secondary, border: `1px solid ${colors.glow}` }}
        >
          {CATEGORY_LABELS[project.category]}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="cinzel font-bold text-base mb-1 group-hover:text-gold transition-colors duration-200"
          style={{ color: 'var(--text)' }}
        >
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: 'var(--muted)' }}>
          {project.tagline}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 3).map(t => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded"
              style={{ background: 'var(--surface2)', color: 'var(--muted)', border: '1px solid var(--border)' }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-xs px-2 py-0.5 rounded" style={{ color: 'var(--muted)' }}>
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        {/* CTA row */}
        <div className="flex items-center justify-between">
          <span
            className="text-xs cinzel tracking-widest font-semibold transition-colors duration-200"
            style={{ color: colors.secondary }}
          >
            VIEW DETAILS →
          </span>
          {project.liveUrl && (
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={{ background: `${colors.glow}`, color: colors.secondary, border: `1px solid ${colors.primary}` }}
            >
              LIVE
            </span>
          )}
        </div>
      </div>

      {/* Bottom Orisha glow on hover */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: `0 0 30px ${colors.glow}, inset 0 0 30px ${colors.glow.replace('0.35', '0.05')}` }}
      />
    </motion.div>
  )
}
