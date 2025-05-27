import { useNavigate } from "react-router";
import { Project } from "./Project";
import ProjectForm from "./ProjectForm";

function ProjectCreate() {
    const blankProject = new Project();
    const navigate = useNavigate();
    const cancelEditing = () => {
        navigate("/projects");
    };

    return <div className="row"><ProjectForm project={blankProject} onCancel={cancelEditing} /></div>;
}

export default ProjectCreate;