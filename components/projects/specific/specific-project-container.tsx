"use client"

import { useSignalEffect } from "@preact/signals-react"

import { handleClientSideApiResponse } from "@/lib/handlers/handle-client-side-api-response"
import { ITestPlan } from "@/lib/interfaces/test-plan.interfaces"
import { projectId } from "@/lib/signals"
import { useProjectsStore } from "@/lib/stores/use-projects"
import { useTestPlansStore } from "@/lib/stores/use-tests"

import DashboardHeader from "./dashboard-header"
import ManageTestsCard from "./manage-tests-card"
import StatsCards from "./stats-cards"

export default function SpecificProjectContainer({
  projectName,
  tests,
  error,
}: {
  projectName: string
  tests: ITestPlan[] | undefined
  error: string | null
}) {
  const { addTestPlans } = useTestPlansStore()
  const { findProjectByName, selectProject, selectedProject } =
    useProjectsStore()

  const formattedProjectName = decodeURIComponent(projectName)

  useSignalEffect(() => {
    const project = findProjectByName(projectName)
    if (project) {
      projectId.value = project.id
      selectProject(project)
    }
    addTestPlans(tests || [])

    if (error && !tests) {
      console.log(error)
      handleClientSideApiResponse({
        error: error,
        success: false,
      })
    }
  })

  return (
    <div className="space-y-8 p-8">
      <DashboardHeader project={selectedProject} name={formattedProjectName} />
      <StatsCards />
      <ManageTestsCard />
    </div>
  )
}
