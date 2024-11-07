import { ITestPlan } from "./test-plan.interfaces"

export interface NameProjectStepProps {
  projectName: string
  setProjectName: (name: string) => void
  nextStep: () => void
}

export interface FinishSetupStepProps {
  projectName: string
}

export interface ProgressIndicatorProps {
  currentStep: number
}

export interface IProject {
  id: string
  name: string
  description: string | null
  influxDb_bucket_id: string
  team_id: string
  created_by: string
  recentTestPlan: ITestPlan[]
}
