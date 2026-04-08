import { floorPlans } from '../data/projects';
import SectionHeading from '../components/SectionHeading';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

function PlanMiniDraw() {
  return (
    <div className="plan-drawing modern-plan-drawing">
      <div className="plan-box large">Living</div>
      <div className="plan-box">Bed 1</div>
      <div className="plan-box">Bed 2</div>
      <div className="plan-box">Kitchen</div>
      <div className="plan-box">Deck</div>
      <div className="plan-box">Foyer</div>
    </div>
  );
}

export default function FloorPlansPage() {
  return (
    <section className="page-hero plans-surface">
      <div className="section-block narrow-top">
        <SectionHeading
          eyebrow="Floor Plans"
          title="A single page with 3D plan images and layout presentation."
          text="Designed as a premium floor plan page with large visuals, plan styling, and direct access to the related single project page."
        />

        <div className="project-plan-stack">
          {floorPlans.map((plan, index) => (
            <motion.article className="plan-feature-card hover-panel" key={`${plan.projectId}-${plan.code}`} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.65, delay: index * 0.06 }}>
              <div className="plan-feature-visual">
                <img src={plan.image} alt={plan.title} />
                <div className="floating-plan-chip">3D Floor Visual</div>
              </div>
              <div className="plan-feature-info">
                <span>{plan.projectName}</span>
                <h3>{plan.title}</h3>
                <div className="plan-meta plan-meta-strong">
                  <p>{plan.code}</p>
                  <p>{plan.size}</p>
                  <p>{plan.bedrooms}</p>
                  <p>{plan.baths}</p>
                </div>
                <PlanMiniDraw />
                <NavLink to={`/projects/${plan.projectId}`} className="inline-link">
                  View Single Project Page
                </NavLink>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
