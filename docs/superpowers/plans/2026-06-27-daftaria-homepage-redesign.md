# Daftaria Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the technically-framed Daftaria marketing homepage with a customer-value reframe — leading with the buyer's trap and the digital-maturity evolution story — in a calm, restrained treatment of the existing brand colors with serif display headlines.

**Architecture:** Single long-scroll React + Vite page. Each section is a standalone, props-free presentational component (`Component.jsx` + `Component.css`) composed in `App.jsx`. We rework 9 existing components, add 5 new ones, and reorder the page. No backend, no routing, no state.

**Tech Stack:** React 18, Vite 5, plain CSS (per-component files + shared tokens/utilities in `src/index.css`), `lucide-react` for line icons, Source Serif 4 (Google Fonts link) for headlines.

## Global Constraints

- **No visible technology names** in any rendered copy: no "Joget", "Kafka", "BPMN", "OpenAPI", "Kubernetes", "OCI", "metamodel", "medallion". Customer benefit carries every sentence; unavoidable technical facts go in a quiet parenthetical only.
- **No investor material**: no figures, ARR, pricing, or country-count targets anywhere.
- **No third-party / standards logos**: TADAT · OECD TA 3.0 · GovStack appear only as styled **text** wordmarks.
- **Brand colors, applied with restraint**: deep blue `#07295e` = authority/dark bands; green `#bdca42` = quiet accent only (markers, ticks, small rules — never large fills); orange `#ff8704` = primary CTA only; warm off-white `#f6f7f2` base, white cards.
- **Headlines & pull-quotes use the serif** (`var(--serif)`); body/UI stays system sans.
- **Primary CTA** → `https://fiscaladmin.com/contact` (external). **Whitepaper** → `/whitepaper.pdf` (local).
- **Verification is build + lint + visual, not TDD.** This is a static site with no business logic and no test framework; per the design spec, TDD does not apply. Every task's gate is: `npm run build` succeeds, `npm run lint` is clean, the copy-discipline grep is empty, and the section renders correctly at desktop and at ≤760px. Do **not** add a test framework.
- **Source documents** live in the parent `…/daftaria/resources` (outside this git repo) — never commit them.
- All section components are props-free default exports importing their own CSS, matching the existing pattern.

**Standard per-task verification commands** (referenced as "run the standard gate"):
```bash
npm run build          # expect: "✓ built in <time>" and no errors
npm run lint           # expect: no errors (warnings tolerated)
grep -rniE 'joget|kafka|bpmn|openapi|kubernetes|metamodel|medallion|\bOCI\b' src/   # expect: no matches
```
Then `npm run dev`, open the page, and visually confirm the section at a desktop width and at ≤760px (grids collapse to one column, no overflow).

**Final page order** (target state of `App.jsx`, locked here so every task knows its neighbors):
`Hero → Problem → Maturity → Approach → Capabilities → TaxpayerExperience → Sovereignty → Proof → Founder → Adoption → WhyItMatters → CtaSection`, wrapped by `Nav` (above `<main>`) and `Footer` (below).

---

## File Structure

**Modified:**
- `index.html` — title/description copy; add Source Serif 4 font link.
- `src/index.css` — add `--serif` token + serif headline defaults; keep existing tokens/utilities.
- `src/App.jsx` — final import set + section order.
- `src/components/Nav.jsx` — copy only (anchors already match section ids).
- `src/components/Hero.{jsx,css}` — rework.
- `src/components/Problem.{jsx,css}` — rework (copy + minor CSS).
- `src/components/Maturity.{jsx,css}` — rework into the 3-stage evolution ladder.
- `src/components/Approach.{jsx,css}` — rework into "Configured, not coded"; remove the platform-vendor block.
- `src/components/Capabilities.{jsx,css}` — rework from 11-card grid into 4 capability buckets.
- `src/components/WhyItMatters.jsx` — copy only (strip tech jargon).
- `src/components/CtaSection.jsx` — copy only.

**Created:**
- `src/components/TaxpayerExperience.{jsx,css}`
- `src/components/Sovereignty.{jsx,css}`
- `src/components/Proof.{jsx,css}`
- `src/components/Founder.{jsx,css}`
- `src/components/Adoption.{jsx,css}`
- `public/aare-laponin.jpg` — real portrait (user supplies; task uses a placeholder path and documents the swap).

New components are created but **not wired into `App.jsx`** until Task 14, so each interim build stays green. Reworked components are already imported, so reworking them keeps the build green throughout.

---

### Task 1: Visual foundation — serif font + tokens + page copy

**Files:**
- Modify: `index.html`
- Modify: `src/index.css:1-18` (tokens) and append serif defaults

**Interfaces:**
- Produces: CSS variable `--serif` and a global rule giving `h1, h2, h3, .display` the serif family. All later tasks rely on `var(--serif)` existing and on headings defaulting to serif.

- [ ] **Step 1: Add the Source Serif 4 font link to `index.html`**

Replace the `<head>` block's description/title and add the font link. New `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/FiscalAdmin-copy-v.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Daftaria — a complete, modern tax administration you can own and afford, configured to your laws, not coded from scratch." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&display=swap" rel="stylesheet" />
    <title>Daftaria — A tax administration you can own and afford</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Add the `--serif` token in `src/index.css`**

In the `:root` block (after `--on-dark-secondary`), add:

```css
  --serif: 'Source Serif 4', Georgia, 'Times New Roman', serif;
```

- [ ] **Step 3: Make headings default to the serif**

Immediately after the `body { … }` rule in `src/index.css`, add:

```css
/* ── Display headings ────────────────────────────────── */
h1, h2, h3, .display {
  font-family: var(--serif);
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: -0.01em;
  color: var(--text);
}
```

- [ ] **Step 4: Run the standard gate**

`npm run build` and `npm run lint` pass. Visually, headings now render in a serif. (Nothing else has changed yet.)

- [ ] **Step 5: Commit**

```bash
git add index.html src/index.css
git commit -m "feat(ui): add serif display font + tokens, reframe page meta"
```

---

### Task 2: Hero — the promise + Own/Afford/Evolve

**Files:**
- Modify: `src/components/Hero.jsx`
- Modify: `src/components/Hero.css`

**Interfaces:**
- Consumes: `.eyebrow`, `.btn-primary`, `.btn-ghost` (existing), `var(--serif)`.
- Produces: nothing other tasks depend on.

- [ ] **Step 1: Replace `src/components/Hero.jsx` entirely**

```jsx
import './Hero.css'

const PROPS = [
  { word: 'Own it',    gloss: 'Your data, your rules, your exit.' },
  { word: 'Afford it', gloss: 'A small team can sustain it — no consultant dependency.' },
  { word: 'Evolve it', gloss: 'Climb the maturity ladder by configuration, not by re-buying.' },
]

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__content">
        <p className="eyebrow eyebrow--green">Daftar · register · ledger · office</p>
        <h1 className="hero__h1">
          A complete, modern tax administration<br />
          you can <em>own</em> and <em>afford</em>.
        </h1>
        <p className="hero__sub">
          Configured to your laws — not coded from scratch. One integrated system for the whole
          revenue lifecycle, that your own team runs and grows.
        </p>
        <div className="hero__ctas">
          <a
            href="https://fiscaladmin.com/contact"
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a briefing
          </a>
          <a href="/whitepaper.pdf" className="btn-ghost btn-ghost--dark" target="_blank" rel="noopener noreferrer">
            Read the whitepaper →
          </a>
        </div>
      </div>
      <div className="hero__props">
        {PROPS.map(({ word, gloss }) => (
          <div key={word} className="hero__prop">
            <span className="hero__prop-word">{word}</span>
            <span className="hero__prop-gloss">{gloss}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Update `src/components/Hero.css`**

The hero previously sat on a dark background with a light ghost button. Keep the existing layout shell, but ensure: `.hero__h1` uses the serif and a large clamp size; `.hero__props` is a vertical stack (not stat columns); a `.btn-ghost--dark` variant gives the ghost button dark-on-light borders since the hero is now on the light base. Replace the contents of `Hero.css` with:

```css
.hero {
  max-width: 1080px;
  margin: 0 auto;
  padding: 88px 32px 72px;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 56px;
  align-items: center;
}
.hero__h1 {
  font-size: clamp(2.1rem, 4.4vw, 3.4rem);
  margin-bottom: 1.25rem;
}
.hero__h1 em {
  font-style: italic;
  color: var(--blue);
}
.hero__sub {
  font-size: 1.0625rem;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 56ch;
  margin-bottom: 2rem;
}
.hero__ctas { display: flex; gap: 14px; flex-wrap: wrap; }
.btn-ghost--dark {
  color: var(--blue);
  border-color: rgba(7, 41, 94, 0.3);
}
.btn-ghost--dark:hover {
  border-color: var(--blue);
  color: var(--blue);
}
.hero__props {
  display: flex;
  flex-direction: column;
  gap: 18px;
  border-left: 2px solid var(--green);
  padding-left: 22px;
}
.hero__prop { display: flex; flex-direction: column; gap: 3px; }
.hero__prop-word {
  font-family: var(--serif);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text);
}
.hero__prop-gloss { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; }

@media (max-width: 760px) {
  .hero { grid-template-columns: 1fr; padding: 56px 20px 48px; gap: 36px; }
}
```

- [ ] **Step 3: Run the standard gate.** Hero shows the promise headline, three stacked value props with a green rule, two buttons; no "Joget", no stats, no "Configurable Tax Administration Suite".

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.jsx src/components/Hero.css
git commit -m "feat(hero): lead with the ownership promise and Own/Afford/Evolve"
```

---

### Task 3: Problem — "where you are now"

**Files:**
- Modify: `src/components/Problem.jsx`
- Modify: `src/components/Problem.css` (only if the section was on a dark background — confirm and set light)

**Interfaces:**
- Consumes: `lucide-react` icons, `.eyebrow`, `.s-sub`.

- [ ] **Step 1: Replace the data + copy in `src/components/Problem.jsx`**

Keep the component's grid/card structure and icons; replace the array and the heading/sub copy. Full file:

```jsx
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
```

> Note: `lucide-react` exports the puzzle icon as `Puzzle`. If `PuzzleIcon` is not exported in the installed version, import `Puzzle as PuzzleIcon`. Verify during Step 2's build.

- [ ] **Step 2: Confirm the section background is light**

Open `src/components/Problem.css`. If `.problem` sets a dark `background` (the old copy used `s-sub--light`), change it to the light base so the new `.s-sub` (dark text) reads. Ensure:
```css
.problem { background: var(--off); }
```
Leave the grid/card/icon/accent rules as they are.

- [ ] **Step 3: Run the standard gate.** If the build errors on `PuzzleIcon`, switch the import to `Puzzle as PuzzleIcon` and rebuild. Four cards read in plain customer language; green accent on the eyebrow only.

- [ ] **Step 4: Commit**

```bash
git add src/components/Problem.jsx src/components/Problem.css
git commit -m "feat(problem): reframe the four structural pains in customer language"
```

---

### Task 4: Maturity — the 3-stage evolution ladder

**Files:**
- Modify: `src/components/Maturity.jsx`
- Modify: `src/components/Maturity.css`

**Interfaces:**
- Consumes: `.eyebrow`, `.s-sub`, `var(--serif)`, `var(--green)`, `var(--blue)`.

- [ ] **Step 1: Replace `src/components/Maturity.jsx` entirely**

The old "Archetype 1/2/3" framing becomes the digitization → digitalization → transformation ladder, with a "Most administrations are here" marker on Stage 2.

```jsx
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
```

- [ ] **Step 2: Update `src/components/Maturity.css`**

Remove the old bar-track rules (`.maturity__bar-track`, `.maturity__bar`) and add `.maturity__card-kicker`, `.maturity__here`, and the highlight rename (`--highlight` → `--here`). Ensure these rules exist (add/replace; leave section padding/heading/track/arrow layout intact):

```css
.maturity__card--here {
  background: #fff;
  border: 1.5px solid var(--blue);
  box-shadow: 0 6px 24px rgba(7, 41, 94, 0.08);
}
.maturity__here {
  display: inline-block;
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fff;
  background: var(--blue);
  padding: 3px 9px;
  border-radius: 3px;
  margin-bottom: 12px;
}
.maturity__card-kicker {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--muted);
  margin: 2px 0 10px;
}
```

If the section had a dark background, set `.maturity { background: var(--off); }` so `.s-sub` (dark) reads. Delete any now-unused `.maturity__bar*` rules.

- [ ] **Step 3: Run the standard gate.** Three stages, Stage 2 visibly marked "Most administrations are here", arrows between, hook footnote below.

- [ ] **Step 4: Commit**

```bash
git add src/components/Maturity.jsx src/components/Maturity.css
git commit -m "feat(maturity): replace archetypes with the digital-maturity ladder"
```

---

### Task 5: Approach — "Configured, not coded"

**Files:**
- Modify: `src/components/Approach.jsx`
- Modify: `src/components/Approach.css`

**Interfaces:**
- Consumes: `.eyebrow`, `.s-sub`, `var(--serif)`, `var(--green)`, `var(--blue)`.

- [ ] **Step 1: Replace `src/components/Approach.jsx` entirely**

Drop the Build/Buy/Configure cards **and** the entire "Built on Joget DX9" block. New two-column layout: argument + pull-quote on the left, a CSS before/after diagram on the right.

```jsx
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
            “When the law changes, the rule changes — the software doesn&apos;t.”
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
```

- [ ] **Step 2: Replace `src/components/Approach.css` entirely**

```css
.approach {
  max-width: 1080px;
  margin: 0 auto;
  padding: 80px 32px;
}
.approach__layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  margin-top: 8px;
}
.approach__h2 { font-size: clamp(1.8rem, 3.4vw, 2.6rem); margin-bottom: 1.1rem; }
.approach__quote {
  font-family: var(--serif);
  font-size: 1.3rem;
  font-style: italic;
  line-height: 1.4;
  color: var(--blue);
  border-left: 3px solid var(--green);
  padding-left: 18px;
  margin-top: 8px;
}
.approach__diagram { display: flex; flex-direction: column; gap: 18px; }
.approach__flow {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 20px 22px;
}
.approach__flow--after { border-color: var(--blue); box-shadow: 0 6px 24px rgba(7, 41, 94, 0.08); }
.approach__flow-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 12px;
}
.approach__flow--after .approach__flow-label { color: var(--blue); }
.approach__flow ol {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 4px;
}
.approach__flow li {
  font-size: 0.85rem;
  color: var(--text-secondary);
}
.approach__flow li:not(:last-child)::after {
  content: '→';
  color: var(--light, #9a9a9a);
  margin-left: 6px;
}
.approach__flow--after li { color: var(--text); font-weight: 500; }

@media (max-width: 760px) {
  .approach { padding: 56px 20px; }
  .approach__layout { grid-template-columns: 1fr; gap: 32px; }
}
```

- [ ] **Step 3: Run the standard gate.** Confirm the copy-discipline grep is empty (the "Joget" block is gone). Left column shows the argument + serif pull-quote; right shows old-way vs Daftaria flows.

- [ ] **Step 4: Commit**

```bash
git add src/components/Approach.jsx src/components/Approach.css
git commit -m "feat(approach): configured-not-coded with before/after, drop platform-vendor block"
```

---

### Task 6: Capabilities — "What you get" in four buckets

**Files:**
- Modify: `src/components/Capabilities.jsx`
- Modify: `src/components/Capabilities.css`

**Interfaces:**
- Consumes: `lucide-react` icons, `.eyebrow`, `.s-sub`, `var(--green)`.

- [ ] **Step 1: Replace `src/components/Capabilities.jsx` entirely**

Collapse the 11 individual cards into the 4 customer-meaningful buckets, with the "one identity / one account / one front door" backbone underneath.

```jsx
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
```

- [ ] **Step 2: Replace `src/components/Capabilities.css` entirely**

```css
.capabilities {
  max-width: 1080px;
  margin: 0 auto;
  padding: 80px 32px;
  background: var(--off);
}
.capabilities__h2 { font-size: clamp(1.8rem, 3.4vw, 2.6rem); margin-bottom: 1.1rem; }
.capabilities__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin-top: 28px;
}
.cap-bucket {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 24px 22px;
}
.cap-bucket__icon {
  width: 44px; height: 44px;
  display: grid; place-items: center;
  border-radius: 9px;
  background: rgba(7, 41, 94, 0.06);
  color: var(--blue);
  margin-bottom: 14px;
}
.cap-bucket__title { font-size: 1.1rem; margin-bottom: 8px; }
.cap-bucket__items { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; }
.capabilities__spine {
  margin-top: 26px;
  text-align: center;
  font-family: var(--serif);
  font-size: 1.15rem;
  color: var(--blue);
}
@media (max-width: 760px) {
  .capabilities { padding: 56px 20px; }
  .capabilities__grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Run the standard gate.** Four buckets, backbone line beneath. No 11-card grid, no tech jargon.

- [ ] **Step 4: Commit**

```bash
git add src/components/Capabilities.jsx src/components/Capabilities.css
git commit -m "feat(capabilities): regroup into four customer-meaningful buckets"
```

---

### Task 7: TaxpayerExperience (new)

**Files:**
- Create: `src/components/TaxpayerExperience.jsx`
- Create: `src/components/TaxpayerExperience.css`

**Interfaces:**
- Consumes: `.eyebrow`, `.s-sub`.
- Produces: default export `TaxpayerExperience` (wired in Task 14).

- [ ] **Step 1: Create `src/components/TaxpayerExperience.jsx`**

```jsx
import './TaxpayerExperience.css'

const CHANNELS = ['Portal', 'Mobile', 'Call centre', 'Counter']

export default function TaxpayerExperience() {
  return (
    <section className="taxexp" id="experience">
      <p className="eyebrow eyebrow--green">The taxpayer experience</p>
      <h2 className="taxexp__h2">One front door. Every channel.</h2>
      <p className="s-sub">
        Portal, mobile, call centre, counter — one consistent experience, backed by one taxpayer
        account. Self-service first, assisted always. Your taxpayers get a modern experience; your
        staff get one system to serve them with.
      </p>
      <div className="taxexp__channels">
        {CHANNELS.map((c) => <span key={c} className="taxexp__chip">{c}</span>)}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/components/TaxpayerExperience.css`**

```css
.taxexp {
  max-width: 1080px;
  margin: 0 auto;
  padding: 72px 32px;
}
.taxexp__h2 { font-size: clamp(1.7rem, 3.2vw, 2.4rem); margin-bottom: 1rem; }
.taxexp__channels { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 8px; }
.taxexp__chip {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--blue);
  background: rgba(7, 41, 94, 0.06);
  border-radius: 999px;
  padding: 8px 18px;
}
@media (max-width: 760px) { .taxexp { padding: 48px 20px; } }
```

- [ ] **Step 3: Run the standard gate.** (Component is unwired; build stays green as an unused module.)

- [ ] **Step 4: Commit**

```bash
git add src/components/TaxpayerExperience.jsx src/components/TaxpayerExperience.css
git commit -m "feat(experience): add one-front-door taxpayer experience section"
```

---

### Task 8: Sovereignty (new, deep-blue band)

**Files:**
- Create: `src/components/Sovereignty.jsx`
- Create: `src/components/Sovereignty.css`

**Interfaces:**
- Consumes: `.eyebrow`, `var(--serif)`, `var(--blue)`, `var(--blue-dk)`.
- Produces: default export `Sovereignty` (wired in Task 14).

- [ ] **Step 1: Create `src/components/Sovereignty.jsx`**

```jsx
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
```

- [ ] **Step 2: Create `src/components/Sovereignty.css`**

```css
.sov { background: var(--blue); color: #fff; }
.sov__inner { max-width: 1080px; margin: 0 auto; padding: 84px 32px; }
.sov__eyebrow { color: var(--green); }
.sov__h2 { color: #fff; font-size: clamp(1.9rem, 3.6vw, 2.8rem); margin-bottom: 1rem; }
.sov__sub { font-size: 1.0625rem; color: rgba(255, 255, 255, 0.72); max-width: 60ch; margin-bottom: 2.25rem; }
.sov__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.sov__card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 8px;
  padding: 24px 22px;
}
.sov__card-title { color: #fff; font-size: 1.15rem; margin-bottom: 8px; }
.sov__card-body { font-size: 0.92rem; color: rgba(255, 255, 255, 0.72); line-height: 1.6; }
.sov__tagline {
  margin-top: 32px;
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(1.3rem, 2.6vw, 1.9rem);
  color: #fff;
  text-align: center;
}
@media (max-width: 760px) {
  .sov__inner { padding: 60px 20px; }
  .sov__grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Run the standard gate.**

- [ ] **Step 4: Commit**

```bash
git add src/components/Sovereignty.jsx src/components/Sovereignty.css
git commit -m "feat(sovereignty): add the data/rules/exit ownership band"
```

---

### Task 9: Proof (new)

**Files:**
- Create: `src/components/Proof.jsx`
- Create: `src/components/Proof.css`

**Interfaces:**
- Consumes: `.eyebrow`, `.s-sub`, `var(--green)`.
- Produces: default export `Proof` (wired in Task 14).

- [ ] **Step 1: Create `src/components/Proof.jsx`**

```jsx
import './Proof.css'

const POINTS = [
  { title: 'Live in production', body: 'The ARMS risk engine is already running in production at a national tax administration.' },
  { title: 'The standards funders use', body: 'Aligned to TADAT and OECD Tax Administration 3.0 — the frameworks the World Bank and IMF assess against.' },
  { title: 'Open by design', body: 'GovStack and open-standards conformance — demonstrable, not merely asserted.' },
]

export default function Proof() {
  return (
    <section className="proof" id="proof">
      <p className="eyebrow eyebrow--green">Proven, not promised</p>
      <h2 className="proof__h2">Credibility you can check.</h2>
      <div className="proof__grid">
        {POINTS.map(({ title, body }) => (
          <div key={title} className="proof__card">
            <h3 className="proof__card-title">{title}</h3>
            <p className="proof__card-body">{body}</p>
          </div>
        ))}
      </div>
      <p className="proof__wordmarks">TADAT · OECD TA 3.0 · GovStack</p>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/components/Proof.css`**

```css
.proof { max-width: 1080px; margin: 0 auto; padding: 80px 32px; }
.proof__h2 { font-size: clamp(1.8rem, 3.4vw, 2.6rem); margin-bottom: 1.6rem; }
.proof__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.proof__card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 24px 22px;
  border-top: 3px solid var(--green);
}
.proof__card-title { font-size: 1.1rem; margin-bottom: 8px; }
.proof__card-body { font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6; }
.proof__wordmarks {
  margin-top: 28px;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}
@media (max-width: 760px) {
  .proof { padding: 56px 20px; }
  .proof__grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Run the standard gate.** Standards appear as the text wordmark line only — no logos.

- [ ] **Step 4: Commit**

```bash
git add src/components/Proof.jsx src/components/Proof.css
git commit -m "feat(proof): add proven-not-promised credibility section"
```

---

### Task 10: Founder (new)

**Files:**
- Create: `src/components/Founder.jsx`
- Create: `src/components/Founder.css`
- Create (placeholder): `public/aare-laponin.jpg`

**Interfaces:**
- Consumes: `.eyebrow`, `var(--serif)`.
- Produces: default export `Founder` (wired in Task 14). References image `/aare-laponin.jpg`.

- [ ] **Step 1: Add the portrait image**

The user supplies a real portrait. Until then, copy the existing logo as a stand-in so the build and layout work, and leave a note to swap it:

```bash
cp public/FiscalAdmin-copy-v.png public/aare-laponin.jpg
```
> ⚠️ Swap `public/aare-laponin.jpg` with Aare's real portrait before launch. The component intentionally references a `.jpg` path.

- [ ] **Step 2: Create `src/components/Founder.jsx`**

```jsx
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
        <img className="founder__portrait" src="/aare-laponin.jpg" alt="Aare Laponin" />
        <div className="founder__body">
          <p className="eyebrow eyebrow--green">The experience behind Daftaria</p>
          <h2 className="founder__h2">Built by people who have sat on your side of the desk.</h2>
          <p className="founder__lead">
            Daftaria is led by Aare Laponin — 30+ years building revenue and risk systems for
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
```

- [ ] **Step 3: Create `src/components/Founder.css`**

```css
.founder { background: var(--off); }
.founder__inner {
  max-width: 1080px;
  margin: 0 auto;
  padding: 80px 32px;
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 40px;
  align-items: start;
}
.founder__portrait {
  width: 220px; height: 220px;
  object-fit: cover;
  border-radius: 10px;
  background: var(--border);
}
.founder__h2 { font-size: clamp(1.6rem, 3vw, 2.3rem); margin-bottom: 1rem; max-width: 22ch; }
.founder__lead { font-size: 1.0625rem; color: var(--text-secondary); line-height: 1.7; max-width: 60ch; margin-bottom: 1.5rem; }
.founder__chips { display: flex; flex-wrap: wrap; gap: 10px; }
.founder__chip {
  font-size: 0.82rem;
  color: var(--text);
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 7px 14px;
}
@media (max-width: 760px) {
  .founder__inner { grid-template-columns: 1fr; padding: 56px 20px; gap: 28px; }
  .founder__portrait { width: 160px; height: 160px; }
}
```

- [ ] **Step 4: Run the standard gate.** Portrait + throughline headline + six proof chips.

- [ ] **Step 5: Commit**

```bash
git add src/components/Founder.jsx src/components/Founder.css public/aare-laponin.jpg
git commit -m "feat(founder): add the experience-behind-Daftaria section (placeholder portrait)"
```

---

### Task 11: Adoption (new)

**Files:**
- Create: `src/components/Adoption.jsx`
- Create: `src/components/Adoption.css`

**Interfaces:**
- Consumes: `.eyebrow`, `.s-sub`, `var(--blue)`.
- Produces: default export `Adoption` (wired in Task 14).

- [ ] **Step 1: Create `src/components/Adoption.jsx`**

```jsx
import './Adoption.css'

const PHASES = [
  { n: 1, title: 'Foundation', items: 'Registration · Taxpayer accounting · Returns · Payments' },
  { n: 2, title: 'Compliance core', items: 'Risk · Audit · Debt' },
  { n: 3, title: 'Experience & fairness', items: 'Services · Refunds · Appeals' },
  { n: 4, title: 'Performance & optimisation', items: 'Analytics · Continuous improvement' },
]

export default function Adoption() {
  return (
    <section className="adoption" id="adoption">
      <p className="eyebrow eyebrow--green">How adoption works</p>
      <h2 className="adoption__h2">
        Value in months. Start where it matters.<br />Add the rest later.
      </h2>
      <div className="adoption__grid">
        {PHASES.map(({ n, title, items }) => (
          <div key={n} className="adoption__phase">
            <span className="adoption__num">{n}</span>
            <h3 className="adoption__phase-title">{title}</h3>
            <p className="adoption__phase-items">{items}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/components/Adoption.css`**

```css
.adoption { max-width: 1080px; margin: 0 auto; padding: 80px 32px; }
.adoption__h2 { font-size: clamp(1.8rem, 3.4vw, 2.6rem); margin-bottom: 1.8rem; }
.adoption__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.adoption__phase {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 22px 20px;
}
.adoption__num {
  display: grid; place-items: center;
  width: 32px; height: 32px;
  border-radius: 50%;
  background: var(--blue);
  color: #fff;
  font-family: var(--serif);
  font-weight: 600;
  margin-bottom: 14px;
}
.adoption__phase-title { font-size: 1.02rem; margin-bottom: 8px; }
.adoption__phase-items { font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6; }
@media (max-width: 760px) {
  .adoption { padding: 56px 20px; }
  .adoption__grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Run the standard gate.**

- [ ] **Step 4: Commit**

```bash
git add src/components/Adoption.jsx src/components/Adoption.css
git commit -m "feat(adoption): add phased value-in-months adoption section"
```

---

### Task 12: WhyItMatters — strip the tech jargon

**Files:**
- Modify: `src/components/WhyItMatters.jsx`

**Interfaces:**
- Consumes: `.eyebrow`, `.s-sub`.

- [ ] **Step 1: Replace the `AUDIENCES` array and intro copy in `src/components/WhyItMatters.jsx`**

Keep the component's render structure (cards, `.why__list`); replace only the data and the heading/sub. The new arrays remove every technology name (no BPMN/OpenAPI/OCI/Kubernetes). Full file:

```jsx
import './WhyItMatters.css'

const AUDIENCES = [
  {
    role: 'For senior management',
    title: 'World-class capability, at a fraction of the cost and risk',
    points: [
      'Value delivered in months, not years',
      'No 15–20 year replacement trap',
      'The system grows with you and tracks the law',
      'No re-procurement when legislation changes',
    ],
  },
  {
    role: 'For IT / CIO leadership',
    title: 'A system a small team can genuinely own',
    points: [
      'A mature, supported foundation — not orphaned bespoke code',
      'Minimal bespoke footprint; routine changes done in-house',
      'Your data and processes stay portable, in open formats',
      'A documented exit — no lock-in, ever',
    ],
  },
  {
    role: 'For technical advisers',
    title: 'Aligned to international good practice',
    points: [
      'Aligned to TADAT and OECD Tax Administration 3.0',
      'GovStack building-block compatible',
      'Single taxpayer account, risk-based compliance, independent appeals',
      'Conformance you can demonstrate, not merely assert',
    ],
  },
]

export default function WhyItMatters() {
  return (
    <section className="why" id="why">
      <p className="eyebrow eyebrow--green">Why it matters</p>
      <h2 className="why__h2">
        The right answer<br />for every stakeholder.
      </h2>
      <p className="s-sub">
        Daftaria answers the concern of every decision-maker in the room — not just one.
      </p>
      <div className="why__grid">
        {AUDIENCES.map(({ role, title, points }) => (
          <div key={role} className="why__card">
            <p className="eyebrow eyebrow--muted">{role}</p>
            <h3 className="why__card-title">{title}</h3>
            <ul className="why__list">
              {points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
```

> If `.why` had a dark background in `WhyItMatters.css` requiring `s-sub--light`, leave the background but note we switched to `.s-sub` (dark). Check during the gate: if the sub text is unreadable on a dark card, set `.why { background: var(--off); }` and re-commit.

- [ ] **Step 2: Run the standard gate.** Confirm the copy-discipline grep is empty (BPMN/OpenAPI removed).

- [ ] **Step 3: Commit**

```bash
git add src/components/WhyItMatters.jsx
git commit -m "feat(why): strip technology jargon from the audience cards"
```

---

### Task 13: CtaSection + Nav + Footer copy

**Files:**
- Modify: `src/components/CtaSection.jsx`
- Modify: `src/components/Nav.jsx`
- Modify: `src/components/Footer.jsx`

**Interfaces:**
- Consumes: `.btn-primary`, `.btn-ghost`, `.s-sub`, `.s-sub--light`.

- [ ] **Step 1: Update the CTA heading/sub in `src/components/CtaSection.jsx`**

Replace the `<h2>` and `<p>` only (keep the buttons and section shell):

```jsx
      <h2 className="cta-section__h2">
        Ready for a tax administration<br />
        you can <em>own</em>?
      </h2>
      <p className="s-sub s-sub--light">
        Request a briefing, or read the whitepaper to share with your colleagues and technical advisers.
      </p>
```

- [ ] **Step 2: Align Nav link labels in `src/components/Nav.jsx`**

The anchors already match existing section ids (`#solution`, `#capabilities`, `#why`). Update the middle link label so it points at the maturity story, and keep the rest:

```jsx
      <div className="nav__links">
        <a href="#problem">The problem</a>
        <a href="#solution">The difference</a>
        <a href="#proof">Proof</a>
        <a href="#why">For advisers</a>
      </div>
```

- [ ] **Step 3: Footer** — `src/components/Footer.jsx` needs no copy change (already "Daftaria — a product by FiscalAdmin · © 2026" with privacy/contact links). Leave as-is unless the brand line reads stale; if changed, keep it one line.

- [ ] **Step 4: Run the standard gate.** All nav anchors resolve to real section ids: `#problem` (Problem), `#solution` (Approach), `#proof` (Proof), `#why` (WhyItMatters).

- [ ] **Step 5: Commit**

```bash
git add src/components/CtaSection.jsx src/components/Nav.jsx
git commit -m "feat(cta,nav): ownership-led CTA and nav anchors for the new structure"
```

---

### Task 14: Wire the full page in the final order

**Files:**
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: every section component (existing + the 5 new).

- [ ] **Step 1: Replace `src/App.jsx` entirely**

```jsx
import Nav from './components/Nav'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Maturity from './components/Maturity'
import Approach from './components/Approach'
import Capabilities from './components/Capabilities'
import TaxpayerExperience from './components/TaxpayerExperience'
import Sovereignty from './components/Sovereignty'
import Proof from './components/Proof'
import Founder from './components/Founder'
import Adoption from './components/Adoption'
import WhyItMatters from './components/WhyItMatters'
import CtaSection from './components/CtaSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Maturity />
        <Approach />
        <Capabilities />
        <TaxpayerExperience />
        <Sovereignty />
        <Proof />
        <Founder />
        <Adoption />
        <WhyItMatters />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Run the standard gate, then a full-page review**

Run the standard gate. Then `npm run dev` and scroll the entire page top to bottom at desktop width and at ≤760px:
- Order matches the target: Hero → Problem → Maturity → Approach → Capabilities → TaxpayerExperience → Sovereignty → Proof → Founder → Adoption → WhyItMatters → CtaSection.
- The Sovereignty band is the deep-blue section; every other section reads on the warm/white base.
- All grids collapse to one column on mobile; no horizontal overflow.
- Orange appears only on primary CTAs; green only as small accents/markers.
- Copy-discipline grep is empty; no investor figures; standards are text-only.
- Links: every `btn-primary` → `https://fiscaladmin.com/contact`; whitepaper → `/whitepaper.pdf`; founder portrait renders.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat(app): assemble the redesigned single-scroll homepage in final order"
```

---

### Task 15: Final polish pass (optional but recommended)

**Files:**
- Modify: any component CSS as needed.

This task exists because the per-section CSS above is a correct, on-brand baseline, not a finished visual design. Run the **frontend-design** skill and do one cohesion pass across the whole page: vertical rhythm between sections, consistent heading sizes, the serif/sans balance, hover states, and the one-accent discipline. Make only visual refinements — no copy or structural changes.

- [ ] **Step 1:** Invoke the `frontend-design:frontend-design` skill and review the live page section by section.
- [ ] **Step 2:** Apply refinements; keep the global constraints intact.
- [ ] **Step 3:** Run the standard gate + full-page review.
- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "polish(ui): cohesion pass across the redesigned homepage"
```

---

## Self-Review

**Spec coverage** — every spec section maps to a task:
- Hero §2 → Task 2 · Problem §3 → Task 3 · Evolution ladder §4 → Task 4 · Configured-not-coded §5 → Task 5 · What-you-get buckets §6 → Task 6 · Taxpayer experience §7 → Task 7 · Sovereignty §8 → Task 8 · Proven §9 → Task 9 · Founder §10 → Task 10 · Adoption §11 → Task 11 · Why-it-matters §12 → Task 12 · CTA §13 / Nav / Footer §14 → Task 13 · Visual system (serif, tokens) → Task 1 + per-component CSS · Build/verification model → Global Constraints + each task's gate · IA order → Task 14. Trust strip "dropped" → reflected by its absence and standards moved into Proof (Task 9). No gaps.

**Placeholder scan** — no "TBD/TODO"; the one deliberate placeholder (`public/aare-laponin.jpg`) is explicitly flagged with a swap instruction and a working stand-in so the build never breaks. The `lucide-react` `Puzzle`/`PuzzleIcon` export risk is called out with a fallback in Task 3.

**Type/name consistency** — section `id`s used by Nav (`#problem`, `#solution`, `#proof`, `#why`) all exist on their sections (Problem `id="problem"`, Approach `id="solution"`, Proof `id="proof"`, WhyItMatters `id="why"`). New component default-export names match their `App.jsx` imports. CSS class renames (`maturity__card--highlight` → `--here`; removal of `.maturity__bar*`, `.approach__joget`, `.cap-card*`, `hero__stat*`) are each handled in the task that replaces the corresponding JSX, so no orphaned/missing classes remain. `var(--serif)` is defined in Task 1 before any task consumes it.
