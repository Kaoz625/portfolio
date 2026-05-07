// <!-- Orunmila guides the path -->
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Websites', href: '#websites' },
    { label: 'Apps', href: '#apps' },
    { label: 'Pipelines', href: '#pipelines' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(200,144,10,0.15)' : 'none',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + wordmark */}
        <a href="#" className="flex items-center gap-3 group">
          <Logo size={36} />
          <div>
            <div className="cinzel font-bold text-sm tracking-widest text-gold">NYC TAILBLAZERS</div>
            <div className="text-xs tracking-wider" style={{ color: 'var(--muted)' }}>MARKUS USCHE</div>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm tracking-widest cinzel transition-colors duration-200"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--oshun-s)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {l.label.toUpperCase()}
            </a>
          ))}
          <a
            href="mailto:techsupport@nyctailblazers.com"
            className="px-5 py-2 text-sm cinzel tracking-widest font-semibold rounded transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg,var(--oshun-p),var(--oshun-s))',
              color: '#080808',
            }}
          >
            HIRE ME
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          {[0,1,2].map(i => (
            <span
              key={i}
              className="block w-6 h-0.5 transition-all duration-300"
              style={{ background: 'var(--oshun-s)' }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(8,8,8,0.97)', borderBottom: '1px solid var(--border)' }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  className="cinzel text-sm tracking-widest py-2"
                  style={{ color: 'var(--text)' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label.toUpperCase()}
                </a>
              ))}
              <a
                href="mailto:techsupport@nyctailblazers.com"
                className="text-center px-5 py-2 text-sm cinzel tracking-widest font-semibold rounded"
                style={{ background: 'linear-gradient(135deg,var(--oshun-p),var(--oshun-s))', color: '#080808' }}
              >
                HIRE ME
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
