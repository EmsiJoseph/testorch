import { FlaskConical, MoreHorizontal } from "lucide-react"
import React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { IProject } from "@/lib/interfaces/project.interfaces"
import { Avatar, AvatarFallback } from "../ui/avatar"

export type ProjectCardProps = IProject

const ProjectCardGrid: React.FC<{ project: IProject }> = ({ project }) => {
  const { name, recentTestPlan } = project
  console.log(recentTestPlan)
  return (
    <Card className="bg-field dark:bg-neutral-950">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-4 items-center">
            <Avatar className="h-10 w-10">
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <h3 className="font-semibold">{name}</h3>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        {recentTestPlan && recentTestPlan.length > 0 ? (
          recentTestPlan.map((plan) => (
            <div key={plan.id} className="flex-start mt-4 flex flex-col items-start text-sm text-muted-foreground">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <FlaskConical className="h-3 w-3" />
                <p>{plan.name}</p>
              </div>
              <span>{plan.created_at}</span>
            </div>
          ))
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            There are no test plans in this project
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export default ProjectCardGrid
