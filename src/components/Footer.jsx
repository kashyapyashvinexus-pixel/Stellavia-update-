import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <p className="eyebrow">Stellavia Construction</p>
          <h3>Building premium flats and apartments with lasting value.</h3>
        </div>

        <div>
          <p className="footer-title">Quick Links</p>
          <div className="footer-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/floor-plans">Floor Plans</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
        </div>

        <div>
          <p className="footer-title">Contact</p>
          <div className="footer-copy">
            <p>sales@stellavia.com</p>
            <p>+91 98765 43210</p>
            <p>Ahmedabad, Gujarat</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Stellavia Construction. All rights reserved.</span>
        <span>Designed for premium residential storytelling.</span>
      </div>
    </footer>
  );
}
