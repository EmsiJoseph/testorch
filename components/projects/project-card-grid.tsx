import { FlaskConical, MoreHorizontal } from "lucide-react"
import { useRouter } from "nextjs-toploader/app"
import React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { IProject } from "@/lib/interfaces/project.interfaces"
import { projectId } from "@/lib/signals"
import { formatFriendlyDate } from "@/lib/utils/date-utils"

import { Avatar, AvatarFallback } from "../ui/avatar"

export type ProjectCardProps = IProject

const ProjectCardGrid: React.FC<{ project: IProject }> = ({ project }) => {
  const { name, recentTestPlan } = project
  const router = useRouter()
  return (
    <Card className="bg-field dark:bg-neutral-950">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <Avatar className="h-10 w-10">
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
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
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        {recentTestPlan && recentTestPlan.length > 0 ? (
          recentTestPlan.map((plan) => (
            <div
              key={plan.id}
              className="flex-start mt-4 flex flex-row gap-2 items-start text-sm text-muted-foreground"
            >
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <FlaskConical className="h-3 w-3" />
                <p>Added {plan.name}</p>
              </div>
              <span> @ {formatFriendlyDate(plan.created_at)}</span>
            </div>
          ))
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            No recent test plan
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export default ProjectCardGrid
