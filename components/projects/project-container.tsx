"use client"

import { useRouter } from "nextjs-toploader/app"
import { useEffect } from "react"

import SearchAndControls from "@/components/common/search-and-controls"
import ProjectsView from "@/components/projects/projects-view"
import RecentActivitiesList from "@/components/projects/recent-activity-list"
import { handleClientSideApiResponse } from "@/lib/handlers/handle-client-side-api-response"
import useFilteredItems from "@/lib/hooks/use-filtered-items"
import { IProject } from "@/lib/interfaces/project.interfaces"
import { useProjectsStore } from "@/lib/stores/use-projects"

import { NoDataFallback } from "../common/no-data-fallback"
import { NoSearchResultsFallback } from "../common/no-search-results-fallback"

interface ProjectsContainerProps {
  projects: IProject[] | undefined
  error: string | null
}

export default function ProjectsContainer({
  projects,
  error,
}: ProjectsContainerProps) {
  const { addProjects } = useProjectsStore()

  useEffect(() => {
    if (projects) {
      addProjects(projects)
    }
    if (error && !projects) {
      console.log(error)
      handleClientSideApiResponse({
        error: error,
        success: false,
      })
    }
  }, [projects, addProjects])

  const {
    filteredItems = [],
    handleSearch,
    query,
  } = useFilteredItems(projects, (project, query) =>
    project.name.toLowerCase().includes(query)
  )

  const router = useRouter()

  const handleNewProject = () => {
    router.push("/projects/new")
  }

  console.log(projects)
  console.log(projects?.length)
  return (
    <div className="flex flex-col">
      <div className="flex flex-1 overflow-hidden ">
        {/* Main Content */}
        <div className="flex-1 overflow-auto pr-6">
          <div>
            {/* Search and Controls */}
            <SearchAndControls
              handleSearch={handleSearch}
              placeholder="Search projects and urls"
            />
            {!projects || projects.length === 0 ? (
              <NoDataFallback
                onClick={() => {
                  handleNewProject()
                }}
                entity="Project"
              />
            ) : filteredItems.length > 0 ? (
              <ProjectsView projects={filteredItems} />
            ) : (
              <NoSearchResultsFallback
                searchTerm={query}
                onClick={() => {
                  handleNewProject()
                }}
                entity="Project"
              />
            )}
          </div>
        </div>

        {/* Recent Tests Sidebar */}
        <RecentActivitiesList />
      </div>
    </div>
  )
}
