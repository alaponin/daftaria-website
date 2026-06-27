import './CtaSection.css'

export default function CtaSection() {
  return (
    <section className="cta-section">
      <h2 className="cta-section__h2">
        Ready for a tax administration<br />
        you can <em>own</em>?
      </h2>
      <p className="s-sub s-sub--light">
        Request a briefing, or read the whitepaper to share with your colleagues and technical advisers.
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
