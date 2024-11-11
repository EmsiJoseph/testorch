import { IProject } from "./project.interfaces"
import { ITestPlan } from "./test-plan.interfaces"

export interface IApiResponse<T> {
  success?: boolean
  message: string
  data?: T
}

export interface IGetProjectsResponse extends IApiResponse<IProject[]> {}

export interface IGetTestPlansResponse extends IApiResponse<ITestPlan[]> {}
export interface Worker {
    id: string;
    type: string;
    status: string;
}
