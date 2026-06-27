import './WhyItMatters.css'

const AUDIENCES = [
  {
    role: 'For senior management',
    title: 'World-class capability, at a fraction of the cost and risk',
    points: [
      'Value delivered in months, not years',
      'No 15–20 year replacement trap',
      'The system grows with you and tracks the law',
      'No re-procurement when legislation changes',
    ],
  },
  {
    role: 'For IT / CIO leadership',
    title: 'A system a small team can genuinely own',
    points: [
      'A mature, supported foundation — not orphaned bespoke code',
      'Minimal bespoke footprint; routine changes done in-house',
      'Your data and processes stay portable, in open formats',
      'A documented exit — no lock-in, ever',
    ],
  },
  {
    role: 'For technical advisers',
    title: 'Aligned to international good practice',
    points: [
      'Aligned to TADAT and OECD Tax Administration 3.0',
      'GovStack building-block compatible',
      'Single taxpayer account, risk-based compliance, independent appeals',
      'Conformance you can demonstrate, not merely assert',
    ],
  },
]

export default function WhyItMatters() {
  return (
    <section className="why" id="why">
      <p className="eyebrow eyebrow--green">Why it matters</p>
      <h2 className="why__h2">
        The right answer<br />for every stakeholder.
      </h2>
      <p className="s-sub">
        Daftaria answers the concern of every decision-maker in the room — not just one.
      </p>
      <div className="why__grid">
        {AUDIENCES.map(({ role, title, points }) => (
          <div key={role} className="why__card">
            <p className="eyebrow eyebrow--muted">{role}</p>
            <h3 className="why__card-title">{title}</h3>
            <ul className="why__list">
              {points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
