import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__brand">
        <strong>Daftaria</strong> — a product by FiscalAdmin · © 2026
      </p>
      <nav className="footer__links" aria-label="Footer navigation">
        <a href="https://fiscaladmin.com/privacy" target="_blank" rel="noopener noreferrer">Privacy</a>
        <a href="https://fiscaladmin.com/contact" target="_blank" rel="noopener noreferrer">Contact</a>
        <a href="https://fiscaladmin.com" target="_blank" rel="noopener noreferrer">fiscaladmin.com</a>
      </nav>
    </footer>
  )
}
