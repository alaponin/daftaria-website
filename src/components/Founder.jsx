import './Founder.css'

const CHIPS = [
  'Deputy Director General, Estonian National Tax Board — built e-Tax & risk-based audit',
  'IMF Fiscal Affairs expert since 2014',
  'Trained TADAT Assessor',
  'Co-author, GovStack PAERA & Workflow building block',
  'Lead Architect, ARMS for Moldova (current)',
  'Chief Solution Architect, Nortal',
]

export default function Founder() {
  return (
    <section className="founder" id="team">
      <div className="founder__inner">
        <img className="founder__portrait" src="/aare-laponin.jpg" alt="Aare Lapõnin" />
        <div className="founder__body">
          <p className="eyebrow eyebrow--green">The experience behind Daftaria</p>
          <h2 className="founder__h2">Built by people who have sat on your side of the desk.</h2>
          <p className="founder__lead">
            Daftaria is led by Aare Lapõnin — 30+ years building revenue and risk systems for
            governments, from inside a tax administration, inside the IMF, and as an author of the
            standards this market is procured against.
          </p>
          <div className="founder__chips">
            {CHIPS.map((c) => <span key={c} className="founder__chip">{c}</span>)}
          </div>
        </div>
      </div>
    </section>
  )
}
