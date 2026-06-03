import { Link2, Lock, Clock, Sliders } from 'lucide-react'
import './Problem.css'

const PROBLEMS = [
  {
    Icon: Link2,
    title: 'Tight coupling',
    body: 'Because everything depends on everything, a change to one capability requires testing and re-validating the whole system. ',
    accent: 'The cost of change rises every year.',
  },
  {
    Icon: Lock,
    title: 'Vendor lock-in',
    body: 'Proprietary formats and a single supplier make the administration dependent. Data and processes are hard to extract. ',
    accent: 'Switching is costly and the administration is exposed.',
  },
  {
    Icon: Clock,
    title: '15–20 year replacement cycle',
    body: 'The monolith eventually becomes too complex to change and is replaced wholesale — ',
    accent: 'a disruptive, high-risk, capital-intensive event repeated every generation.',
  },
  {
    Icon: Sliders,
    title: 'One-size-fits-none',
    body: "A system built for one administration's size and maturity rarely fits another. ",
    accent: 'Smaller administrations pay for complexity they cannot use.',
  },
]

export default function Problem() {
  return (
    <section className="problem" id="problem">
      <p className="eyebrow eyebrow--green">Why revenue systems fail</p>
      <h2 className="problem__h2">
        The legacy trap is real.<br />And expensive.
      </h2>
      <p className="s-sub s-sub--light">
        Most tax administrations run a monolithic Integrated Tax Administration System in which every
        capability is tightly woven together. These systems deliver value — until they hit a structural ceiling.
      </p>
      <div className="problem__grid">
        {PROBLEMS.map(({ Icon, title, body, accent }) => (
          <div key={title} className="problem__card">
            <div className="problem__icon">
              <Icon size={28} strokeWidth={1.5} />
            </div>
            <h3 className="problem__card-title">{title}</h3>
            <p className="problem__card-body">
              {body}<span className="problem__accent">{accent}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
