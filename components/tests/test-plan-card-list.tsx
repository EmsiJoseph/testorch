import React from "react";
import {StatusBadge} from "@/components/common/status-badge";
import {ChevronRightIcon} from "@radix-ui/react-icons";
import {FlaskConical} from "lucide-react";

import {ITestPlan} from "@/types/interfaces";

const TestCardList: React.FC<ITestPlan> = ({name, status, completedOn, executedOn, duration, testType}) => {
    return (
        <div
            className="flex flex-col space-y-2 p-4 bg-field dark:bg-neutral-950 border rounded-lg shadow-sm hover:bg-gray-300 dark:hover:bg-gray-900">
            {/* Project Name */}

            <div className="flex justify-between items-center space-x-6">
                {/* Left Section - Avatar + Test Plan Details */}
                <div className="flex w-[33%] justify-start items-center space-x-4">
                    <div className="flex flex-col space-y-1">
                        <h3 className="text-sm font-semibold">{name}</h3>
                        <div className="flex items-center space-x-1 text-xs">
                            <FlaskConical className="h-3 w-3"/>
                            <p className="text-xs text-muted-foreground">{testType}</p>
                        </div>
                    </div>
                </div>

                {/* Middle Section - Execution Details */}
                <div className="flex flex-col w-[33%] space-y-1">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <p>Completed On: {completedOn}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <p>Executed On: {executedOn}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Duration: {duration}</p>
                </div>

                {/* Right Section - Status Badge */}
                <div className="flex justify-end items-center flex-shrink-0 w-[33%] space-x-4">
                <StatusBadge status={status}/>
                    <ChevronRightIcon className="h-4 w-4 text-muted-foreground"/>
                </div>
            </div>
        </div>
    );
};

export default TestCardList;
