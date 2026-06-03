import {
  UserCheck, FileText, CreditCard, BookOpen,
  AlertTriangle, ClipboardList, TrendingDown,
  Undo2, Scale, Monitor, TrendingUp,
} from 'lucide-react'
import './Capabilities.css'

const CAPS = [
  { Icon: UserCheck,     title: 'Registration',           desc: 'Taxpayer identity, one register, all channels' },
  { Icon: FileText,      title: 'Filing & Returns',        desc: 'Multi-tax, multi-channel, configurable forms' },
  { Icon: CreditCard,    title: 'Payments',                desc: 'Allocation, reconciliation, real-time posting' },
  { Icon: BookOpen,      title: 'Taxpayer Accounting',     desc: 'Single ledger, financial source of truth' },
  { Icon: AlertTriangle, title: 'Risk Management',         desc: 'Configurable indicators, ML scoring, network analysis' },
  { Icon: ClipboardList, title: 'Audit Case Management',   desc: 'Risk-directed selection, full case lifecycle' },
  { Icon: TrendingDown,  title: 'Debt Management',         desc: 'Prioritised collection, enforcement workflow' },
  { Icon: Undo2,         title: 'Refunds',                 desc: 'Claim, verify, approve, disburse — segregated duties' },
  { Icon: Scale,         title: 'Appeals',                 desc: 'Independent dispute resolution, holds collection' },
  { Icon: Monitor,       title: 'Taxpayer Services',       desc: 'Single front door across portal, mobile, counter' },
  { Icon: TrendingUp,    title: 'Performance Management',  desc: 'KPIs, dashboards, analytics, continuous improvement' },
]

export default function Capabilities() {
  return (
    <section className="capabilities" id="capabilities">
      <p className="eyebrow eyebrow--muted">Complete coverage</p>
      <h2 className="capabilities__h2">
        One integrated suite.<br />Eleven capabilities.
      </h2>
      <p className="s-sub">
        Every tax the administration levies — corporate and personal income, VAT/GST, withholding,
        excise, property — configured on the same engine. Tax-type-neutral by design.
      </p>
      <div className="capabilities__grid">
        {CAPS.map(({ Icon, title, desc }) => (
          <div key={title} className="cap-card">
            <div className="cap-card__icon">
              <Icon size={20} strokeWidth={1.5} />
            </div>
            <h3 className="cap-card__title">{title}</h3>
            <p className="cap-card__desc">{desc}</p>
          </div>
        ))}
        <div className="cap-card cap-card--summary">
          <span className="cap-card__summary-n">11</span>
          <span className="cap-card__summary-label">One engine.<br />Every capability.</span>
        </div>
      </div>
      <div className="capabilities__spine">
        <span className="capabilities__spine-label">Shared backbone →</span>
        <span className="capabilities__spine-desc">
          One taxpayer identity · One account ledger · One integration layer ·
          One security &amp; audit framework · One configuration model
        </span>
      </div>
    </section>
  )
}
