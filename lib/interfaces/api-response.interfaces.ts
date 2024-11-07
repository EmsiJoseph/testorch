import { IProject } from "./project.interfaces"

export interface IApiResponse<T> {
  success?: boolean
  message: string
  data?: T
}

export interface IGetProjectsResponse extends IApiResponse<IProject[]> {}
