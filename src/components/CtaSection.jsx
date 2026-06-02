import './CtaSection.css'

export default function CtaSection() {
  return (
    <section className="cta-section">
      <h2 className="cta-section__h2">
        Ready to make tax administration<br />
        <em>work for every administration?</em>
      </h2>
      <p className="cta-section__sub">
        Request a briefing with the FiscalAdmin team — or download the full whitepaper
        to share with your colleagues and technical advisers.
      </p>
      <div className="cta-section__buttons">
        <a
          href="https://fiscaladmin.com/contact"
          className="btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Request a briefing
        </a>
        <a href="/whitepaper.pdf" className="btn-ghost" target="_blank" rel="noopener noreferrer">
          Download whitepaper
        </a>
      </div>
    </section>
  )
}
