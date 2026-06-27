import './Proof.css'

const POINTS = [
  { title: 'Live in production', body: 'The ARMS risk engine is already running in production at a national tax administration.' },
  { title: 'The standards funders use', body: 'Aligned to TADAT and OECD Tax Administration 3.0 — the frameworks the World Bank and IMF assess against.' },
  { title: 'Open by design', body: 'GovStack and open-standards conformance — demonstrable, not merely asserted.' },
]

export default function Proof() {
  return (
    <section className="proof" id="proof">
      <p className="eyebrow eyebrow--green">Proven, not promised</p>
      <h2 className="proof__h2">Credibility you can check.</h2>
      <div className="proof__grid">
        {POINTS.map(({ title, body }) => (
          <div key={title} className="proof__card">
            <h3 className="proof__card-title">{title}</h3>
            <p className="proof__card-body">{body}</p>
          </div>
        ))}
      </div>
      <p className="proof__wordmarks">TADAT · OECD TA 3.0 · GovStack</p>
    </section>
  )
}
