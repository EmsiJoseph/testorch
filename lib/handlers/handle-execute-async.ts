
import {
  handleClientSideApiResponse,
  IClientSideApiHandlerResponse,
} from "./handle-client-side-api-response"

export default async function handleExecuteAsync<T>(
  executeAsync: (data: T) => Promise<any>,
  data: T
) {
  try {
    const res = await executeAsync(data)

    // Prepare the response to pass to the client-side handler
    const responseData: IClientSideApiHandlerResponse = {
      message: res?.message || "No message provided",
      success: res?.success || false,
    }

    // Pass the response data to the client-side handler function
    handleClientSideApiResponse(responseData)

    // Return the full response as "any"
    return res
  } catch (error) {
    console.error("Error executing async function:", error)

    // Handle errors by passing a default error response to the handler
    handleClientSideApiResponse({
      message: "An error occurred",
      success: false,
    })

    // Return undefined in case of an error
    return undefined
  }
}
