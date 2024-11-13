"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit3, Plus } from "lucide-react"
import { useRouter } from "nextjs-toploader/app"

import { IProject } from "@/lib/interfaces/project.interfaces"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardHeader({
  project,
  name,
}: {
  project: IProject | undefined
  name: string | undefined
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [projectName, setProjectName] = useState(project?.name)

  const router = useRouter()
  const handleNewTest = () => {
    router.push("/tests/new")
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value)
  }

  const handleBlur = () => {
    setIsEditing(false)
    // Here you can add logic to save the updated project name
  }

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-start justify-between"> {/* Changed items-center to items-start */}
          <div className="flex flex-col items-start space-y-4">
            {isEditing ? (
              <Input
                type="text"
                value={name || project?.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="text-2xl font-bold tracking-tight"
                autoFocus
              />
            ) : name || project?.name ? (
              <Button
                variant="link"
                onClick={handleEditClick}
                className="group flex items-center space-x-2 p-0"
              >
                <h1 className="cursor-pointer text-2xl font-bold tracking-tight">
                  {name || project?.name}
                </h1>
                <Edit3 className="h-4 w-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </Button>
            ) : (
              <Skeleton className="h-8 w-48" />
            )}
            {project?.description ? (
              <div className="flex flex-col gap-1">
                <p className="text-muted-foreground">{project.description}</p>
                <Link href="#" className="text-primary hover:underline">
                  Learn more
                </Link>
              </div>
            ) : project ? (
              <Button variant="ghost">
                <Edit3 className="mr-2 h-4 w-4" />
                Add Description
              </Button>
            ) : (
              <Skeleton className="h-4 w-64" />
            )}
          </div>
          <Button
            onClick={handleNewTest}
            variant="default"
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Test</span>
          </Button>
        </div>
      </div>
    </>
  )
}
