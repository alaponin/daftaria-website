import { Fragment } from 'react'
import './Maturity.css'

const ARCHETYPES = [
  {
    step: 'Archetype 1',
    title: 'Foundational / Assisted',
    body: 'Counter and portal channels, simpler processing, basic integration. For administrations beginning the digital journey or operating with constrained connectivity.',
    barWidth: '38%',
    highlight: false,
  },
  {
    step: 'Archetype 2',
    title: 'Digital / Integrated',
    body: 'Full multi-channel self-service, automated processing and risk integration, real-time posting and reconciliation, registry and bank integration.',
    barWidth: '78%',
    highlight: true,
  },
  {
    step: 'Archetype 3',
    title: 'Constrained / Decentralised',
    body: 'Counter, help-desk and basic portal with offline support across distributed offices, multi-language. For capacity-constrained or geographically dispersed administrations.',
    barWidth: '28%',
    highlight: false,
  },
]

export default function Maturity() {
  return (
    <section className="maturity" id="maturity">
      <p className="eyebrow eyebrow--green">Any administration, any stage</p>
      <h2 className="maturity__h2">
        One solution across<br />the maturity gradient.
      </h2>
      <p className="s-sub s-sub--light">
        No two administrations are alike. Daftaria meets this not with different products but with
        configuration. The same functional core, tuned to where you are — and ready to grow without
        replacing software.
      </p>
      <div className="maturity__track">
        {ARCHETYPES.map(({ step, title, body, barWidth, highlight }, i) => (
          <Fragment key={step}>
            <div className={`maturity__card${highlight ? ' maturity__card--highlight' : ''}`}>
              <p className="maturity__card-step">{step}</p>
              <h3 className="maturity__card-title">{title}</h3>
              <p className="maturity__card-body">{body}</p>
              <div className="maturity__bar-track">
                <div className="maturity__bar" style={{ width: barWidth }} />
              </div>
            </div>
            {i < ARCHETYPES.length - 1 && (
              <div className="maturity__arrow" aria-hidden="true">→</div>
            )}
          </Fragment>
        ))}
      </div>
      <p className="maturity__footnote">
        <strong>One codebase</strong> · No fork · Advance by configuration, not replacement
      </p>
    </section>
  )
}
