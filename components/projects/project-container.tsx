"use client"

import { useRouter } from "nextjs-toploader/app"

import SearchAndControls from "@/components/common/search-and-controls"
import { IProject } from "@/lib/interfaces/project.interfaces"
import ProjectsView from "@/components/projects/projects-view"
import RecentActivitiesList from "@/components/projects/recent-activity-list"
import useFilteredItems from "@/lib/hooks/use-filtered-items"

import { NoDataFallback } from "../common/no-data-fallback"
import { NoSearchResultsFallback } from "../common/no-search-results-fallback"

interface ProjectsContainerProps {
  projects: IProject[] | undefined;
}

export default function ProjectsContainer({ projects }: ProjectsContainerProps) {
  
  const { filteredItems = [], handleSearch, query } = useFilteredItems(
    projects,
    (project, query) =>
      project.name.toLowerCase().includes(query) 
  )

  const router = useRouter()

  const handleNewProject = () => {
    router.push("/projects/new")
  }

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
            {projects?.length === 0 ? (
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
