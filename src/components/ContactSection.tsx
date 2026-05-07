// <!-- Elegba opens the gate to opportunity -->
import { motion } from 'framer-motion'

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto"
      >
        <p className="text-xs cinzel tracking-widest mb-3" style={{ color: 'var(--oshun-p)' }}>READY TO BUILD?</p>
        <h2 className="cinzel text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text)' }}>
          LET&apos;S WORK TOGETHER
        </h2>
        <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>
          Whether you need a premium website, an AI system, or a complete digital transformation — let&apos;s talk about what&apos;s possible.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:techsupport@nyctailblazers.com"
            className="px-8 py-3 rounded-lg text-sm cinzel tracking-widest font-semibold transition-all duration-200"
            style={{ background: 'linear-gradient(135deg,var(--oshun-p),var(--oshun-s))', color: '#080808' }}
          >
            SEND AN EMAIL
          </a>
          <a
            href="https://nyctailblazers.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-lg text-sm cinzel tracking-widest transition-all duration-200"
            style={{ background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' }}
          >
            VISIT NYC TAILBLAZERS
          </a>
        </div>
      </motion.div>
    </section>
  )
}
