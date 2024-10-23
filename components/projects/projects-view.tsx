"use client"

import {getUrlParams} from "@/lib/get-url-params";
import ProjectListView from "@/components/projects/project-list-view";
import ProjectGridView from "@/components/projects/project-grid-view";
import {ProjectCardProps} from "@/components/projects/project-card-grid";

export default function ProjectsView({projects}: { projects: ProjectCardProps[] }) {
    const {view} = getUrlParams();
    return (
        <>
            {view === "list" ? <ProjectListView projects={projects}/> : <ProjectGridView projects={projects}/>}
        </>
    )
}