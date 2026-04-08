import { NavLink, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { getProjectById, projects } from '../data/projects';

function PlanDiagram() {
  return (
    <div className="diagram-grid">
      <div className="diagram-room big">Living + Dining</div>
      <div className="diagram-room">Bedroom 01</div>
      <div className="diagram-room">Bedroom 02</div>
      <div className="diagram-room">Kitchen</div>
      <div className="diagram-room">Foyer</div>
      <div className="diagram-room">Deck</div>
    </div>
  );
}

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = getProjectById(projectId) || projects[0];

  return (
    <>
      <section className="project-detail-hero" style={{ backgroundImage: `linear-gradient(120deg, rgba(10,10,10,0.74), rgba(10,10,10,0.24)), url(${project.heroImage})` }}>
        <div className="section-block project-hero-inner">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <p className="eyebrow light">Single Project Page</p>
            <h1>{project.name}</h1>
            <p className="lead project-lead">{project.description}</p>
            <div className="hero-actions">
              <NavLink to={`/brochure/${project.id}`} className="primary-btn">
                View Brochure <ArrowRight size={16} />
              </NavLink>
              <a href="#plans" className="ghost-btn ghost-dark">Jump to Floor Plans</a>
            </div>
          </motion.div>

          <motion.div className="project-stats-card glass-card hover-panel" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}>
            <span className="eyebrow light">Project Overview</span>
            <div className="metric-grid">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <small>{metric.label}</small>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow="Highlights"
          title="A project page with brochure access, gallery blocks, and floor plan storytelling."
          text="Each project card now opens into a focused single-project page with rich imagery, animated content sections, and scroll-friendly browsing."
        />

        <div className="highlights-grid">
          {project.highlights.map((item, index) => (
            <motion.div
              key={item}
              className="highlight-card hover-panel"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <span>0{index + 1}</span>
              <p>{item}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-block alt-surface">
        <div className="gallery-mosaic">
          {project.gallery.map((image, index) => (
            <motion.div
              className={`gallery-card gallery-card-${index + 1} hover-panel`}
              key={image}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <img src={image} alt={`${project.name} ${index + 1}`} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-block" id="plans">
        <SectionHeading
          eyebrow="3D Floor Plans"
          title="Floor plan cards with visual image, plan layout, and quick details."
          text="This single page section can be used as a premium sales-ready project presentation for buyers, channel partners, and digital campaigns."
        />

        <div className="project-plan-stack">
          {project.floorPlans.map((plan, index) => (
            <motion.article
              className="plan-feature-card hover-panel"
              key={plan.code}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
            >
              <div className="plan-feature-visual">
                <img src={plan.image} alt={plan.title} />
                <div className="floating-plan-chip">3D Visual</div>
              </div>
              <div className="plan-feature-info">
                <span>{plan.code}</span>
                <h3>{plan.title}</h3>
                <div className="plan-meta plan-meta-strong">
                  <p>{plan.size}</p>
                  <p>{plan.bedrooms}</p>
                  <p>{plan.baths}</p>
                  <p>{plan.facing}</p>
                </div>
                <PlanDiagram />
              </div>
            </motion.article>
          ))}
        </div>

        <div className="project-cta-row">
          <NavLink to={`/brochure/${project.id}`} className="primary-btn">
            Open Brochure Page <Download size={16} />
          </NavLink>
        </div>
      </section>
    </>
  );
}
