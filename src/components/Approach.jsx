import './Approach.css'

const CARDS = [
  {
    tag: '⊗ Build',
    tagClass: 'approach__tag--build',
    title: 'Bespoke development',
    body: 'Reserved for genuinely differentiating capabilities with no configurable alternative. High cost, high risk, high maintenance burden. Avoid for the well-understood common functions of tax administration.',
    highlight: false,
    badge: null,
  },
  {
    tag: '◎ Buy',
    tagClass: 'approach__tag--buy',
    title: 'Off-the-shelf purchase',
    body: 'Suitable for true commodities. But monolithic ITAS products force one-size-fits-none at scale and create the very lock-in problem that administrations need to escape.',
    highlight: false,
    badge: null,
  },
  {
    tag: '✦ Configure — Daftaria\'s path',
    tagClass: 'approach__tag--config',
    title: 'Configuration on a mature platform',
    body: 'Tax types, forms, rules, workflows, channels, deadlines — all configuration parameters. A new tax or a whole new country profile is a parameter change, not a software release.',
    highlight: true,
    badge: 'Lowest risk · lowest TCO',
  },
]

export default function Approach() {
  return (
    <section className="approach" id="solution">
      <p className="eyebrow eyebrow--muted">A different approach</p>
      <h2 className="approach__h2">Configure, don't build.</h2>
      <p className="s-sub">
        For the well-understood functions of a tax administration, the right strategy is to configure
        a mature platform — not build bespoke software. Tax administration is, capability by
        capability, a well-understood domain.
      </p>
      <div className="approach__grid">
        {CARDS.map(({ tag, tagClass, title, body, highlight, badge }) => (
          <div
            key={title}
            className={`approach__card${highlight ? ' approach__card--highlight' : ''}`}
          >
            <span className={`approach__tag ${tagClass}`}>{tag}</span>
            <h3 className="approach__card-title">{title}</h3>
            <p className="approach__card-body">{body}</p>
            {badge && <span className="approach__badge">{badge}</span>}
          </div>
        ))}
      </div>
      <div className="approach__joget">
        <strong>Built on Joget DX9.</strong> A mature, commercially supported low-code platform
        with a substantial global customer base and an active product roadmap. The vendor's continued
        investment underwrites long-term viability — security patches, supported releases, and no
        orphaned bespoke code for the administration to maintain alone.
      </div>
    </section>
  )
}
