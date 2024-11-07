import ProjectCardGrid from "@/components/projects/project-card-grid";
import {IProject} from "@/lib/interfaces/project.interfaces";
import { ProjectViewProps } from "./project-list-view";

const ProjectGridView: React.FC<ProjectViewProps> = ({projects}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {projects.map((project, index) => (
                <ProjectCardGrid
                    key={index}
                  project={project}
                />
            ))}
        </div>
    );
}

export default ProjectGridView;
