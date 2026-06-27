import './Adoption.css'

const PHASES = [
  { n: 1, title: 'Foundation', items: 'Registration · Taxpayer accounting · Returns · Payments' },
  { n: 2, title: 'Compliance core', items: 'Risk · Audit · Debt' },
  { n: 3, title: 'Experience & fairness', items: 'Services · Refunds · Appeals' },
  { n: 4, title: 'Performance & optimisation', items: 'Analytics · Continuous improvement' },
]

export default function Adoption() {
  return (
    <section className="adoption" id="adoption">
      <p className="eyebrow eyebrow--green">How adoption works</p>
      <h2 className="adoption__h2">
        Value in months. Start where it matters.<br />Add the rest later.
      </h2>
      <div className="adoption__grid">
        {PHASES.map(({ n, title, items }) => (
          <div key={n} className="adoption__phase">
            <span className="adoption__num">{n}</span>
            <h3 className="adoption__phase-title">{title}</h3>
            <p className="adoption__phase-items">{items}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
