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
        <a href="#solution">Solution</a>
        <a href="#capabilities">Capabilities</a>
        <a href="#why">For Advisers</a>
        <a href="https://fiscaladmin.com/about" target="_blank" rel="noopener noreferrer">About</a>
      </div>
      <a href="https://fiscaladmin.com/contact" className="nav__cta" target="_blank" rel="noopener noreferrer">
        Contact
      </a>
    </nav>
  )
}
