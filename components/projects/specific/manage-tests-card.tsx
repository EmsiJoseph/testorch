"use client"

import { useRouter } from "nextjs-toploader/app"

import { NoDataFallback } from "@/components/common/no-data-fallback"
import { Card } from "@/components/ui/card"
import { ITestPlan } from "@/lib/interfaces/test-plan.interfaces"

import TestsTable from "./tests-table"
import { gettingTests, projectId } from "@/lib/signals"
import { useTestPlansStore } from "@/lib/stores/use-tests"

export default function ManageTestsCard() {
  const {testPlans} = useTestPlansStore()
  const router = useRouter()
  const handleNewTest = () => {
    router.push("/tests/new")
  }

  return (
    <Card className="space-y-5 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Manage Tests</h2>
          <p className="text-muted-foreground">
            Manage your tests, and start executions of individual tests.
          </p>
        </div>
      </div>
      {testPlans && testPlans.length > 0  ||  gettingTests.value ? (
        <TestsTable tests={testPlans} />
      ) : (
        <NoDataFallback onClick={handleNewTest} entity="Test" />
      )}
    </Card>
  )
}
