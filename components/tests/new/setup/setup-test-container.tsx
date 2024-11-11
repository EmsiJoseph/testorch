"use client"

import { AddTestSchema, TAddTestFormValues } from "@/schemas/test-plan"
import { useUser } from "@auth0/nextjs-auth0/client"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Activity,
  AlertTriangle,
  BookOpen,
  Clock,
  TrendingUp,
  Upload,
  Wand2,
} from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { useRouter } from "nextjs-toploader/app"
import { useForm } from "react-hook-form"
import { useState } from "react"

import { extractFormValidationErrorsAndTriggerToast } from "@/lib/utils/extract-form-validation-errors-and-trigger-toast"
import { ITestData } from "@/lib/interfaces/test-plan.interfaces"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { addTest } from "@/app/actions/add-test"

import TestNameSection from "./test-name-section"
import TestPlanNav from "./test-plan-nav"
import { SubmitButton } from "@/components/common/submit-button"

export default function SetupTestContainer({ params }: { params: ITestData }) {
  const { fileName, fullUrls, urlDefined } = params
  const formattedFileName = fileName.replace(/\.[^/.]+$/, "")
  const testTypes = [
    { name: "Load Test", icon: Activity },
    { name: "Stress Test", icon: AlertTriangle },
    { name: "Spike Test", icon: TrendingUp },
    { name: "Endurance Test", icon: Clock },
  ]

  const handleTestTypeSelect = (type: string) => {
    // Handle test type selection logic here
    console.log(`Selected test type: ${type}`)
  }

  const router = useRouter()

  const { executeAsync, isExecuting } = useAction(addTest)

  const { user } = useUser()

  const form = useForm<TAddTestFormValues>({
    resolver: zodResolver(AddTestSchema),
    defaultValues: {
      name: formattedFileName,
      fileName: fileName,
      email: user?.email || "",
      projectId: "",
      type: "jmx"
    },
    mode: "onChange",
  })

  const [hasEmptyRequiredFields, setHasEmptyRequiredFields] = useState(false)

  const onSubmit = async () => {
    const formValues = form.getValues()
    console.log(formValues)
    // const res = await handleExecuteAsync<TAddTestFormValues>(
    //   executeAsync,
    //   formValues
    // )

    // if (res?.data?.success) {
    //   form.reset()
    //   router.push(``)
    // }
  }

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8">
        <div className="max-w-4xl space-y-8">
          <div>
            <h1 className="text-2xl font-bold">Add a New Test</h1>
            <p className="mt-2 text-muted-foreground">
              Configure your test below. For more examples, visit our
              documentation site.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, (errors) => {
                console.log(errors)
                extractFormValidationErrorsAndTriggerToast(errors)
              })}
              className="space-y-6"
            >
              <TestNameSection setHasEmptyRequiredFields={setHasEmptyRequiredFields} />
              {/* <TestTypeSelection
            testTypes={testTypes}
            onSelect={handleTestTypeSelect}
          /> */}

              <div className="mt-8 flex justify-end space-x-3">
                <Button
                  onClick={() => router.push("/projects")}
                  variant="outline"
                >
                  Cancel
                </Button>
                <SubmitButton
                  disabled={isExecuting || hasEmptyRequiredFields}
                  type="submit"
                >
                  Add Test
                </SubmitButton>
              </div>
            </form>
          </Form>
        </div>
      </main>

      <aside className="w-80 space-y-6 p-8">
        <TestPlanNav
          title="Documentation"
          description="Official help portal"
          icon={BookOpen}
          actionLabel="Visit"
          actionHref="#"
        />
        <TestPlanNav
          title="Test Directory"
          description="Official test script examples"
          icon={BookOpen}
          actionLabel="Browse"
          actionHref="#"
        />
        <TestPlanNav
          title="Test Wizard"
          description="Generate a test file"
          icon={Wand2}
          actionLabel="Run"
          actionHref="#"
        />
        <TestPlanNav
          title="Record Browser"
          description="Upload your recording"
          icon={Upload}
          actionLabel="Upload"
          actionHref="#"
        />
      </aside>
    </div>
  )
}
