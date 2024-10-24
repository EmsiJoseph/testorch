"use client"

import {useUrlParams} from "@/lib/use-url-params";
import ProjectListView from "@/components/projects/project-list-view";
import ProjectGridView from "@/components/projects/project-grid-view";
import {ProjectCardProps} from "@/components/projects/project-card-grid";

export default function ProjectsView({projects}: { projects: ProjectCardProps[] }) {
    const {view} = useUrlParams();
    return (
        <>
            {view === "list" ? <ProjectListView projects={projects}/> : <ProjectGridView projects={projects}/>}
        </>
    )
}