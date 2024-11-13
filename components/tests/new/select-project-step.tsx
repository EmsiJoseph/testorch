"use client"

import React from "react"
import { useFormContext } from "react-hook-form"

import { StepProps } from "@/lib/interfaces/project.interfaces"
import { createProjectFormSubmitting, projectId } from "@/lib/signals"
import { useProjectsStore } from "@/lib/stores/use-projects"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { ProjectSelector } from "./project-selector"

// Step 1: Name Your Project
const SelectProjectStep: React.FC<StepProps> = ({ nextStep }) => {
  const { projects } = useProjectsStore()
  const form = useFormContext()

  return (
    <div className="text-center">
      <h2 className="mb-14 text-xl font-bold">Select a project</h2>

      {/* Label and Input Container */}
      <div className="flex flex-col items-center">
        <div className="mb-4 flex items-center">
          <FormField
            disabled={createProjectFormSubmitting.value}
            control={form.control}
            name="projectId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ProjectSelector
                    projects={projects}
                    currentProjectId={
                    form.watch("projectId") || projectId.value
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button onClick={nextStep} disabled={form.watch("projectId") === ""}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default SelectProjectStep
