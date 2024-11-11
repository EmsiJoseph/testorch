import React from "react";
import ProjectCardList from "@/components/projects/project-card-list";
import {IProject} from "@/lib/interfaces/project.interfaces";

export type ProjectViewProps = {
    projects: IProject[]
};

const ProjectListView: React.FC<ProjectViewProps> = ({projects}) => {
    return (
        <div className="space-y-4">
            {projects.map((project, index) => (
                <ProjectCardList
                    key={index}
                    project={project}
                />
            ))}
        </div>
    );
};

export default ProjectListView;
