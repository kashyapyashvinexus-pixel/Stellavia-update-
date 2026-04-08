import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Floor Plans', path: '/floor-plans' },
  { label: 'Contact', path: '/contact' }
];

export default function Header() {
  const headerRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  return (
    <header ref={headerRef} className="site-header">
      <div className="header-shell">
        <NavLink to="/" className="brand-mark" onClick={() => setOpen(false)}>
          <span className="brand-icon">S</span>
          <div>
            <strong>Stellavia</strong>
            <span>Construction</span>
          </div>
        </NavLink>

        <nav className={`site-nav ${open ? 'is-open' : ''}`}>
          <div className="site-nav-center">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <NavLink to="/contact" className="nav-cta" onClick={() => setOpen(false)}>
            Book Visit
          </NavLink>
        </nav>

        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
