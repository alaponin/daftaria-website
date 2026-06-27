import Nav from './components/Nav'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Maturity from './components/Maturity'
import Approach from './components/Approach'
import Capabilities from './components/Capabilities'
import TaxpayerExperience from './components/TaxpayerExperience'
import Sovereignty from './components/Sovereignty'
import Proof from './components/Proof'
import Founder from './components/Founder'
import Adoption from './components/Adoption'
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
        <Maturity />
        <Approach />
        <Capabilities />
        <TaxpayerExperience />
        <Sovereignty />
        <Proof />
        <Founder />
        <Adoption />
        <WhyItMatters />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
