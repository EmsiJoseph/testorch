"use client"

import React from "react"
import { useFormContext } from "react-hook-form"

import { SubmitButton } from "@/components/common/submit-button"
import { Button } from "@/components/ui/button"
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { StepProps } from "@/lib/interfaces/project.interfaces"
import { createProjectFormSubmitting } from "@/lib/signals"

// Step 1: Name Your Project
const AddDescriptionStep: React.FC<StepProps> = ({ prevStep }) => {
  const form = useFormContext()
  return (
    <div className="text-center">
      <h2 className="mb-14 text-xl font-bold">Describe your project</h2>

      {/* Label and Input Container */}
      <div className="flex flex-col items-center">
        <FormField
          disabled={createProjectFormSubmitting.value}
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="mb-8 h-[80px] w-[450px] rounded-md border border-gray-300 bg-transparent px-4 py-2 focus:border-foreground focus:outline-none"
                  id="description"
                  {...field}
                  placeholder="Describe your project briefly"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-4">
          <Button
            disabled={createProjectFormSubmitting.value}
            variant="secondary"
            onClick={prevStep}
          >
            Back
          </Button>
          <SubmitButton
            disabled={
              form.watch("description") === "" ||
              createProjectFormSubmitting.value
            }
          >
            Create Project
          </SubmitButton>
        </div>
      </div>
    </div>
  )
}

export default AddDescriptionStep
