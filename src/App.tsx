import { Helmet } from 'react-helmet-async'
import Nav from './components/Nav'
import Hero from './components/Hero'
import FeaturedWork from './components/FeaturedWork'
import ProjectGrid from './components/ProjectGrid'
import AboutSection from './components/AboutSection'
import ProcessSection from './components/ProcessSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      {/* <!-- Elegba opens the way --> */}
      <Helmet>
        <title>Markus Usche — Cinematic Websites & AI Systems | NYC</title>
        <meta name="description" content="Full-stack developer and AI systems engineer. Premium websites, mobile apps, and intelligent pipelines built in NYC." />
        <meta property="og:title" content="Markus Usche — Portfolio" />
        <meta property="og:description" content="Cinematic websites. Intelligent systems. Built in NYC." />
        <meta property="og:url" content="https://portfolio.nyctailblazers.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://portfolio.nyctailblazers.com" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Markus Usche',
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
          <FeaturedWork />
          <ProjectGrid />
          <AboutSection />
          <ProcessSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  )
}
