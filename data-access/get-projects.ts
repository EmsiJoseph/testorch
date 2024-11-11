import { getProjectsRoute } from "@/config/endpoints/project-management-routes"
import handleFetch from "@/lib/handlers/handle-fetch"
import { IGetProjectsResponse } from "@/lib/interfaces/api-response.interfaces"

export const getProjects = async (
  auth0OrgId: string
): Promise<IGetProjectsResponse | null> => {
  const endpoint = getProjectsRoute(auth0OrgId)
  const data = await handleFetch<IGetProjectsResponse>(endpoint)

  if (data) {
    return data // Return the data if successful
  } else {
    console.warn("Failed to fetch projects.") // Optional: Add error handling/logging here

    return {
      message: "Failed to fetch projects.",
    } // Explicitly return null in case of failure
  }
}
