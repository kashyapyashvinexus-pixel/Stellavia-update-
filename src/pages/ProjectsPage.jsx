import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import { completedProjects, inProgressProjects } from '../data/projects';

export default function ProjectsPage() {
  return (
    <section className="page-hero projects-surface">
      <div className="section-block narrow-top">
        <SectionHeading
          eyebrow="Projects"
          title="Completed landmarks and projects currently in progress."
          text="Every project grid card is clickable and leads to a dedicated single-project page with brochure sections, floor plan visuals, and motion-rich presentation."
        />

        <div className="dual-section">
          <div>
            <div className="stack-title">
              <p className="eyebrow">Completed Projects</p>
              <h3>Built and delivered residences</h3>
            </div>
            <div className="projects-grid">
              {completedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          <div>
            <div className="stack-title">
              <p className="eyebrow">Projects In Progress</p>
              <h3>Under development right now</h3>
            </div>
            <div className="projects-grid">
              {inProgressProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
