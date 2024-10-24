import React from "react";
import {StatusBadge} from "@/components/common/status-badge";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {ChevronRightIcon} from "@radix-ui/react-icons";
import {FlaskConical} from "lucide-react";
import {ProjectCardProps} from "@/components/projects/project-card-grid"; // Replace this with any icon you're using


const ProjectCardList: React.FC<ProjectCardProps> = ({name, url, lastTestName, lastTestTime, status}) => {
    return (
        <div
            className="flex bg-field dark:bg-neutral-950 justify-between items-center space-x-6 p-4 border rounded-lg shadow-sm hover:bg-gray-300 dark:hover:bg-gray-900">
            {/* Left Section - Avatar + Project Details */}
            <div className="flex w-[33%]  justify-start items-center space-x-4">
                <Avatar className="h-10 w-10">
                    <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <h3 className="text-sm font-semibold">{name}</h3>
                    <p className="text-xs text-muted-foreground">{url}</p>
                </div>
            </div>


            {/* Middle Section - Activity Details */}
            <div className="flex flex-col w-[33%]  space-y-1">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <FlaskConical className="h-3 w-3"/>
                    <p>{lastTestName}</p>
                </div>
                <p className="text-xs text-muted-foreground">{lastTestTime}</p>
            </div>


            {/* Right Section - Status Badge */}
            <div className=" flex justify-end items-center flex-shrink-0 w-[33%] space-x-4">
                <StatusBadge status={status}/>
                <ChevronRightIcon className="h-4 w-4 text-muted-foreground"/>
            </div>
        </div>
    );
};

export default ProjectCardList;
