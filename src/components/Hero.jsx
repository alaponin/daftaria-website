import './Hero.css'

const STATS = [
  { n: '11', label: 'Integrated capabilities' },
  { n: '1',  label: 'Codebase, all deployments' },
  { n: '0',  label: 'Vendor lock-in' },
]

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__content">
        <p className="eyebrow eyebrow--green">The Configurable Tax Administration Suite</p>
        <h1 className="hero__h1">
          Modern revenue administration,<br />
          for <em>every</em> administration.
        </h1>
        <p className="hero__sub">
          One integrated, configurable platform that runs the entire revenue lifecycle —
          registration, filing, payment, audit, debt, appeals — configured, not coded.
          Built on Joget DX9.
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
          <a href="/whitepaper.pdf" className="btn-ghost" target="_blank" rel="noopener noreferrer">
            Read the whitepaper →
          </a>
        </div>
      </div>
      <div className="hero__stats">
        {STATS.map(({ n, label }) => (
          <div key={label} className="hero__stat">
            <span className="hero__stat-n">{n}</span>
            <span className="hero__stat-l">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
