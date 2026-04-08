import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.id}`} className="project-card hover-panel">
      <div className="project-image-wrap">
        <img src={project.image} alt={project.name || project.title} className="project-image" />
        <span className={`project-badge ${project.status === 'In Progress' ? 'progress' : ''}`}>
          {project.status || 'Featured'}
        </span>
      </div>
      <div className="project-content">
        <div className="meta-row">
          <span>{project.location}</span>
          {project.year && <span>{project.year}</span>}
        </div>
        <h3>{project.name || project.title}</h3>
        {project.type && <p className="project-type">{project.type}</p>}
        <p>{project.description || project.summary}</p>
        <div className="project-bottom-row">
          {project.units && <small>{project.units}</small>}
          <span className="project-link">View Project <ArrowUpRight size={16} /></span>
        </div>
      </div>
    </Link>
  );
}
