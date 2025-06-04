import { Link } from 'react-router';
import { Project } from './Project';
import { useDeleteProject } from "./projectHooks";

function formatDescription(description: string): string {
  return description.substring(0, 60) + '...';
}

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
}

function ProjectCard(props: ProjectCardProps) {
  const { project, onEdit } = props;
  const handleEditClick = (projectBeingEdited: Project) => {
    onEdit(projectBeingEdited);
  };
  const { mutate: deleteProject, isPending } = useDeleteProject();
    const handleDeleteClick = async () => {
        deleteProject(project._id);
    };
  return (
    <div className="card">
      {isPending && <span className="toast">Deleting...</span>}
      <img src={project.imageUrl ? project.imageUrl : "/assets/no_image.jpg"} alt={project.name} />
      <section className="section dark">
        <Link to={'/projects/' + project._id}>
        <h5 className="strong">
          <strong>{project.name}</strong>
        </h5>
        <p>{formatDescription(project.description)}</p>
        <p>Budget : {project.budget.toLocaleString()}</p>
        </Link>
        <button className="bordered"
            onClick={() => {
            handleEditClick(project);
          }}
        >
            <span className="icon-edit"></span>
            Edit
        </button>
	<button className="bordered secondary"
            onClick={() => {
            handleDeleteClick();
          }}
        >
            <span className="icon-alert inverse"></span>
            Delete
        </button>
      </section>
    </div>
  );
}

export default ProjectCard;