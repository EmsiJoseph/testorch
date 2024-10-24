import ProjectCardGrid, {ProjectCardProps} from "@/components/projects/project-card-grid";


export default function ProjectGridView({projects}: { projects: ProjectCardProps[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {projects.map((project, index) => (
                <ProjectCardGrid
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
}
