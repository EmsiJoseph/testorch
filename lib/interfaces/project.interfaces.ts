import { IApiResponse } from "./api-response.interfaces"
import { ITestPlan } from "./test-plan.interfaces"

export interface FormStepProps {
  nextStep?: () => void
  prevStep?: () => void
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

export interface ICreateProjectResponse
  extends IApiResponse<IProject> {}

