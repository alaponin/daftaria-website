import { TrendingUp, Lock, RefreshCw, PuzzleIcon } from 'lucide-react'
import './Problem.css'

const PROBLEMS = [
  {
    Icon: TrendingUp,
    title: 'Change keeps getting more expensive',
    body: 'Every new rule means re-testing the whole system. ',
    accent: 'The cost and risk of change rise every single year.',
  },
  {
    Icon: Lock,
    title: "Your data isn't really yours",
    body: 'Locked to one vendor and proprietary formats, ',
    accent: 'you cannot get your own data and processes out.',
  },
  {
    Icon: RefreshCw,
    title: 'Rebuilt every 15–20 years',
    body: 'The system grows too complex to change and must be torn out wholesale — ',
    accent: 'a high-risk, capital-intensive event, every generation.',
  },
  {
    Icon: PuzzleIcon,
    title: 'Built for someone else',
    body: 'Designed for big, rich administrations, it makes you ',
    accent: 'pay for complexity you cannot use and miss the simplicity you need.',
  },
]

export default function Problem() {
  return (
    <section className="problem" id="problem">
      <p className="eyebrow eyebrow--green">Where you are now</p>
      <h2 className="problem__h2">
        The ground is shifting<br />under the old model.
      </h2>
      <p className="s-sub">
        Most administrations run a single, monolithic system where every capability is woven
        together. It delivers value — until it hits a structural ceiling.
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
