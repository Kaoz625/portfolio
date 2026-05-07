import { Helmet } from 'react-helmet-async'
import Nav from './components/Nav'
import Hero from './components/Hero'
import CinematicScroll from './components/CinematicScroll'
import AboutSection from './components/AboutSection'
import ProcessSection from './components/ProcessSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import { PROJECTS } from './data/projects'

const WEBSITES  = PROJECTS.filter(p => p.category === 'website')
const APPS      = PROJECTS.filter(p => p.category === 'app' || p.category === 'pipeline')

export default function App() {
  return (
    <>
      {/* <!-- Elegba opens the way --> */}
      <Helmet>
        <title>Mark Anthony — Cinematic Websites & AI Systems | NYC</title>
        <meta name="description" content="Full-stack developer, AI systems engineer, and Dog Walker/Trainer/Breeder. Premium websites, mobile apps, and intelligent pipelines built in NYC." />
        <meta property="og:title" content="Mark Anthony — Portfolio" />
        <meta property="og:description" content="Cinematic websites. Intelligent systems. Built in NYC." />
        <meta property="og:url" content="https://portfolio.nyctailblazers.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://portfolio.nyctailblazers.com" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Mark Anthony',
          jobTitle: 'Full-Stack Developer & AI Systems Engineer',
          url: 'https://portfolio.nyctailblazers.com',
          worksFor: { '@type': 'Organization', name: 'NYC Tailblazers' },
          sameAs: ['https://nyctailblazers.com'],
        })}</script>
      </Helmet>

      <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        <Nav />
        <main>
          <Hero />
          <CinematicScroll
            projects={WEBSITES}
            sectionTitle="WEBSITES"
            sectionLabel="CLIENT WORK"
          />
          <CinematicScroll
            projects={APPS}
            sectionTitle="SYSTEMS"
            sectionLabel="APPS & PIPELINES"
          />
          <AboutSection />
          <ProcessSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  )
}
