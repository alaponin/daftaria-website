import './Approach.css'

const BEFORE = ['Draft law', 'Vendor spec', 'Development', 'System-wide testing', 'Release', 'Months · budget · risk']
const AFTER = ['Draft law', 'Configure the rule', 'Test the change', 'Live — in days, by your team']

export default function Approach() {
  return (
    <section className="approach" id="solution">
      <p className="eyebrow eyebrow--green">The Daftaria difference</p>
      <div className="approach__layout">
        <div className="approach__copy">
          <h2 className="approach__h2">Configured, not coded.</h2>
          <p className="s-sub">
            A new tax, a changed rule, a new channel, a new language — these are configuration
            changes your own team makes, versioned and tested. Not a software release you wait and
            pay for. When policy is expressed as configuration, the administration changes its own
            system as the law changes, with no release cycle.
          </p>
          <blockquote className="approach__quote">
            &ldquo;When the law changes, the rule changes — the software doesn&apos;t.&rdquo;
          </blockquote>
        </div>
        <div className="approach__diagram">
          <div className="approach__flow approach__flow--before">
            <p className="approach__flow-label">The old way — a software release</p>
            <ol>
              {BEFORE.map((s) => <li key={s}>{s}</li>)}
            </ol>
          </div>
          <div className="approach__flow approach__flow--after">
            <p className="approach__flow-label">Daftaria — a configuration change</p>
            <ol>
              {AFTER.map((s) => <li key={s}>{s}</li>)}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
