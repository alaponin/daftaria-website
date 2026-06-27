import { Fragment } from 'react'
import './Maturity.css'

const STAGES = [
  {
    step: 'Stage 1',
    title: 'Putting paper on computers',
    kicker: 'Digitization',
    body: 'Scanned forms, electronic filing, digital ledgers. Necessary — but a scanned bad form is still a bad form.',
    here: false,
  },
  {
    step: 'Stage 2',
    title: 'Automating the old way of working',
    kicker: 'Digitalization — the ceiling',
    body: 'A big integrated system speeds up existing processes, then hits a wall: every change re-tests everything, costs climb each year, and in 15–20 years it is replaced wholesale.',
    here: true,
  },
  {
    step: 'Stage 3',
    title: 'Tax built for a digital society',
    kicker: 'Transformation',
    body: "Data flows from taxpayers' own accounting and banking systems; compliance is designed-in, not enforced; risk is data-driven. The direction the OECD calls Tax Administration 3.0.",
    here: false,
  },
]

export default function Maturity() {
  return (
    <section className="maturity" id="maturity">
      <p className="eyebrow eyebrow--green">The path every administration is on</p>
      <h2 className="maturity__h2">
        Three stages of digital maturity.<br />Most are stuck on the second.
      </h2>
      <p className="s-sub">
        Daftaria lets you operate at your stage today and climb the ladder by configuration —
        not by buying a new system every generation.
      </p>
      <div className="maturity__track">
        {STAGES.map(({ step, title, kicker, body, here }, i) => (
          <Fragment key={step}>
            <div className={`maturity__card${here ? ' maturity__card--here' : ''}`}>
              {here && <span className="maturity__here">Most administrations are here</span>}
              <p className="maturity__card-step">{step}</p>
              <h3 className="maturity__card-title">{title}</h3>
              <p className="maturity__card-kicker">{kicker}</p>
              <p className="maturity__card-body">{body}</p>
            </div>
            {i < STAGES.length - 1 && (
              <div className="maturity__arrow" aria-hidden="true">→</div>
            )}
          </Fragment>
        ))}
      </div>
      <p className="maturity__footnote">
        <strong>Operate at your level today.</strong> Climb the ladder by configuration, not by re-buying.
      </p>
    </section>
  )
}
