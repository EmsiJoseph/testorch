"use server"

import { AxiosResponse } from "axios"

import {
    TestorchAxiosConfig
} from "@/config/backend-axios-config"
import { addUserRoute } from "@/config/endpoints/auth-routes"
import { handleServerSideApiResponse } from "@/lib/handlers/handle-server-side-api-response"

export async function signUp(formData: FormData) {
  const userEmail = formData.get("email")
  // Call api to create an influxdb Org
  const request = async (): Promise<AxiosResponse<any>> => {
    return await TestorchAxiosConfig.post(addUserRoute, {
      email: userEmail,
    })
  }

  return await handleServerSideApiResponse({
    request: request,
    successMessage: "Greate you're in!",
    errorMessage: "Failed to signup.",
  })
}
