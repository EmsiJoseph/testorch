"use client"

import { useState } from "react"
import {
  CreateProjectSchema,
  TCreateProjectFormValues,
} from "@/schemas/project"
import { useUser } from "@auth0/nextjs-auth0/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { useRouter } from "nextjs-toploader/app"
import { useForm } from "react-hook-form"

import { extractFormValidationErrorsAndTriggerToast } from "@/lib/utils/extract-form-validation-errors-and-trigger-toast"
import handleExecuteAsync from "@/lib/handlers/handle-execute-async"
import { createProjectFormSubmitting, projectId } from "@/lib/signals"
import { Form } from "@/components/ui/form"
import { createProject } from "@/app/actions/create-project"

import ProgressIndicator from "../../common/form-step-progress"
import AddDescriptionStep from "./steps/add-description-step"
import NameProjectStep from "./steps/name-project-step"

// Main Create Project Container
export default function CreateProjectContainer() {
  const [currentStep, setCurrentStep] = useState<number>(1)

  const steps = ["Name Project", "Add description"]

  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const { user } = useUser()
  const { executeAsync, isExecuting } = useAction(createProject)
  const router = useRouter()

  const form = useForm<TCreateProjectFormValues>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      auth0_org_id: user?.org_id || "",
      email: user?.email || "",
    },
    mode: "onChange",
  })

  const onSubmit = async () => {
    form.setValue("auth0_org_id", user?.org_id || "")
    form.setValue("email", user?.email || "")
    const formValues = form.getValues()
    createProjectFormSubmitting.value = true
    const res = await handleExecuteAsync<TCreateProjectFormValues>(
      executeAsync,
      formValues
    )
    if (res?.data?.success) {
      form.reset()
      createProjectFormSubmitting.value = false
      router.push(`/projects`)
    } else {
      createProjectFormSubmitting.value = false
    }
  }

  return (
    <div className="container mx-auto p-6">
      {/* Progress Indicator */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            extractFormValidationErrorsAndTriggerToast(errors)
          })}
          className="space-y-6"
        >
          <ProgressIndicator currentStep={currentStep} steps={steps} />

          {/* Step Components */}
          {currentStep === 1 && <NameProjectStep nextStep={nextStep} />}

          {currentStep === 2 && <AddDescriptionStep prevStep={prevStep} />}
        </form>
      </Form>
    </div>
  )
}
