import { FileText, Wallet, ShieldCheck, Scale } from 'lucide-react'
import './Capabilities.css'

const BUCKETS = [
  { Icon: FileText,    title: 'Identify & declare', items: 'Registration · Returns' },
  { Icon: Wallet,      title: 'Account & collect',  items: 'Taxpayer accounting · Payments · Refunds' },
  { Icon: ShieldCheck, title: 'Verify & enforce',   items: 'Risk · Audit · Debt' },
  { Icon: Scale,       title: 'Resolve & steer',    items: 'Appeals · Performance' },
]

export default function Capabilities() {
  return (
    <section className="capabilities" id="capabilities">
      <p className="eyebrow eyebrow--green">Complete coverage</p>
      <h2 className="capabilities__h2">
        Everything a tax administration does.<br />One integrated suite.
      </h2>
      <p className="s-sub">
        Eleven capabilities, grouped the way administrations actually work — and all of them on one
        taxpayer identity, one account, one front door.
      </p>
      <div className="capabilities__grid">
        {BUCKETS.map(({ Icon, title, items }) => (
          <div key={title} className="cap-bucket">
            <div className="cap-bucket__icon"><Icon size={22} strokeWidth={1.5} /></div>
            <h3 className="cap-bucket__title">{title}</h3>
            <p className="cap-bucket__items">{items}</p>
          </div>
        ))}
      </div>
      <p className="capabilities__spine">
        One taxpayer identity · One account · One front door
      </p>
    </section>
  )
}
