"use client"

import React from "react"
import { useFormContext } from "react-hook-form"

import { StepProps } from "@/lib/interfaces/project.interfaces"
import { createProjectFormSubmitting } from "@/lib/signals"
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

// Step 1: Name Your Project
const NameProjectStep: React.FC<StepProps> = ({ nextStep }) => {
  const form = useFormContext()

  return (
    <div className="text-center">
      <h2 className="mb-14 text-xl font-bold">Name your project</h2>

      {/* Label and Input Container */}
      <div className="flex flex-col items-center">
        <div className="mb-4 flex items-center">
          <label
            htmlFor="projectName"
            className="mr-4 font-semibold text-foreground"
          >
            Project name
          </label>
          <FormField
            disabled={createProjectFormSubmitting.value}
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    id="name"
                    {...field}
                    placeholder="Add a name"
                    className="w-64 rounded-md border border-gray-300 bg-transparent px-4 py-2 focus:border-foreground focus:outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <p className="mb-4 text-gray-500">
          After creating a project, you can add test plans later.
        </p>
        <Button
          onClick={nextStep}
          disabled={form.watch("name") === ""}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default NameProjectStep
