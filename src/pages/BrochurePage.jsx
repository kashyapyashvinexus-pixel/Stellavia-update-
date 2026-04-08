import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { getProjectById, projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function BrochurePage() {
  const { projectId } = useParams();
  const project = getProjectById(projectId) || projects[0];

  useEffect(() => {
    const sections = gsap.utils.toArray('.brochure-panel');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%'
          }
        }
      );
    });

    gsap.utils.toArray('.parallax-media img').forEach((image) => {
      gsap.to(image, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: image,
          scrub: true
        }
      });
    });

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  return (
    <section className="brochure-page">
      <div className="brochure-panel brochure-hero" style={{ backgroundImage: `linear-gradient(120deg, rgba(9,9,9,0.82), rgba(9,9,9,0.36)), url(${project.heroImage})` }}>
        <div className="section-block brochure-hero-inner">
          <p className="eyebrow light">Project Brochure</p>
          <h1>{project.name}</h1>
          <p className="lead project-lead">{project.brochureSummary}</p>
          <NavLink to={`/projects/${project.id}`} className="ghost-btn ghost-dark">
            Back To Project <ArrowRight size={16} />
          </NavLink>
        </div>
      </div>

      <div className="brochure-panel section-block brochure-content-grid">
        <div>
          <p className="eyebrow">Project Story</p>
          <h2>Luxury residential identity with smooth scroll transitions.</h2>
        </div>
        <div className="brochure-copy-card hover-panel">
          <p>
            The brochure page is created like a premium scrolling presentation. Every section can showcase tower imagery,
            amenity focus, construction credibility, and floor plan comparison in a clear sequence.
          </p>
        </div>
      </div>

      <div className="brochure-panel brochure-dual section-block alt-surface">
        <div className="parallax-media brochure-media-large hover-panel">
          <img src={project.gallery[0]} alt={project.name} />
        </div>
        <div className="brochure-side-stack">
          <div className="brochure-copy-card hover-panel">
            <span className="eyebrow">Amenities</span>
            <h3>Elevated common spaces and premium resident experience.</h3>
            <p>{project.highlights.join(' • ')}</p>
          </div>
          <div className="brochure-copy-card hover-panel">
            <span className="eyebrow">Configurations</span>
            <div className="metric-grid dark-copy">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <small>{metric.label}</small>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="brochure-panel section-block brochure-plan-columns">
        {project.floorPlans.map((plan) => (
          <article key={plan.code} className="brochure-plan-card hover-panel">
            <img src={plan.image} alt={plan.title} />
            <div className="brochure-plan-content">
              <span>{plan.code}</span>
              <h3>{plan.title}</h3>
              <p>{plan.size} • {plan.bedrooms} • {plan.baths}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
