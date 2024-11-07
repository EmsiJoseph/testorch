import { AxiosResponse } from "axios"

import { TestorchAxiosConfig } from "@/config/backend-axios-config"

import { IApiResponse } from "../interfaces/api-response.interfaces"
import { handleServerSideApiResponse } from "./handle-server-side-api-response"
import { handleSetAuthToken } from "./handle-set-auth-token"

export default async function handleFetch<T>(
  endpoint: string
): Promise<T | undefined> {
  const req = async (): Promise<AxiosResponse<T>> => {
    await handleSetAuthToken()
    return TestorchAxiosConfig.get<T>(endpoint)
  }

  const res: IApiResponse<T> = await handleServerSideApiResponse<T>({
    request: req,
  })

  // Return the data if success, else handle error
  return res.success ? res.data : undefined
}
