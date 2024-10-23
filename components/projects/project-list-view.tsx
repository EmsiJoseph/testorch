import React from "react";
import ProjectCardList from "@/components/projects/project-card-list";
import {ProjectCardProps} from "@/components/projects/project-card-grid";

type ProjectListViewProps = {
    projects: ProjectCardProps[]
};

const ProjectListView: React.FC<ProjectListViewProps> = ({ projects }) => {
    return (
        <div className="space-y-4">
            {projects.map((project, index) => (
                <ProjectCardList
                    key={index}
                    name={project.name}
                    url={project.url}
                    lastTestName={project.lastTestName}
                    lastTestTime={project.lastTestTime}
                    status={project.status}
                />
            ))}
        </div>
    );
};

export default ProjectListView;
