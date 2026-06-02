import Nav from './components/Nav'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Approach from './components/Approach'
import Capabilities from './components/Capabilities'
import Maturity from './components/Maturity'
import WhyItMatters from './components/WhyItMatters'
import CtaSection from './components/CtaSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Approach />
        <Capabilities />
        <Maturity />
        <WhyItMatters />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
