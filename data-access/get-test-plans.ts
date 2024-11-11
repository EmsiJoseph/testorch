import { getTestPlansRoute } from "@/config/endpoints/test-plan-management-routes"
import handleFetch from "@/lib/handlers/handle-fetch"
import { IGetTestPlansResponse } from "@/lib/interfaces/api-response.interfaces"

export const getTestPlans = async (
  projectName: string
): Promise<IGetTestPlansResponse | null> => {
  try {
    const endpoint = getTestPlansRoute(projectName)
    const data = await handleFetch<IGetTestPlansResponse>(endpoint)
    if (data) {
      return data // Return the data if successful
    } else {
      console.warn("Failed to fetch test plans.") // Optional: Add error handling/logging here
      return {
        message: "Failed to fetch test plans.",
      }
    }
  } catch (error) {
    console.error("An error occurred while fetching test plans:", error)
    return {
      message: "An error occurred while fetching test plans.",
    }
  }
}
