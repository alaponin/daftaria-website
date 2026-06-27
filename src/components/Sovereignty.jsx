import './Sovereignty.css'

const PILLARS = [
  { title: 'Open data export', body: 'Your data exports in open, standard formats. Always.' },
  { title: 'Portable rules', body: "Your rules and workflows export as standard, portable files — not trapped in a vendor's black box." },
  { title: 'A documented exit', body: 'A real, documented way out — so the system can never become a trap.' },
]

export default function Sovereignty() {
  return (
    <section className="sov" id="sovereignty">
      <div className="sov__inner">
        <p className="eyebrow sov__eyebrow">Sustainable, and yours</p>
        <h2 className="sov__h2">Your data. Your rules. Your exit.</h2>
        <p className="sov__sub">
          Sovereignty isn&apos;t a feature you bolt on later. It is built in from the first day.
        </p>
        <div className="sov__grid">
          {PILLARS.map(({ title, body }) => (
            <div key={title} className="sov__card">
              <h3 className="sov__card-title">{title}</h3>
              <p className="sov__card-body">{body}</p>
            </div>
          ))}
        </div>
        <p className="sov__tagline">The freedom to evolve, and to leave, is built in.</p>
      </div>
    </section>
  )
}
