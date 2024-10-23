"use client";

import TestPlanGroup from "@/components/tests/test-group";
import useFilteredItems from "@/lib/hooks/use-filtered-items";
import SearchAndControls from "@/components/common/search-and-controls";

// Mock data for projects
const tests = [
    {
        name: "Load Test 1",
        status: "Passed" as "Passed",
        completedOn: "2024-10-22",
        executedOn: "2024-10-21",
        duration: "1 hour",
        testType: "Load",
        project: "TestOrch"
    },
    {
        name: "Stress Test 1",
        status: "Failed" as "Failed",
        completedOn: "2024-10-22",
        executedOn: "2024-10-20",
        duration: "30 mins",
        testType: "Stress",
        project: "TestOrch"
    },
    {
        name: "API Test 1",
        status: "In Progress" as "In Progress",
        completedOn: "2024-10-22",
        executedOn: "2024-10-19",
        duration: "45 mins",
        testType: "API",
        project: "TestOrchfasfas"
    },
];


export default function TestPlansContainer() {
    const {filteredItems, handleSearch} = useFilteredItems(tests, (test, query) =>
        test.name.toLowerCase().includes(query) || test.project.toLowerCase().includes(query)
    );

    return (
        <div className="flex flex-col">
            <div className="flex flex-1 overflow-hidden ">
                {/* Main Content */}
                <div className="flex-1 overflow-auto pr-6">
                    <div>
                        {/* Search and Controls */}
                        <SearchAndControls handleSearch={handleSearch} placeholder="Search test plans and projects"/>

                        {/* Projects Grid */}
                        <TestPlanGroup tests={filteredItems}/>
                    </div>
                </div>

            </div>
        </div>
    );
}
