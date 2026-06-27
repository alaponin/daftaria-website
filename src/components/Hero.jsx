import './Hero.css'

const PROPS = [
  { word: 'Own it',    gloss: 'Your data, your rules, your exit.' },
  { word: 'Afford it', gloss: 'A small team can sustain it — no consultant dependency.' },
  { word: 'Evolve it', gloss: 'Climb the maturity ladder by configuration, not by re-buying.' },
]

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__content">
        <p className="eyebrow eyebrow--green">Daftar · register · ledger · office</p>
        <h1 className="hero__h1">
          A complete, modern tax administration<br />
          you can <em>own</em> and <em>afford</em>.
        </h1>
        <p className="hero__sub">
          Configured to your laws — not coded from scratch. One integrated system for the whole
          revenue lifecycle, that your own team runs and grows.
        </p>
        <div className="hero__ctas">
          <a
            href="https://fiscaladmin.com/contact"
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a briefing
          </a>
          <a href="/whitepaper.pdf" className="btn-ghost btn-ghost--dark" target="_blank" rel="noopener noreferrer">
            Read the whitepaper →
          </a>
        </div>
      </div>
      <div className="hero__props">
        {PROPS.map(({ word, gloss }) => (
          <div key={word} className="hero__prop">
            <span className="hero__prop-word">{word}</span>
            <span className="hero__prop-gloss">{gloss}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
