import { IApiResponse } from "./api-response.interfaces"

export interface ThreadGroup {
  duration: string // Assuming the value is a parameterized string
  name: string
  numThreads: string
  rampUp: string
}

export interface ITestData {
  fileName: string
  // threadGroups: ThreadGroup[]
  fullUrls: string[]
  urlDefined: boolean
}
export interface IUploadTestPlanResponse
  extends IApiResponse<ITestData> {}

export interface ITestPlan {
  id: string
  name: string
  description: string | null
  project_id: string
  location: string
  type: string
  createdByName: string
  created_at: string
}
