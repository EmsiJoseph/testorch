"use client"

import RecentActivitiesList from "@/components/projects/recent-activity-list";
import {ProjectCardProps} from "@/components/projects/project-card-grid";
import ProjectsView from "@/components/projects/projects-view";
import useFilteredItems from "@/lib/hooks/use-filtered-items";
import SearchAndControls from "@/components/common/search-and-controls";

// Mock data for projects
const projects: ProjectCardProps[] = [
    {
        name: "E-commerce Site",
        url: "ecommerce.testorch.app",
        lastTestName: "test",
        lastTestTime: "2 hours ago",
        status: "Passed",
    },
    {
        name: "Banking App",
        url: "banking.testorch.app",
        lastTestName: "test",
        lastTestTime: "1 day ago",
        status: "Failed",
    },
    {
        name: "Social Media Platform",
        url: "social.testorch.app",
        lastTestName: "test",
        lastTestTime: "3 days ago",
        status: "In Progress",
    },
    {
        name: "Inventory Management",
        url: "inventory.testorch.app",
        lastTestName: "test",
        lastTestTime: "5 days ago",
        status: "Passed",
    },
];

export default function ProjectsContainer() {
    const {filteredItems, handleSearch} = useFilteredItems(projects, (project, query) =>
        project.name.toLowerCase().includes(query) || project.url.toLowerCase().includes(query)
    );

    return (
        <div className="flex flex-col">
            <div className="flex flex-1 overflow-hidden ">
                {/* Main Content */}
                <div className="flex-1 overflow-auto pr-6">
                    <div>
                        {/* Search and Controls */}
                        <SearchAndControls handleSearch={handleSearch} placeholder="Search projects and urls"/>

                        {/* Projects Grid */}
                        <ProjectsView projects={filteredItems}/>
                    </div>
                </div>

                {/* Recent Tests Sidebar */}
                <RecentActivitiesList/>
            </div>
        </div>
    );
}
