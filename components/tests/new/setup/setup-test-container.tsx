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

import { ITestData } from "@/lib/interfaces/test-plan.interfaces"
import handleExecuteAsync from "@/lib/handlers/handle-execute-async"
import { Button } from "@/components/ui/button"
import { addTest } from "@/app/actions/add-test"

import TestNameSection from "./test-name-section"
import TestPlanNav from "./test-plan-nav"

export default function SetupTestContainer({ params }: { params: ITestData }) {
  const { fileName, fullUrls, urlDefined } = params
  const formattedFileName = fileName.replace(/\.[^/.]+$/, "")
  const defaultValues = {
    fileName: formattedFileName,
    workers: 1,
    users: 50,
    spawnRate: 10,
  }
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
      userEmail: user?.email || "",
      testName: "",
    },
    mode: "onChange",
  })

  const onSubmit = async () => {
    const formValues = form.getValues()
    const res = await handleExecuteAsync<TAddTestFormValues>(
      executeAsync,
      formValues
    )

    if (res?.data?.success) {
      form.reset()
      router.push(``)
    }
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
          <TestNameSection defaultName={defaultValues.fileName} />
          {/* <TestTypeSelection
            testTypes={testTypes}
            onSelect={handleTestTypeSelect}
          /> */}

          <div className="mt-8 flex justify-end space-x-3">
            <Button variant="outline">Cancel</Button>
            <Button>Add Test</Button>
          </div>
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
