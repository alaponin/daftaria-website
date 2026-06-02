import './Capabilities.css'

const CAPS = [
  { icon: '🪪', title: 'Registration',           desc: 'Taxpayer identity, one register, all channels',             variant: 'default' },
  { icon: '📄', title: 'Filing & Returns',        desc: 'Multi-tax, multi-channel, configurable forms',              variant: 'green'   },
  { icon: '💳', title: 'Payments',               desc: 'Allocation, reconciliation, real-time posting',             variant: 'green'   },
  { icon: '📊', title: 'Taxpayer Accounting',    desc: 'Single ledger, financial source of truth',                  variant: 'default' },
  { icon: '🔍', title: 'Risk Management',         desc: 'Configurable indicators, ML scoring, network analysis',     variant: 'orange'  },
  { icon: '🗂',  title: 'Audit Case Management',  desc: 'Risk-directed selection, full case lifecycle',              variant: 'orange'  },
  { icon: '📬', title: 'Debt Management',         desc: 'Prioritised collection, enforcement workflow',              variant: 'default' },
  { icon: '↩️', title: 'Refunds',                desc: 'Claim, verify, approve, disburse — segregated duties',      variant: 'green'   },
  { icon: '⚖️', title: 'Appeals',               desc: 'Independent dispute resolution, holds collection',           variant: 'default' },
  { icon: '🖥',  title: 'Taxpayer Services',      desc: 'Single front door across portal, mobile, counter',          variant: 'orange'  },
  { icon: '📈', title: 'Performance Management', desc: 'KPIs, dashboards, analytics, continuous improvement',       variant: 'default' },
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
        {CAPS.map(({ icon, title, desc, variant }, i) => (
          <div key={i} className={`cap-card cap-card--${variant}`}>
            <div className="cap-card__icon">{icon}</div>
            <h3 className="cap-card__title">{title}</h3>
            <p className="cap-card__desc">{desc}</p>
          </div>
        ))}
        <div className="cap-card cap-card--empty" aria-hidden="true" />
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
