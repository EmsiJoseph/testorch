import { onboardingClient } from "@/lib/auth0/auth0"

export const GET = onboardingClient.handleAuth({
    signup: onboardingClient.handleLogin((request) => {
        try {
            // Handle the request and redirect user for signup
            // @ts-ignore
            const searchParams = request.nextUrl.searchParams
            const loginHint = searchParams.get("login_hint")

            return {
                authorizationParams: {
                    screen_hint: "signup",
                    login_hint: loginHint,
                },
                returnTo: "/onboarding/verify",
            }
        } catch (error) {
            console.error("Error during signup process:", error)
            throw error
        }
    }),
})
