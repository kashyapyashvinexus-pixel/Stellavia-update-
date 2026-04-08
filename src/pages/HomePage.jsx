import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import StatsStrip from '../components/StatsStrip';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import { featuredProjects, homeGallery, principles } from '../data/projects';
import { ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsStrip />

      <section className="section-block">
        <SectionHeading
          eyebrow="What Makes Stellavia Different"
          title="An agency-level digital presence for a company that builds premium homes."
          text="Built with strong motion, architectural storytelling, and polished project showcases that feel elevated on every screen."
        />

        <div className="principles-grid">
          {principles.map((item, index) => (
            <motion.div
              key={item}
              className="principle-card hover-panel"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65, delay: index * 0.1 }}
            >
              <span>0{index + 1}</span>
              <p>{item}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-block alt-surface">
        <SectionHeading
          eyebrow="Featured Developments"
          title="Projects presented like premium launch campaigns."
          text="Every grid item is clickable now and opens a dedicated single-project page with animation, brochure access, and project-based floor plans."
        />

        <div className="projects-grid">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="section-block home-gallery-section">
        <SectionHeading
          eyebrow="Visual Storytelling"
          title="More photos on the home page for a richer premium feel."
          text="This section adds more architecture and interior visuals so the homepage feels fuller, stronger, and more branded."
        />

        <div className="home-gallery-grid">
          {homeGallery.map((image, index) => (
            <motion.div
              key={image}
              className={`home-gallery-card home-gallery-card-${index + 1} hover-panel`}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <img src={image} alt={`Stellavia visual ${index + 1}`} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-block split-showcase">
        <div className="split-showcase-copy">
          <p className="eyebrow">Floor Plan Experience</p>
          <h2>From compact flats to expansive sky residences.</h2>
          <p>
            Present apartment formats with room count, area, layout emphasis, and project visuals in a way that feels refined and sales-ready.
          </p>
          <NavLink to="/floor-plans" className="inline-link">
            Explore Floor Plans <ArrowRight size={16} />
          </NavLink>
        </div>
        <div className="split-showcase-card hover-panel">
          <div className="mini-plan">
            <span>Type B</span>
            <strong>3 BHK Family Plan</strong>
            <p>1780 sq. ft. / 3 Bedrooms / 3 Bathrooms / Utility + Deck</p>
          </div>
        </div>
      </section>
    </>
  );
}
