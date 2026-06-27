# Daftaria Homepage Redesign — Design Spec

*Date: 2026-06-27. Redesign of the public Daftaria marketing site: content and visual overhaul of the existing React + Vite single-page app.*

## Problem

The current site leads with architecture and technology. The hero reads "The Configurable Tax Administration Suite… Built on Joget DX9," with stats like "0 vendor lock-in" and a blue/green/orange palette applied without restraint. The buyer — a tax commissioner or CIO in a revenue authority, or an IFI adviser financing them — does not buy architecture. They buy an escape from a trap they already feel. The site must lead with **their** problem and the evolution story, with technical proof underneath as reassurance.

## Strategy (the reframe)

**Anchor promise:** A complete, modern tax administration you can actually own and afford — configured to your laws, not coded from scratch.

**Three value props (the spine):** Own it · Afford it · Evolve it.

**One discipline, enforced in every section:** No visible technology names in headlines or body copy — no "Joget," "Kafka," "BPMN," "medallion," "metamodel." Where a technical fact is unavoidable, it appears only in a quiet parenthetical and never as the point of a sentence. Customer benefit carries the sentence: *"Your team changes the system as the law changes, with no release cycle"* — not *"low-code metamodel-driven configuration."*

**Source discipline:** No investor-facing material on the public site. The Investment Roadmap's figures, ARR model, and country-count targets stay off entirely. Only its market framing (the sustainability gap, IFI alignment) may inform customer-value copy.

## Decisions (locked with the user)

- **Structure:** single long-scroll homepage (no subpages, no routing).
- **Visual direction:** keep the existing brand colors, applied with restraint; add serif display headlines.
- **Build approach:** rework copy + styles inside the existing React/Vite component structure; CI/infra untouched.
- **Primary CTA:** keep the external link to `https://fiscaladmin.com/contact`; whitepaper keeps the local `/whitepaper.pdf`.
- **Trust strip:** dropped. Standards credibility (TADAT · OECD TA 3.0 · GovStack) moves into the "Proven, not promised" section as styled text wordmarks — no third-party logos anywhere.
- **Founder:** named "Aare Laponin" (CV spelling is "Lapõnin"; plain spelling used unless changed later); real portrait dropped into `public/`.
- **Headlines:** serif display face; body stays clean system sans.

## Information Architecture

Single scroll, sections in the order below (the wireframe order). The repo lives at `…/daftaria/website`; source documents (`.docx`, brief, wireframe) live in the parent `…/daftaria/resources` and are outside the git repo — never committed.

| # | Section | Component | Status |
|---|---------|-----------|--------|
| 1 | Nav | `Nav` | rework |
| 2 | Hero — promise headline + Own/Afford/Evolve subhead + 2 CTAs | `Hero` | rework |
| 3 | The problem — "where you are now" (4 structural pains) | `Problem` | rework |
| 4 | The evolution ladder — 3 rungs, "most admins here" marker on Stage 2 | `Maturity` | rework |
| 5 | The difference — *configured, not coded* + before/after + pull-quote | `Approach` | rework |
| 6 | What you get — 4 capability buckets; one taxpayer / account / front door | `Capabilities` | rework |
| 7 | The taxpayer experience — one front door across portal, mobile, call centre, counter | `TaxpayerExperience` | new |
| 8 | Sustainable, and yours — sovereignty / exit (visually distinct) | `Sovereignty` | new |
| 9 | Proven, not promised — ARMS in production, TADAT, OECD TA 3.0, GovStack (text) | `Proof` | new |
| 10 | The experience behind Daftaria — Aare, portrait + proof chips | `Founder` | new |
| 11 | How adoption works — 4 phases, "value in months" | `Adoption` | new |
| 12 | Why it matters — by audience (3 cards) | `WhyItMatters` | rework |
| 13 | Closing CTA — "Request a briefing" / "See a reference deployment" | `CtaSection` | rework |
| 14 | Footer | `Footer` | rework |

`App.jsx` is reordered to: Hero → Problem → Maturity → Approach → Capabilities → TaxpayerExperience → Sovereignty → Proof → Founder → Adoption → WhyItMatters → CtaSection. (Current order — Hero, Approach, Problem, Capabilities, Maturity, WhyItMatters, Cta — is replaced.)

## Section content

Each unit has one clear purpose, communicates through props-free composition (these are static presentational components), and can be understood and edited independently. Copy below is direction, not final wording; final copy is written during implementation, grounded in the brief and source documents.

### 2. Hero
- Eyebrow: the *daftar* root — register / ledger / office — shared across Swahili, Arabic, Urdu, Hindi, Persian, Turkish, Malay/Indonesian. Signals "built for administrations like yours," not a Western export.
- Headline (serif): the anchor promise.
- Subhead: the three value props — **Own it. Afford it. Evolve it.** — each with a one-line gloss (your data/rules/exit; a small team can sustain it; climb the maturity ladder by configuration).
- CTAs: primary "Book a briefing" → `https://fiscaladmin.com/contact`; ghost "Read the whitepaper" → `/whitepaper.pdf`.
- No architecture, no technology names, no "0 vendor lock-in" stat block.

### 3. The problem — "where you are now"
Four structural pains in customer language (Whitepaper §2), as four cards:
- Change keeps getting more expensive and riskier every year.
- You're locked to one vendor and can't get your own data out.
- The whole thing must be torn out and rebuilt every 15–20 years.
- Systems built for big, rich administrations don't fit yours — you pay for complexity you can't use and miss the simplicity you need.

### 4. The evolution ladder (the spine)
Three rungs, with a visible **"most administrations are here"** marker on Stage 2 so the visitor self-locates and feels the ceiling (TA Guide Ch. 2):
- **Stage 1 — Putting paper on computers** (digitization). A scanned bad form is still a bad form.
- **Stage 2 — Automating the old way of working** (digitalization — the ceiling). Marked active. Every change means re-testing the whole system; costs rise yearly; replaced wholesale in 15–20 years.
- **Stage 3 — Tax built for a digital society** (transformation · OECD TA 3.0). Data flows from taxpayers' own systems; compliance is designed-in; risk detection is data-driven.
- Close with the hook: *Daftaria lets you operate at your level today and climb this ladder by configuration — not by buying a new system every generation.*

### 5. The difference — configured, not coded
The single most important idea, landed simply (Whitepaper §3–§5, §12.9):
- A new tax, a changed rule, a new channel, a new language = a configuration change your own team makes, versioned and tested — not a software release you pay a vendor for.
- "Policy as code" in plain terms.
- Pull-quote (serif): **"When the law changes, the rule changes — the software doesn't."**
- Paired with a simple before/after visual: release cycle → configuration change (CSS/SVG, no heavy assets).

### 6. What you get — complete coverage
Eleven capabilities grouped into four customer-meaningful buckets (Whitepaper Fig. 4), four cards:
- **Identify & declare** — Registration, Returns
- **Account & collect** — Taxpayer accounting, Payments, Refunds
- **Verify & enforce** — Risk, Audit, Debt
- **Resolve & steer** — Appeals, Performance
- All on **one taxpayer identity, one account, one front door.**

### 7. The taxpayer experience
Compact band (Whitepaper §10): one consistent front door across portal, mobile, call centre, and counter; self-service first, assisted always. Customers care that *their* taxpayers get a modern experience.

### 8. Sustainable, and yours (headline differentiator)
The ownership / exit story, pulled high and made visually distinct (deep-blue band) — sovereignty is the sharpest current differentiator (Whitepaper §12.6, §22.2):
- Your data exports in open formats.
- Your rules and workflows export as standard, portable files.
- A documented exit, so it never becomes a trap.
- Tagline (serif): **"The freedom to evolve, and to leave, is built in."**

### 9. Proven, not promised
Credibility for the IFI adviser, three points (Investment Roadmap §3.1 framing only; Whitepaper §7):
- The **ARMS risk engine** already running in production at a national tax administration.
- Alignment to **TADAT** and **OECD TA 3.0** — the standards the World Bank and IMF assess against.
- **GovStack** / open-standards conformance.
- Standards shown as styled text wordmarks (TADAT · OECD TA 3.0 · GovStack), no logos.

### 10. The experience behind Daftaria (Aare)
Prominent, mid-page. Portrait (real photo in `public/`) + throughline + proof chips (CV-grounded):
- Throughline: *30+ years building revenue and risk systems for governments — from inside a tax administration, inside the IMF, and as an author of the standards this market is procured against.*
- Proof chips: Deputy Director General, Estonian National Tax Board (built e-Tax & risk-based audit) · IMF Fiscal Affairs short-term expert since 2014 · trained TADAT Assessor · GovStack PAERA & Workflow building-block co-author · Lead Solution Architect, ARMS for Moldova's State Fiscal Service (current) · Chief Solution Architect, Nortal.
- Pull-quote (serif): **"Built by people who have sat on your side of the desk."**

### 11. How adoption works
Four phases, framed as "value in months, start where it matters, add the rest later" (Whitepaper §13):
- **Foundation** — Registration, Taxpayer Accounting, Returns, Payments
- **Compliance core** — Risk, Audit, Debt
- **Experience & fairness** — Services, Refunds, Appeals
- **Performance & optimisation** — Analytics, continuous improvement

### 12. Why it matters — by audience
Three condensed cards (Whitepaper §14):
- **Senior management:** complete system, value in months, affordable, grows with you — no bespoke megaproject, no 15–20 year replacement trap.
- **IT / CIO leadership:** minimal bespoke footprint, open standards, data/process portability — a system a small team can own.
- **Technical advisers (IFI):** alignment to TADAT, OECD TA 3.0, GovStack; single taxpayer account, risk-based compliance, independent appeals.

### 13. Closing CTA
A single clear next step: "Request a briefing" / "See a reference deployment" → `https://fiscaladmin.com/contact`.

### 14. Footer
Wordmark, brief tagline, minimal links (whitepaper, contact). No investor material.

## Visual System

Brand colors retained, applied with restraint; calm achieved through whitespace and typography, not a new palette.

- **Deep blue `#07295e`** — authority. Carries the visually-distinct dark bands (Sovereignty §8, optionally Proven §9) and major emphasis.
- **Green `#bdca42`** — quiet accent only: the "most admins here" marker, small rule lines, list ticks. Never large fills.
- **Orange `#ff8704`** — reserved strictly for the primary CTA button.
- **Warm off-white `#f6f7f2`** page base; **white `#ffffff`** cards; generous whitespace; minimal decoration.
- **Typography:** a serif display face for headlines and pull-quotes (transitional / institutional register, conveying gravitas); clean system sans for body and UI. Font loading kept light (a single self-hosted or well-cached web font for the serif; system stack for sans).
- **Iconography:** minimal line icons (existing `lucide-react` dependency), used sparingly.
- **Responsive:** multi-column grids collapse to single column at the mobile breakpoint; nav links collapse as in the current Nav.

Existing design tokens in `src/index.css` (`--blue`, `--green`, `--orange`, `--off`, etc.) are reused and extended (add a serif font-family token and any new neutral steps needed for the calm register).

## Components — boundaries

Each component is a self-contained presentational unit: it renders one section, owns its own CSS file, takes no props, and depends only on shared tokens/utilities in `index.css`. New components (`TaxpayerExperience`, `Sovereignty`, `Proof`, `Founder`, `Adoption`) follow the existing pattern (`Component.jsx` + `Component.css`, default export, imported into `App.jsx`). This keeps each section understandable and editable in isolation and matches the current codebase structure.

## Verification

This is a static marketing site with no business logic and no existing test framework, so TDD does not apply; verification is build, lint, and visual review:

1. `npm run build` completes without errors.
2. `npm run lint` is clean.
3. `npm run dev` and review every section at a desktop width and at a mobile width (≤760px): layout intact, grids collapse correctly, no overflow.
4. Content discipline check: no technology brand names visible in rendered copy (grep the rendered text / source for "Joget", "Kafka", "BPMN", "metamodel"); no investor figures present.
5. All links resolve: CTA → `https://fiscaladmin.com/contact`, whitepaper → `/whitepaper.pdf`, founder portrait present in `public/`.

## Out of Scope

- Subpages / routing.
- A backend, contact form, or analytics.
- Any investor-facing content or figures.
- Third-party / standards logos.
- Changing the CI/infra/deploy pipeline.
- A new color palette or framework migration.

## Source Map

| Section | Primary source |
|---|---|
| Evolution ladder (§4) | TA Guide Ch. 2; Whitepaper §2.2, §2.4 |
| Problem (§3) | Whitepaper §2 |
| Configured not coded (§5) | Whitepaper §3–§5, §12.9 |
| Capability buckets (§6) | Whitepaper §6, Fig. 4 |
| Taxpayer experience (§7) | Whitepaper §10 |
| Sustainable / yours (§8) | Whitepaper §12.6, §22.2 |
| Proven (§9) | Investment Roadmap §3.1 (framing only); Whitepaper §7 |
| Adoption phases (§11) | Whitepaper §13 |
| Why it matters (§12) | Whitepaper §14 |
| Founder (§10) | CV_Aare_Laponin_2026 |
| Benchmark / register | Content brief §6 (DIGIT/eGov, MOSIP, GovStack; against FAST/GenTax) |
