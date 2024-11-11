"use client"

import {useUrlParams} from "@/lib/utils/use-url-params";
import ProjectListView from "@/components/projects/project-list-view";
import ProjectGridView from "@/components/projects/project-grid-view";
import {IProject} from "@/lib/interfaces/project.interfaces";

export default function ProjectsView({projects}: { projects: IProject[] }) {
    const {view} = useUrlParams();
    return (
        <>
            {view === "list" ? <ProjectListView projects={projects}/> : <ProjectGridView projects={projects}/>}
        </>
    )
}