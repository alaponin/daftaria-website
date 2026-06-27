import './TaxpayerExperience.css'

const CHANNELS = ['Portal', 'Mobile', 'Call centre', 'Counter']

export default function TaxpayerExperience() {
  return (
    <section className="taxexp" id="experience">
      <p className="eyebrow eyebrow--green">The taxpayer experience</p>
      <h2 className="taxexp__h2">One front door. Every channel.</h2>
      <p className="s-sub">
        Portal, mobile, call centre, counter — one consistent experience, backed by one taxpayer
        account. Self-service first, assisted always. Your taxpayers get a modern experience; your
        staff get one system to serve them with.
      </p>
      <div className="taxexp__channels">
        {CHANNELS.map((c) => <span key={c} className="taxexp__chip">{c}</span>)}
      </div>
    </section>
  )
}
