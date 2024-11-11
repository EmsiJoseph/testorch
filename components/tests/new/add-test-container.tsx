"use client"

import { AddTestSchemaV2, TAddTestFormValues, TAddTestFormValuesV2 } from "@/schemas/test-plan"
import { useUser } from "@auth0/nextjs-auth0/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSignalEffect } from "@preact/signals-react"
import { useAction } from "next-safe-action/hooks"
import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"
import { useForm } from "react-hook-form"

import ProgressIndicator from "@/components/common/form-step-progress"
import { Form } from "@/components/ui/form"
import handleExecuteAsync from "@/lib/handlers/handle-execute-async"
import {
  addTestPlanFormIsSubmitting,
  projectId,
  projectName,
} from "@/lib/signals"
import { useProjectsStore } from "@/lib/stores/use-projects"
import { extractFormValidationErrorsAndTriggerToast } from "@/lib/utils/extract-form-validation-errors-and-trigger-toast"

import { addTestV2 } from "@/app/actions/add-test-v2"
import SelectProjectStep from "./select-project-step"
import SetupTestStep from "./setup-test-step"
import UploadTestPlanStep from "./upload-test-plan-step"
import GithubSetupSection from "./github-setup-section"

export default function AddTestContainer() {
  const { findProjectById } = useProjectsStore()
  useSignalEffect(() => {
    const project = findProjectById(projectId.value || "")
    if (project) {
      projectName.value = project.name
    }
  })

  const [currentStep, setCurrentStep] = useState<number>(1)

  const steps = ["Select Project", "Upload Test Plan", "Setup Test"]

  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const { user } = useUser()
  const { executeAsync, isExecuting } = useAction(addTestV2)
  const router = useRouter()

  const form = useForm<TAddTestFormValuesV2>({
    resolver: zodResolver(AddTestSchemaV2),
    defaultValues: {
      name: "",
      file: "",
      description: "",
      fileName: "",
      email: user?.email || "",
      projectName: projectName.value || "",
      type: "jmx",
      auth0_org_id: "",
    },
    mode: "onChange",
  })

  const onSubmit = async () => {

    form.setValue("projectName", projectName.value || "")
    form.setValue("email", user?.email || "")
    form.setValue("auth0_org_id", user?.org_id || "")
    console.log("form.getValues()", form.getValues())
    const formValues = form.getValues()
    addTestPlanFormIsSubmitting.value = true
    const res = await handleExecuteAsync<TAddTestFormValuesV2>(
      executeAsync,
      formValues
    )
    if (res?.data?.success) {
      addTestPlanFormIsSubmitting.value = false
      form.reset()
      router.push(`/projects/${projectName.value}`)
    } else {
      addTestPlanFormIsSubmitting.value = false
    }
  }

  return (
    <div className="container mx-auto p-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log(errors)
            extractFormValidationErrorsAndTriggerToast(errors)
          })}
          className="space-y-6"
        >
          <ProgressIndicator currentStep={currentStep} steps={steps} />

          {currentStep === 1 && <SelectProjectStep nextStep={nextStep} />}
          {currentStep === 2 && (
            <UploadTestPlanStep prevStep={prevStep} nextStep={nextStep} />
          )}
          {currentStep === 3 && <SetupTestStep prevStep={prevStep}/>}
        </form>
      </Form>
    </div>
  )
}
