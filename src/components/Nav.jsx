import './Nav.css'

export default function Nav() {
  return (
    <nav className="nav">
      <a href="#" className="nav__brand">
        <img src="/FiscalAdmin-copy-v.png" alt="FiscalAdmin" className="nav__logo" />
        <div className="nav__divider" />
        <span className="nav__wordmark">DAFTARIA</span>
      </a>
      <div className="nav__links">
        <a href="#problem">The problem</a>
        <a href="#solution">The difference</a>
        <a href="#proof">Proof</a>
        <a href="#why">For advisers</a>
      </div>
      <a href="https://fiscaladmin.com/contact" className="nav__cta" target="_blank" rel="noopener noreferrer">
        Contact
      </a>
    </nav>
  )
}
