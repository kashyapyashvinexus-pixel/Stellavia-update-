import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const heroRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-copy > *', {
        y: 48,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });

      gsap.from('.hero-visual', {
        scale: 1.08,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out'
      });
    }, heroRef);

    const move = (e) => {
      const x = (window.innerWidth / 2 - e.clientX) / 35;
      const y = (window.innerHeight / 2 - e.clientY) / 35;
      gsap.to(imageRef.current, {
        x: -x,
        y: -y,
        duration: 0.8,
        ease: 'power3.out'
      });
    };

    window.addEventListener('mousemove', move);
    return () => {
      window.removeEventListener('mousemove', move);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={heroRef} className="hero-section full-bleed">
      <div className="hero-overlay" />
      <div className="hero-layout hero-layout-pushed">
        <div className="hero-copy">
          <p className="eyebrow">Premium Residential Construction</p>
          <h1>We shape flats and apartments into landmark living experiences.</h1>
          <p className="lead">
            Stellavia creates high-value residential spaces with sharp architecture,
            trusted construction, and presentation-worthy design details.
          </p>
          <div className="hero-actions">
            <NavLink to="/projects" className="primary-btn">
              Explore Projects
            </NavLink>
            <NavLink to="/floor-plans" className="ghost-btn">
              View Floor Plans
            </NavLink>
          </div>
        </div>

        <motion.div
          ref={imageRef}
          className="hero-visual hover-panel"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2 }}
        >
          <div className="hero-card glass-card">
            <span>Signature Launch</span>
            <strong>Aurelia Heights</strong>
            <p>Luxury apartment towers with skyline amenities and elegant urban planning.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
