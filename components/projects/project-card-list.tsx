import { ChevronRightIcon } from "@radix-ui/react-icons"
import { FlaskConical } from "lucide-react"
import React from "react"

import { IProject } from "@/lib/interfaces/project.interfaces"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const ProjectCardList: React.FC<{ project: IProject }> = ({ project }) => {
  const { name, recentTestPlan } = project
  return (
    <div className="flex items-center justify-between space-x-6 rounded-lg border bg-field p-4 shadow-sm hover:bg-gray-300 dark:bg-neutral-950 dark:hover:bg-gray-900">
      {/* Left Section - Avatar + Project Details */}
      <div className="flex w-[33%]  items-center justify-start space-x-4">
        <Avatar className="h-10 w-10">
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold">{name}</h3>
        </div>
      </div>

      {/* Middle Section - Activity Details */}
      {recentTestPlan ? (
        <div className="flex w-[33%] flex-col  space-y-1">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <FlaskConical className="h-3 w-3" />
            <p>{recentTestPlan[0].name}</p>
          </div>
          <p className="text-xs text-muted-foreground">
            {recentTestPlan[0].created_at}
          </p>
        </div>
      ) : (
        <p className="w-[33%] text-xs text-muted-foreground">No test plans</p>
      )}

      {/* Right Section - Status Badge */}
      <div className=" flex w-[33%] flex-shrink-0 items-center justify-end space-x-4">
        {/* <StatusBadge status={status} /> */}
        <ChevronRightIcon className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  )
}

export default ProjectCardList
