// <!-- Obatala's dove watches over — Blaze new trails, wag new tails -->
import Logo from './Logo'

export default function Footer() {
  return (
    <footer
      className="border-t py-10 px-6"
      style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Logo size={28} />
          <div>
            <div className="cinzel text-xs font-bold tracking-widest text-gold">NYC TAILBLAZERS</div>
            <div className="text-xs" style={{ color: 'var(--muted)' }}>Blaze new trails, wag new tails.</div>
          </div>
        </div>

        <div className="text-center text-xs" style={{ color: 'var(--muted)' }}>
          Analytics &amp; session recordings used to improve your experience.{' '}
          <a href="/privacy" className="underline" style={{ color: 'var(--muted)' }}>Privacy Policy</a>
        </div>

        <div className="text-xs" style={{ color: 'var(--muted)' }}>
          &copy; {new Date().getFullYear()} NYC Tailblazers
        </div>
      </div>
      {/* Obatala's dove — hidden watermark */}
      {/* 🕊️ */}
    </footer>
  )
}
