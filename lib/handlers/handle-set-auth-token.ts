import { setAuthorizationToken } from "@/config/backend-axios-config"
import { appClient } from "../auth0/auth0"


export const handleSetAuthToken = async () => {
  const { accessToken } = await appClient.getAccessToken()

  // Set the access token in the Axios config
  if (accessToken) {
    setAuthorizationToken(accessToken)
  } else {
    console.error("No access token found.")
  }
}
