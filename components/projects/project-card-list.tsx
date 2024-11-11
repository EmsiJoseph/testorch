import { ChevronRightIcon } from "@radix-ui/react-icons"
import { FlaskConical } from "lucide-react"
import { useRouter } from "nextjs-toploader/app"
import React from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { IProject } from "@/lib/interfaces/project.interfaces"
import { projectId } from "@/lib/signals"
import { formatFriendlyDate } from "@/lib/utils/date-utils"

import { Button } from "../ui/button"

const ProjectCardList: React.FC<{ project: IProject }> = ({ project }) => {
  const { name, recentTestPlan } = project
  const router = useRouter()
  console.log(recentTestPlan)
  return (
    <div className="flex items-center justify-between space-x-6 rounded-lg border bg-field p-4 shadow-sm hover:bg-gray-300 dark:bg-neutral-950 dark:hover:bg-gray-900">
      {/* Left Section - Avatar + Project Details */}
      <div className="flex w-[33%]  items-center justify-start space-x-4">
        <Avatar className="h-10 w-10">
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <Button
            onClick={() => {
              projectId.value = project.id
              router.push(`/projects/${project.name}`)
            }}
            variant="link"
            className="font-semibold"
          >
            {name}
          </Button>
        </div>
      </div>

      {/* Middle Section - Activity Details */}
      {recentTestPlan && recentTestPlan.length > 0 ? (
        <div className="flex w-[33%] flex-col  space-y-1">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <FlaskConical className="h-3 w-3" />
            <p>{recentTestPlan[0].name}</p>
          </div>
          <p className="text-xs text-muted-foreground">
            {formatFriendlyDate(recentTestPlan[0].created_at)}
          </p>
        </div>
      ) : (
        <p className="w-[33%] text-xs text-muted-foreground">
          No recent test plan
        </p>
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
