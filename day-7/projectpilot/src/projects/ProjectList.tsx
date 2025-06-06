import { useState } from 'react';
import { Project } from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

interface ProjectListProps {
  projects: Project[];
}

function ProjectList({ projects }: ProjectListProps) {
  const [projectBeingEdited, setProjectBeingEdited] = useState({});

  const handleEdit = (project: Project) => {
    setProjectBeingEdited(project);
  };

  const cancelEditing = () => {
    setProjectBeingEdited({});
  };

  const items = projects.map(project => (
      <div key={project._id} className="cols-sm">
          {project === projectBeingEdited ? (
            <ProjectForm project={project} onCancel={cancelEditing} />
          ) : (
            <ProjectCard project={project} onEdit={handleEdit} />
          )}
    </div>
  ));
  return <div className="row">{items}</div>;
}

export default ProjectList;