import './WhyItMatters.css'

const AUDIENCES = [
  {
    role: 'For senior management',
    title: 'World-class capability at a fraction of the cost and risk',
    points: [
      'Value delivered in months, not years',
      'End to the 15–20 year replacement trap',
      'System grows with the administration and tracks the law',
      'No costly re-procurement as legislation changes',
    ],
  },
  {
    role: 'For IT / CIO leadership',
    title: 'A system a small team can genuinely own and evolve',
    points: [
      'Mature, vendor-supported platform — not orphaned bespoke code',
      'Minimal bespoke footprint; routine evolution performed in-house',
      'Standards-based: OCI containers, Kubernetes, BPMN 2.0, OpenAPI 3.0',
      'Full data and process portability in open formats',
      'Documented exit regime — no lock-in, ever',
    ],
  },
  {
    role: 'For technical advisers',
    title: 'Aligned to international good practice and reference architecture',
    points: [
      'Reference-architecture aligned (TARA) — five-domain model',
      'All twelve capabilities implemented and traceable to requirements',
      'GovStack building-block compatible, BPMN 2.0 and OpenAPI 3.0',
      'Single taxpayer account, risk-based compliance, independent appeals',
      'Conformance is demonstrable, not merely asserted',
    ],
  },
]

export default function WhyItMatters() {
  return (
    <section className="why" id="why">
      <p className="eyebrow eyebrow--muted">Why it matters</p>
      <h2 className="why__h2">
        The right answer<br />for every stakeholder.
      </h2>
      <p className="s-sub">
        Daftaria is built to answer the concerns of every decision-maker in the room — not just one.
      </p>
      <div className="why__grid">
        {AUDIENCES.map(({ role, title, points }, i) => (
          <div key={i} className="why__card">
            <p className="why__role">{role}</p>
            <h3 className="why__card-title">{title}</h3>
            <ul className="why__list">
              {points.map((point, j) => (
                <li key={j}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
