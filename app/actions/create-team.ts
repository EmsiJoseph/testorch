"use server"

import { AxiosResponse } from "axios"
import { redirect } from "next/navigation"

import {
  TestorchAxiosConfig
} from "@/config/backend-axios-config"
import { postCreateTeamRoute } from "@/config/endpoints/team-management-routes"
import { handleServerSideApiResponse } from "@/lib/handlers/handle-server-side-api-response"
import { handleSetAuthToken } from "@/lib/handlers/handle-set-auth-token"

export async function createTeam(formData: FormData) {
  const organizationName = formData.get("organization_name")
  const organizationId = formData.get("organization_id")
  const email = formData.get("email")
  // Call api to create an influxdb Org
  const request = async (): Promise<AxiosResponse<any>> => {
    await handleSetAuthToken()

    return await TestorchAxiosConfig.post(postCreateTeamRoute, {
      name: organizationName,
      auth0_org_id: organizationId,
      email: email,
    })
  }

  const { success } = await handleServerSideApiResponse({
    request: request,
    successMessage: "Team created successfully!",
    errorMessage: "Failed to create team.",
  })

  if (!success) {
    return { success: false, message: "Failed to create team." }
  }

  const authParams = new URLSearchParams({
    organization: organizationId as string,
    returnTo: "/projects",
  })

  redirect(`/api/auth/login?${authParams.toString()}`)
}
